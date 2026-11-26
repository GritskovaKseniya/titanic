// Shared bits for the tools/ scripts: Playwright loading, site URL, and
// opening the site with a given theme/language/viewport.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// The site as served by `npm run preview` (vite base is /titanic/).
export const SITE_URL = (process.env.SITE_URL || 'http://localhost:4173/titanic/').replace(/\/?$/, '/');

export const LANGS = ['en', 'ru', 'fr', 'es', 'de', 'it'];

// localStorage keys the app reads on load (ThemeSwitcher / LanguageContext).
const THEME_KEY = 'titanic-theme-preview';
const LANG_KEY = 'titanic-site-language';

// Themes a visitor can pick, read from the THEMES list in ThemeSwitcher.tsx
// (entries with `hidden: true` are skipped), so checks follow the picker.
export function visibleThemes() {
  const src = readFileSync(join(ROOT, 'src/components/ThemeSwitcher.tsx'), 'utf8');
  return [...src.matchAll(/\{\s*id:\s*'([^']+)'[^}]*\}/g)].filter((m) => !/hidden:\s*true/.test(m[0])).map((m) => m[1]);
}

export async function launch() {
  let chromium;
  try {
    // require() rather than import(): ESM resolution ignores NODE_PATH.
    ({ chromium } = createRequire(import.meta.url)('playwright'));
  } catch {
    console.error('Playwright not found. Install it: npm i --no-save playwright && npx playwright install chromium');
    process.exit(1);
  }
  return chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
}

// Opens `route` (relative to SITE_URL) with the theme/language preset before
// the app boots, and collects console/page errors on `page.errors`.
// `device`: 'phone' (touch screen, as Android Chrome), 'iphone' (touch, iOS
// user agent, no element fullscreen — like iPhone Safari), or desktop.
const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
export async function openSite(browser, { route = '', width = 1280, height = 900, theme, lang, scale = 1, device } = {}) {
  const touch = device === 'phone' || device === 'iphone';
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: scale,
    ...(touch && { isMobile: true, hasTouch: true }),
    ...(device === 'iphone' && { userAgent: IPHONE_UA }),
  });
  if (device === 'iphone') await page.addInitScript(() => delete Element.prototype.requestFullscreen);
  page.errors = [];
  page.on('console', (m) => m.type() === 'error' && page.errors.push(m.text()));
  page.on('pageerror', (e) => page.errors.push(String(e)));
  await page.addInitScript(
    ([tk, t, lk, l]) => {
      if (t) localStorage.setItem(tk, t);
      if (l) localStorage.setItem(lk, l);
    },
    [THEME_KEY, theme, LANG_KEY, lang],
  );
  try {
    await page.goto(SITE_URL + route.replace(/^\//, ''), { waitUntil: 'networkidle' });
  } catch (e) {
    console.error(`Can't open ${SITE_URL} — is it running? (npm run build && npm run preview)\n${e.message}`);
    process.exit(1);
  }
  await page.waitForTimeout(300); // reveal/fade-in animations
  return page;
}

// Minimal --flag value parser: { widths: '390,1280', full: true, _: [...] }.
export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) out._.push(a);
    else if (argv[i + 1] === undefined || argv[i + 1].startsWith('--')) out[a.slice(2)] = true;
    else out[a.slice(2)] = argv[++i];
  }
  return out;
}

export const list = (v, fallback) => (typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter(Boolean) : fallback);
