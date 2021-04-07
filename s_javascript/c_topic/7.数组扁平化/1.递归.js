function flatten(input) {
    let res = []
    input.forEach(item => {
        if (Array.isArray(item)) {
            // concat 不会改变原来的数组
            res = res.concat(flatten(item))
        } else {
            res.push(item)
        }
    })
    return res
}

var arr1 = [1, 2, [3, 4, [5, 6]]];
console.log(flatten(arr1))
