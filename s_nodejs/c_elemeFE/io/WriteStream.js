const fs = require('fs')
const EventEmitter = require('events')

class WriteStream extends EventEmitter {
    constructor(path, options = {}) {
        super()

        this.path = path
        this.flags = options.flags || 'w'
        this.encoding = options.encoding || 'utf8'
        this.start = options.start || 0
        this.highWaterMark = options.highWaterMark || 16 * 1024

        this.open()
        // 第一次的写入，后面的放入到缓存中
        this.cache = []

        this.len = 0
        this.needDrain = false
        this.offset = this.start
        this.writing = false
    }

    clearBuffer() {
        let obj = this.cache.shift()
        if (obj) {
            this._write(obj, chunk, obj, this.encoding, () => {
                obj.callback()
                this.clearBuffer()
            })
        } else {
            if (this.needDrain) {
                this.needDrain = false
                this.writing = false
                this.emit('drain')
            }
        }
    }

    write(chunk, encoding, callback = () => {}) {
        if (typeof encoding === 'function') {
            callback = encoding
            encoding = this.encoding
        }
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length
        let ret = this.len < this.highWaterMark
        // 正在写，则将其余的放入缓存中
        if (this.writing) {
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        } else {
            this.writing = true
            this._write(chunk, encoding, () => {
                callback()
                this.clearBuffer()
            })
        }
        return ret
    }

    // 真实写入
    _write(chunk, encoding, callback) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => {
                this._write(chunk, encoding, callback)
            })
        } else {
            fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
                this.offset += written
                this.len -= written

                callback()
            })
        }
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) throw err
            this.fd = fd
            this.emit('open', this.fd)
        })
    }

    end(chunk, callback = () => {}) {
        if (this.fd) {
            this.write(this.chunk, this.encoding, callback)
            fs.close(this.fd, () => {})
        }
    }
}

module.exports = WriteStream