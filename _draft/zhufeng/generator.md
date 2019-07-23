---
title: "Generator函数"
date: 2018-07-21 19:46:46
tags:
---

## 学习资料

- [Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)
- [es6入门之Generator 函数的语法](http://es6.ruanyifeng.com/#docs/generator)
- [es6入门之Generator 函数的异步应用](http://es6.ruanyifeng.com/#docs/generator-async)

## 简介

1. 为什么[...{0:1,1:2,2:3,length:3}]会报错？

因为解构或 for...of 会执行对象的`[Symbol.interator]`方法。

```javascript
let a = {
    0: 1, 1: 3, 2: 8, length: 3, [Symbol.iterator]: function () {
        let that = this
        let i = 0
        return {
            next: function () {
                return {
                    done: i === that.length,
                    value: that[i++] //迭代的时候不能随便返回值。
                }
            }
        }
    }
}

let b = [...a]
console.log(b)  // [1,3,8]
```

2. 使用

```javascript
let a = {
    0: 1, 1: 3, 2: 8, length: 3, [Symbol.iterator]: function* () {
        let index = 0
        while (index < this.length) {
            yield this[index++]
        }
    }
}

let b = [...a]
```

3. 返回值问题

generator的执行是蛇形执行。

- next()传递的参数是 yeild 语句返回的结果，所以第一次调用next传递参数没有意义，因为没有变量接受。
- next()执行的结果是 yield 语句或 return 产出的值。

4. co库

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

co(read).then(function (data) {
    console.log(data)
})

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







## generator简介

当函数调用时，js引擎会从上向下执行到底，无法中途停止。es6提供了一种函数，可以分步执行，它叫做generator(生成器)函数。

`generator函数`和普通函数的区别是多了一个`*`号。`*`号可以写在任意位置，但是最好写成`function*`。

```javascript
function* generator(){
    console.log(1)
    console.log(2)
}

// all right，but not do it
function * generator(){}
function *generator(){}
function*generator(){}
```

调用 generator 函数不会执行里面的代码，它会创建和返回一个迭代器。

```javascript
// 函数并没有执行
const g = generator()
```

打印 g 对象，如下图所示。

![](./imgs/generator.png)

可以看到，它返回的是一个 Generator 对象。可以看到 next() 方法，它的作用才是执行函数代码。

```javascript
g.next()  // 打印出1,2
```

## 与Iterator接口的关系

Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 Symbol.iterator 属性，从而使该对象具有 Iterator 接口。

```javascript
var myIterable = {}
myIterable[Symbol.iterator] = function* (){
    yield 1;
    yield 2;
    yield 3;
}

[...myIterable]  // [1, 2, 3]
```

Generator 函数执行后，返回一个遍历器对象，该对象也有 Symbol.iterator 属性，执行后返回自身。

```
function* gen(){
    // some code
}

var g = gen()

g[Symbol.iterator]() === g  // true
```

## yield

要暂停代码，需要使用`yield`关键字，它只能再生成器中使用，否则报错。

```javascript
function* generator() {
    console.log(1)
    yield '1 stop'
    console.log(2)
}

const g = generator()

// 值是 {value: '1 stop', done:false}
console.log(g.next())  // 打印1
// 值是 {value: undefined, done:false}
console.log(g.next())  // 打印2
// 值是 {value: undefined, done:true}，函数默认return undefined
console.log(g.next())

// Generator已经执行完了，返回{value: undefined, done:true}
console.log(g.next())
```

**yield 和 return 比较**

yield 可以暂停，可以执行多次。return 只能执行一次。

## next()方法

g.next() 返回的值是一个对象，它有两个属性：value、done。

**value**表示`yield`返回的值，该值会被此 yield 之前的 return 值覆盖。也就是：

```javascript
function* generator(){
    return 11
    yield 2
}

const g = generator()

// {value: 11, done:false}
g.next()
```

**done**表示函数是否执行完了。所以调用next()的次数会比yield的数量多1。

上面主要是通过 yield 暂停函数，还可以通过 yield 传递值。yield 默认返回值上 undefined，可以通过 next() 的参数传递值。

```javascript
function* generator(){
    const a = yield 3
    console.log(a)
}

const g = generator()

g.next()
g.next('hi') // a = 'hi'
```

上面的代码，在第一次调用next()时，函数暂停，第二次执行next()时，next()的参数会赋值给yield。所以代码打印出`'hi'`。

下面上一个稍微复杂的例子。

```javascript
function* generator(){
    var arr = []

    arr.push(yield)
    arr.push(yield)
    arr.push(yield)
    arr.push(yield)

    console.log(arr)
}

const g = generator()
g.next('my')
g.next('name')
g.next('is')
g.next('liming')
g.next(0)

// 打印出 ["name", "is", "liming", 0]
```

## generator应用



