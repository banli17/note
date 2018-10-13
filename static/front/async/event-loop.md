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


