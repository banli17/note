---
title: "javascript 异步编程"
sidebar_label: 异步编程
---


## 概念

### 并发和并行

![Erlang 之父 Joe Armstrong画的并发和并行图片](/img/js/async-1.jpg)

上图可以看到，并发(concurrency)同时来了多个任务；并行(parallelism)是多个任务同时在处理。

## 异步发展

javascript 异步的发展大致经历了下面几个过程：

1. 回调函数
2. Generator + co 方式模拟(Generator 并非异步)
3. Promise
4. async + await 

## 回调函数

回调函数就是一个通过函数指针调用的函数。回调函数有个缺点，就是很容易多层嵌套，也叫做回调地狱。

```js
fn0(0, function(){
    fn1(1, function(){
        fn2(2, function(){
        })
    })
})
```

上面这样的代码很不容易阅读和维护。它的主要问题是：

1. 嵌套函数存在耦合性，修改会影响其它的。
2. 错误不好处理。

## 生成器 Generator

### 简介

Generator 是 ES6 的概念，叫做生成器，它会生成一个迭代器。迭代器有一个`next()`方法，每次调用会返回`value`和`done`，分别是迭代的值和迭代是否完成。

生成器的用法如下：

```js
function* g(){ 
    let a = yield 1
    console.log(a)
    let b = yield 2
    console.log(b)
    return 3
}
let it = g()
it.next('x')
// { value: 1, done: false }
it.next('y') 
// y
// { value: 2, done: false }
it.next('z') 
// z
// { value: 3, done: true }
```

生成器其实就是一个特殊的函数，使用语法`function*`定义。它的内部可以使用`yield`关键字来暂停执行。generator 的执行是蛇形执行。执行过程如下：

1. 执行`it.next('h')`，函数会执行到`yield 1`后暂停。
2. 执行`it.next('i')`，函数会给 a 赋值，并执行到`yield 2`后暂停。
3. 执行`it.next('!')`，函数会给 b 赋值，并执行到最后。

关于返回值，需要注意：

- `next()`传递的参数是 yeild 语句的返回值，所以第一次调用next传递参数没有意义，因为没有变量接收。
- `next()`执行时返回的 value 值，是 yield 语句或 return 产出的值。

再来看看下面这个例子。

```js
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

上面代码执行步骤如下：

1. `it.next()`执行到`yield (5 + 1)`，相当于`yield 6`，所以输出`{value: 6}`。
2. `it.next(12)`，传入的参数 12 会作为第一个 yeild 的返回值，所以 y = 2 * 12 ，即 24。`yield y/3`就是`yield 8`。
3. `it.next(13)`，13 会传给 z，所以最后结果为 5 + 24 + 13 = 42。 


> 为什么`[...{name:'zs', age: 12}]`会报错？

因为解构或 for...of 会执行对象的`[Symbol.interator]`方法。普通对象 Object 不支持`for...of`，我们可以新增这个方法实现迭代。

```js
let o = {
    name: 'zs',
    age: 12,
    [Symbol.iterator]: function () {
        let index = 0, 
            keys = Object.keys(this);
        return {
            next: function () {
                return {
                    done: keys.length == index,
                    value: this[keys[index++]]
                }
            }
        }
    },
    // 使用 generator
    // [Symbol.iterator]: function* () {
    //     let index = 0, 
    //     keys = Object.keys(this);
    //     while(index !== keys.length){
    //         yield this[keys[index++]]
    //     }
    // }
}

for (let i of o) {
    console.log(i)  // 'zs', 12
}

[...o]  // ['zs', 12]
```

### co库原理

Generator 一般会配合 [co库](https://github.com/tj/co) 使用。

```javascript
// co 返回一个promise，并且会将迭代器的最终执行结果传递
let fs = require('fs')
let path = require('path')
let co = require('co')

