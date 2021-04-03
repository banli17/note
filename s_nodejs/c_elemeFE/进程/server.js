const http = require('http')

console.log(process.pid)

http.createServer(function (req, res) {
    res.end('hello')
}).listen(3000)