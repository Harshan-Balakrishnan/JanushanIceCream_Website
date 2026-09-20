"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./EntranceExperience.module.css";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/janushan_ice_cream/", icon: "IG" },
  { label: "Facebook", href: "https://www.facebook.com/janushanicecream", icon: "f" },
  { label: "Google Reviews", href: "https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya", icon: "G" },
];

export default function EntranceExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.hero} id="home" aria-label="Janushan Ice Cream introduction">
      <Image className={styles.background} src="/brand/janushan-home-hero.webp" alt="" fill priority sizes="100vw" />
      <div className={styles.backgroundShade} aria-hidden="true" />

      <motion.div
        className={styles.copy}
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.logo}>
          <Image src="/brand/janushan-logo.png" alt="Janushan Ice Cream" width={120} height={120} priority />
        </div>

        <p className={styles.eyebrow}>PREMIUM ICE CREAM · SINCE 2004</p>
        <h1>JANUSHAN<br />ICE CREAM</h1>
        <p className={styles.tagline}>A Scoop of Happiness.</p>

        <div className={styles.actions}>
          <a className={`${styles.button} ${styles.primary}`} href="#menu">View Menu</a>
          <a
            className={`${styles.button} ${styles.secondary}`}
            href="https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream!%20I'd%20like%20to%20ask%20about%20your%20menu."
            target="_blank"
            rel="noreferrer"
          >
            Order on WhatsApp ↗
          </a>
        </div>

        <a className={styles.explore} href="#flavours">Explore flavours ↓</a>

        <div className={styles.socials} aria-label="Janushan Ice Cream social links">
          {socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              {social.icon}
            </a>
          ))}
        </div>
      </motion.div>

      <div className={styles.assembly} aria-hidden="true">
        <motion.div
          className={styles.assemblyMotion}
          initial={reduceMotion ? false : { opacity: 0, y: 70 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.cone}>
            <span className={`${styles.coneLine} ${styles.lineA}`} />
            <span className={`${styles.coneLine} ${styles.lineB}`} />
            <span className={styles.coneShine} />
            <span className={styles.coneLip} />
          </div>

          <motion.div
            className={styles.cream}
            initial={reduceMotion ? false : { scaleX: 0.35, opacity: 0 }}
            animate={reduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.82, ease: "easeOut" }}
          >
            <span /><span /><span />
          </motion.div>

          <motion.div
            className={styles.scoop}
            initial={reduceMotion ? false : { y: -250, opacity: 0, rotate: -6, scale: 0.82 }}
            animate={reduceMotion ? undefined : {
              y: [-250, -35, 8, 0],
              opacity: [0, 0.7, 1, 1],
              rotate: [-6, 2, -1, 0],
              scale: [0.82, 0.94, 1.03, 1],
            }}
            transition={{ duration: 1.35, delay: 0.35, times: [0, 0.48, 0.78, 1], ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.scoopGloss} />
            <span className={styles.scoopRidge} />
            <span className={styles.scoopRidgeTwo} />
          </motion.div>

          <motion.div
            className={styles.impact}
            initial={reduceMotion ? false : { opacity: 0, scaleX: 0.35 }}
            animate={reduceMotion ? undefined : { opacity: [0, 0.9, 0], scaleX: [0.35, 1, 1.35] }}
            transition={{ duration: 0.65, delay: 1.62, ease: "easeOut" }}
          />

          <div className={styles.drops}><i /><i /><i /></div>
        </motion.div>
      </div>

      <motion.a
        className={styles.scroll}
        href="#discover"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.7 }}
      >
        <span>SCROLL TO TASTE</span><i />
      </motion.a>
    </section>
  );
}
