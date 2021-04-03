---
title: 前端训练营
---

# 前端训练营

## 学习方法论

前端技能模型

- 领域知识(比如埋点，某些行业要用的，实践中学习)
- 前端知识(建立知识体系)
- 编程能力(解决复杂的问题)、架构能力(大的问题，看别人代码等)、工程能力(人多的问题) 刻意练习

学习方法

- 整理法(完备性)
  - 顺序关系：比如编译过程
  - 组合关系：比如 css 规则，包括选择器、属性、值
  - 纬度关系：比如 js 的文法、语义、运行时
  - 分类关系：比如 css 选择器 id class 通用 属性 元素等选择器，
    - 比如 html 标签可以看 whatwg.org 的分类
- 追溯法(线索)
  - 源头：最早出现的论文、杂志；最初的实现案例
  - 标准和文档：
    - w3.org
    - developer.mozilla.org
    - msdn.microsoft.com
    - developer.apple.com
  - 大师
    - tim berners-lee
    - brenda eich
    - bjarne stroustrup

追溯法案例 - mvc (每个人有每个人的理解和使用，不能说哪个结论是错误的，有具体的场景) - 面向对象的概念(面向对象、基于对象) - 闭包

- 打断
  - 打断意味着不感兴趣
  - 打断是一种提示，可能偏了
- 争论
  - 争论与压力面试
  - 争论的技巧：议论文三要素：论点、论据、论证。(追溯法)
- 难题
  - 展现分析过程
  - 缩小规模

## 知识体系

## new 命令

1. new 命令的原理

```js
function _new(constructor, ...args) {
  var context = Object.create(constructor.prototype);
  var result = constructor.call(obj, ...args);
  return typeof result === "object" && res !== null ? result : context;
}
```

如果构造函数内部有 return 语句，而且 return 后面跟着一个对象，new 命令会返回 return 语句指定的对象；否则，就会不管 return 语句，返回 this 对象。

2. 关于 new.target

函数内部可以使用 new.target 属性。如果当前函数是 new 命令调用，new.target 指向当前函数，否则为 undefined。

```js
function f() {
  if (!new.target) {
    throw new Error("请使用 new 命令调用！");
  }
}

f(); // Uncaught Error: 请使用 new 命令调用！
```

## this 关键字

函数在内存中是单独保存的，所以可以在不同环境中执行，this 的本质是函数运行时的环境。

https://wangdoc.com/javascript/oop/this.html

## 继承
