const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = (env) => {
    console.log(env);
    const NODE_ENV = env.production ? 'production' : env.development ? 'development' : 'none';
    return {
        mode: 'production',
        devtool: "source-map",
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            // publicPath: 'xx'
        },
        module: {
            rules: [
                {
                    test: /\.js/,
                    use: ['eslint-loader'],
                    include: path.resolve('./src'),
                },
                {
                    test: /\.(css|less)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader',
                    ],
                },
                {
                    test: /\.(jpg|png|svg|jpeg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {},
                    },
                },
                {
                    test: /\.svg$/, // svg 要避免 base 64
                    use: {
                        loader: 'url-loader',
                        options: {
                            generator: (content) => svgToMiniDataURI(content.toString()),
                        },
                    },
                },
                {
                    test: /\.html$/,
                    use: 'html-loader',
                },
                {
                    test: /\.jsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                            ],
                        },
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html',
            }),
            new webpack.SourceMapDevToolPlugin({
                append: '\n//# sourceMappingURL=http://127.0.0.1:8081/[url]',
                filename: '[file].map',
            }),
            new FileManagerPlugin({
                events: {
                    onEnd: {
                        copy: [{
                            source: './dist/*.map',
                            destination: './sourcemap',
                        }],
                        delete: ['./dist/*.map'],
                    },
                },
            }),
            new webpack.ProvidePlugin({
                _:'lodash'
            }),
            // new HtmlWebpackExternalsPlugin({
            //     externals: [{
            //         module: 'lodash',
            //         entry: 'lodash.min.js', // public/lodash.js
            //         global: '_',
            //     }],
            // }),
            new webpack.DefinePlugin({
                NODE_ENV: JSON.stringify(NODE_ENV),
            }),
        ],
        devServer: {
            port: 8080,
            // open: true,
            // contentBase: path.resolve(__dirname, 'x'),
            // publicPath: path.resolve(__dirname, 'dist')
        },
    };
};
