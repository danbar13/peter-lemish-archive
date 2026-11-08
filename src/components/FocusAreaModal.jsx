// src/components/FocusAreaModal.jsx
import React, { useEffect, useRef } from 'react';
import { X, Tv, HeartHandshake, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FocusAreaModal = ({ area, onClose }) => {
  const { t, isRTL } = useLanguage();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  if (!area) return null;

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Tv':
        return <Tv className="w-8 h-8 text-amber-500" aria-hidden="true" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-8 h-8 text-amber-500" aria-hidden="true" />;
      case 'Users':
        return <Users className="w-8 h-8 text-amber-500" aria-hidden="true" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-8 h-8 text-amber-500" aria-hidden="true" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="focus-area-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[88vh] overflow-y-auto focus:outline-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900 rounded-2xl shrink-0">
              {renderIcon(area.icon)}
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 tracking-wider uppercase block">
                {area.tagline}
              </span>
              <h2 id="focus-area-modal-title" className="text-2xl sm:text-3xl font-extrabold text-blue-950">
                {area.title}
              </h2>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.focusAreas.closeModal}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6 text-slate-700 text-base leading-relaxed">
          <p className="text-lg text-slate-800 font-normal leading-relaxed">
            {area.fullDescription || area.description || area.summary}
          </p>

          {/* Key Methodologies & Contributions */}
          {area.keyPoints && area.keyPoints.length > 0 && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-blue-950 mb-3">
                {isRTL ? 'עקרונות פעולה ותרומות מרכזיות:' : 'Key Principles & Contributions:'}
              </h3>
              <ul className="space-y-2.5">
                {area.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            {t.focusAreas.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
