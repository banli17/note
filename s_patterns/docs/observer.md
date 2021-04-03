---
title: "发布订阅模式"
---

### 观察者模式

-   [设计模式（三）：观察者模式与发布/订阅模式区别](http://www.cnblogs.com/lovesong/p/5272752.html)
-   [观察者模式和发布订阅模式有什么不同？](https://www.zhihu.com/question/23486749)

有些人经常将发布订阅模式和观察者模式弄混淆，实际它们是有区别的，下面来详细介绍。

## 发布订阅模式

### 简介

发布订阅模式是一种消息范式，消息发布者和订阅者是解耦无关的，它们之间通过消息中心来管理。消息可以分为多个类别，不关注订阅者。订阅者可以订阅一个或多个类别感兴趣的消息，也不关心发布者。(它实际是去除了发布者和订阅者，只关注消息的发布和订阅)。

### 实现

```javascript
function Event() {
    this.callbacks = [];
}

Event.prototype.on = function(fn) {
    this.callbacks.push(fn);
};

Event.prototype.emit = function() {
    var _this = this;
    var _args = arguments;
    this.callbacks.forEach(function(callback) {
        callback.apply(_this, _args);
    });
};

var e = new Event();
e.on(function(a) {
    console.log(1, a);
});
e.on(function(a, b) {
    console.log(2, a, b);
});
e.emit("hi", "xx");
```

## 观察者模式

观察者模式是软件设计模式的一种，是一个目标对象管理所有依于它的观察者对象，并且在它本身的状态改变时主动发出通知。目标被观察者观察，目标变化时观察者执行某些操作。它们是紧耦合的。

**被观察者 Subject 实例的方法**

-   `attach(observer)`: 让观察者绑定被观察者
-   `notifyAllObserver()`: 状态变化时，通知观察者(即调用观察者的 update()方法)

**观察者 Observer 实例的方法**

-   `update()`: 目标变化时，观察者执行的操作

注意被观察者和观察者时紧耦合的

实现

```javascript
// 目标
class Subject {
    constructor() {
        this.state = 0;
        this.observers = [];
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
        this.notifyAllObserver();
    }

    notifyAllObserver() {
        this.observers.forEach(observe => {
            observe.update();
        });
    }

    attach(observer) {
        this.observers.push(observer);
    }
}

// 观察者
class Observer {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
        this.subject.attach(this); // 目标绑定观察者
    }

    update() {
        console.log(
            `my name is ${
                this.name
            },subject state is ${this.subject.getState()}`
        );
    }
}

const s = new Subject();
const o1 = new Observer("o1", s);
const o2 = new Observer("o2", s);

s.setState(1);
s.setState(2);
```

当目标变化时，即调用`s.setState()`时，观察者会收到消息。

发布订阅模式和观察者模式的区别

发布订阅模式是最常用的一种观察者模式的实现。观察者模式是耦合的，它强调目标和观察者，当目标变化通知观察者。但是大多数场景中我们并不关心目标和观察者，而是只关心目标的变化。所以发布订阅模式只通过消息中心来调度，它去除了发布者和订阅者(解耦)，只管消息的订阅和发布。

优缺点也很明显，紧密耦合的方式简单直接，扩展性差，而且要求两端同时存在。松散耦合不直接产生依赖，更容易扩展，想在哪里用就在哪里用。

![](./imgs/observer.png)

应用场景

-   网页事件绑定：点击按钮的时候触发绑定的事件
-   Promise

```javascript
result
    .then(() => {
        // then这里是绑定，等到promise pending状态变化时触发
    })
    .then();
```

-   jQuery callbacks

```javascript
var callbacks = $.Callbacks();
callbacks.add(function(info) {
    console.log(info);
}); // fire
callbacks.fire("fire");
```

-   自定义事件

```javascript
const EventEmitter = require("events").EventEmitter;
const emitter = new EventEmitter();
emitter.on("end", function() {
    console.log("hi");
});
emitter.emit("end");

// 2
class Person extends EventEmitter {}
let p = new Person();
p.on("talk", () => {});
p.emit("talk");

// 3、坏处是可能不是一行一行的读
var fs = require("fs");
var readStream = fs.createReadStream("./1.txt");
var length = 0;
readStream.on("data", function(chunk) {
    length += chunk.toString().length;
});
readStream.on("end", function() {
    console.log(length);
});

// 4、一行行的读，利用readline
var readline = require("readline");
```

-   nodejs 中：处理 http 请求，多进程通讯
-   vue 和 react 组件生命周期触发
-   vue watch
