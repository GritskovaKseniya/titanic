/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep-sea navy ground — the water in the reference stills, not a neutral studio dark.
        dark: '#071820',
        darkSec: '#0D2530',
        darkTertiary: '#123240',
        // Bioluminescent coral: the anemone glow in the reference gallery.
        primary: '#8B2C63',
        primaryHover: '#711F50',
        accent: '#F14FA0',
        // Brass / treasure gold: the ship's fittings, the teapot, the dusk sky.
        gold: '#C9962F',
        goldBright: '#E4B85A',
        bone: '#E7EFEE',
        ash: '#7E97A0',
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
