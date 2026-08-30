import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Janushan Ice Cream",
    short_name: "Janushan",
    description: "A Scoop of Happiness — Janushan Ice Cream since 2004.",
    start_url: "/",
    display: "standalone",
    background_color: "#041128",
    theme_color: "#041128",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
