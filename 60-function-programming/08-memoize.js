// 记忆函数
const _ = require('lodash')

// 获取圆的面积
function getArea(r) {
  console.log(r); // 只执行了一次
  return Math.PI * r * r
}

// 会缓存函数的结果
let getAreaWithMemory = _.memoize(getArea)

console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))

// memoize 实现
function memoize(fn) {
  const cache = {}
  return function () {
    const key = JSON.stringify(arguments)
    if (!cache[key]) {
      cache[key] = fn.apply(fn, arguments)
    }
    return cache[key]
  }
}

let getAreaWithMemory2 = memoize(getArea)

console.log(getAreaWithMemory2(4))
console.log(getAreaWithMemory2(4))
console.log(getAreaWithMemory2(4))
