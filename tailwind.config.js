/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'afrika-blue': {
          DEFAULT: '#1280b8',
          light: '#3db4e8',
          bright: '#7ddcff',
          dark: '#0a5a82',
        },
        'afrika-orange': {
          DEFAULT: '#ff6b1a',
          light: '#ff9a57',
          dark: '#e8550e',
        },
        'afrika-gold': {
          DEFAULT: '#ffd53a',
          light: '#ffea85',
          dark: '#f5bc00',
        },
        'afrika-cream': '#fffdf8',
        'afrika-sky': {
          DEFAULT: '#5ec8f2',
          light: '#a6e6ff',
          dark: '#22a8dd',
        },
        'afrika-mint': {
          DEFAULT: '#5eead4',
          light: '#a7f3e9',
          dark: '#2dd4bf',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
