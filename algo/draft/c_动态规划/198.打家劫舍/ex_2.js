const rob = function (nums) {
    if (nums.length <= 1) return nums[0]
    let f0 = 0
    let f1 = nums[0]
    let f2
    for (let i = 1; i < nums.length; i++) {
        f2 = Math.max(f1, f0 + nums[i])
        f0 = f1
        f1 = f2
    }
    return f2
}
