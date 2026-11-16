// Regression checks to run after a change, across every theme a visitor can
// pick in the palette switcher. Exits non-zero if anything fails.
//
//   npm run build && npm run preview     # in another terminal
//   npm run check
//
// Checks:
//   page      no console errors, no horizontal scroll (each theme × width)
//   seam      hero bottom blends into the next section with no visible line
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

    // Seam: in two columns at the screen edges (left under the text scrim,
    // right under the photo — clear of the content column), every pixel from
    // 30px above the hero's bottom edge to 10px below it should be the next
    // section's flat background color.
    await page.evaluate(() => {
      const r = document.getElementById('top').getBoundingClientRect();
      window.scrollTo({ top: r.bottom + scrollY - 450, behavior: 'instant' }); // page has smooth scrolling
    });
    await page.waitForTimeout(300);
    const bottom = await page.evaluate(() => document.getElementById('top').getBoundingClientRect().bottom);
    for (const x of [4, width - 4]) {
      const { h, px } = await rgba(await page.screenshot({ clip: { x, y: bottom - 30, width: 1, height: 40 } }));
      const ref = px.slice((h - 1) * 4, (h - 1) * 4 + 3);
      for (let y = 0; y < h; y++) {
        const c = px.slice(y * 4, y * 4 + 3);
        if (c.some((v, i) => Math.abs(v - ref[i]) > 2)) {
          fail('seam', `${tag} x=${x}: rgb(${c}) at ${y - 30}px from hero bottom vs rgb(${ref}) below`);
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
