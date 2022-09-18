import fs from 'fs'
import '../global.js'

const ws = fs.createWriteStream(resolve('stream/test3.txt'), {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3,
})

ws.write(Buffer.from('你好'), () => {
  console.log(`数据写完了 1`)
})

ws.write('123456', () => {
  console.log(`数据写完了 2`)
})

// The "chunk" argument must be of type string or an instance of Buffer or Uint8Array. Received type number (1)
// 文件流只能写 buffer 和字符串
// ws.write(1, () => {
//   console.log(`数据写完了 1`)
// })
