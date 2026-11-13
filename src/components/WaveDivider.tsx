import React, { useId } from 'react';

/** A thin wave line standing in for a plain hairline rule between sections.
    Tiled via an SVG pattern with a fixed-pixel period, instead of one path
    stretched to the container's width — a stretched path put the same 8
    cycles into a narrow phone screen as a wide desktop one, so the wave
    read as noticeably tighter/choppier on mobile. */
export const WaveDivider: React.FC<{ className?: string }> = ({ className }) => {
  const patternId = `wave-${useId().replace(/:/g, '')}`;
  return (
    <svg className={className} aria-hidden="true">
      <defs>
        <pattern id={patternId} width="180" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8 Q 45 0, 90 8 T 180 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};
