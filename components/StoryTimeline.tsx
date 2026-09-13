"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const chapters = [
  {
    marker: "2004",
    kicker: "WHERE IT ALL BEGAN",
    title: "A Vavuniya favourite since 2004.",
    copy: "Janushan Ice Cream began its journey in 2004 and has proudly carried the name through generations of customers. What started as a local ice cream business continues with the same focus on making every visit a little sweeter.",
    visual: "/brand/brand2004.webp",
    alt: "Janushan Ice Cream logo",
    type: "logo",
  },
  {
    marker: "CRAFT",
    kicker: "MADE FOR EVERY SCOOP",
    title: "Simple treats, made to enjoy.",
    copy: "From creamy cups and classic cones to indulgent specials, Janushan is all about generous portions, familiar favourites and the joy of sharing something cold and delicious.",
    visual: "/products/company.jpg",
    alt: "Janushan waffle cone",
    type: "product",
  },
  {
    marker: "FLAVOUR",
    kicker: "FIVE FAVOURITES",
    title: "Find the flavour that feels like you.",
    copy: "Strawberry, Mango, Chocolate, Vanilla and Mix Fruit bring different moods to the menu. Pick a classic, try something fruity or explore them all.",
    visual: "/flavours/All flavour.png",
    alt: "Janushan flavour presentation",
    type: "product",
  },
  {
    marker: "TODAY",
    kicker: "A SCOOP OF HAPPINESS",
    title: "Still serving the next generation.",
    copy: "Today, Janushan continues to serve Vavuniya through its shop and mobile van — bringing familiar favourites to families, friends and new customers ready for their next scoop.",
    visual: "/products/special.webp",
    alt: "Janushan special ice cream",
    type: "product",
  },
];

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 70%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const yearOpacity = useTransform(progress, [0, 0.1, 0.92, 1], [0.55, 1, 1, 0.55]);
  const haloScale = useTransform(progress, [0, 1], [0.82, 1.18]);

  return (
    <section className="story-world" id="story">
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
          <p className="story-sticky-copy">Our story, one scoop at a time</p>
        </aside>

        <div className="story-track-wrap">
          <div className="story-line" aria-hidden="true"><motion.span style={{ scaleY: progress }} /></div>

          <header className="story-intro">
            <p className="section-kicker">OUR STORY · SINCE 2004</p>
            <h2>Good ice cream has a history.<br /><em>Ours is still being served.</em></h2>
            <p>From our Vavuniya roots to today&apos;s shop and mobile van, follow the story behind Janushan and the flavours customers keep coming back for.</p>
          </header>

          {chapters.map((chapter, index) => (
            <motion.article className="story-chapter" key={chapter.marker} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.28 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
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

          <motion.div className="story-finale" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.8 }}>
            <span>2004 → TODAY</span>
            <h3>One brand. Many flavours.<br />One story still unfolding.</h3>
            <p>JANUSHAN ICE CREAM</p>
            <a href="#locations" className="button button-primary">Find Janushan ↓</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
