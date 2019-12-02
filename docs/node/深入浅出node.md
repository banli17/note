# 深入浅出 node.js

## 7.网络编程

Node 提供了四个模块来处理网络请求。

- net: 处理 tcp
- dgram: 处理 udp
- http: 处理 http
- https: 处理 https

### TCP

tcp 处于七层网络协议的传输层，http、smtp、imap 等协议是基于 tcp 的。三次握手。

创建会话的过程中，服务器端和客户端之间分别提供一个套接字，这两个套接字共同形成一个连接，服务器端和客户端则通过套接字实现两者直接连接的操作。

创建 tcp 服务器端

Domain Socket https://www.cnblogs.com/sparkdev/p/8359028.html

```js
server.listen('/tmp/echo.sock'); //对Domain Socket进行监听
var client = net.connect({path: '/tmp/echo.sock'});
```

可以通过 net 来创建服务端和客户端。

1. 服务端

```js
var server = net.createServer(function(socket){})
server.listen(8124)
```

2. 服务端

```js
var server = net.createServer()
server.on('connection', function(socket){})
server.listen(8124)
```

3. 客户端

```js
const client = net.connect({port: 8124},function(){

})
client.on('data', funciton(data){})
```

服务器事件

net.createServer()创建的服务器，它是一个EventEmitter实例，自定义事件有：

- listening: 通过server.listen(port, listeningListener)绑定端口或Domain Socket后触发，第二个参数传入
- connection: 客户端连接时触发，简写为net.createServer()最后一个参数传入
- close：服务器关闭时触发，调用server.close()后，服务器将停止接受新的套接字连接，但保持当前存在的连接，等待所有连接都断开后，会触发该事件
- error: 服务器异常时触发

连接事件
服务器可以同时和多个客户端连接，每个连接都是可读写的Stream对象，通过data事件读取另一端的数据，通过write()将数据发送到另一端。
- data
- end: 当连接中任意一端发送了FIN数据
- connect: 连接成功时触发
- drain: 任意一端调用write发送数据时，当前这端会触发该事件
- error: 
- close
- timeout: 一定时间后连接不再活跃时，该时间会被触发，通知用户当前连接已经被闲置，可以通过socket.setTimeout(3000);设置时长

两端都有这些事件。

Nagle算法[neɪgəl]

Nagle算法主要避免网络因为太多的小包（协议头的比例非常之大）而拥塞。

tcp 对网络数据中的小数据包会进行优化，要求缓冲区的数据达到一定数量或一定时间后才将其发出，所以小数据包会被Nagle算法合并，以此优化网络。这种优化虽然使网络带宽被有效利用，但是数据可能会延迟发送。

node 中，tcp 默认使用了 Nagle算法，可以调用 socket.setNoDelay(true)去掉Nagle算法，使得write可以立即发送数据到网络中。

一端的write 会触发另一端的data事件，但是并不是每次write都会触发data事件，在关闭Nagle算法后，另一端会收到多个小数据包合并，然后只触发一次data事件。


## HTTP

curl -v 可以显示这次网络通信的所有报文信息

node 中，http 模块继承自 tcp 服务器(net 模块)，它能够与多个客户端保持连接。它是采用事件驱动，不为每个连接创建额外的线程或进程。


客户端

- `host`: 服务器的域名或 IP 地址，默认为 localhost
- `hostname`: 服务器名称
- `port`
- `localAddress`: 建立网络连接的本地网卡
- `socketPath`: Domain 套接字路径
- `method`: HTTP 请求方法，默认为 GET
- `path`: 请求路径，默认为 /
- `headers`: 请求头对象
- `auth`: Basic 认证，这个值被计算成请求头中的 Authorization 部分

请求体的内容由请求对象的 write() 和 end() 方法实现，write() 向连接中写入数据，end() 告知报文结束。

clientRequest 对象中，事件叫 response，ClientRequest 对象解析完响应头时，会触发request事件，同时传递一个响应对象以供操作 ClientRequest，后续响应报文体以只读流的方式提供。

为了重用 TCP 连接，http 模块包含一个默认的客户端代理对象 http.globalAgent，他对每个服务器端(host+port)创建的连接进行管理，默认情况下，通过ClientRequest对象对同一个服务器端发起的HTTP请求最多可以创建5个连接，多余的会排队等待，实质是一个连接池。这与浏览器同一个域名连接数限制行为是相同的。

可以通过下面方法改变。或者将 agent 设置为 false 脱离连接池管理。

```
var agent = new http.Agent({
    maxSockets: 10
})
var options = {
    ...
    agent: agent
}
```

可以通过 Agent 对象的 sockets 和 requests 属性，分析业务状态的繁忙程度。
sockets: 当前连接池中使用中的连接数
requests：处于等待的请求数