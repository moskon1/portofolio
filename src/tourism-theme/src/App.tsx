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

export default function App() {
  const { locale } = useLocale();
  const settings = {
    ...CLIENT_SETTINGS,
    language: locale,
    currency: locale === 'ro' ? 'RON' as const : locale === 'no' ? 'NOK' as const : 'EUR' as const,
  };
  const rooms = useMemo(() => getLocalizedRooms(locale), [locale]);
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
        />

        {/* Photo Gallery */}
        <GallerySection settings={settings} />

        {/* Location & Attractions */}
        <LocationSection
          settings={settings}
          onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
        />

        {/* Guest Reviews */}
        <ReviewsSection
          settings={settings}
          onOpenQuickBooking={() => setBookingModal({ isOpen: true })}
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
