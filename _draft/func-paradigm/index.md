---
title: 函数式编程
date: 2019-06-14 07:32:38
toc: true
---

## 函数柯里化

柯里化(curry) 是执行函数时只传递给它一部分参数，让它返回一个函数去处理其它剩余的参数。

柯里化的好处：减少文件代码，更像纯函数。

使用场景：
1. 参数复用，比如 addOne、addTen等
2. 方法延迟执行
3. 函数式编程

> 题目：实现 add(2, 5) add(2)(5)

```js
function add(...args) {
    if (args.length > 2) {
        return args.reduce((a, b) => a + b, 0)
    }
    return function (...args1) {
        return add(...args, ...args1)
    }
}
```

> 题目：实现 add(1,2) add(1)(2) add(1)(2)(3) add(1,2,3)(4)

```js
function add(...args1) {
    function fn(...args2) {
        return add(...args1, ...args2)
    }
    fn.valueOf = () => {
        return args1.reduce((a, b) => a + b, 0)
    }
    return fn
}
console.log(add(1, 2) == 3) // 3
console.log(add(1)(2) == 3) // 3
console.log(add(1)(2)(3) == 6) // 6
console.log(add(1, 2, 3)(4) == 10) // 10
```

调用 add() 返回的是一个函数 fn，它将参数全部又传给 add，当 console.log 时，会调用 fn.valueOf() ，于是得到结果。不过要注意的是返回值是一个字符串。



## 参考资料

- [js函数式编程指南](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch1.html)
- [重新介绍 JavaScript（JS 教程）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
- [js秘密花园](http://bonsaiden.github.io/JavaScript-Garden/zh/)
- [JavaScript Promise迷你书（中文版）](http://liubin.org/promises-book/)
- [理解OAuth 2.0](http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html)