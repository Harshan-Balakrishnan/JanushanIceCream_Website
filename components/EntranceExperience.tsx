"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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

      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="logo-shell cinematic-logo"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.28, ease: "easeOut" }}
        >
          <Image
            src="/brand/janushan-logo.png"
            alt="Janushan Ice Cream logo"
            width={180}
            height={180}
            priority
          />
        </motion.div>

        <motion.p
          className="eyebrow"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.48 }}
        >
          PREMIUM ICE CREAM · SINCE 2004
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.58, ease: "easeOut" }}
        >
          JANUSHAN<br />ICE CREAM
        </motion.h1>

        <motion.p
          className="tagline"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.72 }}
        >
          A Scoop of Happiness.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.86 }}
        >
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
        </motion.div>

        <motion.div
          className="hero-socials"
          aria-label="Janushan Ice Cream social links"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.02 }}
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
        transition={{ duration: 0.6, delay: 1.35 }}
      >
        <span>SCROLL TO TASTE</span>
        <i />
      </motion.a>
    </section>
  );
}
