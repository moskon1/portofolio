'use client';

import { useState } from 'react';
import Link from '@/src/components/LocalizedLink';
import { usePathname } from 'next/navigation';
import { ChevronDown, Code2, Globe2, Hotel, Menu, Search, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import LanguageSelector from './LanguageSelector';
import { localize, useLocale } from '@/src/lib/i18n';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/^\/(?:ro|en|de|no)(?=\/|$)/, '') || '/';
  const { locale } = useLocale();
  const navLinks = [
    { name: localize(locale, { ro: 'Portofoliu', en: 'Portfolio', de: 'Portfolio', no: 'Portefølje' }), href: '/portfolio' },
    { name: localize(locale, { ro: 'Contact', en: 'Contact', de: 'Kontakt', no: 'Kontakt' }), href: '/contact' },
  ];
  const servicesLabel = localize(locale, { ro: 'Servicii', en: 'Services', de: 'Leistungen', no: 'Tjenester' });
  const serviceLinks = [
    { name: localize(locale,{ro:'Website-uri de prezentare',en:'Business Websites',de:'Unternehmenswebsites',no:'Bedriftsnettsider'}), href:'/services/websites', icon: Globe2 },
    { name: localize(locale,{ro:'Website-uri Hospitality',en:'Hospitality Websites',de:'Hospitality-Websites',no:'Nettsider for reiseliv'}), href:'/services/hospitality', icon: Hotel },
    { name: localize(locale,{ro:'Aplicații Web',en:'Web Applications',de:'Webanwendungen',no:'Webapplikasjoner'}), href:'/services/web-applications', icon: Code2 },
     { name: localize(locale,{ro:'Optimizare SEO',en:'SEO Optimization',de:'SEO-Optimierung',no:'SEO-optimalisering'}), href:'/services/seo', icon: Search },
  ];
  const getStarted = localize(locale, { ro: 'Începe un proiect', en: 'Get Started', de: 'Projekt starten', no: 'Start et prosjekt' });

  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white tracking-tight">Node<span className="text-brand">Stack</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={cn("text-sm font-medium transition-colors hover:text-brand",pathname==='/'?'text-brand':'text-slate-400')}>{localize(locale,{ro:'Acasă',en:'Home',de:'Startseite',no:'Hjem'})}</Link>
            <div className="relative group py-7">
              <button className={cn("flex items-center gap-1.5 text-sm font-medium transition-colors group-hover:text-brand", pathname.startsWith('/services/') ? 'text-brand' : 'text-slate-400')}>{servicesLabel}<ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180"/></button>
              <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute top-[68px] left-1/2 -translate-x-1/2 w-80 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-2 shadow-2xl transition-all duration-200">
                {serviceLinks.map(({name,href,icon:Icon})=><Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition",pathname===href?'bg-brand/10 text-brand':'text-slate-300 hover:bg-white/5 hover:text-white')}><span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5"><Icon className="h-4 w-4"/></span>{name}</Link>)}
              </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  pathname === link.href ? "text-brand" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSelector compact />
            <Link
              href="/contact"
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
            <Link href="/" onClick={()=>setIsOpen(false)} className={cn("block px-3 py-2 rounded-md text-base font-medium",pathname==='/'?'text-brand bg-brand/10':'text-slate-400 hover:text-brand hover:bg-white/5')}>{localize(locale,{ro:'Acasă',en:'Home',de:'Startseite',no:'Hjem'})}</Link>
            <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-widest text-slate-600">{servicesLabel}</p>
            {serviceLinks.map(({name,href,icon:Icon})=><Link key={href} href={href} onClick={()=>setIsOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium",pathname===href?'text-brand bg-brand/10':'text-slate-400 hover:text-brand hover:bg-white/5')}><Icon className="h-4 w-4"/>{name}</Link>)}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === link.href ? "text-brand bg-brand/10" : "text-slate-400 hover:text-brand hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-3 py-2"><LanguageSelector /></div>
            <Link
              href="/contact"
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
