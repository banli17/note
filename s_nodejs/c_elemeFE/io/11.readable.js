// 可读流
const fs = require('fs')
const ReadStream = require('./ReadStream')
const r = new ReadStream('./11.txt', {
    flags: 'r',
    // encoding: 'utf8', // 读取出来默认是buffer
    autoClose: true,
    start: 0,
    // end: 5, // [0, 5]
    highWaterMark: 3 // 每次读取多少个，即缓存区大小，默认是 64k
})


r.pipe(fs.createWriteStream('./11-2.txt'))

const arr = []

r.on('open', fd => {
    console.log(fd)
})

r.on('data', function (chunk) {
    arr.push(chunk)
    // r.pause()
    // setTimeout(() => {
    //     r.resume()
    // }, 1000)
})

r.on('end', function () {
    console.log(Buffer.concat(arr).toString())
})

r.on('close', function () {
    console.log('close')
})

r.on('error', function () {
    console.log('error')
})