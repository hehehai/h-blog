import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#FFFFFF",
    description:
      "Hehehai @一块木头 - 全栈开发，专注于前端应用程序和和用户界面设计.",
    display: "standalone",
    icons: [
      {
        sizes: "96x96",
        src: "/icons/icon_x96.png",
        type: "image/png",
      },
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
    name: "Hehehai - Blog",
    orientation: "portrait",
    short_name: "Hehehai",
    start_url: "/",
    theme_color: "#000000",
  };
}
