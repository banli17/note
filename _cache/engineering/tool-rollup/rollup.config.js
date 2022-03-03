import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

console.log(process.env.NODE_ENV)

const config = {
    input: './src/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'umd', // amd", "cjs", "system", "es", "iife" or "umd"
        name: 'v', // iife 和 umd 时必须提供,会作为全局变量
        globals: {
            lodash: '_', // 告诉 rollup lodash _变量从全局取
        }
    },
    plugins: [
        resolve(),
        // babel({
        //     babelHelpers: 'runtime',
        //     exclude: 'node_modules/**',
        //     presets: [
        //         [
        //             "@babel/env", {
        //                 modules: false
        //             }
        //         ]
        //     ],
        //     plugins: [
        //         [
        //             "@babel/plugin-transform-runtime", {
        //                 // "corejs": 3,
        //             }
        //         ]
        //     ]
        // }),
        commonjs(),
    ],
    external: ['lodash'], // 告诉 rollup 不要打包 lodash
}

if (process.env.NODE_ENV === 'dev') {
    config.plugins.push(
        serve({
            open: true,
            contentBase: './dist',
            port: 8080,
        })
    )
}
if (process.env.NODE_ENV === 'prod') {
    config.plugins.push(terser())
}

export default config