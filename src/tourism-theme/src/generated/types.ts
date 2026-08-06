import type { Locale } from '@/src/lib/i18n';

export type DemoLocalizedText = Record<Locale, string>;
export type DemoSource = 'turistinfo' | 'description' | 'groq-rewritten' | 'groq-mock' | 'manual';

export interface GeneratedRoom {
  id: string;
  title: DemoLocalizedText;
  description: DemoLocalizedText;
  images: string[];
  priceRON: number;
  capacityAdults: number;
  capacityKids: number;
  sizeSqm: number;
  amenities: string[];
  source: DemoSource;
}

export interface GeneratedReview {
  author: string;
  location: string;
  date: string;
  rating: number;
  comment: string;
  source: 'turistinfo';
}

export interface GeneratedAttraction {
  title: DemoLocalizedText;
  description: DemoLocalizedText;
  distance: string;
  image: string;
  source: DemoSource;
}

export interface GeneratedHospitalityDemo {
  schemaVersion: 1;
  slug: string;
  sourceUrl: string;
  generatedAt: string;
  status: 'draft' | 'published';
  property: {
    name: string;
    type: string;
    address: string;
    cityRegion: string;
    phone: string;
    whatsapp: string;
    email: string;
    startingPriceRON: number;
    rating: number;
    reviewCount: number;
    heroTitle: DemoLocalizedText;
    shortDescription: DemoLocalizedText;
    fullDescription: DemoLocalizedText;
  };
  images: string[];
  facilities: string[];
  rooms: GeneratedRoom[];
  attractions: GeneratedAttraction[];
  reviews: GeneratedReview[];
  provenance: Record<string, DemoSource>;
}

export const demoText = (value: DemoLocalizedText, locale: Locale) => value[locale] || value.ro || value.en;
