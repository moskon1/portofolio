import type { Metadata } from 'next';
import Contact from '@/src/views/Contact';
import PageLocale from '../page-locale';
import { localeFrom, pageMetadata, SeoSchema, text } from '@/src/lib/seo';

const seo = { title: text('Contactează NodeStack','Contact NodeStack','NodeStack kontaktieren','Kontakt NodeStack'), description: text('Discută cu NodeStack despre următorul tău website, proiect SEO, platformă hospitality sau aplicație custom.','Talk to NodeStack about your next website, SEO project, hospitality platform or custom application.','Sprechen Sie mit NodeStack über Ihre nächste Website, SEO, Hospitality-Plattform oder individuelle Anwendung.','Snakk med NodeStack om din neste nettside, SEO, reiselivsplattform eller skreddersydde applikasjon.'), type: 'contact' as const };
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ lang?: string }> }): Promise<Metadata> { return pageMetadata('/contact', localeFrom((await searchParams).lang), seo); }
export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const locale = localeFrom((await searchParams).lang);
  return <PageLocale locale={locale}><SeoSchema path="/contact" locale={locale} seo={seo}/><Contact /></PageLocale>;
}
