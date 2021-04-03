const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: { // 对模块处理进行配置
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['vue-style-loader', {
                loader:'css-loader',
                options:{
                    esModule:false
                }
            }] },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // 把es6+ 转化成es5 插件的集合预设
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
}

