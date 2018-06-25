# http

## 一个简单的服务

先来看一个简单的例子，搭建一个服务，打开网址显示一串字符串。

```
var http = require('http')
var server = http.createServer((request, response)=>{
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('hello')
    response.end()
}))
server.listen('9898')
```

response.write() 的第一个参数是字符串或二进制buffer。

## 返回html，资源文件

但是前端页面都是需要返回模板，静态css、js资源的，而不是字符串。需要通过[mime库](https://github.com/broofa/node-mime)来识别资源的mime类型。

```node
const http = require('http')
const fs = require('fs')
const mime = require('mime')

function static(url, res) {
	res.setHeader('Content-Type', mime.getType(url) + ';charset=utf-8')
	fs.readFile(url.slice(1), (err, data)=> {
		res.write(data)
		res.end()
	})
}
const server = http.createServer((req, res)=> {
	const url = req.url

	if (url == '/') {
		res.setHeader('Content-Type', 'text/html;charset=utf-8')
		fs.readFile('index.html', (err, data)=> {
			res.write(data)
			res.end()
		})
	} else {
		static(url, res)
	}

})

server.listen('9898', ()=>{
	console.log('connect ok')
})
```
