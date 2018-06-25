var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var PurifycssWebpack = require('purifycss-webpack')
var glob = require('glob-all')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	devtool: 'eval',
	devServer: {
		// hot: true,
		port: 9001,
		logLevel: 'debug',
		historyApiFallback: {
			rewrites: [
				{
					from: '/pages/a',
					to: '/pages/a.html'
				}
			]
		},
		// proxy: {
		// 	'/': {
		// 		target: 'http://www.a.com/',
		// 		changeOrigin: true
		// 	}
		// }
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							singleton: true
						}
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('postcss-sprites')({
									spritePath: '../assets/imgs/'
								})
							]
						}
					}
				]
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[hash:5].[ext]',
							limit: 3000,
							useRelativePath: true,
							outputPath: 'assets/imgs/'
						}
					}
				]
			},
			{
				test: /\.jpg$/,
				use: [
					{
						loader: 'img-loader',
						options: {
							mozjpeg: {
								quality: 20
							},
						}
					}
				]
			},
			{
				test: /\.(eot|woff2?|ttf|svg)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:5].[ext]',
							limit: 50,
							publicPath: '../assets/font/',
							useRelativePath: true
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							attrs: ['img:src', 'img:data-src']
						}
					}
				]
			}
		]
	},
	plugins: [
		new ExtractTextWebpackPlugin({
			filename: 'css/[name]-[hash:5].min.css',
		}),
		new PurifycssWebpack({
			paths: glob.sync([
				path.join(__dirname, '*.html'),
				path.join(__dirname, 'src/*.js')
			])
			
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			minify: {
				collapseWhitespace: true
			}
		}),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()
	]
}