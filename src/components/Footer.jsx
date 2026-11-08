// src/components/Footer.jsx
import React from 'react';
import { BookOpen, ShieldCheck, Heart, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';

export const Footer = () => {
  const { t, isRTL } = useLanguage();
  const { setIsStatementModalOpen } = useAccessibility();
  const footer = t.footer;

  return (
    <footer
      role="contentinfo"
      className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Identity & Mission (6 cols) */}
          <div className="md:col-span-6 space-y-4 text-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-amber-400 font-bold">
                <BookOpen className="w-5 h-5 text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-black text-white text-lg leading-tight">
                  {t.nav.brand}
                </span>
                <span className="block text-xs font-semibold text-slate-400">
                  {t.nav.brandSubtitle}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {footer.tagline}
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 text-start space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {isRTL ? 'ניווט מהיר' : 'Navigation'}
            </span>
            <ul className="space-y-2 text-sm">
              {t.nav.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded-md px-1 py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Accessibility & Governance (3 cols) */}
          <div className="md:col-span-3 text-start space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              {isRTL ? 'נגישות וזכויות' : 'Accessibility & Rights'}
            </span>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsStatementModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-amber-400 px-3 py-2 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>{footer.accessibilityStatementBtn}</span>
              </button>

              <div className="text-xs text-slate-400 pt-1">
                <a
                  href={`mailto:${t.contact.directInfo.email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.contact.directInfo.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-start">
          <p>{footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>Built with care for public education and legacy</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
};
