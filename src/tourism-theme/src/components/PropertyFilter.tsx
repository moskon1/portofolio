import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Users, 
  Search, 
  Waves
} from 'lucide-react';
import { PropertyCategory, TemplateSettings } from '../types';

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

  const categories: { id: PropertyCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: isRO ? 'Toate Camerele (3)' : 'All 3 Room Types', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'spa_suite', label: isRO ? 'Suite Panoramice SPA' : 'Panoramic SPA Suites', icon: <Waves className="w-3.5 h-3.5" /> },
    { id: 'hotel', label: isRO ? 'Camere Deluxe Plajă' : 'Deluxe Beachfront Rooms', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'family_apartment', label: isRO ? 'Apartamente Familie' : 'Family Duplexes', icon: <Users className="w-3.5 h-3.5" /> },
  ];

  return (
    <div id="accommodations" className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE2D8] pb-4">
        <div>
          <span className="text-emerald-700 font-semibold text-xs tracking-[0.25em] uppercase block mb-1">
            {isRO ? 'Cazare Exclusivistă' : 'Exclusive Accommodation'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            {isRO ? 'Camere, Suite & Apartamente de Lux' : 'Luxury Hotel Suites & Family Duplexes'}
          </h2>
        </div>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md">
          {isRO 
            ? 'Selectează tipul de cameră dorit și trimite solicitarea direct pe WhatsApp pentru confirmare instantă.'
            : 'Explore our 3 room types and send instant booking inquiries directly to our host team.'}
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
            placeholder={isRO ? 'Caută după jacuzzi, vedere, balcon...' : 'Search by jacuzzi, view, balcony...'}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-[#EAE2D8] focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>
    </div>
  );
};

