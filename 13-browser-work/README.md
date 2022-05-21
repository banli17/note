# 浏览器工作原理

## 输入 url 回车后, 浏览器做了什么

1. url 使用 http 请求获取 HTML
2. HTML parser 成 DOM 树
3. DOM 树经过 css computing 得到 DOM with css
4. layout 生成 DOM with position
5. render 成位图

## ISO-OSI 七层网络协议

- 应用(应用、表示、会话) HTTP
- 传输层：tcp/udp 
- 网络层： ip
- 数据链路层
- 物理层


TCP 与 IP 基础知识：
- 流
- 端口：数据分配给哪个应用

## Http

http request

```
POST / HTTP/1.1    #request line
Content-Type text/html # headers

?name=zs&age=12   # request body
```


OPTIONS它用于获取当前URL所支持的方法。若请求成功，则它会在HTTP头中包含一个名为“Allow”的头，值是所支持的方法，如“GET, POST”。

浏览器基于CORS（跨域资源共享）机制，对于跨域 & 复杂的XMLHttpRequest和Fetch API请求，首先使用 options 方法向服务器发起一个预检请求（preflight request），服务器确认允许之后，再发起实际的 HTTP 请求。


## Transfer-Encoding chunked 数据格式

chunked 相应的格式如下:

```js
HTTP/1.1 200 OK
Content-Type: text/html
X-Foo: bar
aa: aaa
Date: Wed, 13 Apr 2022 13:21:53 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

1e
{"name":"zhangsan","age":"12"}

3
hel

2
lo
0
```

它的 body 部分是各个块的`数据长度+\r\n+数据`，最后由块大小 0 结束。

解析上面响应的数据格式，不能用正则，因为它是 TCP 流一段段传输的，所以用状态机依次读取接收的字符。
