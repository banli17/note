// 发一个请求
const http = require('http')

const postData = JSON.stringify({
    filename: 'x.html',
    content: 'helo 你好1'
})
const options = {
    hostname: 'localhost',
    port: 5003,
    path: '/',
    method: 'POST',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
}

const req = http.request(options, (req, res) => {
    console.log(res)
})
req.on('error', e => {
    console.log(e)
})
req.write(postData)
req.end()
