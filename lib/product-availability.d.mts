export type AvailabilityStatus = "in-stock" | "low-stock" | "sold-out" | "unknown";
export interface AvailabilityPresentation {
  status: AvailabilityStatus;
  label: string;
  actionLabel: string;
  note: string;
}
export function normalizeAvailability(value: unknown): AvailabilityStatus;
export function getAvailabilityPresentation(value: unknown): AvailabilityPresentation;
