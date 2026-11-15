import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

// Temporary tool for picking a final color palette — lets Kseniia preview
// alternatives on the real site instead of asking for a new build each time.
// Remove this component (and the [data-theme] blocks in index.css) once one wins.
const THEMES: { id: string; label: string; swatch: string }[] = [
  { id: 'coral', label: 'Коралл (первый вариант)', swatch: '#F14FA0' },
  { id: 'green', label: 'Зелёный', swatch: '#3EB386' },
  { id: 'red', label: 'Красный (Netflix)', swatch: '#E50914' },
  { id: 'brightgreen', label: 'Ярко-зелёный (Hulu)', swatch: '#1CE783' },
  { id: 'blue', label: 'Ледяной бирюзово-синий', swatch: '#0EA5E9' },
  { id: 'blue-serif', label: 'Ледяной бирюзово-синий + сериф', swatch: '#0EA5E9' },
  { id: 'blue-sapphire', label: 'Сапфировый (строгий)', swatch: '#60A5FA' },
  { id: 'blue-steel', label: 'Холодный стальной', swatch: '#5B9BD5' },
  { id: 'wine-ruby', label: 'Рубиново-винный', swatch: '#E11D48' },
  { id: 'wine-bordeaux', label: 'Королевский бордо', swatch: '#C81E51' },
  { id: 'wine-steel', label: 'Винный + холодный стальной', swatch: '#BE123C' },
  { id: 'classic', label: 'Классика (сериф, монохром)', swatch: '#9FB1C4' },
];

const STORAGE_KEY = 'titanic-theme-preview';

export const ThemeSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('blue');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (theme === 'blue') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme;
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing or storage disabled — the toggle still works, it just won't persist.
    }
  }, [theme]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="rounded-2xl border border-white/10 bg-darkSec/95 backdrop-blur-lg shadow-xl shadow-black/40 p-2 w-60">
          <span className="block px-2 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
            Тест палитры
          </span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-colors ${
                theme === t.id ? 'bg-white/10 text-bone' : 'text-ash hover:text-bone hover:bg-white/5'
              }`}
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                style={{ background: t.swatch }}
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Переключить тестовую палитру"
        aria-expanded={open}
        className="w-11 h-11 rounded-full bg-darkSec border border-white/10 shadow-lg shadow-black/40 flex items-center justify-center text-ash hover:text-bone hover:border-white/20 transition-colors"
      >
        <Palette className="w-4.5 h-4.5" />
      </button>
    </div>
  );
};
