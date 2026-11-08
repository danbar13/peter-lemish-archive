// src/App.jsx
import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { FocusAreas } from './components/FocusAreas';
import { PublicationsHub } from './components/PublicationsHub';
import { MediaArchive } from './components/MediaArchive';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { AccessibilityStatementModal } from './components/AccessibilityStatementModal';
import { CVModal } from './components/CVModal';
import { ReadingRuler } from './components/ReadingRuler';

function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-200 selection:text-slate-950">
      {/* Reading Guide Ruler */}
      <ReadingRuler />

      {/* Sticky Navigation Bar with Skip Link */}
      <Navbar />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {/* B. Hero Section */}
        <Hero />

        {/* C. Interactive Life Milestones (Timeline) */}
        <Timeline />

        {/* D. Core Pillars & Focus Areas */}
        <FocusAreas />

        {/* E. Publications & Research Hub */}
        <PublicationsHub />

        {/* F. Media, Archival Documents & Recordings */}
        <MediaArchive />

        {/* G. Testimonials, Colleagues & Impact */}
        <Testimonials />

        {/* H. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Utilities */}
      <ScrollToTop />
      <AccessibilityWidget />

      {/* Accessible Modals */}
      <AccessibilityStatementModal />
      <CVModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <MainLayout />
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
