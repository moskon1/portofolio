import type { Metadata } from 'next';
import TourismDemo from '@/src/tourism-theme/src/App';
import PageLocale from '@/app/page-locale';
import { localeFrom, pageMetadata, SeoSchema, text } from '@/src/lib/seo';

const seo = { title: text('Demo Website Hotel și Vilă','Hotel & Villa Website Demo','Hotel- & Villenwebsite Demo','Demo for hotell- og villanettside'), description: text('Demo modern pentru hoteluri și vile cu camere, galerii, recenzii, atracții și rezervări directe WhatsApp.','Modern hotel and villa demo with rooms, galleries, reviews, attractions and direct WhatsApp booking.','Moderne Hotel- und Villendemo mit Zimmern, Galerien, Bewertungen, Attraktionen und WhatsApp-Direktbuchung.','Moderne hotell- og villademo med rom, galleri, anmeldelser, attraksjoner og direkte WhatsApp-bestilling.'), type: 'website' as const, image: '/hospitality.jpg' };
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { return pageMetadata('/demos/hospitality', localeFrom((await params).locale), seo); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = localeFrom((await params).locale);
  return <PageLocale locale={locale}><SeoSchema path="/demos/hospitality" locale={locale} seo={seo}/><TourismDemo /></PageLocale>;
}
