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
          DEFAULT: '#0A0F1C',
          light: '#1A1F2E'
        },
        accent: {
          DEFAULT: '#6E3FF3',
          secondary: '#2CCCE4'
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6E3FF3 0%, #2CCCE4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A0F1C 0%, #1A1F2E 100%)'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(110, 63, 243, 0.3)',
        'glow-secondary': '0 0 20px rgba(44, 204, 228, 0.3)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} 