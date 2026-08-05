import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import LanguageSelector from './LanguageSelector';
import { localize, useLocale } from '@/src/lib/i18n';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { locale } = useLocale();
  const navLinks = [
    { name: localize(locale, { ro: 'Acasă', en: 'Home', de: 'Startseite', no: 'Hjem' }), href: '/' },
    { name: localize(locale, { ro: 'Servicii', en: 'Services', de: 'Leistungen', no: 'Tjenester' }), href: '/services' },
    { name: localize(locale, { ro: 'Portofoliu', en: 'Portfolio', de: 'Portfolio', no: 'Portefølje' }), href: '/portfolio' },
    { name: localize(locale, { ro: 'Contact', en: 'Contact', de: 'Kontakt', no: 'Kontakt' }), href: '/contact' },
  ];
  const getStarted = localize(locale, { ro: 'Începe un proiect', en: 'Get Started', de: 'Projekt starten', no: 'Start et prosjekt' });

  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="NodeStack" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-bold text-white tracking-tight">Node<span className="text-brand">Stack</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  location.pathname === link.href ? "text-brand" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSelector compact />
            <Link
              to="/contact"
              className="bg-brand text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
            >
              {getStarted}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-brand transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.href ? "text-brand bg-brand/10" : "text-slate-400 hover:text-brand hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2"><LanguageSelector /></div>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand text-white px-3 py-3 rounded-md text-base font-semibold mt-4"
            >
              {getStarted}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
