import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, Translations } from './translations';

export type Lang = 'nl' | 'en';

export interface LangPaths {
  home: string;
  services: string;
  barbers: string;
  gallery: string;
  about: string;
  privacy: string;
}

const PATHS: Record<Lang, LangPaths> = {
  nl: { home: '/', services: '/diensten', barbers: '/barbiers', gallery: '/galerij', about: '/over-ons', privacy: '/veiligheid-privacy' },
  en: { home: '/en', services: '/en/services', barbers: '/en/barbers', gallery: '/en/gallery', about: '/en/about', privacy: '/en/safety-privacy' },
};

// Maps any known path (either language) to its canonical Dutch path, used as
// the pivot to translate a URL from one language into the other.
const toCanonicalNl = (pathname: string): string => {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) {
    const rest = pathname.slice('/en'.length);
    const match = (Object.entries(PATHS.en) as [keyof LangPaths, string][]).find(([, p]) => p === '/en' + rest);
    if (match) return PATHS.nl[match[0]];
    return '/';
  }
  return pathname;
};

export const getSwitchedPath = (pathname: string, hash: string, targetLang: Lang): string => {
  const canonical = toCanonicalNl(pathname);
  const key = (Object.entries(PATHS.nl) as [keyof LangPaths, string][]).find(([, p]) => p === canonical)?.[0] || 'home';
  return PATHS[targetLang][key] + hash;
};

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  paths: LangPaths;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lang: Lang = location.pathname === '/en' || location.pathname.startsWith('/en/') ? 'en' : 'nl';

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], paths: PATHS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
