"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

const bases = [
  { id: "cup", name: "Cup", icon: "◒" },
  { id: "cone", name: "Cone", icon: "▽" },
  { id: "waffle-cone", name: "Waffle Cone", icon: "◇" },
  { id: "waffle-boat", name: "Waffle Boat", icon: "⌣" },
] as const;

const flavours = [
  { id: "strawberry", name: "Strawberry", colour: "#ef7199", deep: "#bd3568" },
  { id: "mango", name: "Mango", colour: "#f7aa26", deep: "#d36d0c" },
  { id: "chocolate", name: "Chocolate", colour: "#744532", deep: "#3f2118" },
  { id: "vanilla", name: "Vanilla", colour: "#ffe9ad", deep: "#d9ba68" },
  { id: "mix-fruit", name: "Mix Fruit", colour: "#67c98d", deep: "#26885a" },
] as const;

const toppings = [
  { id: "sprinkles", name: "Sprinkles" },
  { id: "nuts", name: "Crunchy Nuts" },
  { id: "wafer", name: "Wafer Stick" },
  { id: "none", name: "No Topping" },
] as const;

const sauces = [
  { id: "chocolate", name: "Chocolate", colour: "#35160f" },
  { id: "strawberry", name: "Strawberry", colour: "#c72f60" },
  { id: "caramel", name: "Caramel", colour: "#b96b20" },
  { id: "none", name: "No Sauce", colour: "transparent" },
] as const;

type BaseId = (typeof bases)[number]["id"];
type FlavourId = (typeof flavours)[number]["id"];
type ToppingId = (typeof toppings)[number]["id"];
type SauceId = (typeof sauces)[number]["id"];

