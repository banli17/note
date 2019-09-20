---
title: "网络协议之 HTTP"
sidebar_label: HTTP
---

## URI、URL、URN

`Uniform Resource Identifier`：统一资源标志符，它是资源的唯一标志。它包含`URL`和`URN`。

`Uniform Resource Locator`：统一资源定位器。它相当于通过地址找资源，是uri的一种形式。

```
# 协议有多种、http、ftp等
http://user:pass@host.com:80/path?query=string#hash
```

Universal Resource Name：统一资源名称，通过名称找资源，是uri的另一种形式。

## HTTP 

URL: 统一资源定位符。正是因为是统一的(有格式的)，所以浏览器才知道统一处理。

**HTTP 请求的准备**

0. 浏览器首先将 URL 进行 DNS 解析，解析成 IP。
0. 创建 TCP 连接。

**HTTP 请求的构建**

建立连接后，发送 HTTP 请求。HTTP/1.1 请求报文格式如下：

![](/img/net/http-1.png)

1. 请求行`方法 URL 版本`。
2. 首部字段，是`key:value`格式。
3. 实体



GET POST创建资源 PUT修改资源 DELETE
Accept-Charset 客户端可以接收的字符集，防止传过来的是另外的字符集，从而乱码
Content-Type 正文格式
Cache-control 缓存控制


http请求发送过程：

1. HTTP 层发出 stream 二进制流。
2. TCP 层将二进制流转成报文段。TCP 发送报文段时，加上自己的地址(源地址)和目标地址。将这两个信息放到 IP 头里面，交给 IP 层传输。
3. IP 层查看源地址和目标地址是否是同一个局域网。如果是，就发送 ARP 协议，请求目标地址的 MAC 地址，然后将源 MAC 和目标 MAC 放到 MAC 头，发出。如果不是，则需要发送给网关，即发送 ARP 协议获取网关的 MAC 地址，然后将源 MAC 和目标 MAC 放到 MAC 头，发出。
4. 网关收到包发现 MAC 符合，取出目标 IP，根据路由协议查找下一跳路由，获取下一跳路由的 MAC 地址，将包发出。
5. 到最后一跳路由器后，它发现目标地址就在这个局域网内，就发送 ARP 获取目标地址的 MAC 地址，将包发出去。
6. 目标机器发现 MAC 地址符合，就将包收起来；发现 IP 符合，就根据 IP 头的协议项，知道上一层是 TCP 协议，就解析 TCP 头，里面有序列号，看这个序列包是否是我要的，如果是就放到缓存中然后返回一个 ACK，如果不是就丢弃。
7. TCP 头里还有端口号，HTTP 的服务器正在监听这个端口号。目标机器就将这个包发给 HTTP 服务器进程。HTTP 服务器进程看到这个请求是要访问一个网页，于是将网页发送给客户端。

HTTP/1.1 响应报文格式：

![](/img/net/http-2.png)

使用`curl -v http://baidu.com`命令，可以查看报文。

```
> GET / HTTP/1.1
> Host: baidu.com
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Date: Sat, 10 Aug 2019 08:03:35 GMT
< Server: Apache
< Last-Modified: Tue, 12 Jan 2010 13:48:00 GMT
< ETag: "51-47cf7e6ee8400"
< Accept-Ranges: bytes
< Content-Length: 81
< Cache-Control: max-age=86400
< Expires: Sun, 11 Aug 2019 08:03:35 GMT
< Connection: Keep-Alive
< Content-Type: text/html
<
<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>
```

### HTTP 请求方法

> get 和 post 的区别？

get 和 post 主要是语义上的区别，get 表示获取资源，post 表示创建资源。

在技术上说：

- Get 请求能缓存，Post 不能
- Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里（当然你想写到 body 里也是可以的），且会被浏览器保存历史纪录。Post 不会，但是在抓包的情况下都是一样的。
- URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
- Post 支持更多的编码类型且不对数据类型限制


### HTTP 头

Retry-After表示，告诉客户端应该在多长时间以后再次尝试一下
“503 错误”是说“服务暂 时不再和这个值配合使用”。


### HTTP 状态码


http 状态码是用以表示网页服务器超文本传输协议响应状态的3位数字代码。

**1xx 消息**

表示请求已经接收需要继续处理。由于 HTTP/1.0 协议中没有定义任何 1xx 状态码，所以除非在某些试验条件下，服务器禁止向此类客户端发送 1xx 响应。

