// src/components/AccessibilityStatementModal.jsx
import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, ShieldCheck, Mail } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useLanguage } from '../context/LanguageContext';

export const AccessibilityStatementModal = () => {
  const { isStatementModalOpen, setIsStatementModalOpen } = useAccessibility();
  const { t } = useLanguage();
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isStatementModalOpen) {
        setIsStatementModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStatementModalOpen, setIsStatementModalOpen]);

  useEffect(() => {
    if (isStatementModalOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isStatementModalOpen]);

  if (!isStatementModalOpen) return null;

  const data = t.accessibilityStatement;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-statement-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsStatementModalOpen(false);
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[85vh] overflow-y-auto focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-900 rounded-2xl">
              <ShieldCheck className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h2 id="acc-statement-title" className="text-xl sm:text-2xl font-bold text-slate-900">
                {data.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{data.lastUpdated}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setIsStatementModalOpen(false)}
            aria-label={data.closeBtn}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-6 text-slate-700 text-base leading-relaxed">
          <p className="font-medium text-slate-800">{data.intro}</p>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              {data.featuresHeading}
            </h3>
            <ul className="space-y-2.5 ps-2">
              {data.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-800 mt-2 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-md font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-900" aria-hidden="true" />
              {data.contactHeading}
            </h3>
            <p className="text-sm text-slate-600 leading-normal">{data.contactText}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={() => setIsStatementModalOpen(false)}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            {data.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
