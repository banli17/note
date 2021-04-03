const fs = require('fs')
//
const WriteStream = require('./WriteStream')
const ws = new WriteStream('./12.txt', {
    flags: 'w',
    encoding: 'utf8',
    autoClose: true,
    start: 0,
    highWaterMark: 2 // 期望用多少缓存，>=预期返回false，小于则返回true
})

let n = ws.write('he', () => {
    console.log('ok')
})

console.log(n) // false

ws.end('123')   // ws.write() , ws.end()，返回 ws。清空所有的内存 之后再关闭掉fs.close()