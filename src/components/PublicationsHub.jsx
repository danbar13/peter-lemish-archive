// src/components/PublicationsHub.jsx
import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  Filter,
  Calendar,
  FileText,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PublicationDetailModal } from './PublicationDetailModal';

export const PublicationsHub = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPub, setSelectedPub] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const data = t.publications || {};
  const pubItems = data.items || [];

  const categories = useMemo(() => {
    if (Array.isArray(data.categories)) {
      return data.categories.map((c) => ({
        id: c.key || c.id,
        label: c.label,
      }));
    }
    if (data.categories) {
      return [
        { id: 'all', label: data.categories.all || (isRTL ? 'הכל' : 'All') },
        { id: 'books', label: data.categories.book || data.categories.books || (isRTL ? 'ספרים ומונוגרפיות' : 'Books & Monographs') },
        { id: 'journal-articles', label: data.categories.journal || data.categories['journal-articles'] || (isRTL ? 'מאמרים שפיטים' : 'Journal Articles') },
        { id: 'reports', label: data.categories.report || data.categories.reports || (isRTL ? 'דוחות מדיניות ומחקר' : 'Policy Reports') },
        { id: 'opeds', label: data.categories.essay || data.categories.opeds || (isRTL ? 'מאמרי דעה ומסות' : 'Op-Eds & Essays') },
      ];
    }
    return [
      { id: 'all', label: isRTL ? 'הכל' : 'All' },
      { id: 'books', label: isRTL ? 'ספרים' : 'Books' },
      { id: 'journal-articles', label: isRTL ? 'מאמרים' : 'Articles' },
    ];
  }, [data.categories, isRTL]);

  // Filtering logic
  const filteredItems = useMemo(() => {
    return pubItems.filter((item) => {
      // Category match (normalize books vs book, journal-articles vs journal, etc)
      const normalizeCat = (cat) => {
        if (!cat) return '';
        if (cat === 'book' || cat === 'books') return 'books';
        if (cat === 'journal' || cat === 'journal-articles') return 'journal-articles';
        if (cat === 'report' || cat === 'reports') return 'reports';
        if (cat === 'essay' || cat === 'opeds') return 'opeds';
        return cat;
      };

      const categoryMatch =
        selectedCategory === 'all' ||
        normalizeCat(item.category) === normalizeCat(selectedCategory);

      // Text search match across title, abstract, tags, publisher
      const query = searchTerm.trim().toLowerCase();
      if (!query) return categoryMatch;

      const titleMatch = item.title?.toLowerCase().includes(query);
      const enTitleMatch = item.englishTitle?.toLowerCase().includes(query);
      const abstractMatch = item.abstract?.toLowerCase().includes(query);
      const publisherMatch = item.publisher?.toLowerCase().includes(query);
      const yearMatch = item.year?.toString().includes(query);
      const tagMatch = item.tags?.some((tag) => tag.toLowerCase().includes(query));

      return (
        categoryMatch &&
        (titleMatch || enTitleMatch || abstractMatch || publisherMatch || yearMatch || tagMatch)
      );
    });
  }, [pubItems, selectedCategory, searchTerm]);

  const handleCopy = (item, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(item.citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section
      id="publications"
      aria-labelledby="publications-title"
      className="py-16 sm:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
            <span>{data.badge}</span>
          </span>
          <h2
            id="publications-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight"
          >
            {data.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed font-normal">
            {data.subtitle}
          </p>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-xs mb-10 space-y-5">
          {/* Search Box */}
          <div className="relative">
            <label htmlFor="pub-search" className="sr-only">
              {data.searchPlaceholder}
            </label>
            <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-slate-500" aria-hidden="true" />
            </div>
            <input
              id="pub-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={data.searchPlaceholder}
              className="w-full ps-11 pe-10 py-3.5 bg-white border-2 border-slate-300 focus:border-blue-900 rounded-2xl text-slate-900 placeholder:text-slate-400 text-base focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="נקה שדה חיפוש"
                className="absolute inset-y-0 end-0 pe-4 flex items-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div
            role="group"
            aria-label="סינון פרסומים לפי קטגוריה"
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 me-2">
              <Filter className="w-3.5 h-3.5 text-blue-900" aria-hidden="true" />
              <span>{isRTL ? 'סינון:' : 'Filter:'}</span>
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Results Count Announcement */}
          <div
            role="status"
            aria-live="polite"
            className="text-xs font-semibold text-slate-500 pt-2 border-t border-slate-200/60"
          >
            {data.resultsCount.replace('{count}', filteredItems.length)}
          </div>
        </div>

        {/* Publications Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" aria-hidden="true" />
            <p className="text-lg font-bold text-slate-700">{data.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-sm font-bold text-blue-900 hover:underline focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
            >
              {isRTL ? 'נקה חיפוש וסינונים' : 'Clear Search & Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Year Strip */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-xs font-bold border border-blue-200">
                      <FileText className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
                      <span>{item.categoryLabel}</span>
                    </span>
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-blue-950 group-hover:text-blue-900 transition-colors line-clamp-2 leading-tight">
                    {item.title}
                  </h3>

                  {/* Publisher */}
                  <p className="text-xs font-semibold text-slate-500 mt-1.5">
                    {item.publisher}
                  </p>

                  {/* 2-line Abstract */}
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {item.abstract}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-semibold border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPub(item)}
                    aria-label={`${data.readSummary}: ${item.title}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-blue-900 group-hover:text-amber-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded-lg p-1"
                  >
                    <span>{data.readSummary}</span>
                    {isRTL ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleCopy(item, e)}
                    aria-label={`${data.copyCitation}: ${item.title}`}
                    className="p-2 text-slate-500 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none relative"
                    title={data.copyCitation}
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Publication Detail Modal */}
      {selectedPub && (
        <PublicationDetailModal
          item={selectedPub}
          onClose={() => setSelectedPub(null)}
        />
      )}
    </section>
  );
};
