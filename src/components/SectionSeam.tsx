import React from 'react';
import { useReveal } from '../hooks/useReveal';

/** A section seam that gets a light sweep across it every time it scrolls into
    view, instead of a plain static hairline — an alternative to the wave motif
    for a transition that wants a bit more presence without repeating it
    everywhere. The positioning className goes on this outer wrapper; the inner
    div stays `relative` for the sweep's own absolute positioning — combining
    both on one element let `position: absolute` and `position: relative` fight
    over the same element, and `relative` was winning, so the line sat wherever
    normal flow (and the section's padding) put it instead of the seam. */
export const SectionSeam: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [ref, visible] = useReveal<HTMLDivElement>({ once: false });
  return (
    <div ref={ref} className={className}>
      <div className="relative h-px overflow-hidden bg-white/10">
        <span
          className={`absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-accent to-transparent ${
            visible ? 'animate-seam-sweep' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};
