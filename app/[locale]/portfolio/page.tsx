import type { Metadata } from 'next';
import Portfolio from '@/src/views/Portfolio';
import PageLocale from '@/app/page-locale';
import { localeFrom, pageMetadata, SeoSchema, text } from '@/src/lib/seo';

const seo = { title: text('Portofoliu Web și Aplicații','Web & Application Portfolio','Web- & App-Portfolio','Portefølje for web og applikasjoner'), description: text('Explorează website-uri, platforme Web3, produse digitale și experiențe hospitality construite de NodeStack.','Explore websites, Web3 platforms, digital products and hospitality experiences built by NodeStack.','Entdecken Sie Websites, Web3-Plattformen, digitale Produkte und Hospitality-Erlebnisse von NodeStack.','Se nettsider, Web3-plattformer, digitale produkter og reiselivsopplevelser bygget av NodeStack.'), type: 'collection' as const };
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { return pageMetadata('/portfolio', localeFrom((await params).locale), seo); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = localeFrom((await params).locale);
  return <PageLocale locale={locale}><SeoSchema path="/portfolio" locale={locale} seo={seo}/><Portfolio /></PageLocale>;
}
