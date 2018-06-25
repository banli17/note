var http = require('http')
var url = require('url')

http.createServer(function (req, res) {
	res.setHeader('Content-Type', 'text/html;charset=utf-8');
	var urlobj = url.parse(req.url, true)
	if (urlobj.pathname == '/') {
		var keyword = urlobj.query.keyword
		res.end(`搜索词：${keyword}`)
	} else {
		res.end('')
	}
}).listen(9090)
