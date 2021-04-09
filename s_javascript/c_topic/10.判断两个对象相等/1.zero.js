console.log(+0 === -0)  // true

let a = (+0).toString()
let b = (-0).toString()
console.log(a)  // '0'
console.log(b)  // '0'

console.log(1 / +0)  // Infinity
console.log(1 / -0)  // -Infinity
// 最高位是符号为，所以 1000(-0) 和 0000(+1)

console.log(Math.round(-0.1)); // -0

function eq(a, b) {
    if (a === b) return a !== 0 || 1 / a === 1 / b
    return false
}
console.log(eq(-0, +0));  // false
console.log(eq(0, +0));  // true