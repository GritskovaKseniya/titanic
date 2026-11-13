/** @type {import('tailwindcss').Config} */

// Lets a color track a CSS custom property (set per `data-theme` in index.css)
// instead of a fixed hex, so the palette-switcher can swap it at runtime
// while still supporting Tailwind's opacity modifiers (bg-accent/50 etc).
function themable(variableName) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `rgb(var(${variableName}))`
      : `rgb(var(${variableName}) / ${opacityValue})`;
}

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Night-ocean blue-black ground — the current, chosen palette.
        // Themable: see the `data-theme` blocks in src/index.css.
        dark: themable('--color-dark'),
        darkSec: themable('--color-dark-sec'),
        darkTertiary: themable('--color-dark-tertiary'),
        // Filled-surface companion to the bright accent.
        primary: themable('--color-primary'),
        accent: themable('--color-accent'),
        // Archival badge — warm against the cool accent. Themable: some
        // wine/ruby options shift this toward gold/graphite to avoid
        // clashing with a warm accent.
        gold: themable('--color-gold'),
        goldBright: themable('--color-gold-bright'),
        bone: '#E7EFEE',
        ash: themable('--color-ash'),
        leader: '#E23B2E',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        // var(--font-heading) lets the "classic serif" palette option swap
        // this to Playfair Display; every other theme leaves it at Oswald.
        heading: ['var(--font-heading)', 'Oswald', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
