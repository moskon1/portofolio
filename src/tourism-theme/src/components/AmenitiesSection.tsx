import React from 'react';
import { 
  Waves, 
  Sparkles, 
  Utensils, 
  Sun, 
  Coffee, 
  Car, 
  Wifi,
  ShieldCheck,
  Check,
  Baby,
  Tv,
  Clock,
  HeartHandshake,
  ConciergeBell,
  Wine,
  Umbrella
} from 'lucide-react';
import { TemplateSettings } from '../types';
import { localize, useLocale } from '@/src/lib/i18n';

interface AmenitiesSectionProps {
  settings: TemplateSettings;
  onOpenQuickBooking: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  settings,
  onOpenQuickBooking,
}) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });

  const popularFacilities = [
    { icon: <Waves className="w-4 h-4 text-emerald-600" />, text: t('Piscine exterioare & apă sărată', 'Outdoor & Saltwater Pools', 'Außen- & Salzwasserpools', 'Utendørs- og saltvannsbasseng') },
    { icon: <Sparkles className="w-4 h-4 text-emerald-600" />, text: t('SPA termal & saună', 'Thermal Spa & Saunas', 'Thermal-Spa & Saunen', 'Termisk spa og badstuer') },
    { icon: <Umbrella className="w-4 h-4 text-emerald-600" />, text: t('Plajă privată & șezlonguri', 'Private Beach & Sunbeds', 'Privatstrand & Liegen', 'Privat strand og solsenger') },
    { icon: <Utensils className="w-4 h-4 text-emerald-600" />, text: t('Restaurant panoramic', 'Gourmet Restaurant', 'Gourmetrestaurant', 'Gourmetrestaurant') },
    { icon: <Wifi className="w-4 h-4 text-emerald-600" />, text: t('Wi-Fi gratuit', 'Free High-Speed Wi-Fi', 'Kostenloses Highspeed-WLAN', 'Gratis høyhastighets-Wi-Fi') },
    { icon: <Car className="w-4 h-4 text-emerald-600" />, text: t('Parcare privată gratuită', 'Free Private Parking', 'Kostenlose Privatparkplätze', 'Gratis privat parkering') },
    { icon: <Wine className="w-4 h-4 text-emerald-600" />, text: t('Bar & lounge', 'Beachfront Cocktail Bar', 'Cocktailbar am Strand', 'Cocktailbar ved stranden') },
    { icon: <Baby className="w-4 h-4 text-emerald-600" />, text: t('Parc acvatic pentru copii', 'Kids Aquatic Park', 'Kinder-Wasserpark', 'Vannpark for barn') },
  ];

  const facilityCategories = [
    {
      title: isRO ? '🏊 Piscine & SPA Termal' : '🏊 Pools & Thermal Spa',
      items: [
        isRO ? 'Piscină interioară cu apă sărată din Lacul Techirghiol' : 'Indoor saltwater pool with Techirghiol minerals',
        isRO ? 'Piscină exterioară încălzită la 32°C tot anul' : 'Heated outdoor infinity pool (32°C year-round)',
        isRO ? 'Saună finlandeză cu plante & baie de aburi' : 'Finnish herbal sauna & eucalyptus steam room',
        isRO ? 'Împachetări terapeutice cu nămol sapropelic' : 'Therapeutic sapropelic mud therapy',
        isRO ? 'Șezlonguri din lemn de tec & baldachine private' : 'Teak sunbeds & private poolside cabanas',
      ]
    },
    {
      title: isRO ? '🍽️ Mâncare & Băuturi' : '🍽️ Food & Drink',
      items: [
        isRO ? 'Restaurant cu specific pescăresc & fructe de mare' : 'Panoramic seafood & Black Sea restaurant',
        isRO ? 'Mic dejun bufet suedez gourmet inclus' : 'Gourmet daily buffet breakfast',
        isRO ? 'Beach Bar & Gelaterie pe faleză' : 'Beachfront cocktail lounge & gelateria',
        isRO ? 'Room Service disponibil 24/7' : '24/7 Room Service & in-suite dining',
        isRO ? 'Espressor Nespresso în fiecare cameră' : 'Nespresso espresso machines in all suites',
      ]
    },
    {
      title: isRO ? '🏖️ Plajă & Exterior' : '🏖️ Beach & Outdoors',
      items: [
        isRO ? 'Plajă privată la doar 50m de hotel' : 'Private sandy beach just 50m from hotel',
        isRO ? 'Șezlonguri & umbrele rezervate gratuit' : 'Free reserved sunbeds & parasols',
        isRO ? 'Acces direct pe faleza pietonală Eforie Nord' : 'Direct access to Eforie Nord seafront promenade',
        isRO ? 'Terasă panoramică cu vedere la apus' : 'Panoramic sunset terrace & outdoor lounge',
      ]
    },
    {
      title: isRO ? '🛎️ Servicii & Recepție' : '🛎️ Services & Reception',
      items: [
        isRO ? 'Recepție & Asistență WhatsApp 24/7' : '24/7 Front desk & instant WhatsApp concierge',
        isRO ? 'Transfer aeroport cu șofer privat (Mercedes-Benz)' : 'Private Mercedes-Benz airport chauffeur transfer',
        isRO ? 'Serviciu zilnic de curățenie & menaj' : 'Daily housekeeping & turn-down service',
        isRO ? 'Depozit de bagaje & seif în cameră' : 'Luggage storage & in-room safety deposit box',
      ]
    },
    {
      title: isRO ? '🛏️ Confort & Facilități Cameră' : '🛏️ Room Amenities & Comfort',
      items: [
        isRO ? 'AER condiționat silențios & climatizare individuală' : 'Silent individual climate control (AC/Heating)',
        isRO ? 'Smart TV 4K cu canale internaționale' : 'Smart 4K TVs with international channels',
        isRO ? 'Baie din marmură cu duș walk-in sau jacuzzi' : 'Marble en-suite bathroom with walk-in shower / jacuzzi',
        isRO ? 'Balcon privat din sticlă cu vedere la mare' : 'Private glass balcony with frontal or partial sea view',
        isRO ? 'Cosmetice de lux organice & halate de baie' : 'Luxury organic bath products, robes & slippers',
      ]
    },
    {
      title: isRO ? '👶 Facilități pentru Familii' : '👶 Family Facilities',
      items: [
        isRO ? 'Pass gratuit la parcul acvatic pentru copii' : 'Free access pass to kids aquatic park',
        isRO ? 'Zonă de joacă interioară & exterioară amenajată' : 'Dedicated indoor & outdoor play areas',
        isRO ? 'Pătuțuri pentru copii & scaune înalte disponibile' : 'Baby cots & high chairs available upon request',
        isRO ? 'Meniu special pentru copii în restaurant' : 'Kids menu options at the restaurant',
      ]
    }
  ];
  const translatedCategoryTitles = locale === 'de'
    ? ['🏊 Pools & Thermal-Spa', '🍽️ Essen & Getränke', '🏖️ Strand & Außenbereich', '🛎️ Service & Rezeption', '🛏️ Zimmerkomfort', '👶 Familienangebote']
    : locale === 'no'
      ? ['🏊 Basseng og termisk spa', '🍽️ Mat og drikke', '🏖️ Strand og uteområder', '🛎️ Service og resepsjon', '🛏️ Romkomfort', '👶 Familiefasiliteter']
      : null;

  return (
    <section id="amenities" className="py-16 bg-[#FBF9F6] text-[#1A1A1A] border-t border-[#EAE2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-slate-500 font-semibold text-xs uppercase tracking-[0.3em] block">
            {isRO ? 'Servicii & Facilități Hotel' : 'Hotel Facilities & Services'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
            {isRO ? 'Totul Într-un Singur Loc' : 'Everything You Need For A Perfect Stay'}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {isRO 
              ? `Toate facilitățile incluse la ${settings.propertyName} sunt concepute pentru un sejur relaxant la malul mării.`
              : 'Detailed breakdown of all resort amenities, wellness services, and room features available to our guests.'}
          </p>
        </div>

        {/* Most Popular Facilities Highlight Bar */}
        <div className="bg-white rounded-2xl border border-[#EAE2D8] p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-sm text-[#1A1A1A] flex items-center gap-2 uppercase tracking-wider text-slate-700">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{isRO ? 'Cele mai apreciate facilități' : 'Most popular facilities'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {popularFacilities.map((fac, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2.5 p-2.5 bg-[#FBF9F6] rounded-xl border border-[#EAE2D8]/80 text-xs text-slate-800 font-medium"
              >
                <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-100 shrink-0">
                  {fac.icon}
                </div>
                <span className="leading-tight">{fac.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking.com Style Structured Facilities Table */}
        <div className="bg-white rounded-2xl border border-[#EAE2D8] p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilityCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3.5">
                <h4 className="font-serif font-bold text-base text-[#1A1A1A] border-b border-[#EAE2D8] pb-2">
                  {translatedCategoryTitles?.[idx] || cat.title}
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(locale === 'de' ? ['Premium-Ausstattung und persönlicher Service inklusive.'] : locale === 'no' ? ['Førsteklasses fasiliteter og personlig service er inkludert.'] : cat.items).map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick CTA Bottom Bar inside table */}
          <div className="mt-8 pt-6 border-t border-[#EAE2D8] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FBF9F6] p-4 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {isRO 
                  ? 'Toate facilitățile sunt verificate și disponibile pentru oaspeții hotelului.' 
                  : 'All listed amenities are verified and active for hotel guests.'}
              </span>
            </div>
            <button
              onClick={onOpenQuickBooking}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition shrink-0"
            >
              {isRO ? 'Întreabă pe WhatsApp despre Facilități' : 'Ask Concierge on WhatsApp'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
