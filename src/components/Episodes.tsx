import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';
import { buildVimeoEmbed } from '../utils/video';
import { resolveImageSrc } from '../utils/publicUrl';

const HUE_GRADIENTS = [
  'linear-gradient(150deg, #123240 0%, #c9962f 60%, #071820 100%)',
  'linear-gradient(150deg, #8b2c63 0%, #f14fa0 55%, #1a2f38 100%)',
  'linear-gradient(150deg, #050f15 0%, #123240 55%, #8b2c63 130%)',
];

export const Episodes: React.FC = () => {
  const { t, language } = useLanguage();
  const episodes = useEpisodes();
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
    <section id="episodes" className="py-14 sm:py-20 lg:py-28 bg-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-7">
            <span className="slate-label">{t.episodes.season}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
              {t.episodes.heading}
            </h2>
          </div>
          <p className="md:col-span-5 text-ash self-end md:justify-self-end max-w-md">{t.episodes.description}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {episodes.map((ep) => {
            const embed = buildVimeoEmbed(ep.vimeoId);
            const thumb = ep.posterUrl ? undefined : { background: HUE_GRADIENTS[ep.number % HUE_GRADIENTS.length] };
            return (
              <article key={ep.number} id={`episode-${ep.number}`} className="group scroll-mt-24">
                <button
                  onClick={() => embed && setOpenEpisode(ep.number)}
                  disabled={!embed}
                  className="relative w-full aspect-video overflow-hidden border hairline text-left disabled:cursor-default"
                  style={thumb}
                >
                  {ep.posterUrl && (
                    // Posters are portrait key art: title card, then the
                    // sitter's face, then the ship lower down. A 16:9 box only
                    // ever shows a slice of one of these — posterFocusY (see
                    // Episode type) targets the face and skips the title text
                    // (it's repeated as plain text right below anyway).
                    <img
                      src={resolveImageSrc(ep.posterUrl)}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: `50% ${ep.posterFocusY ?? 27}%` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="timecode absolute top-2.5 left-2.5 text-[11px] text-bone/90">
                    {String(ep.number).padStart(2, '0')}
                  </span>
                  {embed ? (
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-11 h-11 rounded-full bg-accent/90 flex items-center justify-center">
                        <Play className="w-4 h-4 text-dark ml-0.5" />
                      </span>
                    </span>
                  ) : (
                    <span className="badge badge-archival absolute bottom-2.5 right-2.5">{t.episodes.comingSoon}</span>
                  )}
                </button>

                <div className="mt-3">
                  <h3 className="text-base font-heading font-semibold uppercase text-bone group-hover:text-accent transition-colors">
                    {ep.title[language]}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-goldBright block mt-0.5">
                    {ep.role[language]}
                  </span>
                  <p className={`text-sm text-ash mt-1.5 ${expanded.has(ep.number) ? '' : 'line-clamp-2'}`}>
                    {ep.description[language]}
                  </p>
                  <button
                    onClick={() => toggleExpanded(ep.number)}
                    className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent hover:text-bone transition-colors mt-1"
                  >
                    {expanded.has(ep.number) ? t.episodes.readLess : t.episodes.readMore}
                  </button>
                </div>
              </article>
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
