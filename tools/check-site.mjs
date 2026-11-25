// Regression checks to run after a change, across every theme a visitor can
// pick in the palette switcher. Exits non-zero if anything fails.
//
//   npm run build && npm run preview     # in another terminal
//   npm run check
//
// Checks:
//   page      no console errors, no horizontal scroll (each theme × width)
//   seam      hero photo fades into the next section with no visible line
//   routes    /reconstructions renders; header nav leads back to home sections
//   icons     tab icon, home-screen icon, manifest and theme-color swap per
//             theme × language, and every referenced file loads
import { LANGS, launch, openSite, visibleThemes } from './lib/browser.mjs';

const WIDTHS = [390, 768, 1280, 1920];
const themes = visibleThemes();
const failures = [];
const fail = (check, msg) => {
  failures.push(`${check}: ${msg}`);
  console.log(`  ✗ ${check}: ${msg}`);
};

const browser = await launch();

// Decode a PNG screenshot into RGBA bytes inside Chromium (no image deps).
async function rgba(buffer) {
  const p = await browser.newPage();
  const data = await p.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height });
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return { w: img.width, h: img.height, px: Array.from(ctx.getImageData(0, 0, img.width, img.height).data) };
  }, buffer.toString('base64'));
  await p.close();
  return data;
}

console.log(`Themes: ${themes.join(', ')}\n`);

console.log('page + seam');
for (const theme of themes) {
  for (const width of WIDTHS) {
    const tag = `${theme} @${width}`;
    const page = await openSite(browser, { width, height: 900, theme });
    if (page.errors.length) fail('page', `${tag} console errors: ${page.errors.join(' | ')}`);
    if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) fail('page', `${tag} horizontal scroll`);

    // Seam: the hero photo reaches past the hero's bottom edge, under the
    // start of the episodes, and fades out there. Checked in two 12px strips
    // at the screen edges (left under the text scrim, right under the photo,
    // clear of the content column), averaged across the strip so the photo's
    // own texture (waterline, glints) doesn't count:
    // - no step in color at the hero's bottom edge (where a section would
    //   end in a line);
    // - the photo has fully faded before its own bottom edge, so that edge
    //   can't show;
    // - 220px below the hero there's only the flat page background.
    await page.evaluate(() => {
      const r = document.getElementById('top').getBoundingClientRect();
      window.scrollTo({ top: r.bottom + scrollY - 400, behavior: 'instant' }); // page has smooth scrolling
    });
    await page.waitForTimeout(300);
    const { bottom, photoBottom } = await page.evaluate(() => ({
      bottom: document.getElementById('top').getBoundingClientRect().bottom,
      photoBottom: document.querySelector('#top img').getBoundingClientRect().bottom,
    }));
    const top = Math.floor(bottom) - 4;
    for (const x of [2, width - 14]) {
      const { w, h, px } = await rgba(await page.screenshot({ clip: { x, y: top, width: 12, height: 228 } }));
      const row = (y) => [0, 1, 2].map((ch) => {
        let sum = 0;
        for (let i = 0; i < w; i++) sum += px[(y * w + i) * 4 + ch];
        return Math.round(sum / w);
      });
      const differs = (a, b, tol) => a.some((v, i) => Math.abs(v - b[i]) > tol);
      const bg = row(h - 1);
      const [above, below] = [row(2), row(5)];
      if (differs(above, below, 4)) fail('seam', `${tag} x=${x}: line at the hero's bottom edge, rgb(${above}) → rgb(${below})`);
      const edge = Math.round(photoBottom) - 2 - top;
      if (edge > 0 && edge < h && differs(row(edge), bg, 2)) fail('seam', `${tag} x=${x}: photo not faded out at its bottom edge, rgb(${row(edge)}) vs rgb(${bg})`);
      for (let y = h - 40; y < h; y++) {
        if (differs(row(y), bg, 2)) {
          fail('seam', `${tag} x=${x}: photo still visible ${y - 4}px below the hero, rgb(${row(y)}) vs rgb(${bg})`);
          break;
        }
      }
    }
    await page.close();
  }
}

console.log('routes');
for (const width of [390, 1280]) {
  const page = await openSite(browser, { route: 'reconstructions', width });
  if (page.errors.length) fail('routes', `/reconstructions @${width} console errors: ${page.errors.join(' | ')}`);
  if (!(await page.locator('#reconstructions').count())) fail('routes', `/reconstructions @${width} has no #reconstructions section`);
  if (await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)) fail('routes', `/reconstructions @${width} horizontal scroll`);
  if (width === 1280) {
    await page.locator('header nav a[href$="#episodes"]').click();
    await page.waitForLoadState('networkidle');
    const ok = page.url().endsWith('#episodes') && (await page.locator('#episodes').count()) > 0;
    if (!ok) fail('routes', `Episodes link from /reconstructions went to ${page.url()}`);
  }
  await page.close();
}

console.log('icons');
for (const theme of themes) {
  for (const lang of LANGS) {
    const page = await openSite(browser, { theme, lang });
    const r = await page.evaluate(async () => {
      const q = (s) => document.querySelector(s);
      const fav = q('link[rel="icon"]').href;
      const man = q('link[rel="manifest"]').href;
      const apple = q('link[rel="apple-touch-icon"]').href;
      const status = async (u) => (await fetch(u)).status;
      const mj = await (await fetch(man)).json();
      const bad = [];
      for (const u of [fav, man, apple, ...mj.icons.map((i) => new URL(i.src, man).href)]) if ((await status(u)) !== 200) bad.push(u);
      return {
        bad,
        fav: fav.split('/').pop(),
        color: q('meta[name="theme-color"]').content,
        title: q('meta[name="apple-mobile-web-app-title"]').content,
        mColor: mj.theme_color,
        mName: mj.short_name,
      };
    });
    const tag = `${theme}/${lang}`;
    if (r.bad.length) fail('icons', `${tag} missing: ${r.bad.join(', ')}`);
    if (r.color !== r.mColor) fail('icons', `${tag} theme-color ${r.color} ≠ manifest ${r.mColor}`);
    if (r.title !== r.mName) fail('icons', `${tag} home-screen title "${r.title}" ≠ manifest "${r.mName}"`);
    await page.close();
  }
}

await browser.close();
console.log(failures.length ? `\n${failures.length} failure(s)` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
