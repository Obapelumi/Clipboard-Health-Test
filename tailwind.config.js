module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js", "./layouts/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      height: {
        main: "calc(100vh - 4rem)",
        "after-search": "calc(100vh - 10rem)"
      },
      minHeight: (theme) => ({
        ...theme("spacing")
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
