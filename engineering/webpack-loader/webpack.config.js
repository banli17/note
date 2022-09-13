const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "none",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname)],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "my-loader",
      },
      {
        test: /\.txt$/,
        use: ["loader1", "loader2", "loader3"],
      },
    ],
  },
};
