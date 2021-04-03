# js 专题

## 1. 防抖节流

问题：有些事件频繁触发影响性能，如 resize、scroll、mousedown、mousemove、keyup、keydown、input 等。

为了解决这个问题，可以用防抖和节流：
- 防抖: 回调函数在事件触发 n 秒后执行，如果期间再次触发，则以最新事件时间为准。
- 节流: 回调函数在事件触发的 n 秒内只执行一次。

### 防抖

**注意**

- 函数的 this 指向
- 函数的参数(如 event)
- immediate: 有 timeout 就不执行，没有才执行
- 函数的返回值(immediate 时才有效)
- 取消防抖
