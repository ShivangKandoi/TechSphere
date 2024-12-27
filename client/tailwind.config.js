/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E90FF',
          dark: '#1873CC'
        },
        accent: {
          DEFAULT: '#FFCC00',
          dark: '#E6B800'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} 