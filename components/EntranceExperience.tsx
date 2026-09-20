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
    <section className={styles.heroRoot} id="home" aria-label="Janushan Ice Cream introduction">
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.milkGlow} aria-hidden="true" />

      <div className={styles.heroLayout}>
        <div className={styles.copyColumn}>
          <motion.div
            className={styles.copy}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.logo}>
              <Image
                src="/brand/janushan-logo.png"
                alt="Janushan Ice Cream"
                width={120}
                height={120}
                priority
              />
            </div>

            <p className={styles.eyebrow}>PREMIUM ICE CREAM · SINCE 2004</p>
            <h1>JANUSHAN<span>ICE CREAM</span></h1>
            <p className={styles.tagline}>A Scoop of Happiness.</p>

            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#menu">View Menu</a>
              <a
                className={styles.secondaryButton}
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
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className={styles.coneColumn} aria-hidden="true">
          <motion.div
            className={styles.coneStage}
            initial={reduceMotion ? false : { opacity: 0, y: 80, scale: 0.94 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className={styles.coneShadow}
              initial={reduceMotion ? false : { opacity: 0, scaleX: 0.45 }}
              animate={reduceMotion ? undefined : { opacity: 0.45, scaleX: 1 }}
              transition={{ duration: 0.55, delay: 1.25 }}
            />

            <div className={styles.cone}>
              <span className={styles.coneGridA} />
              <span className={styles.coneGridB} />
              <span className={styles.coneHighlight} />
              <span className={styles.coneLip} />
            </div>

            <motion.div
              className={styles.cream}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.2 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              <i /><i /><i />
            </motion.div>

            <motion.div
              className={styles.scoop}
              initial={reduceMotion ? false : { y: -430, opacity: 0, rotate: -7, scale: 0.82 }}
              animate={reduceMotion ? undefined : {
                y: [-430, -235, -72, 0],
                opacity: [0, 0.5, 0.92, 1],
                rotate: [-7, -3, 1.5, 0],
                scale: [0.82, 0.9, 1.03, 1],
              }}
              transition={{
                duration: 1.55,
                delay: 0.18,
                times: [0, 0.32, 0.76, 1],
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.scoopGloss} />
              <span className={styles.scoopRidgeOne} />
              <span className={styles.scoopRidgeTwo} />
            </motion.div>

            <motion.div
              className={styles.impact}
              initial={reduceMotion ? false : { opacity: 0, scaleX: 0.15 }}
              animate={reduceMotion ? undefined : { opacity: [0, 0.9, 0], scaleX: [0.15, 1, 1.35] }}
              transition={{ duration: 0.62, delay: 1.62, ease: "easeOut" }}
            />

            <div className={styles.droplets}>
              <i className={styles.dropOne} />
              <i className={styles.dropTwo} />
              <i className={styles.dropThree} />
              <i className={styles.dropFour} />
            </div>

            <motion.div
              className={styles.ring}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={reduceMotion ? undefined : { opacity: [0, 0.55, 0], scale: [0.5, 1.15, 1.4] }}
              transition={{ duration: 1.0, delay: 1.62, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>

      <motion.a
        className={styles.scroll}
        href="#discover"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.35 }}
      >
        <span>SCROLL TO TASTE</span>
        <i />
      </motion.a>
    </section>
  );
}
