import fs from 'fs'
import EventEmitter from 'events'
import '../global.js'

const kFs = Symbol('kFs')

class WritableState {
  constructor(options, stream) {
    // 表示累计写入字节数
    this.length = options.length || 0

    // 是否写入过
    this.writing = options.writing || false

    // 强制第一次写入到缓存
    this.corked = options.corked || false

    this.defaultEncoding = options?.defaultEncoding || 'utf8'

    this.onwrite = this.onwrite.bind(this, stream)

    this.highWaterMarker = options.highWaterMarker || 16 * 1024 * 1024 // 默认是 16kb, 文件是 64kb

    this.buffered = []
  }

  onwrite(stream) {
    clearBuffer(stream, this)
    afterWrite(stream, this)
  }
}

// buffer 清空完成后，触发 drain 事件，通知继续生产
function afterWrite(stream, state) {
  if (state.needDrain) {
    state.needDrain = false
    stream.emit('drain')
  }
}

function clearBuffer(stream, state) {
  state.buffered.forEach((buf) => {
    doWrite(stream, buf)
  })
}

function doWrite(stream, buf) {
  stream._write(buf.chunk, buf.encoding, buf.callback)
}

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super(options)
    this.path = path // fd 指定后，path会被忽略
    this.fd = options.fd
    this[kFs] = options.fs || fs
    this.bytesWritten = 0
    this.flags = options.flags || 'w'

    if (typeof this.fd !== 'function') {
      _openWriteFs(this)
    }
  }

  _write(data, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        this._write(data, encoding, cb)
      })
    }

    this[kFs].write(this.fd, data, 0, data.length, this.pos, (er, bytes) => {
      this.bytesWritten += bytes
      cb()
    })

    if (this.pos !== undefined) this.pos += data.length
  }
}

function _openWriteFs(stream) {
  stream[kFs].open(stream.path, stream.flags, (err, fd) => {
    console.log(err)
    stream.fd = fd
    stream.emit('open')
  })
}

/**
 * write() 方法源码解析
 */
class Writable extends WriteStream {
  constructor(path, options = {}) {
    super(path, options)
    this._writableState = new WritableState(options, this)
  }

  write(chunk, encoding, callback) {
    const state = this._writableState

    // 1、规格化参数
    if (typeof encoding === 'function') {
      callback = encoding
      encoding = 'utf8'
    }

    if (!callback) {
      callback = () => {}
    }

    // 2、将 chunk 转成 buffer
    chunk = Buffer.from(chunk)
    encoding = 'buffer'

    // 3、调用 writeOrBuffer()
    return writeOrBuffer(this, state, chunk, encoding, callback)
  }
}

function writeOrBuffer(stream, state, chunk, encoding, callback) {
  let len = chunk.length

  state.length += len

  const ret = state.length < state.highWaterMarker
  if (!ret) {
    state.needDrain = true
  }

  if (state.writing || state.corked) {
    // 写入到缓存中
    state.buffered.push({ chunk, encoding, callback })
    l(state.buffered)
  } else {
    // 第一次直接写到文件中
    state.writelen = len
    state.writecb = callback
    state.writing = true
    state.sync = true
    stream._write(chunk, encoding, state.onwrite)
    state.sync = false
    l('第一次写入:', chunk.toString())
  }

  return ret
}

const ws = new Writable(resolve('stream/test2.txt'), {
  highWaterMarker: 3,
})

ws.write('你好啊')
ws.write('朋友')
ws.write('来')
