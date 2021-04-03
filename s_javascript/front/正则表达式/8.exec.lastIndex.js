const reg = /a/

// reg.lastIndex = 4

const str = 'helnaixxa'
console.log(reg.lastIndex)  // 0 
console.log(reg.test(str)) //  true
console.log(reg.lastIndex)  // 0
console.log(reg.test(str)) // true