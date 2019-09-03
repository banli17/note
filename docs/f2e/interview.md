---
title: "壹题面试题解答"
---

回答壹题项目面试题。

- 面试题地址：[https://github.com/Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question)


## 39. 介绍下 BFC 及其应用?

BFC 是块级格式化上下文。正常流的排版分为3种情况：
- 遇到行级元素，归入行级格式化上下文。行级元素是从左往右边排列(根据文字方向)，如果排不下，会新起一行盒，行盒是块级，归入块级格式化上下文。
- 遇到块级元素，归入块级格式化上下文。块级元素是独占一行，从上往下排列。
- 遇到 float 元素，顶部与当前行级格式化上下文对齐，左右边缘根据浮动左右与块级格式化上下文对齐。

行内盒子上下 margin 失效
特点是：
1. 块级格式化上下文包含其内的所有元素，包括浮动盒子，所以会计算高度。
2. BFC 里的元素上下 margin 会重叠。这个可以理解为 margin 是盒子之间的最小距离
3. BFC 内的元素会一个个从上往下放置。

新建 BFC 的方式：
1. 浮动元素
2. 绝对定位元素 poa pof
3. 非块级，但是能包含块的容器，如 inline-block，table-cell，table-captions
4. 块级元素设置 overflow: 非 visible，如 auto
5. 弹性盒子，网格元素

应用场景：
- 清除浮动
- margin 重叠

## 52. 怎么让一个 div 水平垂直居中

基础布局

```html
<div class='parent'>
    <div class="child"></div>
</div>

.parent {
    outline: solid 1px red;
    width: 200px;
    height: 200px;
}

.child {
    width: 50px;
    height: 50px;
    background: blue;
}
```


布局方式如下：

1. flex 布局

```css
// 1
.parent{
    display: flex;
    align-items: center;
    justify-content: center;
}

// 2
.parent{
    display: flex;
}
.child{
    margin: auto
}
```

2. grid 布局

```css
.parent{
    display: grid
}
.child{
    align-self: center;
    justify-self: center;
}

// 2 
.child{
    margin: auto
}
```

3. absolute

```css
.parent{
    position: relative
}

// 1
.child{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:atuo;
}

// 2
.child{
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

// 3
.child{
    position:absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
}
```

4. table-cell

```css
.parent{
    display: tabel-cell;
    text-align: center;
    vertical-align: middle
}
.child{
    display: inline-block
}

// 如果只要文字居中，可以
.parent{
    display: table
}
.child{
    display: table-cell;
    vertical-align: middle;
    text-algin: center;
}
```


## 57. 三种透明方案的分析比较

分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。


结构上： display:none 不会进 render tree，不占空间，opacity:0 占据空间，只是内容不可见，可点击，visibility:hidden，占据空间，内容不可见。

|属性| 显示时 | 占位|子元素|备注|
|--|--|--|--|
|`display:none`|重排|不占|无法显示||
|`visibility:hidden`|重绘|占|visiblility:visible可显示|
|`opacity:0`|重绘，重建图层，性能消耗少|占|无法显示|不进render tree|


问：用 CSS 隐藏页面上的一个元素有哪几种方法？

- 设置 fixed 并设置足够大负距离的 left top 使其“隐藏”；
- 用层叠关系 z-index 把元素叠在最底下使其“隐藏”；
- 用 text-indent:-9999px 使其文字隐藏。

## 60. 覆盖 import 让图片宽度 300px

已知如下代码，让图片宽度 300px。

```html
<img src="1.jpg" style="width:480px!important;" />
```

方法如下：

```html
// 1
<img src="http://resource.muyiy.cn/image/winter.jpg" style="width:300px!important" style="width:480px!important;"  />

// 2
img{
    transform: scale(0.625)
}

// 3
img{
    max-width: 300px;
}

// 4
img{
    box-sizing: border-box;
    padding: 0 90px;
}

// 5. 动画样式优先级高于 important
img {
    animation: test 0s forwards;
}
@keyframes test {
    from {
        width: 300px;
    }
    to {
        width: 300px;
    }
}

// 6.zoom CSS 属性会根据 @viewport 来初始化一个缩放因数。
img {
    zoom: 0.625;
}
```


## 68.如何解决移动端 1px 像素问题？

## 73.介绍下 BFC、IFC、GFC 和 FFC?


## koa2

- 介绍koa2
- 使用过的koa2中间件
- koa2中间件原理
- koa-body原理
- 介绍自己写过的中间件
- koa原理，为什么要用koa(express和koa对比)
- 使用的koa中间件
- koa中response.send、response.rounded、response.json发生了什么事，浏览器为什么能识别到它是一个json结构或是html
- koa-bodyparser怎么来解析request

## pm2

- 介绍pm2
- master挂了的话pm2怎么处理
- pm2怎么做进程管理，进程挂掉怎么处理
- 不用pm2怎么做进程管理


## 网络

### get和post有什么区别

### 网络的五层模型

### HTTP和HTTPS的区别
### HTTPS的加密过程

- 介绍SSL和TLS
- 介绍DNS解析
- 常见Http请求头
- 通过什么做到并发请求
- 介绍http2.0
- http1.1时如何复用tcp连接
- Http报文的请求会有几个部分
- tcp3次握手
- tcp属于哪一层（1 物理层 -> 2 数据链路层 -> 3 网络层(ip)-> 4 传输层(tcp) -> 5 应用层(http)）
- http缓存控制
- 介绍下HTTP状态码
- 403、301、302是什么
- 缓存相关的HTTP请求头
- 介绍HTTPS
- HTTPS怎么建立安全通道

## 从输入URL到页面加载全过程

## linux 

- Linux 754 介绍

## js

- 介绍暂时性死区
- [1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]
- 取数组的最大值（ES5、ES6）
- ES5和ES6有什么区别
- JS是什么范式语言(面向对象还是函数式编程)
- 介绍class和ES5的类以及区别
- 介绍箭头函数和普通函数的区别
- 介绍defineProperty方法，什么时候需要用到
- for..in 和 object.keys的区别
- 介绍闭包，使用场景
- 使用闭包特权函数的使用场景
- 介绍ES6的功能
- let、const以及var的区别
- 浅拷贝和深拷贝的区别
- 介绍箭头函数的this
- 对闭包的理解
- 工程中闭包使用场景
- 介绍this和原型
- 使用原型最大的好处
- 介绍localstorage的API
- 如何处理异常捕获
- 项目如何管理模块
- JS继承方案
- 如何判断一个变量是不是数组
- 变量a和b，如何交换
- 多个标签生成的Dom结构是一个类数组
- 类数组和数组的区别
- dom的类数组如何转成数组
- 介绍闭包
- 闭包的核心是什么
- JS的继承方法
- cookie的引用为了解决什么问题
- cookie和localStorage的区别
- 使用canvas绘图时如何组织成通用组件
- formData和原生的ajax有什么区别
- 介绍下表单提交，和formData有什么关系
- 怎么实现this对象的深拷贝
- 介绍this各种情况
- == 和 ===的区别，什么情况下用相等==
- bind、call、apply的区别
- ES6中的map和原生的对象有什么区别
- 介绍下原型链（解决的是继承问题吗）
- sum(2, 3)实现sum(2)(3)的效果
- 两个对象如何比较
- JS的原型
- 变量作用域链
- call、apply、bind的区别
- 防抖和节流的区别
- ES6新的特性
- 说一下闭包
- prototype和——proto——区别
- _construct是什么
- new是怎么实现的
- localStorage和cookie有什么区别
- 介绍原型链
- 如何继承
- 介绍JS数据类型，基本数据类型和引用数据类型的区别
- Array是Object类型吗
- 数据类型分别存在哪里
- var a = {name: "前端开发"}; var b = a; a = null那么b输出什么
- var a = {b: 1} 存放在哪里
- var a = {b: {c: 1}}存放在哪里
- 栈和堆的区别
- 垃圾回收时栈和堆的区别
- 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
- 栈和堆具体怎么存储
- 介绍闭包以及闭包为什么没清除
- 闭包的使用场景
- JS执行过程中分为哪些阶段
- 词法作用域和this的区别
- 平常是怎么做继承
- 深拷贝和浅拷贝
- loadsh深拷贝实现原理
- ES6中let块作用域是怎么实现的
- JS变量类型分为几种，区别是什么
- 手写数组去重函数
- 手写数组扁平化函数
- 对闭包的看法，为什么要用闭包
- 前端怎么控制管理路由
- 使用路由时出现问题如何解决
- 柯里化函数两端的参数具体是什么东西

- 随机值存在一样的情况，如何避免?
加时间戳

## 事件

- 浏览器事件流向
- 事件委托
- 介绍事件代理以及优缺点
- some、every、find、filter、map、forEach有什么区别
- 上述数组随机取数，每次返回的值都不一样
- 如何找0-5的随机数，95-99呢
- 页面上有1万个button如何绑定事件
- 如何判断是button
- 页面上生成一万个button，并且绑定事件，如何做（JS原生操作DOM）
- 循环绑定时的index是多少，为什么，怎么解决
- 页面上有一个input，还有一个p标签，改变input后p标签就跟着变化，如何处理
- 监听input的哪个事件，在什么时候触发
- React的事件机制（绑定一个事件到一个组件上）
- 介绍下事件代理，主要解决什么问题

## 性能优化

- 前端性能优化
- 304是什么
- 整个前端性能提升大致分几类
- 用户体验做过什么优化
- 前端性能优化（JS原生和React）
- 前端性能优化（1js css；2 图片；3 缓存预加载； 4 SSR； 5 多域名加载；6 负载均衡）
- 并发请求资源数上限（6个）
- base64为什么能提升性能，缺点
- 介绍webp这个图片文件格式
- 介绍service worker

## 异步

- 介绍异步方案
- Promise 和 async/await 和 callback的区别
- Promise有没有解决异步的问题（promise链是真正强大的地方）
- Promise和setTimeout的区别（Event Loop）
- 介绍Promise和then
- promise、async有什么区别
- 介绍Promise，异常捕获
- 介绍下Promise，内部实现
- 如何设计Promise.all()
- 使用Async会注意哪些东西
- Async里面有多个await请求，可以怎么优化（请求是否有依赖）
- Promise和Async处理失败的时候有什么区别
- 介绍下Promise的用途和性质
- Promise和Callback有什么区别
- 介绍Promise
- Promise有几个状态
- promise的精髓，以及优缺点
- JS怎么实现异步
- 异步整个执行周期
- Async/Await怎么实现
- Promise和setTimeout执行先后的区别
- JS为什么要区分微任务和宏任务
- Promise构造函数是同步还是异步执行，then呢
- Promise.all实现原理
- 介绍Promise的特性，优缺点
- promise如何实现then处理
- promise里面和then里面执行有什么区别
- setInterval需要注意的点
- 定时器为什么是不精确的
- setTimeout(1)和setTimeout(2)之间的区别
- 介绍宏任务和微任务
- JS异步解决方案的发展历程以及优缺点
- 对async、await的理解，内部原理

## 算法

- 介绍冒泡排序，选择排序，冒泡排序如何优化
- 介绍快速排序
- 算法：前K个最大的元素
- 项目中树的使用场景以及了解
- 介绍排序算法和快排原理
- 如何判断链表是否有环
- 介绍二叉搜索树的特点
- 项目中如何应用数据结构
- 介绍下DFS深度优先

## 跨域

- 介绍下浏览器跨域
- 怎么去解决跨域问题
- jsonp方案需要服务端怎么配合
- Ajax发生跨域要设置什么（前端）
- 加上CORS之后从发起到请求正式成功的过程
- 跨域怎么解决，有没有使用过Apache等方案
- Access-Control-Allow-Origin在服务端哪里配置
- csrf跨站攻击怎么解决
- ajax如何处理跨域
- CORS如何设置
- 介绍同源策略
- jsonp为什么不支持post方法

## 小程序

- 小程序里面开页面最多多少  < 10  做了限制

## 设计模式

- 介绍下观察者模式
- 观察者和发布订阅的区别，各自用在哪里
- 观察者模式里面使用的数据结构(不具备顺序 ，是一个list)
- 单例、工厂、观察者项目中实际场景
- 介绍中介者模式
- 前端开发中用到哪些设计模式
- React/Redux中哪些功能用到了哪些设计模式

## 内存泄露

- 介绍垃圾回收
- 添加原生事件不移除为什么会内存泄露
- 还有哪些地方会内存泄露
- JS里垃圾回收机制是什么，常用的是哪种，怎么处理的

## 项目

- 遇到的复杂业务场景  火车票里的三种状态
- 什么是单页项目
- 使用过程中遇到的问题，如何解决的
- 网站SEO怎么处理
- 服务端怎么做统一的状态处理
- 介绍单页面应用和多页面应用
- 介绍MVP怎么组织
- 对PWA有什么了解

## webpack

### webpack 打包流程和生命周期

打包过程：
1. 初始化 option， entry-option
1. 开始编译  run

```js
// Compiler.js  经过改造，只为了让流程清晰
class Compiler{
    newCompilation(){
        const compilation = new Compilation(this)
        this.hooks.compilation.call()
    }
    compile(callback){
        this.hooks.beforeCompile.callAsync(()=>{
            this.hooks.compile.call()
            const compilation = this.newCompilation()
            this.hooks.make.callAsync(compilation, ()=>{
                compilation.finish(()=>{
                    compilation.seal(()=>{
                        this.hooks.afterCompile.callAsync(compilation, ()=>{
                            return callback(null, compilation)
                        })
                    })
                })
            })
        })
    }
    run(){
        const onCompiled = ()=>{
            this.hooks.shouldEmit.call()
            this.emitAssets(compilation, ()=>{
                this.hooks.done.callAsync(()=>{
                    this.hooks.additionalPass.callAsync(()=>{
                        this.compile(onCompiled)
                    })
                })
            })
        }
        this.hooks.beforeRun.callAsync(()=>{
            this.hooks.run.callAsync(()=>{
                this.compile(onCompiled)
            })
        })
    }
}
```

1. make:  从 entry 开始递归的分析依赖，对每个依赖模块进行 build
1. before-resolve: 对模块位置进行解析
1. build-module: 使用 loader 加载文件并开始构建某个模块
1. normal-module-loader: 对 loader 加载对文件用 acron 编译，生成 AST 树
1. program: 遍历 AST，当遇到 require 等一些调用表达式时，收集依赖
1. seal: 所有依赖 build 完成，开始优化（抽取公共模块，加 hash）
1. emit: 输出到 dist 目录

生命周期

compiler hooks 流程相关
- (before-)run
- (before-/after-)compile
- make
- (after-)emit
- done

监听相关
- watch-run
- watch-close

compilation hooks
compiler 也会调用 compilation 生命周期方法
addEntry -> addModuleChain
finish 模块错误上报
seal 构建完后资源的生成和优化


ModuleFactory会创建
NormalModuleFactory
ContextModuleFactory

Module 下有五种
NormalModule  普通模块
    - 使用loader-runner 运行 loaders
    - 通过 Parser 解析，内部是 acron，解析出 require 依赖
    - ParserPlugins 添加依赖
ContextModule ./src/a 带路径的
ExternalModule  module.exports = jQuery
DelegatedModule  manifest
MultiModule      entry:['a','b']

- 使用 webpack 构建时有无做一些自定义操作? 

之前将 vue-cli 的单页配置改为多页配置。

- webpack里面的插件是怎么实现的?

插件机制是通过 tapable 实现的，它类似 node 里的 EventEmitter。

- 抽取公共文件是怎么配置的?

```js
optimization:{
    splitChunks: {
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2
            }
        }
    }
}
```

- `import { Button } from 'antd'` ，打包的时候只打包button，分模块加载，是怎么做到的

- loader 和 plugin 有什么区别

loader 主要是加载资源，转换资源。plugin 主要是扩展 webpack 功能，更强大。

- 介绍AST（Abstract Syntax Tree）抽象语法树

AST 抽象语法树是对源代码的一种抽象。将源代码抽象成树状结构，像 babel，场景的 ast 库有 babylon。之前模仿过一个四则运算的解析器。

- 使用过webpack里面哪些 plugin 和 loader ?

HtmlWebpackPlugin
CleanWebpackPlugin
TerserWebpackPlguin
DllPlugin
CommonsChunkPlugin
SplitChunksPlugin
HotModuleReplacementPlugin
MiniCssExtractPlugin
UglifyjsWebpackPlugin

- 一般怎么组织CSS（Webpack）

专门建一个 css 目录，通过`import`入口文件，通用样式放在入口文件中，按照模块添加样式文件，组件内文件放在 .vue 文件中。

- webpack和gulp的优缺点

gulp 是基于任务的，可以自动化完成一些任务，但是它没有解决模块化和打包的问题。
webpack 目的就是打包，支持各种模块化开发。

- webpack 配 sass 需要哪些 loader?

css-loader、less-loader、style-loader(或者 MiniCssExtractPlugin 将 css 提取出来)

- 如何配置把js、css、html单独打包成一个文件。

html 通过 HtmlWebpackPlugin 生成。css 通过 style-loader 或 html-inline-css-webpack-plugin 插件，可以嵌入到 html 中。
可以使用 raw-loader 在 html 模版里嵌入 html 和 js 文件。

```
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```

## vue

- 虚拟DOM主要做了什么
- 虚拟DOM本身是什么（JS对象）

## react

- React声明周期及自己的理解
- 如何配置React-Router
- 服务端渲染SSR
- 介绍路由的history
- 介绍react优化
- redux请求中间件如何处理并发

## redux

- 介绍Redux数据流的流程

## css

### 介绍flex布局

### 介绍css3中position:sticky

- 介绍position属性包括CSS3新增

### 清除浮动

## 浏览器

### 居中为什么要使用transform（为什么不使用marginLeft/Top）

- 定位问题（绝对定位、相对定位等）
- transform动画和直接使用left、top改变位置有什么优缺点
- 动画的了解
- CSS选择器有哪些
- 盒子模型，以及标准情况和IE下的区别
- 如何实现高度自适应
- 如何实现H5手机端的适配
- rem、flex的区别（root em）
- em和px的区别
- 两个元素块，一左一右，中间相距10像素
- 上下固定，中间滚动布局如何实现

## 安全

### 项目中如何处理安全问题
### 介绍css，xsrf
### xsrf跨域攻击的安全性问题怎么防范
### 对安全有什么了解
### 介绍下数字签名的原理

## ajax

- 文件上传如何做断点续传
- 表单可以跨域吗
- 异步请求，低版本fetch如何低版本适配
- 前端和后端怎么联调

## cookie session

- cookie放哪里，cookie能做的事情和存在的价值
- cookie和token都存放在header里面，为什么只劫持前者
- cookie和session有哪些方面的区别


## 300.前端怎么做单元测试

## html

- html语义化的理解
- `<b>`和`<strong>`的区别

## 防抖

- 搜索请求如何处理（防抖）

## 虚拟DOM

- 介绍虚拟DOM
- 为什么虚拟DOM比真实DOM性能好
- 渲染的时候key给什么值，可以使用index吗，用id好还是index好

## rn

- RN有没有做热加载
- RN遇到的兼容性问题
- RN如何实现一个原生的组件
- RN混原生和原生混RN有什么不同
- RN的原理，为什么可以同时在安卓和IOS端运行
- RN如何调用原生的一些功能
- 介绍RN的缺点
- RN和原生通信
- 如何做RN在安卓和IOS端的适配
- RN为什么能在原生中绘制成原生组件（bundle.js）
- native提供了什么能力给RN
- 安卓Activity之间数据是怎么传递的
- 安卓4.0到6.0过程中WebView对js兼容性的变化
- WebView和原生是如何通信

## 进程和线程

- 进程和线程的区别（一个node实例就是一个进程，node是单线程，通过事件循环来实现异步）

## node

- node接口转发有无做什么优化
- node起服务如何保证稳定性，平缓降级，重启等
- node文件查找优先级

## npm2和npm3+有什么区别

## react

- 有没有涉及到Cluster
- 如何和MySQL进行通信
- 路由的动态加载模块
- Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理
- 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
- 使用过的Redux中间件
- 介绍redux，主要解决什么问题
- 搜索请求中文如何请求
- React组件中怎么做事件代理
- React组件事件代理的原理
- React怎么做数据的检查和变化
- react-router怎么实现路由切换
- react-router里的`<Link>`标签和`<a>`标签有什么区别
- `<a>`标签默认事件禁掉之后做了什么才实现了跳转
- React层面的性能优化
- React中Dom结构发生变化后内部经历了哪些变化
- React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，- 怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
- key主要是解决哪一类的问题，为什么不建议用索引index（重绘）
- Redux中异步的请求怎么处理
- Redux中间件是什么东西，接受几个参数（两端的柯里化函数）
- 中间件是怎么拿到store和action，然后怎么处理
- state是怎么注入到组件的，从reducer到组件经历了什么样的过程
- redux的设计思想
- 接入redux的过程
- 绑定connect的过程
- connect原理
- react异步渲染的概念,介绍Time Slicing 和 Suspense
- 16.X声明周期的改变
- 16.X中props改变后在哪个生命周期中处理
- 介绍纯函数
- pureComponent和FunctionComponent区别
- 介绍JSX
- 如何设计一个localStorage，保证数据的实效性
- 介绍高阶组件
- react性能优化
- react生命周期
- 介绍Fiber
- 介绍DOM树对比
- react中的key的作用
- 如何设计状态树
- shouldComponentUpdate是为了解决什么问题
- 如何解决props层级过深的问题
- Redux在状态管理方面解决了React本身不能解决的问题
- Redux有没有做过封装
- react生命周期，常用的生命周期
- 对应的生命周期做什么事
- 遇到性能问题一般在哪个生命周期里解决
- 怎么做性能优化（异步加载组件...）
- 写react有哪些细节可以优化
- React子父组件之间如何传值
- Emit事件怎么发，需要引入什么
- 介绍下React高阶组件，和普通组件有什么区别
- 一个对象数组，每个子对象包含一个id和name，React如何渲染出全部的name
- 其中有几个 name 不存在，通过异步接口获取，如何做
- 对React看法，有没有遇到一些坑
- React生命周期
- componentWillReceiveProps的触发条件是什么
- React16.3对生命周期的改变
- 介绍下React的Filber架构
- 画 Filber 渲染树
- 介绍React高阶组件
- 父子组件之间如何通信
- Redux怎么实现属性传递，介绍下原理
- React-Router版本号
- 前后端通信使用什么方案
- RESTful 常用的 Method
- React声明周期
- 如何去除url中的#号
- Redux状态管理器和变量挂载到window中有什么区别
- 如何实现异步加载
- 如何实现分模块打包（多入口）
- React使用过的一些组件
- 介绍 Immuable
- 介绍下redux整个流程原理
- React中setState后发生了什么
- setState为什么默认是异步
- setState什么时候是同步的
- 为什么3大框架出现以后就出现很多native（RN）框架（虚拟DOM）
- a，b两个按钮，点击aba，返回顺序可能是baa，如何保证是aba（Promise.then）
- 介绍Redux
- 堆和栈的区别
- 介绍redux接入流程
- rudux和全局管理有什么区别（数据可控、数据响应）
- 常用的中间件
- 如何对相对路径引用进行优化
- knex连接数据库响应回调
- redux状态树的管理
- react设计思路
- react常见的通信方式
- redux整体的工作流程
- redux和全局对象之间的区别
- Redux数据回溯设计思路
- react生命周期
- react性能优化
- 介绍pureComponet
- 介绍Function Component
- React数据流
- props和state的区别
- 介绍react context
- React15/16.x的区别
- 重新渲染render会做些什么
- 哪些方法会触发react重新渲染
- state和props触发更新的生命周期分别有什么区别
- setState是同步还是异步
- 对无状态组件的理解
- 介绍Redux工作流程
- 对react看法，它的优缺点
- react的理念是什么（拿函数式编程来做页面渲染）




