# 函数式编程

## 函数柯里化

柯里化是一种将多参数函数转成一系列使用一个参数函数的技术。

作用是参数复用，本质是降低函数的通用性，提高适用性。

**实现**

- `curry(fn, ...args)`使用闭包保存参数并返回函数 curryFn，执行 curryFn(...restArgs) 时，将参数(args, restArgs)合并，执行函数 fn。
- 当参数总数量大于等于 fn.length 时，才执行函数 fn，否则继续返回 curry。
- 使用占位符\_，实现后续可以传递其它位置的参数
  - 如对 fn(a,b,c) 柯里化 curryFn(fn, a, \_ ,c) 之后可以执行 curryFn(b)。
  - 如果后续参数有占位符，则一一匹配，curryFn(_, _ ,1) -> curryFn(2, _, 4)，则等价于 currFn(2, _, 1, 4)
