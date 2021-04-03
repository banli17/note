function isMinusZero(value) {
    return 1 / value === -Infinity;
}

isMinusZero(0); // false
isMinusZero(-0); // true

let r = isMinusZero(-1e-323) // true
console.log(r);


console.log(Math.abs(-0))
// 修复
console.log(-0 + 0); // 0