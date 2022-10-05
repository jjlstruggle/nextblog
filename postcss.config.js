module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        stage: 3,
        autoprefixer: {
          flexbox: "no-2009",
        },
      },
    ],
    "tailwindcss",
    "cssnano",
  ],
};
