'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { I18nProvider } from '@/src/lib/i18n';
import { localeFrom } from '@/src/lib/seo';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeLocale = localeFrom(pathname.split('/')[1]);
  const basePath = pathname.replace(/^\/(?:ro|en|de|no)(?=\/|$)/, '') || '/';
  const standalone = basePath.startsWith('/demos/') || basePath.startsWith('/demo/') || basePath.startsWith('/admin/');
  return (
    <I18nProvider initialLocale={routeLocale}>
      <div className="flex min-h-screen flex-col relative">
        {!standalone && <div className="scanline" />}
        {!standalone && <Navbar />}
        <main className="flex-grow">{children}</main>
        {!standalone && <Footer />}
      </div>
    </I18nProvider>
  );
}
