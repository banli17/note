const {
    StringDecoder
} = require('string_decoder')
const decoder = new StringDecoder('utf8')

console.log(Buffer.from('你好啊')) // <Buffer e4 bd a0 e5 a5 bd e5 95 8a>

// 1) 首先 write 四个字节，前三个字节组成 你，剩下 好的一部分字节 0xe5
const str1 = decoder.write(Buffer.from([0xe4, 0xbd, 0xa0, 0xe5]))
console.log(str1) // 你

// 2) 再次传入 好 的剩余字节
const str2 = decoder.write(Buffer.from([0xa5, 0xbd]))
console.log(str2) // 好

// 3) 调用 end() 时如果传入的字节不完整
const str3 = decoder.end(Buffer.from([0xe5]))
console.log(str3) // �   
console.log(Buffer.from(str3)) // <Buffer ef bf bd>

// decoder.end() 内部剩余的buffer会一次性返回