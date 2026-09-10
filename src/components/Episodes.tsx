import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';
import { buildVimeoEmbed } from '../utils/video';

export const Episodes: React.FC = () => {
  const { t, language } = useLanguage();
  const episodes = useEpisodes();
  const [openEpisode, setOpenEpisode] = useState<number | null>(null);

  const active = episodes.find((e) => e.number === openEpisode);
  const activeEmbed = active ? buildVimeoEmbed(active.vimeoId) : null;

  return (
    <section id="episodes" className="py-20 sm:py-28 bg-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-7">
            <span className="slate-label">{t.episodes.label}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
              {t.episodes.heading}
            </h2>
          </div>
          <p className="md:col-span-5 text-ash self-end md:justify-self-end max-w-md">{t.episodes.description}</p>
        </div>

        <div className="border-t hairline">
          {episodes.map((ep) => {
            const embed = buildVimeoEmbed(ep.vimeoId);
            return (
              <div
                key={ep.number}
                className="group grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[4.5rem_1fr_auto] gap-4 sm:gap-6 items-center border-b hairline py-5 sm:py-6 hover:bg-darkSec/60 transition-colors sm:px-3 sm:-mx-3"
              >
                {ep.posterUrl ? (
                  <img
                    src={ep.posterUrl}
                    alt=""
                    className="w-full aspect-[2/3] object-cover border hairline"
                  />
                ) : (
                  <span className="timecode text-ash text-sm sm:text-base">{String(ep.number).padStart(2, '0')}</span>
                )}
                <div className="min-w-0">
                  {ep.posterUrl && (
                    <span className="timecode text-ash text-xs block mb-1">{String(ep.number).padStart(2, '0')}</span>
                  )}
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-heading font-semibold uppercase text-bone group-hover:text-accent transition-colors">
                      {ep.title[language]}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-goldBright">
                      {ep.role[language]}
                    </span>
                  </div>
                  <p className="text-sm text-ash mt-1 line-clamp-2 max-w-2xl">{ep.description[language]}</p>
                </div>
                {embed ? (
                  <button
                    onClick={() => setOpenEpisode(ep.number)}
                    className="btn btn-quiet px-4 py-2 text-xs font-mono uppercase tracking-[0.1em] shrink-0"
                  >
                    <Play className="w-3.5 h-3.5" /> {t.episodes.watch}
                  </button>
                ) : (
                  <span className="badge badge-archival shrink-0">{t.episodes.comingSoon}</span>
                )}
              </div>
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
