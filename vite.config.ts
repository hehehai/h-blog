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
import { defineConfig, lazyPlugins } from "vite-plus";
import { getPostSources } from "./scripts/content";
import { contentMetadataReload } from "./scripts/content-reload";

const reactFilePattern = /\.(jsx|js|mdx|md|tsx|ts)$/;

export default defineConfig({
  plugins: lazyPlugins(() => [
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
    contentMetadataReload(),
    tailwindcss(),
    tanstackStart({
      pages: getPostSources().map(({ slug }) => ({ path: `/posts/${slug}` })),
      prerender: {
        autoStaticPathsDiscovery: true,
        concurrency: 4,
        crawlLinks: false,
        enabled: true,
        failOnError: true,
        filter: ({ path }) => path !== "/photos" && !path.includes("#"),
      },
      router: {
        routesDirectory: "routes",
      },
      server: {
        entry: "server.tsx",
      },
    }),
    react({ include: reactFilePattern }),
  ]),
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  staged: {
    "*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,json,jsonc,css}": "vp exec ultracite fix",
  },
});
