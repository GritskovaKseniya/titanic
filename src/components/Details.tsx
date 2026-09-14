import React from 'react';
import { Instagram } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTeam } from '../data/team';
import { resolveImageSrc } from '../utils/publicUrl';

export const Details: React.FC = () => {
  const { t } = useLanguage();
  const team = useTeam();

  return (
    <section id="details" className="py-20 sm:py-28 bg-darkSec border-y hairline">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <span className="slate-label">{t.details.label}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
            {t.details.heading}
          </h2>
          <p className="text-ash mt-3 max-w-md">{t.details.description}</p>
        </div>

        <div>
          <div className="grid sm:grid-cols-3 gap-4">
            {team.map((member) => (
              <div key={member.id} className="bg-dark border hairline p-6 flex gap-4 items-start">
                {member.photoUrl && (
                  <img
                    src={resolveImageSrc(member.photoUrl)}
                    alt=""
                    className="w-14 h-14 rounded-full object-cover border hairline shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ash">
                    {t.team.roles[member.roleKey]}
                  </span>
                  <h3 className="text-lg font-heading font-semibold text-bone mt-2">{member.name}</h3>
                  {member.social && (
                    <a
                      href={member.social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-bone transition-colors mt-3"
                    >
                      <Instagram className="w-3.5 h-3.5" /> {member.social.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
