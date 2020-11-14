---
title: "网络协议之 HTTP"
sidebar_label: 网络协议之 HTTP
---

## URI、URL、URN

这三个缩略词是 Tim Berners-Lee 在一篇名为 [RFC 3986: Uniform Resource Identifier (URI): Generic Syntax](http://tools.ietf.org/html/rfc3986) 的文档中定义的互联网标准追踪协议。

-   `Uniform Resource Identifier`：统一资源标志符，它是资源的唯一标志。它包含`URL`和`URN`。
-   `Uniform Resource Locator`：统一资源定位器。它相当于通过地址找资源，提供了准确的访问方式，是 uri 的一种形式。比如`ftp://ftp.is.co.za/rfc/rfc1808.txt`。
-   `Universal Resource Name`：统一资源名称，通过唯一名称找资源，是 uri 的另一种形式。比如`ftp.is.co.za/rfc/rfc1808.txt`，没有提供访问方式。

下面是一个标准的 URL 格式：

```
# 协议有多种、http、ftp等
http://user:pass@host.com:80/path?query=string#hash
```

## HTTP

URL: 统一资源定位符。正是因为是统一的(有格式的)，所以浏览器才知道统一处理。

**HTTP 请求的准备**

0. 浏览器首先将 URL 进行 DNS 解析，解析成 IP。
1. 创建 TCP 连接。

**HTTP 请求的构建**

建立连接后，发送 HTTP 请求。HTTP/1.1 请求报文格式如下：

1. 请求行`方法 URL 版本`。
2. 首部字段，是`key:value`格式。
3. 实体

GET POST 创建资源 PUT 修改资源 DELETE
Accept-Charset 客户端可以接收的字符集，防止传过来的是另外的字符集，从而乱码
Content-Type 正文格式
Cache-control 缓存控制

http 请求发送过程：

1. HTTP 层发出 stream 二进制流。
2. TCP 层将二进制流转成报文段。TCP 发送报文段时，加上自己的地址(源地址)和目标地址。将这两个信息放到 IP 头里面，交给 IP 层传输。
3. IP 层查看源地址和目标地址是否是同一个局域网。如果是，就发送 ARP 协议，请求目标地址的 MAC 地址，然后将源 MAC 和目标 MAC 放到 MAC 头，发出。如果不是，则需要发送给网关，即发送 ARP 协议获取网关的 MAC 地址，然后将源 MAC 和目标 MAC 放到 MAC 头，发出。
4. 网关收到包发现 MAC 符合，取出目标 IP，根据路由协议查找下一跳路由，获取下一跳路由的 MAC 地址，将包发出。
5. 到最后一跳路由器后，它发现目标地址就在这个局域网内，就发送 ARP 获取目标地址的 MAC 地址，将包发出去。
6. 目标机器发现 MAC 地址符合，就将包收起来；发现 IP 符合，就根据 IP 头的协议项，知道上一层是 TCP 协议，就解析 TCP 头，里面有序列号，看这个序列包是否是我要的，如果是就放到缓存中然后返回一个 ACK，如果不是就丢弃。
7. TCP 头里还有端口号，HTTP 的服务器正在监听这个端口号。目标机器就将这个包发给 HTTP 服务器进程。HTTP 服务器进程看到这个请求是要访问一个网页，于是将网页发送给客户端。

HTTP/1.1 响应报文格式：


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

-   Get 请求能缓存，Post 不能
-   Post 相对 Get 安全一点点，因为 Get 请求都包含在 URL 里（当然你想写到 body 里也是可以的），且会被浏览器保存历史纪录。Post 不会，但是在抓包的情况下都是一样的。
-   URL 有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
-   Post 支持更多的编码类型且不对数据类型限制

### HTTP 头

Retry-After 表示，告诉客户端应该在多长时间以后再次尝试一下
“503 错误”是说“服务暂 时不再和这个值配合使用”。

### HTTP 状态码

http 状态码是用以表示网页服务器超文本传输协议响应状态的 3 位数字代码。

**1xx 消息**

表示请求已经接收需要继续处理。由于 HTTP/1.0 协议中没有定义任何 1xx 状态码，所以除非在某些试验条件下，服务器禁止向此类客户端发送 1xx 响应。

-   `100 (Continue)`:客户端应继续发送

**2xx 成功**

这类状态码表示请求被接收。

-   `200 OK`: 成功
-   `204 No content`: 表示请求成功，但响应报文不含实体的主体部分
-   `205 Reset Content`: 表示请求成功，但响应报文不含实体的主体部分，并要求请求方重置内容
-   `206 Partial Content`: 表示范围请求，即请求部分数据

**3xx 重定向**

-   `301 moved permanently`: 永久重定向
-   `302 found`: 临时重定向
-   `303 see other`: 表示资源存在另一个 URL，应使用 GET 方法获取资源
-   `304 not modified`: 文件没修改，取缓存
-   `305`: 必须通过指定代理才能访问
-   `307 temporary redirect`: 临时重定向，和 302 类似，但是希望客户端保持请求方法不变，向新地址发出请求

**4xx 客户端错误**

-   `400 bad request`: 语义有误或参数错误
-   `401 unauthorized`: 需要用户验证
-   `403 forbidden`: 服务器已经理解请求，但是拒绝执行
-   `404 not found`: 文件没找到
-   `408`: 请求超时

**5xx 服务端错误**

-   `500 internal sever error`: 服务端错误，一般是代码错误
-   `501 not implemented`: 服务器不具备完成请求的功能
-   `502`: 网关错误，上游服务器无响应
-   `503`: 服务器目前无法使用，停机维护或超载
-   `504`: 网关超时，未能及时收到上游服务器响应
-   `509`: 服务器带宽限制，非官方状态码，广泛使用
-   `600` 源站没有返回响应头，只有实体内容

通过 meta 标签跳转

```html
<meta http-equiv="refresh" content="0;url=http://www.baidu.com" />
```

cors 跨域请求的限制于解决
`Content-Type`的作用

浏览器同域限制，浏览器实际已经发送并接受到了数据，但是把隐藏掉了。

```
res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
})
```

jsonp 原理。

### HTTP 缓存机制

http 缓存分为强缓存和协商缓存。

**强缓存**

当浏览器打开 html 页面时，页面中包含一些资源链接如 css、js 等，浏览器会将这些资源和资源的头信息缓存到本地，头信息里有 `expires` 和 `cache-control` 字段，表示资源的有效期。`expires`是一个 GMT 格式的时间字符串，表示大于这个时间资源就会过期失效(http 1.0)，由于这是服务器返回的时间，可能会和客户端时间有很大差距造成缓存错乱，所以 http1.1 版本使用了`cache-control:max-age=10`这样的字段，max-age 是一个相对时间，单位是秒，表示超过这么多秒资源就过期了。所以如果资源没有过期则使用浏览器本地的资源，这就是强缓存。

> 现在还写 expires 是为了兼容 http1.0，另外 max-age 的权重大于 expires。

> 强缓存只针对页面里的资源，如果新打开 css、js 资源的 url，浏览器会发请求到服务器。

**协商缓存**

协商缓存也叫做 304 缓存，就是浏览器本地的缓存资源到期失效后，于是重新请求服务器，服务器根据信息判断资源没有修改还可以继续使用。于是浏览器继续使用资源。

在浏览器本地缓存失效后，浏览器会重新请求资源，并带上资源的信息：If-None-Match(上次响应头 etag 的值，即资源的哈希值)、If-Modified-Since(上次响应头的 Last-Modified 值，即最后修改时间)。服务端可以根据这两个值判断是返回 304 还是 200。

> 有了最后修改时间，就可以判断资源有没有修改，为什么还需要 etag 呢？

因为资源可能修改后又撤销回去了，这时资源的最后修改时间改变了，但是资源内容没变，所以应该返回 304。

```js
// nodejs
const stat = fs.statSync(filepath);
const etag = crypto
    .createHash("md5")
    .update(fs.readFileSync(filepath))
    .digest("base64");
if (
    req.headers["if-none-match"] === etag ||
    req.headers["if-modified-since"] < stat.ctime
) {
    res.statusCode = 304;
    res.end();
}
```

### 206 范围请求

状态码 206 表示范围请求，即客户端只请求资源的一部分数据。比如观看在线视频时，以块的形式下载数据很重要，可以避免获取没有使用的资源。

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

点击[查看 demo](https://github.com/banli17/node-study/tree/master/src/network/http/206%E8%8C%83%E5%9B%B4%E8%AF%B7%E6%B1%82)。

### 国际化多语言

http://taobaofed.org/blog/2016/03/21/internationalization/

### referer

`referer` 通常用来做防盗链，比如图片的防盗链，服务端根据不同的 `referer` 看是否返回正确的图片。

```js
const whiteList = ["localhost:63342"];

http.createServer((req, res) => {
    const referer = req.headers["referer"];
    const refererHost = url.parse(referer).host;
    let file = whiteList.includes(refererHost)
        ? path.join(__dirname, url.parse(req.url).pathname)
        : path.join(__dirname, "err.png");
    fs.createReadStream(file).pipe(res);
}).listen(5000);
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
res.setHeader("Content-Encoding", "gzip");
fs.createReadStream("index.html").pipe(zlib.createGzip()).pipe(res);
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

TCP 连接是以四元组标识的，分别是源 IP、目标 IP、源端口、目标端口，一旦一个元素发生变化，就需要断开重连。在移动互联中，手机信号不稳定或经常 Wifi 和移动网络切换，都会导致重连。但是基于 UDP，可以在 QUIC 自己的逻辑里维护连接机制，不再以四元组进行标识，而是以一个 64 位随机数作为 ID 来标识，而且 UDP 是无连接的，所以当 IP 和端口变化时，只要 ID 不变，就不需要重新建立连接。

### 自定义重传机制

TCP 重传机制是，发送一个包，序号 100，超时后再发送一个 100，过一会后返回 ACK 101。那么怎么才算超时呢？这个超时是通过采样往返时间 RTT 不断调整的。那么这时往返时间是多少呢？是 ACK 到达的时间减去后一个 100 发送的时间，还是减去前一个 100 发送的时间呢?事实 是，第一种算法把时间算短了，第二种算法把时间算长了。

QUIC 的序列号是递增的，比如包 100，超时后再次发送，序列号加 1，为 101。如果返回 ACK 100，就是对第一个包的响应，返回 ACK 101 就是第二个包的响应，RTT 计算相对准确。

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
1. 常见 Http 请求头?
1. 介绍 http2.0
1. http1.1 时如何复用 tcp 连接?
1. Http 报文的请求会有几个部分?
1. tcp3 次握手?
1. http 缓存控制?
1. tcp 属于哪一层?（1 物理层 -> 2 数据链路层 -> 3 网络层(ip)-> 4 传输层(tcp) -> 5 应用层(http)）

## 参考资料

-   [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
-   [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
-   https://developer.mozilla.org/zh-CN/docs/Web/HTTP
-   [标识互联网上的内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web)
-   [HTTP 协议中 URI 和 URL 有什么区别？](https://www.zhihu.com/question/21950864)
-   [Web 性能权威指南 https://hpbn.co/](https://hpbn.co/)
-   [HTTPS 和 HTTP 的区别是什么？](https://www.wosign.com/faq/faq2016-0301-02.htm)
-   [HTTPS 加密协议详解系列文章](https://www.wosign.com/faq/faq2016-0309-01.htm)
-   [极客时间：趣谈网络协议]

HTTPS 实际就是 HTTP + TLS。

## HTTP 存在的问题

我们知道 http 是明文传输的，没有隐私可言，它很容易被中间层窃听和篡改。可能遇到的问题有：

-   运营商劫持，即我们的网页没加广告，但是会出现运营商广告。
-   中间层重定向到流氓网站，比如中间层可以返回 headers (或插入 location.href) 重定向到流氓网站。
-   xss、csrf 攻击。因为网页都被改了，所以无法抵御这些攻击。

如果要体验中间层攻击的感觉，可以使用[`anyproxy`](http://anyproxy.io/cn/)来模拟中间层篡改网页。

> traceroute www.baidu.com 追踪数据包在网络传输的全部路径，包默认 40 字节。

既然 HTTP 有这么多问题，那么如何保证传输时的安全呢？那就是 TLS 协议。

## TLS/SSL 介绍与工作原理

1994 年，网景公司为 Netscape Navigator 浏览器设计了 SSL (Secure Socket Layer，安全套接层协议)，主要用于解决传输安全问题，即防止中间人攻击，特点是：

-   机密性：用密钥对数据进行加密后再传输。
-   可靠性：对客户端、服务器的身份进行认证，防止数据发给黑客或是黑客发的。
-   完整性：对数据完整性进行检查，防止数据被篡改。

1999 年，SSL 因为应用广泛，所以 IEFE 将其标准化，改名为传输层安全协议(Transport Layer Security, TLS)。所以有些文章把它叫做 TLS/SSL，实际它是同一个东西在不同阶段的叫法。

TLS/SSL 的实现主要依赖于三类基本算法：散列函数 Hash、对称加密和非对称加密。

客户端使用非对称加密与服务器进行通信，实现身份验证并协商对称加密使用的密钥，然后对称加密算法采用协商密钥对信息以及信息摘要进行加密通信，不同的节点之间采用的对称密钥不同，从而可以保证信息只能通信双方获取。

## PKI 体系

TLS 协议可以通过加密、身份验证、完整性检查来保证传输的安全。加密容易办到，但是身份验证和完整性如何保证呢？

验证肯定不能让服务器来完成，因为客户端或服务端可能正在和中间层黑客在通信。所以大厂合理推动了一个名叫 PKI 的基础设施，通过第三方来认证网站。

PKI 是一种遵循标准的, 利用公钥加密技术为电子商务的开展提供一套安全基础平台的技术和规范. 其基础建置包含认证中心 (Certification Authority, CA) 、注册中心 (Register Authority, RA) 、目录服务 (Directory Service, DS) 服务器.

-   RA: 统计、审核用户的证书申请，然后发给 CA
-   CA: 验证公钥的拥有者信息，并颁发证书
-   DS: 将成功的证书公布到 DS

流程如下，为了方便统称为 CA：

![](/img/net/2.png)

a. 服务方 S 向 CA 提交 公钥、组织信息、个人信息(域名) 等信息并申请认证。
b. CA 通过线上、线下等多种手段验证申请者提供信息的真实性，如组织/企业是否合法、是否拥有域名所有权等。
c. 信息审核通过后，CA 会向申请者签发认证证书。

证书包括以下信息：申请者公钥、申请者组织/个人信息、签发机构 CA 的信息、有效时间、证书序列号等明文信息，同时包含一个签名。

签名算法是首先用哈希算法计算公开明文信息的信息摘要，然后用 CA 私钥对信息摘要进行加密，即得到签名。

d. 客户端 C 向 服务器 S 发出请求时，S 返回证书文件。
e. 客户端 C 读取证书中的明文信息，采用相同的哈希函数计算信息摘要，然后利用 CA 的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即公钥合法。
f. 客户端验证证书的域名信息、有效时间等信息。
g. 客户端会内置信任 CA 的证书信息(包括公钥)，如果 CA 不被信息，就找不到对应的 CA 证书，证书会被判定非法。

在这个过程注意几点：

a.申请证书不需要提供私钥，确保私钥永远只能服务器掌握;
b.证书的合法性仍然依赖于非对称加密算法，证书主要是增加了服务器信息以及签名;
c.内置 CA 对应的证书称为根证书，颁发者和使用者相同，自己为自己签名，即自签名证书（为什么说"部署自签 SSL 证书非常不安全"）
d.证书=公钥+申请者与颁发者信息+签名;

### 证书链

如 CA 根证书和服务器证书中间增加一级证书机构，即中间证书，证书的产生和验证原理不变，只是增加一层验证，只要最后能够被任何信任的 CA 根证书验证合法即可。

a. 服务器证书 server.pem 的签发者为中间证书机构 inter，inter 根据证书 inter.pem 验证 server.pem 确实为自己签发的有效证书。
b. 中间证书 inter.pem 的签发 CA 为 root，root 根据证书 root.pem 验证 inter.pem 为自己签发的合法证书;
c. 客户端有个内置信任 CA 列表，含 root.pem 证书，因此服务器证书 server.pem 被信任。

二级证书结构存在的优势：

a.减少根证书结构的管理工作量，可以更高效的进行证书的审核与签发;

b.根证书一般内置在客户端中，私钥一般离线存储，一旦私钥泄露，则吊销过程非常困难，无法及时补救;

c.中间证书结构的私钥泄露，则可以快速在线吊销，并重新为用户签发新的证书;

d.证书链四级以内一般不会对 HTTPS 的性能造成明显影响。

### 证书吊销

CA 机构能够签发证书，同样也存在机制宣布以往签发的证书无效。证书使用者不合法，CA 需要废弃该证书;或者私钥丢失，使用者申请让证书无效。主要存在两类机制：CRL 与 OCSP。

Certificate Revocation List, 证书吊销列表(什么是证书吊销列表(CRL)？吊销列表起什么作用)，一个单独的文件。该吊销方式的优点是不需要频繁更新，但是不能及时吊销证书，因为 CRL 更新时间一般是几天，这期间可能已经造成了极大损失。

Online Certificate Status Protocol, 证书状态在线查询协议，一个实时查询证书是否吊销的方式。部分 CA 或大部分的自签 CA (根证书)都是未提供 CRL 或 OCSP 地址的，对于吊销证书会是一件非常麻烦的事情。

## HTTPS 的工作过程

1. 客户端发送 Client Hello 消息到服务器，包括 TLS 版本信息，支持的加密套件列表(Cipher[ˈsaɪfə(r)] Suites)，支持的压缩算法列表，一个随机数 A。
2. 服务端返回 Server Hello 消息到客户端，包括服务端选择的协议版本，加密套件，压缩算法等，还有一个随机数 B。
3. 服务端返回一个证书 Server Certificate，然后发一个 Server Hello Done 消息。
4. 客户端进行证书校验，产生随机数字 Pre-master，用证书中的公钥加密后发送给服务器，服务器通过私钥解密出来。
5. 客户端、服务器各自根据 A 、B、Pre-master 三个随机数生成相同的对称密钥。
6. 客户端发送 Change Cipher Spec，表示以后用对称密钥传输。并发送 Encrypted Handshake Message，它是根据之前所有握手信息(接受、发送)用对称密钥计算的，发送给服务器用于数据与握手验证。
7. 服务端收到后也返回 Change Cipher Spec(以后用对称密钥传输) 和 Encrypted Handshake Message。
8. 握手成功后，通过对称密钥进行加密传输。

## HTTPS 性能与优化

### HTTPS 性能损耗

(1).增加延时

分析前面的握手过程，一次完整的握手至少需要两端依次来回两次通信，至少增加延时 2* RTT，利用会话缓存从而复用连接，延时也至少 1* RTT\*。

(2).消耗较多的 CPU 资源

除数据传输之外，HTTPS 通信主要包括对对称加解密、非对称加解密(服务器主要采用私钥解密数据);压测 TS8 机型的单核 CPU：对称加密算法 AES-CBC-256 吞吐量 600Mbps，非对称 RSA 私钥解密 200 次/s。不考虑其它软件层面的开销，10G 网卡为对称加密需要消耗 CPU 约 17 核，24 核 CPU 最多接入 HTTPS 连接 4800;

静态节点当前 10G 网卡的 TS8 机型的 HTTP 单机接入能力约为 10w/s，如果将所有的 HTTP 连接变为 HTTPS 连接，则明显 RSA 的解密最先成为瓶颈。因此，RSA 的解密能力是当前困扰 HTTPS 接入的主要难题。

### HTTPS 接入优化

(1).CDN 接入

HTTPS 增加的延时主要是传输延时 RTT，RTT 的特点是节点越近延时越小，CDN 天然离用户最近，因此选择使用 CDN 作为 HTTPS 接入的入口，将能够极大减少接入延时。CDN 节点通过和业务服务器维持长连接、会话复用和链路质量优化等可控方法，极大减少 HTTPS 带来的延时。

(2).会话缓存

虽然前文提到 HTTPS 即使采用会话缓存也要至少 1\*RTT 的延时，但是至少延时已经减少为原来的一半，明显的延时优化;同时，基于会话缓存建立的 HTTPS 连接不需要服务器使用 RSA 私钥解密获取 Pre-master 信息，可以省去 CPU 的消耗。如果业务访问连接集中，缓存命中率高，则 HTTPS 的接入能力讲明显提升。当前 TRP 平台的缓存命中率高峰时期大于 30%，10k/s 的接入资源实际可以承载 13k/的接入，收效非常可观。

(3).硬件加速

为接入服务器安装专用的 SSL 硬件加速卡，作用类似 GPU，释放 CPU，能够具有更高的 HTTPS 接入能力且不影响业务程序的。测试某硬件加速卡单卡可以提供 35k 的解密能力，相当于 175 核 CPU，至少相当于 7 台 24 核的服务器，考虑到接入服务器其它程序的开销，一张硬件卡可以实现接近 10 台服务器的接入能力。

(4).远程解密

本地接入消耗过多的 CPU 资源，浪费了网卡和硬盘等资源，考虑将最消耗 CPU 资源的 RSA 解密计算任务转移到其它服务器，如此则可以充分发挥服务器的接入能力，充分利用带宽与网卡资源。远程解密服务器可以选择 CPU 负载较低的机器充当，实现机器资源复用，也可以是专门优化的高计算性能的服务器。当前也是 CDN 用于大规模 HTTPS 接入的解决方案之一。

(5).SPDY/HTTP2

前面的方法分别从减少传输延时和单机负载的方法提高 HTTPS 接入性能，但是方法都基于不改变 HTTP 协议的基础上提出的优化方法，SPDY/HTTP2 利用 TLS/SSL 带来的优势，通过修改协议的方法来提升 HTTPS 的性能，提高下载速度等。

## HTTP 和 HTTPS 区别

1、HTTPS 是加密传输协议，HTTP 是名文传输协议;
2、HTTPS 需要用到 SSL 证书，而 HTTP 不用;
3、HTTPS 比 HTTP 更加安全，对搜索引擎更友好，利于 SEO,参考：
（1）为保护用户隐私安全,谷歌优先索引 HTTPS 网页
（2）百度开放收录 https 站点，https 全网化势不可挡
4、 HTTPS 标准端口 443，HTTP 标准端口 80;
5、 HTTPS 基于传输层，HTTP 基于应用层;
6、 HTTPS 在浏览器显示绿色安全锁，HTTP 没有显示;

总的来说 HTTPS 比 HTTP 更加安全，能够有效的保护网站用户的隐私信息安全，这也是为什么现在的 HTTPS 网站越来越多。如果不想你的网站因为数据泄露上头条的话，就赶快去沃通 CA 申请一张 SSL 证书为自己的网站实现 HTTPS 加密吧!

## 重放与篡改

## openssl

```
# 生成私钥
openssl genrsa -out private-key.pem 1024

# 创建证书申请文件，可以发给CA
openssl req -new -key private-key.pem -out csr.pem

# 自己签名，不被信任
openssl x509 -req -in csr.pem -signkey private-key.pem -out public-cert.pem

# 测试连接服务器过程
openssl s_client -connect 127.0.0.1:8000
```

## nodejs 创建 https 服务

nodejs 配置 https 很简单，只需要准备好证书和密钥后，用 https 模块配置一下 options。

```js
const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync("key.pem"), // 密钥文件
    cert: fs.readFileSync("cert.pem"), // 证书文件
};

https
    .createServer(options, function (req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    })
    .listen(8000);
```

## 参考资料

-   [SSL/TLS 协议详解(上)：密码套件，哈希，加密，密钥交换算法](https://xz.aliyun.com/t/2526)
-   [SSL/TLS 协议详解(中)——证书颁发机构](https://xz.aliyun.com/t/2530)
-   [SSL/TLS 协议详解(下)——TLS 握手协议](https://xz.aliyun.com/t/2531#toc-1)
