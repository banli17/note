import fs from 'fs'
import '../global.js'

let buf = Buffer.from('1234567890')

fs.open(resolve('fs/number.txt'), 'w', (err, fd) => {
  /* 从 buf 的第2个位置开始读，往 fd 文件里 0 位置开始写入
   * fd
   * buf
   * 2 从 buf 那个位置开始读
   * 4 length 写入了多少个字节长度
   * 0 position 从 fd 文件中哪个位置开始写, 一般不动，容易将前面改成乱码，导致文件无法显示
   */
  fs.write(fd, buf, 2, 4, 2, (err, written, buffer) => {
    console.log(written) // 3 写入了多少个字节
    console.log(buffer) // 写入的 buffer
    console.log(buffer.toString())

    fs.close(fd)
  })
})
