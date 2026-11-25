/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f1f5fb',
          100: '#e3e9f5',
          200: '#c2d0e9',
          300: '#90a8d4',
          400: '#5a79bb',
          500: '#3a58a1',
          600: '#2b4386',
          700: '#22346b',
          800: '#1a2a55',
          900: '#122140',
          950: '#0b1529',
        },
        gold: {
          50: '#fdf9ec',
          100: '#faf0cd',
          200: '#f5e098',
          300: '#efc95c',
          400: '#e9b230',
          500: '#d99a1c',
          600: '#bb7815',
          700: '#955815',
          800: '#7b4619',
          900: '#683b1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(18 33 64 / 0.04), 0 1px 3px 0 rgb(18 33 64 / 0.06)',
        raised: '0 4px 12px -2px rgb(18 33 64 / 0.10), 0 2px 6px -2px rgb(18 33 64 / 0.06)',
      },
    },
  },
  plugins: [],
}