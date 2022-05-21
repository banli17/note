const path = require('path')
const fs = require('fs')

// readFile
// 如果路径不存在会报错
// 默认读取到的是 buffer
// fs.readFile(path.join(__dirname, 'data.txt'), (err, data) => {
// 	console.log('读取文件内容: ', data);
// })
// fs.readFile(path.join(__dirname, 'data.txt'), 'utf-8', (err, data) => {
// 	console.log('读取文件内容 utf8: ', data);
// })


// writeFile
// 如果路径不存在, 会创建文件, 默认是 utf-8 编码, w+(清空再写入)
fs.writeFile(path.join(__dirname, 'data.txt'), '123', {
  mode: 438, // rw
  flag: 'r+', // 不清空，直接从开头写入（覆盖）, 即原文件 hello 会变成 123lo
  encoding: 'utf-8',
}, (err) => {
  console.log(err);
})


// appendFile 追加写入方式
fs.appendFile(path.join(__dirname, 'data.txt'), '追加的内容', (err, data) => {
  console.log(err, data);
})

// copyFile 拷贝文件数据到另一文件
// console.log(__dirname); /Users/banli/Desktop/course/course-nodejs/src/08-fs
// 是一次性打开写入的方式
fs.copyFile(__dirname + '/data.txt', __dirname + '/test.txt', (err) => {
  console.log('copy ok!');
})

// watchFile 对指定文件进行监控
// 注意：如果文件不存在不会报错
fs.watchFile(__dirname + '/data.txt', {
  interval: 20
}, (curr, prev) => {
  // atime
  // ctime
  // mtime 最后修改时间
  console.log(curr.mtime);
  console.log(prev.mtime);
  if (curr.mtime !== prev.mtime) {
    console.log('文件被修改了');
    fs.unwatchFile(__dirname + '/data.txt') // 可以传入参数，取消某个方法，和监听事件一样
  }
})
