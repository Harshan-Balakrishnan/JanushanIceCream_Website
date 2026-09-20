"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const droplets = [
  { x: -150, y: -34, s: 12, d: 0.95 },
  { x: -112, y: -76, s: 8, d: 1.0 },
  { x: -76, y: -102, s: 6, d: 1.04 },
  { x: 76, y: -102, s: 7, d: 1.03 },
  { x: 116, y: -72, s: 9, d: 0.99 },
  { x: 150, y: -30, s: 11, d: 0.95 },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/janushan_ice_cream/",
    path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 1.8A4 4 0 0 0 3.8 7.8v8.4a4 4 0 0 0 4 4h8.4a4 4 0 0 0 4-4V7.8a4 4 0 0 0-4-4H7.8Zm8.85 1.35a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/janushanicecream",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11 10.13 11.88v-8.4H7.08v-3.48h3.05V9.43c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.88v2.24h3.32l-.53 3.48h-2.79v8.4C19.61 23.07 24 18.09 24 12.07Z",
  },
  {
    label: "Google Reviews",
    href: "https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya",
    path: "M21.35 12.27c0-.73-.07-1.44-.2-2.12H12v4.02h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.29ZM12 21c2.63 0 4.84-.87 6.43-2.36l-3.14-2.45c-.87.58-1.98.93-3.29.93-2.53 0-4.68-1.71-5.45-4.01H3.3v2.53A9.71 9.71 0 0 0 12 21Zm-8.7-5.36 3.25-2.53a5.83 5.83 0 0 1 0-3.72L3.3 6.86A9.98 9.98 0 0 0 2 12c0 1.65.4 3.21 1.3 4.64ZM12 5.85c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 2.92 14.62 2 12 2a9.71 9.71 0 0 0-8.7 4.86l3.25 2.53C7.32 7.56 9.47 5.85 12 5.85Z",
  },
];

export default function EntranceExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero cinematic-hero" id="home" aria-label="Janushan Ice Cream introduction">
      <div className="hero-image-overlay" aria-hidden="true" />

      <div className="hero-scoop-stage" aria-hidden="true">
        <motion.div
          className="hero-scoop-shadow"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.4 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0.42, 0.25], scaleX: [0.4, 1, 0.86] }}
          transition={{ duration: 0.9, delay: 1.0, ease: "easeOut" }}
        />

        <motion.div
          className="hero-scoop-entry"
          initial={reduceMotion ? false : { y: -420, opacity: 0, rotate: -5, scale: 0.82 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [-420, -300, -150, -42, 0],
                  opacity: [0, 0.35, 0.75, 1, 1],
                  rotate: [-5, -2.5, -0.8, 0, 0],
                  scale: [0.82, 0.9, 0.96, 1.02, 1],
                }
          }
          transition={{
            duration: 1.65,
            times: [0, 0.2, 0.48, 0.78, 1],
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="hero-scoop-particle particle-1" />
          <span className="hero-scoop-particle particle-2" />
          <span className="hero-scoop-particle particle-3" />
          <span className="hero-scoop-particle particle-4" />

          <motion.span
            className="hero-scoop-glow"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={reduceMotion ? undefined : { opacity: [0, 0.7, 0], scale: [0.5, 1, 1.3] }}
            transition={{ duration: 1.45, delay: 0.28, ease: "easeOut" }}
          />

          <motion.div
            className="hero-premium-scoop"
            animate={reduceMotion ? undefined : { y: [0, -2, 0], rotate: [0, 0.15, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <span className="scoop-ridge ridge-a" />
            <span className="scoop-ridge ridge-b" />
            <span className="scoop-ridge ridge-c" />
            <span className="scoop-gloss" />
            <span className="scoop-rim rim-a" />
            <span className="scoop-rim rim-b" />
            <span className="scoop-rim rim-c" />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-cream-crown"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.25, scaleY: 0.4 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0, 1, 0.95], scaleX: [0.25, 0.25, 1.08, 1], scaleY: [0.4, 0.4, 1.15, 1] }}
          transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
        >
          <span className="cream-lobe lobe-one" />
          <span className="cream-lobe lobe-two" />
          <span className="cream-lobe lobe-three" />
        </motion.div>

        {droplets.map((drop, index) => (
          <motion.span
            key={index}
            className="hero-splash-drop"
            style={{ width: drop.s, height: drop.s }}
            initial={reduceMotion ? false : { opacity: 0, x: 0, y: 28, scale: 0.2 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0, 1, 0],
                    x: [0, drop.x * 0.55, drop.x],
                    y: [28, drop.y, drop.y + 42],
                    scale: [0.2, 1, 0.7],
                  }
            }
            transition={{ duration: 1.0, delay: drop.d, ease: "easeOut" }}
          />
        ))}

        <motion.div
          className="hero-impact-ring"
          initial={reduceMotion ? false : { opacity: 0, scaleX: 0.2 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0.85, 0], scaleX: [0.2, 1, 1.55] }}
          transition={{ duration: 0.7, delay: 1.02, ease: "easeOut" }}
        />

        <motion.div
          className="hero-premium-cone"
          initial={reduceMotion ? false : { y: 0, scaleY: 1 }}
          animate={reduceMotion ? undefined : { y: [0, 8, -2, 0], scaleY: [1, 0.94, 1.02, 1] }}
          transition={{ duration: 0.58, delay: 1.05, times: [0, 0.45, 0.75, 1] }}
        >
          <span className="cone-lip" />
          <span className="cone-shine" />
          <span className="cone-grid cone-grid-a" />
          <span className="cone-grid cone-grid-b" />
        </motion.div>
      </div>

      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, x: -24, y: 12, filter: "blur(8px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="logo-shell cinematic-logo"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.75 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.9, ease: "easeOut" }}
        >
          <Image
            src="/brand/janushan-logo.png"
            alt="Janushan Ice Cream logo"
            width={180}
            height={180}
            priority
          />
        </motion.div>

        <p className="eyebrow">PREMIUM ICE CREAM · SINCE 2004</p>
        <h1>JANUSHAN<br />ICE CREAM</h1>
        <p className="tagline">A Scoop of Happiness.</p>

        <div className="hero-actions">
          <a className="button button-primary" href="#menu">View Menu</a>
          <a
            className="button button-ghost"
            href="https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream!%20I'd%20like%20to%20ask%20about%20your%20menu."
            target="_blank"
            rel="noreferrer"
          >
            Order on WhatsApp ↗
          </a>
          <a className="hero-text-link" href="#flavours">Explore Flavours ↓</a>
        </div>

        <motion.div
          className="hero-socials"
          aria-label="Janushan Ice Cream social links"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.35 }}
        >
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={social.path} /></svg>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        className="scroll-cue"
        href="#discover"
        aria-label="Scroll to discover Janushan Ice Cream"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.65 }}
      >
        <span>SCROLL TO TASTE</span>
        <i />
      </motion.a>
    </section>
  );
}
