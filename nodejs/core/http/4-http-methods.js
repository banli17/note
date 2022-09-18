import http from 'http'
import '../global.js'

// 返回一个 http.Server 类的实例
const server = http.createServer((req, res) => {})


const options = {
  hostname: 'a.com',
  port: 3000,
  headers: {},
}

// 发送 http 请求, 创建一个 http.ClientRequest 的实例
// http.request(options, callback)
// http.get(url | options, callback), 会自动调用 req.end() 方法


