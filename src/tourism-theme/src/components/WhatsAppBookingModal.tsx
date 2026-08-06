import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  Calendar, 
  Users, 
  Plus, 
  Minus, 
  Copy, 
  ExternalLink,
  Building,
  BedDouble,
  Info
} from 'lucide-react';
import { Room, TemplateSettings } from '../types';
import { openWhatsAppBooking, formatWhatsAppMessage } from '../utils/whatsapp';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TemplateSettings;
  rooms: Room[];
  initialRoomId?: string | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialAdults?: number;
  initialKids?: number;
}

export const WhatsAppBookingModal: React.FC<WhatsAppBookingModalProps> = ({
  isOpen,
  onClose,
  settings,
  rooms,
  initialRoomId,
  initialCheckIn,
  initialCheckOut,
  initialAdults = 2,
  initialKids = 0,
}) => {
  if (!isOpen) return null;

  const isRO = settings.language === 'ro';

  // Dates handling
  const today = new Date();
  const defaultIn = initialCheckIn || new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
  const defaultOut = initialCheckOut || new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    initialRoomId || rooms[0]?.id || ''
  );
  const [checkIn, setCheckIn] = useState(defaultIn);
  const [checkOut, setCheckOut] = useState(defaultOut);
  const [adults, setAdults] = useState(initialAdults);
  const [kids, setKids] = useState(initialKids);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialRoomId) {
      setSelectedRoomId(initialRoomId);
    }
  }, [initialRoomId]);

  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0] || null;

  // Calculate nights
  const calculateNights = (): number => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  // Calculate pricing
  const calculateTotal = () => {
    if (!selectedRoom) return { eur: 0, ron: 0 };

    return {
      eur: Math.round(selectedRoom.priceEUR * nights),
      ron: Math.round(selectedRoom.priceRON * nights),
    };
  };

  const total = calculateTotal();

  // Preview Message
  const messagePreview = formatWhatsAppMessage({
    settings,
    room: selectedRoom,
    checkIn,
    checkOut,
    adults,
    kids,
    selectedAddOns: [],
    totalEstimate: total,
    nightsCount: nights,
    guestName,
    guestPhone,
    specialRequests,
  });

  const handleLaunchWhatsApp = () => {
    openWhatsAppBooking({
      settings,
      room: selectedRoom,
      checkIn,
      checkOut,
      adults,
      kids,
      selectedAddOns: [],
      totalEstimate: total,
      nightsCount: nights,
      guestName,
      guestPhone,
      specialRequests,
    });
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messagePreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayTotal = settings.currency === 'RON'
    ? `${total.ron} RON`
    : settings.currency === 'NOK'
      ? `${Math.round(total.eur * 12)} NOK`
      : settings.currency === 'USD'
        ? `$${total.eur}`
        : `€${total.eur}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 text-white rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-5 h-5 fill-emerald-400/20" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                {isRO ? 'Rezervare Rapidă pe WhatsApp' : 'Direct WhatsApp Booking Inquiry'}
              </h3>
              <p className="text-xs text-slate-400">
                {isRO ? 'Configurează detaliile și trimite mesajul direct proprietarului' : 'Customize reservation details & send directly to property host'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Room Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              1. {isRO ? 'Alege Cazarea / Vilă' : 'Select Accommodation'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rooms.map((room) => {
                const isSelected = room.id === selectedRoomId;
                return (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <img
                      src={room.heroImage}
                      alt={room.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block truncate">
                        {room.propertyName}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{room.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {settings.currency === 'RON' ? `${room.priceRON} RON` : settings.currency === 'NOK' ? `${Math.round(room.priceEUR * 12)} NOK` : `€${room.priceEUR}`} / {isRO ? 'noapte' : 'night'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Dates & Guests Grid */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              2. {isRO ? 'Perioada & Număr Oaspeți' : 'Dates & Guest Count'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              
              {/* Check in */}
              <div>
                <label className="text-[11px] text-slate-400 font-medium block mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs font-medium rounded-lg p-2.5 border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Check out */}
              <div>
                <label className="text-[11px] text-slate-400 font-medium block mb-1">
                  Check-out ({nights} {isRO ? 'nopți' : 'nights'})
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-slate-800 text-white text-xs font-medium rounded-lg p-2.5 border border-slate-700 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Guests Controls */}
              <div>
                <label className="text-[11px] text-slate-400 font-medium block mb-1">
                  {isRO ? 'Adulți & Copii' : 'Adults & Children'}
                </label>
                <div className="flex items-center justify-between bg-slate-800 p-1.5 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{adults}A, {kids}C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-xs font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Step 3: Contact Info & Message */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
              3. {isRO ? 'Date Oaspete & Cerințe Speciale' : 'Guest Name & Special Requests'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={isRO ? 'Numele Dvs. complet' : 'Your full name'}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400"
              />
              <input
                type="tel"
                placeholder={isRO ? 'Număr de telefon' : 'Contact phone'}
                value={guestPhone}
                onChange={(e) => setGuestPhone(e.target.value)}
                className="bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400"
              />
            </div>
            <textarea
              placeholder={isRO ? 'Mențiuni speciale (ex. pătuț bebe, vedere la mare, oră sosire)...' : 'Special requests (e.g. baby cot, ocean view, late arrival)...'}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={2}
              className="w-full bg-slate-800 text-white text-xs font-medium rounded-xl p-3 border border-slate-700 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Live Message Preview Box */}
          <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                {isRO ? 'Afișare Text Mesaj WhatsApp' : 'Live WhatsApp Message Preview'}
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? (isRO ? 'Copiat!' : 'Copied!') : (isRO ? 'Copiază Text' : 'Copy Text')}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-emerald-400 whitespace-pre-wrap bg-slate-900/80 p-3 rounded-lg border border-slate-800/80 max-h-32 overflow-y-auto leading-relaxed">
              {messagePreview}
            </pre>
          </div>

        </div>

        {/* Modal Footer with Total & Send CTA */}
        <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
              {isRO ? 'Estimare Totală Sejur' : 'Estimated Total Stay'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif font-bold text-amber-400">
                {displayTotal}
              </span>
              <span className="text-xs text-slate-400">
                ({nights} {isRO ? 'nopți' : 'nights'})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition"
            >
              {isRO ? 'Renunță' : 'Cancel'}
            </button>

            <button
              type="button"
              onClick={handleLaunchWhatsApp}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xl shadow-emerald-600/30 transition hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{isRO ? 'Trimite pe WhatsApp' : 'Open WhatsApp & Send'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
