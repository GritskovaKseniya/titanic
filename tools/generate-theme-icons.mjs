// Generates a theme's browser-tab icon, home-screen icons and per-language
// web manifests into public/, all from one anchor glyph in two colors.
//
//   npm run icons -- gold            # one set
//   npm run icons -- gold classic    # several
//   npm run icons -- --all
//
// Needs Playwright — see tools/README.md.
//
// To add a theme: add a set below, run the tool for it, then map the theme
// to the set in ICON_SETS / iconSetFor in src/components/ThemeSwitcher.tsx.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, launch } from './lib/browser.mjs';

const PUBLIC = join(ROOT, 'public');

// suffix: '' for the default set (favicon.svg, icons/icon-192.png, …),
// '-<id>' otherwise. Manifests are always manifests/<id>-<lang>.webmanifest.
const SETS = {
  default: { suffix: '', bg: '#0B0A0F', fg: '#0EA5E9' },
  classic: { suffix: '-classic', bg: '#0B131D', fg: '#9FB1C4' },
  gold: { suffix: '-gold', bg: '#090A0F', fg: '#C2A064' },
};

// Home-screen name per language — keep in sync with HOME_SCREEN_NAME in
// src/i18n/translations.ts.
const LANGS = { en: 'Titanic', ru: 'Титаник', fr: 'Titanic', es: 'Titanic', de: 'Titanic', it: 'Titanic' };

const anchor = (fg) => `<g transform="translate(3.5 3.5) scale(0.73)" fill="none" stroke="${fg}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22V8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
    <circle cx="12" cy="5" r="3" />
  </g>`;
const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">\n  ${inner}\n</svg>\n`;

const variants = ({ bg, fg }) => ({
  // Browser tab: rounded tile.
  favicon: svg(`<rect width="24" height="24" rx="5" fill="${bg}" />\n  ${anchor(fg)}`),
  // Home screen: full-bleed square — the OS applies its own corner mask, and
  // iOS fills transparent corners with black.
  any: svg(`<rect width="24" height="24" fill="${bg}" />\n  ${anchor(fg)}`),
  // Android adaptive icons crop to a circle: shrink the glyph into the safe zone.
  maskable: svg(`<rect width="24" height="24" fill="${bg}" />\n  <g transform="translate(12 12) scale(0.8) translate(-12 -12)">${anchor(fg)}</g>`),
});

const manifest = (id, { suffix, bg, fg }, name) => ({
  name,
  short_name: name,
  description: 'Документальный сериал о «Титанике»: архивная хроника и ИИ-реконструкции утраченных сцен.',
  start_url: '../',
  scope: '../',
  display: 'standalone',
  background_color: bg,
  theme_color: fg,
  icons: [
    { src: `../icons/icon${suffix}-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: `../icons/icon${suffix}-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: `../icons/icon${suffix}-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
});

const args = process.argv.slice(2);
const ids = args.includes('--all') ? Object.keys(SETS) : args;
const unknown = ids.filter((id) => !SETS[id]);
if (!ids.length || unknown.length) {
  if (unknown.length) console.error(`Unknown set: ${unknown.join(', ')}`);
  console.error(`Usage: npm run icons -- <${Object.keys(SETS).join('|')}>… | --all`);
  process.exit(1);
}

const browser = await launch();
const renderPng = async (svgText, size, file) => {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const sized = svgText.replace('width="24" height="24"', `width="${size}" height="${size}"`);
  await page.setContent(`<!doctype html><html><body style="margin:0">${sized}</body></html>`);
  await page.screenshot({ path: file, omitBackground: true });
  await page.close();
};

mkdirSync(join(PUBLIC, 'icons'), { recursive: true });
mkdirSync(join(PUBLIC, 'manifests'), { recursive: true });

for (const id of ids) {
  const set = SETS[id];
  const v = variants(set);
  writeFileSync(join(PUBLIC, `favicon${set.suffix}.svg`), v.favicon);
  await renderPng(v.any, 180, join(PUBLIC, `apple-touch-icon${set.suffix}.png`));
  await renderPng(v.any, 192, join(PUBLIC, `icons/icon${set.suffix}-192.png`));
  await renderPng(v.any, 512, join(PUBLIC, `icons/icon${set.suffix}-512.png`));
  await renderPng(v.maskable, 512, join(PUBLIC, `icons/icon${set.suffix}-maskable-512.png`));
  for (const [lang, name] of Object.entries(LANGS)) {
    writeFileSync(join(PUBLIC, `manifests/${id}-${lang}.webmanifest`), JSON.stringify(manifest(id, set, name), null, 2) + '\n');
  }
  console.log(`✓ ${id}`);
}

await browser.close();
