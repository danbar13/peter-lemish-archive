// src/components/ScrollToTop.jsx
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ScrollToTop = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t.footer.backToTop}
      className="fixed bottom-6 end-6 z-40 p-3.5 bg-white text-slate-800 rounded-full shadow-2xl border border-slate-300 hover:bg-slate-100 hover:text-blue-900 transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:outline-none"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
