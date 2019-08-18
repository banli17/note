---
title: "javascript 高级技巧"
sidebar_label: 高级技巧
---



## 防抖 debounce

`scroll`、`resize`、`mousemove`这些

在给一些频繁触发的事件绑定处理函数时，如果函数处理时间较长，触发频率太高，可能会导致页面卡顿或其它问题。比如窗口`scroll`或`resize`，鼠标`mousemove`，或用户输入关键字搜索时，如果每修改一下，我们都发 ajax 请求到后端，会给后端造成压力。所以通常需要限制事件的触发频率。

一般有两种方案：`防抖(debounce)`和`节流(throttle)`。

防抖的原理是：事件触发之后的n秒后才执行回调，如果事件发生后n秒内又触发了事件，则以后触发的事件为准，再过n秒后触发回调。

编写 debounce 函数需要注意：

- func 的 this 指向，args 参数的传递。
- func 函数可能有返回值。setTimeout 如果需要返回值，可以使用 Promise。

```js
function debounce(func, wait, immediate) {
    let timeout, result
    let debounced = function (...args) {
        let context = this
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 立即执行
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) result = func.call(context, ...args)
        } else {
            timeout = setTimeout(() => {
                func.call(context, ...args)
            }, wait)
        }
        return result
    }

    debounced.cancel = function () {
        clearTimeout(timeout)
        timeout = null
    }
    return debounced
}

// 使用
var print = debounce(function (e) {
    console.log(1, e)
}, 1000)
document.addEventListener('mousemove', print, false)
btn.addEventListener('click', print.cancel, false)
``` 

使用 `debounce()` 包装后，默认 func 会在 wait 时间后触发一次。如果 `immediate` 为 `true`，则 func 会立即触发，并在 wait 时间内不再重复触发。`cancel()` 方法会取消上一次 func 的执行和延迟。


## 节流

节流是指，如果事件持续触发，在一定时间内，事件函数只执行一次。

这可以使用时间戳或定时器来实现。

### 时间戳

事件触发时，如果与上次执行时间之差大于了设置时间，就触发，否则就不触发。

```js
function throttle(func, wait) {
    let previous = 0

    return function (...args) {
        let now = +new Date()  // 相当于 Number(new Date())，获取当前时间戳
        if (now - previous <= wait) return

        func.apply(this, args)
        previous = now
    }
}

// 使用
var print = throttle(function () {
    console.log(1)
}, 3000, true)
document.addEventListener('mousemove', print, false
```

### 定时器

```js
function throttle(func, wait) {
    let timeout

    return function (...args) {
        if (timeout) return
        timeout = setTimeout(() => {
            func.apply(this, args)
            timeout = null
        }, wait)
    }
}
```

上面代码中，首先会在定时器后执行 func，定时器期间，如果再次触发事件，会直接 return。定时器完成后，清除 timeout，使得事件触发时 func 能再次执行。

时间戳和定时器实现的区别：
- 使用时间戳实现，事件函数会立即触发。
- 使用定时器实现，事件函数会延迟 wait 时间后触发。


### 优化

那么是否可以实现下面几个需求呢？
- 事件开始时立即触发，事件结束时，延迟 wait 后再触发。
- 事件开始时延迟触发，事件结束时，立即触发。

这时，就需要将上面两种方法结合起来。我们使用`leading`表示开始时是否立即执行，`trailing`表示结束时是否还执行。

```js

```

## 参考文章

- [JavaScript专题之跟着underscore学防抖](https://github.com/mqyqingfeng/Blog/issues/22)
- [JavaScript专题之跟着underscore学节流](https://github.com/mqyqingfeng/Blog/issues/26)
- [什么是防抖和节流？有什么区别？如何实现？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/5)