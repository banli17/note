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