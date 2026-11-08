// src/components/TimelineModal.jsx
import React, { useEffect, useRef } from 'react';
import { X, Calendar, MapPin, Tag, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TimelineModal = ({ station, onClose }) => {
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

  if (!station) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="timeline-station-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[88vh] overflow-y-auto focus:outline-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-1">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span>{station.year}</span>
              {(station.location || station.mediaTag) && (
                <>
                  <span className="text-slate-400">•</span>
                  <MapPin className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span className="text-slate-600 font-normal">{station.location || station.mediaTag}</span>
                </>
              )}
            </div>
            <h2 id="timeline-station-title" className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              {station.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.timeline?.closeModal || 'סגור'}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="py-6 space-y-5 text-slate-700 text-base leading-relaxed">
          {(station.shortDesc || station.summary) && (
            <div className="p-4 bg-blue-50/70 border-s-4 border-blue-900 rounded-e-xl text-blue-950 font-medium">
              {station.shortDesc || station.summary}
            </div>
          )}

          <div className="prose prose-slate max-w-none">
            <p className="text-lg leading-relaxed text-slate-800">
              {station.fullStory || station.fullText}
            </p>
          </div>

          {/* Tags */}
          {station.tags && station.tags.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                {isRTL ? 'נושאים ומילות מפתח:' : 'Key Themes & Keywords:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {station.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    <Tag className="w-3 h-3 text-amber-600" aria-hidden="true" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
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
            {t.timeline.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
