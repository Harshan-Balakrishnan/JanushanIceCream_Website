"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const chapters = [
  {
    marker: "2004",
    kicker: "WHERE THE STORY BEGINS",
    title: "A name made to last.",
    copy: "Janushan carries one date proudly across its identity: Since 2004. This chapter gives that beginning room to breathe — simple, confident and unmistakably ours.",
    visual: "/brand/brand2004.webp",
    alt: "Janushan Ice Cream logo",
    type: "logo",
  },
  {
    marker: "CRAFT",
    kicker: "MADE IN SRI LANKA",
    title: "From flavour to feeling.",
    copy: "The brand experience is built around the thing people remember most: the scoop itself. Rich flavour worlds, generous servings and a presentation designed to turn a treat into a moment.",
    visual: "/products/company.jpg",
    alt: "Janushan waffle cone",
    type: "product",
  },
  {
    marker: "FLAVOUR",
    kicker: "FIVE WORLDS · ONE BRAND",
    title: "Every flavour has a mood.",
    copy: "Strawberry, Mango, Chocolate, Vanilla and Mix Fruit each get their own atmosphere while staying inside one Janushan visual language.",
    visual: "/flavours/All flavour.png",
    alt: "Janushan mango flavour presentation",
    type: "product",
  },
  {
    marker: "TODAY",
    kicker: "A SCOOP OF HAPPINESS",
    title: "The story is still being served.",
    copy: "The website brings the heritage, products and playful side of Janushan into one modern digital experience — made for phones, families and the next generation of customers.",
    visual: "/products/special.webp",
    alt: "Janushan special ice cream",
    type: "product",
  },
];

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 45%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const yearOpacity = useTransform(progress, [0, 0.1, 0.92, 1], [0.55, 1, 1, 0.55]);
  const haloScale = useTransform(progress, [0, 1], [0.82, 1.18]);

  return (
    <section className="story-world" id="story" ref={sectionRef}>
      <div className="story-ambient story-ambient-a" />
      <div className="story-ambient story-ambient-b" />
      <div className="story-shell">
        <aside className="story-sticky" aria-hidden="true">
          <p className="section-kicker">THE JANUSHAN STORY</p>
          <motion.div className="story-year" style={{ opacity: yearOpacity }}>2004</motion.div>
          <p className="story-since">SINCE</p>
          <div className="story-seal">
            <motion.i style={{ scale: haloScale }} />
            <Image src="/brand/Brand Logo.png" alt="" width={123} height={123} />
          </div>
          <p className="story-sticky-copy">Scroll through the chapters</p>
        </aside>

        <div className="story-track-wrap">
          <div className="story-line" aria-hidden="true">
            <motion.span style={{ scaleY: progress }} />
          </div>

          <header className="story-intro">
            <p className="section-kicker">OUR STORY · SINCE 2004</p>
            <h2>Some brands have a timeline.<br /><em>Janushan has a flavour trail.</em></h2>
            <p>Instead of inventing dates or events, this experience tells the story using the brand facts and product world already established by Janushan.</p>
          </header>

          {chapters.map((chapter, index) => (
            <motion.article
              className="story-chapter"
              key={chapter.marker}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="story-node" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="story-card">
                <div className="story-card-copy">
                  <span className="story-marker">{chapter.marker}</span>
                  <p className="section-kicker">{chapter.kicker}</p>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </div>
                <div className={`story-visual story-visual-${chapter.type}`}>
                  <div className="story-visual-glow" />
                  <Image src={chapter.visual} alt={chapter.alt} width={1000} height={700} />
                </div>
              </div>
            </motion.article>
          ))}

          <motion.div
            className="story-finale"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.8 }}
          >
            <span>2004 → TODAY</span>
            <h3>One brand. Many flavours.<br />One story still unfolding.</h3>
            <p>JANUSHAN ICE CREAM</p>
            <a href="#locations" className="button button-primary">Continue the Journey ↓</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
