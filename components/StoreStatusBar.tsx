"use client";

import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import {
  defaultStoreSettings,
  type StoreSettings,
} from "@/lib/catalog";

const defaultSettings = defaultStoreSettings[0];

function callNumber(value: string) {
  return value.replace(/\D/g, "").replace(/^0/, "94");
}

export default function StoreStatusBar() {
  const { items, live } = useCatalogCollection<StoreSettings>(
    "storeSettings",
    defaultStoreSettings
  );
  const settings = items[0] ?? defaultSettings;
  const status = settings.status ?? "open";
  const orderingAvailable = settings.orderEnabled !== false && status !== "closed";
  const statusLabel = {
    open: "Open and serving",
    limited: "Limited availability",
    closed: "Temporarily closed",
  }[status];
  const number = callNumber(settings.orderPhone || defaultSettings.orderPhone);
  const message = settings.message?.trim() || defaultSettings.message;
  const hours = settings.hours?.trim();

  return (
    <section
      className={`store-status-bar is-${status}`}
      aria-label="Today's Janushan Ice Cream availability"
    >
      <div className="store-status-copy">
        <span className="store-status-pill">
          <i aria-hidden="true" />
          {statusLabel}
        </span>
        <p>{message}</p>
        {hours && <small>{hours}</small>}
      </div>

      {orderingAvailable ? (
        <a
          className="store-status-action"
          href={`tel:+${number}`}
        >
          Call +94 77 601 5041 <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="store-status-closed">
          {status === "closed" ? "Please check back soon" : "Call to confirm"}
        </span>
      )}

      {live && <span className="store-status-live">Live update</span>}
    </section>
  );
}
