var bf = Buffer.from('hello')
console.log(bf.toString())


var str = '你好 hello'
var buf = new Buffer(str, 'utf-8')
console.log(buf)

console.log(buf[0])
