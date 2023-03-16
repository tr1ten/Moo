// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind")
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./index.ts"
  ],
  presets: [nativewind],
  theme: {
    extend: {},
  },
  plugins: [],
};