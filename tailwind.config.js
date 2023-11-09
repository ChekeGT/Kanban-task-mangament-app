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
      },
      fontFamily: {
        custom: ['Plus Jakarta Sans', 'serif']
      }
    },
  },
  plugins: [],
}