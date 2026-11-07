import React from 'react';

/** A thin wave line standing in for a plain hairline rule between sections. */
export const WaveDivider: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 16" preserveAspectRatio="none" className={className} aria-hidden="true">
    <path
      d="M0 8 Q 25 0, 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 300 8 T 350 8 T 400 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
