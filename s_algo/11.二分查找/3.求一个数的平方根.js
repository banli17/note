// 查找10 
// 精确到6位
// 循环
function sqrt(x) {
    let low = 0
    let high = x / 2
    let mid

    while (low <= high) {
        mid = low + (high - low) / 2
        if (Math.abs(x - mid * mid) <= 0.000000001) {
            break
        } else if (mid * mid < x) {
            low = mid
        } else {
            high = mid
        }
    }
    if (parseInt(mid) * parseInt(mid) === x) return parseInt(mid)
    return mid
}

console.log(sqrt(5))
console.log(Math.sqrt(5))