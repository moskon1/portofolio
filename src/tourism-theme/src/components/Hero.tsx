import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2, 
  Building2, 
  MapPin,
  ChevronRight
} from 'lucide-react';
import { TemplateSettings, Room, PropertyCategory } from '../types';
import { localize, useLocale } from '@/src/lib/i18n';

interface HeroProps {
  settings: TemplateSettings;
  rooms: Room[];
  onOpenBookingWithParams: (params: { roomId?: string; checkIn: string; checkOut: string; adults: number; kids: number }) => void;
  onSelectCategory: (category: PropertyCategory) => void;
  heroTitle?: string;
  heroDescription?: string;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  rooms,
  onOpenBookingWithParams,
  onSelectCategory,
  heroTitle,
  heroDescription,
}) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  // Quick reservation bar state
  const today = new Date();
  const defaultIn = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
  const defaultOut = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(defaultIn);
  const [checkOut, setCheckOut] = useState(defaultOut);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  const featuredRoom = rooms[0];
  const activeHeroImage = featuredRoom?.heroImage || '';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBookingWithParams({
      roomId: selectedRoomId || featuredRoom?.id,
      checkIn,
      checkOut,
      adults,
      kids,
    });
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between bg-slate-950 text-white overflow-hidden pb-12">
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeHeroImage}
          alt={settings.propertyName}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-900/40" />
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-8 w-full flex-1 flex flex-col justify-center">
        
        {/* Subtitle Badge */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {heroTitle ? `${settings.propertyTypeLabel} · ${settings.cityRegion}` : t('Resort la Mare • Plajă & SPA Termal', 'Seaside Resort • Beachfront & Thermal Spa', 'Küstenresort • Strandlage & Thermal-Spa', 'Kystresort • Strand og termisk spa')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-[1.15]">{heroTitle || <>
            {t('Eleganță la Malul Mării & ', 'Beachfront Luxury & ', 'Luxus am Meer & ', 'Luksus ved stranden & ')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">{t('Refugiu de Lux', 'Thermal Wellness', 'Thermal-Wellness', 'termisk velvære')}</span>
          </>}</h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-light">{heroDescription || <>
            {t('Descoperă cazările moderne cu vedere panoramică la Marea Neagră, bucătărie gourmet, SPA termal cu apă sărată și rezervări directe instant pe WhatsApp.', 'Discover modern suites with 180° Black Sea views, fine dining, saltwater hydrotherapy spa, and instant WhatsApp reservations.', 'Entdecken Sie moderne Suiten mit Panoramablick, gehobener Küche, Thermal-Spa und direkter Reservierung über WhatsApp.', 'Oppdag moderne suiter med panoramautsikt, gourmetmat, termisk spa og direkte bestilling via WhatsApp.')}
          </>}</p>

          {/* Key Feature Highlights */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {t('Răspuns rapid pe WhatsApp (<5 min)', 'Fast WhatsApp Confirmation (<5 min)', 'Schnelle WhatsApp-Antwort (<5 Min.)', 'Raskt WhatsApp-svar (<5 min)')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {t('Rezervare directă fără comision', 'Direct Booking - Zero Fees', 'Direktbuchung ohne Provision', 'Direktebestilling uten provisjon')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {t('Plajă privată & șezlonguri', 'Private Beach & Sunbeds', 'Privatstrand & Liegen', 'Privat strand og solsenger')}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Availability Search Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-4">
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-amber-500/30 shadow-2xl shadow-slate-950/80">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
            
            {/* Room Type Selector */}
            <div className="md:col-span-3 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                {t('Alege tipul de cameră', 'Select Room Type', 'Zimmertyp wählen', 'Velg romtype')}
              </label>
              <select
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                className="w-full bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="">
                  {t('--- Toate tipurile de camere ---', '--- All Room Types ---', '--- Alle Zimmertypen ---', '--- Alle romtyper ---')}
                </option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In Date */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                {isRO ? 'Check-in' : 'Check-in'}
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
              />
            </div>

            {/* Check-Out Date */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                {isRO ? 'Check-out' : 'Check-out'}
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
              />
            </div>

            {/* Guests Select */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block flex items-center gap-1">
                <Users className="w-3 h-3 text-amber-400" />
                {t('Oaspeți', 'Guests', 'Gäste', 'Gjester')}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {isRO ? 'Adulți' : 'Adults'}
                    </option>
                  ))}
                </select>
                <select
                  value={kids}
                  onChange={(e) => setKids(Number(e.target.value))}
                  className="bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n} {isRO ? 'Copii' : 'Kids'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm p-3.5 rounded-xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 fill-white shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate">
                  {t('Verifică prețul pe WhatsApp', 'Check Price on WhatsApp', 'Preis über WhatsApp prüfen', 'Sjekk pris på WhatsApp')}
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-200" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
