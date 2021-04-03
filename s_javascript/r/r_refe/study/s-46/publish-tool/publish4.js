// 将代码打包后上传
const http = require('http')
const fs = require('fs')
const path = require('path')
const archiver = require('archiver');

const outputFile = path.resolve(__dirname, 'code.zip')

const output = fs.createWriteStream(outputFile);

const archive = archiver('zip', {
    zlib: {level: 9}
})
archive.on('end', () => {
    console.log('打包完成...')
    fs.stat(outputFile, (err, stat) => {
        console.log(err, stat.size)
        const options = {
            hostname: 'localhost',
            port: 5003,
            path: '/?filename=code.zip',
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
        req.on('close', e => {
            console.log('close')
        })
        req.on('error', e => {
            console.log(e)
        })
        console.log('outputFile', outputFile)
        let readStream = fs.createReadStream(outputFile)
        readStream.on('end', (data) => {
            req.end()
        })
        readStream.pipe(req)
    })

})
archive.on('err', (err) => {
    console.log('err', err)
})
archive.pipe(output);
archive.directory(path.resolve(__dirname, 'dist'))

archive.finalize()
