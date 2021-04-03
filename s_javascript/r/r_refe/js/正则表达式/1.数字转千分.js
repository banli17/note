// 转成 10,000
let n = '1000000'


function format(n) {
    return n.replace(/((?:\B\d){3})/g, ',$1')
}

console.log(format(n))