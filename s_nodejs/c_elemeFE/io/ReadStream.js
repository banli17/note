const fs = require('fs')
const {
    EventEmitter
} = require('events')
class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super()

        this.path = path
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || undefined
        this.start = options.start || 0
        this.end = options.end || Infinity
        this.highWaterMark = options.highWaterMark || 64 * 1024
        this.flowing = false
        this.fd = null
        this.open()
        this.pos = this.start

        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true
                this.read()
            }
        })
    }

    // 开始读
    read() {
        if (typeof this.fd !== 'number') {
            this.once('open', () => this.read())
        } else {
            const buf = Buffer.alloc(this.highWaterMark)
            let howMuchRead = this.end ? Math.min((this.end - this.pos + 1), this.highWaterMark) : this.highWaterMark

            fs.read(this.fd, buf, 0, howMuchRead, this.pos, (err, bytesRead) => {
                if (err) throw err
                if (this.flowing) {
                    if (bytesRead) {
                        this.pos += bytesRead
                        this.emit('data', this.encoding ? buf.slice(0, bytesRead).toString(this.encoding) : buf.slice(0, bytesRead))
                        this.read()
                    } else {
                        this.emit('end')
                        fs.close(this.fd, () => {
                            this.emit('close')
                        })
                    }
                }
            })
        }
    }

    resume() {
        this.flowing = true
        this.read()
    }

    pause() {
        this.flowing = false
    }

    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                return this.emit('error', err)
            }
            this.fd = fd
            this.emit('open')
        })
    }

    pipe(ws) {
        this.on('data', (chunk) => {
            let flag = ws.write(chunk)
            if (!flag) {
                this.pause()
            }
        })
        ws.on('drain', () => {
            console.log('drain')
            this.resume()
        })
        this.on('end', () => {
            fs.close(this.fd, ()=>{
                
            })
        })
    }
}


module.exports = ReadStream