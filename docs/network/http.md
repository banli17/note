# HTTP 笔记

http 内容主要包括：

- http 状态码，请求头，报文，请求方法，缓存
- https 的过程
- http2.0 优点和问题
- tcp、udp 相关知识

## URI、URL、URN

这三个缩略词是 Tim Berners-Lee 在一篇名为 [RFC 3986: Uniform Resource Identifier (URI): Generic Syntax](http://tools.ietf.org/html/rfc3986) 的文档中定义的互联网标准追踪协议。

- `Uniform Resource Identifier`：统一资源标志符，它是资源的唯一标志。它包含`URL`和`URN`。
- `Uniform Resource Locator`：统一资源定位器。它相当于通过地址找资源，提供了准确的访问方式，是 uri 的一种形式。比如`ftp://ftp.is.co.za/rfc/rfc1808.txt`。
- `Universal Resource Name`：统一资源名称，通过唯一名称找资源，是 uri 的另一种形式。比如`ftp.is.co.za/rfc/rfc1808.txt`，没有提供访问方式。

一个标准的 URL 格式包含：

```
# 协议有多种、http、ftp等
协议://用户名:密码@子域名.域名.顶级域名:端口号/目录/文件名.文件后缀?参数=值#hash

// 如
http://username:password@www.banli17.com:80/home/f.php?a=1#hash
```

## HTTP 请求流程

**HTTP 请求的准备**

0. 浏览器首先会对 URL 进行 DNS(`Domain Name System`) 解析，解析成 IP。
1. 创建 TCP 连接。

**HTTP 请求的构建**

建立连接后，发送 HTTP 请求。HTTP/1.1 请求报文格式如下：

1. 请求行`方法 URL 版本`。
2. 首部字段，是`key:value`格式。
3. 实体

**HTTP 请求发送**

1. HTTP 层发出 stream 二进制流。
2. TCP 层将二进制流转成报文段。TCP 发送报文段时，加上自己的地址(源地址)和目标地址。将这两个信息放到 IP 头里面，交给 IP 层传输。
3. IP 层查看源地址和目标地址是否是同一个局域网。如果是，就发送 ARP 协议，请求目标地址的 MAC 地址，然后将源 MAC 和目标 MAC 放到 MAC 头，发出。如果不是，则需要发送给网关，即发送 ARP 协议获取网关的 MAC 地址，然后将源 MAC 和目标 MAC 放到 MAC 头，发出。
4. 网关收到包发现 MAC 符合，取出目标 IP，根据路由协议查找下一跳路由，获取下一跳路由的 MAC 地址，将包发出。
5. 到最后一跳路由器后，它发现目标地址就在这个局域网内，就发送 ARP 获取目标地址的 MAC 地址，将包发出去。
6. 目标机器发现 MAC 地址符合，就将包收起来；发现 IP 符合，就根据 IP 头的协议项，知道上一层是 TCP 协议，就解析 TCP 头，里面有序列号，看这个序列包是否是我要的，如果是就放到缓存中然后返回一个 ACK，如果不是就丢弃。
7. TCP 头里还有端口号，HTTP 的服务器正在监听这个端口号。目标机器就将这个包发给 HTTP 服务器进程。HTTP 服务器进程看到这个请求是要访问一个网页，于是将网页发送给客户端。

## HTTP 详细

### 请求方法

- `GET` 请求资源
- `POST` 创建资源
- `PUT` 修改资源
- `DELETE` 删除资源

> GET 和 POST 的区别？

GET 和 POST 主要是语义上的区别，GET 表示获取资源，POST 表示创建资源。

在技术上说：

- GET 请求能缓存，POST 不能
- POST 相对 GET 安全一点点，因为 GET 请求都包含在 URL 里（当然你想写到 body 里也是可以的），且会被浏览器保存历史纪录。POST 不会，但是在抓包的情况下都是一样的。
- URL 有长度限制，会影响 GET 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
- POST 支持更多的编码类型且不对数据类型限制

### 请求头

- `Accept-Charset` 客户端可以接收的字符集，防止传过来的是另外的字符集，从而乱码
- `Content-Type` 正文格式，浏览器会根据它来识别文件的格式，否则会当作文本处理。
- `Retry-After` 表示，告诉客户端应该在多长时间以后再次尝试一下。
- `Accept-Encoding: gzip, deflate, br`: 浏览器发起请求时会带上支持的文件压缩列表。

### 响应头

- `X-Content-Type-Options`: 明确告诉浏览器返回 [MIME 类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 没有问题，不要修改(嗅探等)，以防解析错误。
  - `nosniff`: 会阻止两种请求，1) 请求的 js ，但是 MIME 不是 `application/javascript`。2) 请求的时 style，但是 MIME 不是 `text/style`。
