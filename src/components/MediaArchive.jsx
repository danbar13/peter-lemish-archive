// src/components/MediaArchive.jsx
import React, { useState } from 'react';
import {
  Video,
  Camera,
  Play,
  Calendar,
  Sparkles,
  Maximize2,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PhotoLightbox } from './PhotoLightbox';
import { VideoModal } from './VideoModal';

export const MediaArchive = () => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('recordings'); // 'recordings' | 'photos'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const data = t.media || {};
  const videoList = data.videos || data.videoItems || [];
  const galleryList = data.gallery || data.photoItems || [];
  const recTabLabel = data.tabs?.recordings || (isRTL ? 'הקלטות והרצאות וידאו' : 'Video & Audio Recordings');
  const photoTabLabel = data.tabs?.photos || (isRTL ? 'גלריית תצלומים' : 'Photo Gallery');

  return (
    <section
      id="media"
      aria-labelledby="media-title"
      className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>{data.badge}</span>
          </span>
          <h2
            id="media-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
            {data.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div
            role="tablist"
            aria-label="תצוגת מדיה וארכיון"
            className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs"
          >
            <button
              role="tab"
              type="button"
              id="tab-recordings"
              aria-selected={activeTab === 'recordings'}
              aria-controls="panel-recordings"
              onClick={() => setActiveTab('recordings')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeTab === 'recordings'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Video className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{recTabLabel}</span>
            </button>

            <button
              role="tab"
              type="button"
              id="tab-photos"
              aria-selected={activeTab === 'photos'}
              aria-controls="panel-photos"
              onClick={() => setActiveTab('photos')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                activeTab === 'photos'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Camera className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{photoTabLabel}</span>
            </button>
          </div>
        </div>

        {/* Recordings Tab Content */}
        {activeTab === 'recordings' && (
          <div
            id="panel-recordings"
            role="tabpanel"
            aria-labelledby="tab-recordings"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {videoList.map((vid) => (
              <article
                key={vid.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-900">
                    <img
                      src={vid.thumbnail || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    {/* Duration or Date badge */}
                    {(vid.duration || vid.date) && (
                      <span className="absolute bottom-3 end-3 px-2.5 py-1 bg-black/80 text-white rounded-md text-xs font-mono font-semibold flex items-center gap-1 backdrop-blur-xs">
                        <Clock className="w-3 h-3 text-amber-400" aria-hidden="true" />
                        {vid.duration || vid.date}
                      </span>
                    )}

                    {/* Big Center Play Trigger */}
                    <button
                      type="button"
                      onClick={() => setSelectedVideo(vid)}
                      aria-label={`${data.playVideo || 'הפעל וידאו'}: ${vid.title}`}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-blue-900/90 text-amber-400 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-blue-900 transition-all focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
                    >
                      <Play className="w-6 h-6 fill-current ms-0.5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {(vid.event || vid.date) && (
                      <span className="text-xs font-bold text-amber-700 block mb-1">
                        {vid.event || vid.date}
                      </span>
                    )}
                    <h3 className="text-lg font-extrabold text-blue-950 group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">
                      {vid.title}
                    </h3>
                    <p className="mt-2 text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {vid.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {vid.tags && vid.tags.slice(0, 2).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(vid)}
                    className="text-xs font-bold text-blue-900 hover:text-amber-700 p-1 focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
                  >
                    {data.playVideo || 'הפעל וידאו'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Photos Tab Content */}
        {activeTab === 'photos' && (
          <div
            id="panel-photos"
            role="tabpanel"
            aria-labelledby="tab-photos"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {galleryList.map((ph) => (
              <figure
                key={ph.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedPhoto(ph)}
              >
                {/* Photo Frame */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={ph.url}
                    alt={ph.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Year Tag */}
                  <span className="absolute top-3 start-3 px-2.5 py-1 bg-black/75 text-amber-300 rounded-md text-xs font-bold backdrop-blur-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {ph.year}
                  </span>
                  {/* Zoom Icon indicator */}
                  <div className="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-blue-900 shadow-lg">
                      <Maximize2 className="w-5 h-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <figcaption className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-blue-950 group-hover:text-blue-900 transition-colors">
                      {ph.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {ph.caption}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhoto(ph);
                    }}
                    aria-label={`הגדל תמונה: ${ph.title}`}
                    className="mt-3 text-xs font-bold text-blue-900 hover:text-amber-700 text-start focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
                  >
                    {isRTL ? 'הגדל תצלום' : 'View Full Image'}
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};
