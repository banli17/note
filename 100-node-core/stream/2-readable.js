const {
  Readable
} = require('stream')

let source = ['ni', 'hao', 'maya']

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
  console.log(a); // 初始会执行两次, read 会触发 readable
  // let data
  // while ((data = mr.read()) !== null) {
  //   console.log(data.toString());
  // }
})

// 流动模式
// mr.on('data', (chunk) => {
//   console.log(chunk.toString());
// })
