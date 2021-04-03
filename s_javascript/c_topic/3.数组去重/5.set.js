function unique(arr) {
    // return Array.from(new Set(arr))
    return [...new Set(arr)]
}

const arr = [1, 2, 3, 2, 3, '1', '2', {a: 1}, {b: 2}, {a: 1}]
console.log(unique(arr))    // [ '1', '2', '3' ]

