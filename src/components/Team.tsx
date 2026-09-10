import React from 'react';
import { Instagram } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { team } from '../data/team';

export const Team: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="team" className="py-20 sm:py-28 bg-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <span className="slate-label">{t.team.label}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
            {t.team.heading}
          </h2>
          <p className="text-ash mt-3 max-w-md">{t.team.description}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {team.map((member) => (
            <div key={member.id} className="bg-darkSec border hairline p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-goldBright">
                {t.team.roles[member.roleKey]}
              </span>
              <h3 className="text-lg font-heading font-semibold text-bone mt-2 mb-3">{member.name}</h3>
              <a
                href={member.social.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-bone transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" /> {member.social.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
