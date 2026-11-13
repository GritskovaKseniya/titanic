import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTeam } from '../data/team';
import { splitLastWord } from '../utils/splitAccent';
import { TeamCard } from './TeamCard';
import { SectionSeam } from './SectionSeam';
import { IcebergBlueprint } from './IcebergBlueprint';
import { useReveal } from '../hooks/useReveal';

export const Details: React.FC = () => {
  const { t } = useLanguage();
  const team = useTeam();
  const [headingLead, headingLast] = splitLastWord(t.details.heading);
  const [icebergRef, icebergVisible] = useReveal<HTMLDivElement>();

  return (
    <section id="details" className="relative py-12 sm:py-16 lg:py-20 bg-darkSec border-b hairline">
      <SectionSeam className="absolute top-0 left-0 w-full" />

      {/* Straddles the About/Details seam: the SVG's own waterline (≈28.3%
          down its height) lands exactly on the color boundary via
          -translate-y-[28.3%]. IcebergBlueprint's viewBox is cropped to the
          shape's own footprint, so this box just needs to be a normal,
          modestly-sized rectangle flush to the right edge — no more huge
          vw-based widths or large % translates to compensate for a mostly
          empty viewBox. The slide-in is on an INNER div, not this one — this
          outer div is what useReveal's IntersectionObserver watches, and if
          IT also carried the translate-x-full, its observed position would
          sit far off-screen and never intersect the viewport, so `visible`
          would never flip true (silently stuck hidden). Keeping this one's
          position stable for observation, and sliding only the inner
          wrapper, avoids that. */}
      <div
        ref={icebergRef}
        aria-hidden="true"
        className="absolute top-0 right-0 w-[80vw] sm:w-[46vw] max-w-[700px] opacity-10 -translate-y-[28.3%] overflow-visible"
      >
        <div
          className={`transition-transform duration-[3200ms] ease-out motion-reduce:transition-none ${
            icebergVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="relative text-accent">
            <IcebergBlueprint className="w-full h-auto" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <span className="slate-label">{t.details.label}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
            {headingLead} <span className="text-accent">{headingLast}</span>
          </h2>
          <p className="text-ash mt-3 max-w-md">{t.details.description}</p>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} roleLabel={t.team.roles[member.roleKey]} delayMs={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
