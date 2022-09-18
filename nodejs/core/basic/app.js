#!/usr/bin/env node
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

console.log('hello world')

console.log(process.env)

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = dotenv.config({
  path: path.resolve(__dirname, '.env'),
})
console.log('config, ', config) // config,  { parsed: { ENV: 'TEST', APP_NAME: 'GG' } }


process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});



import minimist from 'minimist';
const ret = minimist(process.argv.slice(2))
console.log('解析的参数', ret)
// 命令:  A=1 node app.js --name=zhangsan --age=12 a
// 解析的参数 { _: ['a'], name: 'zhangsan', age: 12 }
