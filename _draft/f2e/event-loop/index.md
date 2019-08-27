---
title: "浏览器和 node 的事件循环机制"
date: 2017-12-18 19:08:32
toc: true
tags:
---

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