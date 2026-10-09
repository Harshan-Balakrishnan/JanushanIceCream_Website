"use client";

import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import type { LocationItem } from "@/lib/catalog";

const JANUSHAN_MAP_URL =
  "https://www.google.com/maps/place/Janushan+Ice+Cream+Company/@8.7563192,80.4539652,21z/data=!4m22!1m15!4m14!1m6!1m2!1s0x3afc3fb68cd083c1:0xb1c2af8533ecebef!2sJanushan+Ice+Cream+Company,+Vavuniya,+Sri+Lanka!2m2!1d80.4542663!2d8.7563918!1m6!1m2!1s0x3afc3fb68cd083c1:0xb1c2af8533ecebef!2sJanushan+Ice+Cream+Company,+Vavuniya,+Sri+Lanka!2m2!1d80.4542663!2d8.7563918!3m5!1s0x3afc3fb68cd083c1:0xb1c2af8533ecebef!8m2!3d8.7563918!4d80.4542663!16s%2Fg%2F11g232gmjp?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D";

const fallback: LocationItem[] = [
  {
    id: "vavuniya",
    name: "Vavuniya",
    address: "No. 256/4, Kali Kovil Lane, Nelukkulam, Vavuniya, Sri Lanka",
    phone: "+94 77 601 5041",
    whatsapp: "+94 77 601 5041",
    mapUrl: JANUSHAN_MAP_URL,
    active: true,
    sortOrder: 1,
  },
];

export default function FindJanushan() {
  const { items: locations, live } = useCatalogCollection<LocationItem>(
    "locations",
    fallback,
  );
  const loc = locations[0] || fallback[0];
  const maps = loc.mapUrl || JANUSHAN_MAP_URL;

  // Use the shop's verified coordinates rather than geocoding the street address.
  const embed =
    "https://www.google.com/maps?q=8.7563918,80.4542663&z=18&output=embed";
  const tel = loc.phone.replace(/\s/g, "");
  const orderPhone = "94776015041";

  return (
    <section className="find-world section" id="locations">
      <div className="find-head">
        <p className="section-kicker">CRAVING JIC?</p>
        <h2>
          Find your next <em>scoop.</em>
        </h2>
        <p>
          {live
            ? "Locations are managed live from the JIC Control Room."
            : "JIC is at Nelukkulam, Vavuniya. Call us to confirm availability before you visit."}
        </p>
      </div>

      <div className="find-layout">
        <article className="location-card">
          <span className="location-index">01 · JANUSHAN ICE CREAM</span>
          <h3>{loc.name}</h3>
          <p>{loc.address}</p>

          <div className="location-actions">
            <a
              className="button button-primary"
              href={maps}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions ↗
            </a>
            <a className="button button-ghost" href={`tel:${tel}`}>
              Call Us
            </a>
          </div>

          <div className="location-contact-grid">
            <a href={`tel:${tel}`}>
              <small>PHONE</small>
              <strong>{loc.phone}</strong>
            </a>
            <a href={`tel:+${orderPhone}`}>
              <small>CALL TO ORDER</small>
              <strong>+94 77 601 5041</strong>
            </a>
          </div>
        </article>

        <div className="map-shell">
          <iframe
            title="Janushan Ice Cream Company location in Vavuniya"
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-badge">
            <span>JIC</span>
            <strong>{loc.name.toUpperCase()}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
