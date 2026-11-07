import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-dark border-t hairline">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="slate-label">{t.about.label}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-heading font-semibold uppercase text-bone leading-[1.05]">
            {t.about.heading}
          </h2>
          <p className="text-ash mt-4 leading-relaxed">{t.about.paragraph1}</p>
          <p className="text-ash mt-4 leading-relaxed">{t.about.paragraph2}</p>
        </div>
      </div>
    </section>
  );
};
