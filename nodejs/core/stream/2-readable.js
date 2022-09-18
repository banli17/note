import { Readable } from 'stream'
import '../global.js'

let source = ['ni', 'hao', 'maya']

// 创建一个可读流 方式1
const readableStream = new Readable()
readableStream._read = () => {}
// 然后就可以 push 数据了
readableStream.push('hello')
readableStream.push('world')
// 是使用链表进行存储的数据
// BufferList { head: [Object], tail: [Object], length: 2 }
// {
//   data: <Buffer 68 65 6c 6c 6f>,
//   next: { data: <Buffer 77 6f 72 6c 64>, next: null }
// }
// l(readableStream._readableState.buffer.head.data.toString()) // hello

// 或者
// const readableStream = new Readable({
//   read(){}
// })

/**
 * 创建可读流, 方式2
 */
class MyReadable extends Readable {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    let data = this.source.shift() || null
    this.push(data)
  }
}

const mr = new MyReadable(source)
// 暂停模式，需要手动调用 read 方法
mr.on('readable', (a) => {
  console.log(a) // 初始会执行两次, read 会触发 readable
  // let data
  // while ((data = mr.read()) !== null) {
  //   console.log(data.toString());
  // }
})

// 流动模式
// mr.on('data', (chunk) => {
//   console.log(chunk.toString());
// })
