function flatten(input) {
    // split 后是字符串，需要转为数字
    let res = input.toString().split(',').map(item => +item || item)
    return res
}

var arr1 = [1, 2, [3, 4, [5, '6', 'null']]];
console.log(flatten(arr1))  // [ 1, 2, 3, 4, 5, 6, 'null']
