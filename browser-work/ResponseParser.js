// 解析响应数据的状态机
class ResponseParser {
  constructor() {
    // 状态
    this.HTTP_VERSION_WAITING = 3
    this.HTTP_CODE_WAITING = 5
    this.HTTP_MSG_WAITING = 7
    this.HEADING_WAITING = 9
    this.BODY_WAITING = 11

    this.state = this.HTTP_VERSION_WAITING
    this.token = ''

    this.httpVersion = ''
    this.headersArr = []
    this.headers = {}
    this.body = null
  }

  parse(str) {
    for (let i of str) {
      this.receive(i)
    }
  }

  emit(token, key) {
    this[key] = token

    console.log(token, this.headersArr)
  }

  receive(char) {
    if (this.state === this.HTTP_VERSION_WAITING) {
      if (char === ' ') {
        this.state = this.HTTP_CODE_WAITING
        this.emit(this.token, 'httpVersion')
        this.token = ''
        return
      }
    }
    if (this.state === this.HTTP_CODE_WAITING) {
      if (char === ' ') {
        this.state = this.HTTP_MSG_WAITING
        this.emit(this.token, 'statusCode')
        this.token = ''
        return
      }
    }
    if (this.state === this.HTTP_MSG_WAITING) {
      if (char === '\r') {
        this.state = this.HEADING_WAITING
        this.emit(this.token, 'statusMsg')
        this.token = ''
        return
      }
    }
    if (this.state === this.HEADING_WAITING) {
      if (char === ':' || char === '\r') {
        this.headersArr.push(this.token)
        this.token = ''
        return
      }
    }
    this.token += char
  }
}

new ResponseParser().parse(`HTTP/1.1 200 OK\r\n
Content-Type: text/html\r\n
X-Foo: bar\r\n
aa: aaa\r\n
Date: Wed, 13 Apr 2022 13:21:53 GMT\r\n
Connection: keep-alive\r\n
Keep-Alive: timeout=5\r\n
Transfer-Encoding: chunked\r\n\r\n
1e\r\n
{"name":"zhangsan","age":"12"}\r\n
0`)

// module.exports = ResponseParser
