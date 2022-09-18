import fs from 'fs'
import '../global.js'

/**
 * 控制文件写入速度
 */

const rs = fs.createReadStream(resolve('stream/test.txt'), {
  highWaterMark: 6,
})

const ws = fs.createWriteStream(resolve('stream/test1.txt'), {
  highWaterMark: 3,
})

rs.on('data', (chunk) => {
  // console.log('读取到', chunk)
  const ret = ws.write(chunk, () => {
    l('写入', chunk)
    // rd.resume()
  })

  if (!ret) {
    rs.pause()
  }
})

ws.on('drain', () => {
  setTimeout(() => {
    rs.resume()
  }, 2000)
})
