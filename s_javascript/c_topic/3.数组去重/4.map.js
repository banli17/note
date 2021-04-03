function unique(arr) {
    const res = new Map()
    return arr.filter((a) => !res.has(a) && res.set(a, 1))
}

const arr = [1, 2, 3, 2, 3, '1', '2', {a: 1}, {b: 2}, {a: 1}]
console.log(unique(arr))    // [ '1', '2', '3' ]

