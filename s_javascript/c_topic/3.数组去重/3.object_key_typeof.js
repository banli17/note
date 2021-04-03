// ok
function unique(arr) {
    const res = {}

    return arr.filter(item => {
        // 在 key 上增加 typeof，但是无法判断对象
        // return res.hasOwnProperty(typeof item + item) ? false : res[typeof item + item] = true

        // 判断对象类型时  {a: 1} {a: 2}
        // 使用 typeof + JSON.stringify
        return res.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : res[typeof item + JSON.stringify(item)] = true
    })
}

const arr = [1, 2, 3, 2, 3, '1', '2', {a: 1}, {b: 2}, {a: 1}]
console.log(unique(arr))    // [ 1, 2, 3, '1', '2' ]

