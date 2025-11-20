/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary: "#030014",
        secondary: "#151312",
        light: {
          100: "#D6C7FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221F3D",
          120: "#1a1828",
          150: "#18162E",
          180: '#0C0A17',
          200: "#0A0817",
        },
        dark_light: {
          100: "#BFB6B6",
          200: "#0F0D23",
        },
        accent: "#AB8BFF",
        
      }
    },
  },
  plugins: [],
}

