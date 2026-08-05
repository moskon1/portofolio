import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X
} from 'lucide-react';
import { TemplateSettings } from '../types';
import { openDirectWhatsAppChat } from '../utils/whatsapp';
import { localeOptions, localize, useLocale } from '@/src/lib/i18n';

interface NavbarProps {
  settings: TemplateSettings;
  onOpenQuickBooking: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenQuickBooking,
  selectedCategory,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  const isRO = settings.language === 'ro';

  const navLinks = [
    { id: 'accommodations', label: t('Camere', 'Rooms', 'Zimmer', 'Rom'), href: '#accommodations' },
    { id: 'amenities', label: t('Servicii', 'Services', 'Ausstattung', 'Fasiliteter'), href: '#amenities' },
    { id: 'gallery', label: t('Galerie', 'Gallery', 'Galerie', 'Galleri'), href: '#gallery' },
    { id: 'location', label: t('Locație', 'Location', 'Lage', 'Beliggenhet'), href: '#location' },
    { id: 'reviews', label: t('Recenzii', 'Reviews', 'Bewertungen', 'Anmeldelser'), href: '#reviews' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.id === 'accommodations') {
      onSelectCategory('all');
    }
    if (link.href) {
      const element = document.querySelector(link.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-amber-500/20 shadow-xl">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="min-w-0">
            <span className="font-serif text-base sm:text-xl font-bold tracking-tight text-white block truncate">
              {settings.propertyName}
            </span>
            <span className="block lg:hidden text-[10px] text-slate-400 truncate">{settings.cityRegion}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-all"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons Right */}
        <div className="hidden lg:flex items-center gap-3">
          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value as typeof locale)}
            aria-label="Select language"
            className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            {localeOptions.map((option) => <option key={option.value} value={option.value}>{option.short}</option>)}
          </select>
          {/* Quick Phone Call Link */}
          <a
            href={`tel:${settings.displayPhone}`}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">{settings.displayPhone}</span>
          </a>

          {/* WhatsApp Direct Booking CTA */}
          <button
            onClick={onOpenQuickBooking}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="w-4 h-4 text-emerald-100 fill-emerald-100" />
            <span>{t('Rezervă pe WhatsApp', 'Book on WhatsApp', 'Über WhatsApp buchen', 'Bestill på WhatsApp')}</span>
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenQuickBooking}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 active:scale-95 transition"
            aria-label={t('Rezervare pe WhatsApp', 'Book on WhatsApp', 'Über WhatsApp buchen', 'Bestill på WhatsApp')}
          >
            <MessageSquare className="w-4 h-4 fill-white" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-slate-200 rounded-xl bg-slate-800 border border-slate-700 active:scale-95 transition"
            aria-label={t('Deschide meniul', 'Toggle navigation menu', 'Navigationsmenü öffnen', 'Åpne navigasjonsmenyen')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-800 px-3 sm:px-6 pt-3 pb-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-800/60 border border-slate-700/70 px-4 py-3">
            <label htmlFor="hospitality-mobile-language" className="text-sm font-semibold text-slate-300">{t('Limbă', 'Language', 'Sprache', 'Språk')}</label>
            <select
              id="hospitality-mobile-language"
              value={locale}
              onChange={(event) => setLocale(event.target.value as typeof locale)}
              aria-label="Select language"
              className="bg-slate-900 text-slate-200 text-xs font-bold rounded-lg px-3 py-2 border border-slate-700 outline-none focus:border-amber-400"
            >
              {localeOptions.map((option) => <option key={option.value} value={option.value}>{option.short}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/60 border border-slate-700/70 hover:border-amber-500/40 hover:text-amber-300 transition"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-[0.8fr_1.2fr] gap-2">
            <a
              href={`tel:${settings.displayPhone}`}
              className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs px-3 py-3 rounded-xl"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{t('Sună', 'Call', 'Anrufen', 'Ring')}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-xs py-3 rounded-xl shadow-lg shadow-emerald-600/30"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{t('Rezervare rapidă', 'Quick WhatsApp Booking', 'Schnellbuchung', 'Hurtigbestilling')}</span>
            </button>

          </div>
        </div>
      )}
    </header>
  );
};
