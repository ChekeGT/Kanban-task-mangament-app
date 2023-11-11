/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grayText: '#828FA3',
        mainPurple: '#635FC7',
        mainRed: '#EA5555',
        grayBackground: '#f4f7fd',
        todoColor: '#49C4E5',
        doingColor: '#8471F2',
        doneColor: '#67E2AE',
        lightWhite: '#E9EFFA',
        veryDarkGrey: '#20212C',
        darkGrey: '#2B2C37',
        blackCover: '#00000066'
      },
      fontFamily: {
        custom: ['Plus Jakarta Sans', 'serif']
      },
    },
    darkSelector: '.dark-mode'
  },
  darkMode: 'class',
  plugins: [],
}