// error
// 对象的 key 只能是字符串类型，所以有问题
function unique(arr) {
    const res = {}
    arr.forEach(item => {
        res[item] = true
    })
    return Object.keys(res)
}

const arr = [1, 2, 3, 2, 3, '1', '2']
console.log(unique(arr))    // [ '1', '2', '3' ]

