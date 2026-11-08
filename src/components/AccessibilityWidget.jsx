// src/components/AccessibilityWidget.jsx
import React, { useRef, useEffect } from 'react';
import {
  Accessibility,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Contrast,
  Moon,
  Sun,
  Type,
  Link as LinkIcon,
  Ruler,
  FileText,
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

export const AccessibilityWidget = () => {
  const {
    fontScale,
    increaseFont,
    decreaseFont,
    resetFont,
    highContrast,
    setHighContrast,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    dyslexiaFont,
    setDyslexiaFont,
    highlightLinks,
    setHighlightLinks,
    readingRuler,
    setReadingRuler,
    resetAll,
    isAccessibilityModalOpen,
    setIsAccessibilityModalOpen,
    setIsStatementModalOpen,
  } = useAccessibility();

  const { t, isRTL } = useLanguage();
  const panelRef = useRef(null);
  const toggleBtnRef = useRef(null);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAccessibilityModalOpen) {
        setIsAccessibilityModalOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAccessibilityModalOpen, setIsAccessibilityModalOpen]);

  // Trap focus or auto focus close button when opened
  useEffect(() => {
    if (isAccessibilityModalOpen) {
      panelRef.current?.focus();
    }
  }, [isAccessibilityModalOpen]);

  return (
    <>
      {/* Floating launcher button (compact icon-only to never obstruct content) */}
      <button
        ref={toggleBtnRef}
        type="button"
        onClick={() => setIsAccessibilityModalOpen(!isAccessibilityModalOpen)}
        aria-label={t.accessibility.title}
        aria-expanded={isAccessibilityModalOpen}
        aria-controls="accessibility-drawer"
        title={t.accessibility.title}
        className="fixed bottom-5 start-5 z-40 w-12 h-12 flex items-center justify-center bg-blue-900 hover:bg-blue-800 text-white rounded-full shadow-2xl active:scale-95 transition-all duration-200 border-2 border-white/80 focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:outline-none"
      >
        <Accessibility className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Slide-out Accessibility Drawer */}
      {isAccessibilityModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="acc-widget-title"
          id="accessibility-drawer"
          ref={panelRef}
          tabIndex={-1}
          className="fixed bottom-20 start-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-blue-900" aria-hidden="true" />
              <h2 id="acc-widget-title" className="text-lg font-bold text-slate-900">
                {t.accessibility.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAccessibilityModalOpen(false);
                toggleBtnRef.current?.focus();
              }}
              aria-label={t.accessibility.close}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Controls list */}
          <div className="py-4 space-y-4 max-h-[65vh] overflow-y-auto">
            {/* Font scaling */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-slate-800">{t.accessibility.fontSize}</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  {fontScale}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={increaseFont}
                  aria-label={t.accessibility.increaseFont}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-300 text-slate-800 active:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                >
                  <ZoomIn className="w-4 h-4 text-blue-900" aria-hidden="true" />
                  <span>A+</span>
                </button>
                <button
                  type="button"
                  onClick={resetFont}
                  aria-label={t.accessibility.resetFont}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 text-slate-800 active:bg-slate-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                  <span>100%</span>
                </button>
                <button
                  type="button"
                  onClick={decreaseFont}
                  aria-label={t.accessibility.decreaseFont}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-blue-50 hover:border-blue-300 text-slate-800 active:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                >
                  <ZoomOut className="w-4 h-4 text-blue-900" aria-hidden="true" />
                  <span>A-</span>
                </button>
              </div>
            </div>

            {/* Luxurious Dark Theme */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                darkMode
                  ? 'bg-slate-900 text-amber-300 border-amber-500/80 shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              aria-pressed={darkMode}
            >
              <div className="flex items-center gap-2.5">
                {darkMode ? (
                  <Moon className="w-4 h-4 text-amber-400" aria-hidden="true" />
                ) : (
                  <Sun className="w-4 h-4 text-blue-900" aria-hidden="true" />
                )}
                <span>{isRTL ? 'מצב חשוך יוקרתי' : 'Luxurious Dark Mode'}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  darkMode ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'
                }`}
              >
                {darkMode && <span className="block w-2.5 h-2.5 bg-slate-950 rounded-full" />}
              </span>
            </button>

            {/* High Contrast */}
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                highContrast
                  ? 'bg-black text-yellow-300 border-yellow-400'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              aria-pressed={highContrast}
            >
              <div className="flex items-center gap-2.5">
                <Contrast className="w-4 h-4" aria-hidden="true" />
                <span>{t.accessibility.highContrast}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  highContrast ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-slate-400'
                }`}
              >
                {highContrast && <span className="block w-2.5 h-2.5 bg-black rounded-full" />}
              </span>
            </button>

            {/* Dyslexia-Friendly Font */}
            <button
              type="button"
              onClick={() => setDyslexiaFont(!dyslexiaFont)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                dyslexiaFont
                  ? 'bg-blue-50 text-blue-950 border-blue-400'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              aria-pressed={dyslexiaFont}
            >
              <div className="flex items-center gap-2.5">
                <Type className="w-4 h-4 text-blue-900" aria-hidden="true" />
                <span>{t.accessibility.dyslexiaFont}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  dyslexiaFont ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-400'
                }`}
              >
                {dyslexiaFont && <span className="block w-2.5 h-2.5 bg-white rounded-full" />}
              </span>
            </button>

            {/* Highlight Links */}
            <button
              type="button"
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                highlightLinks
                  ? 'bg-amber-50 text-amber-950 border-amber-400'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              aria-pressed={highlightLinks}
            >
              <div className="flex items-center gap-2.5">
                <LinkIcon className="w-4 h-4 text-amber-600" aria-hidden="true" />
                <span>{t.accessibility.highlightLinks}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  highlightLinks ? 'bg-amber-600 border-amber-600 text-white' : 'border-slate-400'
                }`}
              >
                {highlightLinks && <span className="block w-2.5 h-2.5 bg-white rounded-full" />}
              </span>
            </button>

            {/* Reading Ruler */}
            <button
              type="button"
              onClick={() => setReadingRuler(!readingRuler)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                readingRuler
                  ? 'bg-indigo-50 text-indigo-950 border-indigo-400'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
              aria-pressed={readingRuler}
            >
              <div className="flex items-center gap-2.5">
                <Ruler className="w-4 h-4 text-indigo-700" aria-hidden="true" />
                <span>{t.accessibility.readingRuler}</span>
              </div>
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  readingRuler ? 'bg-indigo-700 border-indigo-700 text-white' : 'border-slate-400'
                }`}
              >
                {readingRuler && <span className="block w-2.5 h-2.5 bg-white rounded-full" />}
              </span>
            </button>

            {/* Open Formal Statement Button */}
            <button
              type="button"
              onClick={() => {
                setIsAccessibilityModalOpen(false);
                setIsStatementModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.accessibility.statementTitle}</span>
            </button>
          </div>

          {/* Footer Reset */}
          <div className="pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={resetAll}
              className="w-full py-2 px-3 text-center text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:outline-none"
            >
              {t.accessibility.resetAll}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
