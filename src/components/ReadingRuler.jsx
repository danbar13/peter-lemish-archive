// src/components/ReadingRuler.jsx
import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export const ReadingRuler = () => {
  const { readingRuler } = useAccessibility();
  const [positionY, setPositionY] = useState(-100);

  useEffect(() => {
    if (!readingRuler) return;

    const handleMouseMove = (e) => {
      setPositionY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [readingRuler]);

  if (!readingRuler) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        top: `${positionY - 20}px`,
        height: '42px',
        backgroundColor: 'rgba(254, 240, 138, 0.28)',
        borderTop: '2px solid rgba(217, 119, 6, 0.6)',
        borderBottom: '2px solid rgba(217, 119, 6, 0.6)',
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
      }}
    />
  );
};
