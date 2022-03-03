/**
 * dp 方程：
 *  设打劫当前为 k，最大打劫为 f(n) = max(f(n-1), f(n-2) + k)
 */
var rob = function (nums) {
    let numsLen = nums.length
    if (numsLen < 1) return nums[0]
    let dp = [0, nums[0]]
    // dp 比 nums 多了一项
    for (let i = 2; i <= numsLen; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
    }
    return dp[numsLen]
};
