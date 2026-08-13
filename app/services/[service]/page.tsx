import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetail from '@/src/views/ServiceDetail';

const services = {
  websites: { title: 'Creare Website de Prezentare', description: 'Website-uri rapide și responsive cu domeniu, Cloudflare, SEO și Google Business incluse.' },
  hospitality: { title: 'Website pentru Hoteluri, Vile și Pensiuni', description: 'Website-uri hospitality cu rezervări directe, plăți, Booking.com, Airbnb, Google Travel și SEO local.' },
  seo: { title: 'Optimizare SEO Tehnică și Locală', description: 'Audit SEO, Core Web Vitals, cuvinte-cheie, Google Business, Search Console, indexare și raportare.' },
  'web-applications': { title: 'Aplicații Web, AI și API-uri Custom', description: 'Platforme full-stack, dashboard-uri, automatizări AI, API-uri REST, plăți și sisteme Web3 scalabile.' },
} as const;

type ServiceSlug = keyof typeof services;
export function generateStaticParams() { return Object.keys(services).map((service) => ({ service })); }
export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const entry = services[service as ServiceSlug];
  if (!entry) return {};
  return { ...entry, alternates: { canonical: `/services/${service}` } };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  if (!(service in services)) notFound();
  return <ServiceDetail serviceKey={service as ServiceSlug} />;
}
