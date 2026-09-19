"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const droplets = [
  { x: -148, y: -35, s: 13, d: 0.98 },
  { x: -112, y: -78, s: 9, d: 1.02 },
  { x: -76, y: -104, s: 7, d: 1.06 },
  { x: 76, y: -102, s: 8, d: 1.04 },
  { x: 116, y: -72, s: 10, d: 1.0 },
  { x: 154, y: -32, s: 12, d: 0.96 },
];

export default function EntranceExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero cinematic-hero" id="home" aria-label="Janushan Ice Cream introduction">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="cinema-vignette" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      <div className="hero-socials" aria-label="Janushan Ice Cream social links">
        <a href="https://www.instagram.com/janushan_ice_cream/" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.8A4 4 0 0 0 3.8 7.8v8.4a4 4 0 0 0 4 4h8.4a4 4 0 0 0 4-4V7.8a4 4 0 0 0-4-4H7.8Zm8.85 1.35a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"/></svg>
        </a>
        <a href="https://www.facebook.com/janushanicecream" target="_blank" rel="noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.88v-8.4H7.08v-3.48h3.05V9.43c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.88v2.24h3.32l-.53 3.48h-2.79v8.4C19.61 23.07 24 18.09 24 12.07Z"/></svg>
        </a>
        <a href="https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya" target="_blank" rel="noreferrer" aria-label="Google reviews">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.35 12.27c0-.73-.07-1.44-.2-2.12H12v4.02h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.29ZM12 21c2.63 0 4.84-.87 6.43-2.36l-3.14-2.45c-.87.58-1.98.93-3.29.93-2.53 0-4.68-1.71-5.45-4.01H3.3v2.53A9.71 9.71 0 0 0 12 21Zm-8.7-5.36 3.25-2.53a5.83 5.83 0 0 1 0-3.72L3.3 6.86A9.98 9.98 0 0 0 2 12c0 1.65.4 3.21 1.3 4.64ZM12 5.85c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 2.92 14.62 2 12 2a9.71 9.71 0 0 0-8.7 4.86l3.25 2.53C7.32 7.56 9.47 5.85 12 5.85Z"/></svg>
        </a>
      </div>

      <motion.div
        className="brand-aura"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.55 }}
        animate={reduceMotion ? undefined : { opacity: [0, 0.85, 0.42], scale: [0.55, 1.15, 1] }}
        transition={{ duration: 2.4, delay: 0.35, ease: "easeOut" }}
      />

      <div className="scoop-stage" aria-hidden="true">
        <motion.div
          className="scoop-shadow"
          initial={reduceMotion ? false : { opacity: 0.05, scaleX: 0.45 }}
          animate={reduceMotion ? undefined : { opacity: [0.05, 0.3, 0.46], scaleX: [0.45, 0.8, 1] }}
          transition={{ duration: 0.88, delay: 0.25, ease: "easeIn" }}
        />

        <motion.div
  className="premium-scoop-wrap cinematic-scoop-entry"
  initial={
    reduceMotion
      ? false
      : {
          y: -390,
          opacity: 0,
          rotate: -4,
          scale: 0.86,
          filter: "blur(8px)",
        }
  }
  animate={
    reduceMotion
      ? undefined
      : {
          y: [-390, -335, -235, -125, -38, 0],
          opacity: [0, 0.25, 0.65, 0.92, 1, 1],
          rotate: [-4, -2.5, -1.2, -0.4, 0, 0],
          scale: [0.86, 0.9, 0.94, 0.98, 1.01, 1],
          filter: [
            "blur(8px)",
            "blur(5px)",
            "blur(2px)",
            "blur(0px)",
            "blur(0px)",
            "blur(0px)",
          ],
        }
  }
  transition={{
    duration: 1.72,
    times: [0, 0.15, 0.36, 0.62, 0.84, 1],
    delay: 0.22,
    ease: [0.16, 1, 0.3, 1],
  }}
