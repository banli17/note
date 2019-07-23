---
title: "通过饿了么Node.rest"
date: 2019-02-02 12:24:52
toc: true
tags: 
---


## curl命令

```
curl http://www.baidu.com -v

curl http://www.baidu.com -X POST -d 'a=1&b=2'
```

## 创建服务器

```javascript
const http = require('http')
const server = http.createServer()
server.on('request', function(req, res){

})
server.listen(3000, 'localhost', function(){
  console.log('listen localhost port 3000')
})
```

**常用的请求属性**

- `req.url`: 请求地址，会加 /。
- `req.method`: 大写请求方法。
- `req.httpVersion`: http版本，如`1.1`。
- `req.headers`: 请求头对象,属性名都是小写。
- `req.on('data')`: 没有响应体则不会触发。
- `req.on('end')`: 不管有没有响应体，都会触发。

**常用的响应属性**

响应对象是双工流，可读写。

- `res.statusCode = 200`: 设置状态码
- `res.setHeader('aa': 11)`：设置响应头
- `res.write()`
- `res.end()`: 参数为字符串或Buffer

**常用的状态码**

## 解析请求参数

如果是 get，则参数在 url 上；如果是 post，则需要使用`req.on('data')`拼接。

```javascript
let params = []
req.on('data', function(chunk){
  params.push(chunk)
})
req.on('end', function(){
  console.log(Buffer.concat(params).toString())
})

// 将a=1&b=2解析为对象{a:1,b:2}
function parse(str){
  const r = {}
  str.replace(/([^=&]=[^=&])/, function(){
    r[arguments[1]] = arguments[2]
  })
  return r
}
```

内置的`querystring.parse()`方法也可以解析 post 传来的参数。和上面 parse() 方法一样。


## 静态服务

```
```

## 跨域

什么是跨域？域名、协议、端口不同。

- 跨域不携带cookie，通过`Access-Control-Allow-WithCredient`强制携带，客户端也必须设置`xhr.withCredentials = true`。
- 设置`Access-Control-Allow-Origin`解决。
- 要浏览器端ajax得到json，需要设置`xhr.responseType='json'`。

```

```

**localStorage,sessionStorage,cookie,session的区别**

## cookie和session

**浏览器端操作cookie**



## http协议和tcp协议

http1.1 长链接 connect: keep-alive

**管线化**

不同域名并发量6个，所以可以把资源分布到其它域名下。

**uri和url**

- uri: 统一资源标识符，比如人的身份证号。但是通过这个信息找不到，不知道他在哪里。可以标识，但是找不到
- url: 统一资源定位符，可以找到这个人。

url的格式：

```
http://user:pass@www.example.com:80/dir/index.html?uid=1#ch1
```

浏览器访问，hash 后台是拿不到的。

**状态码**

- 1xx: 信息性状态吗，一般websocket用
- 2xx: 成功
    - 200
    - 
- 3xx: 重定向
- 4xx: 客户端错误
- 5xx: 服务端错误

**请求报文**

- 请求方法: 
    - get 
    - post 
    - put 
    - delete 
    - options:  prefight试探性请求
    - head: HEAD方法与GET类似，但是HEAD并不返回消息体。这个方法经常用来测试超链接的有效性，可用性和最近修改。 

什么是跨域，跨域是针对前端ajax的，协议、域名、端口号不一样。
跨域的时候一般先发个试探性的options请求，可以访问吗？可以之后再发post。

- 资源
- 协议版本： HTTP/1.1
- 请求头
- 内容实体

**响应报文**

- 协议版本 HTTP/1.1
- 状态码 200，服务器可以随意提供
- 状态码的描述 OK

返回的内容有动态和静态：动态就是数据库读出来的内容，静态就是静态文件。

## http模块

- `http.get()` 只能发送 get 请求

```javascript
http.get('http://nodejs.org/dist/index.json', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
```

- `http.request(url[, options][, callback])` 或 `http.request(options[, callback])`

```javascript
const postData = querystring.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');   // http.createServer 的 res 没有 setEncoding 方法
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();
```

**querystring(str[, sep][, eq])**

```
const querystring = require('querystring')

let str = 'name=zs&age=12'
querystring.parse(str, '&', '=')

// 匹配的正则
const reg = /([^=&]*)=([^=&]*)/
```

**cookie**

```
document.cookie
```


```
res.setHeader('Content-Type', 'text/plain;charset=utf8')
res.setHeader('Content-Type', 'application/json;charset=utf8')
res.end()  // string || buffer
```


### 总结

1. http知识，常用响应头，报文格式，url组成，url和uri
1. get、request方法
1. 如何创建服务,2种方法
1. 返回响应，设置请求头
1. 解析参数