/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#1E40AF",
        "weather-secondary": "#F59E0B",
      },
      fontFamily: {
        Roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
