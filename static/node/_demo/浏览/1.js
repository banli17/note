var http = require('http')
var fs = require('fs')
var util = require('util')
var url = require('url')

var server = http.createServer(function (req, res) {
	
	res.writeHead(200, {'Content-Type': 'text/plain'})
	var html = ''
	console.log(req.url)
	res.write(util.inspect(url.parse(req.url)))
	// fs.readFileSync(req.url, function (error, data) {
	// 	console.log(data)
	// 	//html += data
	// })
	//
	//
	// res.write(html)
	res.end()
})

server.listen('9990')