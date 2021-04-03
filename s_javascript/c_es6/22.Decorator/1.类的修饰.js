// 修饰器，就是一个函数，其参数默认是类本身

/**
 * example1
 */
// @test
// class Test {

// }

// function test(target) {
//     target.isTest = true   // 给Test类添加静态属性 isTest
// }

// console.log(Test.isTest) // true

/**
 * example2
 */
const test = (isTest) => (target) => target.isTest = isTest
@test(false)
class Test {

}

// function test(target) {
//     target.isTest = true   // 给Test类添加静态属性 isTest
// }

console.log(Test.isTest) // true
