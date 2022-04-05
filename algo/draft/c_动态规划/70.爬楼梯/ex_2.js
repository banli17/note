// 第二遍练习
// 重复子问题 f(n) = f(n-1) + f(n-2)

const climbStairs = function (n) {
    if (n <= 2) return n
    let f1 = 1
    let f2 = 2
    let temp
    for (let i = 3; i <= n; i++) {
        temp = f1
        f1 = f2
        f2 = f2 + temp
    }
    return f2
}
