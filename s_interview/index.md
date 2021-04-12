# 前端面试题大全

## 常规问题

## html

-   简单说下你理解的语义化，怎样来保证你写的符合语义化？HTML5 语义化标签了解下？
-   DOCTYPE 的作用是什么?

## css

-   在 css 中 link 和@import 的区别是什么？
-   CSS 伪类和伪元素区别
-   Css 预处理器的概念
-   什么情况下出现浏览器分层？

## javascript

-   防抖节流原理、区别以及应用，请用 js 实现。
-   请用 JS 代码实现事件代理
-   使用 TS 的优势有哪些?
-   说明一下 JS 封装的原理
-   说明下 JS 继承的原理？
-   手写实现下 Object.freeze

```js
// 无法新增 编辑 删除现有属性，可以修改第二级对象的属性值
function freeze(obj){
    Object.keys(obj).forEach(key=>{
        Object.defineProperty(obj, key, {
            writable: false,
            // configurable: false
        })
    })
    Object.seal(obj) //不能添加新属性和删除属性，可修改，不可配置
}

function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
```

-   js 异步解决方案有哪几种

```
callback
setTimeout
Promise
async await 
```

-   Promise.resolve(obj), obj 有几种形式
-   说说 ES6 对 Object 类型做了哪些优化更新?
-   介绍 class 和 ES5 的类以及区别
-   javascript 创建对象的几种方式?
-   Promise 构造函数是同步还是异步执行，then 呢？
-   promise 有没有解决异步的问题
-   请解释下 jsonp 的工作原理
-   JS 为什么要区分微任务和宏任务?

## 计算机基础

-   介绍你所理解的工厂模式?
-   介绍你所理解的装饰器模式?
-   你所理解,同步和异步的区别是什么?阻塞与非阻塞？

-   扫描二维码登录网页是什么原理，前后两个事件是如何联系的?

```
1.  用户打开页面，会返回一个临时的 uuid，网页端不停发 login 请求检查登陆，会请求 uuid 的绑定信息（请求 pending 状态)，超时则重发(timeout=35s)。
2. 用户使用微信 app 扫码(会发送微信账号密码等验证)成功后，微信 server 返回给网页用户的头像信息。
3. 网页端继续发 login 请求，当用户点确定时，微信 server 返回网页端 token 登陆成功。
4. 在超时、网络断开、其他设备上登录后，此前获得的令牌或丢失、或失效，对授权过程形成有效的安全防护。
```

## 浏览器相关

-   介绍一下你对浏览器内核的理解?

```
浏览器内核就是浏览器引擎，主要包含渲染引擎和 js 引擎。

产品       浏览器内核    js引擎
Mozilla     Gecko      spiderMonkey
Google/Edge  Blink           v8
Apple       Webkit    javascriptcore
ie          Trident
Chromium 是 Google 的一个开源浏览器项目

```

![](imgs/2021-04-08-00-52-38.png)

