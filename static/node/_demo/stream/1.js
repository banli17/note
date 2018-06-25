var fs = require('fs')


var data = ''

var readStream = fs.createReadStream('1.txt')


readStream.on('data', function (chunk) {
	data += chunk.toString()
})

readStream.on('end', function () {
	console.log(data)
})