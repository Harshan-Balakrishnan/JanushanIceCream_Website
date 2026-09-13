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
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const formatter = useMemo(() => new Intl.NumberFormat("en-LK"), []);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [selected]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".product-card"));
      if (!cards.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;
      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const nextDistance = Math.abs(cardCenter - center);
        if (nextDistance < distance) { distance = nextDistance; nearest = index; }
      });
      setActive(nearest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, [products.length]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(".product-card")[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: reduceMotion ? "auto" : "smooth" });
    setActive(index);
  };

  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") { event.preventDefault(); goTo(Math.min(active + 1, products.length - 1)); }
    if (event.key === "ArrowLeft") { event.preventDefault(); goTo(Math.max(active - 1, 0)); }
  };

  return (
    <section className="product-universe section" id="menu" aria-labelledby="craving-title">
      <div className="product-orbit-glow" aria-hidden="true" />
      <div className="product-section-head">
        <div>
          <p className="section-kicker">CHOOSE YOUR CRAVING</p>
          <h2 id="craving-title">Scroll into your <em>next favourite.</em></h2>
        </div>
        <p className="product-section-copy">Explore the Janushan menu. Swipe on mobile, drag on desktop, or use the arrow controls below.</p>
      </div>

      <div className="product-track-wrap">
        <div ref={trackRef} className="product-track" role="list" aria-label="Janushan Ice Cream products" tabIndex={0} onKeyDown={handleKey}>
          {products.map((product, index) => (
            <motion.button type="button" role="listitem" className={`product-card ${active === index ? "is-active" : ""}`} key={product.id} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} onClick={() => { setActive(index); setSelected(product); }} whileHover={reduceMotion ? undefined : { y: -10, rotateX: 2, rotateY: index % 2 ? -2 : 2 }} whileTap={reduceMotion ? undefined : { scale: 0.985 }} transition={{ type: "spring", stiffness: 250, damping: 24 }} style={{ "--product-glow": product.glow } as React.CSSProperties}>
              <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="product-image-shell"><Image src={product.image} alt={`${product.name} from the Janushan Ice Cream menu`} fill sizes="(max-width: 700px) 76vw, 370px" className="product-photo" unoptimized={product.image.startsWith("http")} /></span>
              <span className="product-meta"><small>{product.eyebrow}</small><strong>{product.name}</strong><span className="product-price">Rs. {formatter.format(product.price)}/-</span></span>
              <span className="product-open">Explore <i aria-hidden="true">↗</i></span>
            </motion.button>
          ))}
        </div>
        <div className="product-navigation" aria-label="Product carousel controls">
          <div className="product-scroll-hint" aria-hidden="true"><i /><span>Swipe / drag to explore</span></div>
          <div className="product-nav-buttons">
            <button className="product-nav-button" type="button" aria-label="Previous product" disabled={active === 0} onClick={() => goTo(Math.max(active - 1, 0))}>←</button>
            <button className="product-nav-button" type="button" aria-label="Next product" disabled={active === products.length - 1} onClick={() => goTo(Math.min(active + 1, products.length - 1))}>→</button>
          </div>
        </div>
      </div>

      <div className="product-progress" aria-label={`Product ${active + 1} of ${products.length}`}>
        <span>{String(active + 1).padStart(2, "0")}</span><div><i style={{ width: `${products.length ? ((active + 1) / products.length) * 100 : 0}%` }} /></div><span>{String(products.length).padStart(2, "0")}</span>
      </div>
      <p className="product-source-note" aria-hidden="true">{live ? "Live catalogue." : "Built-in catalogue."}</p>

      <AnimatePresence>
        {selected && (
          <motion.div className="product-modal-backdrop" role="presentation" initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
            <motion.div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" initial={reduceMotion ? false : { y: 38, opacity: 0, scale: 0.96 }} animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { y: 22, opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 210, damping: 24 }} style={{ "--product-glow": selected.glow } as React.CSSProperties}>
              <button className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close product details">×</button>
              <div className="modal-visual"><div className="modal-halo" aria-hidden="true" /><Image src={selected.image} alt={selected.name} fill sizes="(max-width: 800px) 90vw, 48vw" className="modal-product-image" unoptimized={selected.image.startsWith("http")} /></div>
              <div className="modal-copy"><p className="section-kicker">{selected.eyebrow}</p><h3 id="product-modal-title">{selected.name}</h3><div className="modal-price">Rs. {formatter.format(selected.price)}/-</div><p>{selected.blurb}</p><div className="modal-actions"><a className="button button-primary" href="#flavours" onClick={() => setSelected(null)}>Explore Flavours</a><button className="button button-ghost" type="button" onClick={() => setSelected(null)}>Keep Browsing</button></div><small className="modal-future">Ask us about availability and ordering directly via WhatsApp.</small></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
