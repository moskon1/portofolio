import type { MetadataRoute } from 'next';
const routes = ['', '/services/websites', '/services/hospitality', '/services/seo', '/services/web-applications', '/portfolio', '/contact', '/demos/hospitality'];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({ url: `https://www.nodestack.pro${route || '/'}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' : 'monthly', priority: route === '' ? 1 : .8 }));
}
