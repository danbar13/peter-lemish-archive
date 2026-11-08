// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Languages,
  FileDown,
  Accessibility,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';

export const Navbar = () => {
  const { t, lang, toggleLang, isRTL } = useLanguage();
  const { setIsCvModalOpen, setIsAccessibilityModalOpen, isAccessibilityModalOpen } = useAccessibility();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Skip to Content Link (Top Accessibility requirement) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl focus:ring-4 focus:ring-blue-900 focus:outline-none transition-all"
      >
        {t.skipToContent}
      </a>

      {/* Sticky Header */}
      <header
        role="banner"
        className={`sticky top-0 z-40 transition-all duration-200 border-b ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-slate-200 py-2.5'
            : 'bg-white border-slate-200/60 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Site Identity / Brand */}
            <a
              href="#"
              className="flex items-center gap-3 group focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:outline-none rounded-xl p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-950 flex items-center justify-center text-amber-400 font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-amber-400" aria-hidden="true" />
              </div>
              <div className="text-start">
                <span className="block font-black text-slate-950 text-base sm:text-lg leading-tight tracking-tight">
                  {t.nav.brand}
                </span>
                <span className="block text-xs font-semibold text-slate-600 tracking-wide">
                  {t.nav.brandSubtitle}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              role="navigation"
              aria-label="תפריט ראשי"
              className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse"
            >
              {t.nav.links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions: CV, Accessibility, Language Switch */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* CV Button */}
              <button
                type="button"
                onClick={() => setIsCvModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-blue-950 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <FileDown className="w-4 h-4 text-blue-900" aria-hidden="true" />
                <span>{t.nav.downloadCv}</span>
              </button>

              {/* Accessibility Quick Toggle */}
              <button
                type="button"
                onClick={() => setIsAccessibilityModalOpen(!isAccessibilityModalOpen)}
                aria-label={t.nav.accessibilityBtn}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <Accessibility className="w-4 h-4 text-blue-900" aria-hidden="true" />
                <span>{t.nav.accessibilityBtn}</span>
              </button>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                aria-label={`החלף שפה ל-${t.nav.switchLang}`}
              >
                <Languages className="w-4 h-4" aria-hidden="true" />
                <span>{t.nav.switchLang}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleLang}
                className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                aria-label={t.nav.switchLang}
              >
                {lang === 'he' ? 'EN' : 'עב'}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={t.nav.menuToggle}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2"
          >
            {t.nav.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCvModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold text-blue-950 bg-blue-50 border border-blue-200"
              >
                <FileDown className="w-4 h-4 text-blue-900" aria-hidden="true" />
                <span>{t.nav.downloadCv}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAccessibilityModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 border border-slate-200"
              >
                <Accessibility className="w-4 h-4 text-blue-900" aria-hidden="true" />
                <span>{t.nav.accessibilityBtn}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
