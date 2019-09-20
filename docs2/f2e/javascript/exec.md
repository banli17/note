---
title: "JavaScript 执行机制"
sidebar_label:  执行机制
---

## 宏任务和微任务

### 简介

JavaScript 的执行过程是：

1. 宿主(浏览器或node)将 JS 代码交给 JS 引擎，让它执行。
2. JS 引擎执行时，遇到如 setTimeout 之类的浏览器 API，会通知浏览器执行定时任务。然后 JS 引擎继续执行代码。
3. 浏览器定时到了之后，再通知 JS 引擎，JS 引擎开始执行定时器中的函数。
4. ES6 引入了 Promise 后，JS 引擎会自己发起任务，不需要再让浏览器安排。

宿主发起的任务叫做宏任务，JS 引擎自己发起的任务叫做微任务(microtask)。


其中宏任务和微任务分别有：

- 宏任务 macro-task(task)：Event、setTimeout、setInterval、setImmediate(ie)、I/O、UI rendering、MessageChannel。
- 微任务 micro-task(jobs)：process.nextTick、Promise、MutationObserver、Object.observer(已废弃)。

### 为什么有微任务

其实宏任务对于我们开发就够了，为什么还要有微任务呢？

根据 HTML 标准，在每个宏任务运行完以后，UI 都会重新渲染，那么在微中就完成数据更新，因此当前宏任务结束就可以得到最新的 UI了。反之，如果新建一个宏任务来做数据更新的话，那么渲染会执行两次。查看[更多](https://www.zhihu.com/question/55364497/answer/144215284)。

那么宏任务和微任务有哪些呢？

### 执行过程

JS 引擎等待浏览器分配宏任务，在操作系统中，通常等待的行为都是一个事件循环。

底层的 C/C++ 代码简化如下：

```
while(TRUE){
    r = wait();
    execute(r);
}
```

整个循环就是反复等待-执行的过程。等待就是等宿主发起的宏任务。这里每次执行的过程，就是一个宏任务，可以这样理解：宏任务队列就是事件循环。

而微任务是在宏任务里面的，在宏任务中，JS 的 Promise 也会产生异步代码，JS 必须保证这些异步代码在一个宏任务中执行，所以每个宏任务中又包含一个微任务队列。如下图所示。

![](/img/js/eventloop-1.jpg)

接下来，来看一个例子理解:

```js
var r = new Promise(function(resolve, reject){
    console.log("a");
    resolve()
});
setTimeout(()=>console.log("d"), 0)
r.then(() => console.log("c"));
console.log("b")
```

上面代码，执行流程如下：

1. 浏览器将代码交给 JS 引擎，执行任务。这是一个宏任务。var r = new Promise() 会立即执行(注意 Promise 的 then 才是异步的)，打印输出 a。
2. 执行过程中，遇到 setTimeout，让浏览器去执行定时(即倒数秒)，定时到后，就是下一个宏任务。
3. 执行到 then，这是一个 Promise 微任务。放到微任务队列里。
4. 执行 console.log("b")，输出 b。
5. 执行宏任务里的微任务，即第 3 步的任务，打印出 c。
6. 执行下一个宏任务，即第 2 步的 setTimeout 任务，打印出 d。

最终结果为: a、b、c、d。画个图如下：

![](/img/js/eventloop-2.jpg)

## 执行上下文

JS 标准把一段代码，执行所需的所有信息定义为执行上下文。它包括：

- lexical environment: 词法环境，当获取变量或者 this 值时使用。
- variable environment: 变量环境，当声明变量时使用。
- code evaluation state: 用户恢复代码执行位置。
- Function: 执行任务是函数时使用，表示正在被执行的函数。
- ScriptOrModule: 执行任务是脚本或模块时使用，表示正在执行的代码。
- Realm: 使用的基础库和内置对象实例。
- Generator: 仅生成器上下文有这个属性，表示当前生成器。


## 闭包

闭包就是处于执行环境中的函数。它包含两部分：

- 环境部分
    - 环境：函数的词法环境(执行上下文的一部分)
    - 标识符列表：函数中用到的未声明的变量
- 表达式部分: 函数体

```
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1
```

> 面试题，循环中使用闭包解决 `var` 定义函数的问题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

上面代码中，setTimeout 的函数 timer 会在 for 循环执行完后再执行。这时 i 已经是 6 了。所以全部输出 6。

解决方法有：
1. 使用 let (推荐)
2. 使用闭包

```js
for (var i = 1; i <= 5; i++) {
    (function (i){
        setTimeout(function timer() {
            console.log(i)
        }, i * 1000)
    })(i);
}
```

3. 使用 setTimeout 的第三个参数，它会当作 timer 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(i) {
        console.log(i)
    }, i * 1000, i)
}
```


## 函数

### 函数种类

- 普通函数
- 箭头函数
- 方法，class 中定义的函数
- 生成器函数 function *
- 类，class 也是函数
- 异步函数：async + 普通函数/箭头函数/生成器函数

### this

this 是 JavaScript 的一个关键字，它的使用方法类似一个变量。

一句话总结 this：调用函数时使用的引用，决定了函数执行时的 this 值。

JavaScript 用一个栈来管理执行上下文，这个栈的每一项又包含一个链表，指向上层的执行上下文。

![](/img/js/exec-this.jpg)

JavaScript 标准中规定了，函数有个私有属性`[[Environment]]`，用来保存定义时上下文。

当函数运行时，会创建一条新的执行环境记录，记录的外层词法环境(outer lexical environment)会被设置为函数的`[[Environment]]`，这个动作就是切换上下文。

```js
var a = 1;
foo();

