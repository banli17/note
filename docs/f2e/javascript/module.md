---
title: "javascript 模块化"
sidebar_label: 模块化编程
---

> 面试题：为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？

模块化的好处：
- 解决命名冲突
- 提供复用性
- 提高代码可维护性

## 立即执行函数

立即执行函数中声明的变量、函数，不会污染全局作用域。

```js
;(function(global){
    global.$ = jQuery
})(window);
```

## AMD 和 CMD

这两种方式现在已经很少用到。

```js
// AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})
// CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})
```

## CommonJS

CommonJS 模块规范在 Node 中被使用。它的特点是：

- 每个文件是一个模块
- 使用 export 导出模块
- 使用 require 导入模块

## ES Module

es module babel 会编译成 require/exports ?

## ES Module 和 CommonJS 的区别？

- CommonJS 是运行时加载，支持动态导入(即路径使用变量)。ES Module 不支持。
- CommonJS 是同步的，因为服务器文件都在本地，速度快。而 ES Module 是异步的，用于浏览器，如果采用同步导入会对渲染有很大影响。
- CommonJS export 的是浅拷贝(如果是基本类型，是拷贝值，不影响原来的值)，esModule 输出的是引用。

```js
/*************** a.js**********************/
let count = {name:1}
exports.count = count; // 输出值的拷贝
exports.add = ()=>{
    //这里改变count值，并不会将module.exports对象的count属性值改变
    // count++;
    count.name = 'xx'
}


/*************** b.js**********************/
const { count, add } = require('./a.js')

console.log(count.name) // 1
add();
console.log(count.name) //xx
```
