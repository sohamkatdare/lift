const { default: plugin } = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'header': ['D-DIN'],
      'body': ['Inter']
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require('daisyui')
  ],

  variants: {
    extend: {
      visibility: ["group-hover"],
    }
  },
}
