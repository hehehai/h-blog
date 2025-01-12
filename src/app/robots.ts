import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    host: 'https://hehehai.cn',
    sitemap: 'https://hehehai.cn/sitemap.xml',
  };
}