function readFile(filepath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path.join(__dirname, filepath), 'utf8', function (err, data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

function* read() {
    let a = yield readFile('name.txt', 'utf8')
    let b = yield readFile(a, 'utf8')
    return b
}

// 使用co库
co(read).then(function (data) {
    console.log(data)
})

// 相当于是
let it = read()
let { value } = it.next()
value.then(function (data) {
    let { value } = it.next(data)
    value.then(function (data) {
        let { value } = it.next(data)
        console.log(value)
    })
})
```

可以看到 co 库会不断的解析`read()`，获得最终的返回值。

co的实现原理:

```javascript
function* read() {
    let a = yield readFile('name.txt', 'utf8')
    let b = yield readFile(a, 'utf8')
    return b
}

// co返回一个promise
function co(param) {
    return new Promise(function (resolve, reject) {
        let it = typeof param === 'function' ? param() : param
        function step(data) {
            try {
                let { value, done } = it.next(data)
            } catch (e) {
                return reject(e)
            }
            if (done) {
                resolve(value)
            } else {
                // value可能不是promise
                Promise.resolve(value).then(function (data) {
                    step(data)
                }, reject)
            }
        }
        step(param)
    })
}
```



## Promise

### 简介

Promise 是一个类，它的特点如下：

1. Promise 初始状态是`pending`，通过 resolve() 或 reject() 可以将状态修改为`fulfilled(成功)`或`rejected(失败)`。如果状态是`pending`，回调函数永远不会被调用。而且状态一旦改变，就不能再改变。
2. Promise 无法中途取消，一旦新建它将立即执行。
3. Promise 状态是保存的，可以后续再添加回调函数。事件是错过后再监听，是监听不到的。

下面几个方法是非常常用的。

- Promise.all()
- Promise.resolve()
- Promise.reject()
- Promise.race()
- Promise.prototype.then()
- Promise.prototype.finally()
- Promise.prototype.catch()

**Promise和事件**

- Promise 只关心对结果做出反应，不关心过程。
- 事件有可能之前发生了，然后没有捕获到，比如图片加载时添加`img.onload`。
- 多个异步事件的处理，事件会很复杂。

```
<img src='1.png' />

<script src='big.js'>
<script>
img.onload = () => {}  // 这里可能不会执行 onload 事件
</script>
```

```javascript
new Promise((resolve, reject)=>{
    if(ok){
        resolve('ok')
    }else{
        reject('error')
    }
}).then(resolveCallback, rejectCallback)

function resolveCallback(data){
    // 这里调用的时候data就是ok
}

function rejectCallback(data){
    // 这里调用的时候data就是error
}
```

Promise 新建时就立即执行，就像执行一个函数一样，是同步的。

```javascript
new Promise((resolve, reject)=>{
    resolve('ok')
    console.log('promise')
})
console.log('hello')

// 结果 promise -> hello
```

上面代码也显示出，resolve() 和 reject() 不会阻止函数后续代码的执行。

Promise 的 then 方法，属于 micro-task 类型的异步任务。会在同步任务执行完成后，再执行。

下面是一个用 Promise 实现的图片下载的例子。

```javascript
var img = new Image()
img.src = 'http://xx.com/1.png'
img.onload = ()=>{
    resolve(img)
}
img.onerror = ()=>{
    reject('img download error')
}
```

### Promise.prototype.then()

then 方法返回的是一个新的 Promise 对象，不是之前那个 Promise 对象。

如果前一个 then 方法返回 Promise，则后面的 then 方法会等待 Promise 状态变化后调用。如果返回的是值，则后面的 then 方法的参数就是这个返回值。

```javascript
// then返回值
new Promise((resolve, reject) => {
    resolve('hello')
}).then((res) => {
    console.log(res)  // 'hello'
    return 'res'
}).then((res1) => {
    console.log(res1)  // res
})

// then返回Promise
new Promise((resolve, reject) => {
    resolve('hello')
}).then((res) => {
    console.log(res)  // 'hello'
    return new Promise((resolve,reject)=>{
        resolve('xx')
    }) 
}).then((res1) => {
    console.log(res1)  // xx
})
```

### Promise.prototype.catch()

catch 方法是`.then(null, rejection)`的别名，用于捕获 Promise 内部的错误。

如果 Promise 里有错误或reject()，并且没有使用 then() 的 reject 回调方法，catch则会执行。如果 then 有 reject 回调则会拦截到异常，catch 将不会执行。(错误实际会使状态变为 rejected)

```javascript
Promise((resolve,reject)=>{
    reject('error')
}).then(()=>{}, ()=>{
    console.log('reject error')  // 会执行
}).catch(()=>{
    console.log('catch')         // 不执行
})
```

建议用 catch 来捕获异常，不要使用 then() 的 rejection。

在 resolve() 后抛出的异常不会被捕获。因为 Promise 状态已经改变，不会再发生变化了。

```javascript
new Promise((resolve, reject)=>{
    resolve()
    throw new Error('test')
}).catch(()=>{
    // 不会执行
})
```

下面三段代码是等效的。

```javascript
const promise = new Promise(function(resolve, reject) {
  throw new Error('test');
});
promise.catch(function(error) {
  console.log(error);
});
// Error: test

// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

Node 里的 unhandledRejection 事件，用于捕获没有捕获的 reject 错误。

```javascript
process.on('unhandledRejection', (err, p)=>{})
```

下面这个例子。

```javascript
const promise = new Promise(function (resolve, reject) {
  resolve('ok');
  setTimeout(function () { throw new Error('test') }, 0)
});
promise.then(function (value) { console.log(value) });
// ok
// Uncaught Error: test
```

setTimeout 时，Promise 已经执行完成了。所以错误会抛出到外层，成为未捕获的错误。


### Promise.prototype.finally()

finally 方法指定 Promise 对象最后的执行操作。不管状态是 fulfilled 还是 rejected。它不接受参数。

```javascript
promise.finally(()=>{})

// 等同于
promise.then(()=>{},()=>{})
```

finally 的实现是：

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

### Promise.all()

```javascript
const p = Promise.all([task1, task2, task3])
```
task1, task2, task3 都是 Promise 对象。

当所有的 Promise 对象都是 fulfilled 时，p 才是 fulfilled。否则就是 rejected。

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));  // 不会执行
// ["hello", Error: 报错了]
```

上面的代码，p1 和 p2 都是 resolved (p2 在执行完 catch 后)。如果 p2 没有 catch，则 all 里面的 catch 会执行。

### Promise.race()

根据最快的一个决定状态。

```js
const p = Promise.race([task1, task2, task2])
```

### Promise.resolve()

Promise.resolve() 可以将一个对象转成 Promise 对象。

```js
Promise.resolve('foo')