>
  {/* Golden particle trail */}
  <span className="scoop-particle-trail" aria-hidden="true">
    <i className="scoop-particle particle-1" />
    <i className="scoop-particle particle-2" />
    <i className="scoop-particle particle-3" />
    <i className="scoop-particle particle-4" />
    <i className="scoop-particle particle-5" />
    <i className="scoop-particle particle-6" />
  </span>

  {/* Premium light surrounding the scoop */}
  <motion.span
    className="scoop-entry-glow"
    initial={
      reduceMotion
        ? false
        : {
            opacity: 0,
            scale: 0.55,
          }
    }
    animate={
      reduceMotion
        ? undefined
        : {
            opacity: [0, 0.65, 0.2, 0],
            scale: [0.55, 0.9, 1.15, 1.3],
          }
    }
    transition={{
      duration: 1.55,
      delay: 0.28,
      times: [0, 0.28, 0.7, 1],
      ease: "easeOut",
    }}
  />

  <motion.div
    className="premium-scoop"
    animate={
      reduceMotion
        ? undefined
        : {
            y: [0, -1.5, 0],
            rotate: [0, 0.12, 0],
          }
    }
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2.15,
    }}
  >
    <span className="scoop-ridge ridge-a" />
    <span className="scoop-ridge ridge-b" />
    <span className="scoop-ridge ridge-c" />
    <span className="scoop-gloss" />
    <span className="scoop-rim rim-a" />
    <span className="scoop-rim rim-b" />
    <span className="scoop-rim rim-c" />
  </motion.div>

  {/* Premium landing light */}
  <motion.span
    className="scoop-contact-light"
    initial={
      reduceMotion
        ? false
        : {
            opacity: 0,
            scaleX: 0.35,
          }
    }
    animate={
      reduceMotion
        ? undefined
        : {
            opacity: [0, 0.9, 0.32],
            scaleX: [0.35, 1, 0.82],
          }
    }
    transition={{
      duration: 0.65,
      delay: 1.58,
      times: [0, 0.45, 1],
      ease: "easeOut",
    }}
  />
</motion.div>

        <motion.div
          className="cream-crown"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.25, scaleY: 0.45 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0, 1, 0.82], scaleX: [0.25, 0.25, 1.08, 1], scaleY: [0.45, 0.45, 1.16, 1] }}
          transition={{ duration: 0.7, delay: 1.08, ease: "easeOut" }}
        >
          <span className="cream-lobe lobe-one" />
          <span className="cream-lobe lobe-two" />
          <span className="cream-lobe lobe-three" />
        </motion.div>

        {droplets.map((drop, index) => (
          <motion.span
            className="splash-drop"
            key={index}
            style={{ width: drop.s, height: drop.s }}
            initial={reduceMotion ? false : { opacity: 0, x: 0, y: 30, scale: 0.2 }}
            animate={reduceMotion ? undefined : { opacity: [0, 1, 0], x: [0, drop.x * 0.55, drop.x], y: [30, drop.y, drop.y + 44], scale: [0.2, 1, 0.72] }}
            transition={{ duration: 1.02, delay: drop.d, ease: "easeOut" }}
          />
        ))}

        <motion.div
          className="impact-ring premium-impact"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.15, scaleY: 0.45 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0.95, 0], scaleX: [0.15, 1.05, 1.65], scaleY: [0.45, 1, 0.75] }}
          transition={{ duration: 0.76, delay: 1.03, ease: "easeOut" }}
        />

        <motion.div
          className="cone premium-cone"
          initial={reduceMotion ? false : { scaleY: 1, y: 0 }}
          animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.95, 1.015, 1], y: [0, 0, 8, -2, 0] }}
          transition={{ duration: 0.55, delay: 1.06, times: [0, 0.2, 0.45, 0.72, 1] }}
        >
          <span className="cone-lip" />
          <span className="cone-shine" />
          <span className="cone-grid cone-grid-a" />
          <span className="cone-grid cone-grid-b" />
        </motion.div>

        <motion.div
          className="gold-dust"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0, 1, 0.55] }}
          transition={{ duration: 2.2, delay: 1.25 }}
        >
          {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
        </motion.div>
      </div>

      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 1.7, ease: "easeOut" }}
      >
        <motion.div
          className="logo-shell cinematic-logo"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.6, rotate: -4 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 85, damping: 12, delay: 1.48 }}
        >
          <Image src="/brand/janushan-logo.png" alt="Janushan Ice Cream logo" width={180} height={180} priority />
        </motion.div>
        <p className="eyebrow">PREMIUM ICE CREAM · SINCE 2004</p>
        <h1>JANUSHAN<br />ICE<br/>CREAM<br/></h1>
        <p className="tagline">A Scoop of Happiness.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#menu">View Menu</a>
          <a className="button button-ghost" href="https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream!%20I'd%20like%20to%20ask%20about%20your%20menu." target="_blank" rel="noreferrer">Order on WhatsApp ↗</a>
          <a className="hero-text-link" href="#flavours">Explore Flavours ↓</a>
        </div>
      </motion.div>

      <motion.a
        className="scroll-cue"
        href="#discover"
        aria-label="Scroll to discover Janushan Ice Cream"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.65 }}
      >
        <span>SCROLL TO TASTE</span>
        <i />
      </motion.a>
    </section>
  );
}
