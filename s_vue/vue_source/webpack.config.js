const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]_[contenthash:8].js",
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        port: 9900,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        "plugins": ["@babel/plugin-syntax-dynamic-import"]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from: 'index.html', to: 'dist'}
        ]),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),

    ]
}
