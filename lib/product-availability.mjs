/** Normalize untrusted catalogue availability before displaying it to customers. */
const knownStatuses = new Set(["in-stock", "low-stock", "sold-out"]);

/**
 * @param {unknown} value
 * @returns {"in-stock" | "low-stock" | "sold-out" | "unknown"}
 */
export function normalizeAvailability(value) {
  return typeof value === "string" && knownStatuses.has(value) ? value : "unknown";
}

/**
 * @param {unknown} value
 * @returns {{status: "in-stock" | "low-stock" | "sold-out" | "unknown", label: string, actionLabel: string, note: string}}
 */
export function getAvailabilityPresentation(value) {
  const status = normalizeAvailability(value);
  switch (status) {
    case "in-stock":
      return {
        status,
        label: "Available today",
        actionLabel: "Call to order +94 77 601 5041",
        note: "Call +94 77 601 5041 to place an order and confirm availability.",
      };
    case "low-stock":
      return {
        status,
        label: "Limited today",
        actionLabel: "Call to confirm stock",
        note: "Stock is marked as limited. Call to confirm availability before ordering.",
      };
    case "sold-out":
      return {
        status,
        label: "Sold out",
        actionLabel: "Call to check availability",
        note: "This product is marked sold out. Call us to ask when it may return.",
      };
    default:
      return {
        status,
        label: "Call to confirm availability",
        actionLabel: "Call to check availability",
        note: "Availability is not confirmed in the online menu. Call to check before ordering.",
      };
  }
}
