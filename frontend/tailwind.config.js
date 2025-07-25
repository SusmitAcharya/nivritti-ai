/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf8f5',
          100: '#f5f0ea',
          200: '#e8ddd0',
          300: '#dbc9b6',
          400: '#c8a882',
          500: '#a67c52',
          600: '#8b6240',
          700: '#704f33',
          800: '#5a3f29',
          900: '#453020',
        },
        accent: {
          50: '#f9f7f4',
          100: '#f2ede6',
          200: '#e3d5c4',
          300: '#d4bda2',
          400: '#c4a47d',
          500: '#a67c52',
          600: '#8b6240',
          700: '#704f33',
          800: '#5a3f29',
          900: '#453020',
        },
        terracotta: {
          50: '#faf8f5',
          100: '#f5f0ea',
          200: '#e8ddd0',
          300: '#dbc9b6',
          400: '#c8a882',
          500: '#a67c52',
          600: '#8b6240',
          700: '#704f33',
          800: '#5a3f29',
          900: '#453020',
        },
        earthen: {
          50: '#faf9f7',
          100: '#f4f1ed',
          200: '#e6ddd2',
          300: '#d8c9b7',
          400: '#c4a882',
          500: '#a67c52',
          600: '#8b6240',
          700: '#704f33',
          800: '#5a3f29',
          900: '#453020',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};