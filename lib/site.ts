export const SITE_NAME = "Janushan Ice Cream";
export const SITE_DESCRIPTION =
  "Janushan Ice Cream in Vavuniya, Sri Lanka — explore our ice cream menu, flavours, gallery and find us in Nelukkulam.";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
export const SITE_URL = configuredUrl || "https://janushan-ice-cream-website.vercel.app";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
