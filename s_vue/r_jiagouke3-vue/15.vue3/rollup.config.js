import ts from 'rollup-plugin-typescript2'; // 解析ts的插件
import {nodeResolve} from '@rollup/plugin-node-resolve'; // 解析第三方模块的插件
import serve from 'rollup-plugin-serve'; // 启动本地服务的插件
import path from 'path'

// npm install typescript  

// rollup 支持es6语法
export default {
    input:'src/index.ts',
    output:{
        // amd iife commonjs umd..
        format:'umd', // 立即执行 自执行函数
        file: path.resolve(__dirname,'dist/bundle.js'), // 出口文件
        sourcemap:true, // 根据源码产生映射文件
        name:'VueReactivity'
    },
    plugins:[
        nodeResolve({ // 第三方文件解析
            extensions:['.js','.ts']
        }),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            openPage:'/public/index.html',
            contentBase:'',
            port:3000
        })
    ]
}