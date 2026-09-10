import React from 'react';
import { Anchor, Instagram, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-darkSec border-t hairline py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-2">
            <Anchor className="w-5 h-5 text-accent" />
            <div>
              <p className="font-heading font-semibold uppercase text-bone tracking-[0.04em]">{t.hero.title}</p>
              <p className="text-sm text-ash mt-1 max-w-sm">{t.footer.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="text-ash hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:hello@example.com" className="text-ash hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="border-t hairline mt-8 pt-6 timecode text-[11px] text-ash">
          © {year} {t.hero.title} — {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};
