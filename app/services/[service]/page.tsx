import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/src/views/ServiceDetail';
import PageLocale from '../../page-locale';
import { localeFrom, pageMetadata, SeoSchema, text, type SeoEntry } from '@/src/lib/seo';

const services: Record<string, SeoEntry> = {
  websites: { title: text('Creare Website de Prezentare','Business Website Design & Development','Unternehmenswebsite erstellen lassen','Design og utvikling av bedriftsnettsider'), description: text('Website-uri rapide și responsive cu domeniu, Cloudflare, SEO și Google Business incluse.','Fast responsive business websites with domain, Cloudflare, SEO and Google Business included.','Schnelle responsive Unternehmenswebsites mit Domain, Cloudflare, SEO und Google Business.','Raske responsive bedriftsnettsider med domene, Cloudflare, SEO og Google Business.'), type: 'service' },
  hospitality: { title: text('Website pentru Hoteluri, Vile și Pensiuni','Hotel & Villa Website Development','Websites für Hotels, Villen & Pensionen','Nettsider for hoteller, villaer og gjestehus'), description: text('Website-uri hospitality cu rezervări directe, plăți, Booking.com, Airbnb, Google Travel și SEO local.','Hospitality websites with direct bookings, payments, Booking.com, Airbnb, Google Travel and local SEO.','Hospitality-Websites mit Direktbuchung, Zahlung, Booking.com, Airbnb, Google Travel und lokaler SEO.','Reiselivsnettsider med direktebestilling, betaling, Booking.com, Airbnb, Google Travel og lokal SEO.'), type: 'service', image: '/hospitality.jpg' },
  seo: { title: text('Optimizare SEO Tehnică și Locală','Technical & Local SEO Services','Technische & lokale SEO','Teknisk og lokal SEO'), description: text('Audit SEO, Core Web Vitals, cuvinte-cheie, Google Business, Search Console, indexare și raportare.','SEO audits, Core Web Vitals, keyword research, Google Business, Search Console, indexing and reporting.','SEO-Audits, Core Web Vitals, Keyword-Recherche, Google Business, Search Console, Indexierung und Berichte.','SEO-revisjon, Core Web Vitals, søkeord, Google Business, Search Console, indeksering og rapportering.'), type: 'service' },
  'web-applications': { title: text('Aplicații Web, AI și API-uri Custom','Custom Web Apps, AI & REST APIs','Individuelle Web-Apps, KI & REST APIs','Skreddersydde webapper, KI og REST API-er'), description: text('Platforme full-stack, dashboard-uri, automatizări AI, API-uri REST, plăți și sisteme Web3 scalabile.','Full-stack platforms, dashboards, AI automation, REST APIs, payments and scalable Web3 systems.','Full-Stack-Plattformen, Dashboards, KI-Automatisierung, REST APIs, Zahlungen und skalierbare Web3-Systeme.','Fullstack-plattformer, dashbord, KI-automatisering, REST API-er, betaling og skalerbare Web3-systemer.'), type: 'service' },
};

type ServiceSlug = 'websites' | 'hospitality' | 'seo' | 'web-applications';
export function generateStaticParams() { return Object.keys(services).map((service) => ({ service })); }
export async function generateMetadata({ params, searchParams }: { params: Promise<{ service: string }>; searchParams: Promise<{ lang?: string }> }): Promise<Metadata> {
  const { service } = await params; const entry = services[service];
  return entry ? pageMetadata(`/services/${service}`, localeFrom((await searchParams).lang), entry) : {};
}
export default async function Page({ params, searchParams }: { params: Promise<{ service: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { service } = await params; if (!(service in services)) notFound();
  const locale = localeFrom((await searchParams).lang); const seo = services[service];
  return <PageLocale locale={locale}><SeoSchema path={`/services/${service}`} locale={locale} seo={seo}/><ServiceDetail serviceKey={service as ServiceSlug}/></PageLocale>;
}
