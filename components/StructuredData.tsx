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
    priceRange: "Rs. 120-500",
    areaServed: ["Vavuniya", "Nelukkulam"],
    hasMap: "https://www.google.com/maps/search/?api=1&query=Janushan%20Ice%20Cream%20Nelukkulam%20Vavuniya",
    menu: `${SITE_URL}/#menu`,
    foundingDate: "2004",
    telephone: "+94 24 222 6041",
    email: "ramayabalan08@gmail.com",
    sameAs: [
      "https://www.facebook.com/janushanicecream",
      "https://www.instagram.com/janushan_ice_cream/",
    ],
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
