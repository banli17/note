// function formatNumber(str) {
//     return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
// }

// console.log(formatNumber("123456789")) // 123,456,789
// console.log(formatNumber("1234567.89")) // 1,234,567.89


// const a = /\b/g
// const str = 'helhlo hi'

// // const b = str.replace(a, 'x')
// // console.log(b)


// while (true) {
//     const c = a.test(str)
//     console.log(c, a.lastIndex)
// }

const a = '0123456789'
const reg = /\B/g

const b = a.replace(reg, ',')
console.log(b)  // 1,2,3,4,5,6,7,8,9

const reg1 = /\b/g
const c = a.replace(reg1, ',')
console.log(c)  // ,123456789,

const reg2 = /\B(?=(\d{3})+(?!\d))/g
const d = a.replace(reg2, ',')
console.log(d)  // 9,99