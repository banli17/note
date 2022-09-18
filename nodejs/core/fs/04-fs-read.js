import fs from 'fs'
import '../global.js'


// read: 所谓读操作，就是将数据从磁盘文件中写入到 buffer 中
let buf = Buffer.alloc(10)

fs.open(resolve('fs/news.txt'), 'r', (err, fd) => {
  /** fs.read(fd, buffer, offset, length, start, callback)
   *  - fd 打开的文件
   *  - buf 缓冲区
   *  - 1: offset, 从 buf 哪个位置开始写操作
   *  - 3: length 从文件里读取的长度(字节)
   *  - 0: start 从 fd 那个位置开始读取
   */
  let offset = 1
  let len = 3
  let start = 3
  fs.read(fd, buf, offset, len, start, (err, bytesRead, buffer) => {
    if (err) l(err)
    // bytesRead: 读了多少个字节
    // buffer 读到的数据
    l(bytesRead) // 3
    l(buffer) // 3
    l(buffer.subarray(offset, len + offset).toString('utf8')) // 相
  })
})
