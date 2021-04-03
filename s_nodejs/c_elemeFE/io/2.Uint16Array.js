var arr = new Uint16Array(2)
arr[0] = 5000
arr[1] = 4000
console.log(arr) // Uint16Array [ 5000, 4000 ]


//  拷贝buffer
const buf1 = Buffer.from(arr)
console.log(buf1)  // <Buffer 88 a0> 
// 88 -> 8*16+8 -> 136 = 5000&255
// a0 -> 10*16 -> 160 = 4000&255
console.log(arr.buffer)  // ArrayBuffer { [Uint8Contents]: <88 13 a0 0f>, byteLength: 4 }

// 与buffer共享内存
const buf2 = Buffer.from(arr.buffer)
console.log(buf2)  // <Buffer 88 13 a0 0f>
// 1 * 16 + 3 = 19 -> 154  

// 是引用，可以改变
arr[1] = 6000
console.log(buf1);
// 输出: <Buffer 88 a0>
console.log(buf2);
// 输出: <Buffer 88 13 70 17>