export default function IceCreamBuilder() {
  const [base, setBase] = useState<BaseId>("waffle-cone");
  const [flavour, setFlavour] = useState<FlavourId>("mango");
  const [scoops, setScoops] = useState(2);
  const [topping, setTopping] = useState<ToppingId>("sprinkles");
  const [sauce, setSauce] = useState<SauceId>("chocolate");
  const [saved, setSaved] = useState(false);
  const reduceMotion = useReducedMotion();

  const activeFlavour = useMemo(() => flavours.find((item) => item.id === flavour) ?? flavours[0], [flavour]);
  const activeSauce = useMemo(() => sauces.find((item) => item.id === sauce) ?? sauces[0], [sauce]);
  const creationName = `${scoops === 1 ? "Single" : scoops === 2 ? "Double" : "Triple"} ${activeFlavour.name} ${bases.find((item) => item.id === base)?.name}`;

  const shareCreation = async () => {
    const text = `My Janushan creation: ${creationName} with ${toppings.find((item) => item.id === topping)?.name}${sauce !== "none" ? ` and ${activeSauce.name} sauce` : ""}.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My JIC Creation", text });
      } else {
        await navigator.clipboard.writeText(text);
        setSaved(true);
        window.setTimeout(() => setSaved(false), 1600);
      }
    } catch {
      // The visitor can dismiss the native share sheet without creating an error state.
    }
  };

  return (
    <section className="builder section" id="build" aria-labelledby="builder-title" style={{ "--builder-flavour": activeFlavour.colour, "--builder-flavour-deep": activeFlavour.deep, "--builder-sauce": activeSauce.colour } as React.CSSProperties}>
      <div className="builder-glow builder-glow-a" aria-hidden="true" />
      <div className="builder-glow builder-glow-b" aria-hidden="true" />

      <header className="builder-heading">
        <p className="section-kicker">BUILD YOUR DREAM ICE CREAM</p>
        <h2 id="builder-title">Make it yours.<br /><em>One delicious choice at a time.</em></h2>
        <p>Choose your serve, flavour, scoops and finish. Your JIC creation changes live as you build it.</p>
      </header>

      <div className="builder-layout">
        <div className="builder-controls" aria-label="Ice cream builder controls">
          <fieldset>
            <legend><span>01</span> Choose your serve</legend>
            <div className="builder-options builder-options-four">
              {bases.map((item) => <button type="button" key={item.id} className={base === item.id ? "is-active" : ""} onClick={() => setBase(item.id)}><i>{item.icon}</i><strong>{item.name}</strong></button>)}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>02</span> Pick a flavour</legend>
            <div className="builder-options flavour-choice-row">
              {flavours.map((item) => <button type="button" key={item.id} className={flavour === item.id ? "is-active" : ""} onClick={() => setFlavour(item.id)}><i className="flavour-dot" style={{ background: item.colour }} /><strong>{item.name}</strong></button>)}
            </div>
          </fieldset>

          <fieldset>
            <legend><span>03</span> How many scoops?</legend>
            <div className="scoop-counter" role="group" aria-label="Number of scoops">
              {[1, 2, 3].map((count) => <button type="button" key={count} className={scoops === count ? "is-active" : ""} onClick={() => setScoops(count)}>{count}<small>{count === 1 ? "SCOOP" : "SCOOPS"}</small></button>)}
            </div>
          </fieldset>

          <div className="builder-control-pair">
            <fieldset>
              <legend><span>04</span> Topping</legend>
              <select value={topping} onChange={(event) => setTopping(event.target.value as ToppingId)}>
                {toppings.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
              </select>
            </fieldset>
            <fieldset>
              <legend><span>05</span> Sauce</legend>
              <select value={sauce} onChange={(event) => setSauce(event.target.value as SauceId)}>
                {sauces.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
              </select>
            </fieldset>
          </div>
        </div>

        <div className="builder-stage-wrap">
          <div className="builder-stage" aria-live="polite">
            <div className="builder-rings" aria-hidden="true"><i /><i /></div>
            <motion.div className="creation" key={`${base}-${flavour}-${scoops}-${topping}-${sauce}`} initial={reduceMotion ? false : { opacity: .5, scale: .965, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 180, damping: 20 }}>
              <div className={`creation-scoops scoops-${scoops}`}>
                {Array.from({ length: scoops }).map((_, index) => (
                  <div className="builder-scoop" key={index} style={{ zIndex: 8 - index }}>
                    <i className="scoop-shine" />
                    {sauce !== "none" && <i className="sauce-drizzle" />}
                    {topping === "sprinkles" && <span className="sprinkles" aria-hidden="true">✦ · ✧ · ✦ ·</span>}
                    {topping === "nuts" && <span className="nuts" aria-hidden="true">● ◦ ● ◦</span>}
                  </div>
                ))}
                {topping === "wafer" && <span className="wafer-stick" aria-hidden="true" />}
              </div>
              {base === "cup" && <div className="build-base cup-base"><Image src="/brand/janushan-logo.png" alt="" width={77} height={77} /></div>}
              {base === "cone" && <div className="build-base cone-base"><i /><b /></div>}
              {base === "waffle-cone" && <div className="build-base cone-base waffle-base"><i /><b /></div>}
              {base === "waffle-boat" && <div className="build-base boat-base"><i /><b /></div>}
              <div className="creation-shadow" aria-hidden="true" />
            </motion.div>
          </div>

          <div className="creation-summary">
            <div>
              <span>YOUR JIC CREATION</span>
              <h3>{creationName}</h3>
              <p>{toppings.find((item) => item.id === topping)?.name} · {activeSauce.name === "No Sauce" ? "No sauce" : `${activeSauce.name} sauce`}</p>
            </div>
            <div className="creation-actions">
              <button type="button" className="button button-primary" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1600); }}>{saved ? "Saved ✓" : "Save Creation"}</button>
              <button type="button" className="button button-ghost" onClick={shareCreation}>Share</button>
            </div>
            <small>Concept preview only. Ordering will be connected when the Janushan backend/admin system is introduced.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
