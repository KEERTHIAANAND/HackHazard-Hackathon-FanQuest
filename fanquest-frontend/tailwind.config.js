/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19', // Deep dark Discord-like background
          card: '#151A27', // Slightly lighter for cards
          border: '#2A3041'
        },
        brand: {
          neon: '#00E5FF',
          accent: '#7C3AED'
        }
      }
    },
  },
  plugins: [],
}
