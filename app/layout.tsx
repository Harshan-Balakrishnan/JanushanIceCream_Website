import type { Metadata, Viewport } from "next";
import OptionalAnalytics from "@/components/OptionalAnalytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./jic-upgrades.css";
import "./flavour-mobile.css";
import "./jic-theme.css";
import "./contact-premium.css";
import "./flavour-showcase.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} | A Scoop of Happiness`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }], creator: SITE_NAME, publisher: SITE_NAME,
  category: "Food & Beverage",
  alternates: { canonical: "/" },
  keywords: ["Janushan Ice Cream", "ice cream Sri Lanka", "ice cream Vavuniya", "waffle cone", "ice cream flavours"],
  icons: {
    icon: [{ url: "/brand/janushan-logo.png", type: "image/png" }, { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: { type: "website", locale: "en_LK", url: "/", siteName: SITE_NAME, title: `${SITE_NAME} | A Scoop of Happiness`, description: SITE_DESCRIPTION, images: [{ url: "/og/og-default.png", width: 1200, height: 630, alt: SITE_NAME }] },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} | A Scoop of Happiness`, description: SITE_DESCRIPTION, images: ["/og/og-default.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#041128", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <OptionalAnalytics />
      </body>
    </html>
  );
}
