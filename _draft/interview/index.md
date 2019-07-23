---
title: "前端面试题大全"
date: 2017-01-19 11:25:49
tags:
toc: true
---

## 常规问题



## html

## css

## javascript

### 基础

### 面向对象编程

### 异步操作

### DOM

### 事件

### 浏览器模型

**Cookie**

**同源限制**

1. 什么是同源限制？
1. 同源限制的目的？举例说明。
1. 哪些地方会有同源限制？
1. 为什么要限制 ajax 同源？答案：[why-the-cross-domain-ajax-is-a-security-concern](https://stackoverflow.com/questions/466737/why-the-cross-domain-ajax-is-a-security-concern)

- [我知道的跨域与安全](https://juejin.im/post/5a6320d56fb9a01cb64ee191)

**History**

1. `history.length` 是什么？
1. 浏览器历史记录 url 通过 js 怎么查看？
1. `history.state` 有什么作用？
1. 如何在历史记录中前进、后退？
1. `history.go(n)` 当 n 分别为 1、-1、0、超出范围时表示什么意思？
1. `history.pushState(state, title, url)`是干什么的？
1. `hashchange`事件在什么时候触发？在 pushState 时会触发吗？
1. `history.replaceState(state, title, url)`是干什么的？
1. `popstate`事件什么时候触发?
> 只针对同一个文档，点浏览器前进、后退或 js 的 back() forward() go() 时触发，第一次打开页面不会触发。
1. 自己实现一个路由系统?

**Storage**

1. `localStorage`和`sessionStorage`的区别？
1. `localStorage` 在各浏览器中的存储大小是多少？超出会怎样？e.name === QuotaExceededError
1. `localStorage`有哪些方法？
1. 怎么知道`localStorage`存储了多少项？如何遍历所有项？
1. `storage`事件什么时候触发，它能做什么？事件对象里的`key`、`newValue`、`oldValue`、`storageArea`、`url`属性分别是什么？

### 网页元素接口

### webpack

1. webpack介绍?
1. webpack 生命周期？loader和plugin有什么区别?
loader是在部分生命周期内执行的，主要目的是为了转换模块。plugin是webpack的核心，webpack本身就是基于它的，存在于各个生命周期中，能做更多事情。
1. webpack 打包的整个过程？
1. webpack loader 的设计原则?
1. 使用过webpack里面哪些plugin和loader?

插件有：CleanWebpackPlugin，HtmlWebpackPlugin
loader有：css 组：less-loader、css-loader、style-loader，js：babel-loader，图片：url-loader，文件：file-loader

1. webpack 里面的插件是怎么实现的？
1. dev-server是怎么跑起来?
1. 项目优化？
1. 抽取公共文件是怎么配置的？
1. import { Button } from 'antd' ，打包的时候只打包button，分模块加载，是怎么做到的?
1. 使用import时，webpack对node_modules里的依赖会做什么?
1. webpack如何配less，需要配哪些loader? 配css需要哪些loader?
less-loader, css-loader, style-loader
1. 如何配置把js、css、html单独打包成一个文件?简单的活动页。
1. 如何实现异步加载?
使用import()函数
1. 如何实现分模块打包（多入口)?
1. 使用webpack构建时有无做一些自定义操作?
1. webpack做了什么?


## nodejs

### OS

- 什么是 TTY? 如何判断是否处于 TTY 环境?
- 不同操作系统的换行符 (EOL) 有什么区别?
- 什么是负载？怎么查看？不同值的负载表示什么？[答案](/note/nodejs/eleme-os/)
- 如何知道我的系统有多少核心？[答案](/note/nodejs/eleme-os/)
- CPU 负载和 CPU 使用率的区别？[答案]
- 什么是 CPU 时间片？
- ulimit 是用来干什么的?

### 错误处理/调试(未完成)

1. 怎么处理未预料的出错? 用 try/catch ，domains 还是其它什么? [more]
1. 什么是 uncaughtException 事件? 一般在什么情况下使用该事件? [more]
1. domain 的原理是? 为什么要弃用 domain? [more]
1. 什么是防御性编程? 与其相对的 let it crash 又是什么?
1. 为什么要在 cb 的第一参数传 error? 为什么有的 cb 第一个参数不是 error, 例如 http.createServer?
1. 为什么有些异常没法根据报错信息定位到代码调用? 如何准确的定位一个异常? [more]
1. 内存泄漏通常由哪些原因导致? 如何分析以及定位内存泄漏? [more]


### 测试

1. 什么是断言？
1. 什么是TDD、ATDD、BDD?分别举例说明流程。
1. 单元测试的原理简单实现?
1. 什么是黑盒测试，什么是白盒测试?
1. 什么是单元测试、集成测试、基准测试、压力测试？说说你是怎么测试的？


## 正在进行中

- [yangshun/front-end-interview-handbook](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/README.md)
- [h5bp/Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)

## 面试题来源

- https://wangdoc.com/javascript/
- https://juejin.im/post/5c8f30606fb9a070ef60996d
- https://juejin.im/post/5c64d15d6fb9a049d37f9c20
- https://juejin.im/post/5a998991f265da237f1dbdf9
- [前端面试题300道](https://blog.csdn.net/qq_22944825/article/details/78169321)
- https://blog.csdn.net/qq_20264891/article/details/79158495
- [前端开发面试题](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Question)
- [poetries/FE-Interview-Questions](https://github.com/poetries/FE-Interview-Questions)
- [poetries/FE-Interview-Questions/issue](https://github.com/poetries/FE-Interview-Questions/issues/2)
- [airuikun/Weekly-FE-Interview](https://github.com/airuikun/Weekly-FE-Interview)
- [FEGuideTeam/FEGuide](https://github.com/FEGuideTeam/FEGuide)
- [Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question)
- http://javascript-puzzlers.herokuapp.com/
- http://dy.163.com/v2/article/detail/D7NJ9PU30511PJRO.html
- https://github.com/yygmind/blog
- [paddingme/Front-end-Web-Development-Interview-Question](https://github.com/paddingme/Front-end-Web-Development-Interview-Question)
- [haizlin/fe-interview](https://github.com/haizlin/fe-interview)
- [jirengu/frontend-interview](https://github.com/jirengu/frontend-interview)
- [qiu-deqing/FE-interview](https://github.com/qiu-deqing/FE-interview)
- [huruji/FE-Interview](https://github.com/huruji/FE-Interview)
- [woai3c/Front-end-basic-knowledge](https://github.com/woai3c/Front-end-basic-knowledge)
- https://github.com/HerbertKarajan/Fe-Interview-questions
- https://github.com/cuitianze/Front-end-Developer-Interview-Questions-of-Chinese
- [lengyue1024/BAT_interviews](https://github.com/lengyue1024/BAT_interviews)
- https://github.com/fex-team/interview-questions
- https://juejin.im/post/5c1eec7bf265da61477034ae
- https://github.com/khan4019/front-end-Interview-Questions
- https://github.com/helloqingfeng/Awsome-Front-End-learning-resource
- https://github.com/PengKen/-web-
- https://juejin.im/post/5c356f68f265da61483bca61
- https://github.com/AlloyTeam/Mars
- https://juejin.im/post/5c1eec7bf265da61477034ae
- https://www.zhihu.com/question/24964987/answer/586425979


阿里巴巴前端面试分享-社招（p6）
借鉴了朋友的阿里面试经：（社招前端2年经验）
电话面
简单自我介绍, 做过哪些项目, 使用哪些技术栈 ?
如何看待前端框架选型 ?
vue的如何实现双向绑定的 ？
react 虚拟DOM 是什么? 如何实现? 说一下diff算法 ?
工作中最出色的点, 和你最头疼的问题 如何解决的 ?
平时如何学习, 最近接触了解了哪些新的知识 ?
技术一面
简单自我介绍, 介绍一下你的项目, 技术栈 ?
react和vue的比较 ?
React Diff 算法 ?
观察者模式实现 ?
http报文头部有哪些字段? 有什么意义 ?
移动端高清方案如何解决 ?
webpack的原理, loader 和 plugin 是干什么的? 有自己手写过么 ?
简述从网页输入url到网页展示的过程发生了哪些事情 ?
SSR 和 客户端渲染有什么区别 , vue是如何实现绑定事件的 ?
简述公司node架构中容灾的实现 ?
浏览器事件有哪些过程? 为什么一般在冒泡阶段, 而不是在捕获阶段注册监听? addEventListener 参数分别是什么 ?
面向对象如何实现? 需要复用的变量 怎么处理 ?
移动端300ms延时的原因? 如何处理?
主流框架的数据单向/双向绑定实现原理 ?
简述转行经历, 如何学习 ?
你觉得自己在前端工作的最大的优点是什么 拿实际工作的内容举例?
技术二面
和一面前3问基本一致,简述项目,React vue区别 virsualDOM实现
DIFF算法为什么是O(n)复杂度而不是O(n^3)
http code码?
移动端rem布局如何实现? 简述原理?
JSbridge原理, js和native是如何通信的?
Rollup和webpack区别, treeshaking是什么?
TCP三次握手的过程, get post请求的区别 ?
静态文件的浏览器缓存如何实现?
前端跨域方案
http 请求包含哪些字段 分别是什么意思
js 有哪些数据类型 如何判断? null 和 undefined区别 应用场景?
new String('a') 和 'a' 是一样的么?
移动端如何实现下拉到底部 跟随移动 结束后回弹的动画?
移动端如何优化首页白屏时间过长 ?
ES6 generator函数简述
数组去重实现?
js浮点数运算不精确 如何解决?
工作中最得意和出色的点, 头疼的点, 问题如何解决的
为何换工作?
聊了下阿里的压力,文化
技术三面
公司的前端工程化实践
转行之后是如何自学前端的, 学习途径 有没有一些自己的代码
DOM基础知识,添加元素,删除元素等等...
DOM节点类型
正则表达式如何匹配一段url ?在正则表达式中有哪几种作用?
移动端优化方式? 离线包是如何实现的?
最后聊了一下项目,聊了一下目前公司
