import React, { useState } from 'react';
import { ArrowRight, Share2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useEpisodes } from '../data/episodes';

const HERO_TABS = [
  { key: 'overview', href: '#top' },
  { key: 'episodes', href: '#episodes' },
  { key: 'gallery', href: '#gallery' },
  { key: 'details', href: '#details' },
] as const;

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const episodes = useEpisodes();
  const [copied, setCopied] = useState(false);

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
    <section id="top" className="grain letterbox relative min-h-[88vh] flex flex-col overflow-hidden bg-dark">
      {/* Deep-sea gradient stands in for a hero still — swap for a real frame
          from the AI gallery once one is chosen (e.g. the dusk bow shot). */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 100%, rgba(241,79,160,0.20), transparent 55%), radial-gradient(ellipse at 85% 0%, rgba(201,150,47,0.16), transparent 50%), linear-gradient(180deg, #050f15 0%, #071820 55%, #0d2530 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 flex-grow flex flex-col pt-8 pb-6">
        <div className="flex items-baseline justify-between border-b hairline pb-4 timecode text-[10px] sm:text-[11px] text-ash uppercase">
          <span>{t.meta.eyebrowLeft}</span>
          <span className="hidden sm:block">{t.meta.eyebrowRight}</span>
        </div>

        <div className="flex-grow flex flex-col justify-center gap-5 sm:gap-6 py-8">
          <h1 className="font-heading font-semibold uppercase text-bone leading-[1.05] tracking-tight animate-fade-up text-[10vw] sm:text-[7vw] lg:text-[5vw]">
            {t.hero.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2.5 animate-fade-up">
            <span className="badge badge-archival">{t.meta.genre}</span>
            <span className="timecode text-xs text-ash">{t.meta.year}</span>
            <span className="timecode text-xs text-ash">·</span>
            <span className="timecode text-xs text-ash">{t.episodes.season}</span>
            <span className="timecode text-xs text-ash">·</span>
            <span className="timecode text-xs text-ash">{t.meta.runtime}</span>
          </div>

          <p className="max-w-2xl text-base md:text-lg text-ash leading-relaxed animate-fade-up">{t.hero.pitch}</p>

          <div className="animate-fade-up">
            <span className="slate-label block mb-2.5">{t.hero.jumpLabel}</span>
            <div className="flex flex-wrap gap-2">
              {episodes.map((ep) => (
                <a
                  key={ep.number}
                  href={`#episode-${ep.number}`}
                  className="timecode text-xs text-ash border hairline px-2.5 py-1 hover:text-accent hover:border-accent transition-colors"
                >
                  {String(ep.number).padStart(2, '0')}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 animate-fade-up">
            <a href="#episodes" className="btn btn-cta inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 text-base sm:text-lg">
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={handleShare}
              className="btn btn-quiet px-5 py-3.5 sm:py-4 text-sm"
            >
              <Share2 className="w-4 h-4" /> {copied ? t.hero.shared : t.hero.share}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6 sm:gap-8 border-t hairline pt-4 overflow-x-auto">
          {HERO_TABS.map((tab, i) => (
            <a
              key={tab.key}
              href={tab.href}
              className={`font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap pb-2 border-b-2 transition-colors ${
                i === 0 ? 'text-accent border-accent' : 'text-ash border-transparent hover:text-bone'
              }`}
            >
              {t.hero.tabs[tab.key]}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
