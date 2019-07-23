---
title: "javascript 基础知识总结"
date: 2018-02-04 08:12:05
toc: true
---

## 文法：词法与语法

## 语义

## 数据结构

- 为什么有的编程规范要求用void 0代替undefined? 
- 字符串有最大长度吗?
- 0.1 + 0.2不是等于0.3么?
- 为什么JavaScript里不是这样的? 
- ES6新加入的Symbol是个什么东西? 
- 为什么给对象添加的方法能用在基本类型上?


### 面向对象

Javascript 对象可以动态添加属性，属性分为数据属性和访问器属性。

数据属性有：

- value: 属性的值
- writable: 属性能否被赋值
- enumerable: 决定for...in是否能被枚举。
- configurable: 决定属性能否被删除或改变特征值。

访问器属性：

- getter: 函数或 undefined。
- setter: 函数或 undefined。
- enumerable: 决定for...in是否能被枚举。
- configurable: 决定属性能否被删除或改变特征值。 

`symbolObj+''`会报错，是因为`typeof Object(Symbol("a"))[Symbol.toPrimitive]()` 返回的 symbol 不是 String。

## 执行过程

### 事件循环

### 微任务的执行

### 函数的执行

### 语句级的执行