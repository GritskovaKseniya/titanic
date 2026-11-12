import React from 'react';
import { Play } from 'lucide-react';
import { Episode } from '../data/episodes';
import { Language, TranslationsShape } from '../i18n/translations';
import { resolveImageSrc } from '../utils/publicUrl';
import { useReveal } from '../hooks/useReveal';

export const EpisodeCard: React.FC<{
  ep: Episode;
  language: Language;
  t: TranslationsShape;
  thumbStyle?: React.CSSProperties;
  hasEmbed: boolean;
  expanded: boolean;
  onOpen: () => void;
  onToggleExpanded: () => void;
  delayMs: number;
}> = ({ ep, language, t, thumbStyle, hasEmbed, expanded, onOpen, onToggleExpanded, delayMs }) => {
  const [ref, visible] = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      id={`episode-${ep.number}`}
      className={`group scroll-mt-24 reveal ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
    >
      <button
        onClick={onOpen}
        disabled={!hasEmbed}
        className="relative w-full aspect-video overflow-hidden rounded-2xl border hairline text-left disabled:cursor-default transition-colors group-hover:border-accent/50"
        style={thumbStyle}
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
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            style={{ objectPosition: `50% ${ep.posterFocusY ?? 27}%` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="timecode absolute top-2.5 left-2.5 text-[11px] text-bone/90">
          {String(ep.number).padStart(2, '0')}
        </span>
        {hasEmbed ? (
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
        <p className={`text-sm text-ash mt-1.5 ${expanded ? '' : 'line-clamp-2'}`}>{ep.description[language]}</p>
        <button
          onClick={onToggleExpanded}
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent hover:text-bone transition-colors mt-1"
        >
          {expanded ? t.episodes.readLess : t.episodes.readMore}
        </button>
      </div>
    </article>
  );
};
