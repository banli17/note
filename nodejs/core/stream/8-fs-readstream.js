import fs from 'fs'
import '../global.js'

let rs = fs.createReadStream(resolve('stream/test.txt'), {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: 438,
  autoClose: true,
  start: 0,
  // end: 3,
  highWaterMark: 4,
})

// readable 第一次触发：缓存区有数据后会通知,表示可以拿了，缓存区有 highWaterMark 个数据
// 如果监听了 readable, 就不会触发 data 事件了, 需要手动调用 read
rs.on('readable', () => {
  l('readable 触发了')
  let data = rs.read()
  console.log(data)
  // let data
  // while ((data = rs.read(1)) !== null) {
  //   console.log(data.toString())
  //   // _readableState 缓存区内容对象  // .buffer
  //   // 数据拿完后，会再 push highWaterMarker 数据
  //   // console.log('*******', rs._readableState)
  //   console.log('--------', rs._readableState.length)
  // }
})

// 会持续的触发 data，直到数据读取完
// rs.on('data', (chunk) => {
//   console.log('data', chunk.toString())
//   rs.pause() // 缓存区读完后暂停
//   setTimeout(() => {
//     rs.resume()
//   }, 1000)
// })
