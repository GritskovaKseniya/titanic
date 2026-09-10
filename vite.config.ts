import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Project site on GitHub Pages: https://<owner>.github.io/titanic/
// Everything (assets, module chunks) must resolve under that /titanic/ prefix.
export default defineConfig({
  base: '/titanic/',
  plugins: [react()],
});
