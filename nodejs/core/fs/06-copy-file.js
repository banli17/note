import fs from 'fs'
import '../global.js'

/**
 * 01 打开 a 文件, 利用 read 将数据保存到 buffer 中
 * 02 打开 b 文件, 利用 write 将 buffer 中数据写入到 b 中
 */
let bytes = 10 // 缓冲区为 10
let buf = Buffer.alloc(bytes)
let start = 0
let isReadEnd = false

// 1 测试边读编写
fs.open(resolve('fs/news.txt'), 'r', (err, fd1) => {
  fs.open(resolve('fs/news_copy.txt'), 'w', (err, fd2) => {
    function copy() {
      if (isReadEnd) {
        return
      }
      fs.read(fd1, buf, 0, bytes, start, (err, bytesRead, buffer) => {
        if (bytesRead < bytes) {
          isReadEnd = true
          fs.close(fd1)
        }
        console.log('读出来字节数', bytesRead, buffer.toString())

        fs.write(fd2, buffer, 0, bytesRead, start, (err, written, buffer) => {
          console.log('写入成功, 字节数', isReadEnd, written, buffer.toString())
          start += bytesRead
          if (isReadEnd) {
            fs.close(fd2)
          } else {
            copy()
          }
        })
      })
    }

    copy()
  })
})
