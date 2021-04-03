// util模块的方法的实现  Utilities
const util = require('util')

// util.callbackify 将async转成callback函数
async function fn() {
    return 'hello world'
}
let callbackFn = util.callbackify(fn)
callbackFn((err, data) => {
    if (err) throw err
    console.log(data)
})