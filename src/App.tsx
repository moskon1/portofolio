import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import { I18nProvider, useLocale } from './lib/i18n';

const TourismDemo = lazy(() => import('./tourism-theme/src/App'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const seoByPath: Record<string, { title: string; description: string; image?: string; lang?: string }> = {
  '/': {
    title: 'NodeStack — Digital Product & Web Development Agency',
    description: 'NodeStack builds modern websites, scalable platforms, Web3 products, and hospitality booking experiences for ambitious businesses.',
  },
  '/services': {
    title: 'Web Development & Hospitality Packages | NodeStack',
    description: 'Explore NodeStack web development, SEO, Cloudflare hosting, Web3 engineering, and hospitality website packages.',
  },
  '/portfolio': {
    title: 'Selected Work & Case Studies | NodeStack',
    description: 'Explore websites, Web3 platforms, digital products, and hospitality experiences designed and engineered by NodeStack.',
  },
  '/contact': {
    title: 'Start a Project | NodeStack',
    description: 'Talk to NodeStack about your website, hospitality platform, Web3 product, or custom software project.',
  },
  '/demos/hospitality': {
    title: 'Hotel & Villa Booking Website Demo | NodeStack',
    description: 'Explore a modern hospitality website demo with rooms, galleries, reviews, local attractions, and direct WhatsApp booking.',
    image: '/hospitality.jpg',
    lang: 'ro',
  },
};

function SeoManager() {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    const seo = seoByPath[pathname] || seoByPath['/'];
    const canonicalUrl = `https://www.nodestack.pro${pathname === '/' ? '/' : pathname}`;
    const imageUrl = `https://www.nodestack.pro${seo.image || '/logo.png'}`;
    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      element?.setAttribute(attribute, value);
    };

    document.title = seo.title;
    document.documentElement.lang = locale === 'no' ? 'nb' : locale;
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', imageUrl);
    setMeta('meta[property="og:locale"]', 'content', { ro: 'ro_RO', en: 'en_US', de: 'de_DE', no: 'nb_NO' }[locale]);
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:image"]', 'content', imageUrl);
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
