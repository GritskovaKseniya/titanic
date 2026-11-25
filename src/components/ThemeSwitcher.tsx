import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { HOME_SCREEN_NAME } from '../i18n/translations';

// Temporary tool for picking a final color palette — lets Kseniia preview
// alternatives on the real site instead of asking for a new build each time.
// Remove this component (and the [data-theme] blocks in index.css) once one wins.
// `hidden: true` keeps a theme's CSS/manifest/etc. in the codebase but drops
// it from the picker below — for options that have been ruled out without
// deleting the work, in case one of them comes back into consideration.
const THEMES: { id: string; label: string; swatch: string; hidden?: boolean }[] = [
  { id: 'coral', label: 'Коралл (первый вариант)', swatch: '#F14FA0', hidden: true },
  { id: 'green', label: 'Зелёный', swatch: '#3EB386', hidden: true },
  { id: 'red', label: 'Красный (Netflix)', swatch: '#E50914', hidden: true },
  { id: 'brightgreen', label: 'Ярко-зелёный (Hulu)', swatch: '#1CE783', hidden: true },
  { id: 'blue', label: 'Ледяной бирюзово-синий', swatch: '#0EA5E9', hidden: true },
  { id: 'blue-serif', label: 'Ледяной бирюзово-синий + сериф', swatch: '#0EA5E9', hidden: true },
  { id: 'blue-sapphire', label: 'Сапфировый (строгий)', swatch: '#60A5FA', hidden: true },
  { id: 'blue-steel', label: 'Холодный стальной', swatch: '#5B9BD5', hidden: true },
  { id: 'wine-ruby', label: 'Рубиново-винный', swatch: '#E11D48', hidden: true },
  { id: 'wine-bordeaux', label: 'Королевский бордо', swatch: '#C81E51', hidden: true },
  { id: 'wine-steel', label: 'Винный + холодный стальной', swatch: '#BE123C', hidden: true },
  { id: 'classic', label: 'Классика (сериф, монохром)', swatch: '#9FB1C4', hidden: true },
  { id: 'gold', label: 'Золотой', swatch: '#B68E53' },
];

// Browser-tab icon, home-screen icon/manifest and browser chrome color per
// theme. Both ice-blue options share one palette, so they share the default
// set; hidden themes fall back to it too. Files live in public/ — favicon*.svg,
// apple-touch-icon*.png, icons/icon-<set>-*.png, manifests/<set>-<lang>.webmanifest.
const ICON_SETS = {
  default: { suffix: '', themeColor: '#0EA5E9' },
  classic: { suffix: '-classic', themeColor: '#9FB1C4' },
  gold: { suffix: '-gold', themeColor: '#C2A064' },
} as const;
type IconSet = keyof typeof ICON_SETS;
const iconSetFor = (theme: string): IconSet => (theme === 'classic' || theme === 'gold' ? theme : 'default');

const STORAGE_KEY = 'titanic-theme-preview';

// Gold is the chosen palette: the site always uses it and the picker button
// is gone (a theme saved from the picker earlier is ignored). To bring the
// picker back, set this to true and un-hide the themes to offer above.
const PICKER_ENABLED = false;
const FIXED_THEME = 'gold';

export const ThemeSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(PICKER_ENABLED ? 'blue' : FIXED_THEME);
  const { language } = useLanguage();

  useEffect(() => {
    if (!PICKER_ENABLED) return;
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
      if (PICKER_ENABLED) localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing or storage disabled — the toggle still works, it just won't persist.
    }

    // Icons, manifest and chrome color are static files/tags that can't read
    // the page's CSS variables, so swap them to the current theme's set. The
    // manifest's name follows the site language too (one pre-built file per
    // set × language). iOS snapshots the home-screen icon at add-time, so a
    // theme switch only affects icons added after it.
    const set = iconSetFor(theme);
    const { suffix, themeColor } = ICON_SETS[set];
    const base = import.meta.env.BASE_URL;
    const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (faviconLink) faviconLink.href = `${base}favicon${suffix}.svg`;
    const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (manifestLink) manifestLink.href = `${base}manifests/${set}-${language}.webmanifest`;
    const appleIconLink = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    if (appleIconLink) appleIconLink.href = `${base}apple-touch-icon${suffix}.png`;
    const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (themeColorMeta) themeColorMeta.content = themeColor;
    const appleTitleMeta = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-title"]');
    if (appleTitleMeta) appleTitleMeta.content = HOME_SCREEN_NAME[language];
  }, [theme, language]);

  if (!PICKER_ENABLED) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="rounded-2xl border border-white/10 bg-darkSec/95 backdrop-blur-lg shadow-xl shadow-black/40 p-2 w-60">
          <span className="block px-2 pb-1.5 pt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
            Тест палитры
          </span>
          {THEMES.filter((t) => !t.hidden).map((t) => (
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
