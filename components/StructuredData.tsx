import { SITE_URL } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: "Janushan Ice Cream",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/Brand Logo.png`,
    image: `${SITE_URL}/og/og-default.png`,
    description: "Janushan Ice Cream — A Scoop of Happiness since 2004.",
    foundingDate: "2004",
    telephone: "+94 24 222 6041",
    email: "ramayabalan08@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No:256/4, Janushan Ice Cream, Kali Kovil Road, Nelukkulam",
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
