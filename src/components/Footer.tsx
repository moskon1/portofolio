import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { localize, useLocale } from '@/src/lib/i18n';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '40700000000';
const whatsappLabel = import.meta.env.VITE_WHATSAPP_NUMBER ? `+${whatsappNumber}` : '+40 700 000 000';

export default function Footer() {
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white tracking-tight">Node<span className="text-brand">Stack</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              {t('O agenție digitală care construiește produse performante, sisteme backend scalabile și soluții Web3.', 'A digital engineering agency building high-performance products, scalable backends, and Web3 systems.', 'Eine Digitalagentur für leistungsstarke Produkte, skalierbare Backends und Web3-Systeme.', 'Et digitalbyrå som bygger høytytende produkter, skalerbare backender og Web3-systemer.')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t('Linkuri rapide', 'Quick Links', 'Schnellzugriff', 'Hurtiglenker')}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services/websites" className="hover:text-brand transition-colors">{t('Servicii', 'Services', 'Leistungen', 'Tjenester')}</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand transition-colors">{t('Portofoliu', 'Portfolio', 'Portfolio', 'Portefølje')}</Link></li>
              <li><Link to="/contact" className="hover:text-brand transition-colors">{t('Contact', 'Contact', 'Kontakt', 'Kontakt')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">{t('Servicii', 'Services', 'Leistungen', 'Tjenester')}</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services/websites" className="hover:text-brand transition-colors">{t('Website-uri', 'Business Websites', 'Websites', 'Nettsider')}</Link></li>
              <li><Link to="/services/hospitality" className="hover:text-brand transition-colors">Hospitality</Link></li>
              <li><Link to="/services/seo" className="hover:text-brand transition-colors">SEO</Link></li>
              <li><Link to="/services/web-applications" className="hover:text-brand transition-colors">{t('Aplicații Web', 'Web Applications', 'Webanwendungen', 'Webapplikasjoner')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-brand shrink-0" />
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                  {whatsappLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs">
            © {new Date().getFullYear()} NodeStack. {t('Toate drepturile rezervate.', 'All rights reserved.', 'Alle Rechte vorbehalten.', 'Alle rettigheter forbeholdt.')}
          </p>
          <div className="flex space-x-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">{t('Politica de confidențialitate', 'Privacy Policy', 'Datenschutz', 'Personvern')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('Termeni și condiții', 'Terms of Service', 'Nutzungsbedingungen', 'Vilkår')}</a>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2 text-[10px] leading-4 text-slate-500">
          <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            ANPC - Protecția consumatorilor
          </a>
          <span className="hidden sm:inline text-slate-700" aria-hidden="true">·</span>
          <a href="https://anpc.ro/sal/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            Soluționarea alternativă a litigiilor (SAL)
          </a>
        </div>
      </div>
    </footer>
  );
}
