const fs = require('fs')
const path = require('path')

const filename = path.resolve(__dirname)
console.log(filename)
fs.exists(filename, (res) => console.log(res))