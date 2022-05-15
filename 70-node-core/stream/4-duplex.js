let {
  Duplex
} = require('stream')

class MyDuplex extends Duplex {
  constructor(source) {
    super()
    this.source = source
  }

  _read() {
    let data = this.source.shift() || null
    this.push(data) // push 放到可读流缓存中
  }

  _write(chunk, en, next) {
    process.stdout.write(chunk)
    process.nextTick(next)
  }
}

let source = ['a', 'b', 'c']

let md = new MyDuplex(source)
md.on('data', (chunk) => {
  console.log('data', chunk.toString());
})
md.write('你好啊', () => {
  console.log(1111);
})
