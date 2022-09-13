const path = require("path");
const MyPlugin = require('./my-plugin')

module.exports = {
  entry: "./src/index.js",
  mode: "none",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MyPlugin({
      name: 'zhangsan',
    })
  ]
};
