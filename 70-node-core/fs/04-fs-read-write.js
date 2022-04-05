const fs = require('fs')
const path = require('path')

// read: 所谓读操作，就是将数据从磁盘文件中写入到 buffer 中
let buf = Buffer.alloc(10)

// fs.open(__dirname + '/news.txt', 'r', (err, fd) => {
// 	// 参数分别是
// 	// fd 打开的文件
// 	// buf 缓冲区
// 	// 1: offset, 从 buf 哪个位置开始写操作
// 	// 3: length 读取的长度(字节)
// 	// 0: start 从 fd 那个位置开始读取
// 	fs.read(fd, buf, 1, 3, 3, (err, bytesRead, buffer) => {
// 		if (err) console.log(err);
// 		// bytesRead: 读了多少个字节
// 		// buffer 读到的数据
// 		console.log(bytesRead); // 3
// 		console.log(buffer); // 3
// 		console.log(buffer.toString('utf-8')); // 相
// 	})
// })

// write 将缓冲区的内容写入到磁盘中
buf = Buffer.from('1234567890')
fs.open(__dirname + '/number.txt', 'w', (err, fd) => {
  // 从 buf 的第2个位置开始读，往 fd 文件里 0 位置开始写入
  // fd
  // buf
  // 2 从 buf 那个位置开始读
  // 4 length 写入了多少个字节长度
  // 0 position 从 fd 文件中哪个位置开始写, 一般不动，容易将前面改成乱码
  fs.write(fd, buf, 2, 4, 2, (err, written, buffer) => {
    console.log(written); // 3 写入了多少个字节
    console.log(buffer); // 写入的 buffer
    console.log(buffer.toString());
  })
})
