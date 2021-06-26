/**
 * 解法 2: 时间复杂度 O(n)，空间复杂度 O(1)
 * @param n
 * @returns {number|*}
 */
var rob = function (nums) {
    let numsLen = nums.length
    if (numsLen == 1) return nums[0]
    let dp0 = 0
    let dp1 = nums[0]
    let dp2
    // dp 比 nums 多了一项
    for (let i = 2; i <= numsLen; i++) {
        // (fx)
        dp2 = Math.max(dp1, dp0 + nums[i - 1])
        dp0 = dp1
        dp1 = dp2
    }
    return dp2
};
