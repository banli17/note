---
title: 我不知道的javascript
date: 2019-03-28 22:10:01
tags:
toc: true
---

## new 命令

1. new 命令的原理

```js
function _new(constructor, ...args){
    var context = Object.create(constructor.prototype)
    var result = constructor.call(obj, ...args)
    return (typeof result === 'object' && res !== null) ? result : context
}
```

如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

2. 关于 new.target

函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。

```js
function f() {
  if (!new.target) {
    throw new Error('请使用 new 命令调用！');
  }
}

f() // Uncaught Error: 请使用 new 命令调用！
```

## this 关键字

函数在内存中是单独保存的，所以可以在不同环境中执行，this 的本质是函数运行时的环境。

https://wangdoc.com/javascript/oop/this.html

## 继承
