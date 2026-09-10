import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 flex-grow flex flex-col pt-8 pb-10">
        <div className="flex items-baseline justify-between border-b hairline pb-4 timecode text-[10px] sm:text-[11px] text-ash uppercase">
          <span>{t.meta.eyebrowLeft}</span>
          <span className="hidden sm:block">{t.meta.eyebrowRight}</span>
        </div>

        <div className="flex-grow flex flex-col justify-center gap-6 sm:gap-8">
          <h1 className="font-heading font-semibold uppercase text-bone leading-[1.05] tracking-tight animate-fade-up text-[10vw] sm:text-[7vw] lg:text-[5vw]">
            {t.hero.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-end border-t hairline pt-6">
            <p className="md:col-span-7 lg:col-span-6 text-base md:text-lg text-ash leading-relaxed animate-fade-up">
              {t.hero.pitch}
            </p>
            <div className="md:col-span-5 lg:col-span-6 flex flex-wrap md:justify-end items-center gap-4 md:gap-6 animate-fade-up">
              <span className="timecode text-xs text-ash order-2 md:order-1 hidden sm:block">{t.hero.subline}</span>
              <a
                href="#episodes"
                className="btn btn-cta order-1 md:order-2 inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 text-base sm:text-lg w-full sm:w-auto justify-center"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
