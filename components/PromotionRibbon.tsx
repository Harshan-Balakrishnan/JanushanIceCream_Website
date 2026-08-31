"use client";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import type { Promotion } from "@/lib/catalog";

export default function PromotionRibbon() {
  const { items } = useCatalogCollection<Promotion>("promotions", []);

  if (!items.length) return null;

  const p = items[0];

  return (
    <section className="promo-ribbon section">
      <small>JANUSHAN NOW</small>
      <h2>{p.title}</h2>
      <p>{p.description}</p>
      {p.cta && (
        <a className="button button-primary" href="#menu">
          {p.cta}
        </a>
      )}
    </section>
  );
}