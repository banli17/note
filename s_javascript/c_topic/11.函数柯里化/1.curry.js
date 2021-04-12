// 将参数做一个闭包保存，调用时一起传入
const curry = function (fn, ...curArgs) {
    return function (...args) {
        return fn.call(this, ...curArgs, ...args)
    }
}

function add(a, b) {
    return a + b
}

let curryAdd = curry(add, 1)

console.log(curryAdd(2))

let curryAdd2 = curry(add)
console.log(curryAdd2(2, 3))
