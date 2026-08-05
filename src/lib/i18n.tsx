import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ro' | 'en' | 'de' | 'no';

const supportedLocales: Locale[] = ['ro', 'en', 'de', 'no'];

function detectLocale(): Locale {
  const saved = localStorage.getItem('nodestack-locale')?.toLowerCase();
  if (saved && supportedLocales.includes(saved as Locale)) return saved as Locale;

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLocale of browserLocales) {
    const code = browserLocale.toLowerCase().split('-')[0];
    if (code === 'nb' || code === 'nn') return 'no';
    if (supportedLocales.includes(code as Locale)) return code as Locale;
  }
  return 'en';
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = (nextLocale: Locale) => {
    localStorage.setItem('nodestack-locale', nextLocale);
    setLocaleState(nextLocale);
  };

  useEffect(() => {
    document.documentElement.lang = locale === 'no' ? 'nb' : locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useLocale must be used inside I18nProvider');
  return context;
}

export const localeOptions: { value: Locale; short: string; label: string }[] = [
  { value: 'ro', short: 'RO', label: 'Română' },
  { value: 'en', short: 'EN', label: 'English' },
  { value: 'de', short: 'DE', label: 'Deutsch' },
  { value: 'no', short: 'NO', label: 'Norsk' },
];

export type LocalizedText = Record<Locale, string>;
export const localize = (locale: Locale, text: LocalizedText) => text[locale];