// 等价于
new Promise(resolve => resolve('foo'))
```

Promise.resolve() 的参数分为3种情况。

1、参数是 Promise 实例。会原封不动返回。
2、 thenable 对象，也就是具有 then 方法的对象。

```js
let thenable = {
    then(resolve, reject){
        resolve(1)
    }
}

let p1 = Promise.resolve(thenable)
p1.then((val)=>{
    console.log(val)  // 1
})
```
Promise.resolve() 会将它转成 Promise 对象，并立即执行 then 方法。

3、一般参数或不带参数

```javascript
const p = Promise.resolve('hello')
p.then((res)=>{
    console.log(res) // 'hello'
})
```

### Promise.reject()

```javascript
Promise.reject()  // 报错了
```

所以需要 catch 捕获。

```javascript
var p = Promise.reject()
p.catch(e=>{})
```

如果传入一个 thenable，后续 then 方法的参数是这个 thenable 对象。

```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```



> Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？

### 实现符合PromiseA+规范的Promise

## async + await

> 面试题：async 及 await 的特点，它们的优点和缺点分别是什么？await 原理是什么？

`async`函数会返回一个`Promise`。如果返回值不是Promise，就使用`Promise.resolve()`包裹了一下。如果是Promise，就执行。

```js
async function a(){
    return 1
}
a()  // Promise {<resolved>: 1}
```

async 和 await 可以说是异步终极解决方案，它相当于将代码改造成了同步代码。可以使用`try...catch`捕获异常。

```js
let a = 0
let b = async () => {
    console.log(0)
    a = a + await 10
    console.log(2, a) 
}
b()
a++
console.log(1, a) 
// 结果
// 0
// 1 1
// 2 10
```

上面代码可以看出，async 函数是同步执行的，但是 await 是异步的。

- 首先执行`b()`，输出`0`。
- 然后 b 函数保存了`a = 0`（await 内部通过 generator 实现，generator 会保留堆栈中的内容），遇到异步的`await 10`时，会先去执行后面的同步代码`a++`，输出`1 1`。
- 最后再执行`await`，输出`2, 10`。

await 内部实现了 generator，它是 generator 和 Promise 的语法糖，内部会自动执行 generator。

## 定时器

### setTimeout

setTimeout 的语法如下：

```js
setTimeout(code, milliseconds, param1, param2, ...)
setTimeout(function, milliseconds, param1, param2, ...)
```

setTimeout 要注意的几点：

1. 从第三个参数开始，表示传给执行函数的参数(ie9及之前版本不支持)
1. 因为 javascript 是单线程的，所以 setTimeout 的时间并不准确，具体可以看浏览器事件环。
1. `setTimeout()`的返回值表示定时器的编号，可以传递给`clearTimeout()`取消定时器，浏览器中返回一个数字，NodeJs 中返回一个 Timeout 对象。`setTimeout()`和`setInterval()`公用一个编号池。

我们可以结合 Promise 封装一个 sleep 方法。

```js
function sleep(time){
    return new Promise(resolve=>{
        setTimeout(resolve, time * 1000)
    })
}
```

### setInterval

```js
let intervalID = window.setInterval(func, delay[, param1, param2, ...]);
```

### 循环间隔 60Hz

动画循环的关键是循环间隔的时常。循环间隔要足够长，以保证浏览器有能力渲染产生的变化。另外循环间隔要足够短，以保证动画的流畅性。显示器刷新频率为 60Hz，即相当于每秒屏幕会重绘 60 次，即循环间隔最好是 16.7ms(1000ms/60)。

### requestAnimationFrame

requestAnimationFrame 是专门为实现高性能的帧动画而设计的一个 API。requestAnimationFrame 跟屏幕刷新频率同步(大多数是 60Hz)。这里的关键区别在于可以让浏览器在下一个可用时机去绘制动画，而不是以预定间隔绘制动画。

可以使用`cancelAnimationFrame(timer)`取消任务。

为了保证兼容，可以使用下面的代码：

```js
// 判断是否有 requestAnimationFrame 方法，如果有则模拟实现
window.requestAnimFrame =
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.oRequestAnimationFrame ||
window.msRequestAnimationFrame ||
function(callback) {
    window.setTimeout(callback, 1000 / 30);
};
```

上面的代码，如果不兼容，则使用 setTimeout 模拟。

它的优点是：

1. 浏览器可以对其进行优化，所以动画更流畅 
2. 非活动选项卡中的动画会停止
3. 更省电

### 使用 requestAnimatinFrame 实现动画

```js
<html>
<head>
    <meta charset="UTF-8">
    <title>认识Canvas</title>
