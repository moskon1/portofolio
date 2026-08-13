'use client';

import { I18nProvider, type Locale } from '@/src/lib/i18n';
export default function PageLocale({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <I18nProvider initialLocale={locale}>{children}</I18nProvider>;
}
