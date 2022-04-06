// splice 的用法

let arr = [1, 2, 3, 4, 5, 6]
// 返回被删除的元素组成的数组，如果没有删除的元素，就返回一个空数组
// 1. splice(start, 默认是 length -1) 返回 [start, end)
// console.log(arr.splice(3)) // [4, 5, 6]
// console.log(arr) // [1, 2, 3]

// 2. splice(start, deleteCount)
// console.log(arr.splice(3, 1))
// console.log(arr) // [1, 2, 3, 5, 6]

// 3. splice(start, deleteCount, item1...itemN)
console.log(arr.splice(3, 1, 'a')) // [4] 将索引 3 的元素删除，然后放入 'a'
console.log(arr) // [1, 2, 3, 'a', 5, 6]
