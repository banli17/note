// arr.fill(value[, start[, end]])

var arr = [1, 2, 3]
arr.fill(3)
console.log(arr)  // [3, 3, 3]

arr.fill(5, 1, 2) // 替换的元素是[1, 2)左闭右开空间
console.log(arr)  // [3, 5, 3]


arr.fill(6, -1)
console.log(arr)  // [3, 5, 6]

arr.fill(6, -2, -1)
console.log(arr);  // [3, 6, 6]

[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]


// fill是通用接口
[].fill.call({length: 3}, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
[].fill.call({a: 2}, 4);     // 不变 {a:2}
