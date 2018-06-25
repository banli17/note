var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/users'

MongoClient.connect(url, function (err, db) {
	if (err) throw err
	console.log('创建成功', db)
	db.close()
})

