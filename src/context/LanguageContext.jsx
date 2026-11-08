// src/context/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteContent } from '../data/siteContent';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('lemish_lang');
      return saved === 'he' ? 'he' : 'en'; // English default
    } catch {
      return 'en';
    }
  });

  const isRTL = lang === 'he';
  const dir = isRTL ? 'rtl' : 'ltr';
  const t = siteContent[lang] || siteContent.en;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = t.siteTitle;
    try {
      localStorage.setItem('lemish_lang', lang);
    } catch {
      // storage unavailable
    }
  }, [lang, dir, t.siteTitle]);

  const toggleLang = () => {
    setLangState((prev) => (prev === 'he' ? 'en' : 'he'));
  };

  const setLang = (newLang) => {
    if (newLang === 'he' || newLang === 'en') {
      setLangState(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isRTL, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
