var mysql = require('mysql')

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'aa123456',
	database: 'node_test',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})


connection.connect()

var sql = 'select * from person'

connection.query(sql, function (err, res) {
	res.map(function (item) {
		console.log(item.user)
	})
})