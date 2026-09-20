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
          animate={
            reduceMotion
              ? undefined
              : {
                  scaleY: [1, 1, 0.95, 1.015, 1, 1.008, 1],
                  y: [0, 0, 8, -2, 0, -2, 0],
                  rotate: [0, 0, -0.45, 0.3, 0, -0.18, 0],
                }
          }
          transition={{
            duration: 5.8,
            delay: 1.06,
            times: [0, 0.1, 0.2, 0.31, 0.42, 0.68, 1],
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
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
        <h1 aria-label="Janushan Ice Cream"><span className="hero-brand-word"><b className="hero-brand-initial">J</b>ANUSHAN</span><br /><span className="hero-brand-word"><b className="hero-brand-initial">I</b>CE</span><br/><span className="hero-brand-word"><b className="hero-brand-initial">C</b>REAM</span><br/></h1>
        <p className="tagline">A Scoop of Happiness.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#discover">Discover Janushan</a>
          <a className="button button-ghost" href="#flavours">Explore Flavours</a>
        </div>
        <div className="home-social-links" aria-label="Janushan Ice Cream social links">
          <a className="home-social-link facebook" href="https://www.facebook.com/janushanicecream" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream on Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6v8h2.9Z"/></svg>
          </a>
          <a className="home-social-link instagram" href="https://www.instagram.com/janushan_ice_cream/" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream on Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="home-instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FFDC80"/><stop offset=".35" stop-color="#F77737"/><stop offset=".65" stop-color="#E1306C"/><stop offset="1" stop-color="#833AB4"/></linearGradient></defs><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="url(#home-instagram-gradient)" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="url(#home-instagram-gradient)" stroke-width="2"/><circle cx="17.4" cy="6.7" r="1.2" fill="#E1306C"/></svg>
          </a>
          <a className="home-social-link google" href="https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream Google reviews">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"/><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"/><path fill="#FBBC05" d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.37l3.25-2.53Z"/><path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.13 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53C7.31 7.85 9.46 6.13 12 6.13Z"/></svg>
          </a>
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
