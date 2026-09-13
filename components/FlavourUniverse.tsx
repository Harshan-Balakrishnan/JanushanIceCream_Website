"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const flavours = [
  { id: "strawberry", name: "Strawberry", number: "01", descriptor: "Bright · Berry · Joyful", image: "/flavours/strawberry.webp", accent: "#ff5f89", deep: "#8d1739" },
  { id: "mango", name: "Mango", number: "02", descriptor: "Golden · Tropical · Smooth", image: "/flavours/mango.webp", accent: "#ffb52f", deep: "#a66a09" },
  { id: "chocolate", name: "Chocolate", number: "03", descriptor: "Deep · Rich · Indulgent", image: "/flavours/chocolate.webp", accent: "#b96f45", deep: "#35140d" },
  { id: "vanilla", name: "Vanilla", number: "04", descriptor: "Classic · Creamy · Elegant", image: "/flavours/vanilla.webp", accent: "#f1d58a", deep: "#8d6920" },
  { id: "mix-fruit", name: "Mix Fruit", number: "05", descriptor: "Fresh · Playful · Vibrant", image: "/flavours/mix fruit.webp", accent: "#63d58a", deep: "#0b6740" },
] as const;

type Flavour = (typeof flavours)[number];

export default function FlavourUniverse() {
  const [activeId, setActiveId] = useState<Flavour["id"]>("strawberry");
  const active = useMemo(() => flavours.find((flavour) => flavour.id === activeId) ?? flavours[0], [activeId]);

  const buildWithFlavour = () => {
    window.dispatchEvent(new CustomEvent("jic:select-flavour", { detail: active.id }));
    document.getElementById("build")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="flavour-showcase" id="flavours" aria-labelledby="flavour-showcase-title" style={{ "--showcase-accent": active.accent, "--showcase-deep": active.deep } as React.CSSProperties}>
      <div className="flavour-showcase-watermark" aria-hidden="true">JANUSHAN</div>
      <div className="flavour-showcase-orb flavour-showcase-orb-a" aria-hidden="true" />
      <div className="flavour-showcase-orb flavour-showcase-orb-b" aria-hidden="true" />

      <div className="flavour-showcase-inner">
        <header className="flavour-showcase-head">
          <div className="flavour-showcase-brand" aria-hidden="true">
            <Image src="/brand/janushan-logo.png" alt="" width={82} height={82} />
          </div>
          <p className="section-kicker">MORE THAN ICE CREAM · IT&apos;S HAPPINESS</p>
          <h2 id="flavour-showcase-title">FLAVOUR <em>UNIVERSE</em></h2>
          <p className="flavour-showcase-intro">Discover the Janushan world — five signature flavours, each with its own character.</p>
        </header>

        <div className="flavour-card-rail" role="tablist" aria-label="Choose a Janushan flavour">
          {flavours.map((flavour) => {
            const selected = flavour.id === active.id;
            return (
              <button type="button" role="tab" aria-selected={selected} aria-controls={`flavour-panel-${flavour.id}`} className={`flavour-card ${selected ? "is-active" : ""}`} key={flavour.id} onClick={() => setActiveId(flavour.id)} style={{ "--card-accent": flavour.accent, "--card-deep": flavour.deep } as React.CSSProperties}>
                <span className="flavour-card-number">{flavour.number}</span>
                <span className="flavour-card-glow" aria-hidden="true" />
                <span className="flavour-card-image"><Image src={flavour.image} alt={`${flavour.name} ice cream`} fill sizes="(max-width: 700px) 72vw, 20vw" /></span>
                <span className="flavour-card-copy"><small>{flavour.descriptor}</small><strong>{flavour.name}</strong></span>
                <span className="flavour-card-arrow" aria-hidden="true">↗</span>
              </button>
            );
          })}
        </div>

        <div className="flavour-showcase-detail" id={`flavour-panel-${active.id}`} role="tabpanel" aria-live="polite">
          <div><span className="flavour-detail-kicker">{active.number} / {active.descriptor}</span><h3>{active.name} <em>made for happiness.</em></h3></div>
          <button type="button" className="flavour-detail-cta" onClick={buildWithFlavour}>Build with {active.name} <i aria-hidden="true">↗</i></button>
        </div>

        <div className="flavour-showcase-scroll-hint" aria-hidden="true"><span /> Choose a flavour <span /></div>
      </div>
    </section>
  );
}
