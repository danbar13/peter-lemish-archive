// src/context/AccessibilityContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

export const AccessibilityProvider = ({ children }) => {
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingRuler, setReadingRuler] = useState(false);

  // Modals
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // Apply font scale to document element
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
  }, [fontScale]);

  // Apply high contrast class
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply dyslexia-friendly font class
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  // Apply highlight links class
  useEffect(() => {
    if (highlightLinks) {
      document.body.classList.add('highlight-links');
    } else {
      document.body.classList.remove('highlight-links');
    }
  }, [highlightLinks]);

  const increaseFont = () => {
    setFontScale((prev) => Math.min(prev + 10, 140));
  };

  const decreaseFont = () => {
    setFontScale((prev) => Math.max(prev - 10, 80));
  };

  const resetFont = () => {
    setFontScale(100);
  };

  const resetAll = () => {
    setFontScale(100);
    setHighContrast(false);
    setDyslexiaFont(false);
    setHighlightLinks(false);
    setReadingRuler(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontScale,
        increaseFont,
        decreaseFont,
        resetFont,
        highContrast,
        setHighContrast,
        dyslexiaFont,
        setDyslexiaFont,
        highlightLinks,
        setHighlightLinks,
        readingRuler,
        setReadingRuler,
        resetAll,
        isAccessibilityModalOpen,
        setIsAccessibilityModalOpen,
        isStatementModalOpen,
        setIsStatementModalOpen,
        isCvModalOpen,
        setIsCvModalOpen,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
