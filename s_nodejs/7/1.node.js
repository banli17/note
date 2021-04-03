// 1) node中的this === global，可以从命令行环境看出，当node执行文件时，this会改成module.exports
// 浏览器的this是全局对象，但不能访问，window是其代理
// console.log(this === module.exports) // true

// 2) 查看隐藏的属性
// console.dir(global, {
//     showHidden: true
// })

// 3) process 进程对象
// node 1.node.js --a aa --b bb
// console.log(process.argv)  // 返回一个数组 [node执行文件路径, node跟的执行文件路径1.node.js的路径, --a, aa, --b, bb]
// 写一个获取参数的方法。学习reduce slice的用法
// commander yargs
function getArgv() {
    return process.argv.slice(2).reduce((a, b, i, arr) => {
        if (b.includes('-')) {
            a[b.slice(2)] = arr[i + 1]
        }
        return a
    }, {})
}
console.log(getArgv())

// 执行环境 mac下 export NODE_ENV=xxx  /windows下 set NODE_ENV=xxx  (可以使用cross-evn跨平台设置)
// process.env.NODE_ENV === 'development' ? 
// console.log(process.env)  系统的信息 (PATH、PWD、HOME)
// 掌握linux环境变量

// console.log(process.cwd())   // 执行目录，执行node命令的目录


// node事件环