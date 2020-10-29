let path = require('path')
let HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // compress: true,
        port: 8889
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/}
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'index.html',
        })
    ]
}
