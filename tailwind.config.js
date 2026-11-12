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
        // Deep sea-green ground, almost black — the cinema-dark palette.
        // Themable: see the `data-theme` blocks in src/index.css.
        dark: themable('--color-dark'),
        darkSec: themable('--color-dark-sec'),
        darkTertiary: themable('--color-dark-tertiary'),
        // Muted forest green — the filled-surface companion to the bright accent.
        primary: themable('--color-primary'),
        primaryHover: '#0F4F33',
        accent: themable('--color-accent'),
        // Brass / treasure gold: the ship's fittings, the teapot, the dusk sky.
        // Themable too — the blue palette shifts this warmer, toward amber,
        // for a teal-and-orange pairing against its cool accent.
        gold: themable('--color-gold'),
        goldBright: themable('--color-gold-bright'),
        bone: '#E7EFEE',
        ash: themable('--color-ash'),
        leader: '#E23B2E',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        heading: ['Oswald', '"Arial Narrow"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
