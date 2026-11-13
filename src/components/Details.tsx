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
          -translate-y-[28.3%], so the tip pokes up into About and the
          submerged body sits in here. */}
      <div
        ref={icebergRef}
        aria-hidden="true"
        className={`absolute top-0 -right-8 lg:-right-20 w-[220vw] sm:w-[110vw] max-w-none sm:max-w-[1500px] opacity-10 -translate-y-[28.3%] transition-transform duration-[1400ms] ease-out motion-reduce:transition-none ${
          icebergVisible ? 'translate-x-0' : 'translate-x-24'
        }`}
      >
        <div className="relative text-accent">
          <IcebergBlueprint className="w-full h-auto" />
          {/* Same sweep as the seam line, stretched to the iceberg's full height (tip included — this box matches the SVG's own bounds) so it washes over the whole silhouette, not just the 1px waterline. */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <span
              className={`absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-accent to-transparent ${
                icebergVisible ? 'animate-seam-sweep' : 'opacity-0'
              }`}
            />
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} roleLabel={t.team.roles[member.roleKey]} delayMs={(i % 3) * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
