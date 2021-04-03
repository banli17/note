console.log([1,2,3].map(parseInt))  // [ 1, NaN, NaN ]


var b = parseInt(1, false)  // 相当于基数是0
console.log(b)  // 1
 b = parseInt(1, true)  // 相当于基数是1，无效
console.log(b)  // NaN
 b = parseInt(1, NaN) 
console.log(b)  // 1
b = parseInt(1, null) 
console.log(b)  // 1
b = parseInt(1, undefined) 
console.log(b)  // 1