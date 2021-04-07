function flatten(input) {
    // split 后是字符串，需要转为数字
    // return [].concat(...input)
    return input.reduce((a, b) => {
        console.log(a, b)
        if (Array.isArray(b)) {
            return a.concat(...b)
        } else {
            return a.concat(b)
        }
    }, [])
}

var arr1 = [1, [2, [3, 4]], [5, '6']];
console.log(flatten(arr1))  //[ 1, 2, 3, 4, 5, '6' ]
