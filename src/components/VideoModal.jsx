// src/components/VideoModal.jsx
import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Film, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VideoModal = ({ video, onClose }) => {
  const { t, isRTL } = useLanguage();
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

  if (!video) return null;

  // Build clean embed URL with autoplay and responsive parameters
  const embedUrl = video.embedUrl
    ? `${video.embedUrl}${video.embedUrl.includes('?') ? '&' : '?'}autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 focus:outline-none flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/95 shrink-0">
          <div className="pe-4">
            <span className="text-xs font-bold text-amber-400 block mb-0.5">
              {video.event}
            </span>
            <h2 id="video-modal-title" className="text-base sm:text-xl font-bold text-white line-clamp-1">
              {video.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.media?.closeVideo || (isRTL ? 'סגור נגן וידאו' : 'Close Video Player')}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-16/9 bg-black w-full overflow-hidden shrink-0">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center">
              <Film className="w-12 h-12 text-slate-600 mb-2" aria-hidden="true" />
              <p className="text-sm font-semibold">
                {isRTL ? 'הווידאו אינו זמין להטמעה ישירה' : 'Video not available for direct embedding'}
              </p>
            </div>
          )}
        </div>

        {/* Video Description & Actions */}
        <div className="p-4 sm:p-6 bg-slate-900/95 border-t border-slate-800/80 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>{isRTL ? 'הקלטת וידאו פעילה מארכיון המדיה' : 'Active stream from the media archive'}</span>
            </div>
            {video.youtubeUrl && (
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
              >
                <span>{isRTL ? 'צפה ישירות ב-YouTube' : 'Watch on YouTube'}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {video.description}
          </p>

          {video.tags && video.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {video.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
