'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { I18nProvider } from '@/src/lib/i18n';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = pathname.startsWith('/demos/') || pathname.startsWith('/demo/') || pathname.startsWith('/admin/');
  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col relative">
        {!standalone && <div className="scanline" />}
        {!standalone && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!standalone && <Footer />}
      </div>
    </I18nProvider>
  );
}
