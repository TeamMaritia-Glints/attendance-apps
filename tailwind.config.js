module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-blue": "#224957",
        "primary-green": "#20DF7F",
        "light-green" : "#CFDCE5",
        "dark-green": "#296763",
      },
      backgroundImage: {
        wave: "url('/wave.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
