// src/components/Testimonials.jsx
import React, { useState } from 'react';
import { Quote, Heart, Sparkles, PlusCircle, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TributeModal } from './TributeModal';

export const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const [isTributeModalOpen, setIsTributeModalOpen] = useState(false);
  const data = t.testimonials || {};
  const [customTributes, setCustomTributes] = useState([]);
  const initialItems = Array.isArray(data) ? data : (data.items || []);

  const allTributes = [...customTributes, ...initialItems];
  const title = data.title || (isRTL ? 'עדויות והוקרה' : 'Testimonials & Reflections');
  const subtitle = data.subtitle || (isRTL ? 'מילים חמות וזיכרונות שנשזרו לאורך עשרות שנות עשייה – על האומץ המחשבתי, החום האנושי והמחויבות.' : 'Reflections, memories, and honors celebrating Peter’s intellectual fearlessness, radical warmth, and moral clarity.');
  const shareBtnText = data.shareMemoryBtn || (isRTL ? 'שיתוף זיכרון או עדות' : 'Share a Tribute / Memory');

  const handleAddTribute = (newTribute) => {
    setCustomTributes((prev) => [newTribute, ...prev]);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="py-16 sm:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>{data.badge || (isRTL ? 'מורשת והשראה' : 'Legacy & Impact')}</span>
          </span>
          <h2
            id="testimonials-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
            {subtitle}
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => setIsTributeModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-900 focus-visible:outline-none"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" aria-hidden="true" />
              <span>{shareBtnText}</span>
            </button>
          </div>
        </div>

        {/* Testimonials Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allTributes.map((item) => {
            const authorName = item.author || item.name || '';
            const initialLetter = authorName.charAt(0) || 'P';

            return (
              <article
                key={item.id}
                className="relative bg-slate-50 rounded-3xl p-7 sm:p-8 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-8 h-8 text-amber-500/70 rotate-180" aria-hidden="true" />
                    {item.location && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-400">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    )}
                  </div>

                  {/* Quote text */}
                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed italic font-serif">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author attribution */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-blue-900 text-amber-300 font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                    {initialLetter}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-blue-950 text-base">
                      {authorName}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Tribute Modal */}
      {isTributeModalOpen && (
        <TributeModal
          onClose={() => setIsTributeModalOpen(false)}
          onAddTribute={handleAddTribute}
        />
      )}
    </section>
  );
};
