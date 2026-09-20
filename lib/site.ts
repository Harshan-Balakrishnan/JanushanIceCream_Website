export const SITE_NAME = "Janushan Ice Cream";
export const SITE_DESCRIPTION =
  "Janushan Ice Cream in Nelukkulam, Vavuniya — explore our ice cream menu, flavours, prices and order directly by WhatsApp. A Scoop of Happiness since 2004.";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
export const SITE_URL = configuredUrl || "https://www.janushanicecream.lk";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
