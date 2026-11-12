import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';
import { buildVimeoEmbed } from '../utils/video';
import { splitLastWord } from '../utils/splitAccent';
import { EpisodeCard } from './EpisodeCard';

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
  const activeEmbed = active ? buildVimeoEmbed(active.vimeoId) : null;

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                delayMs={(i % 3) * 90}
              />
            );
          })}
        </div>
      </div>

      {activeEmbed && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpenEpisode(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpenEpisode(null)}
              className="absolute -top-10 right-0 text-bone hover:text-accent transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video bg-black border hairline overflow-hidden">
              <iframe
                key={activeEmbed}
                src={activeEmbed}
                title={active?.title[language]}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
