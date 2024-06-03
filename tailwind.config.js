/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          default: "#6BC3E6",
        },
        gray: {
          "shade-1": "#6d6868",
        },
      },
    },
  },
  plugins: [],
};
