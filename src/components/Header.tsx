import React, { useState } from 'react';
import { Anchor, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Header: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#episodes', label: t.nav.episodes },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#details', label: t.nav.details },
  ];

  return (
    <header className="sticky top-0 z-40 bg-dark/90 backdrop-blur-md border-b hairline">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-2 group">
            <Anchor className="w-5 h-5 text-accent group-hover:text-goldBright transition-colors" />
            <span className="font-heading font-semibold uppercase tracking-[0.06em] text-bone text-sm sm:text-base">
              {t.hero.title}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ash hover:text-bone transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-ash hover:text-bone transition-colors"
              title="Switch language / Сменить язык"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">{language}</span>
            </button>
          </nav>

          <button
            className="md:hidden text-bone p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t hairline bg-darkSec px-5 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ash hover:text-bone transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-ash hover:text-bone transition-colors pt-1"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{language === 'ru' ? 'English' : 'Русский'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
