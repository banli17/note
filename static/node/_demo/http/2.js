var http = require('http')


var server = http.createServer((req, res)=> {
	res.setHeader('Content-Type','text/html;charset=utf-8')
	res.write('你好')
	res.end()
})

server.listen('9898', ()=> {
	console.log('connect 9898 ok')
})
