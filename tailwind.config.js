/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        india: {
          orange: '#FF9933',
          green: '#138808',
        },
      },
    },
  },
  plugins: [],
}
