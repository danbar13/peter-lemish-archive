// src/components/Timeline.jsx
import React, { useState } from 'react';
import { Calendar, ChevronRight, ChevronLeft, MapPin, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TimelineModal } from './TimelineModal';

export const Timeline = () => {
  const { t, isRTL } = useLanguage();
  const [selectedStation, setSelectedStation] = useState(null);
  const data = t.timeline || {};
  const stations = Array.isArray(data) ? data : (data.stations || []);
  const title = data.title || (isRTL ? 'מסע חיים, מדע ואקטיביזם' : 'Milestones: Scholarship, Pedagogy & Activism');
  const subtitle = data.subtitle || (isRTL ? 'ציוני הדרך המרכזיים שעיצבו את הגותו ופועלו של ד"ר פיטר למיש.' : 'Key chronological stations charting Dr. Peter Lemish’s intellectual journey.');
  const readMoreText = data.readMore || (isRTL ? 'קרא עוד על התחנה' : 'Read More');

  return (
    <section
      id="biography"
      aria-labelledby="timeline-title"
      className="py-16 sm:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>{data.badge}</span>
          </span>
          <h2
            id="timeline-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            {title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative">
          {/* Central Vertical Spine Line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 bottom-6 start-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-900 via-amber-500 to-slate-300"
          />

          <div className="space-y-12 md:space-y-16">
            {stations.map((station, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={station.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Half width on desktop) */}
                  <div className="w-full md:w-1/2 px-0 md:px-8">
                    <article
                      className="bg-slate-50 hover:bg-slate-100/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Station Top Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900 text-amber-300 rounded-full text-xs font-black tracking-wide">
                          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{station.year}</span>
                        </span>
                        {(station.location || station.mediaTag) && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                            <span>{station.location || station.mediaTag}</span>
                          </div>
                        )}
                      </div>

                      {/* Station Heading */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 group-hover:text-blue-900 transition-colors">
                        {station.title}
                      </h3>

                      {/* Overview */}
                      <p className="mt-3 text-slate-700 text-base leading-relaxed">
                        {station.shortDesc || station.summary}
                      </p>

                      {/* Tag list */}
                      {station.tags && station.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {station.tags.slice(0, 3).map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-2.5 py-0.5 bg-white text-slate-600 rounded-md text-xs font-medium border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More Trigger Button */}
                      <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={() => setSelectedStation(station)}
                          aria-label={`${readMoreText}: ${station.title}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 group-hover:text-amber-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-lg p-1"
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
                  </div>

                  {/* Spine Node Marker (Center Circle) */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex absolute start-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-blue-900 shadow-md items-center justify-center z-10"
                  >
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                  </div>

                  {/* Empty counterpart space for desktop alignment */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Narrative Modal */}
      {selectedStation && (
        <TimelineModal
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </section>
  );
};
