import { Writable } from 'stream'
import '../global.js'

const writableStream = new Writable()
writableStream._write = (chunk, encoding, next) => {
  console.log(chunk.toString())
  next()
}

process.stdin.pipe(writableStream)
