import React from 'react';

/**
 * A simple line-art liner silhouette (four funnels, like the Titanic's own
 * profile) — a decorative watermark, not a literal ship diagram. Pass
 * className for sizing/color/opacity from the caller.
 */
export const ShipSilhouette: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 110" fill="none" className={className} aria-hidden="true">
    <path
      d="M60 25 V62 M110 25 V62 M160 25 V62 M210 25 V62"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M15 62 H385 M20 72 C 20 62, 35 62, 50 62 L 300 62 C 335 62, 365 66, 388 76 C 365 86, 300 90, 230 90 L 70 90 C 40 90, 20 82, 20 72 Z"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
  </svg>
);
