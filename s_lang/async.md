---
title: "async和await"
date: 2016-11-23 10:48:42
tags:
---

https://developers.google.com/web/fundamentals/primers/async-functions

async+await 相当于 generator+co。

如 generator + co。

```javascript
// generator + co
function* read(){
    let a = yield fs.readFile('1.txt','utf8')
    return a
}
co(read).then()

// async + await
async function read(){
    let a = await fs.readFile('1.txt','utf8')
    return a
}
read()
```

1. 使用 co，generator 里的 yield 类型有限制，只能是对象，数组，函数，Promise等。
2. await 后面可以是Promise，也可以是其它类型的值。
3. async 返回一个 Promise。
4. 捕获错误的方式可以直接在 async 函数内部使用 try...catch，或者使用 then 的第二个参数 onRejected 函数。

```javascript
async function read() {
    try{
        let a = await 1
        console.log(a)  // 1
        return a
    }catch(e){

    }
}
// console.log(read())  // Promise { <pending> 

read().then(function (data) {
    console.log('data', data)  // 1
}, function(err){
    console.log(err)
})
```


- [JavaScript 异步编程学习笔记](https://github.com/riskers/blog/issues/22)
- [Promises/A+规范](https://promisesaplus.com/)
- [Promise/A+规范中文版](https://segmentfault.com/a/1190000002452115)
- [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559)

https://www.zhihu.com/question/57071244
2.异步发展过程：callback、promise、generator、co、async/await等异步流程控制(async和await的实现原理)
   3.promise设计模式原理及在es6中的应用，手写一个符合promise A+规范的promise实现


   # 异步编程

## 学习资料

- [并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [Philip Roberts: What the heck is the event loop anyway?](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
- [tasks-microtasks-queues-and-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [从Promise来看JavaScript中的Event Loop、Tasks和Microtasks](https://github.com/creeperyang/blog/issues/21)
- [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)

看完上面几篇文章，相信对`Event Loop`应该是理解了。

## 事件循环机制简介

## 几个概念

- 栈
- Tasks
- Microtasks


- 宏任务：setTimeout，setImmediate，MutationObsever，MessageChannel。
- 微任务：Promise.then()

浏览器事件循环：
1. 先执行栈代码。
2. 执行微任务，会把微任务清空。
3. 执行宏任务，取出一个执行完，再执行微任务。不停的循环。

```javascript
setTimeout(function () {
    console.log('1')
    Promise.resolve().then(function () {
        console.log('micro 1')
    })
}, 0)

Promise.resolve().then(function () {
    console.log('micro 2')
    setTimeout(function () {
        console.log('2')
    }, 0)
})

setTimeout(function () {
    console.log('3')
}, 0)

// micro2 1 micro1 3 2
```

## 关于setTimeout

setTimeout 0延迟，实际默认有延迟。至少运行时 (runtime) 处理请求所需的最小时间。

## 2个例子说明事件循环



## 学习资料

- [es6入门之Promise](http://es6.ruanyifeng.com/#docs/promise)
- [MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [JavaScript Promise：简介](https://developers.google.com/web/fundamentals/primers/promises)


# js异步编程


## Promise实现

jquery -> $.Deferred

```
// html代码
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
<script>
    var dtd = $.Deferred(); // 新建一个deferred对象
    setTimeout(() => {
        console.log(1)
    })

    var wait = function (dtd) {

        console.log(2)
        for (let i = 0; i < 10000; i++) {
            i == 9999 && dtd.resolve()
        }
        console.log(3)
        return dtd;

    };

    $.when(wait(dtd))
        .then(() => {
            console.log(4)
        })

    console.log(5)
</script>

// 结果：2 3 5 1 4
```

### Promise规范

`Promise/A+规范`定义了相关的规范。它规定：


## 参考资料

- [JavaScript 异步编程学习笔记](https://github.com/riskers/blog/issues/22)
- [Promises/A+规范](https://promisesaplus.com/)
- [Promise/A+规范中文版](https://segmentfault.com/a/1190000002452115)
- [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559)
- [理解 js 事件循环二 (macrotask 和 microtask)](https://juejin.im/entry/58332d560ce46300610e4bad)
- [Promise then中回调为什么是异步执行？](https://www.zhihu.com/question/57071244)
2.异步发展过程：callback、promise、generator、co、async/await等异步流程控制(async和await的实现原理)
   3.promise设计模式原理及在es6中的应用，手写一个符合promise A+规范的promise实现
- [自己动手实现 ES6 Promise](https://github.com/whinc/blog/issues/2)