import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config/site";

export const Route = createFileRoute("/manifest.webmanifest")({
  server: {
    handlers: {
      GET: () =>
        Response.json({
          background_color: "#FFFFFF",
          description: siteConfig.description,
          display: "standalone",
          icons: [
            { sizes: "96x96", src: "/icons/icon_x96.png", type: "image/png" },
            {
              sizes: "128x128",
              src: "/icons/icon_x128.png",
              type: "image/png",
            },
            {
              sizes: "192x192",
              src: "/icons/icon_x192.png",
              type: "image/png",
            },
            {
              sizes: "512x512",
              src: "/icons/icon_x512.png",
              type: "image/png",
            },
          ],
          name: siteConfig.title,
          orientation: "portrait",
          short_name: "Hehehai",
          start_url: "/",
          theme_color: "#000000",
        }),
    },
  },
});