-   什么是同源限制？同源限制的目的？哪些地方会有同源限制？
-   为什么要限制 ajax 同源？答案：[why-the-cross-domain-ajax-is-a-security-concern](https://stackoverflow.com/questions/466737/why-the-cross-domain-ajax-is-a-security-concern)
-   [我知道的跨域与安全](https://juejin.im/post/5a6320d56fb9a01cb64ee191)
-   浏览器的本地存储 cookie 了解多少？WebStorage 了解多少？

```
localStorage 在各浏览器中的存储大小是多少？超出会怎样？e.name === QuotaExceededError
```

-   浏览器缓存机制对于开发很重要，介绍一下协商缓存和缓存位置？
-   如何加快页面渲染速度，都有哪些方式？
-   说一下栈和堆的区别，垃圾回收时栈和堆的区别？
-   添加原生事件不移除为什么会内存泄漏，还有哪些地方会存在内存泄漏？

## Vue

-   Vue 是如何收集依赖的?
-   Vue 中的 key 有什么作用?
-   说一下 Vue 的父组件和子组件生命周期钩子函数执行顺序？
-   使用过 Vue SSR 吗？说说 SSR？
-   说一下 Vue 的$nextTick 原理
-   说一下 Vue 单页与多页的区别?
-   v-model 是如何实现的，语法糖实际是什么？
-   怎样理解 Vue 的单向数据流？
-   关于对 Vue 项目进行优化，你有哪些方法?
-   对虚拟 DOM 的理解？虚拟 DOM 主要做了什么？虚拟 DOM 本身是什么？
-   说一下 Vue 的 keep-alive 是如何实现的，具体缓存的是什么？
-   Redux 和 Vuex 有什么区别,说一下它们的共同思想?
-   为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以- 直接是一个对象？
-   直接给一个数组项赋值，Vue 能检测到变化吗？
-   Vue 组件间通信有哪几种方式？
-   子组件可以直接改变父组件的数据么？说说你的理由？(vue 部分)
-   Vuex 和 localStorage 的区别是什么？
-   vue 的双向绑定的原理是什么？
-   计算属性和普通属性的区别是什么
-   Vue-cli 默认是单页面的，如果要开发多页面应该怎么办?
-   说说 Vue 开发如何针对搜索引擎做 SEO 优化?
-   介绍下 vue-router 中的导航钩子函数
-   说一下 vue-router 的原理是什么?

## React

-   介绍 React 高阶组件，适用于什么场景？
-   react 里组件通信有几种方式，分别怎样进行通信？
-   React 组件中怎么做事件代理？它的原理是什么？
-   shouldComponentUpdate 是为了解决什么问题？
-   说一下 mobx 和 redux 有什么区别？
-   React 里 setState 到底是异步还是同步？
-   react-redux 的工作流程是什么？

-   说一下你对 React context 的理解
-   说一下 React.Component 和 React.PureComponent 的区别
-   使用 import 时，webpack 对 node_modules 里的依赖会做什么?
-   React SSR 实现过程？
-   React SSR 实现原理是什么,需要注意什么事项？

## 工程化与 webpack

-   常见的 loader 以及作用的总结
-   webpack 中 source map 是什么？生产环境怎么用？
-   Loader 和 Plugin 的区别是什么？
-   常见的 plugin 以及作用的总结
-   webpack 的构建流程是什么？
-   Import 和 CommonJs 在 webpack 打包过程中有什么不同
-   dev-server 是怎么跑起来的？
-   如何实现 webpack 持久化缓存?
-   webpack 热更新的原理
-   webpack 打包时 Hash 码是怎样生成的？随机值存在一样的情况，如何避免？
-   webpack 做了什么？使用 webpack 构建是有无做了一些自定义操作？
-   webpack 如何用 localStorage 离线缓存静态资源？
-   webpack 里面的插件是如何实现的？
-   说一下关于 tree-shaking 的原理

## 测试

## 网络协议

## 安全

-   能不能说一说 XSS 攻击？
-   能不能说一说 CSRF 攻击？

## NodeJs

**Storage**

1. `storage`事件什么时候触发，它能做什么？事件对象里的`key`、`newValue`、`oldValue`、`storageArea`、`url`属性分别是什么？

### 网页元素接口

### webpack

1. webpack 介绍?
1. webpack 生命周期？loader 和 plugin 有什么区别?
   loader 是在部分生命周期内执行的，主要目的是为了转换模块。plugin 是 webpack 的核心，webpack 本身就是基于它的，存在于各个生命周期中，能做更多事情。
1. webpack 打包的整个过程？
1. webpack loader 的设计原则?
1. 使用过 webpack 里面哪些 plugin 和 loader?

插件有：CleanWebpackPlugin，HtmlWebpackPlugin
loader 有：css 组：less-loader、css-loader、style-loader，js：babel-loader，图片：url-loader，文件：file-loader

1. webpack 里面的插件是怎么实现的？
1. dev-server 是怎么跑起来?
1. 项目优化？
1. 抽取公共文件是怎么配置的？
1. import { Button } from 'antd' ，打包的时候只打包 button，分模块加载，是怎么做到的?
1. 使用 import 时，webpack 对 node_modules 里的依赖会做什么?
1. webpack 如何配 less，需要配哪些 loader? 配 css 需要哪些 loader?
   less-loader, css-loader, style-loader
1. 如何配置把 js、css、html 单独打包成一个文件?简单的活动页。
1. 如何实现异步加载?
   使用 import()函数
1. 如何实现分模块打包（多入口)?
1. 使用 webpack 构建时有无做一些自定义操作?
1. webpack 做了什么?

## nodejs

### OS

-   什么是 TTY? 如何判断是否处于 TTY 环境?
-   不同操作系统的换行符 (EOL) 有什么区别?
-   什么是负载？怎么查看？不同值的负载表示什么？[答案](/note/nodejs/eleme-os/)
-   如何知道我的系统有多少核心？[答案](/note/nodejs/eleme-os/)
-   CPU 负载和 CPU 使用率的区别？[答案]
-   什么是 CPU 时间片？
-   ulimit 是用来干什么的?

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
1. 什么是 TDD、ATDD、BDD?分别举例说明流程。
1. 单元测试的原理简单实现?
1. 什么是黑盒测试，什么是白盒测试?
1. 什么是单元测试、集成测试、基准测试、压力测试？说说你是怎么测试的？

## 正在进行中

-   [yangshun/front-end-interview-handbook](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/README.md)
-   [h5bp/Front-end-Developer-Interview-Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)

## 面试题来源

-   https://wangdoc.com/javascript/
-   https://juejin.im/post/5c8f30606fb9a070ef60996d
-   https://juejin.im/post/5c64d15d6fb9a049d37f9c20
-   https://juejin.im/post/5a998991f265da237f1dbdf9
-   [前端面试题 300 道](https://blog.csdn.net/qq_22944825/article/details/78169321)
-   https://blog.csdn.net/qq_20264891/article/details/79158495
-   [前端开发面试题](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Question)
-   [poetries/FE-Interview-Questions](https://github.com/poetries/FE-Interview-Questions)
-   [poetries/FE-Interview-Questions/issue](https://github.com/poetries/FE-Interview-Questions/issues/2)
-   [airuikun/Weekly-FE-Interview](https://github.com/airuikun/Weekly-FE-Interview)
-   [FEGuideTeam/FEGuide](https://github.com/FEGuideTeam/FEGuide)
-   [Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question)
-   http://javascript-puzzlers.herokuapp.com/
-   http://dy.163.com/v2/article/detail/D7NJ9PU30511PJRO.html
-   https://github.com/yygmind/blog
-   [paddingme/Front-end-Web-Development-Interview-Question](https://github.com/paddingme/Front-end-Web-Development-Interview-Question)
-   [haizlin/fe-interview](https://github.com/haizlin/fe-interview)
-   [jirengu/frontend-interview](https://github.com/jirengu/frontend-interview)
-   [qiu-deqing/FE-interview](https://github.com/qiu-deqing/FE-interview)
-   [huruji/FE-Interview](https://github.com/huruji/FE-Interview)
-   [woai3c/Front-end-basic-knowledge](https://github.com/woai3c/Front-end-basic-knowledge)
-   https://github.com/HerbertKarajan/Fe-Interview-questions
-   https://github.com/cuitianze/Front-end-Developer-Interview-Questions-of-Chinese
-   [lengyue1024/BAT_interviews](https://github.com/lengyue1024/BAT_interviews)
-   https://github.com/fex-team/interview-questions
-   https://juejin.im/post/5c1eec7bf265da61477034ae
-   https://github.com/khan4019/front-end-Interview-Questions
-   https://github.com/helloqingfeng/Awsome-Front-End-learning-resource
-   https://github.com/PengKen/-web-
-   https://juejin.im/post/5c356f68f265da61483bca61
-   https://github.com/AlloyTeam/Mars
-   https://juejin.im/post/5c1eec7bf265da61477034ae
-   https://www.zhihu.com/question/24964987/answer/586425979

阿里巴巴前端面试分享-社招（p6）
借鉴了朋友的阿里面试经：（社招前端 2 年经验）
电话面
简单自我介绍, 做过哪些项目, 使用哪些技术栈 ?
如何看待前端框架选型 ?
vue 的如何实现双向绑定的 ？
react 虚拟 DOM 是什么? 如何实现? 说一下 diff 算法 ?
工作中最出色的点, 和你最头疼的问题 如何解决的 ?
平时如何学习, 最近接触了解了哪些新的知识 ?
技术一面
简单自我介绍, 介绍一下你的项目, 技术栈 ?
react 和 vue 的比较 ?
React Diff 算法 ?
观察者模式实现 ?
http 报文头部有哪些字段? 有什么意义 ?
移动端高清方案如何解决 ?
webpack 的原理, loader 和 plugin 是干什么的? 有自己手写过么 ?
简述从网页输入 url 到网页展示的过程发生了哪些事情 ?
SSR 和 客户端渲染有什么区别 , vue 是如何实现绑定事件的 ?
简述公司 node 架构中容灾的实现 ?
浏览器事件有哪些过程? 为什么一般在冒泡阶段, 而不是在捕获阶段注册监听? addEventListener 参数分别是什么 ?
面向对象如何实现? 需要复用的变量 怎么处理 ?
移动端 300ms 延时的原因? 如何处理?
主流框架的数据单向/双向绑定实现原理 ?
简述转行经历, 如何学习 ?
你觉得自己在前端工作的最大的优点是什么 拿实际工作的内容举例?
技术二面
和一面前 3 问基本一致,简述项目,React vue 区别 virsualDOM 实现
DIFF 算法为什么是 O(n)复杂度而不是 O(n^3)
http code 码?
移动端 rem 布局如何实现? 简述原理?
JSbridge 原理, js 和 native 是如何通信的?
Rollup 和 webpack 区别, treeshaking 是什么?
TCP 三次握手的过程, get post 请求的区别 ?
静态文件的浏览器缓存如何实现?
前端跨域方案
http 请求包含哪些字段 分别是什么意思
js 有哪些数据类型 如何判断? null 和 undefined 区别 应用场景?
new String('a') 和 'a' 是一样的么?
移动端如何实现下拉到底部 跟随移动 结束后回弹的动画?
移动端如何优化首页白屏时间过长 ?
ES6 generator 函数简述
数组去重实现?
js 浮点数运算不精确 如何解决?
工作中最得意和出色的点, 头疼的点, 问题如何解决的
为何换工作?
聊了下阿里的压力,文化
技术三面
公司的前端工程化实践
转行之后是如何自学前端的, 学习途径 有没有一些自己的代码
DOM 基础知识,添加元素,删除元素等等...
DOM 节点类型
正则表达式如何匹配一段 url ?在正则表达式中有哪几种作用?
移动端优化方式? 离线包是如何实现的?
最后聊了一下项目,聊了一下目前公司
-   请解释 React 中 props 和 state 的区别？
-   react-router 里的 Link 标签和 a 标签有什么区别？

-   浏览器缓存机制(1)对于开发很重要，强缓存的内容能了解多少呢？
-   介绍 js 全部数据类型，基本数据类型和引用数据类型的区别

-   谈谈你对重绘和回流的理解？

-   说一下事件循环机制(node 浏览器)

-   HTTP 请求特征是什么？

-   布局都有什么方式，float 和 position 有什么区别？

-   移动端需要注意什么？
-   响应式布局用到的技术有几种方式？
-   词法作用域和 this 的区别

-   请描述下 css 盒模型基本概念

？

-   怎么处理项目中的异常捕获行为？
-   点击一个按钮，浏览器会做些什么事情？

-   CSS 预处理器的好处
-   与 HTTP 相关的协议有哪些？TCP/IP DNS URI/URL HTTPS
-   CDN 有哪些优化静态资源加载速度的机制？
-   说说你理解的 node 中间层怎样做的请求合并转发？

-   说一下 mysql 和 mongodb 的区别?

-   项目如何管理模块？
-   在哪个生命周期内调用异步请求？

-   写出常用的页面优化实现方案？
-   回调函数和任务队列的区别
-   请你谈谈对无状态的理解(React 部分)
-   如何理解事件委托？
-   BFC 是什么？触发 BFC 的条件是什么？有哪些应用场景？
-   说一下单向数据流有什么好处？
-   React 怎么做数据检查和变化？
-   类数组转化为数组

)

-   能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？
-   实现数组去重
-   描述下 JS 中 Prototype 的概念？
-   实现数组扁平化
-   React 事件绑定原理是什么？
-   为什么不建议使用通配符初始化 css 样式?
-   说一下 koa2 和 express 区别?
-   link 标签定义
-   渲染过程中遇到 JS 文件怎么处理?(浏览器解析过程)
-   Object.is()与原来的比较操作符 "===" 、"==" 的区别?
-   三种事件模型是什么?

-   iframe 有哪些缺点?
-   说说你对浏览器的理解?
-   谈谈你对 ajax 的理解?
-   简单介绍使用图片 base64 编码的优点和缺点.
-   请说出目前主流的 js 模块化实现的技术有哪些?他们的区别在哪儿?
-   for..in 和 Object.keys 的区别
-   哪些操作会造成内存泄漏?
-   什么是浏览器的同源策略?
-   说一下你理解 margin 重叠的问题.
-   网页验证码是干嘛的，是为了解决什么安全问题?
-   display、position 和 float 的相互关系?
-   前端需要注意哪些 SEO?
-   简单说一下 V8 引擎的垃圾回收机制
-   说一说对 JSON 的理解?
-   渲染页面时常见的不良现象有哪些?(浏览器渲染过程)
-   说一下 html 布局元素的分类有哪些?以描述下每种布局元素的应用场景么?
-   componentWillReceiveProps 的触发条件是什么？
-   javascript 代码中的"use strict"是什么意思?为什么使用它?
-   什么是 Polyfill ?
-   说一下 Vue 的生命周期以及每个阶段做的事情

-   说一下你所理解 JavaScript 中的作用域与变量声明提升?
-   内部属性[[Class]]是什么?
-   检测浏览器版本版本有哪些方式?
-   React 高阶组件、Render props 和 hooks 有什么区别,为什么不断迭代?
-   说一下 Vue template 到 render 的过程
-   如何解决跨域问题?
-   margin 和 padding 分别适合什么场景使用?
-   CSS 多列等高如何实现?
-   如何处理 HTML5 新标签的浏览器兼容问题?

-   说一下你所理解的渲染原理?
-   如何判断一个对象是否属于某个类?
-   什么是 DOM 和 BOM?
-   CSS 选择符有哪些?
-   标准模式与兼容模式各有什么区别?
-   css 如何阻塞文档解析?(浏览器解析过程)
-   说一下你所了解的 javascript 的作用域链?
-   DOMContentLoaded 事件和 Load 事件的区别?
-   Symbol 值的强制类型转换?
-   HTML5 有哪些新特性、移除了哪些元素?
-   说一下对 DTD 的理解。
-   常见浏览器所用的内核
-   什么是文档的预解析?(浏览器解析过程)
-   js 继承的几种实现方式?
-   React key 是干什么用的,为什么要加上 key 呢?
-   说一下你理解的 HTTPS 中间人攻击 ?
-   说一下你所理解的观察者模式?
-   SGML、HTML、XML 和 XHTML 的区别?
-   说一下你所了解的 react-fiber?
-   异步编程的实现方式是什么?
-   什么是函数柯里化?
-   说一下 import 的原理，和 require 的不同之处在哪儿?
-   使用 Object.defineProperty() 来进行数据劫持有什么缺点?
-   面向对象的三要素是什么，分别是什么意思?
-   说一下 base64 的编码方式
-   数组去重
-   说一下 React setState 原理
-   介绍你所理解的中介者模式?
-   你所理解的前端路由是什么?
-   SSL 连接断开后如何恢复 ?
-   说一下 ajax/axios/fetch 三者的区别
-   Reflect 对象创建目的是什么?
-   require 模式引入的查找方式是什么?
-   addEventListener 在 removeListener 会不会造成内存泄露?
-   CDN 访问过程是什么？
-   node 性能如何监控？
-   为什么 useState 要使用数组而不是对象?
-   Node 更适合处理 I/O 密集型任务还是 CPU 密集型任务,为什么?
-   用微服务有什么好处？
-   什么是微服务？

-   查找重复元素
-   **字符串陷阱** 请输出结果并进行解释
-   **提升变量** 请输出结果并进行解释
-   添加元素(指定位置添加)
-   **filter 过滤器** 请输出结果并进行解释
-   求两个数组的交集
-   给定一个整数数组，找到从三个整数中产生的最大乘积
-   说一下你理解的 CORS。
-   什么是 CDN 服务?
-   实现单点登录的原理
-   介绍下你所理解的 React 设计思路,它的理念是什么?
-   node 性能如何优化？
-   微服务和单体应用的区别是什么？
-   移除数组中的元素(返回新的数组)
-   在末尾添加元素
-   **神奇的 null** 请输出结果并进行解释
-   **优先级顺序** 请输出结果并进行解释
-   给定一个整数数组，请找出两个元素之间的最大差，较小值的元素必须位于较大元素之前
-   查找数组元素位置
-   数组形式的整数加法
-   Redux 中间件是如何拿到 store 和 action?
-   介绍你所理解的组合模式?
-   了解函数式编程中的 compose 么?
-   字符的最短距离
-   对称加密和非对称加密的区别和用处
-   用栈实现队列

-   手动实现数组 Reduce 方法
-   字符串解码
-   介绍你所理解的迭代器模式?

-   讲一下你所了解的函数式编程
-   最多能完成排序的块
-   介绍你所理解的单例模式?
-   设计一个支持增量操作的栈
-   虚拟列表是什么?说一下它的实现原理?
-   说一下 JavaScript 的宿主对象和原生对象的区别?
-   二叉树的最大深度
-   浏览器都有哪些进程，渲染进程中都有什么线程?
-   LRU 缓存机制
-   什么是跨域?都有哪些方式会造成跨域?
-   请问如何进行首页加载优化?
-   相交链表
