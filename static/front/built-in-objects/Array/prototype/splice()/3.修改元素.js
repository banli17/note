const a = [1, 2, 3, 4]


const b = a.splice(1, 1, 0)

console.log(a, b)  // [ 1, 0, 3, 4 ] [ 2 ]