/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bde3c2',
          300: '#94ce9c',
          400: '#68b373',
          500: '#4a9856',
          600: '#377a43',
          700: '#2e6138',
          800: '#274e2f',
          900: '#234029',
          950: '#0f2414',
        },
        secondary: {
          50: '#f7f7f2',
          100: '#eeeee2',
          200: '#dddbc8',
          300: '#c7c3a5',
          400: '#afa883',
          500: '#9c9268',
          600: '#847a56',
          700: '#6a6248',
          800: '#58523e',
          900: '#4a4536',
          950: '#28251c',
        },
        accent: {
          50: '#fff4ed',
          100: '#ffe6d4',
          200: '#fecaa8',
          300: '#fda772',
          400: '#fb7c3b',
          500: '#f85f18',
          600: '#ea440d',
          700: '#c1330e',
          800: '#992a14',
          900: '#7c2615',
          950: '#431008',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        slideUp: 'slideUp 0.8s ease-in-out',
      },
    },
  },
  plugins: [],
};