import type { Metadata } from 'next';
import Portfolio from '@/src/views/Portfolio';

export const metadata: Metadata = {
  title: 'Portofoliu Web și Aplicații',
  description: 'Explorează website-uri, platforme Web3, produse digitale și experiențe hospitality construite de NodeStack.',
  alternates: { canonical: '/portfolio' },
};

export default function Page() {
  return <Portfolio />;
}
