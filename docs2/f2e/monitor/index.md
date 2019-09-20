---
title: 前端监控
sidebar_label: 前端监控
---

前端监控主要是监控：

- 用户行为
- 性能监控
- 错误收集
- 上报

## domReady

domReady 实际是 DOM 加载完成，图片等链接资源正在加载中。onload 表示资源都已经加载完毕，如果有资源错误，则会阻塞延迟 onload 的执行。

**如何判断domReady**

1. document.readyState 有三个状态：`loading/正在加载`、`interactive/可交互,图片、框架资源正在加载`、`complete/完成`。当这个属性值变化时，会触发`readystatechange`事件。
2. document 的 DOMContentLoaded 事件

## 简介

前端监控，可以让我们及时发现线上出现的问题，根据出现问题时的场景，更快的解决它。还可以搜集用户行为，从而为用户提供更好的体验。总的来说，有了线上的监控数据统计，我们才能在问题和需求上制定更好的方案。

## 监控哪些数据

监控数据主要是围绕着用户、性能和错误来展开。需要监控的数据有：

- 用户和用户行为
    - 流量来源 url(百度、google、广告等)、去向 url
    - 客户端信息(操作系统、浏览器、分辨率、ip、地域、网络类型等)
    - pv/uv、访问深度、访问路径、时间
    - 点击量（总的、人均）、点击热力图、点击时间
- 性能
    - 白屏时间
    - 首屏时间
    - 用户可操作时间
    - 页面总下载时间
    - 自定义的时间(开发者关注的)
- 错误
    - 错误的堆栈信息
    - 发生错误时的环境(浏览器信息、网络等)
- 其它自定义
    - 对特殊功能的支持程度(canvas)
    - 轮播图的翻页次数

## 用户和行为监控

### 用户行为路径
### 打点监控

一般监控 pv/uv 停留时长  流量来源 用户交互

监控访问的思路是：

手写埋点: 手动插入代码，灵活，但是工作量大。
无埋点：统计所有事件，定时上报，简单，但是后期需要过滤所需的数据。

### 大量log上报策略

有2个策略:
1. 前端根据配置文件，根据 random 抽取百分比上传
2. 全部上传给后端，后端忽略掉一些

### 时效策略


## 性能监控

性能优化是建立在性能监控前提之上的，只有统计了数据，才能对比优化前后是否达到了预期。具体查看另外一篇文章 [性能体系的建立](/docs/f2e/performance/index)。

## 错误监控

错误监控首先需要收集错误，然后对错误再进行上报，下面来看看常见的错误有哪些:

1. 脚本错误，分为语法错误和运行时错误。
1. 网络加载错误
1. 页面崩溃
1. 框架错误

常见的处理方案是：

- try...catch
- window onerror事件

下面来详细看一下。

### try...catch

我们写代码，如果不保证代码正确的情况下，通常会用 try...catch 包裹起来。但是说实话，并不能保证没有包裹的代码一定是正确的。所以一般可以使用全局 try...catch 包裹来处理。现在的项目进行手动包裹不太现实，可以使用 UglifyJS 自动化处理。

try...catch 可以保证代码出错时，页面不崩溃。但是它有些问题：

1、不能处理语法错误。语法错误后，当前代码段后面的代码就停止执行了。

```js
try{
    var a =\ 'a' 
}catch(e){
    // 无法捕获
}
```

2、不能处理异步错误。

```js
try{
    setTimeout(()=>{
        throw new Error()
    },1000)
}catch(e){
    // 无法捕获
}
```

上面代码无法捕获错误。除非在 setTimeout 函数里 try...catch 才行。

3、代码侵入。

### window.onerror

```js
window.onerror = function(message, source, lineno, colno, error){}
```

- message: 错误信息提示
- source: 错误脚本地址
- lineno: 错误代码所在行号
- colno: 错误代码所在列号
- error: 错误对象

`window.onerror`的方式对代码侵入性小，可以捕获运行时的错误，包括异步错误。但是还是无法捕获语法错误和网络错误(网络请求异常不会事件冒泡)。

如果想要控制台不报错，需要`window.onerror`需要返回 true。

不过如果出现语法错误，当前代码段后面的代码就不执行了。

对于跨域的脚本，如第三方统计，由于安全问题，`window.onerror`不能捕获有效的异常信息，浏览器都统一返回 Script error，返回的信息如下：

```js
message: Script error.
source: 
lineno: 0
colno: 0
error: null
```

解决方法是 script 脚本设置 crossorigin 属性。然后服务器设置 HTTP 头`Access-Control-Allow-Origin`。

