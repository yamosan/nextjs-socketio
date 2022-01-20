const APP_MAX_WIDTH = "1100px";

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: { app: APP_MAX_WIDTH },
    },
  },
  variants: { opacity: ["disabled"] },
  plugins: [],
};
