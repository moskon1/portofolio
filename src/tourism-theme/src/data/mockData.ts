import { Room, BookingAddOn, GuestReview, TemplateSettings, LocalAttraction } from '../types';

import heroResortImg from '../assets/images/hero_resort_ocean_1785928560085.jpg';

export const DEFAULT_SETTINGS: TemplateSettings = {
  propertyName: "Hotel Steaua de Mare",
  propertyTypeLabel: "Luxury Beachfront Hotel",
  whatsappNumber: "+40 722 123 456",
  displayPhone: "+40 722 123 456",
  contactEmail: "reservations@steauademare.ro",
  address: "Strada Tudor Vladimirescu 34, Eforie Nord, Constanța, România",
  cityRegion: "Eforie Nord, Constanța, Romania",
  currency: "RON",
  language: "ro",
  primaryColorHex: "#C5A059",
};

export const BOOKING_ADDONS: BookingAddOn[] = [
  {
    id: "breakfast",
    name: "Gourmet Buffet Breakfast",
    description: "Daily organic artisan breakfast served at the panoramic seafood restaurant or in-room.",
    priceEUR: 20,
    priceRON: 100,
    perGuest: true,
    perNight: true,
  },
  {
    id: "spa_pass",
    name: "VIP Thermal Spa & Saltwater Pass",
    description: "Unlimited daily access to Techirghiol mineral pools, herbal saunas & hydrotherapy baths.",
    priceEUR: 35,
    priceRON: 175,
    perGuest: true,
    perNight: true,
  },
  {
    id: "transfer",
    name: "Luxury Airport Chauffeur Transfer",
    description: "Private Mercedes-Benz pickup from Mihail Kogălniceanu (CND) or Otopeni (OTP) airport.",
    priceEUR: 75,
    priceRON: 375,
    perGuest: false,
    perNight: false,
  },
  {
    id: "romantic_pkg",
    name: "Romantic Ocean Sunset Package",
    description: "Chilled Moët & Chandon Champagne, fresh strawberries, flowers & bath setup upon arrival.",
    priceEUR: 85,
    priceRON: 425,
    perGuest: false,
    perNight: false,
  },
];

