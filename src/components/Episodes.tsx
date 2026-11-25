import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';
import { buildVimeoEmbed } from '../utils/video';
import { splitLastWord } from '../utils/splitAccent';
import { EpisodeCard } from './EpisodeCard';
import { VideoModal } from './VideoModal';

const HUE_GRADIENTS = [
  'linear-gradient(150deg, rgb(var(--color-dark-tertiary)) 0%, rgb(var(--color-accent)) 60%, rgb(var(--color-dark)) 100%)',
  'linear-gradient(150deg, rgb(var(--color-primary)) 0%, rgb(var(--color-accent) / 0.75) 55%, rgb(var(--color-dark-sec)) 100%)',
  'linear-gradient(150deg, rgb(var(--color-dark)) 0%, rgb(var(--color-dark-tertiary)) 55%, rgb(var(--color-primary)) 130%)',
];

export const Episodes: React.FC = () => {
  const { t, language } = useLanguage();
  const episodes = useEpisodes();
  const [headingLead, headingLast] = splitLastWord(t.episodes.heading);
  const [openEpisode, setOpenEpisode] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleExpanded = (number: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(number) ? next.delete(number) : next.add(number);
      return next;
    });

  const active = episodes.find((e) => e.number === openEpisode);

  return (
    <section id="episodes" className="py-12 sm:py-16 lg:py-20 bg-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-7">
            <span className="slate-label">{t.episodes.season}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
              {headingLead} <span className="text-accent">{headingLast}</span>
            </h2>
          </div>
          <p className="md:col-span-5 text-ash self-end md:justify-self-end max-w-md">{t.episodes.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {episodes.map((ep, i) => {
            const embed = buildVimeoEmbed(ep.vimeoId);
            const thumb = ep.posterUrl ? undefined : { background: HUE_GRADIENTS[ep.number % HUE_GRADIENTS.length] };
            return (
              <EpisodeCard
                key={ep.number}
                ep={ep}
                language={language}
                t={t}
                thumbStyle={thumb}
                hasEmbed={!!embed}
                expanded={expanded.has(ep.number)}
                onOpen={() => embed && setOpenEpisode(ep.number)}
                onToggleExpanded={() => toggleExpanded(ep.number)}
                delayMs={(i % 2) * 90}
              />
            );
          })}
        </div>
      </div>

      {active && (
        <VideoModal key={active.number} video={active.vimeoId} title={active.title[language]} onClose={() => setOpenEpisode(null)} />
      )}
    </section>
  );
};
