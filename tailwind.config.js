/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // enables dark mode via next-themes
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#6366F1", // Indigo-500
          dark: "#4F46E5",  // Indigo-600
        },
      },
    },
  },
  plugins: [],
};
