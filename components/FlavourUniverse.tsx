"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const flavours = [
  {
    id: "strawberry",
    name: "Strawberry",
    kicker: "RUBY · BRIGHT · JOYFUL",
    note: "A bright berry world with a playful, celebratory glow.",
    image: "/flavours/strawberry.webp",
    accent: "#ff5f89",
    accent2: "#9b183d",
    text: "#fff5f7",
  },
  {
    id: "mango",
    name: "Mango",
    kicker: "GOLDEN · TROPICAL · SMOOTH",
    note: "Warm mango light, golden highlights and a sunlit tropical mood.",
    image: "/flavours/mango.webp",
    accent: "#ffb22e",
    accent2: "#bfa514",
    text: "#fff8df",
  },
  {
    id: "chocolate",
    name: "Chocolate",
    kicker: "DEEP · RICH · INDULGENT",
    note: "A darker cocoa atmosphere made for slow, luxurious exploration.",
    image: "/flavours/chocolate.webp",
    accent: "#c37a4e",
    accent2: "#3a140d",
    text: "#fff5ed",
  },
  {
    id: "vanilla",
    name: "Vanilla",
    kicker: "CLASSIC · CREAMY · ELEGANT",
    note: "Soft ivory, warm gold and a clean premium finish.",
    image: "/flavours/vanilla.webp",
    accent: "#f4d990",
    accent2: "#b88728",
    text: "#fffdf5",
  },
  {
    id: "mix-fruit",
    name: "Mix Fruit",
    kicker: "FRESH · PLAYFUL · VIBRANT",
    note: "An emerald flavour world with energetic fruit-inspired highlights.",
    image: "/flavours/mix fruit.webp",
    accent: "#69d68d",
    accent2: "#0d6f46",
    text: "#f2fff7",
  },
] as const;

type Flavour = (typeof flavours)[number];

export default function FlavourUniverse() {
  const [activeId, setActiveId] = useState<Flavour["id"]>("strawberry");
  const reduceMotion = useReducedMotion();
  const active = useMemo(() => flavours.find((flavour) => flavour.id === activeId) ?? flavours[0], [activeId]);

  return (
    <section
      className={`flavour-universe flavour-${active.id}`}
      id="flavours"
      aria-labelledby="flavour-title"
      style={{
        "--flavour-accent": active.accent,
        "--flavour-accent-2": active.accent2,
        "--flavour-text": active.text,
      } as React.CSSProperties}
    >
      <div className="flavour-noise" aria-hidden="true" />
      <div className="flavour-aurora flavour-aurora-a" aria-hidden="true" />
      <div className="flavour-aurora flavour-aurora-b" aria-hidden="true" />
      <div className="flavour-particles" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => <i key={index} />)}
      </div>

      <div className="flavour-shell section">
        <div className="flavour-copy">
          <p className="section-kicker">FIND YOUR FLAVOUR</p>
          <h2 id="flavour-title">Five flavours.<br /><em>One happy mood.</em></h2>
          <p className="flavour-intro">Tap a flavour and let the scene change. From bright berries to rich chocolate, every scoop brings its own little world.</p>

          <div className="flavour-tabs" role="tablist" aria-label="Choose a Janushan flavour">
            {flavours.map((flavour, index) => {
              const selected = active.id === flavour.id;
              return (
                <button
                  type="button"
                  key={flavour.id}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="flavour-stage"
                  className={selected ? "is-active" : ""}
                  onClick={() => setActiveId(flavour.id)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{flavour.name}</strong>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flavour-stage" id="flavour-stage" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="flavour-scene"
              initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16, scale: 1.025 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flavour-orbit orbit-one" aria-hidden="true" />
              <div className="flavour-orbit orbit-two" aria-hidden="true" />
              <div className="flavour-product-halo" aria-hidden="true" />

              {active.image ? (
                <div className="flavour-product-image">
                  <Image
                    src={active.image}
                    alt={`${active.name} Janushan Ice Cream flavour visual`}
                    fill
                    sizes="(max-width: 900px) 88vw, 48vw"
                    priority={active.id === "strawberry"}
                  />
                </div>
              ) : (
                <div className="mixfruit-scoop" role="img" aria-label="Emerald green Mix Fruit ice cream scoop">
                  <span className="mixfruit-highlight" />
                  <span className="mixfruit-fruit fruit-a" />
                  <span className="mixfruit-fruit fruit-b" />
                  <span className="mixfruit-fruit fruit-c" />
                </div>
              )}

              <motion.div
                className="flavour-label"
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.45 }}
              >
                <span>{active.kicker}</span>
                <h3>{active.name}</h3>
                <p>{active.note}</p>
                <a href="#menu" className="flavour-explore">View the menu <i aria-hidden="true">↗</i></a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flavour-stage-caption">Tap a flavour · Let the scene change</div>
        </div>
      </div>
    </section>
  );
}
