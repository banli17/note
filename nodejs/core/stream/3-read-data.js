import { Readable, Writable } from 'stream'
import '../global.js'

const readableStream = new Readable({
  read() {},
})
const writableStream = new Writable()

writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

readableStream.pipe(writableStream)

readableStream.push('hi!')
readableStream.push('ho!')
