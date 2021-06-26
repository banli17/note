/**
 * 解法 2: 时间复杂度 O(n)，空间复杂度 O(1)
 * @param n
 * @returns {number|*}
 */
var climbStairs = function (n) {
    if (n < 2) return n
    let dp0 = 1
    let dp1 = 1
    for (let i = 2; i <= n; i++) {
        const temp = dp0
        dp0 = dp1
        dp1 = dp1 + temp
    }
    return dp1
};

