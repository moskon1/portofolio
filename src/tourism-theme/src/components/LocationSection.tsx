import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, MessageSquare, Car } from 'lucide-react';
import { TemplateSettings } from '../types';
import { MOCK_ATTRACTIONS } from '../data/mockData';

interface LocationSectionProps {
  settings: TemplateSettings;
  onOpenQuickBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ settings, onOpenQuickBooking }) => {
  const isRO = settings.language === 'ro';

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 bg-[#FBF9F6] text-[#1A1A1A] border-t border-[#EAE2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE2D8] pb-6">
          <div>
            <span className="text-slate-500 font-semibold text-xs uppercase tracking-[0.3em] block mb-1">
              {isRO ? 'Locație Premium & Acces' : 'Prime Location & Accessibility'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              {isRO ? 'Unde Ne Găsești' : 'Where To Find Us'}
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md">
            {isRO
              ? `${settings.propertyName} se află în ${settings.cityRegion}, aproape de plajă și principalele atracții locale.`
              : `${settings.propertyName} is located in ${settings.cityRegion}, close to the beach and key local attractions.`}
          </p>
        </div>

        {/* Location Grid: Interactive Google Map + Nearby Attractions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Functional Google Maps Embed Box */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE2D8] p-5 space-y-4 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#EAE2D8] pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#1A1A1A] leading-tight">
                    {settings.propertyName}
                  </h3>
                  <p className="text-xs text-slate-500">{settings.address}</p>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 font-bold transition shrink-0"
              >
                <span>{isRO ? 'Deschide în Google Maps' : 'Open Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Live Google Map Iframe */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden border border-[#EAE2D8] bg-slate-100 shadow-inner">
              <iframe
                title={`${settings.propertyName} Google Map`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapEmbedUrl}
                className="w-full h-full rounded-xl"
              />
            </div>

            {/* Bottom Contact & Chauffeur Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FBF9F6] p-3.5 rounded-xl border border-[#EAE2D8]">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRO ? 'Parcare privată la proprietate & transfer aeroport' : 'Private on-site parking & airport transfer'}</span>
              </div>
              <button
                onClick={onOpenQuickBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-4 py-2 rounded-full transition shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-white" />
                <span>{isRO ? 'Solicită Indicații pe WhatsApp' : 'Get Directions on WhatsApp'}</span>
              </button>
            </div>
          </div>

          {/* Attractions Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2 border-b border-[#EAE2D8] pb-3">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>{isRO ? 'Atracții & Distanțe Cheie' : 'Nearby Points of Interest'}</span>
            </h3>

            <div className="space-y-3">
              {MOCK_ATTRACTIONS.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 bg-white rounded-xl border border-[#EAE2D8] hover:border-emerald-300 transition flex items-center gap-3.5 shadow-xs"
                >
                  <img
                    src={att.image}
                    alt={att.title}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#EAE2D8]"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1">
                      {att.distance}
                    </span>
                    <h4 className="text-xs font-bold text-[#1A1A1A] truncate">{att.title}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{att.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
