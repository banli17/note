---
title: 动态规划
---

1. 递归 + 记忆化 = 递推
2. 状态的定义：`opt[n]`、`dp[n]`、`fib[n]`
3. 状态转移(dp)方程：`opt[n] = best_of(opt[n-1], opt[n-2],...)`
4. 最优子结构

## DP vs 回溯 vs 贪心

-   回溯(递归) - 重复计算
-   贪心 - 永远局部最优
-   DP - 记录局部最优子结构/多种记录值

## 斐波那契数列（Fibonacci sequence）

如果直接进行递归，算法复杂度是 O(2^n)。使用递归 + 记忆法，从上向下递归计算，算法复杂度是 O(2n)。使用递推法，直接从下向上计算，算法复杂度是 O(n)。

```js
function fib(n, c = [0, 1]) {
    if (n <= 1) return c[n];

    for (let i = 2; i <= n; i++) {
        c[i] = c[i - 1] + c[i - 2];
    }
    return c[n];
}
```

## 棋盘路径问题

> 棋盘从 start 到 end 共有多少种走法? 走动方向只能是右边或下边，中级有石头。

![](./imgs/dynamic-program-1.png)

-   一个格子的走法 = 它下面格子的走法 + 它右边格子的走法。
-   最下面格子，和最右边格子的走法都是 1。石头格子的走法是 0。
-   从最右下角，开始往左上角递推。

```js
let stone = {
    1: [2, 6],
    2: [1, 3, 4],
    3: [5],
    4: [2, 5, 7],
    5: [3],
    6: [1, 5],
};

/**
 * 创建格子
 * @param {*} m 格子行数
 * @param {*} n 格子列数
 */
function createMap(m, n) {
    let steps = [];
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (!steps[i]) steps[i] = [];
            steps[i][j] = i == 0 || j == 0 ? 1 : 0;
        }
    }
    return steps;
}

/**
 *  检测是否是石头
 */
function isStone(stone, i, j) {
    return stone && stone[i] && stone[i].includes(j);
}

/**
 * 动态规划走法
 */
function step(steps, m, n) {
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (isStone(stone, i, j)) {
                steps[i][j] = 0;
            } else {
                steps[i][j] = steps[i - 1][j] + steps[i][j - 1];
            }
        }
    }
    return steps;
}
```

## 爬楼梯问题

leetcode 70 题：楼梯一次只能爬 1 或者 2 步，第 n 层有多少种爬法。

其实就是一个斐波那契问题。

```js
var climbStairs = function (n) {
    if (n <= 2) return n;
    let all = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        all[i] = all[i - 1] + all[i - 2];
    }
    return all[n];
};
```

## 三角形最小路径和

## 练习地址

-   [https://github.com/banli17/practice/tree/master/algo](https://github.com/banli17/practice/tree/master/algo)
