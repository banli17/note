const fs = require('fs')
const path = require('path')

// 只能创建一层目录，如果目录存在，则报错
// fs.mkdir('./b', (err)=>{
//     if(err) throw err
//     console.log('创建目录成功')
// })

// 递归创建目录，使用循环
// function mkdirSync(path) {
//     let arr = path.split('/')
//     for (let i = 0; i < arr.length; i++) {
//         let p = arr.slice(0, i + 1).join('/')
//         try {
//             // 测试用户对 path 指定的文件或目录的权限，如果可访问性失败则会报错，否则返回 undefined
//             fs.accessSync(p)
//         } catch (e) {
//             fs.mkdirSync(p)
//         }
//     }
// }
// mkdirSync('./b/c/d')

// 使用递归创建目录
// function mkdir(path, callback) {
//     let arr = path.split('/')
//     let index = 0
//     function mk() {
//         if (index >= arr.length) return callback()
//         let p = arr.slice(0, index + 1).join('/')
//         try {
//             fs.accessSync(p)
//             index++
//             mk()
//         } catch (e) {
//             fs.mkdir(p, (err) => {
//                 if (err) throw err
//                 index++
//                 mk()
//             })
//         }
//     }
//     mk()
// }
// mkdir('a/b/c/d', () => {
//     console.log('创建完成')
// })

// 删除文件
// fs.unlinkSync('./test.txt')
// 删除目录
// fs.rmdirSync('./a')   //  directory not empty, rmdir './a'
// 读取目录
// let dirs = fs.readdirSync('.')
// console.log(dirs)// 返回当前的文件列表数组
// 文件的状态
// let stat = fs.statSync('a')
// console.log(stat.isDirectory()) // true

// 删除目录，深度优先
// function rmdirSync(p) {
//     let stat = fs.statSync(p)
//     if (stat.isDirectory()) {
//         let dirs = fs.readdirSync(p)
//         dirs.forEach(dir => {
//             let current = path.join(p, dir)
//             rmdirSync(current)
//         })
//         fs.rmdirSync(p)
//     } else {
//         fs.unlinkSync(p)
//     }
// }
// rmdirSync('a')


// 广度优先，循环，先把目录放到一个数组里，然后从后往前删除
function widerm(p) {
    let arr = [p]
    let index = 0
    let current
    while (current = arr[index++]) {
        console.log('c', current)
        let stat = fs.statSync(current)
        if (stat.isDirectory()) {
            let dirs = fs.readdirSync(current)
            dirs = dirs.map(dir => path.join(current, dir))
            arr = [...arr, ...dirs]
        }
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        let current = arr[i]
        let stat = fs.statSync(current)
        if (stat.isDirectory()) {
            fs.rmdirSync(current)
        } else {
            fs.unlinkSync(current)
        }
    }
}
widerm('a')