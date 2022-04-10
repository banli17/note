// first last toUpper reverse each includes find findIndex
const _ = require('lodash')

const arr = ['jack', 'tom', 'lucy', 'kate']

console.log(_.first(arr)); // jack, 回去第一个元素
console.log(_.last(arr)); // kate, 获取最后一个元素
console.log(_.last(arr[0])); // k, 获取最后一个元素

console.log(_.toUpper(_.first(arr))); // JACK, 转为大写

// [ 'kate', 'lucy', 'tom', 'jack' ]
console.log(_.reverse(arr), arr); // 就是 arr 的 reverse，会改变原函数，不是纯函数

const r = _.each(arr, (item, i) => {
  console.log(item, i);
})

console.log('r', r); // each 返回，数组本身 [ 'kate', 'lucy', 'tom', 'jack' ]

console.log(_.includes('tom')); // true
