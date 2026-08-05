import React from 'react';
import { Star, Quote, MessageSquare, CheckCircle2 } from 'lucide-react';
import { TemplateSettings } from '../types';
import { getLocalizedReviews } from '../data/localizedContent';
import { localize, useLocale } from '@/src/lib/i18n';

interface ReviewsSectionProps {
  settings: TemplateSettings;
  onOpenQuickBooking: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ settings, onOpenQuickBooking }) => {
  const isRO = settings.language === 'ro';
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const reviews = getLocalizedReviews(locale);

  return (
    <section id="reviews" className="py-16 bg-[#FBF9F6] text-[#1A1A1A] border-t border-[#EAE2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#EAE2D8] pb-6">
          <div className="space-y-2">
            <span className="text-slate-500 font-semibold text-xs uppercase tracking-[0.3em] block">
              {t('Aprecieri de la oaspeți', 'Verified Guest Reviews', 'Verifizierte Gästebewertungen', 'Verifiserte gjesteanmeldelser')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
              {t('Ce spun oaspeții noștri', 'What Our Guests Say', 'Was unsere Gäste sagen', 'Hva gjestene våre sier')}
            </h2>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[#EAE2D8] shadow-xs">
            <div className="text-center">
              <span className="text-3xl font-serif font-bold text-[#1A1A1A] block leading-none">4.95</span>
              <span className="text-[10px] text-slate-500 font-medium">{t('din 5 stele', 'out of 5', 'von 5 Sternen', 'av 5 stjerner')}</span>
            </div>
            <div className="border-l border-[#EAE2D8] pl-3 space-y-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-700 font-medium block">
                {t('Peste 300 de recenzii verificate', '300+ Verified Guest Reviews', 'Über 300 verifizierte Bewertungen', 'Over 300 verifiserte anmeldelser')}
              </span>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#EAE2D8] p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-xl transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                <Quote className="w-6 h-6 text-slate-300" />

                <p className="text-xs text-slate-700 leading-relaxed font-serif italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE2D8] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#EAE2D8]"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <span className="text-[10px] text-slate-500 block">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
