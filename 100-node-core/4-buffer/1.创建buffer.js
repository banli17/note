// 1. 创建 buffer
const b1 = Buffer.alloc(10)
console.log(b1); // 10个字节(16进制表示), 会全初始化为 0

const b2 = Buffer.allocUnsafe(10)
console.log(b2); // 不会被初始化为 0

// 将什么数据放到 Buffer 中, 三个参数：数据、编码utf-8
const b3 = Buffer.from('1')
console.log(b3); 

const b4 = Buffer.from('我') // 一个汉字是三个字节
console.log(b4);  //<Buffer e6 88 91>

let b5 = Buffer.from([1, 2, '我'])
console.log(b5);  // <Buffer 01 02 00>

// 如果要将 '我' 转成 buffer，需要先转 16 进制

b5 = Buffer.from([0xe6, 0x88, 0x91])
console.log(b5); // <Buffer 01 02 e6 88 91>
console.log(b5.toString()); // 我, 默认是 toString('utf-8')

// 都会表示为 16 进制
b5 = Buffer.from([0x60, 0b1001, 12])
console.log(b5); // <Buffer 60 09 0c>

const b6 = Buffer.alloc(3) // <Buffer 00 00 00>
const b7 = Buffer.from(b6)
console.log(b6 === b7); // false
b6[0] = 1
console.log(b6); // <Buffer 01 00 00>