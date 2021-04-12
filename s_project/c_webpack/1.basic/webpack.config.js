const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = (env) => {
    // console.log(env);
    const NODE_ENV = env.production ? 'production' : env.development ? 'development' : 'none';
    return {
        mode: 'production',
        devtool: "source-map",
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name]_[hash:5].js',
            publicPath: '/'
            // publicPath: 'xx'
        },
        // watch: true,
        // watchOptions: {
        //     ignored: /node_modules/,
        //     aggregateTimeout: 300,
        //     poll: 1000
        // },
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
                        // 'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [['postcss-preset-env', {

                                    }]]
                                }
                            }
                        },
                        'less-loader',
                    ],
                },
                // {
                //     test: /\.html$/,
                //     use: 'html-loader',
                // },
                {
                    test: /\.(jpg|png|svg|jpeg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            esModule: false, //不需要 require().default
                            name: '[name]_[hash:8].[ext]',
                            outputPath: 'images',
                            publicPath: '/images'
                        },
                    },
                },
                // {
                //     test: /\.svg$/, // svg 要避免 base 64
                //     use: {
                //         loader: 'url-loader',
                //         options: {
                //             generator: (content) => svgToMiniDataURI(content.toString()),
                //         },
                //     },
                // },
                {
                    test: /\.jsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env",
                                    { targets: "> 0.25%, not dead" }],
                                // '@babel/preset-react',
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
            new webpack.BannerPlugin("-----\nbanli17\n--------"),
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
            // new webpack.ProvidePlugin({
            //     _: 'lodash'
            // }),
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
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'public'),
                        to: path.resolve(__dirname, 'dist/public'),
                    }
                ]
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name]_[hash:5].css',
            })
        ],
        devServer: {
            port: 8080,
            writeToDisk: true,
            // open: true,
            // contentBase: path.resolve(__dirname, 'x'),
            // publicPath: path.resolve(__dirname, 'dist')
        },
    };
};
