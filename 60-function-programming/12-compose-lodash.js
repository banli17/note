const _ = require('lodash')

function reverse(arr) {
  return arr.reverse()
}

function first(arr) {
  return arr[0]
}

function toUpper(str) {
  return str.toUpperCase()
}

const last = _.flowRight(toUpper, first, reverse)

console.log(last([1, 2, 3, 'hello']));

// 组合的好处是，让细粒度的函数 任意组合和复用


// flowRight 的实现
// function flowRight(...fns) {
//   let ret
//   return (...args) => {
//     while (fns.length) {
//       const fn = fns.pop()
//       ret = fn.apply(null, args)
//       args = [ret]

//     }
//     return ret
//   }
// }

function flowRight(...fns) {
  return (...args) => {
    return fns.reverse().reduce((a, b) => {
      a = b.apply(null, a)
      return [a]
    }, args)[0]
  }
}
const last2 = flowRight(toUpper, first, reverse)
console.log(last2([1, 2, 3, 'hello']));
