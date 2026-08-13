import type { Metadata } from 'next';
import Home from '@/src/views/Home';
import PageLocale from '@/app/page-locale';
import { localeFrom, pageMetadata, SeoSchema, text } from '@/src/lib/seo';

const seo = { title: text('NodeStack — Agenție Web, SEO și Aplicații Digitale','NodeStack — Web, SEO & Digital Product Agency','NodeStack — Web-, SEO- & Digitalagentur','NodeStack — Web-, SEO- og digitalbyrå'), description: text('Website-uri moderne, SEO, aplicații web, AI, Web3 și soluții hospitality pentru afaceri din România și Europa.','Modern websites, SEO, web applications, AI, Web3 and hospitality solutions for businesses across Europe.','Moderne Websites, SEO, Webanwendungen, KI, Web3 und Hospitality-Lösungen für Unternehmen in Europa.','Moderne nettsider, SEO, webapplikasjoner, KI, Web3 og reiselivsløsninger for bedrifter i Europa.'), type: 'website' as const };
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return pageMetadata('/', localeFrom((await params).locale), seo);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = localeFrom((await params).locale);
  return <PageLocale locale={locale}><SeoSchema path="/" locale={locale} seo={seo}/><Home /></PageLocale>;
}
