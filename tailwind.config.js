/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F97316',
          'orange-hover': '#EA580C',
          'orange-dark': '#FB923C',
          'orange-dark-hover': '#FDBA74',
        },
        dark: {
          bg: '#111111',
          secondary: '#181818',
          card: '#1C1C1C',
          border: '#2A2A2A',
        }
      },
      fontFamily: {
        ui: ['"Bricolage Grotesque"', 'sans-serif'],
        cv: ['"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
