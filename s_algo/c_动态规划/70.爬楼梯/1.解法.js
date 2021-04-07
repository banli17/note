/**
* 解法 1: 时间复杂度 O(n)，空间复杂度 O(n)
* @param n
* @returns {number|*}
*/
 var climbStairs = function (n) {
    if (n < 2) return n
    let dp = [1, 1]
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};

