/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep sea-green ground, almost black — the cinema-dark palette.
        dark: '#04100E',
        darkSec: '#0A211D',
        darkTertiary: '#102A24',
        // Muted forest green — the filled-surface companion to the bright accent.
        primary: '#0B3E28',
        primaryHover: '#0F4F33',
        accent: '#3EB386',
        // Brass / treasure gold: the ship's fittings, the teapot, the dusk sky.
        gold: '#C9962F',
        goldBright: '#E4B85A',
        bone: '#E7EFEE',
        ash: '#8FA39B',
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
