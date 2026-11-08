// src/components/TributeModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Heart, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TributeModal = ({ onClose, onAddTribute }) => {
  const { t, isRTL } = useLanguage();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    if (onAddTribute) {
      onAddTribute({
        id: `user-${Date.now()}`,
        name: name.trim(),
        role: role.trim() || (isRTL ? 'עמית / תלמיד' : 'Colleague / Alum'),
        quote: message.trim(),
        location: isRTL ? 'ישראל' : 'Archive Contributor',
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const modalData = t.testimonials.tributeModal;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tribute-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 max-h-[88vh] overflow-y-auto focus:outline-none">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl">
              <Heart className="w-6 h-6 fill-amber-500 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h2 id="tribute-modal-title" className="text-xl sm:text-2xl font-bold text-blue-950">
                {modalData.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">{modalData.subtitle}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={modalData.closeBtn}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body or Success State */}
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <p className="text-lg font-bold text-slate-900">{modalData.successMsg}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-4 text-start">
            <div>
              <label htmlFor="trib-name" className="block text-xs font-bold text-slate-700 mb-1">
                {modalData.nameLabel}
              </label>
              <input
                id="trib-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="trib-role" className="block text-xs font-bold text-slate-700 mb-1">
                {modalData.roleLabel}
              </label>
              <input
                id="trib-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={isRTL ? 'למשל: תלמיד לשעבר במכללת בית ברל / שותף למחקר' : 'e.g. Former student / Research partner'}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="trib-email" className="block text-xs font-bold text-slate-700 mb-1">
                {modalData.emailLabel}
              </label>
              <input
                id="trib-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="trib-msg" className="block text-xs font-bold text-slate-700 mb-1">
                {modalData.messageLabel}
              </label>
              <textarea
                id="trib-msg"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
              >
                {modalData.closeBtn}
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-sm font-bold shadow-md transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>{modalData.submitBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
