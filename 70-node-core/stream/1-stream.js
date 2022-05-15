const fs = require('fs')

let rs = fs.createReadStream(__dirname + '/test.txt')

// rs.setEncoding('utf-8')

let ws = fs.createWriteStream(__dirname + '/test1.txt')

rs.pipe(ws)
