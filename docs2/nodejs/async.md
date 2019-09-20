---
title: "NodeJS 事件/异步"
sidebar_label: 事件/异步
---


## 事件/异步


事件/异步涉及到的知识：

- Promise
- Events (事件)
- Timers (定时器)
- 阻塞/异步
- 并行/并发

### Promise

> Promise 中 .then 的第二参数与 .catch 有什么区别?

要回答这个问题，当然没有掌握Promise原理更靠谱的了。自己去学着写一个符合promieA+规范的Promise吧。

### Events (事件)

> Eventemitter 的 emit 是同步还是异步?

emit是同步的，on的时候将函数放在队列中，emit的时候逐个同步执行。自己手动实现一个Events。


### Timers (定时器)

> 说一下node的事件循环机制?

> nextTick, setTimeout 以及 setImmediate 三者有什么区别?

### 阻塞/异步

> 有这样一个场景, 你在线上使用 koa 搭建了一个网站, 这个网站项目中有一个你同事写的接口 A, 而 A 接口中在特殊情况下会变成死循环. 那么首先问题是, 如果触发了这个死循环, 会对网站造成什么影响?

因为js代码执行是单线程的，所以死循环会导致网站无响应。

> 如何判断接口是否异步? 是否只要有回调函数就是异步?

回调函数并不是异步，而是同步执行的。异步需要通过setTimeout之类的API来执行。

> 如何实现一个 sleep 函数?

这个就记下来了手写一遍。

```js
function sleep(delay){
    const now = Date.now()
    while(Date.now() > now + delay*1000){}
}
```

> 如何实现一个异步的 reduce? (注:不是异步完了之后同步 reduce)

### 并行/并发

> 说一下什么是并行和并发。
