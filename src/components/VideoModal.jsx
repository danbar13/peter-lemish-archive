// src/components/VideoModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VideoModal = ({ video, onClose }) => {
  const { t, isRTL } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 focus:outline-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
          <div className="pe-4">
            <span className="text-xs font-bold text-amber-400 block mb-0.5">{video.event}</span>
            <h2 id="video-modal-title" className="text-base sm:text-lg font-bold text-white line-clamp-1">
              {video.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.media.closeVideo}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={video.thumbnail}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />

          {/* Interactive Player Overlay Simulation */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-t from-black/90 via-black/40 to-black/60">
            <div className="w-full flex justify-between items-center text-xs text-slate-300">
              <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                Archival Record
              </span>
              <span>{video.duration}</span>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 focus-visible:ring-4 focus-visible:ring-white focus-visible:outline-none"
              aria-label={isPlaying ? 'השהה סרטון' : 'נגן סרטון'}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" aria-hidden="true" />
              ) : (
                <Play className="w-8 h-8 fill-current ms-1" aria-hidden="true" />
              )}
            </button>

            {/* Simulated Player Controls Bar */}
            <div className="w-full space-y-2">
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-amber-400 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white"
                    aria-label={isMuted ? 'בטל השתקה' : 'השתק'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span>14:02 / {video.duration}</span>
                </div>
                <span className="text-[11px] text-amber-300 font-medium">
                  {isRTL ? 'הקלטה מהארכיון האקדמי' : 'Archival Recording'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {video.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {video.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
