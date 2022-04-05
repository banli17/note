const path = require('path')

module.exports = {
	mode: "development",
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [{
				test: /\.js/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.view/,
				use: {
					loader: path.resolve(__dirname, 'myloader.js')
				}
			}
		]
	}
}