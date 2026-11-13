import React from 'react';
import { CompareSlider } from './CompareSlider';

/**
 * Drag-to-reveal comparisons between the colorized/AI-reconstructed cast and
 * the real archival photo behind each one. Prototype: one sample pairing
 * while the slider mechanism itself gets signed off — copy here is a
 * placeholder, not yet run through the i18n system, pending the real
 * character this pairing belongs to and translated labels for it.
 */
export const Reconstructions: React.FC = () => (
  <section id="reconstructions" className="py-12 sm:py-16 lg:py-20 bg-dark">
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <div className="max-w-2xl mb-10">
        <span className="slate-label">Archive vs. reconstruction</span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
          Faces behind the <span className="text-accent">legend</span>
        </h2>
        <p className="text-ash mt-3 max-w-md">
          Drag the slider — every reconstructed face on this site started from a real photograph.
        </p>
      </div>

      <div className="max-w-xl">
        <CompareSlider
          leftSrc="reconstructions/sample-reconstruction.jpg"
          rightSrc="reconstructions/sample-archive.jpg"
          leftLabel="AI Reconstruction"
          rightLabel="Archive"
        />
      </div>
    </div>
  </section>
);
