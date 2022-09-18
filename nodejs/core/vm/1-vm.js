const fs = require('fs')
const vm = require('vm')

age = 23
const content = fs.readFileSync(__dirname + '/test.txt', 'utf-8')

// console.log(content);

// eval(content)

// console.log(age) // 和 上面 age 冲突 Identifier 'age' has already been declared

// let fn = new Function('age', 'return age + 1')
// console.log(fn(age))

// vm.runInThisContext(content)
// console.log(age) // Identifier 'age' has already been declared

// 和外部是隔离的, 不能使用外部的局部变量 let age = 23，可以使用全局变量如 age = 23
vm.runInThisContext('age += 10')
console.log(global.age) // 33
