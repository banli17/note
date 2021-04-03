function unique(arr) {
    const res = []
    for (let i = 0, arrLen = arr.length; i < arrLen; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i])
        }
    }
    return res
}


const arr = [1, 2, 3, 2, 3, '1', '2']
console.log(unique(arr))    // [ 1, 2, 3, '1', '2' ]
