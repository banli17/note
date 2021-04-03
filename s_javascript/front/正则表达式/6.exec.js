const reg = /ab/g
const str = 'cabxxx_abeee_abcc'

// while (reg.test(str)) {
//     console.log(reg.exec(str))
// }

// console.log(reg.test(str))
// console.log(reg.test(str))
// console.log(reg.test(str))
// console.log(reg.test(str))
// console.log(reg.test(str))
// let count = 0
// while(reg.test(str)){
//     console.log(count++)
// }
const reg = /ab/g
const str = 'cabxxx_abeee_abcc'
reg.test(str)
reg.exec(str)
console.log(reg.lastIndex) // 9