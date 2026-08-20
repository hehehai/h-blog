import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/lib/config/site";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          [
            "User-agent: *",
            "Allow: /",
            "Disallow: /api/",
            `Host: ${siteConfig.host}`,
            `Sitemap: ${siteConfig.host}/sitemap.xml`,
          ].join("\n"),
          {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          }
        ),
    },
  },
});
