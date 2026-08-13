'use client';

import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { localeOptions, useLocale } from '@/src/lib/i18n';

export default function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const router = useRouter();

  const changeLocale = (nextLocale: typeof locale) => {
    const url = new URL(window.location.href);
    const segments = url.pathname.split('/').filter(Boolean);
    if (['ro', 'en', 'de', 'no'].includes(segments[0])) segments[0] = nextLocale;
    else segments.unshift(nextLocale);
    url.pathname = `/${segments.join('/')}`;
    url.searchParams.delete('lang');
    setLocale(nextLocale);
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
  };

  return (
    <label className="relative flex items-center">
      <Languages className="absolute left-2.5 h-4 w-4 text-brand pointer-events-none" />
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as typeof locale)}
        aria-label="Select language"
        className={`appearance-none bg-white/5 border border-white/10 text-slate-200 rounded-lg outline-none focus:border-brand cursor-pointer ${compact ? 'pl-8 pr-7 py-2 text-xs' : 'pl-9 pr-8 py-2.5 text-sm'}`}
      >
        {localeOptions.map((option) => (
          <option key={option.value} value={option.value} className="bg-slate-900 text-white">
            {compact ? option.short : option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
