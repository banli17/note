const qs = require('qs')
const querystring = require('querystring')

let obj = {
    a: {
        b: {
            c: 1
        }
    },
    d:3
}
let obj2 = {
    a: 2,
    b:3
}

console.log(querystring.stringify(obj)) // a=&d=3 不支持有深度的对象
console.log(querystring.stringify(obj2)) // a=2&b=3

console.log(qs.stringify(obj))     // a%5Bb%5D%5Bc%5D=1&d=3  -> a[b][c]=1&b=3
console.log(qs.stringify(obj2))    // a=2&b=3

console.log(querystring.parse('a%5Bb%5D%5Bc%5D=1&d=3'))  // { 'a[b][c]': '1', d: '3' }


// HTTP 如何通过 GET 方法 (URL) 传递 let arr = [1,2,3,4] 给服务器?
let arr = [1,2,3,4];
let str = qs.stringify({arr});

console.log(str); // arr%5B0%5D=1&arr%5B1%5D=2&arr%5B2%5D=3&arr%5B3%5D=4
console.log(decodeURI(str)); // 'arr[0]=1&arr[1]=2&arr[2]=3&arr[3]=4'
console.log(qs.parse(str)); // { arr: [ '1', '2', '3', '4' ] }
// https://your.host/api/?arr[0]=1&arr[1]=2&arr[2]=3&arr[3]=4



