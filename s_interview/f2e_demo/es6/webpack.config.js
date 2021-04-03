let path = require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js'
    },
    // resolve: {
    //     extensions: ['.tsx', '.ts', '.js', '.json']
    // },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,
        port: 8000
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html',
        })
    ]
}
