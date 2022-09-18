# http 模块

## Classes

http 模块提供了 5 个 class

- http.Agent
- http.ClientRequest
- http.Server
- http.ServerResponse
- http.IncomingMessage

### http.Agent

Node.js 会创建一个全局的 http.Agent 实例，用于客户端管理连接持久化和重用。

该对象确保向服务器发出的每个请求都排队并重用单个 socket。

它会维护一个 sockets 池，这是性能原因的关键。

### http.ClientRequest

调用 http.request() 或 http.get() 时会创建一个 http.ClientRequest 对象。

当接收到响应时，response 事件会触发，并有一个 http.IncomingMessage 实例作为参数。

```js
const req = http.request()

req.on('response', (incomingMessage) => {})
```

返回的数据有 2 种方式读取。

- 通过 response.read() 方法 ???
- 在 response 事件处理函数里，监听 data 事件

### http.Server

http.createServer() 创建新服务器时实例化并返回。

一旦你有了一个服务器对象，你就可以访问它的方法：

- close() 阻止服务器接受新连接
- listen() 启动 HTTP 服务器并监听连接

### http.ServerResponse

由 http.Server 创建，并作为第二个参数传递给它的 response 事件处理函数。

```js
const serve = http.createServer((req, res) => {
  // res 是一个 http.ServerResponse 对象
})
```

对每次响应，都必须调用 res.end() 方法关闭并将数据发给客户端。

**http headers 的相关方法**

- getHeaderNames() 获取已设置的 headers 名称列表
- getHeaders() 获取已设置的 headers 的副本
- setHeader('name', value)
- getHeader('name')
- removeHeader('name')
- hasHeader('name')
- headersSent() 如果 headers 已经发送到客户端，则返回 true

通过 response.writeHead() 可以将 headers 发送给客户端。

要在响应体里发送数据给客户端，可以使用 write() 方法。它会发送 buffer 数据到 http 响应流。

如果尚未使用 response.writeHead() 发送标头，它将首先发送标头，其中包含在请求中设置的状态代码和消息，您可以通过设置 statusCode 和 statusMessage 属性值进行编辑

```js
response.statusCode = 500;
response.statusMessage = 'Internal Server Error';
```

### http.IncomingMessage

http.IncomingMessage 对象由以下方式创建：

- http.Server 监听请求事件时
- http.ClientRequest 监听响应事件时

它有下面属性:

- req.statusCode 和 req.statusMessage()
- req.headers() 和 req.rawHeaders
- req.method()
- req.httpVersion()
- req.url()
- req.socket

http.IncomingMessage() 实现了 Readable Stream 接口。
