/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#4be3db",
        warm: {
          50: "#fff9f0",
          100: "#fff3e0",
          200: "#ffe0b2",
          300: "#ffcc80",
          400: "#ffa726",
          500: "#ff8f00",
        },
      },
      fontFamily: {
        sans: ["'Nunito'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
