"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const whatsappHref = "https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream%2C%20I%27d%20like%20to%20place%20an%20order.";
const instagramHref = "https://www.instagram.com/janushan_ice_cream/";
const facebookHref = "https://www.facebook.com/janushanicecream";
const googleReviewHref = "https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya";

export default function EntranceExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero cinematic-hero" id="home" aria-label="Janushan Ice Cream introduction">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="cinema-vignette" aria-hidden="true" /><div className="stars" aria-hidden="true" />
      <motion.div className="brand-aura" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: 0.55 }} animate={reduceMotion ? undefined : { opacity: [0, 0.85, 0.42], scale: [0.55, 1.15, 1] }} transition={{ duration: 2.4, delay: 0.35, ease: "easeOut" }} />

      <div className="scoop-stage" aria-hidden="true">
        <motion.div className="scoop-shadow" initial={reduceMotion ? false : { opacity: 0.05, scaleX: 0.45 }} animate={reduceMotion ? undefined : { opacity: [0.05, 0.3, 0.46], scaleX: [0.45, 0.8, 1] }} transition={{ duration: 0.88, delay: 0.25, ease: "easeIn" }} />
        <motion.div className="premium-scoop-wrap cinematic-scoop-entry" initial={reduceMotion ? false : { y: -390, opacity: 0, rotate: -4, scale: 0.86, filter: "blur(8px)" }} animate={reduceMotion ? undefined : { y: [-390, -335, -235, -125, -38, 0], opacity: [0, 0.25, 0.65, 0.92, 1, 1], rotate: [-4, -2.5, -1.2, -0.4, 0, 0], scale: [0.86, 0.9, 0.94, 0.98, 1.01, 1], filter: ["blur(8px)", "blur(5px)", "blur(2px)", "blur(0px)", "blur(0px)", "blur(0px)"] }} transition={{ duration: 1.72, times: [0, 0.15, 0.36, 0.62, 0.84, 1], delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>
          <span className="scoop-particle-trail" aria-hidden="true"><i className="scoop-particle particle-1" /><i className="scoop-particle particle-2" /><i className="scoop-particle particle-3" /><i className="scoop-particle particle-4" /><i className="scoop-particle particle-5" /><i className="scoop-particle particle-6" /></span>
          <motion.span className="scoop-entry-glow" initial={reduceMotion ? false : { opacity: 0, scale: 0.55 }} animate={reduceMotion ? undefined : { opacity: [0, 0.65, 0.2, 0], scale: [0.55, 0.9, 1.15, 1.3] }} transition={{ duration: 1.55, delay: 0.28, times: [0, 0.28, 0.7, 1], ease: "easeOut" }} />
          <motion.div className="premium-scoop" animate={reduceMotion ? undefined : { y: [0, -1.5, 0], rotate: [0, 0.12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.15 }}><span className="scoop-ridge ridge-a" /><span className="scoop-ridge ridge-b" /><span className="scoop-ridge ridge-c" /><span className="scoop-gloss" /><span className="scoop-rim rim-a" /><span className="scoop-rim rim-b" /><span className="scoop-rim rim-c" /></motion.div>
          <motion.span className="scoop-contact-light" initial={reduceMotion ? false : { opacity: 0, scaleX: 0.35 }} animate={reduceMotion ? undefined : { opacity: [0, 0.9, 0.32], scaleX: [0.35, 1, 0.82] }} transition={{ duration: 0.65, delay: 1.58, times: [0, 0.45, 1], ease: "easeOut" }} />
        </motion.div>
        <motion.div className="cone premium-cone" initial={reduceMotion ? false : { scaleY: 1, y: 0 }} animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.95, 1.015, 1], y: [0, 0, 8, -2, 0] }} transition={{ duration: 0.55, delay: 1.06, times: [0, 0.2, 0.45, 0.72, 1] }}><span className="cone-lip" /><span className="cone-shine" /><span className="cone-grid cone-grid-a" /><span className="cone-grid cone-grid-b" /></motion.div>
        <motion.div className="gold-dust" initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion ? undefined : { opacity: [0, 0, 1, 0.55] }} transition={{ duration: 2.2, delay: 1.25 }}>{Array.from({ length: 12 }).map((_, index) => <i key={index} />)}</motion.div>
      </div>

      <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }} animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 1.7, ease: "easeOut" }}>
        <motion.div className="logo-shell cinematic-logo" initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -4 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 85, damping: 12, delay: 1.48 }}><Image src="/brand/janushan-logo.png" alt="Janushan Ice Cream logo" width={180} height={180} priority /></motion.div>
        <p className="eyebrow">PREMIUM ICE CREAM · SINCE 2004</p><h1>JANUSHAN<br />ICE<br />CREAM<br /></h1><p className="tagline">A Scoop of Happiness.</p>
        <div className="hero-actions"><a className="button button-primary" href="#menu">View Menu</a><a className="button button-ghost" href={whatsappHref} target="_blank" rel="noreferrer">Order on WhatsApp</a><a className="hero-secondary-link" href="#flavours">Explore Flavours <span aria-hidden="true">→</span></a></div>
        <nav className="hero-socials" aria-label="Janushan Ice Cream social and review links">
          <a href={instagramHref} target="_blank" rel="noreferrer" aria-label="Follow Janushan Ice Cream on Instagram"><span aria-hidden="true">◎</span> Instagram</a>
          <a href={facebookHref} target="_blank" rel="noreferrer" aria-label="Visit Janushan Ice Cream on Facebook"><span aria-hidden="true">f</span> Facebook</a>
          <a href={googleReviewHref} target="_blank" rel="noreferrer" aria-label="Find Janushan Ice Cream on Google and leave a review"><span aria-hidden="true">★</span> Review us on Google</a>
        </nav>
      </motion.div>

      <motion.a className="scroll-cue" href="#discover" aria-label="Scroll to discover Janushan Ice Cream" initial={reduceMotion ? false : { opacity: 0 }} animate={reduceMotion ? undefined : { opacity: 1 }} transition={{ duration: 0.8, delay: 2.65 }}><span>SCROLL TO TASTE</span><i /></motion.a>
    </section>
  );
}
