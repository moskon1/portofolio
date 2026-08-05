export type PropertyCategory = 'all' | 'hotel' | 'villa' | 'spa_suite' | 'family_apartment';

export type Currency = 'EUR' | 'RON' | 'USD' | 'NOK';

export type Language = 'en' | 'ro' | 'de' | 'no';

export interface RoomAmenity {
  id: string;
  name: string;
  iconName: string;
}

export interface Room {
  id: string;
  title: string;
  propertyName: string;
  propertyType: 'hotel' | 'villa' | 'resort';
  category: PropertyCategory;
  tagline: string;
  location: string;
  priceEUR: number;
  priceRON: number;
  capacityAdults: number;
  capacityKids: number;
  sizeSqm: number;
  bedType: string;
  viewType: string;
  images: string[];
  heroImage: string;
  description: string;
  longDescription: string;
  amenities: string[];
  featured: boolean;
  isPopular?: boolean;
  rating: number;
  reviewsCount: number;
  floorPlanDescription?: string;
  virtualTour360Url?: string;
}

export interface BookingAddOn {
  id: string;
  name: string;
  description: string;
  priceEUR: number;
  priceRON: number;
  perGuest?: boolean;
  perNight?: boolean;
}

export interface BookingState {
  roomId: string | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  kids: number;
  selectedAddOns: string[];
  guestName: string;
  guestPhone: string;
  specialRequests: string;
}

export interface GuestReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  roomTitle: string;
  comment: string;
  avatar: string;
}

export interface TemplateSettings {
  propertyName: string;
  propertyTypeLabel: string;
  whatsappNumber: string; // formatted phone e.g. +40722123456
  contactEmail: string;
  displayPhone: string;
  address: string;
  cityRegion: string;
  currency: Currency;
  language: Language;
  primaryColorHex: string;
}

export interface LocalAttraction {
  id: string;
  title: string;
  category: string;
  distance: string;
  description: string;
  image: string;
}
