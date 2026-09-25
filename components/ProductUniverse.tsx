"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { defaultProducts, type Product } from "@/lib/catalog";

function stockLabel(availability?: Product["availability"]) {
  switch (availability) {
    case "low-stock": return "Limited today";
    case "sold-out": return "Sold out";
    default: return "Available today";
  }
}

function menuBadgeLabel(badge?: Product["menuBadge"]) {
  switch (badge) {
    case "new": return "New";
    case "popular": return "Popular now";
    case "signature": return "Signature";
    default: return "";
  }
}

export default function ProductUniverse() {
  const { items: products, live } = useCatalogCollection<Product>("products", defaultProducts);
  const [selected, setSelected] = useState<Product | null>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const formatter = useMemo(() => new Intl.NumberFormat("en-LK"), []);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goToProduct = useCallback((index: number) => {
    if (!products.length) return;
    const next = (index + products.length) % products.length;
    const track = trackRef.current;
    const card = cardRefs.current[next];
    setActive(next);
    if (!track || !card) return;

    // Scroll to the card's exact position instead of scrollIntoView().
    // scrollIntoView() can move the entire page when the carousel is nested
    // inside a long section and can also create an unwanted centred first card.
    const targetLeft = card.offsetLeft - Math.max(0, (track.clientWidth - card.offsetWidth) / 2);
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [products.length, reduceMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !products.length) return;
    setActive(0);
    requestAnimationFrame(() => track.scrollTo({ left: 0, behavior: "auto" }));
  }, [products.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.getBoundingClientRect().left + track.clientWidth / 2;
        let nearest = active;
        let distance = Number.POSITIVE_INFINITY;
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const nextDistance = Math.abs(rect.left + rect.width / 2 - center);
          if (nextDistance < distance) {
            distance = nextDistance;
            nearest = index;
          }
        });
        if (nearest !== active) setActive(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [products.length, active]);

  useEffect(() => {
    if (!selected) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  const selectedAvailability = selected?.availability ?? "in-stock";
  const selectedSoldOut = selectedAvailability === "sold-out";

  return (
    <section className="product-universe section" id="menu" aria-labelledby="craving-title">
      <div className="product-orbit-glow" aria-hidden="true" />
      <div className="product-section-head">
        <div>
          <p className="section-kicker">CHOOSE YOUR CRAVING</p>
          <h2 id="craving-title">Scroll into your <em>next favourite.</em></h2>
        </div>
        <p className="product-section-copy">Swipe, scroll or tap through the JIC menu. Every product stays large, tactile and easy to explore — especially on mobile.</p>
      </div>

      <div className="product-track-wrap">
        <button className="product-arrow product-arrow-prev" type="button" onClick={() => goToProduct(active - 1)} aria-label="Previous product"><span aria-hidden="true">‹</span></button>
        <div ref={trackRef} className="product-track" role="list" aria-label="JIC products">
          {products.map((product, index) => (
            <motion.button
              type="button"
              role="listitem"
              className={`product-card ${active === index ? "is-active" : ""}`}
              key={product.id}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onClick={() => { setActive(index); setSelected(product); }}
              whileHover={reduceMotion ? undefined : { y: -8, rotateX: 1.5, rotateY: index % 2 ? -1.5 : 1.5 }}
              whileTap={reduceMotion ? undefined : { scale: 0.988 }}
              transition={{ type: "spring", stiffness: 250, damping: 24 }}
              ref={(node) => { cardRefs.current[index] = node; }}
              style={{ "--product-glow": product.glow } as React.CSSProperties}
            >
              <span className="product-index">{String(index + 1).padStart(2, "0")}</span>
              {product.menuBadge && <span className={`product-menu-badge is-${product.menuBadge}`}>{menuBadgeLabel(product.menuBadge)}</span>}
              <span className="product-image-shell">
                <Image src={product.image} alt={`${product.name} from the JIC menu`} fill sizes="(max-width: 700px) 82vw, (max-width: 1200px) 34vw, 360px" className="product-photo" unoptimized={product.image.startsWith("http")} />
              </span>
              <span className="product-meta">
                <small>{product.eyebrow}</small>
                <strong>{product.name}</strong>
                <span className="product-price">Rs. {formatter.format(product.price)}/-</span>
                <span className={`product-stock is-${product.availability ?? "in-stock"}`}>{stockLabel(product.availability)}</span>
              </span>
              <span className="product-open">Explore <i aria-hidden="true">↗</i></span>
            </motion.button>
          ))}
        </div>
        <button className="product-arrow product-arrow-next" type="button" onClick={() => goToProduct(active + 1)} aria-label="Next product"><span aria-hidden="true">›</span></button>
      </div>

      <div className="product-progress" aria-hidden="true">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <div><i style={{ width: `${((active + 1) / products.length) * 100}%` }} /></div>
        <span>{String(products.length).padStart(2, "0")}</span>
      </div>
      <p className="product-source-note">{live ? "Live from the JIC admin system." : "Showing built-in JIC starter content until Firebase is connected."}</p>

      <AnimatePresence>
        {selected && (
          <motion.div className="product-modal-backdrop" role="presentation" initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
            <motion.div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" initial={reduceMotion ? false : { y: 38, opacity: 0, scale: 0.96 }} animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { y: 22, opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 210, damping: 24 }} style={{ "--product-glow": selected.glow } as React.CSSProperties}>
              <button className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close product details">×</button>
              <div className="modal-visual"><div className="modal-halo" aria-hidden="true" /><Image src={selected.image} alt={selected.name} fill sizes="(max-width: 800px) 90vw, 48vw" className="modal-product-image" unoptimized={selected.image.startsWith("http")} /></div>
              <div className="modal-copy">
                <p className="section-kicker">{selected.eyebrow}</p>
                <h3 id="product-modal-title">{selected.name}</h3>
                <div className="modal-price">Rs. {formatter.format(selected.price)}/-</div>
                <span className={`product-stock product-stock-modal is-${selectedAvailability}`}>{stockLabel(selectedAvailability)}</span>
                <p>{selected.blurb}</p>
                <div className="modal-actions"><a className="button button-primary" href="tel:+94776015041">{selectedSoldOut ? "Call to check availability" : "Call to order +94 77 601 5041"}</a><a className="button button-ghost" href="#flavours" onClick={() => setSelected(null)}>Explore Flavours</a></div>
                <small className="modal-order-note">{selectedSoldOut ? "This flavour is unavailable right now. Call us to check when it will return." : "Call +94 77 601 5041 to place an order and confirm availability."}</small>
                <small className="modal-future">Product details can be managed from the JIC Control Room when Firebase is connected.</small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
