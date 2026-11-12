/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Night-ocean blue-black ground — the icy, teal-and-orange cinema palette.
        dark: '#0B0A0F',
        darkSec: '#0A1C2E',
        darkTertiary: '#0F2A42',
        // Deep ocean blue — the filled-surface companion to the bright accent.
        primary: '#0C5080',
        accent: '#0EA5E9',
        // Warm amber — the ship's lights against the cold water, teal-and-orange.
        gold: '#B45309',
        goldBright: '#D97706',
        bone: '#E7EFEE',
        ash: '#64748B',
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
