/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{jsx,js,ts,tsx,css,cscc}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue-100': '#CACDE8FF',
        'dark-blue-200': '#777A92FF',
        'dark-blue-300': '#4D5066FF',
        'dark-blue-400': '#393A4CFF',
        'dark-blue-500': '#25273CFF',
        'dark-blue-600': '#161722FF',
        'main-blue-100': '#3A7BFDFF',
        'main-blue-200': '#0000FFFF',
        'gd-blue': '#57DDFFFF',
        'gd-purple': '#C058F3FF',
      },
      fontFamily: {
        quickSand: ['Josefin Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
}
