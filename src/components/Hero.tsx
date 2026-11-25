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

  // The photo frame's height tracks width (55vw ≈ the photo's own ~1.8:1
  // frame), so the ship keeps the same composition on any screen; 640px
  // floor on phones. The section itself is only as tall as its text: the
  // frame hangs below it, under the start of the episodes (which are drawn
  // on top, transparent), and fades out there — no empty band between the
  // episode chips and "Season 1", and nothing of the ship cropped.
  return (
    <section id="top" className="grain relative">
      <div
        className="absolute inset-x-0 top-0 z-0 overflow-hidden h-[max(100%,clamp(640px,55vw,1400px))] pointer-events-none"
        aria-hidden="true"
      >
        {/* The dusk bow shot, with a scrim so the text on top stays legible. */}
        <img
          src={resolveImageSrc('hero/night-bow.webp')}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translateY(calc(${parallaxY}px - 10%)) scale(1.1)`, objectPosition: '75% 45%' }}
        />
        {/* Horizontal scrim for text legibility on the left, plus a vertical
            fade into rgb(var(--color-dark)), the page's own background, fully
            opaque by 90%: the photo is shifted up 10%, so its bottom edge sits
            at ~95% of the frame and would show as a seam otherwise. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgb(var(--color-dark) / calc(0.96 * var(--hero-scrim, 1))) 0%, rgb(var(--color-dark) / calc(0.82 * var(--hero-scrim, 1))) 30%, rgb(var(--color-dark) / calc(0.45 * var(--hero-scrim, 1))) 60%, rgb(var(--color-dark) / calc(0.2 * var(--hero-scrim, 1))) 100%), linear-gradient(180deg, transparent 0%, transparent 55%, rgb(var(--color-dark)) 90%)',
          }}
        />
      </div>
      {/* Caps how far the photo reaches under the episodes: from just above
          the section's end it fades to the page color within 12rem. On wide
          screens the frame is much taller than the text, and its lower half
          (the hull) would otherwise sit behind the season intro and cards. */}
      <div
        className="absolute inset-x-0 top-[calc(100%-2rem)] z-0 h-[clamp(640px,55vw,1400px)] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0, rgb(var(--color-dark)) 12rem)' }}
        aria-hidden="true"
      />

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
