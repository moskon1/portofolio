import React from 'react';
import { Phone, MessageSquare, BedDouble, Calendar } from 'lucide-react';
import { TemplateSettings } from '../types';

interface MobileStickyBarProps {
  settings: TemplateSettings;
  onOpenQuickBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  settings,
  onOpenQuickBooking,
}) => {
  const isRO = settings.language === 'ro';

  const scrollToRooms = () => {
    const el = document.getElementById('accommodations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#EAE2D8] p-2.5 px-4 shadow-lg">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${settings.displayPhone}`}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 bg-slate-50 text-slate-700 rounded-xl border border-[#EAE2D8] active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide uppercase">
            {isRO ? 'Sună acum' : 'Call Hotel'}
          </span>
        </a>

        {/* Explore Rooms Button */}
        <button
          onClick={scrollToRooms}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 bg-slate-50 text-slate-700 rounded-xl border border-[#EAE2D8] active:scale-95 transition"
        >
          <BedDouble className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide uppercase">
            {isRO ? 'Camere' : 'Rooms'}
          </span>
        </button>

        {/* WhatsApp Main Booking CTA */}
        <button
          onClick={onOpenQuickBooking}
          className="flex-[2] flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366] active:bg-[#20bd5a] text-white font-bold rounded-full shadow-md shadow-green-200/50 text-xs active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 fill-white shrink-0" />
          <span className="truncate">
            {isRO ? 'Rezervă pe WhatsApp' : 'WhatsApp Booking'}
          </span>
        </button>
      </div>
    </aside>
  );
};
