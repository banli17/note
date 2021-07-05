---
title: "javascript 享元模式"
sidebar_label: 享元模式
---


- 书籍《javascript设计模式与开发实践》 [网文](https://www.cnblogs.com/xiaohuochai/p/8039957.html)

享元模式就是将大量重复的对象根据内部状态抽象成少量的对象，从而解决大量重复对象产生的性能问题。

- 共享内存，主要考虑内存，而不是效率。
- 相同的数据，共享使用。

js中使用场景很少，因为浏览器端基本不需要考虑内存问题。
