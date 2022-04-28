let b1 = Buffer.alloc(6)

// fill(data[, start])
b1.fill('12', 1)
console.log(b1); // <Buffer 00 00 31 32 31 32>
console.log(b1.toString('utf-8')); // 12121

b1.fill(123)
console.log(b1); // <Buffer 7b 7b 7b 7b 7b 7b>
console.log(b1.toString()); // {{{{{{

b1.fill('12345678')
console.log(b1); // <Buffer 31 32 33 34 35 36>
console.log(b1.toString()); // 123456


// write(data[, start, len]), len 是写多少个 data
const len = b1.write('2222', 1, 3)
console.log('len', len); // 3
console.log(b1); // <Buffer 31 32 32 32 35 36>
console.log(b1.toString()); // 122256

b2 = Buffer.from('你好啊')
console.log(b2);
console.log(b2.toString('utf-8', 3, 6)); //好 toString(ecode, start, end)

// slice
console.log(b2.slice(3).toString()); // 好啊
console.log(b2.slice(-3).toString()); // 啊

// indexOf
b5 = Buffer.from('hello你好啊, 哎你好啊')
console.log(b5);
console.log(b5.indexOf('好')); // 8
console.log(b5.indexOf('好', 10)); // 22


// copy(source, sourceStart, distStart, distEnd)
b3 = Buffer.from("你好啊")
b4 = Buffer.alloc(9)
b3.copy(b4, 3, 3, 6) // b3 拷贝到 b4
console.log(b4);
console.log(b4.toString());

// Buffer.concat 参数是一个数组
console.log(Buffer.concat([b5, b3]).toString()); // hello你好啊, 哎你好啊你好啊
console.log(Buffer.isBuffer(b3)); // true