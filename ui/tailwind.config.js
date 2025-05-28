/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': {
          300: '#A5D8FF',
          400: '#7CC5FF',
          500: '#53B2FF',
          600: '#2A9FFF',
        },
        'pastel-purple': {
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
        },
        'pastel-pink': {
          300: '#FBCFE8',
          400: '#F9A8D4',
          500: '#F472B6',
          600: '#EC4899',
        },
      },
    },
  },
  plugins: [],
} 