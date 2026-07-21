/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FDFAF4',
          100: '#F5F0E8',
          200: '#EDE8DC',
          300: '#E0D9CC',
          400: '#CFC8B8',
        },
        gold: {
          300: '#E2C97E',
          400: '#D4B05A',
          500: '#C9A84C',
          600: '#B8860B',
          700: '#9A6F08',
          800: '#7A5706',
        },
        ink: {
          900: '#1C1A14',
          800: '#2C2A20',
          700: '#3D3A2E',
          600: '#5C5847',
          500: '#7A7563',
          400: '#9A9585',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
