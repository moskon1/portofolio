import React from 'react';
import { Phone, MessageSquare, BedDouble } from 'lucide-react';
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
    <aside className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#EAE2D8] px-2.5 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(15,23,42,0.12)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${settings.displayPhone}`}
          className="min-w-0 h-14 flex flex-col items-center justify-center px-1 bg-slate-50 text-slate-700 rounded-xl border border-[#EAE2D8] active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide uppercase">
            {isRO ? 'Sună acum' : 'Call Hotel'}
          </span>
        </a>

        {/* Explore Rooms Button */}
        <button
          onClick={scrollToRooms}
          className="min-w-0 h-14 flex flex-col items-center justify-center px-1 bg-slate-50 text-slate-700 rounded-xl border border-[#EAE2D8] active:scale-95 transition"
        >
          <BedDouble className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-wide uppercase">
            {isRO ? 'Camere' : 'Rooms'}
          </span>
        </button>

        {/* WhatsApp Main Booking CTA */}
        <button
          onClick={onOpenQuickBooking}
          className="min-w-0 h-14 flex flex-col items-center justify-center px-1 bg-[#25D366] active:bg-[#20bd5a] text-white font-bold rounded-xl shadow-md shadow-green-200/50 active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 fill-white mb-0.5" />
          <span className="w-full truncate text-center text-[10px] font-semibold tracking-wide uppercase">
            {isRO ? 'WhatsApp' : 'WhatsApp'}
          </span>
        </button>
      </div>
    </aside>
  );
};
