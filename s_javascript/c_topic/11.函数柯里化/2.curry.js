// 参数不够时继续柯里化，否则执行函数
const curry = function (fn, ...curArgs) {
    return function (...args) {
        const allArgs = [...curArgs, ...args]
        if (fn.length > allArgs.length) {
            return curry(fn, ...allArgs)
        } else {
            return fn.apply(this, allArgs)
        }
    }
}

function add(a, b, c, d) {
    return a + b + c + d
}

let curryAdd = curry(add, 1)

console.log(curryAdd(2)(3)(4))
console.log(curryAdd(2, 3)(4))
console.log(curryAdd(2, 3, 4))

