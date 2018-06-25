# http协议


## URI、URL、URN

`Uniform Resource Identifier`：统一资源标志符，它是资源的唯一标志。它包含`URL`和`URN`。

`Uniform Resource Locator`：统一资源定位器。它相当于通过地址找资源，是uri的一种形式。

```
# 协议有多种、http、ftp等
http://user:pass@host.com:80/path?query=string#hash
```

Universal Resource Name：统一资源名称，通过名称找资源，是uri的另一种形式。

- [标识互联网上的内容](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web)
- [HTTP 协议中 URI 和 URL 有什么区别？](https://www.zhihu.com/question/21950864)

## http报文格式

![http报文](./imgs/http.png)

## http方法

用来定义对资源的操作。常用的get、post等。

## http code

定义服务器对请求的处理结果。

http/1.0协议没有定义1xx状态码，所以服务器禁止向客户端返回此类响应。

**成功**

这类状态码表示请求被接收。

- 200 ok 成功

**重定向**

- 301 永久重定向
- 302 临时重定向
- 304 文件没修改，取缓存
- 305 必须通过指定代理才能访问

**客户端错误**

- 400 语义有误或参数错误
- 401 需要用户验证
- 403 服务器已经理解请求，但是拒绝执行
- 404 文件没找到
- 408 请求超时

**服务端错误**

- 500 服务端错误，一般是代码错误
- 502 网关错误，上游服务器无响应
- 503 服务器目前无法使用，停机维护或超载
- 504 网关超时，未能及时收到上游服务器响应
- 509 服务器带宽限制，非官方状态码，广泛使用
- 600 源站没有返回响应头，只有实体内容

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


- [HTTP Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
