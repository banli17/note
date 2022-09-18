import fs from 'fs'
import '../global.js'

const ws = fs.createWriteStream(resolve('stream/test.txt'), {
  flags: 'w',
  mode: 438,
  fd: null,
  encoding: 'utf-8',
  start: 0,
  highWaterMark: 3,
})

// createWriteStream 时就会触发，没有 write 也会被触发
ws.on('open', (fd) => {
  l('open', fd)
})

ws.write('1')

// close 是在数据写入操作全部完成后执行
ws.on('close', () => {
  l('文件关闭了')
})

// end 表示数据写入全部完成了
ws.end()
// ws.end('结束了')

// ws.write(2) // 这里数字 2 会报语法错误，不能触发 error 事件

ws.on('error', (e) => {
  l('出错了', e) // Error [ERR_STREAM_WRITE_AFTER_END]: write after end
})

ws.write('2')
