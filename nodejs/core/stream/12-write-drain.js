import fs from 'fs'
import '../global.js'

/**
 * write 执行流程
 */

const ws = fs.createWriteStream(resolve('stream/test.txt'), {
  highWaterMark: 3,
})

// 生产者 - 流 (内部有缓冲区, 默认 16k) -> 消费者(文件)
// 1. 第一次 write 时，会直接向文件里写入 (corked 可以控制第一次往缓存中写)
// 2. 第二次 write 时，会想缓冲区写入
// 一般来说，消费者消费速度要小于生产者生产速度
// flag 如果是 false 表示 生产 > 消费了，让生产暂停， state.length < highWaterMarker
// 当缓存区清空时，会发出 drain 事件，通知可以生产了
// 语法: write(chunk, encoding, cb)
let flag = ws.write('1') // '1' -> code 49
l(flag)

flag = ws.write('2')
l(flag)

flag = ws.write('3')
l(flag)
// true
// true
// false

flag = ws.write('456789')
l(flag) // false

flag = ws.write('78')
l(flag) // false

flag = ws.write('78aa')
l(flag) // false

