import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Star, 
  Users, 
  Maximize2, 
  BedDouble, 
  Eye, 
  CheckCircle2, 
  Compass, 
  Layers, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Wifi,
  Sparkles,
  Building2,
  Home
} from 'lucide-react';
import { Room, TemplateSettings } from '../types';

interface RoomDetailModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  settings: TemplateSettings;
  onOpenWhatsAppBooking: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  isOpen,
  onClose,
  settings,
  onOpenWhatsAppBooking,
}) => {
  if (!isOpen || !room) return null;

  const isRO = settings.language === 'ro';

  const [activeTab, setActiveTab] = useState<'overview' | 'floorplan' | 'virtualtour'>('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = room.images && room.images.length > 0 ? room.images : [room.heroImage];

  const currencySymbol = settings.currency === 'RON' ? 'RON' : settings.currency === 'USD' ? '$' : '€';
  const displayPrice = settings.currency === 'RON' ? `${room.priceRON} RON` : `${currencySymbol}${room.priceEUR}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 text-white rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              {room.propertyType === 'villa' ? <Home className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
            </span>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block">
                {room.propertyName} • {room.location}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {room.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Main Image Slider */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
              <img
                src={images[selectedImageIndex]}
                alt={room.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {images.length > 1 && (
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between">
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="p-2 rounded-full bg-slate-950/70 text-white hover:bg-amber-500 hover:text-slate-950 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)}
                    className="p-2 rounded-full bg-slate-950/70 text-white hover:bg-amber-500 hover:text-slate-950 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                      selectedImageIndex === idx ? 'border-amber-400 opacity-100 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">{isRO ? 'Capacitate' : 'Capacity'}</span>
                <span className="text-xs font-bold text-white">{room.capacityAdults} {isRO ? 'Adulți' : 'Adults'} + {room.capacityKids} {isRO ? 'Copii' : 'Kids'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">{isRO ? 'Suprafață' : 'Size'}</span>
                <span className="text-xs font-bold text-white">{room.sizeSqm} SQM</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">{isRO ? 'Tip Pat' : 'Bed Type'}</span>
                <span className="text-xs font-bold text-white">{room.bedType}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">{isRO ? 'Vedere' : 'View'}</span>
                <span className="text-xs font-bold text-white">{room.viewType}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'overview' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{isRO ? 'Descriere & Facilități' : 'Overview & Amenities'}</span>
            </button>

            <button
              onClick={() => setActiveTab('floorplan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'floorplan' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isRO ? 'Planul Camerei' : 'Floor Plan'}</span>
            </button>

            <button
              onClick={() => setActiveTab('virtualtour')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'virtualtour' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isRO ? 'Tur Virtual 360°' : 'Virtual Tour 360°'}</span>
            </button>
          </div>

          {/* Tab 1: Overview & Amenities */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {room.longDescription || room.description}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isRO ? 'Facilități Incluse în Tariful Camerei' : 'Included Amenities'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {room.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Floor Plan */}
          {activeTab === 'floorplan' && (
            <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <Layers className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">
                {isRO ? 'Schiță Architecturală' : 'Architectural Floor Plan'}
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {room.floorPlanDescription || `${room.sizeSqm} SQM layout featuring master bedroom, ensuite bathroom, living room lounge, and panoramic outdoor terrace.`}
              </p>
              <div className="p-4 bg-slate-900 rounded-xl border border-dashed border-slate-700 text-xs text-slate-400 max-w-sm mx-auto">
                📐 {isRO ? 'Dispunere ideală pentru intimitate și confort acustic' : 'Optimized acoustic layout & panoramic window orientation'}
              </div>
            </div>
          )}

          {/* Tab 3: Virtual Tour 360 */}
          {activeTab === 'virtualtour' && (
            <div className="space-y-3">
              <div className="relative aspect-[16/9] bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {isRO ? 'Experiență Interactivă 360° Panorama' : 'Interactive 360° Virtual Tour'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md">
                  {isRO ? 'Explorează fiecare unghi al camerei înainte de a rezerva' : 'Explore every corner of the suite virtually before booking'}
                </p>
                <button
                  onClick={() => onOpenWhatsAppBooking(room)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition"
                >
                  {isRO ? 'Întreabă de Disponibilitate pe WhatsApp' : 'Inquire Availability on WhatsApp'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              {isRO ? 'Tarif pe Noapte' : 'Price per Night'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif font-bold text-amber-400">
                {displayPrice}
              </span>
              <span className="text-xs text-slate-400">/ {isRO ? 'noapte' : 'night'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition"
            >
              {isRO ? 'Închide' : 'Close'}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenWhatsAppBooking(room);
              }}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 transition"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>{isRO ? 'Rezervă Această Cameră pe WhatsApp' : 'Book Suite on WhatsApp'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
