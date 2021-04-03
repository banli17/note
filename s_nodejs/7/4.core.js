// 常用的一些模块

let fs = require('fs')
let path = require('path')
let vm = require('vm')

// 判断文件是否存在，不存在则报错
try {
    fs.accessSync('b.js')
} catch (e) {
    console.log('文件不存在')
}

// eval   Function 
// vm.runInThisContext(str) 独立的上下文环境，不会向上查找