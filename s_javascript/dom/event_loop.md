---
title: "浏览器和 node 的事件循环机制"
date: 2017-12-18 19:08:32
toc: true
tags:
---

## nextTick 的实现

ie 支持`setImmediate`，这是个宏任务，比`setTimeout(fn,0)`要慢。

**MessageChannel()**

消息管道，是一个宏任务。之前用这个实现后来废弃，兼容性问题。

```javascript
let channel = new MessageChannel();
let port1 = channel.port1;
let port2 = channel.port2;
port2.onMessage = function (e) {
  console.log(e.data);
};
port1.postMessage("hello"); // 发消息是异步的
console.log(1);
```

之前 vue 里是用的`MutationObserver`，这是一个微任务。

**MutationObserver**

## node 事件环

- `timers`: 这个阶段执行 setTimeout()和 setInterval()的回调函数。
- `pending callbacks`: 将 I/O 回调推迟到下一个循环执行。
- `idle, prepare`: 内部使用。
- `poll`: 获取新的 I/O 事件；执行 I/O 相关回调函数(几乎都是 close callback 的异常，timers 和 setImmediate()的回调函数)，适当的时候 node 会在这阻塞。
- `check`: 执行 setImmediate()函数的回调。
- `close callbacks`: 一些关闭的回调，如`socket.on('close', ...)`

### timers

timers 虽然指定了延迟执行的时间，但是可能会被操作系统调度或其它正在执行的回调推迟执行。

技术上讲：poll 阶段控制着 timer 什么时候执行。

https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#timers

## Node 简介

Node 是异步非阻塞 IO。web 服务器的瓶颈在于高并发。

java 是多线程的，当多个请求来了之后，它会开多个线程来处理。比如一次开 10 个，处理的过程并不是同时的，而是切换上下文(处理下线程 1，再处理线程 2，再切到 1..)执行的，这个是浪费时间。占用比较多的内存，而且有锁的问题。

Node 是单线程的，它不适合 cpu 密集，适合 i/o 密集。它的底层读写文件等也是 C 写的，不用担心性能。

![](./imgs/1-2.png)

为什么 js 是单线程的。浏览器里可以用`web worker`来开辟线程来专门进行 CPU 密集的处理，里面不能进行 DOM 操作。用的并不多。

```javascript
let w = new Worker("./1.js");
w.postMessage(10000);
w.onmessage = (e) => {
  console.log(e.data);
};

// 1.js
onmessage = (e) => {
  let sum = 0;
  for (let i = 0; i < e.data; i++) {
    sum += i;
  }
  postMessage(sum);
};
```

同步和异步: 针对的是被调用方，比如调用一个方法，要看这个方法是否支持异步。
阻塞和非阻塞: 针对的是调用方。

同步阻塞：
异步阻塞：一般不会使用。
同步非阻塞：少见
异步非阻塞：

## Node 场景

- 聊天服务器
- 电子商务网站

种子模块即核心模块，一般有下面几个模块组成：

## 学习资料

- [javascript 中的深拷贝和浅拷贝？](https://www.zhihu.com/question/23031215)
- [javaScript 中浅拷贝和深拷贝的实现](https://github.com/wengjq/Blog/issues/3)
- [mdn Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [属性的可枚举性和所有权](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)

## 对象扩展

对象扩展：也就是 jq 里的`$.extend()`方法。这个方法是经常用到的，比如写一些插件时，合并配置项。

```
$.extend(true, defaultOptions, userOptions)
```

它涉及到的知识点如下：

- `Object()`的作用
- 对象的深浅拷贝
- 需要学习`$.extend()`的用法和实现
- `Object.assign()`的实现
- 关于对象属性的枚举性

## Object()

`Object()`和`new Object()`一样，会创建一个对象包装器。如果参数是 null 或 undefined，它将返回一个空对象(和`new Object()`一样)。如果传递的是其它值，它会返回对应的对象。比如`new Object(2)`和`new Number(2)`一样，如下图。

![](./imgs/object-constructor.png)

如果传递的参数是一个函数，也会原样返回。

```javascript
var a = Object(function () {
  return 1;
});
a(); // 1
```

## 对象的浅拷贝

只需要拷贝属性即可。

```javascript
function copy(origin) {
  var target = {};
  for (var i in origin) {
    target[i] = origin[i];
  }
  return target;
}
```

## 对象的深拷贝

深拷贝的方法是：如果值是值类型，则直接赋值。如果是 object，则直接递归，如果是 array，则复制。注意如果是函数，可以不用管，因为函数没有什么影响。

```javascript
function deepCopy(origin) {
  var target = {};
  for (var i in origin) {
    if (
      typeof origin[i] !== "object" ||
      origin[i] == null ||
      typeof origin[i] === "function"
    ) {
      target[i] = origin[i];
      continue;
    }
    if (Object.prototype.toString.call(origin[i]) === "[object Array]") {
      target[i] = origin[i].slice();
      continue;
    }

    target[i] = deepCopy(origin[i]);
  }
  return target;
}
```

上面的代码针对数组，实际还需要特殊处理，因为数组里的项也可能是引用类型。

还有一种方法是通过 JSON 来进行拷贝。

```
function deepCopy(origin){
    try{
        return JSON.parse(JSON.stringify(origin))
    }catch(e){
        throw new Error('不支持拷贝')
    }
}
```

JSON 方法有 2 个问题：1、有些低版本浏览器不支持 JSON。2、函数也会复制一份

## Object.assign()

因为合并对象经常使用，所以 es6 直接提供了`Object.assign(target, ...sources)`方法。它能将多个对象的可枚举属性合并到目标对象，并返回目标对象。

```
// 例子1
var a = {name: 'zs'}
var b = {age: 2}
var c = {say: function(){}}

var d = Object.assign(a, b, c)
console.log(a)  // {name: "zs", age: 2, sex: "man"}

a.say === c.say   // true
d === a           // true
```

注意 Object.assign() 是浅拷贝，并且只会拷贝可枚举属性。如果要赋值属性定义，则需要`Object.getOwnPropertyDescriptor()`和`Object.defineProperty()`。
