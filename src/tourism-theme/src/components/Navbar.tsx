import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  Sparkles, 
  Building,
  Home
} from 'lucide-react';
import { TemplateSettings } from '../types';
import { openDirectWhatsAppChat } from '../utils/whatsapp';

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

  const isRO = settings.language === 'ro';

  const navLinks = [
    { id: 'accommodations', label: isRO ? 'Camere' : 'Rooms', href: '#accommodations' },
    { id: 'amenities', label: isRO ? 'Servicii' : 'Services', href: '#amenities' },
    { id: 'gallery', label: isRO ? 'Galerie' : 'Gallery', href: '#gallery' },
    { id: 'location', label: isRO ? 'Locație' : 'Location', href: '#location' },
    { id: 'reviews', label: isRO ? 'Recenzii' : 'Reviews', href: '#reviews' },
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
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
            <Building className="w-4 h-4" />
          </div>
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
            <span>{isRO ? 'Rezervă pe WhatsApp' : 'Book on WhatsApp'}</span>
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenQuickBooking}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 active:scale-95 transition"
            aria-label={isRO ? 'Rezervare pe WhatsApp' : 'Book on WhatsApp'}
          >
            <MessageSquare className="w-4 h-4 fill-white" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-slate-200 rounded-xl bg-slate-800 border border-slate-700 active:scale-95 transition"
            aria-label={isRO ? 'Deschide meniul' : 'Toggle navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-800 px-3 sm:px-6 pt-3 pb-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
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
              <span>{isRO ? 'Sună' : 'Call'}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-xs py-3 rounded-xl shadow-lg shadow-emerald-600/30"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{isRO ? 'Rezervare Rapidă WhatsApp' : 'Quick WhatsApp Booking'}</span>
            </button>

          </div>
        </div>
      )}
    </header>
  );
};
