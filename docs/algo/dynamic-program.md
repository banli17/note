# 动态规划

1. 递归 + 记忆化 -> 递推
2. 状态的定义：`opt[n]`、`dp[n]`、`fib[n]`
3. 状态转移方程：`opt[n] = best_of(opt[n-1], opt[n-2],...)`
4. 最优子结构

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
