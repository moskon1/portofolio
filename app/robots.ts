import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/demo/'] }], sitemap: 'https://www.nodestack.pro/sitemap.xml' };
}
