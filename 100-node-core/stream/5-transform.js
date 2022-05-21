let {
  Transform
} = require('stream')

class MyTransform extends Transform {
  constructor() {
    super()
  }
  _transform(chunk, en, cb) {
    // write 的数据会塞给 可读流的 数据
    this.push(chunk.toString().toUpperCase())
    cb(null)
  }
}

let m = new MyTransform()

m.write('abc')

m.on('data', chunk => {
  console.log(chunk.toString());
})
