import http from 'http'
import '../global.js'


// 收到 request 事件时，会触发回调方法
const server = http.createServer(async (req, res) => {
  // req.on('data', (data) => {
  //   console.log('收到请求', data)
  // })
  // req.on('end', () => {
  //   res.end()
  // })

  // for await 语法同上面
  // 接收请求体的数据, 请求数据是一个 stream
  let chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }

  const reqData = Buffer.concat(chunks).toString()
  console.log('aaa', chunks)
  console.log(reqData)
  console.log(req.url)

  res.statusCode = 200 // 状态码并不会影响最终的浏览器页面显示

  res.setHeader('Content-Type', 'text/css')

  res.end('hello world')
})

server.listen(3000, () => {
  console.log(`listen on http://localhost:3000`)
})
