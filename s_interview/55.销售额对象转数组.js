let a = {
    1: 222,
    2: 123,
    5: 888
}

function translate(obj) {
    // Array.from({length:12})  将数组
    return new Array(12).fill(null).map((item, index) => a[index + 1] || null)
}

console.log(translate(a))

console.log(Array.from({length:12}))