</head>
<body>
    <canvas id="canvas" width="500" height="500" style="border: 1px solid #333"></canvas>
    <script>
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        // 兼容定义 requestAnimFrame
        window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 30);
        };

        // 绘制的圆的对象
        var circle = {
            x: 250,
            y: 250,
            radius: 50,
            direction: 'right',
            // 移动圆形
            move: function() {
                if (this.direction === 'right') {
                    if (this.x <= 430) {
                         this.x += 5;
                    } else {
                        this.direction = 'left';
                    }
                } else {
                    if (this.x >= 60) {
                         this.x -= 5;
                    } else {
                        this.direction = 'right';
                    }
                }
            },
            draw: function() {
                // 绘制圆形
                context.beginPath();
                // 设置开始角度为0，结束角度为 2π 弧度
                context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
                context.fillStyle = '#00c09b';
                context.fill();
            }
        }
        // 动画执行函数
        function animate() {
            // 随机更新圆形位置
            circle.move();
            // 清除画布
            context.clearRect(0, 0, canvas.width, canvas.height);
            // 绘画圆
            circle.draw();
            // 使用requestAnimationFrame实现动画循环
            requestAnimationFrame(animate);
        }

        // 先画第一帧的圆，即初始化的圆
        circle.draw();
        // 执行animate
        animate();        
    </script>
</body>
</html>
```

## 参考资料

- [setTimeout、Promise、Async/Await 的区别](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/33)
- [Async/Await 如何通过同步的方式实现异步](https://juejin.im/post/5d2c814c6fb9a07ecd3d8e43)
- [Generator 函数的异步应用](http://es6.ruanyifeng.com/#docs/generator-async)
