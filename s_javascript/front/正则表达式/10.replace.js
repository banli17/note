// let a = '我好hello你好'
// let b = a.replace(/(\w+)你好/, "$&")  // 我好我好
// console.log(b)


// let c = '3 and 5'.replace(/[0-9]+/g, function (match) {
//     return 2 * match;
// })

// console.log(c)  // '6 and 10'

const d = /hello(你)/g
const str = 'hello你我他hello你我'

let e = str.replace(d, function (a, b, c, d) {
    console.log(a, b, c, d)
})

// hello你 你 0 hello你我他hello你我
// hello你 你 8 hello你我他hello你我