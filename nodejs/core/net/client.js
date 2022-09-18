const net = require('net')

const client = net.createConnection({
  port: 1234,
  host: '127.0.0.1'
})


client.on('connect', () => {
  client.write(`i am a client`)

  // 1. 粘包问题, tcp 是流传输的，没有数据边界
  // client.write(`i am a client2`)
  // client.write(`i am a client3`)
  // client.write(`i am a client4`)
  // client.write(`i am a client5`)

  // 可以解决粘包问题，不能性能不行
  // setTimeout(() => {
  //   client.write(`i am a client2`)
  //   setTimeout(() => {
  //     client.write(`i am a client3`)
  //   })
  // })
})

client.on('data', (chunk) => {
  console.log(chunk.toString())
})

client.on('error', (err) => {
  console.log(err)
})

client.on('close', () => {
  console.log(`client is closed`)
})
