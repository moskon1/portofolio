import { Room, BookingAddOn, TemplateSettings } from '../types';

interface FormatWhatsAppParams {
  settings: TemplateSettings;
  room: Room | null;
  checkIn: string;
  checkOut: string;
  adults: number;
  kids: number;
  selectedAddOns: BookingAddOn[];
  totalEstimate: { eur: number; ron: number };
  nightsCount: number;
  guestName?: string;
  guestPhone?: string;
  specialRequests?: string;
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^0-9]/g, '');
}

export function formatWhatsAppMessage(params: FormatWhatsAppParams): string {
  const {
    settings,
    room,
    checkIn,
    checkOut,
    adults,
    kids,
    selectedAddOns,
    totalEstimate,
    nightsCount,
    guestName,
    guestPhone,
    specialRequests,
  } = params;

  const isRO = settings.language === 'ro';

  if (!room) {
    if (isRO) {
      return `BUNĂ ZIUA! AȘ DORI INFORMAȚII PENTRU O REZERVARE LA ${settings.propertyName.toUpperCase()}.
----------------------------------
📅 Perioada dorită: ${checkIn || 'Neselectat'} - ${checkOut || 'Neselectat'}
👥 Oaspeți: ${adults} Adulți, ${kids} Copii
💬 Vă rog să îmi trimiteți disponibilitatea și opțiunile de camere.
Mulțumesc!`;
    }
    return `HELLO! I WOULD LIKE TO INQUIRE ABOUT A BOOKING AT ${settings.propertyName.toUpperCase()}.
----------------------------------
📅 Dates: ${checkIn || 'Not specified'} to ${checkOut || 'Not specified'}
👥 Guests: ${adults} Adults, ${kids} Children
💬 Please send me availability and room options.
Thank you!`;
  }

  const priceFormatted = settings.currency === 'RON'
    ? `${totalEstimate.ron} RON`
    : settings.currency === 'NOK'
      ? `${Math.round(totalEstimate.eur * 12)} NOK`
      : settings.currency === 'USD'
        ? `$${totalEstimate.eur}`
        : `€${totalEstimate.eur}`;

  const addOnsText = selectedAddOns.length > 0
    ? selectedAddOns.map(a => `   • ${a.name}`).join('\n')
    : (isRO ? '   • Fără opțiuni suplimentare' : '   • None selected');

  if (isRO) {
    return `🏨 *SOLICITARE REZERVARE - ${settings.propertyName.toUpperCase()}*
----------------------------------
🛏️ *Cameră / Vilă:* ${room.title}
📍 *Locație:* ${room.propertyName} (${room.location})

📅 *Check-in:* ${checkIn || 'De confirmat'}
📅 *Check-out:* ${checkOut || 'De confirmat'}
🌙 *Număr nopți:* ${nightsCount > 0 ? nightsCount : 1}
👥 *Oaspeți:* ${adults} Adulți${kids > 0 ? `, ${kids} Copii` : ''}

✨ *Servicii suplimentare:*
${addOnsText}

💰 *Estimare Totală:* ~${priceFormatted}

👤 *Nume Oaspete:* ${guestName || 'Nespecificat'}
📞 *Telefon:* ${guestPhone || 'Nespecificat'}
📝 *Cerințe speciale / Mesaj:* ${specialRequests ? specialRequests : 'Niciuna'}

----------------------------------
*Vă rog să îmi confirmați disponibilitatea și modalitatea de plată.*
Vă mulțumesc!`;
  }

  return `🏨 *BOOKING INQUIRY - ${settings.propertyName.toUpperCase()}*
----------------------------------
🛏️ *Property / Suite:* ${room.title}
📍 *Location:* ${room.propertyName} (${room.location})

📅 *Check-in:* ${checkIn || 'To be confirmed'}
📅 *Check-out:* ${checkOut || 'To be confirmed'}
🌙 *Duration:* ${nightsCount > 0 ? nightsCount : 1} night(s)
👥 *Guests:* ${adults} Adults${kids > 0 ? `, ${kids} Children` : ''}

✨ *Selected Add-ons:*
${addOnsText}

💰 *Estimated Total:* ~${priceFormatted}

👤 *Guest Name:* ${guestName || 'Not specified'}
📞 *Phone:* ${guestPhone || 'Not specified'}
📝 *Special Requests:* ${specialRequests ? specialRequests : 'None'}

----------------------------------
*Please confirm availability and booking instructions.*
Thank you!`;
}

export function openWhatsAppBooking(params: FormatWhatsAppParams): void {
  const message = formatWhatsAppMessage(params);
  const rawPhone = cleanPhoneNumber(params.settings.whatsappNumber);
  const targetPhone = rawPhone.length > 0 ? rawPhone : '40722123456';
  const encodedText = encodeURIComponent(message);
  
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
}

export function openDirectWhatsAppChat(phone: string, text?: string): void {
  const rawPhone = cleanPhoneNumber(phone);
  const targetPhone = rawPhone.length > 0 ? rawPhone : '40722123456';
  const defaultText = text || 'Hello! I would like to make an inquiry regarding your hotel and villa packages.';
  const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(defaultText)}`;
  window.open(whatsappUrl, '_blank');
}
