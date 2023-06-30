/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['cmyk']
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      colors: {
        bblue: '#002868',
        rred: '#bf0a30'
      }
    }
  }
}
