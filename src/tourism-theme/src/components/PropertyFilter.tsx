import React from 'react';
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
  settings,
}) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  return (
    <div id="accommodations" className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE2D8] pb-4">
        <div>
          <span className="text-emerald-700 font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
            {t('Cazare exclusivistă', 'Exclusive Accommodation', 'Exklusive Unterkunft', 'Eksklusiv overnatting')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            {t('Camere', 'Rooms', 'Zimmer', 'Rom')}
          </h2>
        </div>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md">
          {t('Selectează tipul de cameră dorit și trimite solicitarea direct pe WhatsApp pentru confirmare rapidă.', 'Explore our room types and send booking inquiries directly to our host team.', 'Entdecken Sie unsere Zimmer und senden Sie Ihre Buchungsanfrage direkt an unser Gastgeberteam.', 'Utforsk romtypene våre og send bestillingsforespørselen direkte til vertskapet.')}
        </p>
      </div>

    </div>
  );
};
