import fs from 'fs'

/**
 * readStream 的事件
 */
let rs = fs.createReadStream(__dirname + '/test.txt', {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  highWaterMark: 4,
})


// createReadStream 后就会触发 open 事件
rs.on('open', (fd) => {
  console.log(fd, '文件打开了')
})

// 默认情况下不会触发，默认流是暂停模式
rs.on('close', (fd) => {
  console.log(fd, '文件关闭了') // undefined 文件关闭了
})

let bufArr = []
rs.on('data', (chunk) => {
  bufArr.push(chunk)
  console.log(chunk)
})

rs.on('end', () => {
  console.log('数据结果: ', Buffer.concat(bufArr).toString())
  console.log(`当数据被清空之后`)
})

rs.on('error', () => {
  console.log(`出错了, 比如文件路径有问题`)
})
