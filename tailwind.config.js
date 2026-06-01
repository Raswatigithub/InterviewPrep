/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'page-bg': '#fafaf9',
        'page-bg-dark': '#030712',
        'surface-dark': '#0e1726',
        grid: '#808080',
        primary: '#0d9488',
        accent: '#f59e0b',
        info: '#0369a1',
        purple: '#8b5cf6',
        'text-muted': '#57534e',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(41, 37, 36, 0.08)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out both',
      },
    },
  },
  plugins: [],
};
