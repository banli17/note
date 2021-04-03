# js 专题

## 防抖与节流(1-2)

问题：有些事件频繁触发影响性能，如 resize、scroll、mousedown、mousemove、keyup、keydown、input 等。

为了解决这个问题，可以用防抖和节流：
- 防抖: 回调函数在事件触发 n 秒后执行，如果期间再次触发，则以最新事件时间为准。
- 节流: 回调函数在事件触发的 n 秒内只执行一次。

### 1. 防抖

**注意**

- 函数的 this 指向
- 函数的参数(如 event)
- immediate: 有 timeout 就不执行，没有才执行
- 函数的返回值(immediate 时才有效)
- 取消防抖

[代码demo](./1.防抖)

### 2. 节流

节流的2种实现：
- 时间差比较: 立马执行，事件结束后不执行
- setTimeout: 延迟执行，事件结束后还会执行一次

实现步骤:
1. 实现时间差比较版本
2. 实现 setTimeout 版本
3. 结合 1、2 实现立马能执行，事件结束后还会执行一次的版本
4. 增加参数 leading tailing，实现可控制立马执行或结束后还执行。
    - 注意 leading, tailing 不能同时为 false，否则回调不会被执行。

[代码demo](./2.节流)

## 数组去重

数组去重方法：

1. 暴力法(兼容性好): 新建一个空数组 res，遍历数组 arr，循环判断 res 中是否有相同的新元素，有则放入，没有则继续。
    - 注意内层循环新数组，如果新数组没有该值，则最后 j === res.length
    - indexOf 或 includes 可以简化内层循环
    - filter 简化外层循环
    - 排序后去重，只要相邻元素不等，即可放入新数组中，效率比 indexOf 高
    - 新需求，给 unique 增加迭代函数 iteratee，来判断值是否相等    
2. 经典算法: 只插入最右边的，不管前面重复的 
3. 使用 object 的 key
    - key 在 object 中只保存为字符串了，所以无法判断 1， '1'
    - 使用 typeof + key 做判断，但是无法判断对象类型
    - 最后使用 typeof + JSON.stringify 解决上面问题
4. 使用 Map，它的 key 可以是任意类型，且不能重复，但是对象类型对被当作不同的 key    
5. 使用 Set， `[...new Set(arr)]`

```
JSON.stringify(NaN)  // null

// demo1
var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1  indexOf 底层是 === 所以找不到NaN
```

## 学习资料

- [冴羽的博客](https://github.com/mqyqingfeng/Blog)

