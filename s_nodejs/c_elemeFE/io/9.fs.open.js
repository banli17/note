const fs = require('fs')

// 文件属性 
// r 读 ，不存在报错
// w 写 ，文件存在则重写  文件不存在则创建
// wx 和w 一样，但文件不存在会报错
// a 追加，不存在新建文件
// a+ 可读，可追加 ，文件不存在则创建
// r+ 可读写，文件不存在则报错 
// w+ 可读写，文件不存在会创建

// fd 文件描述符
// 权限 0o666  2读取  4写入 1 执行
// linux文件系统

// 读文件
// const buf = Buffer.alloc(3)
// fs.open('./9.txt', 'r', 0o666, (err, fd) => {
//     if (err) {
//         throw new Error('文件不存在')
//     }
//     // read 根据文件描述符读取文件
//     // buf 将数据写入到哪个缓存区， offset是buffer开始写入的偏移量。length读取多少个字节 。postion 从文件的哪个位置读取
//     // 读取的字节数不能超过buf的大小
//     fs.read(fd, buf, 0, 3, 3, (err, bytesRead, buffer) => {
//         if (err) throw err
//         console.log(bytesRead, buffer, buffer.toString()) // 3 <Buffer e6 88 91>  我
//     })
// })

// 写文件
// const buf1 = Buffer.from('向')
// fs.open('./9.txt', 'a+', (err, fd) => {
//     if (err) throw err
//     // fs.write(fd, buffer[, offset[, length[, position]]], callback)
//     fs.write(fd, buf1, 0, 3, 3, (err, bytesWritten, buffer) => {
//         console.log(bytesWritten, buffer)
//         fs.close(fd, () => {
//             console.log('文件关闭成功')
//         })
//     })
// })

// fs.open('./9.txt', 'w+', (err, fd) => {
//     if (err) throw err
//     fs.write(fd, '前', 0, 'utf8', (err, bytesWritten, buffer) => {
//         console.log(bytesWritten, buffer)
//         fs.close(fd, () => {
//             console.log('文件关闭成功')
//         })
//     })
// })

// 读一点写一点
fs.open('./9.txt', 'r', (err, fd) => {
    fs.open('./9-2.txt', 'w', (err, fd2) => {
        if (err) throw err
        const buf = Buffer.alloc(3)
        let start = 0
        const next = () => {
            fs.read(fd, buf, 0, 3, start, (err, bytesRead) => {
                if (err) throw err
                console.log(bytesRead)
                if (!bytesRead) {
                    fs.close(fd, () => {})
                    fs.close(fd2, () => {})
                    return
                }
                start += bytesRead
                fs.write(fd2, buf, 0, bytesRead, (err, bytesWritten) => {
                    if (err) throw err
                    next()
                })
            })
        }
        next()
    })
})