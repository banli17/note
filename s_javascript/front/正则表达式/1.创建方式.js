const reg = new RegExp('\w+')
console.log(reg.test('hello'))  // false

// 双重转义
const reg1 = new RegExp('\\w+')
console.log(reg1.test('hello'))  // true


const a = hello
const reg2 = '/' + a + '/'