- `100 (Continue)`:客户端应继续发送

**2xx 成功**

这类状态码表示请求被接收。

- `200 OK`: 成功
- `204 No content`: 表示请求成功，但响应报文不含实体的主体部分
- `205 Reset Content`: 表示请求成功，但响应报文不含实体的主体部分，并要求请求方重置内容
- `206 Partial Content`: 表示范围请求，即请求部分数据

**3xx 重定向**

- `301 moved permanently`: 永久重定向
- `302 found`: 临时重定向
- `303 see other`: 表示资源存在另一个 URL，应使用 GET 方法获取资源
- `304 not modified`: 文件没修改，取缓存
- `305`: 必须通过指定代理才能访问
- `307 temporary redirect`: 临时重定向，和 302 类似，但是希望客户端保持请求方法不变，向新地址发出请求

**4xx 客户端错误**

- `400 bad request`: 语义有误或参数错误
- `401 unauthorized`: 需要用户验证
- `403 forbidden`: 服务器已经理解请求，但是拒绝执行
- `404 not found`: 文件没找到
- `408`: 请求超时

**5xx 服务端错误**

- `500 internal sever error`: 服务端错误，一般是代码错误
- `501 not implemented`: 服务器不具备完成请求的功能
- `502`: 网关错误，上游服务器无响应
- `503`: 服务器目前无法使用，停机维护或超载
- `504`: 网关超时，未能及时收到上游服务器响应
- `509`: 服务器带宽限制，非官方状态码，广泛使用
- `600` 源站没有返回响应头，只有实体内容

通过meta标签跳转

```html
<meta http-equiv="refresh" content="0;url=http://www.baidu.com">
```
cors跨域请求的限制于解决
`Content-Type`的作用

浏览器同域限制，浏览器实际已经发送并接受到了数据，但是把隐藏掉了。

```
res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
})
```

jsonp原理。


### HTTP 缓存机制

http 缓存分为强缓存和协商缓存。

**强缓存**

当浏览器打开 html 页面时，页面中包含一些资源链接如 css、js等，浏览器会将这些资源和资源的头信息缓存到本地，头信息里有 `expires` 和 `cache-control` 字段，表示资源的有效期。`expires`是一个 GMT 格式的时间字符串，表示大于这个时间资源就会过期失效(http 1.0)，由于这是服务器返回的时间，可能会和客户端时间有很大差距造成缓存错乱，所以 http1.1 版本使用了`cache-control:max-age=10`这样的字段，max-age 是一个相对时间，单位是秒，表示超过这么多秒资源就过期了。所以如果资源没有过期则使用浏览器本地的资源，这就是强缓存。

> 现在还写 expires 是为了兼容 http1.0，另外 max-age 的权重大于 expires。

> 强缓存只针对页面里的资源，如果新打开 css、js 资源的 url，浏览器会发请求到服务器。

**协商缓存**

协商缓存也叫做 304 缓存，就是浏览器本地的缓存资源到期失效后，于是重新请求服务器，服务器根据信息判断资源没有修改还可以继续使用。于是浏览器继续使用资源。

在浏览器本地缓存失效后，浏览器会重新请求资源，并带上资源的信息：If-None-Match(上次响应头 etag 的值，即资源的哈希值)、If-Modified-Since(上次响应头的 Last-Modified 值，即最后修改时间)。服务端可以根据这两个值判断是返回 304 还是 200。

> 有了最后修改时间，就可以判断资源有没有修改，为什么还需要 etag 呢？

因为资源可能修改后又撤销回去了，这时资源的最后修改时间改变了，但是资源内容没变，所以应该返回 304。

```js
// nodejs 
const stat = fs.statSync(filepath)
const etag = crypto.createHash('md5').update(fs.readFileSync(filepath)).digest('base64')
if(req.headers['if-none-match'] === etag || req.headers['if-modified-since'] < stat.ctime){
    res.statusCode = 304
    res.end()
}
```

### 206 范围请求

状态码206 表示范围请求，即客户端只请求资源的一部分数据。比如观看在线视频时，以块的形式下载数据很重要，可以避免获取没有使用的资源。

客户端的请求头中发送`Range`字段，

```
// request header
Range:bytes=0-5
```

上面请求头表示客户端在请求资源的 [0, 5] 一共 6 个字节。服务器根据这个字段返回数据，并且响应头中包含：

