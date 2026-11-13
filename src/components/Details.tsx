import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTeam } from '../data/team';
import { splitLastWord } from '../utils/splitAccent';
import { TeamCard } from './TeamCard';
import { SectionSeam } from './SectionSeam';

export const Details: React.FC = () => {
  const { t } = useLanguage();
  const team = useTeam();
  const [headingLead, headingLast] = splitLastWord(t.details.heading);

  return (
    <section id="details" className="relative py-12 sm:py-16 lg:py-20 bg-darkSec border-b hairline">
      <SectionSeam className="absolute top-0 left-0 w-full" />
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
