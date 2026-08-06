import React, { useState, useMemo } from 'react';
import { Room, PropertyCategory } from './types';
import { getLocalizedRooms } from './data/localizedContent';
import { CLIENT_SETTINGS } from './data/clientConfig';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyFilter } from './components/PropertyFilter';
import { PropertyCard } from './components/PropertyCard';
import { RoomDetailModal } from './components/RoomDetailModal';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';
import { BadgePercent, Clock3, Headphones, ShieldCheck } from 'lucide-react';
import { useLocale } from '@/src/lib/i18n';
import type { GeneratedHospitalityDemo } from './generated/types';
import { demoText } from './generated/types';

export default function App({ generatedDemo }: { generatedDemo?: GeneratedHospitalityDemo }) {
  const { locale } = useLocale();
  const settings = generatedDemo ? {
    propertyName: demoText(generatedDemo.property.name,'ro'),
    propertyTypeLabel: demoText(generatedDemo.property.type,'ro'),
    whatsappNumber: generatedDemo.property.whatsapp || generatedDemo.property.phone,
    contactEmail: generatedDemo.property.email,
    displayPhone: generatedDemo.property.phone,
    address: generatedDemo.property.address,
    cityRegion: generatedDemo.property.cityRegion,
    currency: 'RON' as const,
    language: 'ro' as const,
    primaryColorHex: '#C5A059',
    latitude: generatedDemo.property.latitude,
    longitude: generatedDemo.property.longitude,
  } : {
    ...CLIENT_SETTINGS,
    language: locale,
    currency: locale === 'ro' ? 'RON' as const : locale === 'no' ? 'NOK' as const : 'EUR' as const,
  };
  const rooms = useMemo(() => generatedDemo ? generatedDemo.rooms.map((room,index) => ({
    id: room.id || `room-${index+1}`, title: demoText(room.title,'ro'), propertyName: generatedDemo.property.name,
    propertyType: 'villa' as const, category: 'villa' as const, tagline: demoText(room.description,'ro'),
    location: generatedDemo.property.cityRegion, priceEUR: Math.round(room.priceRON/5), priceRON: room.priceRON,
    capacityAdults: room.capacityAdults, capacityKids: room.capacityKids, sizeSqm: room.sizeSqm,
    bedType: 'Cazare confortabilÄƒ', viewType: 'Vedere panoramicÄƒ', images: room.images.length?room.images:generatedDemo.images,
    heroImage: generatedDemo.heroImage||room.images[0]||generatedDemo.images[0]||'', description: demoText(room.description,'ro'),
    longDescription: demoText(room.description,'ro'), amenities: room.amenities, featured: index===0,
    rating: generatedDemo.property.rating > 5 ? generatedDemo.property.rating/2 : generatedDemo.property.rating,
    reviewsCount: generatedDemo.property.reviewCount,
  })) : getLocalizedRooms(locale), [generatedDemo,locale]);
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [detailRoom, setDetailRoom] = useState<Room | null>(null);

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    roomId?: string | null;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    kids?: number;
  }>({
    isOpen: false,
  });

  // Filter properties logic
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Category Filter
      let matchesCategory = true;
      if (selectedCategory === 'hotel') {
        matchesCategory = room.propertyType === 'hotel';
      } else if (selectedCategory === 'villa') {
        matchesCategory = room.propertyType === 'villa';
      } else if (selectedCategory === 'spa_suite') {
        matchesCategory = room.category === 'spa_suite';
      } else if (selectedCategory === 'family_apartment') {
        matchesCategory = room.category === 'family_apartment';
      }

      // Search Query Filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          room.title.toLowerCase().includes(q) ||
          room.propertyName.toLowerCase().includes(q) ||
          room.description.toLowerCase().includes(q) ||
          room.location.toLowerCase().includes(q) ||
          room.amenities.some((a) => a.toLowerCase().includes(q));
      }

      return matchesCategory && matchesSearch;
    });
  }, [rooms, selectedCategory, searchQuery]);

  const handleOpenBookingWithParams = (params: {
    roomId?: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    kids: number;
  }) => {
    setBookingModal({
      isOpen: true,
      roomId: params.roomId,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      adults: params.adults,
      kids: params.kids,
    });
  };

  const handleOpenWhatsAppBookingForRoom = (room: Room) => {
    setBookingModal({
      isOpen: true,
      roomId: room.id,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        settings={settings}
        onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Hero Showcase */}
      <Hero
        settings={settings}
        rooms={rooms}
        onOpenBookingWithParams={handleOpenBookingWithParams}
        onSelectCategory={setSelectedCategory}
        heroTitle={generatedDemo ? demoText(generatedDemo.property.heroTitle,'ro') : undefined}
        heroDescription={generatedDemo ? demoText(generatedDemo.property.shortDescription,'ro') : undefined}
      />

      {/* Direct-booking trust signals */}
      <section className="relative z-20 -mt-px bg-white border-b border-[#EAE2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ShieldCheck, title: 'Rezervare directă', text: 'Datele ajung direct la proprietate' },
            { icon: BadgePercent, title: 'Fără comision', text: 'Cel mai bun tarif disponibil' },
            { icon: Clock3, title: 'Răspuns rapid', text: 'Confirmare directă pe WhatsApp' },
            { icon: Headphones, title: 'Asistență personală', text: 'Discuți cu echipa proprietății' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900">{title}</p>
                <p className="hidden sm:block text-[11px] text-slate-500 leading-snug">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accommodations Filter & Grid Section */}
      <main>
        <section className="bg-[#FBF9F6] pb-20">
          <PropertyFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            settings={settings}
            totalResultsCount={filteredRooms.length}
          />

          {/* Property Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRooms.map((room) => (
                  <PropertyCard
                    key={room.id}
                    room={room}
                    settings={settings}
                    onOpenDetails={(r) => setDetailRoom(r)}
                    onOpenWhatsAppBooking={handleOpenWhatsAppBookingForRoom}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-slate-900 rounded-2xl p-12 border border-slate-800 text-center space-y-3">
                <p className="text-amber-400 font-serif text-lg font-bold">
                  {settings.language === 'ro' ? 'Nicio cazare găsită pentru căutarea ta' : 'No accommodations match your search criteria'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
                >
                  {settings.language === 'ro' ? 'Resetează filtrele' : 'Reset All Filters'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Resort & Villa Amenities */}
        <AmenitiesSection
          settings={settings}
          onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
          facilities={generatedDemo?.facilities}
        />

        {/* Photo Gallery */}
        <GallerySection settings={settings} images={generatedDemo?.images} />

        {/* Location & Attractions */}
        <LocationSection
          settings={settings}
          onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
          attractions={generatedDemo?.attractions.map((item,index)=>({id:`attraction-${index}`,title:demoText(item.title,'ro'),category:'AtracÈ›ie localÄƒ',distance:item.distance,description:demoText(item.description,'ro'),image:item.image}))}
        />

        {/* Guest Reviews */}
        <ReviewsSection
          settings={settings}
          onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
          reviews={generatedDemo?.reviews.map((item,index)=>({id:`review-${index}`,author:item.author,location:item.location,rating:item.rating>5?Math.round(item.rating/2):Math.round(item.rating),date:item.date,roomTitle:'',comment:item.comment,avatar:`https://ui-avatars.com/api/?name=${encodeURIComponent(item.author)}&background=ecfdf5&color=047857`}))}
          rating={generatedDemo?.property.rating}
          reviewCount={generatedDemo?.property.reviewCount}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
      />

      {/* Sticky Bottom Action Bar for Mobile */}
      <MobileStickyBar
        settings={settings}
        onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
      />

      {/* Room Details Modal */}
      <RoomDetailModal
        room={detailRoom}
        isOpen={Boolean(detailRoom)}
        onClose={() => setDetailRoom(null)}
        settings={settings}
        onOpenWhatsAppBooking={handleOpenWhatsAppBookingForRoom}
      />

      {/* Interactive WhatsApp Booking Modal */}
      <WhatsAppBookingModal
        isOpen={bookingModal.isOpen}
        onClose={() => setBookingModal({ isOpen: false })}
        settings={settings}
        rooms={rooms}
        initialRoomId={bookingModal.roomId}
        initialCheckIn={bookingModal.checkIn}
        initialCheckOut={bookingModal.checkOut}
        initialAdults={bookingModal.adults}
        initialKids={bookingModal.kids}
      />

    </div>
  );
}
