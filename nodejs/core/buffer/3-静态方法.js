let b1 = Buffer.from('hello')
let b2 = Buffer.from('world')

// concat 用于拼接 buffer
// 第二个参数 length 返回多长的buffer
const b3 = Buffer.concat([b1, b2], 8)
console.log(b3);
console.log(b3.toString()); // hellowor


// isBuffer
let b10 =  '123'
console.log(Buffer.isBuffer(b10)); // false
