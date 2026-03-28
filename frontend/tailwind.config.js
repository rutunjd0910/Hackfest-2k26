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
          green: "#1D9E75",
          black: "#2C2C2A",
          blue: "#378ADD",
          amber: "#EF9F27",
          white: "#FFFFFF",
          light: "#F5F7F5"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
