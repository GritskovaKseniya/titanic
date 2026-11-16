// Screenshots the site across widths × themes, for eyeballing a change.
//
//   npm run shot                                   # visible themes, phone + desktop, home
//   npm run shot -- --themes gold --widths 390,768,1280,1920
//   npm run shot -- --route reconstructions --full
//   npm run shot -- --scroll "#details" --lang ru
//
// Options: --widths (default 390,1280) --themes (default: all visible in the
// picker) --lang --route --scroll <css selector> --full (whole page)
// --scale (pixel ratio, default 1) --out (default screenshots/).
// Needs the site running: npm run build && npm run preview.
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, launch, list, openSite, parseArgs, visibleThemes } from './lib/browser.mjs';

const args = parseArgs();
const widths = list(args.widths, ['390', '1280']).map(Number);
const themes = list(args.themes, visibleThemes());
const out = join(ROOT, args.out || 'screenshots');
mkdirSync(out, { recursive: true });

const heightFor = (w) => (w < 640 ? 844 : w < 1024 ? 1024 : 900);
const browser = await launch();
for (const theme of themes) {
  for (const width of widths) {
    const page = await openSite(browser, { route: args.route || '', width, height: heightFor(width), theme, lang: args.lang, scale: Number(args.scale) || 1 });
    if (args.scroll) {
      await page.locator(args.scroll).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(600); // scroll-reveal transitions
    }
    const name = [args.route || 'home', theme, width, args.lang].filter(Boolean).join('-').replace(/[^\w-]/g, '_');
    const file = join(out, `${name}.png`);
    await page.screenshot({ path: file, fullPage: Boolean(args.full) });
    console.log(file);
    await page.close();
  }
}
await browser.close();
