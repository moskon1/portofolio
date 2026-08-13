import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { TemplateSettings } from '../types';

import heroResortAsset from '../assets/images/hero_resort_ocean_1785928560085.jpg';
import { localize, useLocale } from '@/src/lib/i18n';

const heroResortImg = typeof heroResortAsset === 'string' ? heroResortAsset : heroResortAsset.src;

interface GallerySectionProps {
  settings: TemplateSettings;
  images?: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ settings, images }) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  const defaultGalleryItems = [
    {
      id: '1',
      title: t('Vedere panoramică la mare', 'Panoramic Sea View', 'Panorama-Meerblick', 'Panoramautsikt over havet'),
      image: heroResortImg,
    },
    {
      id: '2',
      title: t('Piscină exterioară încălzită', 'Heated Outdoor Pool', 'Beheizter Außenpool', 'Oppvarmet utendørsbasseng'),
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: '3',
      title: t('Dormitorul suitei panoramice', 'Panoramic Suite Bedroom', 'Schlafzimmer der Panorama-Suite', 'Soverom i panoramasuiten'),
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: '4',
      title: t('SPA termal cu apă sărată', 'Saltwater Thermal Spa', 'Thermal-Spa mit Salzwasser', 'Termisk saltvannsspa'),
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: '5',
      title: t('Restaurant gourmet', 'Gourmet Restaurant', 'Gourmetrestaurant', 'Gourmetrestaurant'),
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: '6',
      title: t('Baie din marmură cu jacuzzi', 'Marble Bathroom with Jacuzzi', 'Marmorbad mit Whirlpool', 'Marmorbad med boblebad'),
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: '7',
      title: t('Plajă privată cu șezlonguri', 'Private Beach & Sunbeds', 'Privatstrand mit Liegen', 'Privat strand med solsenger'),
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: '8',
      title: t('Cameră deluxe cu balcon', 'Deluxe Room with Balcony', 'Deluxe-Zimmer mit Balkon', 'Deluxe-rom med balkong'),
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    }
  ];
  const galleryItems = images?.length ? images.map((image,index)=>({id:String(index+1),title:`${settings.propertyName} · fotografia ${index+1}`,image})) : defaultGalleryItems;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const activeItem = galleryItems[currentIndex];

  return (
    <section id="gallery" className="py-16 bg-[#FBF9F6] text-[#1A1A1A] border-t border-[#EAE2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <span className="text-slate-500 font-semibold text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('Galerie foto', 'Photo Gallery', 'Fotogalerie', 'Bildegalleri')}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            {t('Atmosferă & design de excepție', 'A Captivating Resort Experience', 'Ein faszinierendes Resort-Erlebnis', 'En fengslende resortopplevelse')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
            {t('Explorează imaginile resortului. Glisează sau apasă pentru ecran complet.', 'Browse resort photos. Swipe or tap for full-screen mode.', 'Entdecken Sie die Resortfotos. Wischen oder tippen Sie für die Vollbildansicht.', 'Utforsk resortbildene. Sveip eller trykk for fullskjerm.')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-5xl mx-auto space-y-4">
          
          {/* Main Display Slide */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 border border-[#EAE2D8] shadow-lg group">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full h-full object-cover transition-all duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom Caption Bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                  {isRO ? `Fotografie ${currentIndex + 1} din ${galleryItems.length}` : `Photo ${currentIndex + 1} of ${galleryItems.length}`}
                </span>
                <h3 className="font-serif font-bold text-sm sm:text-lg text-white">
                  {activeItem.title}
                </h3>
              </div>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isRO ? 'Ecran Complet' : 'Full Screen'}</span>
              </button>
            </div>

            {/* Previous Arrow Button */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-white text-white hover:text-slate-900 border border-white/20 flex items-center justify-center transition backdrop-blur-md shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-white text-white hover:text-slate-900 border border-white/20 flex items-center justify-center transition backdrop-blur-md shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Strip Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {galleryItems.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden shrink-0 transition-all ${
                    isActive 
                      ? 'ring-2 ring-emerald-600 scale-105 opacity-100 shadow-md' 
                      : 'opacity-60 hover:opacity-100 border border-[#EAE2D8]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-800/80 text-white hover:bg-white hover:text-slate-900 transition"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-white hover:text-slate-900 transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-white hover:text-slate-900 transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] space-y-3 text-center">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[75vh] w-auto mx-auto rounded-xl object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <h4 className="font-serif text-base font-bold text-white">
              {activeItem.title} ({currentIndex + 1} / {galleryItems.length})
            </h4>
          </div>
        </div>
      )}
    </section>
  );
};
