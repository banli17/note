const buf1 = Buffer.from('我')
console.log(buf1) // <Buffer e6 88 91>

// 1) 将 3*8 拆成 4*6
console.log(0xe6.toString(2)) // 11100110
console.log(0x88.toString(2)) // 10001000
console.log(0x91.toString(2)) // 10010001

// 11100110 - 10001000 - 10010001 - >
//     111001 - 101000 - 100010 - 010001 - >
//     00111001 - 00101000 - 00100010 - 00010001

// 2) 转为10进制
console.log(parseInt('00111001', 2)) // 57
console.log(parseInt('00101000', 2)) // 40
console.log(parseInt('00100010', 2)) // 34
console.log(parseInt('00010001', 2)) // 17

// 3) 对应到数组
const base64 =  'abcdefghijklmnopqrstuvwxyz'.toUpperCase() + 'abcdefghijklmnopqrstuvwxyz' + '0123456789+/'

const str = base64[57] + base64[40] + base64[34] + base64[17] 
console.log(str) // 5oiR

console.log(buf1.toString('base64'))  //5oi
