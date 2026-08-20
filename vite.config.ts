import contentCollections from "@content-collections/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    contentCollections(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        autoStaticPathsDiscovery: true,
        concurrency: 4,
        crawlLinks: true,
        enabled: true,
        failOnError: true,
        filter: ({ path }) => path !== "/photos" && !path.includes("#"),
      },
      router: {
        routesDirectory: "routes",
      },
    }),
    react(),
    nitro(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});
