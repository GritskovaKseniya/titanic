import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Language, TranslationsShape, translations } from './translations';

interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: TranslationsShape;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'titanic-site-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'ru';
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'ru' ? stored : 'ru';
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage: () => setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru')),
      t: translations[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
