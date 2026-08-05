import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Users, 
  Search, 
  Waves
} from 'lucide-react';
import { PropertyCategory, TemplateSettings } from '../types';
import { localize, useLocale } from '@/src/lib/i18n';

interface PropertyFilterProps {
  selectedCategory: PropertyCategory;
  onSelectCategory: (category: PropertyCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  settings: TemplateSettings;
  totalResultsCount: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  settings,
  totalResultsCount,
}) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  const categories: { id: PropertyCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t('Toate camerele', 'All Rooms', 'Alle Zimmer', 'Alle rom'), icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'spa_suite', label: t('Suite SPA panoramice', 'Panoramic SPA Suites', 'Panorama-Spa-Suiten', 'Panorama spa-suiter'), icon: <Waves className="w-3.5 h-3.5" /> },
    { id: 'hotel', label: t('Camere deluxe la plajă', 'Deluxe Beachfront Rooms', 'Deluxe-Zimmer am Strand', 'Deluxe-rom ved stranden'), icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'family_apartment', label: t('Apartamente de familie', 'Family Duplexes', 'Familienapartments', 'Familieleiligheter'), icon: <Users className="w-3.5 h-3.5" /> },
  ];

  return (
    <div id="accommodations" className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE2D8] pb-4">
        <div>
          <span className="text-emerald-700 font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
            {t('Cazare exclusivistă', 'Exclusive Accommodation', 'Exklusive Unterkunft', 'Eksklusiv overnatting')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            {t('Camere, suite & apartamente de lux', 'Luxury Hotel Suites & Family Duplexes', 'Luxuszimmer, Suiten & Familienapartments', 'Luksusrom, suiter og familieleiligheter')}
          </h2>
        </div>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md">
          {t('Selectează tipul de cameră dorit și trimite solicitarea direct pe WhatsApp pentru confirmare rapidă.', 'Explore our room types and send booking inquiries directly to our host team.', 'Entdecken Sie unsere Zimmer und senden Sie Ihre Buchungsanfrage direkt an unser Gastgeberteam.', 'Utforsk romtypene våre og send bestillingsforespørselen direkte til vertskapet.')}
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#1A1A1A] text-white shadow-sm font-bold scale-102'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-[#EAE2D8]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('Caută după jacuzzi, vedere, balcon...', 'Search by jacuzzi, view, balcony...', 'Nach Whirlpool, Aussicht, Balkon suchen...', 'Søk etter jacuzzi, utsikt, balkong...')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-[#EAE2D8] focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>
    </div>
  );
};
