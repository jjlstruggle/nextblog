const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx,less}"],
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
