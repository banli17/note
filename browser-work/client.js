const net = require('net')

class Request {
  constructor(options) {
    this.method = options.method || 'GET'
    this.host = options.host
    this.port = options.port
    this.body = options.body

    this.headers = options.headers || {}

    const contentType = this.headers['Content-Type']

    if (!contentType) {
      this.headers['Content-Type'] = 'application/json'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`)
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  toString() {
    // 前面后面都可以有空行
    const str = `
${this.method} / HTTP/1.1
${Object.keys(this.headers).map(key=> `${key}: ${this.headers[key]}`).join('\r\n')}

${this.bodyText}
`
    return str
  }

  send() {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        this.client = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          this.client.write(this.toString())
        })
      } else {
        this.client.write(this.toString())
      }
      this.client.on('data', (data) => {
        resolve(data.toString()) // 这里收到的是http数据流 ，如`HTTP/1.1 200 OK.....`
        this.client.end()
      })
      this.client.on('error', () => {
        reject(data)
        this.client.end()
      })
    })
  }
}

class Response {

}

new Request({
  port: 9999,
  host: '127.0.0.1',
  body: {
    name: 'wangwu'
  }
}).send().then(res => {
  console.log('result', res)
}).catch(e => {
  console.log('error', e)
})

// 看看 OPTIONS GET POST rfc2616

// const client = net.createConnection({
//   port: 9999,
//   host: '127.0.0.1'
// }, (a) => { // 这里没有参数为 undefined
//   console.log('connected to server!', a) // undefined

//   // 1
//   // client.write(`POST / HTTP/1.1\r\n`)
//   // client.write(`Content-Type: application/json\r\n`)
//   // client.write(`Content-Length: 7\r\n\r\n`) // 必须要有 Content-Length 才能成功发送，另外要换两行，否则报错400 Bad Request
//   // client.write(`name=zs`)

//   // 2
//   const request = new Request({
//     method: 'POST',
//     body: {
//       name: 'lisi'
//     }
//   })
//   console.log('request.toString()', request.toString())
//   client.write(request.toString())

//   console.log('request sent!')
// })

// client.on('data', (data) => {
//   console.log('data', data.toString())
//   client.end()
// })
