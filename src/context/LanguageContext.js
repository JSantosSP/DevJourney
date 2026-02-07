import React, { createContext, useContext, useState, useCallback } from 'react';
import en from '../locales/en';
import es from '../locales/es';

const translations = { en, es };
const STORAGE_KEY = 'devjourney_lang';

const getStoredLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
  } catch (_) {}
  return 'es'; // default castellano
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredLanguage);

  const setLanguage = useCallback((lang) => {
    if (lang !== 'en' && lang !== 'es') return;
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }, []);

  const t = useCallback((key, options = {}) => {
    const dict = translations[language] || es;
    const value = key.split('.').reduce((obj, k) => obj?.[k], dict);
    if (value == null) return key;
    let str = typeof value === 'string' ? value : String(value);
    if (options.year != null) str = str.replace(/\{\{year\}\}/g, String(options.year));
    return str;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
