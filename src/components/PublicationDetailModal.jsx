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

  const notebookUrl =
    item.notebookLmUrl && item.notebookLmUrl !== '#'
      ? item.notebookLmUrl
      : 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pub-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 max-h-[88vh] overflow-y-auto focus:outline-none transition-colors">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1.5">
              <span>{item.categoryLabel}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {item.year}
              </span>
              <span>•</span>
              <span>{item.pages}</span>
            </div>
            <h2 id="pub-modal-title" className="text-2xl sm:text-3xl font-extrabold text-blue-950 dark:text-amber-200">
              {item.title}
            </h2>
            {item.englishTitle && item.englishTitle !== item.title && (
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 italic mt-1 font-serif">
                {item.englishTitle}
              </p>
            )}
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">
              {item.publisher}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={isRTL ? "סגור תקציר פרסום" : "Close publication modal"}
            className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
          {/* Full Abstract */}
          <div>
            <h3 className="text-base font-bold text-blue-950 dark:text-amber-100 mb-2">
              {isRTL ? 'תקציר וממצאים מחקריים:' : 'Abstract & Research Findings:'}
            </h3>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              {item.fullAbstract}
            </p>
          </div>

          {/* Academic Citation Box */}
          <div className="bg-blue-50/80 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-200 dark:border-blue-900/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wide">
                {isRTL ? 'ציטוט אקדמי תקני (APA):' : 'Academic Citation (APA):'}
              </span>
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-900 dark:text-blue-200 rounded-lg text-xs font-bold border border-blue-300 dark:border-blue-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <span>{isRTL ? 'הועתק!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-blue-900 dark:text-blue-300" aria-hidden="true" />
                    <span>{isRTL ? 'העתק ציטוט' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-300 dir-ltr text-left select-all">
              {item.citation}
            </p>
          </div>

          {/* Tags */}
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              {isRTL ? 'תגיות מחקר:' : 'Research Tags:'}
            </span>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  <Tag className="w-3 h-3 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Active PDF Download */}
            <a
              href={item.pdfUrl}
              download={item.pdfFileName || 'Dr_Peter_Lemish_Publication.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-950 font-bold rounded-xl text-sm shadow-md transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{t.publications.downloadPdf}</span>
            </a>

            {/* External Journal / DOI Source */}
            {item.externalUrl && (
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <ExternalLink className="w-4 h-4 text-blue-700 dark:text-amber-400" aria-hidden="true" />
                <span>{isRTL ? 'מקור / כתב עת' : 'Journal / Source'}</span>
              </a>
            )}

            {/* NotebookLM Research Notebook Link */}
            <a
              href={notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <ExternalLink className="w-4 h-4 text-amber-700 dark:text-amber-400" aria-hidden="true" />
              <span>NotebookLM</span>
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            {isRTL ? 'סגירה' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
