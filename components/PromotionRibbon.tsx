"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import type { Promotion } from "@/lib/catalog";

function isPromotionLive(promotion: Promotion, now: number) {
  const start = promotion.startDate?.trim()
    ? new Date(promotion.startDate).getTime()
    : Number.NEGATIVE_INFINITY;
  const end = promotion.endDate?.trim()
    ? new Date(promotion.endDate).getTime()
    : Number.POSITIVE_INFINITY;

  return (
    (!Number.isNaN(start) ? start : Number.NEGATIVE_INFINITY) <= now &&
    (!Number.isNaN(end) ? end : Number.POSITIVE_INFINITY) > now
  );
}

function formatPromotionDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-LK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function PromotionRibbon() {
  const { items } = useCatalogCollection<Promotion>("promotions", []);
  const [now, setNow] = useState(() => Date.now());
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);

  const livePromotions = useMemo(
    () =>
      items
        .filter((promotion) => isPromotionLive(promotion, now))
        .sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0)),
    [items, now]
  );

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setActiveIndex((current) =>
      livePromotions.length
        ? Math.min(current, livePromotions.length - 1)
        : 0
    );
    setCopied(false);
  }, [livePromotions.length]);

  useEffect(() => {
    if (livePromotions.length < 2 || paused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % livePromotions.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [livePromotions.length, paused]);

  if (!livePromotions.length) return null;

  const p = livePromotions[activeIndex];
  const promoCode = p.promoCode?.trim();
  const badge = p.badge?.trim() || "SPECIAL OFFER";
  const offerText = p.offerText?.trim();
  const terms = p.terms?.trim();
  const startLabel = formatPromotionDate(p.startDate);
  const endLabel = formatPromotionDate(p.endDate);

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

  function goTo(index: number) {
    setActiveIndex(index);
    setCopied(false);
  }

  return (
    <section
      className="promo-ribbon section"
      id="promotions"
      aria-labelledby="promo-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="promo-ribbon-inner">
        <div className="promo-copy" aria-live="polite">
          <span className="promo-kicker">{badge}</span>

          <h2 id="promo-heading">
            <span className="promo-heading-accent">{p.title}</span>
            <span className="promo-heading-script">
              Sweet Moments for Everyone! <b aria-hidden="true">♥</b>
            </span>
          </h2>

          {offerText && <div className="promo-offer-text">{offerText}</div>}

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

          {(startLabel || endLabel) && (
            <p className="promo-validity">
              {startLabel && endLabel
                ? <>Valid from <strong>{startLabel}</strong> to <strong>{endLabel}</strong></>
                : endLabel
                  ? <>Valid until <strong>{endLabel}</strong></>
                  : <>Available from <strong>{startLabel}</strong></>}
            </p>
          )}

          {p.cta && (
            <a
              className="button button-primary promo-cta"
              href={p.ctaUrl?.trim() || "#menu"}
            >
              {p.cta}
              <span aria-hidden="true">→</span>
            </a>
          )}

          {terms && <p className="promo-terms">{terms}</p>}

          <div className="promo-benefits" aria-label="Promotion highlights">
            <span><b aria-hidden="true">✦</b><small>Special Offers</small></span>
            <i aria-hidden="true" />
            <span><b aria-hidden="true">☆</b><small>Seasonal Treats</small></span>
            <i aria-hidden="true" />
            <span><b aria-hidden="true">♧</b><small>Sweet Surprises</small></span>
          </div>

          {livePromotions.length > 1 && (
            <div className="promo-carousel-controls" aria-label="Promotion selection">
              <button
                type="button"
                onClick={() => goTo((activeIndex - 1 + livePromotions.length) % livePromotions.length)}
                aria-label="Previous promotion"
              >
                ←
              </button>

              <div className="promo-dots">
                {livePromotions.map((promotion, index) => (
                  <button
                    key={promotion.id}
                    type="button"
                    className={index === activeIndex ? "is-active" : ""}
                    onClick={() => goTo(index)}
                    aria-label={"Show promotion " + (index + 1)}
                    aria-current={index === activeIndex ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo((activeIndex + 1) % livePromotions.length)}
                aria-label="Next promotion"
              >
                →
              </button>
            </div>
          )}
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
