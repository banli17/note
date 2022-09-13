const path = require('path')
const webpack = require('webpack')
const FooterPlugin = require('./plugin/FooterPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.tpl$/,
      use: path.resolve(__dirname, 'loader/tpl-loader.js')
    }]
  },
  plugins: [new FooterPlugin({
    banner: 'banli17', // 在 bundlejs 页脚增加注释, sourcemap 注释规范必须在文件最后
  })]
}
