// curry demo
// 提取字符串中的空白字符、数字
// ''.match(/\s+/g) // 无法复用, 写成函数
// ''.match(/\d+/g)

const _ = require('lodash')

// 提取字符串中的指定内容
// function match(reg, str) {
//   return str.match(reg)
// }

// 使用 curry 生成两个函数: haveSpace haveNumber
const match = _.curry(function (reg, str) {
  return str.match(reg)
})
const haveSpace = match(/\s+/g)
console.log(haveSpace('hello world'))
const haveNumber = match(/\d+/g)

console.log(haveNumber('hi99'))

// 过滤有空白的元素
const filter = _.curry(function (func, arr) {
  return arr.filter(func)
})
console.log(filter(haveSpace, ['john connor', 'john_donne']))

const filterSpace = filter(haveSpace)

console.log(filterSpace(['john connor', 'john_donne']))
