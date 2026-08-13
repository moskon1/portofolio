import type { MetadataRoute } from 'next';
import { locales, localizedPath } from '@/src/lib/seo';
import fs from 'node:fs/promises';
import path from 'node:path';
const routes = ['', '/services/websites', '/services/hospitality', '/services/seo', '/services/web-applications', '/portfolio', '/contact', '/demos/hospitality'];
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localized = routes.flatMap((route) => locales.map((locale) => ({ url: `https://www.nodestack.pro${localizedPath(route || '/', locale)}`, lastModified: new Date(), changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const, priority: route === '' ? 1 : .8 })));
  let demos:MetadataRoute.Sitemap=[];
  try{demos=(await fs.readdir(path.join(process.cwd(),'public','generated-demos'))).filter(file=>file.endsWith('.json')).map(file=>({url:`https://www.nodestack.pro/demo/${file.replace(/\.json$/,'')}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.7}));}catch{/* no published demos */}
  return [...localized,...demos];
}
