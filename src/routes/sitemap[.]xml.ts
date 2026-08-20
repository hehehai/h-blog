import { createFileRoute } from "@tanstack/react-router";
import { allPosts } from "@/content";
import { absoluteUrl } from "@/lib/seo";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls: Array<{ lastModified?: Date; path: string }> = [
          { path: "/" },
          { path: "/about" },
          { path: "/posts" },
          { path: "/projects" },
          { path: "/photos" },
          ...allPosts.map((post) => ({
            lastModified: post.lastModified,
            path: `/posts/${post.slug}`,
          })),
        ];
        const body = urls
          .map(
            ({ lastModified, path }) =>
              `  <url><loc>${escapeXml(absoluteUrl(path))}</loc>${
                lastModified
                  ? `<lastmod>${new Date(lastModified).toISOString()}</lastmod>`
                  : ""
              }</url>`
          )
          .join("\n");

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`,
          {
            headers: { "Content-Type": "application/xml; charset=utf-8" },
          }
        );
      },
    },
  },
});
