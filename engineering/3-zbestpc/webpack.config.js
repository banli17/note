const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
	entry: {
		main: './src/index.js', // 这里默认 key 是 main，output 的 filename [name] 就是根据这个 key 生成的
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name]_[contenthash:5].js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			// filename: 'index.html'
		})
	]
}