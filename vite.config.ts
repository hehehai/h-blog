import { cloudflare } from "@cloudflare/vite-plugin";
import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    {
      enforce: "pre",
      ...mdx({
        rehypePlugins: [
          rehypeSlug,
          rehypeCodeTitles,
          rehypeHighlight,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["anchor"],
              },
            },
          ],
        ],
        remarkPlugins: [remarkFrontmatter, remarkGfm],
      }),
    },
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
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});
