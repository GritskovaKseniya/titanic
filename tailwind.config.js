/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Restrained near-black ground — less saturated than the old deep-sea
        // navy, closer to a neutral studio dark, still with a whisper of blue.
        dark: '#0A1014',
        darkSec: '#10181C',
        darkTertiary: '#18232A',
        // Bioluminescent coral: the anemone glow in the reference gallery.
        primary: '#8B2C63',
        primaryHover: '#711F50',
        accent: '#F14FA0',
        // Brass / treasure gold: the ship's fittings, the teapot, the dusk sky.
        gold: '#C9962F',
        goldBright: '#E4B85A',
        bone: '#E7EFEE',
        ash: '#8A969C',
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
