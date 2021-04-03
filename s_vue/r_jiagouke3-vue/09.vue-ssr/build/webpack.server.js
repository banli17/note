const base = require('./webpack.config');
const {merge} = require('webpack-merge')
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(base, {
    entry: {
        server: path.resolve(__dirname, '../src/server-entry.js'),
    },
    target: 'node', // 给node来使用  require(',/xxx')  module.exports = xxx
    output: {
        libraryTarget: 'commonjs2', // 把入口文件最终到处的结果 变成module.exports = ()=>{}
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.ssr.html',
            minify:false,
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            excludeChunks: ['server'] // 忽略引入js文件
        })
    ]
})