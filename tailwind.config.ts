import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0d2027',
          dark: '#07151a',
          surface: '#142c35',
          accent: '#f6d860',
          gold: '#e5b838',
          light: '#f8fafc',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        arabic: ['var(--font-[#0d2027])', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
