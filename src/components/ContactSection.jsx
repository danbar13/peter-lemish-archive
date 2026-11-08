// src/components/ContactSection.jsx
import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const data = t.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: data.form.subjectOptions[0],
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage(data.form.error);
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: data.form.subjectOptions[0],
        message: '',
      });
    }, 1200);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>{data.badge}</span>
          </span>
          <h2
            id="contact-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {isRTL ? 'הפנייה התקבלה בהצלחה!' : 'Message Received Successfully!'}
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">{data.form.success}</p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors"
                >
                  {isRTL ? 'שליחת הודעה נוספת' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-start" noValidate>
                {status === 'error' && (
                  <div
                    role="alert"
                    className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-sm font-semibold"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {data.form.nameLabel}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={isRTL ? 'שמך המלא' : 'Your full name'}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                      {data.form.emailLabel}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {data.form.subjectLabel}
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                  >
                    {data.form.subjectOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {data.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={isRTL ? 'פירוט פנייתך, שאלות מחקריות או בקשת חומרים...' : 'Your inquiry, research query or request...'}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:border-blue-900 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-95 focus-visible:ring-4 focus-visible:ring-amber-500 focus-visible:outline-none"
                >
                  <Send className="w-5 h-5" aria-hidden="true" />
                  <span>{status === 'sending' ? data.form.sending : data.form.submitBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Direct Info & Academic Links (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm text-start space-y-5">
              <h3 className="text-xl font-extrabold text-blue-950">
                {data.directInfo.title}
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-bold text-slate-500">
                      {isRTL ? 'דוא"ל ישיר:' : 'Direct Email:'}
                    </span>
                    <a
                      href={`mailto:${data.directInfo.email}`}
                      className="font-bold text-blue-900 hover:underline"
                    >
                      {data.directInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-bold text-slate-500">
                      {isRTL ? 'מיקום ומשכן אקדמי:' : 'Academic Affiliation & Locale:'}
                    </span>
                    <span>{data.directInfo.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <span className="block text-xs font-bold text-slate-500">
                      {isRTL ? 'זמני מענה:' : 'Response Time:'}
                    </span>
                    <span>{data.directInfo.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Profiles Card */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 p-7 rounded-3xl text-white shadow-xl text-start">
              <div className="flex items-center gap-2 text-amber-400 mb-3">
                <GraduationCap className="w-6 h-6" aria-hidden="true" />
                <h3 className="text-lg font-bold text-white">
                  {data.directInfo.profilesTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                {isRTL
                  ? 'לעיון במאגר המלא של מחקרי ד"ר פיטר למיש ומחקרים מצטטים ברחבי הרשת:'
                  : 'Explore indexed citations and collaborative scholarly repositories:'}
              </p>

              <div className="space-y-2.5">
                <a
                  href="https://scholar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold border border-white/10 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <span>{data.directInfo.scholar}</span>
                  <ExternalLink className="w-4 h-4 text-amber-300" aria-hidden="true" />
                </a>

                <a
                  href="https://www.researchgate.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold border border-white/10 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <span>{data.directInfo.researchGate}</span>
                  <ExternalLink className="w-4 h-4 text-amber-300" aria-hidden="true" />
                </a>

                <a
                  href="https://www.academia.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold border border-white/10 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  <span>{data.directInfo.academia}</span>
                  <ExternalLink className="w-4 h-4 text-amber-300" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
