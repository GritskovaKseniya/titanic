import React, { useState } from 'react';
import { Anchor, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/translations';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
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
            <label className="flex items-center gap-1.5 text-ash hover:text-bone transition-colors cursor-pointer">
              <Globe className="w-4 h-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as typeof language)}
                className="bg-transparent text-xs font-bold uppercase cursor-pointer focus:outline-none [&>option]:bg-dark [&>option]:text-bone"
                aria-label="Switch language"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
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
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Globe className="w-4 h-4 text-ash" />
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`text-xs font-bold uppercase px-2 py-1 border hairline transition-colors ${
                  language === l.code ? 'text-accent border-accent' : 'text-ash hover:text-bone'
                }`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
