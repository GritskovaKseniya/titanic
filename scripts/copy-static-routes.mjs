// GitHub Pages serves only files that exist on disk — there's no server-side
// rewrite to send a path like /admin/ or /reconstructions/ to the same SPA
// shell as /. This copies the built index.html into dist/<route>/index.html
// for each client-side "route" below, so a direct visit resolves; App.tsx
// then checks the pathname client-side and renders the matching page.
import { copyFileSync, mkdirSync } from 'node:fs';

const ROUTES = ['admin', 'reconstructions'];

for (const route of ROUTES) {
  mkdirSync(`dist/${route}`, { recursive: true });
  copyFileSync('dist/index.html', `dist/${route}/index.html`);
}
