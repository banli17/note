const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')

  // response.writeHead(statusCode[, statusMessage][, headers])
  // 下面两个方法是相等的
  console.log(res.writeHeader === res.writeHead) // true

  req.on('data', (data) => {
    console.log('req data', data.toString())
  })
  res.writeHead(200, {
    'Content-Type': 'text/html',
    aa: 'aaa'
  })
  res.end(JSON.stringify({
    name: "zhangsan",
    age: "12"
  }))
})

server.listen('9999', () => {
  console.log('listen on http://localhost:9999')
})
