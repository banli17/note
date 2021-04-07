const arr = [1, 2, 3, 4, 5]

const max = arr.reduce((a, b) => {
    return Math.max(a, b)
}, arr[0])
console.log(max)  // 5
