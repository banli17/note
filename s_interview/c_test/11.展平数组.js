var arr = [
    [1, 2, 2],
    [3, 4, 5, 5],
    [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];


    return Array.from(new Set(arr.flat(Infinity))).sort((a, b) => a - b)
function flattern(arr) {
    let len = arr.length
    let newArr = []
    for (let i = 0; i < len; i++) {
        if (typeof arr[i] !== 'object') {
            newArr = newArr.concat(arr[i])
        } else {
            newArr = newArr.concat(...flattern(arr[i]))
        }
    }
    return Array.from(new Set(newArr)).sort((a, b) => a - b)
}

console.log(flattern(arr))

console.log(arr.toString())