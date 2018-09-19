let a = ['hello', 'world', '!']

console.log(a.join())  // 默认用逗号连接

console.log(a.join(' '))
console.log(a.join(''))
console.log(a.join('-'))

let b = []
console.log(b.join() == '')  // true

let c = [, 'hello', null]

console.log(c.join('') == 'hello')  // true