import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { Language, LANGUAGES } from '../i18n/translations';

export const LanguageSwitcher: React.FC<{
  language: Language;
  onChange: (lang: Language) => void;
}> = ({ language, onChange }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-ash hover:text-bone transition-colors text-xs font-bold uppercase rounded-full px-3 py-1.5 hover:bg-white/5"
      >
        <Globe className="w-4 h-4" />
        {language}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 min-w-[140px] rounded-2xl border border-white/10 bg-darkSec/80 backdrop-blur-lg shadow-xl shadow-black/40 p-1.5 z-50"
        >
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={language === l.code}
              onClick={() => {
                onChange(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-xs transition-colors ${
                language === l.code ? 'text-accent bg-white/5' : 'text-ash hover:text-bone hover:bg-white/5'
              }`}
            >
              <span>{l.label}</span>
              <span className="font-mono uppercase text-[10px] opacity-70">{l.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
