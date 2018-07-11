const arr = ['a', , 'c']

var a = Object.keys(arr)
var b = [...arr.keys()]

console.log(a, b)  // [ '0', '2' ] [ 0, 1, 2 ]

// 迭代器会包含不存在元素的索引