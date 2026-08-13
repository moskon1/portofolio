import type { Metadata } from 'next';
import type { Locale } from './i18n';

export const locales: Locale[] = ['ro', 'en', 'de', 'no'];
export type SeoText = Record<Locale, string>;
export type SeoEntry = { title: SeoText; description: SeoText; type?: 'website' | 'service' | 'collection' | 'contact'; image?: string };
export const text = (ro: string, en: string, de: string, no: string): SeoText => ({ ro, en, de, no });

export function localeFrom(value?: string): Locale {
  return locales.includes(value as Locale) ? value as Locale : 'ro';
}

export function localizedPath(path: string, locale: Locale) {
  return `/${locale}${path === '/' ? '' : path}`;
}

export function pageMetadata(path: string, locale: Locale, seo: SeoEntry): Metadata {
  const canonical = localizedPath(path, locale);
  const languages = Object.fromEntries(locales.map((item) => [item === 'no' ? 'nb' : item, localizedPath(path, item)]));
  languages['x-default'] = localizedPath(path, 'en');
  return {
    title: seo.title[locale],
    description: seo.description[locale],
    alternates: { canonical, languages },
    openGraph: { title: seo.title[locale], description: seo.description[locale], url: canonical, locale: { ro: 'ro_RO', en: 'en_US', de: 'de_DE', no: 'nb_NO' }[locale], images: [seo.image || '/logo.png'] },
    twitter: { title: seo.title[locale], description: seo.description[locale], images: [seo.image || '/logo.png'] },
  };
}

export function SeoSchema({ path, locale, seo }: { path: string; locale: Locale; seo: SeoEntry }) {
  const type = seo.type === 'service' ? 'Service' : seo.type === 'collection' ? 'CollectionPage' : seo.type === 'contact' ? 'ContactPage' : 'WebPage';
  const data = {
    '@context': 'https://schema.org', '@type': type, name: seo.title[locale], description: seo.description[locale],
    url: `https://www.nodestack.pro${localizedPath(path, locale)}`, inLanguage: locale === 'no' ? 'nb' : locale,
    image: `https://www.nodestack.pro${seo.image || '/logo.png'}`,
    ...(seo.type === 'service' ? { provider: { '@type': 'ProfessionalService', name: 'NodeStack', url: 'https://www.nodestack.pro/' }, serviceType: seo.title[locale] } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
