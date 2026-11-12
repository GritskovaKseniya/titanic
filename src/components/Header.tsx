import React, { useEffect, useState } from 'react';
import { Anchor, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGUAGES } from '../i18n/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  // Fully see-through over the hero still; once scrolled past it, a glassy
  // backing fades in so the nav stays legible over the sections beneath.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#episodes', label: t.nav.episodes },
    { href: '#details', label: t.nav.details },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-dark/50 backdrop-blur-md border-b border-white/5' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14">
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
            <LanguageSwitcher language={language} onChange={setLanguage} />
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
                className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full border hairline transition-colors ${
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
