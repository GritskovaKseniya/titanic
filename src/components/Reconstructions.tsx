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
  <section id="reconstructions" className="relative z-10 -mt-32 sm:-mt-44 lg:-mt-56 pt-0 pb-12 sm:pb-16 lg:pb-20"
    style={{ background: 'linear-gradient(180deg, transparent 0, rgb(var(--color-dark)) 12rem)' }}
  >
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <div className="max-w-2xl mb-10">
        <span className="slate-label">Archive vs. reconstruction</span>
        <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
          One ship, ten <span className="text-accent">faces</span>
        </h2>
        <p className="text-ash mt-3 max-w-md">
          Drag the slider — every reconstruction on this site started from a real record.
        </p>
      </div>

      <div>
        <span className="slate-label block mb-3">The ship</span>
        <CompareSlider
          leftSrc="reconstructions/ship-night.jpg"
          rightSrc="reconstructions/ship-blueprint.jpg"
          leftLabel="AI Reconstruction"
          rightLabel="Blueprint"
          aspectClassName="aspect-[21/9]"
        />
      </div>

      <div className="max-w-xl mt-10">
        <span className="slate-label block mb-3">The people</span>
        <CompareSlider
          leftSrc="reconstructions/sample-reconstruction.jpg"
          rightSrc="reconstructions/sample-archive.jpg"
          leftLabel="AI Reconstruction"
          rightLabel="Archive"
          aspectClassName="aspect-[1264/859]"
        />
      </div>
    </div>
  </section>
);
