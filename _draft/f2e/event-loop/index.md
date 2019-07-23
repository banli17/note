---
title: "浏览器和 node 的事件循环机制"
date: 2017-12-18 19:08:32
toc: true
tags:
---

## 参考资料

- [从Chrome源码看事件循环](https://zhuanlan.zhihu.com/p/48522249)
- [并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [Philip Roberts: What the heck is the event loop anyway?](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
- [tasks-microtasks-queues-and-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [从Promise来看JavaScript中的Event Loop、Tasks和Microtasks](https://github.com/creeperyang/blog/issues/21)
- [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](http://www.dailichun.com/2018/01/21/js_singlethread_eventloop.html)
- [JavaScript 异步、栈、事件循环、任务队列](https://segmentfault.com/a/1190000011198232)
- [微任务、宏任务与Event-Loop](https://www.cnblogs.com/jiasm/p/9482443.html)
- [Vue 中如何使用 MutationObserver 做批量处理？](https://www.zhihu.com/question/55364497/answer/144215284)

## 简介

- [什么是事件环]
- 进程: 计算机分配任务，调度任务的最小单位
- 线程: 进程里包含线程
- 一个进程里只有一个主线程，主线程是单线程
- 队列和栈的区别: 队列先进先出，栈先进后出

js任务是在栈里面执行。先把后面的取出来执行销毁。

为啥要用microtask? 根据 HTML Standrad， 在每个task运行完以后，UI都会重新渲染，那么在microtask中就完成数据更新，因此当前task 结束就可以得到最新的UI了。反之：如果新建一个task来做数据更新的话，那么渲染会执行两次。知乎如下回答（https://www.zhihu.com/question/55364497/answer/144215284）

## 浏览器事件环

在js中的任务分为主任务和异步任务。异步任务是多线程的，它是一个队列，分为宏任务和微任务。

其中宏任务和微任务分别有：

- 宏任务 macro-task(task)：Event、setTimeout、setInterval、setImmediate(ie)、I/O、UI rendering、MessageChannel。
- 微任务 micro-task(jobs)：process.nextTick、Promise、MutationObserver、Object.observer(已废弃)。


![](./eventloop/1.png)

浏览器中js的执行过程是:
1. 首先执行完主栈任务，主栈是用来执行代码的。
2. 清空微任务队列，将任务放到主栈执行。
3. 取出一个宏任务执行，执行完成后，执行第2步
4. 重复第3步

来看下面的代码：

```javascript
function a(){
    console.log(a)
}
setTimeout(()=>{ console.log('setTimeout' )})
Promise.resolve().then(()=>{ console.log('promise then')})
a()
```

上面的代码中，`a()`就是主任务，`setTimeout()`属于宏任务，`Promise then`属于微任务。所以上面的代码是首先执行`a()`，再执行`Promise then`，最后执行`setTimeout`。


## nextTick的实现

ie支持`setImmediate`，这是个宏任务，比`setTimeout(fn,0)`要慢。

**MessageChannel()**

消息管道，是一个宏任务。之前用这个实现后来废弃，兼容性问题。

```javascript
let channel = new MessageChannel()
let port1 = channel.port1
let port2 = channel.port2
port2.onMessage = function(e){
    console.log(e.data)
}
port1.postMessage('hello')  // 发消息是异步的
console.log(1)
```

之前vue里是用的`MutationObserver`，这是一个微任务。

**MutationObserver**


## node事件环

- `timers`: 这个阶段执行setTimeout()和setInterval()的回调函数。
- `pending callbacks`: 将I/O回调推迟到下一个循环执行。
- `idle, prepare`: 内部使用。
- `poll`: 获取新的I/O事件；执行I/O相关回调函数(几乎都是close callback的异常，timers和setImmediate()的回调函数)，适当的时候node会在这阻塞。
- `check`: 执行setImmediate()函数的回调。
- `close callbacks`: 一些关闭的回调，如`socket.on('close', ...)`

### timers

timers虽然指定了延迟执行的时间，但是可能会被操作系统调度或其它正在执行的回调推迟执行。

技术上讲：poll阶段控制着timer什么时候执行。

https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#timers

## Node简介

Node是异步非阻塞IO。web服务器的瓶颈在于高并发。

java是多线程的，当多个请求来了之后，它会开多个线程来处理。比如一次开10个，处理的过程并不是同时的，而是切换上下文(处理下线程1，再处理线程2，再切到1..)执行的，这个是浪费时间。占用比较多的内存，而且有锁的问题。

Node是单线程的，它不适合cpu密集，适合i/o密集。它的底层读写文件等也是C写的，不用担心性能。

![](./imgs/1-2.png)

为什么js是单线程的。浏览器里可以用`web worker`来开辟线程来专门进行CPU密集的处理，里面不能进行DOM操作。用的并不多。

```javascript
let w = new Worker('./1.js')
w.postMessage(10000)
w.onmessage = (e)=>{ console.log(e.data) }

// 1.js
onmessage = (e) => {
    let sum = 0
    for(let i =0;i<e.data;i++){
        sum += i
    }
    postMessage(sum)
}
```

同步和异步: 针对的是被调用方，比如调用一个方法，要看这个方法是否支持异步。
阻塞和非阻塞: 针对的是调用方。

同步阻塞：
异步阻塞：一般不会使用。
同步非阻塞：少见
异步非阻塞：



## Node场景

- 聊天服务器
- 电子商务网站