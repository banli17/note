let arr = [1, 2, 3, 4, 5]

// 纯函数 slice，每次对于相同输入，都有相同输出
console.log(arr.slice(0, 3));
console.log(arr.slice(0, 3));
console.log(arr.slice(0, 3));

// 不纯的函数 splice
console.log(arr.splice(0, 3)) // [1, 2, 3]
console.log(arr.splice(0, 3)) // [4, 5]
console.log(arr.splice(0, 3)) // []

// 纯函数
function sum(a, b) {
  return a + b
}
