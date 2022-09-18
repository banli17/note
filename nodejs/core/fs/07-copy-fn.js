import fs from 'fs'
import '../global.js'

/**
 * 实现 copy 数据完全拷贝
 * @param {*} src
 * @param {*} dist
 * @param {*} size
 */
function copy(src, dist, size) {
  const buf = Buffer.alloc(size)
  let offset = 0

  function next(rfd, wfd) {
    fs.read(rfd, buf, 0, size, offset, (err, bytesRead) => {
      if (!bytesRead) {
        fs.close(rfd, () => {})
        fs.close(wfd, () => {})
        console.log('文件 copy 完成')
        return
      }
      offset += bytesRead
      console.log('offset: ', offset)
      fs.write(wfd, buf, 0, bytesRead, (err, written, buffer) => {
        // 虽然这里 单个字可能乱码， 但是写入后不是乱码
        console.log('写入的内容: ', written.toString(), buffer.toString())
        next(rfd, wfd)
      })
    })
  }
  // w , w+ 都是会清空文件，覆盖写入
  // a+ 追加写入， r+ 是覆盖写入
  fs.open(src, 'r', (err, rfd) => {
    fs.open(dist, 'w', (err, wfd) => {
      next(rfd, wfd)
    })
  })
}

copy(resolve('fs/news.txt'), resolve('fs/news_copy.txt'), 2)
