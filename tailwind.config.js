/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      maxHeight: {
        "35vh": "35vh",
      },
      colors: {
        lime: {
          50: "#F7FEE7",
          100: "#ECFCCB",
          200: "#D9F99D",
          300: "#BEF264",
          400: "#A3E635",
          500: "#84CC16",
          600: "#65A30D",
          700: "#4D7C0F",
          800: "#3F6212",
          900: "#365314",
        },
        whitesmoke: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