> 注: 可以用 [http-server](https://www.npmjs.com/package/http-server) 开2个服务进行实验，--cors 表示服务端开启`Access-Control-Allow-Origin`。

```js
<script src="http://xx.com/a.js" crossorigin="anonymous"></script>
```

然后就可以获取到错误信息了，如下：

```js
message: Uncaught ReferenceError: a is not defined
source: http://127.0.0.1:8081/index.js
lineno: 1
colno: 23
error: ReferenceError: a is not defined
    at index.js:1
```

### source map

通过上面的方法，以及可以获取到错误信息了。但是如果脚本经过压缩后，那么上面的方法返回的错误信息就很难分辨，比如代码压缩成1行，返回的行号总是1。这时就需要 source map。一些构建工具都支持。

可以开启 webpack 的 source map。

### Promise 错误

Promise 一般使用 catch 来进行捕获错误。还可以使用 ESlint 插件基于 AST 实现自动给所有 Promise 添加 catch 处理。不过最好的方式是通过`unhandledrejection`事件。

```js
window.addEventListener('unhandledrejection', e => {
    e.preventDefault()
    console.log(e.reason)
    return true
})
```

Promise 里面写语法错误不会影响外面的同步代码，因为它是异步的。上面代码中，`e.preventDefault()`可以阻止控制台的报错。

### 网络加载错误

有时候因为网络不好，资源加载时可能会导致错误。可以通过 onerror 来捕获错误。

```js
<script onerror="errorHandler(this)" src="x.js"></script>
<link href="x.css" onerror="errorHandler(this)">
```

除了上面的方法，还可以使用 window.addEventListener('error') 的方式处理。但是这里无法使用 window.onerror 进行处理，因为网络加载错误不会进行事件冒泡。而 window.addEventListener 是通过事件捕获来捕获错误的。

```js
window.addEventListener('error', e => {
    if(!e.message){
        console.log(e)
    }
}, true)
```

注意，网络加载错误时，事件对象是没有 message 信息的，这也是我们判断网络资源加载错误的条件。不过目前无法区分具体的错误类别，如404资源不存在还是服务器错误，只能配合后端日志进行排查。

### 页面崩溃错误

一个成熟的监控系统还需要监控页面崩溃和页面卡顿。监听页面崩溃可以通过监听 window 的 load 和 beforeunload 事件，并结合 sessionStorage 来实现。

```js
window.addEventListener('load', function () {
    sessionStorage.setItem('good_exit', 'pending');
    setInterval(function () {
       sessionStorage.setItem('time_before_crash', new Date().toString());
    }, 1000);
 });

 window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('good_exit', 'true');
 });

 if(sessionStorage.getItem('good_exit') &&
    sessionStorage.getItem('good_exit') !== 'true') {
    /*
       insert crash logging code here
   */
    alert('Hey, welcome back from your crash, looks like you crashed on: ' + sessionStorage.getItem('time_before_crash'));
 }
```

上面的代码，如果页面正常关闭，则会触发 beforeunload 事件，所以 good_exit 为 true，而页面崩溃时，不会触发 beforeunload 事件，所以重新访问页面时，good_exit 还是 pending，可以判断上次发生了页面崩溃。

但是上面方案有两个问题：

1. 通常页面崩溃后，用户会强制关闭网页或浏览器，再重新打开，sessionStorage 将不存在。
2. 如果用 localStorage 或 Cookie 存储，如果用户打开多个页面，但不关闭，good_exit 存储的一直都是 pending。所以新开一个网页，就会上报一次 crash。

所以，通常采用 Service Worker 实现页面崩溃的监控。Service Worker 的特点如下：

- Service Worker 有独立的线程，页面崩溃了，它一般也不会崩溃。
- Service Worker 声明周期一般比网页要长，可以用来监控网页的状态。
- 网页可以通过 navigator.serviceWorker.controller.postMessage 向掌管自己的 SW 发送消息。

### 框架的错误处理

React 16 之前，使用 unstable_handleError 来处理，React 16 之后，使用 componentDidCatch 来处理错误。

Vue 提供了 Vue.config.errorHandler 来处理错误。如果开发者没使用它捕获错误，错误会以 console.error 方式输出。我们可以劫持 console.error 进行自己的处理。

```js
const nativeConsoleError = window.console.error
window.console.error = (...args) => nativeConsoleError.apply(this, [args])
```

### Ajax 错误

ajax 请求错误可以通过 xhr 的 error 事件进行处理。

## 上报

收集到了性能数据和错误信息，就需要上报了。上报的方案是：

### 使用独立域名

因为浏览器会限制同一个域名的请求并发数量，并且使用独立域名(服务器)，可以减轻主业务服务器压力。

###  Image src

首先如果使用了独立域名，则有跨域问题，而 Image 的 src 是没有跨域的。

```js
let url = 'xxx?data=' + JSON.stringify(data)
let img = new Image()
img.src = url
```



### 上报时机

页面加载性能数据可以再页面稳定后上报。对于错误的上报，如果日志量很大，则可以合并后统一时间上报。

一般的场景是：

1. 页面加载和重新刷新。
1. 页面路由切换。
1. 页面 Tab 变为可见。通过 webkitvisibilitychange 事件和 document.hidden 来判断。
1. 页面关闭。

```js
// 关闭窗口前执行 
window.onbeforeunload = function(event){
    return '确定离开此页面？'
}
// 关闭窗口后执行
window.onunload = function(event){
    return '确定离开此页面？'
}
```

但是如果在页面离开时上报，那么页面卸载时不能保证数据安全的发送。如果使用同步 ajax，又会对页面流畅度和用户体验造成影响。

推荐使用 [sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon) 方法。它可以用来向服务器发送 post 请求，特点是：异步，页面卸载也可靠。

```js
window.addEventListener('unload', log, false)
function log(){
    navigator.sendBeacon('/log', data)
}
```

所以，如果数据小(url 长度是有限制的)使用 Image 上传，数据量太大就使用 sendBeacon，如果不兼容，就使用 ajax post。

```js
const reportData = url => {
    // ...
    if (urlLength < 2083) {
        imgReport(url, times)
    } else if (navigator.sendBeacon) {
        sendBeacon(url, times)
    } else {
        xmlLoadData(url, times)
    }
}
```

最后，如果页面访问量太多，错误发送的信息太多，可以设置采集率。

```js
const reportData = url => {
    // 只采集 30%
    if (Math.random() < 0.3) {
        send(data)
    }
}
```

### 单页应用上报

如果切换路由是通过 hash 来实现的，则只需要监听 hashchange 事件。如果通过 history API，那么需要使用 pushState 和 replaceState 事件。

可以使用下面的方法：

```js
const patchMethod = type => 
    () => {
       const result = history[type].apply(this, arguments)
       const event = new Event(type)
       event.arguments = arguments
       window.dispatchEvent(event)
       return result
       }

history.pushState = patchMethod('pushState')
history.replaceState = patchMethod('replaceState')

window.addEventListener('replaceState', e => {
    // report...
})
window.addEventListener('pushState', e => {
    // report...
})
```

## 监控系统设计

监控系统分为：采集、存储、分析过滤、上报四个阶段。

数据上报，可以借助 http2 持续优化。

接口方面：可以识别流量高峰，动态设置采集率。对垃圾信息进行过滤。通过配置减少业务接入成本。短时间相同错误过滤。

后台设置阈值进行邮件或短信提醒。业界流行 [3-sigma](https://baike.baidu.com/item/3%CF%83%E5%87%86%E5%88%99/9361985) 阈值设置。



## 参考资料


- [打造自己前端监控系统之一：性能信息采集](https://zhyjor.github.io/2018/01/17/%E6%89%93%E9%80%A0%E8%87%AA%E5%B7%B1%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F%E4%B9%8B%E4%B8%80%EF%BC%9A%E6%80%A7%E8%83%BD%E4%BF%A1%E6%81%AF%E9%87%87%E9%9B%86/)
- [打造自己前端监控系统之二：实战篇](https://zhyjor.github.io/2018/01/18/%E6%89%93%E9%80%A0%E8%87%AA%E5%B7%B1%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F%E4%B9%8B%E4%BA%8C%EF%BC%9A%E5%AE%9E%E6%88%98%E7%AF%87/)
- [2018你应该知道的Web性能信息采集指南](https://juejin.im/post/5b9214c2f265da0aeb70e36e)
- [把前端监控做到极致](https://juejin.im/post/5a52f138f265da3e5b32a41b)
- [https://www.w3.org/TR/performance-timeline-2/#dom-performance](https://www.w3.org/TR/performance-timeline-2/#dom-performance)
- [web 埋点实现原理了解一下](https://segmentfault.com/a/1190000014922668)
- [JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
- [Using source maps](https://webpack.js.org/guides/development/#using-source-maps)
- [如何监控网页的卡顿？](https://zhuanlan.zhihu.com/p/39292837)
- [如何监控网页的崩溃? ](https://zhuanlan.zhihu.com/p/40273861)
- [前端异常监控解决方案研究 ](https://cdc.tencent.com/2018/09/13/frontend-exception-monitor-research/)
- [解密 ARMS 前端监控数据上报技术内幕](https://zhuanlan.zhihu.com/p/37275225)
- [别再让你的 Web 页面在用户浏览器端裸奔](https://mp.weixin.qq.com/s/Z8daa96JD5NbjTPn9mGPPg)
- [浏览器端 JS 异常监控探索与实践](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247485669&idx=1&sn=a4d4aee73b606d412aba71abafb88325&source=41#wechat_redirect)
- [重学前端](https://time.geekbang.org/column/article/94156)