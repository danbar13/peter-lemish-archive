// src/components/Hero.jsx
import React from 'react';
import { ArrowDown, BookOpen, Sparkles, HeartHandshake, Compass, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t, isRTL } = useLanguage();
  const hero = t.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200"
    >
      {/* Subtle decorative background circles */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-32 start-12 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl" />
        <div className="absolute top-48 end-10 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column (7 cols) */}
          <div className="lg:col-span-7 text-start space-y-6">
            {/* Academic Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-600" aria-hidden="true" />
              <span>{hero.tag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mx-1" aria-hidden="true" />
              <span className="font-semibold text-slate-700">{hero.years}</span>
            </div>

            {/* Main Headings */}
            <div>
              <h1
                id="hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]"
              >
                {hero.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-blue-900 mt-2 font-serif">
                {hero.role || hero.title}
              </p>
            </div>

            {/* Bio Snippet / Tagline */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl font-normal">
              {hero.tagline || hero.bioSnippet}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#biography"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                <Compass className="w-5 h-5 text-amber-400" aria-hidden="true" />
                <span>{hero.ctaPrimary || hero.ctaExplore}</span>
              </a>

              <a
                href="#publications"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 border-2 border-slate-300 hover:border-slate-400 rounded-xl text-base font-bold transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                <BookOpen className="w-5 h-5 text-blue-900" aria-hidden="true" />
                <span>{hero.ctaSecondary || hero.ctaPubs}</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 text-slate-700 hover:text-blue-900 font-bold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-lg"
              >
                <span>{hero.ctaContact}</span>
                <span className="text-lg" aria-hidden="true">
                  {isRTL ? '←' : '→'}
                </span>
              </a>
            </div>
          </div>

          {/* Portrait & Honor Frame Column (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Outer Academic Accent Frame */}
              <div className="relative p-3 bg-white rounded-3xl shadow-2xl border border-slate-200">
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 flex flex-col items-center justify-between p-8 text-center text-white">
                  
                  {/* Decorative background grid pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Top Memorial Badge */}
                  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold tracking-widest uppercase">
                    <Award className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>In Memoriam & Praxis</span>
                  </div>

                  {/* Center Dignified Portrait */}
                  <div className="relative z-10 flex flex-col items-center my-auto w-full">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-amber-400 p-1 shadow-2xl bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 mb-4 overflow-hidden group">
                      <img
                        src="/images/peter-lemish-portrait.jpg"
                        alt={isRTL ? 'ד"ר פיטר למיש (1948–2021)' : 'Dr. Peter Lemish (1948–2021)'}
                        className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-center mb-2">
                      <span className="text-base font-serif font-bold text-amber-300 block">
                        {isRTL ? 'ד"ר פיטר למיש' : 'Dr. Peter Lemish'}
                      </span>
                      <span className="text-xs text-slate-300 font-mono">
                        {hero.years || '1948 – 2021'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-200 italic max-w-xs px-2 text-center">
                      {isRTL
                        ? '"חינוך אינו יכול להישאר אדיש למבני אי-צדק; מטרתו להעניק לאדם את חירות התודעה והדיאלוג."'
                        : '"Education cannot remain indifferent to structural injustice; its purpose is human freedom and dialogic awakening."'}
                    </p>
                  </div>

                  {/* Bottom Strip */}
                  <div className="relative z-10 w-full pt-4 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
                    <span>{isRTL ? 'בית ברל • ספיר • IPRA' : 'Beit Berl • Sapir • SIUC • IPRA'}</span>
                    <span className="font-bold text-amber-400">{isRTL ? 'ד"ר פיטר למיש' : 'Dr. Peter Lemish'}</span>
                  </div>
                </div>
              </div>

              {/* Floating Accent Badge */}
              <div className="absolute -bottom-5 start-6 bg-amber-500 text-slate-950 px-4 py-2 rounded-2xl shadow-xl font-black text-xs sm:text-sm flex items-center gap-2 border-2 border-white">
                <HeartHandshake className="w-4 h-4 text-slate-950" aria-hidden="true" />
                <span>{isRTL ? 'צדק חברתי וחינוך לשלום' : 'Social Justice & Peace Pedagogy'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Strip (Optional if present) */}
        {hero.stats && hero.stats.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-200/80">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {hero.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl sm:text-4xl font-black text-blue-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
