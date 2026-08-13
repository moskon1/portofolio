import type { Metadata } from 'next';
import '@/src/index.css';
import AppShell from './shell';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nodestack.pro'),
  title: { default: 'NodeStack — Agenție Web, SEO și Aplicații Digitale', template: '%s | NodeStack' },
  description: 'Website-uri moderne, SEO, aplicații web, AI, Web3 și soluții hospitality pentru afaceri din România și Europa.',
  robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: 'NodeStack', images: ['/logo.png'] },
  twitter: { card: 'summary_large_image', images: ['/logo.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
