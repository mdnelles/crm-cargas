/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2BA6B4",
          dark: "#1F8A96",
          light: "#4FBCC9",
          pale: "#E6F4F6",
        },
      },
    },
  },
  plugins: [],
};
