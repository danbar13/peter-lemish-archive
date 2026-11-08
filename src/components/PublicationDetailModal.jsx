// src/components/PublicationDetailModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { X, BookOpen, Calendar, Tag, Copy, Check, Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PublicationDetailModal = ({ item, onClose }) => {
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);
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

  if (!item) return null;

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(item.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pub-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[88vh] overflow-y-auto focus:outline-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1.5">
              <span>{item.categoryLabel}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {item.year}
              </span>
              <span>•</span>
              <span>{item.pages}</span>
            </div>
            <h2 id="pub-modal-title" className="text-2xl sm:text-3xl font-extrabold text-blue-950">
              {item.title}
            </h2>
            {item.englishTitle && item.englishTitle !== item.title && (
              <p className="text-sm font-medium text-slate-500 italic mt-1 font-serif">
                {item.englishTitle}
              </p>
            )}
            <p className="text-sm font-semibold text-slate-700 mt-2">
              {item.publisher}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="סגור תקציר פרסום"
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6 text-slate-700 text-base leading-relaxed">
          {/* Full Abstract */}
          <div>
            <h3 className="text-base font-bold text-blue-950 mb-2">
              {isRTL ? 'תקציר וממצאים מחקריים:' : 'Abstract & Research Findings:'}
            </h3>
            <p className="text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {item.fullAbstract}
            </p>
          </div>

          {/* Academic Citation Box */}
          <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                {isRTL ? 'ציטוט אקדמי תקני (APA):' : 'Academic Citation (APA):'}
              </span>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-bold border border-blue-300 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    <span>{isRTL ? 'הועתק!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
                    <span>{isRTL ? 'העתק ציטוט' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-800 dir-ltr text-left select-all">
              {item.citation}
            </p>
          </div>

          {/* Tags */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              {isRTL ? 'תגיות מחקר:' : 'Research Tags:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
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
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                alert(
                  isRTL
                    ? 'הורדת המסמך או פתיחת הקישור המלא דרך הארכיון. לקבלת עותק מחקרי מלא, ניתן לפנות בטופס יצירת הקשר.'
                    : 'Document preview / download initiated. For complete institutional reprint, contact the archive.'
                );
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-md transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{t.publications.downloadPdf}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (item.notebookLmUrl && item.notebookLmUrl !== '#') {
                  window.open(item.notebookLmUrl, '_blank', 'noopener,noreferrer');
                } else {
                  alert(
                    isRTL
                      ? 'מקור זה יקושר ישירות לפנקס NotebookLM עם השלמת איסוף החומרים.'
                      : 'This source will be linked directly to the NotebookLM notebook upon integration.'
                  );
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-xl text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <ExternalLink className="w-4 h-4 text-amber-700" aria-hidden="true" />
              <span>{isRTL ? 'מקור / NotebookLM' : 'Source / NotebookLM'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            {isRTL ? 'סגירה' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
