export const SITE_NAME = "Janushan Ice Cream";
export const SITE_DESCRIPTION =
  "Discover Janushan Ice Cream — a cinematic world of flavours, products and a scoop of happiness since 2004.";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
export const SITE_URL = configuredUrl || "http://localhost:3000";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
