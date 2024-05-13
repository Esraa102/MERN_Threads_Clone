/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkColor: "#1e1e1e",
        lightColor: "#616161",
      },
    },
  },
  plugins: [],
};
