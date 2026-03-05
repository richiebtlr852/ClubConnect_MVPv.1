/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#3b82f6",
        "brand-blue": "#2563eb",
        "light-cyan": "#1cd3fc",
        "yellow-accent": "#efbf04",
        "text-gray": "#273240",
      },
      borderRadius: {
        "custom-large": "153px",
      },
    },
  },
  plugins: [],
};
