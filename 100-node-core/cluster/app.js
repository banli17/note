const http = require('http')

const s = http.createServer((req, res) => {
  console.log(window.location)

  const t = []
  setInterval(() => {
    t.push('hello')
  }, 10)

  res.end('hello')
})

// 响应心跳检测
process.on('message', data => {
  if (data === 'ping') {
    process.send('pong')
  }
})

s.listen('3000', () => {
  console.log('listen 3000')
})
