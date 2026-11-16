// Prints element sizes/positions at several widths — for tuning layout
// numbers (section heights, gaps) against what actually renders.
//
//   npm run measure -- "#top" "#episodes .slate-label"
//   npm run measure -- "#top" --widths 768,1920 --theme classic
//   npm run measure -- "#top" --natural      # also the height without min-height
//
// Prints top/bottom/height relative to the page. Needs the site running.
import { launch, list, openSite, parseArgs } from './lib/browser.mjs';

const args = parseArgs();
const selectors = args._;
if (!selectors.length) {
  console.error('Usage: npm run measure -- <selector>… [--widths 390,1280] [--theme gold] [--lang ru] [--route …] [--natural]');
  process.exit(1);
}
const widths = list(args.widths, ['390', '768', '1280', '1920']).map(Number);

const browser = await launch();
for (const width of widths) {
  const page = await openSite(browser, { route: args.route || '', width, height: 900, theme: args.theme, lang: args.lang });
  const rows = await page.evaluate(
    ([sels, natural]) =>
      sels.map((sel) => {
        const el = document.querySelector(sel);
        if (!el) return { sel, missing: true };
        const box = () => {
          const r = el.getBoundingClientRect();
          return { top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY), height: Math.round(r.height) };
        };
        const row = { sel, ...box() };
        if (natural) {
          const prev = el.style.minHeight;
          el.style.minHeight = '0px';
          row.natural = box().height;
          el.style.minHeight = prev;
        }
        return row;
      }),
    [selectors, Boolean(args.natural)],
  );
  for (const r of rows) {
    console.log(
      `${String(width).padStart(5)}  ${r.sel.padEnd(28)} ` +
        (r.missing ? 'not found' : `top ${r.top}  bottom ${r.bottom}  height ${r.height}` + (r.natural !== undefined ? `  natural ${r.natural}` : '')),
    );
  }
  await page.close();
}
await browser.close();
