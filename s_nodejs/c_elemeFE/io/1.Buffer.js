const buf1 = Buffer.alloc(10)
console.log(buf1)  // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.alloc(10, 1);
console.log(buf2)  // <Buffer 01 01 01 01 01 01 01 01 01 01>


// 创建一个未初始化的Buffer，速度比alloc更快，但是包含旧数据，需要用fill()或write()重写
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3)  // <Buffer 08 d0 81 04 01 00 00 00 00 00>

const buf4 = Buffer.from([1, 2, 300]);
console.log(buf4)  // <Buffer 01 02 2c>  2c -> 2*16 + 12 = 44 = 300 - 256  (0-255)
console.log(300&255) // 44

const buf5 = Buffer.from('tést');
console.log(buf5)  // <Buffer 74 c3 a9 73 74>