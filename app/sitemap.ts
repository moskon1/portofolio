import type { MetadataRoute } from 'next';
import { locales } from '@/src/lib/seo';
const routes = ['', '/services/websites', '/services/hospitality', '/services/seo', '/services/web-applications', '/portfolio', '/contact', '/demos/hospitality'];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => locales.map((locale) => ({ url: `https://www.nodestack.pro${route || '/'}?lang=${locale}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : .8 })));
}
