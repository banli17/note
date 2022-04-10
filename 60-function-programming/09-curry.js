// 普通的纯函数
// function checkAge(age, min) {
//   return age >= min
// }

// checkAge(20, 18)
// checkAge(22, 18)
// checkAge(12, 18)
// checkAge(30, 20)

// 但是基准值 18 重复了很多次
// 所以用柯里化将参数 18 提取出来
function checkAge(min) {
  return function (age) {
    return age >= min
  }
}
const checkAge18 = checkAge(18)
const checkAge20 = checkAge(20)

// 使用箭头函数简化
let checkAge2 = min => age => age >= min
