import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Le Jardin Secret",
    short_name: "Le Jardin",
    description: "Le jardin secret d'Elisa",
    start_url: "/jardin",
    display: "standalone",
    background_color: "#17261d",
    theme_color: "#17261d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}