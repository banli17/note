---
title: 一些重要模块
date: 2019-04-03 15:09:00
tags:
---

## 简介

require()找文件的路径，按照`module.paths`查找。

比如`require("mime")`，首先找`.js|.json|.node`文件，再找目录里的`package.json`的`main`，如果没有再找目录里的`index.js`。

## util

- `util.promisify()`: 将回调的方式转成`promise`。

```javascript
let util = require('util')
let read = util.promisify(fs.readFile)
```

`mz`模块会自动把 node 的模块转化成 promise 的形式。

```javascript
let fs = require('mz/fs')
fs.readFile('1.txt', 'utf8').then(data => console.log(data))
```

继承的方法，node里有大量的继承。

- `util.inherits(constructor, superConstructor)`:继承另一个构造器的方法,属性不继承。不建议使用，用es6 extends

```javascript
Child.prototype.__proto__ = Parent.prototype
Object.create()
Object.setPrototypeOf()
```

## events

```javascript
let EventEmitter = require('events')
let util = require('util')
let event = new EventEmitter()

function Person(){

}
util.inherits(Person, EventEmitter)
let p = new Person()
p.on('newListener', (eventName)=>{})
let eat = function(){console.log('eat')}
p.on('clock', eat)
p.emit('clock')
```

- `newListener`: 绑定一次事件会触发一次
- `on(evname, fn)`
- `off(evname, fn)`
- `removeListener(ename, fn)`
- `EventEmitter.defaultMaxListeners`
- `getMaxListeners()`
- `setMaxListeners(n)`
- `eventNames()`: 监听的事件名数组
- `listenerCount(ename)`: 监听的事件名次数
- `prependListener()`: 在on前面监听
- `once()`: 只执行一次，触发完，数组里删除

## EventEmitter类的实现

下面用发布订阅模式简单的实现一下`EventEmitter`类。

```javascript
```