/** @type {import('tailwindcss').Config} */
export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        custom: ['#86E3CE', '#D0E6A5', '#FFDD94', '#FA897B', '#CCABD8'] 
      }
    },
  },
  plugins: [],
};


