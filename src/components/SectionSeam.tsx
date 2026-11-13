import React from 'react';
import { useReveal } from '../hooks/useReveal';

/** A section seam that gets a one-time light sweep across it on scroll-into-view,
    instead of a plain static hairline — an alternative to the wave motif for a
    transition that wants a bit more presence without repeating it everywhere. */
export const SectionSeam: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative h-px overflow-hidden bg-white/10 ${className}`}>
      <span
        className={`absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-accent to-transparent ${
          visible ? 'animate-seam-sweep' : 'opacity-0'
        }`}
      />
    </div>
  );
};
