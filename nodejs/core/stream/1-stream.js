import fs from 'fs'
import '../global'

let rs = fs.createReadStream(__dirname + '/test.txt')

// rs.setEncoding('utf-8')

let ws = fs.createWriteStream(__dirname + '/test1.txt')

rs.pipe(ws)

/*
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const stream = fs.createReadStream(`${__dirname}/data.txt`);
  stream.pipe(res);
});
server.listen(3000);
*/
