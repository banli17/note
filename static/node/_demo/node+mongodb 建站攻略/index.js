var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.listen(port)
console.log('started on port' + port)

app.get('/', function (req, res) {
	res.render('index', {
		title: '首页',
		movies: [
			{
				title: '1111',
				doctor: 'hello',
				summary: '简介简介',
				id: 1
			},
			{
				title: '2222',
				doctor: 'hello',
				summary: '简介简介',
				id: 2
			}
		]
	})
})

app.get('/detail/:id', function (req, res) {
	console.log('detail')
	res.render('detail', {
		title: '详情'
	})
})

app.get('/admin/detail', function (req, res) {
	res.render('admin', {
		title: '后台录入'
	})
})

app.get('/admin/list', function (req, res) {
	res.render('list', {
		title: '后台列表'
	})
})