- `Content-Encoding: gzip` 表示消息主体进行了何种方式的内容编码转换，也就是告诉浏览器如何解码才能得到`Content-Type` 中标示的媒体类型内容。
  - `gzip`:采用[Lempel-Ziv coding (LZ77)](http://en.wikipedia.org/wiki/LZ77_and_LZ78#LZ77) 压缩算法，以及32位CRC校验的编码方式。
  - `deflate`: [zlib](http://en.wikipedia.org/wiki/Zlib) 结构 + [deflate](http://en.wikipedia.org/wiki/DEFLATE) 压缩算法
  - `br`: [brotli](https://en.wikipedia.org/wiki/Brotli) 算法的编码格式
  - `identity`: 没经过压缩
- `Location`: 当状态码是`301/302`时，浏览器会查看响应头里的 `Location`字段，并将网页重定向到该字段的值。
- `Connection`: 当前的事务完成后，是否会关闭网络连接。
  - `keep-alive`: 网络连接就是持久的，不会关闭，使得对同一个服务器的请求可以继续在该连接上完成。
  - `close`： 表明客户端或服务器想要关闭该网络连接，这是HTTP/1.0请求的默认值
- `Set-Cookie: sessionid=38afes7a8; HttpOnly; Path=/`: 由服务器端向客户端发送 cookie
  - `<cookie-name>=<cookie-value>`
    - __Secure- 前缀：以 __Secure- 为前缀的 cookie（其中连接符是前缀的一部分），必须与 secure 属性一同设置，
    - __Host- 前缀： 以 __Host- 为前缀的 cookie，必须与 secure 属性一同设置，必须应用于安全页面（即使用 HTTPS 访问的页面），必须不能设置 domain 属性 （也就不会发送给子域），同时 path 属性的值必须为“/”。
  - `Expires=<date>`
  - `Max-Age=<non-zero-digit>`
  - `Domain=<domain-value>`
  - `Path=<path-value>`:指定一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。
  - `Secure`: 只有在 HTTPS 下才发送到服务器。
  - `HttpOnly`: 不能由 js 访问，防止 xss。不影响浏览器请求时自动带上cookie。
- `Cache-control: max-age=10,private` 表示资源过多少秒后过期，过期后需要重新请求。
  - `s-maxage` 设置代理缓存时间，如 nginx 的。
  - `private`: 默认，对应资源可以被浏览器缓存
  - `public`: 资源既可以被浏览器缓存，也可以被代理服务器缓存。
  - `no-store`: 不缓存，直接请求更新资源。
  - `no-cache`：跳过强缓存，进入协商缓存。
- `Access-Control-Allow-Origin`: 跨域解决
- `Access-Control-Allow-Headers`
- `Access-Control-Allow-Methods`
- `Access-Control-Max-Age`
- `Content-Security-Policy`: CSP，网页安全政策。CSP 的实质就是白名单制度，开发者明确告诉客户端，哪些外部资源可以加载和执行。
-  `Link`: `</test.jpg>; as=image; rel=preload` http2 ，相当于 在 html中新建`<link>`标签

### 报文

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

## HTTP 状态码

http 状态码是用以表示网页服务器超文本传输协议响应状态的 3 位数字代码。

**1xx 表示需要继续处理**: 表示请求已经接收需要继续处理。由于 HTTP/1.0 协议中没有定义任何 1xx 状态码，所以除非在某些试验条件下，服务器禁止向此类客户端发送 1xx 响应。

- `100 (Continue)`:客户端应继续发送

**2xx 表示成功**，这类状态码表示请求被接收。

- `200 OK`: 成功
- `204 No content`: 表示请求成功，但响应报文不含实体的主体部分
- `205 Reset Content`: 表示请求成功，但响应报文不含实体的主体部分，并要求请求方重置内容
- `206 Partial Content`: 表示范围请求，即请求部分数据

**3xx 重定向**

- `301 moved permanently`: 永久重定向，配合 Header `Location` 使用。
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
- `418`: 这是一个茶壶(无意义，愚人节玩笑)

**5xx 服务端错误**

- `500 internal sever error`: 服务端错误，一般是代码错误
- `501 not implemented`: 服务器不具备完成请求的功能
- `502`: 网关错误，上游服务器无响应
- `503`: 服务器目前无法使用，停机维护或超载
- `504`: 网关超时，未能及时收到上游服务器响应
- `509`: 服务器带宽限制，非官方状态码，广泛使用
- `600` 源站没有返回响应头，只有实体内容

## HTTP 缓存机制

http 缓存分 2 种，强缓存和协商缓存:

- 强缓存: 请求资源文件时会缓存到本地，如果资源没过期，就利用，有 2 个字段来表示资源的有效期
  - `expires: GMT 格式时间字符串`: HTTP1.0，它是返回的服务器的绝对时间，如果浏览器时间和服务器时间不匹配，会导致缓存错乱，所以有了`max-age`。
  - `cache-control: max-age=10`: HTTP1.1，它是一个相对时间，单位是秒，超过这么多秒资源就会过期。
- 协商缓存（ 也叫 304 缓存），即本地缓存过期后重新请求服务器时，浏览器会带上上次响应资源的 HTTP 头，服务端根据这个头来判断返回 304（资源没修改过还能用） 还是 200（新的资源）。

  - `If-Modified-Since: 上次响应头的 Last-Modified 值`: 即上次响应返回的资源最后修改时间（ etag 有可能会发生碰撞，它还有用）。
  - `If-None-Match: 上次响应头的 etag 值`: 相当于资源的 hash 值。因为资源可能修改了，后来又撤销，这样导致资源最后修改时间变了，但是内容没变，所以需要 etag。

::: tip
- 现在还写 expires 是为了兼容 http1.0，另外 max-age 的权重大于 expires。
- 强缓存只针对页面里的资源，如果在新窗口打开 css、js 资源的 url，浏览器会发请求到服务器。
:::

```js
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

## HTTP 应用

### CSP

CSP 启用后，不符合 CSP 的外部资源就会被阻止加载。

http://www.ruanyifeng.com/blog/2016/09/csp.html

![](./imgs/2021-05-10-11-45-18.png)

开启 CSP 的两种方法:

- `Content-Security-Policy` 响应头
- `<meta>`

```
Content-Security-Policy: script-src 'self'; object-src 'none';
style-src cdn.example.org third-party.org; child-src https:

<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
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


### 国际化多语言

http://taobaofed.org/blog/2016/03/21/internationalization/

### 防盗链 referer

`referer` 通常用来做防盗链，比如图片的防盗链，服务端根据不同的 `referer` 看是否返回正确的图片。

```js
const whiteList = ["localhost:63342"];

http
  .createServer((req, res) => {
    const referer = req.headers["referer"];
    const refererHost = url.parse(referer).host;
    let file = whiteList.includes(refererHost)
      ? path.join(__dirname, url.parse(req.url).pathname)
      : path.join(__dirname, "err.png");
    fs.createReadStream(file).pipe(res);
  })
  .listen(5000);
```

### gzip

服务器上的网页文件一般都是会压缩后再传输给客户端，压缩格式为 gzip、deflate 等。浏览器请求时会带上支持的格式`accept-encoding`：

```
// request
accept-encoding: gzip, deflate, br
```

服务器端根据支持的格式，将文件压缩后返回，并返回响应头字段 `content-encoding`。

```js
const zlib = require('zlib')

res.setHeader("Content-Encoding", "gzip");
fs.createReadStream("index.html").pipe(zlib.createGzip()).pipe(res);
// zlib.gzipSync(html)
```

### 跨域解决

浏览器同域限制，浏览器实际已经发送并接受到了数据，但是把响应数据隐藏掉了。

```js
const http = require('http')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  response.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:8888',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    'Access-Control-Max-Age': '1000'
  })
  response.end('123')
}).listen(8887)

```

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
