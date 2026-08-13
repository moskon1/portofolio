import type { Metadata } from 'next';
import TourismDemo from '@/src/tourism-theme/src/App';

export const metadata: Metadata = {
  title: 'Demo Website Hotel și Vilă',
  description: 'Demo modern pentru hoteluri și vile cu camere, galerii, recenzii, atracții și rezervări directe WhatsApp.',
  alternates: { canonical: '/demos/hospitality' },
};

export default function Page() { return <TourismDemo />; }
