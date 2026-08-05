import React, { useState } from 'react';
import { 
  Users, 
  Maximize2, 
  BedDouble, 
  Eye, 
  Star, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Check, 
  Building2, 
  Home,
  Waves
} from 'lucide-react';
import { Room, TemplateSettings } from '../types';
import { localize, useLocale } from '@/src/lib/i18n';

interface PropertyCardProps {
  room: Room;
  settings: TemplateSettings;
  onOpenDetails: (room: Room) => void;
  onOpenWhatsAppBooking: (room: Room) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  room,
  settings,
  onOpenDetails,
  onOpenWhatsAppBooking,
}) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = room.images && room.images.length > 0 ? room.images : [room.heroImage];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayPrice = settings.currency === 'RON'
    ? `${room.priceRON} RON`
    : settings.currency === 'NOK'
      ? `${Math.round(room.priceEUR * 12)} NOK`
      : settings.currency === 'USD'
        ? `$${room.priceEUR}`
        : `€${room.priceEUR}`;

  const isVilla = room.propertyType === 'villa';

  return (
    <div className="group bg-slate-900 rounded-2xl border border-slate-800 hover:border-amber-500/40 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Carousel Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={images[currentImgIndex]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 opacity-80" />

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-slate-950/70 text-white hover:bg-amber-500 hover:text-slate-950 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-slate-950/70 text-white hover:bg-amber-500 hover:text-slate-950 transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Index Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentImgIndex ? 'w-4 bg-amber-400' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Top Property Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <span className={`flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-md shadow-md ${
            isVilla ? 'bg-amber-500 text-slate-950 font-black' : 'bg-sky-600 text-white'
          }`}>
            {isVilla ? <Home className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
            <span>{room.propertyName}</span>
          </span>

          {room.isPopular && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-rose-600 text-white shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>{t('Recomandat', 'Popular', 'Beliebt', 'Populært')}</span>
            </span>
          )}
        </div>

        {/* Top Right Rating Badge */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{room.rating}</span>
          <span className="text-[10px] text-slate-400">({room.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Location & View */}
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="font-medium text-amber-400/90 truncate max-w-[60%]">
              {room.location}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Eye className="w-3 h-3 text-sky-400" />
              {room.viewType}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {room.title}
          </h3>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {room.tagline}
          </p>
        </div>

        {/* Specs Pill Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 truncate">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{room.capacityAdults} {t('Adulți', 'Adults', 'Erwachsene', 'Voksne')}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Maximize2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{room.sizeSqm} m²</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <BedDouble className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{room.bedType.split(' ')[0]}</span>
          </div>
        </div>

        {/* Key Included Amenities */}
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
          {room.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="bg-slate-800/80 border border-slate-700/60 rounded-md px-2 py-0.5 text-slate-300">
              ✓ {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-amber-400 font-medium">+{room.amenities.length - 3}</span>
          )}
        </div>

        {/* Footer Price & WhatsApp Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          {/* Price */}
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium block">
              {t('De la', 'Starting from', 'Ab', 'Fra')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-serif font-extrabold text-amber-400">
                {displayPrice}
              </span>
              <span className="text-[11px] text-slate-400">/ {t('noapte', 'night', 'Nacht', 'natt')}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(room)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition"
              title="View room photos & floorplan"
            >
              {t('Tur & detalii', 'Details', 'Details', 'Detaljer')}
            </button>

            <button
              onClick={() => onOpenWhatsAppBooking(room)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition hover:scale-[1.03] active:scale-[0.97]"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>{t('Rezervă', 'Book', 'Buchen', 'Bestill')}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
