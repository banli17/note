# 浏览器工作原理


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
