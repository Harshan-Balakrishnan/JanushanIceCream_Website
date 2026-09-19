"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { defaultProducts, type Product } from "@/lib/catalog";


export default function ProductUniverse() {
  const { items: products, live } = useCatalogCollection<Product>("products", defaultProducts);
  const [selected, setSelected] = useState<Product | null>(null);
  const [active, setActive] = useState(0);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const formatter = useMemo(() => new Intl.NumberFormat("en-LK"), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const firstCard = track.querySelector<HTMLElement>(".product-card");
      if (!firstCard) return;
      const step = firstCard.offsetWidth + 18;
      setActive(Math.min(products.length - 1, Math.max(0, Math.round(track.scrollLeft / step))));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, [products.length]);

  useEffect(() => {
    if (reduceMotion || selected || products.length < 2) return;
    const track = trackRef.current;
    if (!track) return;

    let timer: number | undefined;
    const advance = () => {
      const max = track.scrollWidth - track.clientWidth;
      const next = Math.min(track.scrollLeft + track.clientWidth * 0.82, max);
      track.scrollTo({ left: next <= 8 ? 0 : next, behavior: "smooth" });
    };
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(advance, 4200);
    };

    start();
    const pause = () => window.clearInterval(timer);
    const resume = () => start();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    return () => {
      window.clearInterval(timer);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, [products.length, reduceMotion]);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    window.setTimeout(() => modalCloseRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section className="product-universe section" id="menu" aria-labelledby="craving-title">
      <div className="product-orbit-glow" aria-hidden="true" />
      <div className="product-section-head">
        <div>
          <p className="section-kicker">CHOOSE YOUR CRAVING</p>
          <h2 id="craving-title">Scroll into your <em>next favourite.</em></h2>
        </div>
        <p className="product-section-copy">
          Swipe, scroll or tap through the Janushan ice cream menu. Every product stays large, tactile and easy to explore — especially on mobile.
        </p>
      </div>

      <div className="product-track-wrap">
        <button
          className="product-track-arrow product-track-arrow-left"
          type="button"
          aria-label="Previous menu item"
          onClick={() => trackRef.current?.scrollBy({ left: -(trackRef.current.clientWidth * 0.82), behavior: "smooth" })}
        >←</button>
        <div ref={trackRef} className="product-track" role="list" aria-label="Janushan Ice Cream products">
          {products.map((product, index) => (
            <motion.button
              type="button"
              role="listitem"
              className={`product-card ${active === index ? "is-active" : ""}`}
              key={product.id}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onClick={() => {
                setActive(index);
                setSelected(product);
              }}
              whileHover={reduceMotion ? undefined : { y: -10, rotateX: 2, rotateY: index % 2 ? -2 : 2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
              style={{ "--product-glow": product.glow } as React.CSSProperties}
            >
              <span className="product-index">0{index + 1}</span>
              <span className="product-image-shell">
                <Image
                  src={product.image}
                  alt={`${product.name} from the Janushan Ice Cream menu`}
                  fill
                  sizes="(max-width: 700px) 76vw, 370px"
                  className="product-photo"
                />
              </span>
              <span className="product-meta">
                <small>{product.eyebrow}</small>
                <strong>{product.name}</strong>
                <span className="product-price">Rs. {formatter.format(product.price)}/-</span>
              </span>
              <span className="product-open">Explore <i aria-hidden="true">↗</i></span>
            </motion.button>
          ))}
        </div>
        <button
          className="product-track-arrow product-track-arrow-right"
          type="button"
          aria-label="Next menu item"
          onClick={() => trackRef.current?.scrollBy({ left: trackRef.current.clientWidth * 0.82, behavior: "smooth" })}
        >→</button>
      </div>

      <div className="product-progress" aria-hidden="true">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <div><i style={{ width: `${((active + 1) / products.length) * 100}%` }} /></div>
        <span>{String(products.length).padStart(2, "0")}</span>
      </div>

      <p className="product-source-note">{live ? "Live from the Janushan admin system." : "Showing built-in Janushan starter content until Firebase is connected."}</p>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="product-modal-backdrop"
            role="presentation"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.div
              className="product-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="product-modal-title"
              initial={reduceMotion ? false : { y: 38, opacity: 0, scale: 0.96 }}
              animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { y: 22, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 210, damping: 24 }}
              style={{ "--product-glow": selected.glow } as React.CSSProperties}
            >
              <button ref={modalCloseRef} className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close product details">×</button>
              <div className="modal-visual">
                <div className="modal-halo" aria-hidden="true" />
                <Image src={selected.image} alt={selected.name} fill sizes="(max-width: 800px) 90vw, 48vw" className="modal-product-image" />
              </div>
              <div className="modal-copy">
                <p className="section-kicker">{selected.eyebrow}</p>
                <h3 id="product-modal-title">{selected.name}</h3>
                <div className="modal-price">Rs. {formatter.format(selected.price)}/-</div>
                <p>{selected.blurb}</p>
                <div className="modal-actions">
                  <a
                    className="button button-primary"
                    href={`https://wa.me/94776015041?text=${encodeURIComponent(`Hi Janushan Ice Cream! I would like to ask/order about ${selected.name} (Rs. ${selected.price}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setSelected(null)}
                  >
                    Ask on WhatsApp ↗
                  </a>
                  <a className="button button-ghost" href="#flavours" onClick={() => setSelected(null)}>Explore Flavours</a>
                </div>
                <small className="modal-future">Product details can be managed from the Janushan Control Room when Firebase is connected.</small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
