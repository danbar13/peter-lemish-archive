// src/components/FocusAreas.jsx
import React, { useState } from 'react';
import {
  Tv,
  HeartHandshake,
  Users,
  GraduationCap,
  BookOpen,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FocusAreaModal } from './FocusAreaModal';

export const FocusAreas = () => {
  const { t, isRTL } = useLanguage();
  const [selectedArea, setSelectedArea] = useState(null);
  const data = t.focusAreas || {};
  const items = Array.isArray(data) ? data : (data.items || []);
  const title = data.title || (isRTL ? 'תחומי מומחיות וליבה' : 'Focus Areas & Core Pillars');
  const subtitle = data.subtitle || (isRTL ? 'ארבעה מרחבי ידע מרכזיים שבהם שילב ד"ר למיש תיאוריה ביקורתית חדה עם יישום מעשי בשטח.' : 'Four interconnected domains where Dr. Lemish synthesized critical theory with grassroots community action.');
  const readMoreText = data.readMore || (isRTL ? 'הרחבה על התחום' : 'Learn More');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen':
      case 'Tv':
        return <BookOpen className="w-7 h-7 text-amber-500" aria-hidden="true" />;
      case 'Globe':
      case 'Users':
        return <Globe className="w-7 h-7 text-amber-500" aria-hidden="true" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-7 h-7 text-amber-500" aria-hidden="true" />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-7 h-7 text-amber-500" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="focus-areas"
      aria-labelledby="focus-areas-title"
      className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>{data.badge || (isRTL ? 'תחומי ליבה' : 'Core Pillars')}</span>
          </span>
          <h2
            id="focus-areas-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Frame */}
                <div className="w-14 h-14 rounded-2xl bg-blue-900 flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform">
                  {getIcon(item.icon)}
                </div>

                {/* Subtitle / Tagline */}
                {item.tagline && (
                  <span className="text-xs font-bold text-amber-700 tracking-wider uppercase block mb-1.5">
                    {item.tagline}
                  </span>
                )}

                {/* Card Title */}
                <h3 className="text-xl font-extrabold text-blue-950 mb-3 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h3>

                {/* Summary / Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {item.description || item.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedArea(item)}
                  aria-label={`${readMoreText}: ${item.title}`}
                  className="w-full inline-flex items-center justify-between text-sm font-bold text-blue-900 group-hover:text-amber-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-lg p-1"
                >
                  <span>{readMoreText}</span>
                  {isRTL ? (
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Focus Area Modal */}
      {selectedArea && (
        <FocusAreaModal
          area={selectedArea}
          onClose={() => setSelectedArea(null)}
        />
      )}
    </section>
  );
};
