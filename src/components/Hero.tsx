import React, { useEffect, useState } from 'react';
import { ArrowRight, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';
import { resolveImageSrc } from '../utils/publicUrl';
import { splitLastWord } from '../utils/splitAccent';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const episodes = useEpisodes();
  const [copied, setCopied] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  const [titleLead, titleLast] = splitLastWord(t.hero.title);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => setParallaxY(Math.min(window.scrollY, 600) * 0.15);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href.split('#')[0];
    try {
      if (navigator.share) {
        await navigator.share({ title: t.hero.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Share sheet dismissed or clipboard unavailable — no error state worth surfacing.
    }
  };

  return (
    <section id="top" className="grain relative overflow-hidden bg-dark min-h-[640px] sm:min-h-[760px] lg:min-h-[860px]">
      {/* The dusk bow shot — real hero still instead of the old gradient
          placeholder, with a scrim so the text on top stays legible. */}
      <img
        src={resolveImageSrc('hero/night-bow.webp')}
        alt=""
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{ transform: `translateY(calc(${parallaxY}px - 10%)) scale(1.1)`, objectPosition: '75% 45%' }}
      />
      {/* Same shot, blurred, revealed only toward the bottom — so the sea
          softens progressively instead of cutting off. */}
      <img
        src={resolveImageSrc('hero/night-bow.webp')}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        style={{
          transform: `translateY(calc(${parallaxY}px - 10%)) scale(1.1)`,
          objectPosition: '75% 45%',
          filter: 'blur(14px)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 76%, rgb(0 0 0 / 0.06) 82%, rgb(0 0 0 / 0.16) 87%, rgb(0 0 0 / 0.34) 92%, rgb(0 0 0 / 0.62) 96.5%, #000 100%)',
          maskImage: 'linear-gradient(180deg, transparent 76%, rgb(0 0 0 / 0.06) 82%, rgb(0 0 0 / 0.16) 87%, rgb(0 0 0 / 0.34) 92%, rgb(0 0 0 / 0.62) 96.5%, #000 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(100deg, rgb(var(--color-dark)) 0%, rgb(var(--color-dark) / 0.97) 14%, rgb(var(--color-dark) / calc(0.9 * var(--hero-scrim, 1) + 0.1)) 22%, rgb(var(--color-dark) / calc(0.82 * var(--hero-scrim, 1))) 30%, rgb(var(--color-dark) / calc(0.45 * var(--hero-scrim, 1))) 60%, rgb(var(--color-dark) / calc(0.2 * var(--hero-scrim, 1))) 100%), linear-gradient(180deg, rgb(var(--color-dark)) 0%, rgb(var(--color-dark) / 0.6) 8%, rgb(var(--color-dark) / 0.2) 16%, transparent 28%, transparent 76%, rgb(var(--color-dark) / 0.04) 82%, rgb(var(--color-dark) / 0.12) 86%, rgb(var(--color-dark) / 0.26) 90%, rgb(var(--color-dark) / 0.47) 94%, rgb(var(--color-dark) / 0.75) 97.5%, rgb(var(--color-dark)) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-40 sm:pb-52 lg:pb-60">
        <div className="flex items-baseline justify-between border-b hairline pb-4 timecode text-[10px] sm:text-[11px] text-ash uppercase">
          <span>{t.meta.eyebrowLeft}</span>
          <span className="hidden sm:block">{t.meta.eyebrowRight}</span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 pt-7 sm:pt-8">
          <h1 className="font-heading font-semibold uppercase text-bone leading-[1.05] tracking-tight animate-fade-up text-3xl sm:text-4xl lg:text-5xl">
            {titleLead} <span className="text-accent">{titleLast}</span>
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 animate-fade-up">
            <span className="badge badge-archival">{t.meta.genre}</span>
            <span className="timecode text-xs text-ash">{t.meta.year}</span>
            <span className="timecode text-xs text-ash">·</span>
            <span className="timecode text-xs text-ash">{t.episodes.season}</span>
            <span className="timecode text-xs text-ash">·</span>
            <span className="timecode text-xs text-ash">{t.meta.runtime}</span>
          </div>

          <p className="max-w-xl text-base text-ash leading-relaxed animate-fade-up">{t.hero.pitch}</p>

          <div className="flex flex-wrap items-center gap-3 pt-1 animate-fade-up">
            <a href="#episodes" className="btn btn-cta inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base">
              {t.hero.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
            <button onClick={handleShare} className="btn btn-quiet px-4 py-3 text-sm">
              <Share2 className="w-4 h-4" /> {copied ? t.hero.shared : t.hero.share}
            </button>
          </div>

          <div className="animate-fade-up pt-1">
            <span className="slate-label block mb-2">{t.hero.jumpLabel}</span>
            <div className="flex flex-wrap gap-2">
              {episodes.map((ep) => (
                <a
                  key={ep.number}
                  href={`#episode-${ep.number}`}
                  className="timecode text-xs text-ash border hairline rounded-full px-2.5 py-1 hover:text-accent hover:border-accent transition-colors"
                >
                  {String(ep.number).padStart(2, '0')}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
