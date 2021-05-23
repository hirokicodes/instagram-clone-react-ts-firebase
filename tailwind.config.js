module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fill: (theme) => ({
      red: theme("colors.red.600"),
    }),
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
      display: ["group-hover"],
    },
  },
  plugins: [],
};
