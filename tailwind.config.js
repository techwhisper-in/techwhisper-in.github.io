/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./script.js'],
  theme: {
    extend: {
      colors: {
        dark: '#0f172a',
        card: '#1e293b',
        primary: '#38bdf8', // Sky blue
        secondary: '#818cf8', // Indigo
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}