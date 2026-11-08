// src/components/CVModal.jsx
import React, { useEffect, useRef } from 'react';
import { X, Download, GraduationCap, Award, BookOpen, Printer } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

export const CVModal = () => {
  const { isCvModalOpen, setIsCvModalOpen } = useAccessibility();
  const { t, isRTL } = useLanguage();
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCvModalOpen) {
        setIsCvModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCvModalOpen, setIsCvModalOpen]);

  useEffect(() => {
    if (isCvModalOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isCvModalOpen]);

  if (!isCvModalOpen) return null;

  const data = t.cvModal;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsCvModalOpen(false);
      }}
    >
      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[88vh] overflow-y-auto focus:outline-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <img
              src="/images/peter-lemish-portrait.jpg"
              alt="Dr. Peter Lemish"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-center border-2 border-amber-500 shadow-md shrink-0"
            />
            <div>
              <span className="text-xs font-bold text-amber-700 tracking-wider uppercase mb-1 block">
                Curriculum Vitae
              </span>
              <h2 id="cv-modal-title" className="text-2xl sm:text-3xl font-bold text-slate-900">
                {data.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{data.subtitle}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setIsCvModalOpen(false)}
            aria-label={data.closeBtn}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* CV Sections */}
        <div className="py-6 space-y-6">
          {data.sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-bold text-blue-950 mb-3 flex items-center gap-2">
                {idx === 0 && <GraduationCap className="w-5 h-5 text-amber-600" aria-hidden="true" />}
                {idx === 1 && <Award className="w-5 h-5 text-amber-600" aria-hidden="true" />}
                {idx === 2 && <BookOpen className="w-5 h-5 text-amber-600" aria-hidden="true" />}
                <span>{sec.heading}</span>
              </h3>
              <ul className="space-y-2.5 ps-2">
                {sec.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-800 mt-2 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <Printer className="w-4 h-4 text-slate-600" aria-hidden="true" />
              <span>{isRTL ? 'הדפסה' : 'Print'}</span>
            </button>
            <a
              href="#contact"
              onClick={() => setIsCvModalOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            >
              <span>{isRTL ? 'פנייה לארכיון' : 'Request Full CV'}</span>
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              alert(
                isRTL
                  ? 'הורדת קובץ קורות החיים (PDF) החלה. מסמך מורחב זמין דרך פנייה ישירה לארכיון.'
                  : 'Downloading CV PDF. Extended documentation is available upon request.'
              );
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-md transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{data.downloadBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
