import { Writable } from 'stream'
import '../global.js'

class MyWritable extends Writable {
  constructor() {
    super()
  }

  // en 编码
  _write(chunk, en, done) {
    console.log(chunk)
    process.stdout.write(chunk.toString() + '<---')
    process.nextTick(done)
  }
}

const mw = new MyWritable()

mw.write('你好啊', 'utf-8', () => {
  console.log('end')
})