```
// response header
Content-Length: 6
Content-Range: bytes 0-5/2000
```

点击[查看demo](https://github.com/banli17/node-study/tree/master/src/network/http/206%E8%8C%83%E5%9B%B4%E8%AF%B7%E6%B1%82)。

### 国际化多语言

http://taobaofed.org/blog/2016/03/21/internationalization/

### referer

`referer` 通常用来做防盗链，比如图片的防盗链，服务端根据不同的 `referer` 看是否返回正确的图片。

```js
const whiteList = [
    'localhost:63342'
]

http.createServer((req, res) => {
    const referer = req.headers['referer']
    const refererHost= url.parse(referer).host
    let file = whiteList.includes(refererHost) ? path.join(__dirname, url.parse(req.url).pathname)
        : path.join(__dirname, 'err.png')
    fs.createReadStream(file).pipe(res)
}).listen(5000)
```

### gzip

服务器上的网页文件一般都是会压缩后再传输给客户端，压缩格式为 gzip、deflate 等。浏览器请求时会带上支持的格式`accept-encoding`：

```
// request
accept-encoding: gzip, deflate, br
```

服务器端根据支持的格式，将文件压缩后返回，并返回响应头字段 `content-encoding`。

```js
// node.js
res.setHeader('Content-Encoding', 'gzip')
fs.createReadStream('index.html').pipe(zlib.createGzip()).pipe(res)
```


## HTTP 2.0

在 HTTP/1 中，为了性能考虑，我们会引入雪碧图、将小图内联、使用多个域名等等的方式。这一切都是因为浏览器限制了同一个域名下的请求数量（Chrome 下一般是限制六个连接），当页面中需要请求很多资源的时候，队头阻塞（Head of line blocking）会导致在达到最大请求数量时，剩余的资源需要等待其他资源请求完成后才能发起请求。

在 HTTP/2 中引入了多路复用的技术，这个技术可以只通过一个 TCP 连接就可以传输所有的请求数据。多路复用很好的解决了浏览器限制同一个域名下的请求数量的问题，同时也间接更容易实现全速传输，毕竟新开一个 TCP 连接都需要慢慢提升传输速度。

HTTP/2 中所有加强性能的核心点在于此。在之前的 HTTP 版本中，我们是通过文本的方式传输数据。在 HTTP/2 中引入了新的编码机制，所有传输的数据都会被分割，并采用二进制格式编码。

### 多路复用

HTTP 2.0 会对 HTTP 的头进行一定的压缩，将原来每次都要携带的大量 key value 在两端建立一个索引表，对相同的头只发送索引表中的索引。

HTTP 2.0 将所有的传输消息分隔成了更小的消息和帧，并对它们采用二进制格式编码，常见的帧有 Header 帧，用于传输 Header 内容，并且会开启一个新的流。再就是 Data 帧，用来传输正文实体，多个 Data 帧属于同一个流。

通过这两种机制，HTTP 2.0 的客户端可以将多个请求分到不同的流中，然后将请求内容拆分成帧，进行二进制传输，这些帧可以乱序发送，然后根据每个帧首部的流标志符重新组装，并且可以根据优先级，决定优先处理哪个流的数据。

举例来说，客户端请求三个资源，可以通过一个 TCP 连接，发送三个流给服务器，服务器将数据分成帧，乱序发送到一个 TCP 连接中。

多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

### Header 压缩

HTTP 1.1 在应用层采用纯文本形式进行通信，每次都要带完整的 HTTP 头，而且不考虑 pipeline 模式的话，每次的过程总是一去一回，这在实时性、并发性上都存在问题。

为了解决这个问题，HTTP 2.0 会对 HTTP 头进行压缩，将原来每次都要携带的大量 key value 在两端建立一个索引表，对相同的头只发送索引表中的索引。

### 服务端 Push

## QUIC 协议

虽然 HTTP 2.0 大大增加了并发性，但是它还是基于 TCP 的，TCP 协议处理包时有严格的顺序。

如果一个包有问题，TCP 需要等待这个包重新发送确认后，才能继续。HTTP 2.0 的多个流的帧数据在一个 TCP 里，如果前面的帧没有收到，后面的帧也会受到阻塞。

所以 Google 制作了基于 UDP 的 QUIC 协议，它在 UDP 基础上，新增了多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能。。它有如下特点：

### 自定义连接机制

TCP连接是以四元组标识的，分别是源IP、目标IP、源端口、目标端口，一旦一个元素发生变化，就需要断开重连。在移动互联中，手机信号不稳定或经常Wifi和移动网络切换，都会导致重连。但是基于 UDP，可以在 QUIC 自己的逻辑里维护连接机制，不再以四元组进行标识，而是以一个 64 位随机数作为 ID 来标识，而且 UDP 是无连接的，所以当 IP 和端口变化时，只要 ID 不变，就不需要重新建立连接。

### 自定义重传机制

TCP 重传机制是，发送一个包，序号100，超时后再发送一个 100，过一会后返回 ACK 101。那么怎么才算超时呢？这个超时是通过采样往返时间 RTT 不断调整的。那么这时往返时间是多少呢？是 ACK 到达的时间减去后一个 100 发送的时间，还是减去前一个 100 发送的时间呢?事实 是，第一种算法把时间算短了，第二种算法把时间算长了。

QUIC 的序列号是递增的，比如包 100，超时后再次发送，序列号加1，为 101。如果返回 ACK 100，就是对第一个包的响应，返回 ACK 101 就是第二个包的响应，RTT 计算相对准确。

怎么知道 100 和 101 发送的是同样的内容呢？QUIC 定义一个 offset 概念，表示发送数据在数据流里的偏移量，可以通过它查看数据发到了哪里，这样只要这个 offset 的包没来，就要重发；如果来了，就按照 offset 拼接。

### 无阻塞多路复用

有了自定义的连接和重传机制，我们就可以解决上面 HTTP 2.0 的多路复用问题。
同 HTTP 2.0 一样，同一条 QUIC 连接上可以创建多个 stream，来发送多个 HTTP 请求。但是，QUIC 是基于 UDP 的，一个连接上的多个 stream 之间没有依赖。这样，假如 stream2 丢了一个 UDP 包，后 面跟着 stream3 的一个 UDP 包，虽然 stream2 的那个包需要重传，但是 stream3 的包无需等待，就 可以发给用户。

### 自定义流量控制

TCP 接收段的窗口起始点是下一个要接收并且 ACK 的包，即便后来的包已经到了，放入缓存里面，窗口也不能右移，因为 TCP 的 ACK 机制是基于序列号的累计应答，一旦 ACK 了一 个系列号，就说明前面的都到了，所以只要前面的没到，后面的到了也不能 ACK，就会导致后面的到 了，也有可能超时重传，浪费带宽。

QUIC 的 ACK 是基于 offset 的，每个 offset 包来了，进入缓存，就可以应答，应答后不会重发，窗口的起始位置是当前接收的最大 offset，从这个 offset 到当前 stream 所能容纳的最大缓存，是真正的窗口大小。显然，这样更加准确。

### 0-RTT

通过使用类似 TCP 快速打开的技术，缓存当前会话的上下文，在下次恢复会话的时候，只需要将之前的缓存传递给服务端验证通过就可以进行传输了。

### 纠错机制

假如说这次我要发送三个包，那么协议会算出这三个包的异或值并单独发出一个校验包，也就是总共发出了四个包。

当出现其中的非校验包丢包的情况时，可以通过另外三个包计算出丢失的数据包的内容。

当然这种技术只能使用在丢失一个包的情况下，如果出现丢失多个包就不能使用纠错机制了，只能使用重传的方式了。


## 面试题

1. UDP 与 TCP 的区别是什么？
1. 都说 TCP 是面向连接的，在计算机看来，怎么样才算一个连接呢?
1. 你知道 TCP 的连接是如何建立，又是如何关闭的吗?
1. 常见Http请求头?
1. 介绍http2.0
1. http1.1时如何复用tcp连接?
1. Http报文的请求会有几个部分?
1. tcp3次握手?
1. http缓存控制?
1. tcp属于哪一层?（1 物理层 -> 2 数据链路层 -> 3 网络层(ip)-> 4 传输层(tcp) -> 5 应用层(http)）

## 参考资料


- [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP
- [标识互联网上的内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web)
- [HTTP 协议中 URI 和 URL 有什么区别？](https://www.zhihu.com/question/21950864)
- [Web性能权威指南 https://hpbn.co/](https://hpbn.co/)
- [HTTPS和HTTP的区别是什么？](https://www.wosign.com/faq/faq2016-0301-02.htm)
- [HTTPS加密协议详解系列文章](https://www.wosign.com/faq/faq2016-0309-01.htm)
- [极客时间：趣谈网络协议]