export const MOCK_ROOMS: Room[] = [
  {
    id: "steaua-panoramic-suite",
    title: "Panoramic Grand Ocean Suite",
    propertyName: "Hotel Steaua de Mare",
    propertyType: "hotel",
    category: "spa_suite",
    tagline: "Direct 180° Black Sea views with private glass balcony & marble whirlpool bath.",
    location: "Eforie Nord - Beachfront Boulevard",
    priceEUR: 185,
    priceRON: 925,
    capacityAdults: 2,
    capacityKids: 2,
    sizeSqm: 68,
    bedType: "King Size Ergonomic Mattress",
    viewType: "Frontal Ocean View",
    heroImage: heroResortImg,
    images: [
      heroResortImg,
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Experience absolute coastal luxury with floor-to-ceiling glass doors opening directly onto the private sea-breeze terrace.",
    longDescription: "Designed after the finest Black Sea luxury standards, the Panoramic Grand Ocean Suite at Hotel Steaua de Mare features a spacious living lounge, Italian marble bathroom with deep whirlpool bath, complimentary luxury Thermal Spa access, and automated climate controls.",
    amenities: [
      "Frontal Sea View Balcony",
      "VIP Thermal Spa Included",
      "King Size Bed",
      "Jacuzzi / Hydro Bath",
      "Free High-Speed Wi-Fi 6",
      "Nespresso Espresso Machine",
      "Smart TV 65\"",
      "Individual Climate Control",
      "Minibar & Wine Chiller",
      "24/7 Room Service",
      "Reserved Beach Loungers"
    ],
    featured: true,
    isPopular: true,
    rating: 4.95,
    reviewsCount: 142,
    floorPlanDescription: "68 SQM layout with separate living lounge, master bedroom, marble bath, and 14 SQM sea-view terrace.",
    virtualTour360Url: "https://my.matterport.com/show/?m=sample_hotel_360"
  },
  {
    id: "steaua-deluxe-beach-room",
    title: "Deluxe Beachfront Double Room",
    propertyName: "Hotel Steaua de Mare",
    propertyType: "hotel",
    category: "hotel",
    tagline: "Elegant modern room with private balcony overlooking the golden beach and sea.",
    location: "Eforie Nord - Beach Front",
    priceEUR: 110,
    priceRON: 550,
    capacityAdults: 2,
    capacityKids: 1,
    sizeSqm: 36,
    bedType: "Super King or Twin Beds",
    viewType: "Partial Sea & Coastal Gardens",
    heroImage: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Refined beachfront accommodation perfect for couples seeking relaxation with quick elevator access directly to the sand.",
    longDescription: "Featuring natural oak wood furniture, serene pastel tones, plush satin linen, rain shower system, and daily access to the resort's outdoor swimming pool complex.",
    amenities: [
      "Private Sea Breeze Balcony",
      "Super King Bed",
      "Rain Shower",
      "Free High-Speed Wi-Fi",
      "Outdoor Pool Access",
      "Flat Screen Smart TV",
      "Silent Air Conditioning",
      "Safety Deposit Box",
      "Daily Housekeeping"
    ],
    featured: true,
    isPopular: true,
    rating: 4.85,
    reviewsCount: 98,
  },
  {
    id: "steaua-family-beach-apartment",
    title: "Grand Family Sea-Front Duplex",
    propertyName: "Hotel Steaua de Mare",
    propertyType: "resort",
    category: "family_apartment",
    tagline: "Spacious 2-bedroom family residence with full kitchenette & kids fun park pass.",
    location: "Eforie Nord - Resort Promenade",
    priceEUR: 240,
    priceRON: 1200,
    capacityAdults: 4,
    capacityKids: 3,
    sizeSqm: 92,
    bedType: "1x King + 2x Twin Beds + Sofa Bed",
    viewType: "Panoramic Ocean & Beach Promenade",
    heroImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The ultimate family getaway offering two separate bedrooms, living dining space, and unlimited access to the resort's kids aquatic park.",
    longDescription: "Designed for effortless family vacations. Includes full kitchenette with induction hob, washer/dryer unit, two marble bathrooms, and dedicated beach loungers reserved daily.",
    amenities: [
      "2 Separate Bedrooms",
      "Full Kitchenette & Microwave",
      "2 Marble Bathrooms",
      "Kids Aquatic Park Pass",
      "Reserved Beach Chairs",
      "High Chairs & Baby Cot",
      "Washing Machine",
      "2x Smart TVs"
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 86,
  }
];

export const MOCK_REVIEWS: GuestReview[] = [
  {
    id: "rev-1",
    author: "Elena & Andrei M.",
    location: "București, România",
    rating: 5,
    date: "Iulie 2026",
    roomTitle: "Panoramic Grand Ocean Suite",
    comment: "Condiții absolut excepționale! Priveliștea la mare direct din pat este superbă, iar rezervarea prin WhatsApp a fost ultra rapidă. Ne-am bucurat de fiecare moment!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-2",
    author: "Marcus Vance",
    location: "München, Germania",
    rating: 5,
    date: "Iunie 2026",
    roomTitle: "Deluxe Beachfront Double Room",
    comment: "We stayed for a week at Steaua de Mare. The direct beach access and accommodation were magnificent. Fast and professional WhatsApp communication!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "rev-3",
    author: "Cristina & Radu D.",
    location: "Cluj-Napoca, România",
    rating: 5,
    date: "August 2026",
    roomTitle: "Grand Family Sea-Front Duplex",
    comment: "Ideal pentru familii cu copii! Plaja este la câțiva pași, iar personalul extrem de amabil. Ne întoarcem cu drag în fiecare vară!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  }
];

export const MOCK_ATTRACTIONS: LocalAttraction[] = [
  {
    id: "att-1",
    title: "Plaja & Faleza Eforie Nord",
    category: "Plajă & Mare",
    distance: "50m de hotel",
    description: "Nisip fin auriu, intrare lină în apă, faleză pietonală amenajată cu terase, gelaterii și lounge-uri de plajă.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "att-2",
    title: "Lacul Techirghiol & Baza de Nămol Mineral",
    category: "Sănătate & SPA",
    distance: "2.5 km de hotel",
    description: "Lac sărat renumit internațional pentru proprietățile terapeutice ale nămolului sapropelic și băilor minerale.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "att-3",
    title: "Eforie Aqua Park & Portul Agigea",
    category: "Agrement & Mâncare",
    distance: "800m de resort",
    description: "Parc acvatic cu tobogane pentru copii și adulți, plus cherhanale pescărești tradiționale cu pește proaspăt.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "att-4",
    title: "Portul Turistic Tomis & Cazinoul Constanța",
    category: "Cultură & Promenadă",
    distance: "14 km nord pe coastă",
    description: "Port de iahturi, restaurante exclusiviste de fructe de mare și promenada istorică din fața Cazinoului.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
  }
];
