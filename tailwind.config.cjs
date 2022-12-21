/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      screens: {
        "4xl": "1920px",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
