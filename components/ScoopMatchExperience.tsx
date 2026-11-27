"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { defaultFlavours, type Flavour } from "@/lib/catalog";

type Mood = "fruity" | "chocolate" | "classic" | "surprise";

const moods: { id: Mood; title: string; detail: string; symbol: string }[] = [
  { id: "fruity", title: "Bright & fruity", detail: "Something sunny and lively", symbol: "✳" },
  { id: "chocolate", title: "Deep & chocolatey", detail: "A richer kind of treat", symbol: "✦" },
  { id: "classic", title: "Soft & classic", detail: "Keep it smooth and familiar", symbol: "◌" },
  { id: "surprise", title: "Surprise me", detail: "Let the craving decide", symbol: "✧" },
];

const matchWords: Record<Exclude<Mood, "surprise">, string[]> = {
  fruity: ["mango", "strawberry", "fruit", "berry", "tropical", "citrus"],
  chocolate: ["chocolate", "cocoa", "choc"],
  classic: ["vanilla", "classic", "cream", "milk"],
};

function findMatch(flavours: Flavour[], mood: Mood, surpriseIndex: number): Flavour {
  const active = flavours.filter((flavour) => flavour.active !== false);
  const options = active.length ? active : defaultFlavours;
  if (mood === "surprise") {
    return options[surpriseIndex % options.length];
  }

  const ranked = options.map((flavour, index) => {
    const searchable = `${flavour.name} ${flavour.description}`.toLocaleLowerCase();
    const score = matchWords[mood].reduce(
      (total, word) => total + (searchable.includes(word) ? 1 : 0),
      0,
    );
    return { flavour, index, score };
  });

  ranked.sort((a, b) => b.score - a.score || a.index - b.index);
  return ranked[0]?.flavour ?? defaultFlavours[0];
}

const moodCopy: Record<Mood, string> = {
  fruity: "You’re leaning towards something bright. Start with this flavour and see where the craving takes you.",
  chocolate: "You’re in the mood for something with a little more depth. This is a lovely place to start.",
  classic: "Sometimes the familiar favourite is exactly what you want. Take a look at this one.",
  surprise: "No overthinking this time. Here’s a flavour to make the choice a little more fun.",
};

export default function ScoopMatchExperience() {
  const { items: flavours } = useCatalogCollection<Flavour>("flavours", defaultFlavours);
  const [mood, setMood] = useState<Mood>("fruity");
  const [revealed, setRevealed] = useState(false);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const match = useMemo(() => findMatch(flavours, mood, surpriseIndex), [flavours, mood, surpriseIndex]);

  return (
    <section className="scoop-match section" id="scoop-match" aria-labelledby="scoop-match-title">
      <div className="scoop-match-orb scoop-match-orb-one" aria-hidden="true" />
      <div className="scoop-match-orb scoop-match-orb-two" aria-hidden="true" />
      <div className="scoop-match-shell">
        <div className="scoop-match-intro">
          <p className="section-kicker">A LITTLE JIC MAGIC</p>
          <h2 id="scoop-match-title">Not sure what to choose? <em>Let’s find your scoop.</em></h2>
          <p>Tell us what you’re in the mood for. We’ll point you towards a flavour worth exploring.</p>
          <span className="scoop-match-note"><i aria-hidden="true" /> No sign-up. No details. Just a little flavour discovery.</span>
        </div>

        <div className="scoop-match-panel">
          <div className="scoop-match-question">
            <span>01 / YOUR CRAVING</span>
            <h3>What sounds good right now?</h3>
          </div>

          <div className="scoop-mood-grid" role="group" aria-label="Choose the kind of flavour you feel like">
            {moods.map((option) => (
              <motion.button
                key={option.id}
                type="button"
                className={`scoop-mood-option ${mood === option.id ? "is-selected" : ""}`}
                aria-pressed={mood === option.id}
                onClick={() => {
                  setMood(option.id);
                  setRevealed(false);
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                transition={{ duration: 0.18 }}
              >
                <span className="scoop-mood-symbol" aria-hidden="true">{option.symbol}</span>
                <span className="scoop-mood-copy">
                  <strong>{option.title}</strong>
                  <small>{option.detail}</small>
                </span>
                <span className="scoop-mood-check" aria-hidden="true">{mood === option.id ? "✓" : ""}</span>
              </motion.button>
            ))}
          </div>

          <button
            className="scoop-match-submit"
            type="button"
            onClick={() => {
              if (mood === "surprise") setSurpriseIndex((current) => current + 1);
              setRevealed(true);
            }}
          >
            Find my flavour <span aria-hidden="true">↗</span>
          </button>

          <AnimatePresence mode="wait">
            {revealed && (
              <motion.article
                key={match.id + mood}
                className="scoop-match-result"
                aria-live="polite"
                initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
              >
                <div className="scoop-match-result-image">
                  {match.image ? (
                    <Image
                      src={match.image}
                      alt={`${match.name} flavour`}
                      fill
                      sizes="(max-width: 700px) 34vw, 180px"
                      unoptimized={match.image.startsWith("http")}
                    />
                  ) : (
                    <span aria-hidden="true">🍨</span>
                  )}
                </div>
                <div className="scoop-match-result-copy">
                  <span className="scoop-match-result-kicker">YOUR FLAVOUR TO EXPLORE</span>
                  <h4>{match.name}</h4>
                  <p>{moodCopy[mood]}</p>
                  <a href="#menu" className="scoop-match-link">Explore the menu <span aria-hidden="true">→</span></a>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
          <p className="scoop-match-disclaimer">A fun suggestion, not a live stock check. Flavour availability can change, so please confirm with our team.</p>
        </div>
      </div>
    </section>
  );
}
