# Promise 

## 实现

- new Promise 会立即执行
- 有 3 种状态 pending, fullfilled, rejected, 状态一旦变化，就不可再变
- resolve(), reject() 函数用来改变状态
- then 方法
  - 有两个参数, successCallback 和 failCallback, 它们分别有对应的参数，成功的值和失败的信息。
  - 链式调用, 返回值是一个新的 promise 对象(测试 a 是一个 promise, `a.then() === a` 返回 true)。
  - 返回值会被作为下一个 then 的参数值。
  - then() 方法不传递参数, 值能穿透到后面去
- 异常捕获
  - executor 错误
  - 

## 步骤

1. 实现基本的 Promise: resolve, reject, then
2. 支持异步 `setTimeout(()=> resolve())` 的情况
3. 支持 then 多次调用
