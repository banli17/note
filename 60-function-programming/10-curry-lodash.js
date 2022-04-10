const _ = require('lodash')

function getSum(a, b, c) {
  return a + b + c
}

const curried = curry(getSum)

console.log(curried(1, 2, 3));
console.log(curried(1)(2, 3));
console.log(curried(1, 2)(3));
console.log(curried(1)(2)(3));

// curry 实现
// 把参数缓存起来，每次执行时比较参数个数
function curry2(func) {
  return function curriedFn(...args) {
    // 判断形参和实参个数
    if (args.length < func.length) {
      return function () {
        // ...args.concat(Array.from(arguments))
        return curriedFn(...args, ...arguments)
      }
    }

    return func(...args)
  }
}

function curry(func) {
  let args = []
  return function curriedFn() {
    args.push(...arguments)
    if (args.length < func.length) {
      return curriedFn
    }

    let ret = func(...args)
    args = []
    return ret
  }
}

// (()=>{
//   curriedFn(1)
// })(2)
// curriedFn(1, 2)
// (()=>{
//   curriedFn(1, 2)
// })
// curriedFn(1, 2)(3) => curriedFn(1, 2, 3)
