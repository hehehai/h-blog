import { baseHost } from "lib/utils";
import { GetServerSidePropsContext } from "next";
import { postMdxData } from "~/utils/mdx";

type SitemapLocation = {
  url: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
  lastmod?: Date;
};

// Use this to manually add routes to the sitemap
const defaultUrls: SitemapLocation[] = [
  {
    url: "/",
    changefreq: "daily",
    priority: 1,
    lastmod: new Date(),
  },
  { url: "/about", changefreq: "monthly", priority: 0.5 },
  { url: "/posts", priority: 0.7 },
  { url: "/projects", changefreq: "weekly", priority: 0.5 },
  { url: "/photos", changefreq: "weekly", priority: 0.5 },
];

const createSitemap = (locations: SitemapLocation[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${locations
      .map((location) => {
        return `<url>
                  <loc>${baseHost}${location.url}</loc>
                  <priority>${location.priority}</priority>
                  ${
                    location.lastmod
                      ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                      : ""
                  }
                </url>`;
      })
      .join("")
    }
  </urlset>
  `;
};

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = postMdxData(false);

  // Return the default urls, combined with dynamic urls above
  const locations = [
    ...defaultUrls,
    ...posts.map((post) => ({
      url: `/posts/${post.fileName}`,
      priority: 0.5,
      lastmod: new Date(post.publicAtMs),
    })),
  ];

  // Set response to XML
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(locations));
  res.end();

  return {
    props: {},
  };
}
