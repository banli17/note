module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './dist/index.js',
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                { pragma: 'create' } // 编译的函数名 React.createElement 会变成 create
                            ]
                        ]
                    }
                },
            }
        ]
    }
}