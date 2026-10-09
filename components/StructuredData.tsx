import { SITE_URL } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: "Janushan Ice Cream",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/Brand Logo.png`,
    image: `${SITE_URL}/og/og-default.png`,
    description: "Janushan Ice Cream in Nelukkulam, Vavuniya — ice cream, cones, cups and dessert treats since 2004.",
    priceRange: "LKR 50–1,500",
    currenciesAccepted: "LKR",
    areaServed: ["Vavuniya", "Nelukkulam"],
    hasMap: "https://maps.app.goo.gl/4fgaYc7skrPqs8fu6",
    menu: `${SITE_URL}/#menu`,
    foundingDate: "2004",
    telephone: "+94 77 601 5041",
    email: "ramayabalan08@gmail.com",
    sameAs: [
      "https://www.facebook.com/janushanicecream",
      "https://www.instagram.com/janushan_ice_cream/",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "No. 256/4, Kali Kovil Lane, Nelukkulam",
      addressLocality: "Vavuniya",
      addressCountry: "LK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
