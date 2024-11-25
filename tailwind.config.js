/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./packages/react-frontend/src/*.jsx"],
  theme: {
    extend: {},
  },
  purge: {
    mode: "all",
    preserveHtmlElements: false,
    content: ["./packages/react-frontend/src/*.jsx"],
  },
  plugins: [],
};
