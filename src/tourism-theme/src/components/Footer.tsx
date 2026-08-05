import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Instagram, 
  Facebook, 
  ArrowUp,
  Building2,
  Home
} from 'lucide-react';
import { TemplateSettings } from '../types';
import { localize, useLocale } from '@/src/lib/i18n';

interface FooterProps {
  settings: TemplateSettings;
  onOpenQuickBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenQuickBooking,
}) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#1A1A1A] border-t border-[#EAE2D8] pt-16 pb-24 lg:pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center">
              <span className="font-serif text-xl font-bold text-[#1A1A1A] block uppercase tracking-wide">
                {settings.propertyName}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {isRO
                ? `${settings.propertyTypeLabel} în ${settings.cityRegion}, cu rezervări directe și asistență personalizată pentru fiecare oaspete.`
                : `${settings.propertyTypeLabel} in ${settings.cityRegion}, with direct reservations and personal assistance for every guest.`}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenQuickBooking}
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-green-200/50 transition"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>{t('Rezervă pe WhatsApp', 'Book on WhatsApp', 'Über WhatsApp buchen', 'Bestill på WhatsApp')}</span>
              </button>

            </div>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
              {t('Contact & rezervări directe', 'Contact & Direct Reservations', 'Kontakt & Direktbuchung', 'Kontakt og direktebestilling')}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-700 shrink-0" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-700 shrink-0" />
                <a href={`tel:${settings.displayPhone}`} className="hover:text-black transition">
                  {settings.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-mono text-emerald-700">{settings.whatsappNumber} (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-700 shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-black transition">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantees & Features */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
              {t('Beneficiile rezervării directe', 'Direct Booking Advantages', 'Vorteile der Direktbuchung', 'Fordeler ved direktebestilling')}
            </h4>
            <div className="p-4 bg-[#F6F2EC] rounded-xl border border-[#EAE2D8] space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-semibold text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('Confirmare rapidă pe WhatsApp', 'Fast WhatsApp Confirmation', 'Schnelle WhatsApp-Bestätigung', 'Rask WhatsApp-bekreftelse')}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {isRO
                  ? 'Fără intermediari sau comisioane adăugate. Discută direct cu recepția hotelului sau proprietarul vilei.'
                  : 'Zero third-party commission fees. Direct line to hotel front desk and villa host.'}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#EAE2D8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {settings.propertyName}. {t('Toate drepturile rezervate.', 'All rights reserved.', 'Alle Rechte vorbehalten.', 'Alle rettigheter forbeholdt.')}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-600 hover:text-black transition"
          >
            <span>{t('Sus', 'Back to top', 'Nach oben', 'Til toppen')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
};
