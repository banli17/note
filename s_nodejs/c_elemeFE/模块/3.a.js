// 循环引用的问题，a require('b') b require('a')
// 执行过程是：require('./3.b') 回去执行，3.b.js 遇到文件require('./3.a.js')时，会取该模块的exports当时的值，然后继续向下走
// http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html
// http://www.ruanyifeng.com/blog/2015/05/require.html
// 如何从设计上避免循环引用?
// 导出工厂函数去获取该模块的module.exports  ? 不懂
// 如果有引用a, 会放到 Module.cache 中，如果其它文件又加载了a，会找cache取出来。

console.log('a')
const b = require('./3.b')

console.log('this is a ,b is ', b) // this is a ,b is  bbb

module.exports = 'aaaa'