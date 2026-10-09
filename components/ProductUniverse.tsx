"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { defaultProducts, type Product } from "@/lib/catalog";

type MenuCategory = "All" | "Cups" | "Cones" | "Specials" | "Ice Pops & Chock" | "Other";
type MenuSort = "featured" | "price-low" | "price-high" | "name";

const menuCategories: MenuCategory[] = ["All", "Cups", "Cones", "Specials", "Ice Pops & Chock", "Other"];

function categoryForProduct(product: Product): Exclude<MenuCategory, "All"> {
  const text = `${product.name} ${product.eyebrow}`.toLowerCase();
  if (/popsicle|ice pop|ice cube|ice chock|\bchock\b/.test(text)) return "Ice Pops & Chock";
  if (/cone|waffle boat/.test(text)) return "Cones";
  if (/special|mega/.test(text)) return "Specials";
  if (/cup|\bml\b|\blitre\b|\bliter\b|\bkg\b/.test(text)) return "Cups";
  return "Other";
}

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
  const [category, setCategory] = useState<MenuCategory>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<MenuSort>("featured");
  const reduceMotion = useReducedMotion();
  const formatter = useMemo(() => new Intl.NumberFormat("en-LK"), []);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const availableCategories = useMemo(
    () => menuCategories.filter((item) => item === "All" || products.some((product) => categoryForProduct(product) === item)),
    [products],
  );

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All" || categoryForProduct(product) === category;
      const matchesSearch = !term || [product.name, product.eyebrow, product.blurb]
        .some((value) => value.toLocaleLowerCase().includes(term));
      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price || a.sortOrder - b.sortOrder);
    if (sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price || a.sortOrder - b.sortOrder);
    if (sort === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return [...filtered].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [products, category, search, sort]);

  const setActiveProduct = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  const goToProduct = useCallback((index: number) => {
    if (!visibleProducts.length) return;
    const next = (index + visibleProducts.length) % visibleProducts.length;
    const track = trackRef.current;
    const card = cardRefs.current[next];
    setActiveProduct(next);
    if (!track || !card) return;

    const styles = window.getComputedStyle(track);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const isPhone = window.matchMedia("(max-width: 650px)").matches;
    const targetLeft = isPhone
      ? card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
      : card.offsetLeft - paddingLeft;

    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [visibleProducts.length, reduceMotion, setActiveProduct]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    setActiveProduct(0);
    requestAnimationFrame(() => track.scrollTo({ left: 0, behavior: "auto" }));
  }, [visibleProducts, setActiveProduct]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const isPhone = window.matchMedia("(max-width: 650px)").matches;
        const trackRect = track.getBoundingClientRect();
        const styles = window.getComputedStyle(track);
        const paddingLeft = parseFloat(styles.paddingLeft) || 0;
        const target = isPhone ? trackRect.left + track.clientWidth / 2 : trackRect.left + paddingLeft;

        let nearest = activeRef.current;
        let distance = Number.POSITIVE_INFINITY;
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const point = isPhone ? rect.left + rect.width / 2 : rect.left;
          const nextDistance = Math.abs(point - target);
          if (nextDistance < distance) {
            distance = nextDistance;
            nearest = index;
          }
        });

        if (nearest !== activeRef.current) {
          activeRef.current = nearest;
          setActive(nearest);
        }
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [visibleProducts.length]);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    document.body.style.overflow = "hidden";
    modalRef.current?.querySelector<HTMLElement>(".modal-close")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getAttribute("aria-hidden") !== "true");

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
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
        <p className="product-section-copy">Find your favourite faster. Filter the menu, search by name, or sort by price — then tap any treat for details.</p>
      </div>

      <div className="product-menu-tools" aria-label="Product menu controls">
        <div className="product-category-list" role="group" aria-label="Filter products by category">
          {availableCategories.map((item) => (
            <button
              className={`product-category-chip ${category === item ? "is-selected" : ""}`}
              type="button"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "All" && <span>{products.length}</span>}
            </button>
          ))}
        </div>
        <div className="product-menu-fields">
          <label className="product-search">
            <span className="product-search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">Search products</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the menu"
              autoComplete="off"
            />
            {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear product search">×</button>}
          </label>
          <label className="product-sort">
            <span>Sort</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as MenuSort)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="product-results-count" aria-live="polite">
        {visibleProducts.length === 1 ? "1 treat" : `${visibleProducts.length} treats`} {category !== "All" ? `in ${category}` : "on the menu"}
      </p>

      {visibleProducts.length > 0 ? (
        <>
          <div className="product-track-wrap">
            <button className="product-arrow product-arrow-prev" type="button" onClick={() => goToProduct(activeRef.current - 1)} aria-label="Previous product" disabled={visibleProducts.length < 2}><span aria-hidden="true">‹</span></button>
            <div ref={trackRef} className="product-track" role="list" aria-label="JIC products">
              {visibleProducts.map((product, index) => (
                <motion.button
                  type="button"
                  role="listitem"
                  className={`product-card ${active === index ? "is-active" : ""}`}
                  key={product.id}
                  onFocus={() => setActiveProduct(index)}
                  onMouseEnter={() => setActiveProduct(index)}
                  onClick={() => { setActiveProduct(index); setSelected(product); }}
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
            <button className="product-arrow product-arrow-next" type="button" onClick={() => goToProduct(activeRef.current + 1)} aria-label="Next product" disabled={visibleProducts.length < 2}><span aria-hidden="true">›</span></button>
          </div>

          <div className="product-progress" aria-hidden="true">
            <span>{String(Math.min(active + 1, visibleProducts.length)).padStart(2, "0")}</span>
            <div><i style={{ width: `${((Math.min(active + 1, visibleProducts.length)) / visibleProducts.length) * 100}%` }} /></div>
            <span>{String(visibleProducts.length).padStart(2, "0")}</span>
          </div>
        </>
      ) : (
        <div className="product-empty-state">
          <span aria-hidden="true">🍦</span>
          <h3>No treats found</h3>
          <p>Try another search or choose a different category.</p>
          <button className="button button-primary" type="button" onClick={() => { setSearch(""); setCategory("All"); setSort("featured"); }}>Show all products</button>
        </div>
      )}
      <p className="product-source-note">{live ? "Live from the JIC admin system." : "Showing built-in JIC starter content until Firebase is connected."}</p>

      <AnimatePresence>
        {selected && (
          <motion.div className="product-modal-backdrop" role="presentation" initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
            <motion.div ref={modalRef} className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" initial={reduceMotion ? false : { y: 38, opacity: 0, scale: 0.96 }} animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { y: 22, opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 210, damping: 24 }} style={{ "--product-glow": selected.glow } as React.CSSProperties}>
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
