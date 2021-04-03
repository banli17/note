// buffer 一旦声明，不能更改大小，比较像数组,16进制

let buf1 = Buffer.alloc(5) // <Buffer 00 00 00 00 00> 安全的，重置为0
console.log(buf1)

// 将字符串转成buffer
const buf2 = Buffer.from('你好')
console.log(buf2) // <Buffer e4 bd a0 e5 a5 bd>
console.log(buf2.length) // 6
console.log(Buffer.isBuffer(buf2)) // true

// 合并buf
Buffer.concat = (list, totalLength = list.reduce((a, b) => a + b.length, 0)) => {
    let buffer = Buffer.alloc(totalLength)
    let offset = 0
    list.forEach(buf => {
        buf.copy(buffer, offset)
        offset += buf.length
    })
    return buffer
}

const buf3 = Buffer.from('你')
const buf4 = Buffer.from('好')
console.log(Buffer.concat([buf3, buf4]).toString()) // 你好

const buf5 = buf3.slice(0, 3)
buf3[2] = 1
console.log(buf5)