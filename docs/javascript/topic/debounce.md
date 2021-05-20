# 防抖与节流

问题：有些事件频繁触发影响性能，如 resize、scroll、mousedown、mousemove、keyup、keydown、input 等。

为了解决这个问题，可以用防抖和节流：

- 防抖: 回调函数在事件触发 n 秒后执行，如果期间再次触发，则以最新事件时间为准。
- 节流: 回调函数在事件触发的 n 秒内只执行一次。

## 1. 防抖

**注意**

- 函数的 this 指向
- 函数的参数(如 event)
- immediate: 有 timeout 就不执行，没有才执行
- 函数的返回值(immediate 时才有效)
- 取消防抖

```js
function debounce(func, wait, immediate) {
  let timeout, result;
  let debounced = function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      // 没有 timeout 说明还没有执行过
      let callNow = !timeout;
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);

      // 有 timeout 就不会执行
      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

//
// let dfn = debounce(() => {
//     console.log(1)
// })
// for (let i = 0; i < 10000000; i++) {
//     dfn()
// }
```

## 2. 节流

节流的 2 种实现：

- 时间差比较: 立马执行，事件结束后不执行
- setTimeout: 延迟执行，事件结束后还会执行一次

实现步骤:

1. 实现时间差比较版本
2. 实现 setTimeout 版本
3. 结合 1、2 实现立马能执行，事件结束后还会执行一次的版本
4. 增加参数 leading tailing，实现可控制立马执行或结束后还执行。
   - 注意 leading, tailing 不能同时为 false，否则回调不会被执行。
