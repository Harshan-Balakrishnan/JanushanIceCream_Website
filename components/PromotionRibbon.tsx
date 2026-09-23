"use client";

import Image from "next/image";
import { useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import type { Promotion } from "@/lib/catalog";

export default function PromotionRibbon() {
  const { items } = useCatalogCollection<Promotion>("promotions", []);
  const [copied, setCopied] = useState(false);

  // Keep the existing admin/Firestore promotion system intact.
  // The visual redesign only changes presentation and mascot animation.
  if (!items.length) return null;

  const p = items[0];
  const promoCode = p.promoCode?.trim();

  async function copyPromoCode() {
    if (!promoCode) return;

    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="promo-ribbon section" id="promotions" aria-labelledby="promo-heading">
      <div className="promo-ribbon-inner">
        <div className="promo-copy">
          <span className="promo-kicker">JANUSHAN NOW</span>

          <h2 id="promo-heading">
            <span className="promo-heading-accent">{p.title}</span>
            <span className="promo-heading-script">
              Sweet Moments for Everyone! <b aria-hidden="true">♥</b>
            </span>
          </h2>

          <p>{p.description}</p>

          {promoCode && (
            <div className="promo-code-card" aria-label="Promotion promo code">
              <div>
                <small>USE PROMO CODE</small>
                <strong>{promoCode}</strong>
              </div>
              <button
                type="button"
                className="promo-code-copy"
                onClick={() => void copyPromoCode()}
                aria-label={copied ? "Promo code copied" : "Copy promo code"}
              >
                <span aria-hidden="true">{copied ? "✓" : "⧉"}</span>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}

          {p.cta && (
            <a className="button button-primary promo-cta" href="#menu">
              {p.cta}
              <span aria-hidden="true">→</span>
            </a>
          )}

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

          <span className="promo-mascot-caption" aria-hidden="true">
            Stay tuned for more sweet surprises!
          </span>
        </div>
      </div>
    </section>
  );
}
