/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      },
      fontWeight: {
        'extrabold': '800',
        'black': '900'
      }
    },
  },
  plugins: [],
};
