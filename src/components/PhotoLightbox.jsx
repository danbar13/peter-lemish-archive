// src/components/PhotoLightbox.jsx
import React, { useEffect, useRef } from 'react';
import { X, Calendar, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const PhotoLightbox = ({ photo, onClose }) => {
  const { t } = useLanguage();
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

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-photo-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-slate-950 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 focus:outline-none">
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={t.media.lightboxClose}
          className="absolute top-4 end-4 z-20 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Image Container */}
        <div className="relative aspect-16/10 sm:aspect-16/9 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={photo.url}
            alt={photo.alt}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <Camera className="w-4 h-4" aria-hidden="true" />
            <span>{photo.year}</span>
          </div>
          <h2 id="lightbox-photo-title" className="text-xl sm:text-2xl font-bold text-white mb-2">
            {photo.title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
