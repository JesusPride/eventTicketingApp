/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#DCFCE7', // Background Accent
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22C55E', // Success Green
          600: '#008751', // 🇳🇬 Primary Green (Nigerian Flag)
          700: '#006d41',
          800: '#005332',
          900: '#003a23',
        },
        accent: {
          50: '#f5f3ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        dark: {
          900: '#0b0f17',
          800: '#111827',
          700: '#1f2937',
          600: '#374151'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
