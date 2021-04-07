// 只要后一天比前一天大，就买卖
var maxProfit = function (prices) {
    let profit = 0
    for (let i = 1; i < prices.length; i++) {
        // 如果后面大于前面，则买卖
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1]
        }
    }
    return profit
};
