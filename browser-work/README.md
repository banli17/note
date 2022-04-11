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
