const fs = require('fs')
const path = require('path')

/**
 * 01 打开 a 文件, 利用 read 将数据保存到 buffer 中
 * 02 打开 b 文件, 利用 write 将 buffer 中数据写入到 b 中
 */
let buf = Buffer.alloc(10)

// 1 测试边读编写
// fs.open(__dirname + '/news.txt', 'r', (err, fd1) => {
// 	fs.open(__dirname + '/news_copy.txt', 'w', (err, fd2) => {
// 		fs.read(fd1, buf, 0, 10, 0, (err, bytesRead, buffer) => {
// 			fs.write(fd2, buffer, 0, 10, 0, (err, written) => {
// 				console.log('写入成功');
// 			})
// 		})
// 	})
// })

// 2. 数据完全拷贝

function copy(src, dist, size) {
  const buf = Buffer.alloc(size)
  let offset = 0

  function next(rfd, wfd) {
    fs.read(rfd, buf, 0, size, offset, (err, bytesRead) => {
      if (!bytesRead) {
        fs.close(rfd, () => {})
        fs.close(wfd, () => {})
        console.log('文件 copy 完成');
        return
      }
      offset += bytesRead
      console.log('offset: ', offset);
      fs.write(wfd, buf, 0, bytesRead, (err, written, buffer) => {
        // 虽然这里 单个字可能乱码， 但是写入后不是乱码
        console.log('写入的内容: ', written.toString(), buffer.toString());
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

copy(__dirname + '/news.txt', __dirname + '/news_copy.txt', 2)
