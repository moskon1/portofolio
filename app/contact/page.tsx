import type { Metadata } from 'next';
import Contact from '@/src/views/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Discută cu NodeStack despre următorul tău website, proiect SEO, platformă hospitality sau aplicație custom.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
  return <Contact />;
}
