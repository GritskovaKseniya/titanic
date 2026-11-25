import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';
import { useSiteSettings } from '../data/siteSettings';
import { buildVimeoEmbed } from '../utils/video';
import { VideoModal } from './VideoModal';
import { resolveImageSrc } from '../utils/publicUrl';
import { splitLastWord } from '../utils/splitAccent';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { trailerVimeoId } = useSiteSettings();
  const hasTrailer = !!buildVimeoEmbed(trailerVimeoId);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const ctaClass = 'btn btn-cta inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base';
  const ctaContent = (
    <>
      {t.hero.cta}
      <ChevronRight className="arrow w-5 h-5 transition-transform duration-150" strokeWidth={3} />
    </>
  );
  const episodes = useEpisodes();
  const [parallaxY, setParallaxY] = useState(0);

  const [titleLead, titleLast] = splitLastWord(t.hero.title);
  const episodeWord = t.meta.episodeWord[new Intl.PluralRules(language).select(episodes.length)] ?? t.meta.episodeWord.other;

  // Episode chips: glide to the card, then outline it for a second so the eye
  // lands on the right one.
  const jumpToEpisode = (e: React.MouseEvent, number: number) => {
    const card = document.getElementById(`episode-${number}`);
    const thumb = card?.querySelector('.episode-thumb');
    if (!card || !thumb) return;
    e.preventDefault();
    history.replaceState(null, '', `#episode-${number}`);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    let started = false;
    const flash = () => {
      if (started) return;
      started = true;
      thumb.classList.add('episode-flash');
      setTimeout(() => thumb.classList.remove('episode-flash'), 1000);
    };
    window.addEventListener('scrollend', flash, { once: true });
    setTimeout(flash, 900); // no scrollend (already in place, or older browsers)
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => setParallaxY(Math.min(window.scrollY, 600) * 0.15);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The photo is sized by the hero's own height, not the screen width: its
  // frame is the section plus 10rem hanging under the start of the episodes
  // (drawn on top, transparent), the image fills that height and is pinned
  // right. So the ship sits the same way next to the text on any screen —
  // top of the mast near the header, hull level with the episode chips —
  // instead of growing with the width and sinking below the text on wide
  // monitors. Where the screen is wider than the photo, its left edge fades
  // into the background (that side is under the text scrim anyway).
  return (
    <section id="top" className="grain relative">
      <div className="absolute inset-x-0 top-0 z-0 overflow-hidden h-[calc(100%+10rem)] pointer-events-none" aria-hidden="true">
        {/* The dusk bow shot, with a scrim so the text on top stays legible. */}
        <img
          src={resolveImageSrc('hero/night-bow.webp')}
          alt=""
          className="absolute top-0 right-0 h-full w-auto max-w-none"
          style={{
            // Narrower than the photo (phones, tablets): slide it right so
            // the bow area stays in view, as object-position 75% would — the
            // photo's 75% point on the screen's 75% point. Never further left
            // than pinned to the right edge.
            transform: `translateX(max(0px, calc(25% - 25vw))) translateY(calc(${parallaxY}px - 16%)) scale(1.1)`,
            maskImage: 'linear-gradient(to right, transparent 0, #000 30%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 30%)',
          }}
        />
        {/* Horizontal scrim for text legibility on the left, plus a vertical
            fade into rgb(var(--color-dark)), the page's own background, fully
            opaque by 85%: the photo is lifted 16%, so its bottom edge sits at
            ~89% of the frame and would show as a seam otherwise. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgb(var(--color-dark) / calc(0.96 * var(--hero-scrim, 1))) 0%, rgb(var(--color-dark) / calc(0.82 * var(--hero-scrim, 1))) 30%, rgb(var(--color-dark) / calc(0.45 * var(--hero-scrim, 1))) 60%, rgb(var(--color-dark) / calc(0.2 * var(--hero-scrim, 1))) 100%), linear-gradient(180deg, transparent 0%, transparent 50%, rgb(var(--color-dark)) 85%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-8 sm:pb-10">
        <div className="flex items-baseline justify-between border-b hairline pb-4 timecode text-[10px] sm:text-[11px] text-ash uppercase">
          <span>{t.meta.eyebrowLeft}</span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 pt-7 sm:pt-8">
          <h1 className="font-heading font-semibold uppercase text-bone leading-[1.05] tracking-tight animate-fade-up text-3xl sm:text-4xl lg:text-5xl">
            {titleLead} <span className="text-accent">{titleLast}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 animate-fade-up">
            <span className="badge badge-archival">{t.meta.genre}</span>
            {/* "10 episodes · 25–30 min each · 2026": says plainly what the
                minutes refer to. "Season 1" only heads the episodes section. */}
            {/* One run of text; the no-break space before each dot means a
                narrow screen wraps after a dot, never in front of one. */}
            <span className="timecode text-xs text-ash">
              {[`${episodes.length} ${episodeWord}`, t.meta.runtime, t.meta.year].join('\u00a0· ')}
            </span>
          </div>

          <p className="max-w-xl text-base text-ash leading-relaxed animate-fade-up">{t.hero.pitch}</p>

          <div className="hero-cta-row flex flex-wrap items-center gap-3 pt-1 animate-fade-up">
            {/* Plays the series trailer; without one configured it falls back
                to scrolling to the episodes. */}
            {hasTrailer ? (
              <button type="button" onClick={() => setTrailerOpen(true)} className={ctaClass}>
                {ctaContent}
              </button>
            ) : (
              <a href="#episodes" className={ctaClass}>
                {ctaContent}
              </a>
            )}
          </div>

          {/* Gap + padding below the button: 2rem on phones, 2.5rem from sm up.
              Chips are 2.75rem (44px) — a comfortable finger target. */}
          <div className="hero-jump-to animate-fade-up pt-4 sm:pt-5">
            <span className="slate-label block mb-2.5">{t.hero.jumpLabel}</span>
            <div className="flex flex-wrap gap-2">
              {episodes.map((ep) => (
                <a
                  key={ep.number}
                  href={`#episode-${ep.number}`}
                  onClick={(e) => jumpToEpisode(e, ep.number)}
                  className="jump-chip timecode inline-flex items-center justify-center w-11 h-11 text-[0.9375rem] text-ash border hairline rounded-full transition-colors
                             hover:text-accent hover:border-accent active:bg-accent active:border-accent active:text-dark"
                >
                  {String(ep.number).padStart(2, '0')}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {trailerOpen && <VideoModal video={trailerVimeoId} title={t.hero.cta} onClose={() => setTrailerOpen(false)} />}
    </section>
  );
};
