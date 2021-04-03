let fs = require('fs')
let ws = fs.createWriteStream('./13.txt', {
    flags: 'w',
    encoding: 'utf8',
    autoClose: true,
    start: 0,
    highWaterMark: 4
})

// 写 0 - 9
let i = 0

function write() {
    let flag = true
    while (i < 10 && flag) {
        flag = ws.write(`${i}`, 'utf8', () => {})
        console.log('flag:', flag)
        i++
    }
}
write()

ws.on('drain', () => { // 缓存达到预期且清空后 会触发 drain
    console.log('drain')
    write()
})