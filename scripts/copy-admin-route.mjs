// GitHub Pages serves only files that exist on disk — there's no server-side
// rewrite to send /admin/ to the same SPA shell as /. This copies the built
// index.html into dist/admin/index.html so a direct visit to /titanic/admin/
// resolves; App.tsx then checks the pathname client-side and renders AdminApp.
import { copyFileSync, mkdirSync } from 'node:fs';

mkdirSync('dist/admin', { recursive: true });
copyFileSync('dist/index.html', 'dist/admin/index.html');
