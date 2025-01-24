/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: '#fce9c4',
          light: '#ffd394',
          DEFAULT: '#e19037',
          dark: '#c97f2d',
          darker: '#a86624',
        },
        secondary: {
          lighter: '#c9e4ca',
          light: '#b3d7b3',
          DEFAULT: '#8AB6A8',
          dark: '#6a9a7a',
          darker: '#4c6f5c',
        },
      }
    },
  },
  plugins: [require('tailwindcss-primeui')]
}