import { authorProfile } from "@/lib/config/author";
import { siteConfig } from "@/lib/config/site";

const defaultImage = `${siteConfig.host}/favicon.svg`;

type SeoOptions = {
  description: string;
  image?: string;
  path: string;
  structuredData?: Record<string, unknown>;
  title: string;
  type?: "article" | "website";
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.host).toString();
}

export function createSeoHead({
  description,
  image = defaultImage,
  path,
  structuredData,
  title,
  type = "website",
}: SeoOptions) {
  const url = absoluteUrl(path);

  return {
    links: [{ href: url, rel: "canonical" }],
    meta: [
      { content: description, name: "description" },
      { content: siteConfig.keywords.join(","), name: "keywords" },
      { content: siteConfig.twitterName, name: "twitter:creator" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: title, name: "twitter:title" },
      { content: description, name: "twitter:description" },
      { content: image, name: "twitter:image" },
      { content: description, property: "og:description" },
      { content: image, property: "og:image" },
      { content: siteConfig.title, property: "og:site_name" },
      { content: title, property: "og:title" },
      { content: type, property: "og:type" },
      { content: url, property: "og:url" },
      { title },
    ],
    scripts: structuredData
      ? [
          {
            children: JSON.stringify(structuredData).replaceAll("<", "\\u003c"),
            type: "application/ld+json",
          },
        ]
      : [],
  };
}

export function createWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        description: siteConfig.description,
        inLanguage: "zh-CN",
        name: siteConfig.title,
        url: siteConfig.host,
      },
      {
        "@type": "Person",
        image: absoluteUrl(authorProfile.avatar),
        name: authorProfile.name,
        sameAs: [siteConfig.github, siteConfig.twitter, siteConfig.threads],
        url: siteConfig.host,
      },
    ],
  };
}
