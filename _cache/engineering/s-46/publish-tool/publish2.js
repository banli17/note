// 流式上传文件
const http = require('http')
const fs = require('fs')

const filename = './a.vep'

fs.stat(filename, (err, stat) => {
    const options = {
        hostname: 'localhost',
        port: 5003,
        path: '/?filename=a.vep',
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/octet-stream',
            'Content-Length': stat.size
        }
    }

    const req = http.request(options, (res) => {
        console.log(res.statusCode)
        console.log(res.headers)
        const data = []
        res.on('data', (chunk) => {
            data.push(chunk)
            console.log('数据中' + chunk)
        })
        res.on('end', () => {
            console.log('数据是', data.toString())
        })
    })
    req.on('error', e => {
        console.log(e)
    })
    let readStream = fs.createReadStream(filename)
    readStream.pipe(req)
    readStream.on('end', (data) => {
        req.end()
    })
})