在别处定义了 foo：

var b = 2;
function foo(){
    console.log(b); // 2
    console.log(a); // error
}
```

函数执行时能访问定义时的上下文，但是不能访问执行时上下文。

JavaScript 标准定义了`[[thisMode]]`私有属性，它有三个取值：

- lexical: 表示上下文中找 this，这对应箭头函数。
- global: 表示当 this 为 undefined 时，取全局对象，这对应普通函数。
- strict: 表示严格模式下，this 严格按照调用时传入的值，可能时 null 或 undefined。对应严格模式和 class。

函数创建新的执行上下文的词法环境记录时，会根据`[[thisMode]]`来标记新记录的`[[ThisBindingStatus]]`私有属性，代码执行遇到 this 时，会逐层检查当前词法环境记录中的`[[ThisBindingStatus]]`，当找到有 this 的环境记录时获取 this 的值。

箭头函数执行时，它的`[[thisMode]]`是lexical，`[[ThisBindingStatus]]`标记为lexical。遇到 this 时，就会到上下文中找 this。


### 操作 this 的内置函数

call、apply 及 bind 可以用来修改 this 指向。它们用于箭头函数、class 也不会报错，只是无法修改 this，而只能传参。

下面来看看 call、apply 及 bind 函数内部实现。

```js
Function.prototype.call = Function.prototype.call || function (context) {
    if (typeof this !== 'function') {
        throw new TypeError(`Error`)
    }
    // 如果 context 是基本类型，需要是对象才能挂载 .fn 属性
    context = typeof context === 'object' ? context || window : Object.create(null)
    // 下面最好用 Symbol，因为如果原对象可能有fn属性，这样会被覆盖掉
    context.fn = this
    var args = [...arguments].slice(1)
    // 谁调用，this 就是谁
    var result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.apply = Function.prototype.apply || function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = typeof context === 'object' ? context || window : Object.create(null)
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.bind = Function.prototype.bind || function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    const args = [...arguments].slice(1)
    context = typeof context === 'object' ? context || window : Object.create(null)
    context.fn = this
    return function () {
        if (new.target) {
            return new context.fn(...args, ...arguments)
        }
        return context.fn(...args, ...arguments)
    }
}
```

要注意 myBind 返回一个函数，可以通过普通方式和 new 调用。

call 的性能要比 apply 好，具体可以看[call和apply的性能对比](https://github.com/noneven/__/issues/6)。

### 总结 this

this 指向总结：

1. new 调用，指向新创建的对象。
2. call、apply、bind 绑定到指定对象。
3. 上下文对象调用，绑定到上下文对象。
4. 默认，严格模式下绑定到 undefined，否则绑定到全局对象。
5. 箭头函数没有 this，会往上找。

## 语句执行

JavaScript 语句时，涉及到 Completion Record 类型，它标示着语句执行的完成状态。

Completion Record 表示一个语句执行完之后的结果，它有三个字段：

- `[[type]]`: 表示完成的类型，有 break、continue、return、throw、normal 几种类型。
- `[[value]]`: 表示语句的返回值，如果没有，则是 empty。
- `[[target]]`: 表示语句的目标，通常是一个 JavaScript 标签。

语句的分类

![](/img/js/exec-statement.jpg)

### 普通语句

普通语句执行完成后，会得到`[[type]]: normal`的 Completion Record。JS 引擎会继续执行下一条语句。

这些语句中，只有表达式语句会产生`[[value]]`，Chrome控制台显示的就是 Completion Record 的`[[value]]`。

![](/img/js/exec-completion-record.jpg)

上面显示，声明语句的 Completion Record 的`[[value]]`为 undefined，而表达式语句有值。

### 语句块

如果 Completion Record 的`[[type]]`不是 normal，会打断语句块中后续语句执行。

```
{
  console.log(1)
  return 
  console.log(2)  // 不执行
}
```

### 控制型语句

控制型语句分为：

- 对内造成影响：if switch while/for try
- 对外造成影响：break continue return throw

![](/img/js/exec-control.jpg)

上面穿透后，会向上找消费者。

所以 try...catch...finally 语句。try 里的 return 完成后，还是会走 finally，而且 finally 里的 return 能覆盖 try 里的 return。

```js
try{
  return 1
}
catch(e){}
finally{
  return 2   // 最终返回 2
}
```

### 带标签语句

任何语句前面都可以加标签`xx:`。主要作用是跳出多层循环。

```
outer: while(true) {
  inner: while(true) {
      break outer;
  }
}
console.log("finished")
```

break/continue 语句后面跟了关键字，会产生带 target 的 Completion Record。


## 参考资料

- 重学前端