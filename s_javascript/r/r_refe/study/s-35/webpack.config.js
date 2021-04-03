const path = require('path')
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', {
                            pragma: 'create'
                        }]]
                    }
                }
            },
            {
                test: /\.vue/,
                use: {
                    loader: path.resolve(__dirname, 'myloader.js')
                }
            }
        ]
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        //compress: true,
        //port: 6000,
        //watchContentBase: true,  // 这里会默认监听 js的改变，自动编译
    },
    optimization: {
        minimize: false
    }
}
