const net = require('net')

// 创建服务器实例
const server = net.createServer()

const PORT = 1234
const HOST = 'localhost'

server.listen(PORT, HOST)

server.on('listening', () => {
  console.log(`server listen on ${HOST}:${PORT}`)
})

// socket 是一个双工流，可读可写
server.on('connection', (socket) => {
  socket.on('data', (chunk) => {
    const msg = chunk.toString()
    console.log(msg)

    // 回数据
    socket.write(Buffer.from('hello, ' + msg))
  })
})

server.on('close', () => {
  console.log(`server is closed`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`server port is in use!`);
  } else {
    console.log(`server error:`, err);
  }
})
