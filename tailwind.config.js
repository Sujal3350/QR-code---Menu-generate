/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#FCF5F5',
          100: '#F9EBEB',
          200: '#F0CDCD',
          300: '#E7AFAF',
          400: '#D57373',
          500: '#C33737',
          600: '#8B0000', // Primary burgundy
          700: '#7D0000',
          800: '#650000',
          900: '#520000',
        },
        navy: {
          50: '#F2F5F9',
          100: '#E6ECF2',
          200: '#C0CFDF',
          300: '#9AB2CC',
          400: '#4E77A5',
          500: '#1D3557', // Dark navy
          600: '#1A3050',
          700: '#152842',
          800: '#112035',
          900: '#0E1A2B',
        },
        gold: {
          50: '#FFFAF0',
          100: '#FFF5E0',
          200: '#FFE7B3',
          300: '#FFD985',
          400: '#FFBE2A',
          500: '#FFC857', // Accent gold
          600: '#E6B44E',
          700: '#BF9641',
          800: '#997835',
          900: '#7D622B',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};