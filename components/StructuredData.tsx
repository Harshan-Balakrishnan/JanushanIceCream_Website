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
    hasMap: "https://www.google.com/maps/place/Janushan+Ice+Cream+Company/@8.7563192,80.4539652,21z/data=!4m22!1m15!4m14!1m6!1m2!1s0x3afc3fb68cd083c1:0xb1c2af8533ecebef!2sJanushan+Ice+Cream+Company,+Vavuniya,+Sri+Lanka!2m2!1d80.4542663!2d8.7563918!1m6!1m2!1s0x3afc3fb68cd083c1:0xb1c2af8533ecebef!2sJanushan+Ice+Cream+Company,+Vavuniya,+Sri+Lanka!2m2!1d80.4542663!2d8.7563918!3m5!1s0x3afc3fb68cd083c1:0xb1c2af8533ecebef!8m2!3d8.7563918!4d80.4542663!16s%2Fg%2F11g232gmjp?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D",
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
