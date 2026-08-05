import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import { I18nProvider, localize, type Locale, useLocale } from './lib/i18n';

const TourismDemo = lazy(() => import('./tourism-theme/src/App'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

type SeoCopy = Record<Locale, string>;
type SeoEntry = { title: SeoCopy; description: SeoCopy; image?: string; service?: SeoCopy };
const seoCopy = (ro: string, en: string, de: string, no: string): SeoCopy => ({ ro, en, de, no });
const seoByPath: Record<string, SeoEntry> = {
  '/': {
    title: seoCopy('NodeStack — Agenție Web, SEO și Aplicații Digitale','NodeStack — Web, SEO & Digital Product Agency','NodeStack — Web-, SEO- & Digitalagentur','NodeStack — Web-, SEO- og digitalbyrå'),
    description: seoCopy('Website-uri moderne, SEO, aplicații web, AI, Web3 și soluții hospitality pentru afaceri din România și Europa.','Modern websites, SEO, web applications, AI, Web3 and hospitality solutions for businesses across Europe.','Moderne Websites, SEO, Webanwendungen, KI, Web3 und Hospitality-Lösungen für Unternehmen in Europa.','Moderne nettsider, SEO, webapplikasjoner, KI, Web3 og reiselivsløsninger for bedrifter i Europa.'),
  },
  '/services': {
    title: seoCopy('Servicii Web | NodeStack','Web Services | NodeStack','Web-Leistungen | NodeStack','Webtjenester | NodeStack'),
    description: seoCopy('Servicii NodeStack pentru website-uri, SEO, hospitality și aplicații web.','NodeStack services for websites, SEO, hospitality and web applications.','NodeStack-Leistungen für Websites, SEO, Hospitality und Webanwendungen.','NodeStack-tjenester for nettsider, SEO, reiseliv og webapplikasjoner.'),
  },
  '/services/websites': {
    title: seoCopy('Creare Website de Prezentare | NodeStack','Business Website Design & Development | NodeStack','Unternehmenswebsite erstellen lassen | NodeStack','Design og utvikling av bedriftsnettsider | NodeStack'),
    description: seoCopy('Website-uri rapide și responsive cu domeniu, Cloudflare, SEO și Google Business incluse. Pachete de la 1.500 LEI.','Fast responsive business websites with domain, Cloudflare, SEO and Google Business included. Packages from €300.','Schnelle responsive Unternehmenswebsites mit Domain, Cloudflare, SEO und Google Business. Pakete ab 300 €.', 'Raske responsive bedriftsnettsider med domene, Cloudflare, SEO og Google Business. Pakker fra 3.500 NOK.'),
    service: seoCopy('Creare website de prezentare','Business website development','Entwicklung von Unternehmenswebsites','Utvikling av bedriftsnettsider'),
  },
  '/services/hospitality': {
    title: seoCopy('Website pentru Hoteluri, Vile și Pensiuni | NodeStack','Hotel & Villa Website Development | NodeStack','Websites für Hotels, Villen & Pensionen | NodeStack','Nettsider for hoteller, villaer og gjestehus | NodeStack'),
    description: seoCopy('Website-uri hospitality cu rezervări directe, plăți, Booking.com, Airbnb, Google Travel și SEO local.','Hospitality websites with direct bookings, payments, Booking.com, Airbnb, Google Travel and local SEO.','Hospitality-Websites mit Direktbuchung, Zahlung, Booking.com, Airbnb, Google Travel und lokaler SEO.','Reiselivsnettsider med direktebestilling, betaling, Booking.com, Airbnb, Google Travel og lokal SEO.'),
    image: '/hospitality.jpg', service: seoCopy('Website-uri hospitality','Hospitality website development','Hospitality-Webentwicklung','Nettsider for reiseliv'),
  },
  '/services/seo': {
    title: seoCopy('Optimizare SEO Tehnică și Locală | NodeStack','Technical & Local SEO Services | NodeStack','Technische & lokale SEO | NodeStack','Teknisk og lokal SEO | NodeStack'),
    description: seoCopy('Audit SEO, Core Web Vitals, cuvinte cheie, Google Business, Search Console, indexare și raportare lunară.','SEO audits, Core Web Vitals, keyword research, Google Business, Search Console, indexing and monthly reporting.','SEO-Audits, Core Web Vitals, Keyword-Recherche, Google Business, Search Console, Indexierung und Monatsberichte.','SEO-revisjon, Core Web Vitals, søkeord, Google Business, Search Console, indeksering og månedsrapportering.'),
    service: seoCopy('Optimizare SEO','SEO optimization','SEO-Optimierung','SEO-optimalisering'),
  },
  '/services/web-applications': {
    title: seoCopy('Aplicații Web, AI și API-uri Custom | NodeStack','Custom Web Apps, AI & REST APIs | NodeStack','Individuelle Web-Apps, KI & REST APIs | NodeStack','Skreddersydde webapper, KI og REST API-er | NodeStack'),
    description: seoCopy('Platforme full-stack, dashboard-uri, automatizări AI, REST API-uri, plăți și sisteme Web3 scalabile.','Full-stack platforms, dashboards, AI automation, REST APIs, payments and scalable Web3 systems.','Full-Stack-Plattformen, Dashboards, KI-Automatisierung, REST APIs, Zahlungen und skalierbare Web3-Systeme.','Fullstack-plattformer, dashbord, KI-automatisering, REST API-er, betaling og skalerbare Web3-systemer.'),
    service: seoCopy('Dezvoltare aplicații web','Custom web application development','Entwicklung individueller Webanwendungen','Utvikling av skreddersydde webapplikasjoner'),
  },
  '/portfolio': {
    title: seoCopy('Portofoliu Web și Aplicații | NodeStack','Web & Application Portfolio | NodeStack','Web- & App-Portfolio | NodeStack','Portefølje for web og applikasjoner | NodeStack'),
    description: seoCopy('Explorează website-uri, platforme Web3, produse digitale și experiențe hospitality construite de NodeStack.','Explore websites, Web3 platforms, digital products and hospitality experiences built by NodeStack.','Entdecken Sie Websites, Web3-Plattformen, digitale Produkte und Hospitality-Erlebnisse von NodeStack.','Se nettsider, Web3-plattformer, digitale produkter og reiselivsopplevelser bygget av NodeStack.'),
  },
  '/contact': {
    title: seoCopy('Contactează NodeStack | WhatsApp și Telegram','Contact NodeStack | WhatsApp & Telegram','NodeStack kontaktieren | WhatsApp & Telegram','Kontakt NodeStack | WhatsApp og Telegram'),
    description: seoCopy('Discută cu NodeStack despre următorul tău website, proiect SEO, platformă hospitality sau aplicație custom.','Talk to NodeStack about your next website, SEO project, hospitality platform or custom application.','Sprechen Sie mit NodeStack über Ihre nächste Website, SEO, Hospitality-Plattform oder individuelle Anwendung.','Snakk med NodeStack om din neste nettside, SEO, reiselivsplattform eller skreddersydde applikasjon.'),
  },
  '/demos/hospitality': {
    title: seoCopy('Demo Website Hotel și Vilă | NodeStack','Hotel & Villa Website Demo | NodeStack','Hotel- & Villenwebsite Demo | NodeStack','Demo for hotell- og villanettside | NodeStack'),
    description: seoCopy('Demo modern pentru hoteluri și vile cu camere, galerii, recenzii, atracții și rezervări directe WhatsApp.','Modern hotel and villa demo with rooms, galleries, reviews, attractions and direct WhatsApp booking.','Moderne Hotel- und Villendemo mit Zimmern, Galerien, Bewertungen, Attraktionen und WhatsApp-Direktbuchung.','Moderne hotell- og villademo med rom, galleri, anmeldelser, attraksjoner og direkte WhatsApp-bestilling.'),
    image: '/hospitality.jpg',
  },
};

function SeoManager() {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    const seo = seoByPath[pathname] || seoByPath['/'];
    const title = localize(locale, seo.title);
    const description = localize(locale, seo.description);
    const pagePath = pathname === '/' ? '/' : pathname;
    const canonicalUrl = `https://www.nodestack.pro${pagePath}?lang=${locale}`;
    const imageUrl = `https://www.nodestack.pro${seo.image || '/logo.png'}`;
    const browserUrl = new URL(window.location.href);
    if (browserUrl.searchParams.get('lang') !== locale) {
      browserUrl.searchParams.set('lang', locale);
      window.history.replaceState(window.history.state, '', `${browserUrl.pathname}${browserUrl.search}${browserUrl.hash}`);
    }
    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      element?.setAttribute(attribute, value);
    };

    const ensureLink = (rel: string, hreflang?: string) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
      let link = document.head.querySelector<HTMLLinkElement>(selector);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        if (hreflang) link.hreflang = hreflang;
        document.head.appendChild(link);
      }
      return link;
    };

    document.title = title;
    document.documentElement.lang = locale === 'no' ? 'nb' : locale;
    ensureLink('canonical').href = canonicalUrl;
    (['ro','en','de','no'] as Locale[]).forEach((language) => {
      const hreflang = language === 'no' ? 'nb' : language;
      ensureLink('alternate', hreflang).href = `https://www.nodestack.pro${pagePath}?lang=${language}`;
    });
    ensureLink('alternate', 'x-default').href = `https://www.nodestack.pro${pagePath}?lang=en`;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', imageUrl);
    setMeta('meta[property="og:locale"]', 'content', { ro: 'ro_RO', en: 'en_US', de: 'de_DE', no: 'nb_NO' }[locale]);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', imageUrl);

    let structuredData = document.head.querySelector<HTMLScriptElement>('#nodestack-page-schema');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'nodestack-page-schema';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': seo.service ? 'Service' : pathname === '/contact' ? 'ContactPage' : pathname === '/portfolio' ? 'CollectionPage' : 'WebPage',
      name: title,
      description,
      url: canonicalUrl,
      inLanguage: locale === 'no' ? 'nb' : locale,
      image: imageUrl,
      provider: seo.service ? { '@type': 'ProfessionalService', name: 'NodeStack', url: 'https://www.nodestack.pro/' } : undefined,
      serviceType: seo.service ? localize(locale, seo.service) : undefined,
    });
  }, [locale, pathname]);

  return null;
}

function AppShell() {
  const { pathname } = useLocation();
  const isStandaloneDemo = pathname.startsWith('/demos/');

  return (
    <>
      <ScrollToTop />
      <SeoManager />
      <div className="flex flex-col min-h-screen relative">
        {!isStandaloneDemo && <div className="scanline" />}
        {!isStandaloneDemo && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Navigate to="/services/websites" replace />} />
            <Route path="/services/websites" element={<ServiceDetail serviceKey="websites" />} />
            <Route path="/services/hospitality" element={<ServiceDetail serviceKey="hospitality" />} />
            <Route path="/services/seo" element={<ServiceDetail serviceKey="seo" />} />
            <Route path="/services/web-applications" element={<ServiceDetail serviceKey="web-applications" />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/demos/hospitality"
              element={
                <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
                  <TourismDemo />
                </Suspense>
              }
            />
          </Routes>
        </main>
        {!isStandaloneDemo && <Footer />}
      </div>
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Router>
        <AppShell />
      </Router>
    </I18nProvider>
  );
}
