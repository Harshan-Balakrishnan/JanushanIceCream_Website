"use client";

import Image from "next/image";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import type { Promotion } from "@/lib/catalog";

export default function PromotionRibbon() {
  const { items } = useCatalogCollection<Promotion>("promotions", []);

  const promotion = items[0];
  const title = promotion?.title || "Sweet Moments for Everyone!";
  const description =
    promotion?.description ||
    "Discover special offers, seasonal treats and delicious reasons to make every scoop a little sweeter.";
  const cta = promotion?.cta || "Explore Latest Offers";

  return (
    <section className="promo-ribbon section" id="promotions" aria-labelledby="promo-heading">
      <div className="promo-ribbon-inner">
        <div className="promo-copy">
          <span className="promo-kicker">SPECIAL OFFERS</span>
          <h2 id="promo-heading">
            <span className="promo-heading-accent">PROMOTIONS</span>
            <span className="promo-heading-script">Sweet Moments for Everyone! <b aria-hidden="true">♥</b></span>
          </h2>
          <p>{description}</p>
          <a className="button button-primary promo-cta" href="#menu">
            {cta}
            <span aria-hidden="true">→</span>
          </a>
          <div className="promo-benefits" aria-label="Promotion highlights">
            <span><b aria-hidden="true">✦</b><small>Special Offers</small></span>
            <i aria-hidden="true" />
            <span><b aria-hidden="true">☆</b><small>Seasonal Treats</small></span>
            <i aria-hidden="true" />
            <span><b aria-hidden="true">♧</b><small>Sweet Surprises</small></span>
          </div>
        </div>

        <div className="promo-mascot-stage">
          <span className="promo-mascot-aura" aria-hidden="true" />
          <span className="promo-mascot-spark spark-one" aria-hidden="true">✦</span>
          <span className="promo-mascot-spark spark-two" aria-hidden="true">✦</span>
          <span className="promo-mascot-spark spark-three" aria-hidden="true">✦</span>
          <Image
            className="promo-mascot"
            src="/brand/mascot-promo.png"
            alt="JANU mascot presenting the Janushan Ice Cream promotion board"
            width={1374}
            height={1145}
          />
          <span className="promo-mascot-caption" aria-hidden="true">Stay tuned for more sweet surprises!</span>
        </div>
      </div>
    </section>
  );
}
