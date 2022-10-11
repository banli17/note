
import c1 from "./plugins/c1";

export default {
  input: "./src/index.js",
  treeshake: false,
  output: {
    dir: "dist",
    filename: "[name].js",
  },
  plugins: [c1()],
};
