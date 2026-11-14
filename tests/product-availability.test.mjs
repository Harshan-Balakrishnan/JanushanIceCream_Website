import test from "node:test";
import assert from "node:assert/strict";
import { getAvailabilityPresentation, normalizeAvailability } from "../lib/product-availability.mjs";

test("explicit in-stock status remains available and offers ordering", () => {
  const result = getAvailabilityPresentation("in-stock");
  assert.equal(result.status, "in-stock");
  assert.equal(result.label, "Available today");
  assert.match(result.actionLabel, /Call to order/);
});

test("explicit low-stock status remains limited and asks customers to confirm", () => {
  const result = getAvailabilityPresentation("low-stock");
  assert.equal(result.status, "low-stock");
  assert.equal(result.label, "Limited today");
  assert.equal(result.actionLabel, "Call to confirm stock");
});

test("explicit sold-out status remains sold out and offers a check-only action", () => {
  const result = getAvailabilityPresentation("sold-out");
  assert.equal(result.status, "sold-out");
  assert.equal(result.label, "Sold out");
  assert.equal(result.actionLabel, "Call to check availability");
});

test("missing availability is unknown, not available", () => {
  const result = getAvailabilityPresentation(undefined);
  assert.equal(result.status, "unknown");
  assert.equal(result.label, "Call to confirm availability");
  assert.equal(result.actionLabel, "Call to check availability");
  assert.match(result.note, /not confirmed/);
});

test("null and malformed availability are safely normalized to unknown", () => {
  for (const value of [null, "", "available", "IN-STOCK", 1, {}, false]) {
    assert.equal(normalizeAvailability(value), "unknown");
    assert.equal(getAvailabilityPresentation(value).status, "unknown");
  }
});
