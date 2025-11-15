/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7f0",
          100: "#fdeee0",
          200: "#fad9c0",
          300: "#f7c49f",
          400: "#f4af7e",
          500: "#f26e23",
          600: "#d85a1a",
          700: "#be4611",
          800: "#a43208",
          900: "#8a1e00",
        },
        secondary: {
          50: "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#00bbb6",
          600: "#00a39e",
          700: "#008b86",
          800: "#00736e",
          900: "#005b56",
        },
      },
      fontFamily: {
        sans: ["EGOSTA", "Segoe UI", "Tahoma", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
