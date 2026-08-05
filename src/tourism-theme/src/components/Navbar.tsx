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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center">
          <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white block">
            {settings.propertyName}
          </span>
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
        <div className="hidden sm:flex items-center gap-3">
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

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800 border border-slate-700"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBooking();
              }}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-sm py-3 rounded-xl shadow-lg shadow-emerald-600/30"
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
