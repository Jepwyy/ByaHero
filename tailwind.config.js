/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./assets/img/MainBg.png')",
        login: "url('./assets/images/BG-1.jpg')",
      },
    },
  },
  plugins: [],
}
