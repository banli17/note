---
title: BetterJS异常监控实战
---

Better 是腾讯开源的一个前端异常监控解决方案。其中包括下面几个库：

- `badjs-report`：用来将前端异常日志上报给服务端

## badjs-report

**参考内容**

- github 库地址：[badjs-report](https://github.com/BetterJS/badjs-report)
- [Script Error](https://github.com/BetterJS/badjs-report/issues/3)
- [什么是 offlineLog ?](https://github.com/BetterJS/badjs-report/issues/25)

这个库能够监控 js 语法和运行报错，异步报错(如 setTimeout 里的代码)以及跨域资源的报错。

**1. 首先安装库**

```javascript
npm i badjs-report
// bower install https://github.com/BetterJS/badjs-report.git
// ego install badjs-report --save
```

dist 目录下有 2 类文件:

- `bj-report.js`：改写了 window.onerror，能捕获 js 语法错误和运行期的错误，不过语法错误会导致后续代码不执行，所以需要 try...catch。
- `bj-report-tryjs.js`：将运行的代码包裹一层 try...catch

**2. 初始化配置**

```javascript
// 初始化
BJ_REPORT.init({
  id: 1, // 上报 id, 不指定 id 将不上报
  uin: 123, // 指定用户 id, (默认已经读取 qq uin)
  delay: 1000, // 当 combo 为 true 可用，延迟多少毫秒，合并缓冲区中的上报（默认）
  url: "//badjs2.qq.com/badjs", // 指定上报地址
  ignore: [/Script error/i], // 忽略某个错误
  random: 1, // 抽样上报，1~0 之间数值，1为100%上报（默认 1）
  repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报)
  // 避免出现单个用户同一错误上报过多的情况
  onReport: function (id, errObj) {}, // 当上报的时候回调。 id: 上报的 id, errObj: 错误的对象
  submit: null, // 覆盖原来的上报方式，可以自行修改为 post 上报等
  ext: {}, // 扩展属性，后端做扩展处理属性。例如：存在 msid 就会分发到 monitor,
  offlineLog: false, // 是否启离线日志 [默认 false]
  offlineLogExp: 5, // 离线有效时间，默认最近5天
});
```

BJ_Report 是重写了 window.onerror 进行上报的，无需编写任何捕获错误的代码。

如果需要手动上报，可以使用下面的 report 方法：

```javascript
BJ_REPORT.report("error msg");

BJ_REPORT.report({
  msg: "xx load error", // 错误信息
  target: "xxx.js", // 错误的来源js
  rowNum: 100, // 错误的行数
  colNum: 100, // 错误的列数
});

try {
  // something throw error ...
} catch (error) {
  BJ_REPORT.report(e);
}
```

当然还可以延迟上报。

```javascript
BJ_REPORT.push("error msg");

BJ_REPORT.push({
  msg: "xx load error", // 错误信息
  target: "xxx.js", // 错误的来源js
  rowNum: 100, // 错误的行数
  colNum: 100, // 错误的列数
});

BJ_REPORT.report();
```

**3.上报离线日志**

用户 pv 太高时，频繁的上报日志会影响用户流量，浪费存储，对服务器有压力。所以有需要的话可以使用 offlinelog 离线日志。

- info、error、debug 上报过多会造成流量的浪费，而且在弱网络下面还会造成流失。
- info 和 offlineLog 的区别在于 info 不仅会记录离线日志，同时也会实时上报

所以建议每个小时高于 500 左右的上报量，可以建议采用 offlineLog ，而且我们推荐你使用 offlienLog 详细记录用户的操作日志，便于后面排查问题

offloneLog 使用浏览器的 indexdb 进行存储日志的，badjs-report 的所有上报都会记录到离线日志中。而且有效期默认是最近 5 天，所以用户不用担心用户本地的日志过多。

```javascript
BJ_REPORT.reportOfflineLog();
```

用法如下：

```
//初始化
BJ_REPORT.init({id: 1})
BJ_REPORT.init({
    offlineLog: true  // 默认是false，需要设置为true
})

//主动上报错误日志
BJ_REPORT.report("error msg 2");

//info上报，用于记录操作日志
BJ_REPORT.info("info");

//可以结合实时上报，跟踪问题; 不存入存储
BJ_REPORT.debug("debug");

//记录离线日志
BJ_REPORT.offlineLog("offlineLog");
```

**4.异步代码、库文件和跨域 js 报错**

我们知道 window.onerror 不能捕获异步代码，如 setTimeout 里的报错。还有跨域 js 报错也无法捕获。这时就需要使用`bj-report-tryjs.js`了。它是将这些方法改写包裹了 try...catch。

```javascript
// 包裹 js 的 setTimeout , setInterval 方法
BJ_REPORT.tryJs().spySystem();

// 包裹 jquery 的 event.add , event.remove , event.ajax 这几个异步方法。
BJ_REPORT.tryJs().spyJquery();

// 包裹 模块化框架 的 define , require 方法
BJ_REPORT.tryJs().spyModules();

//自动运行 SpyJquery , SpyModule , SpySystem
BJ_REPORT.tryJs().spyAll();

// 包裹自定义代码
var customFunction = function () {};
customFunction = BJ_REPORT.tryJs().spyCustom(customFunction);

// 只会包裹 customOne  , customTwo
var customObject = {
  customOne: function () {},
  customTwo: function () {},
  customVar: 1,
};
BJ_REPORT.tryJs().spyCustom(customObject);
```

比如我引入了跨域资源`xx.com/1.js`。代码如下。

```javascript
// xx.com/1.js
var fn = function (callback) {
  callback();
};
```

我的 html 文件如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <script src="http://banli.4vtk.com/1.js"></script>
    <script>
      window.onerror = function (msg) {
        console.log(msg);
      };
      fn("hi");
    </script>
  </body>
</html>
```

如果不使用`badjs-report`上面的代码只会报错`Script error`。

![](./imgs/script-error.png)

但是加入`badjs-report`后，它就能捕获到具体的错误了。

```html
<script src="../../node_modules/badjs-report/dist/bj-report.js"></script>
<script src="../../node_modules/badjs-report/dist/bj-report-tryjs.js"></script>
<script>
  BJ_REPORT.init({
    id: 1,
    url: "//badjs2.qq.com/badjs",
    uin: 123,
    repeat: 1,
  });
  BJ_REPORT.tryJs().spySystem();
</script>
<script src="http://banli.4vtk.com/1.js"></script>
<script>
  BJ_REPORT.tryJs().spyCustom(fn)();
</script>
```

![](./imgs/script-error1.png)

## 参考资料

- [脚本错误量极致优化-监控上报与 Script error](http://www.alloyteam.com/2017/03/jserror1/)
- [脚本错误量极致优化-让脚本错误一目了然](http://www.alloyteam.com/2017/05/jserr2/)
- https://github.com/BetterJS/badjs-report
- [Script error](https://github.com/BetterJS/badjs-report/issues/3)
- [前端代码异常监控实战](https://github.com/happylindz/blog/issues/5)
- [badjs](https://betterjs.github.io/)
- [前端相关数据监控](http://www.alloyteam.com/2014/03/front-end-data-monitoring/)
- [JSTracker：前端异常数据采集](http://taobaofed.org/blog/2015/10/28/jstracker-how-to-collect-data/)

## 可能的错误有那些？

- js 脚本错误
- 静态资源加载错误
- ajax 失败 404

## 目的

1. onerror 捕获 JavaScript 异常，对应跨域检测也有方案；
2. addEventListener('error', handler, true)来捕获静态资源异常，包括 js、img、css 等；
3. Resource Timing API 和 Performance Timing API 来进行性能检测和内存检测；
4. 扩展 XHR 原型，检测返回的状态码，如 404 等，来检测 ajax 请求失败、错误；
5. 通过正则匹配等方式去检测 DOM 结构的合法性，如 ID 重复、文档类型未声明之类的；
6. 页面的死链接可以通过 Nodejs 的第三方模块，如 request 等，来检测。

## 错误监控

1、js 代码的错误分为语法错误和运行期错误。语法错误可以通过 try...catch 捕获，运行期错误可以通过 window.onerror 捕获。

```javascript
window.onerror = function (msg, url, row, col, error) {};
```

2、try...catch 捕获不到异步错误，如 setTimeout。

3、错误的上报主要有 2 种方式：ajax 和 Img 标签。

```javascript
function report() {
  var reportUrl = "http://localhost:8055/report";
  new Image().src = reportUrl + "?msg=" + msg;
}
```

4、window.onerror 对于跨域脚本，浏览器只会返回 Script error 字符串。

优化的方式有 2 种：1、同源化，但是内联无法利用文件缓存，外链又无法充分利用 cdn 了。2、跨域资源共享(cors)。需要开启 script 标签的 crossorigin 属性，它会在请求头发送 Origin 字段。同时后端需要设置`Access-Control-Allow-Origin:*`属性以支持。

如果后端是指定某个域可以访问，则响应头还需要加上`Vary：Origin`，它会根据域名来进行缓存。如果不加 Vary，会存在错误命中缓存的问题。

![](./imgs/error.png)

```javascript
app.use(function* (next) {
  // 拿到请求头中的 Origin
  var requestOrigin = this.get("Origin");
  if (!requestOrigin) {
    // 不存在则忽略
    return yield next;
  }

  // 设置 Access-Control-Allow-Origin: Origin
  this.set("Access-Control-Allow-Origin", requestOrigin);

  // 设置 Vary: Origin
  this.vary("Origin");
  return yield next;
});
```

5. 压缩的 js 错误定位。使用 SourceMap。SourceMap 是一个信息文件，存储着源文件的信息及源文件与处理后文件的映射关系。

SourceMap 文件中的 sourcesContent 字段对应源代码内容，不希望将 SourceMap 文件发布到外网上，而是将其存储到脚本错误处理平台上，只用在处理脚本错误中。

![](./imgs/sourcemap.jpg)

## 错误的采集

1. `window.onerror`可以捕获到页面中的语法错误，和运行期错误。不过语法错误不能和`window.onerror`在同层。可以拿到出错的信息，堆栈，出错的文件，行列号。跨域资源需要添加`crossorigin`属性，后台添加。
2. `try...catch`捕获到的错误不会上报到`window.onerror`。无法捕获语法错误。需要把所有 function 块都加上`try...catch`，很麻烦。
3. 像 Vue，React 这样的框架都有自己捕获错误的方法
4. 跨域的 js 报错，`window.onerror`只会捕获到`Script error`的错误，获取不到详细信息
5. 请求接口的错误。

发送错误可以直接使用 new Image()，设置 src 即可。

## 日志

后端写入日志。

## 分析

crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要 cookie 和 HTTP 认证信息。如果设为 crossorigin="use-credentials"，就表示浏览器会上传 cookie 和 HTTP 认证信息，同时还需要服务器端打开 HTTP 头信息 Access-Control-Allow-Credentials。

## crossorigin 的作用

crossorigin 可以控制对内容的 CORS 访问，可以只运行某些站访问本站的资源文件。

默认情况下没有 crossorigin，对于跨域的 js、audio、图片资源等，脚本报错通过 window.onerror 只会捕获到`Script error.`。HTTP 请求头没有`Origin`。

h5 规定可以运行本地获取跨域脚本错误信息，但是有 2 个条件。1

1. 加了 crossorigin，则空字符不识别都会认为是`anonymous`
2. 服务端必须要配置`Access-Control-Allow-Origin`。否则跨域错误。`Origin`会带在 HTTP 请求头上。服务端可以验证判断是否返回资源。

- `anonymous`
- `use-credentials`

![](./imgs/crossorigin1.png)

`integrity`字段用来验证资源的哈希值。不匹配则 js 不会被浏览器执行，这样可以防止恶意篡改资源。

## SourceMap 原理

http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

## 报警

前端异常监控系统的落地 https://zhuanlan.zhihu.com/p/26085642

- [ES6 手册](https://qiutc.me/post/es6-cheatsheet.html)
- [Chrome 开发者工具系列](http://www.cnblogs.com/constantince/category/712675.html)
- [Chrome 控制台不完全指南](http://www.cnblogs.com/Wayou/p/chrome-console-tips-and-tricks.html)
- [Chrome Devtools Cheatsheet](http://anti-code.com/devtools-cheatsheet/)

## 资源的合并与压缩

- 减少 http 请求数量和减少请求资源大小
- 掌握压缩与合并的原理

web 前端本质是一种 GUI 软件，但是它的特点是线上请求。

BS 和 CS 的区别是：CS 打包，安装时解压。BS 是远程请求增量加载的，受网络的影响。如果让资源更快的加载。

了解了浏览器请求从发送到返回都经历了什么，就知道从哪些点去优化。

![](./1/1.png)

1. dns 缓存
2. 网络请求：
   - 对于静态资源用 cdn 一般不需要 cookie，但是如果 cdn 和主站域名一样，请求时会带 cookie，这个是不需要的，所以 cdn 域名要不一样
   - 网络请求走最近的网络环境
   - 对于接口，用浏览器缓存
   - 相同静态资源缓存
   - 带宽，一个 http 请求小，返回的会更快
   - 每次都是从浏览器到服务器，都会有网络环境损耗，可以将多个 http 请求合并成一个
   - 浏览器渲染：如 vue 都是浏览器渲染，首屏会慢，所以直出

资源的合并与压缩，可以减少 http 请求数量和减少请求资源大小。

### html 压缩

删除 html 里的空格、制表符、换行符等，还有 html 注释。这些符号对程序员有用，但是对浏览器没有意义。

### css 压缩

删除注释，空格等，进行语义合并。

### js 压缩与混淆

删除无效字符，注释。代码语义的缩减(长变量替换成一个字母)和优化(重复代码)。可以代码保护。

### 文件合并

- 文件与文件之间有插入的上行请求，增加了 n-1 个网络延迟
- 丢包几率更大
- keep-alive 经过代理服务器可能会被断开

文件合并的问题：

- 首屏渲染问题，因为是客户端 js 渲染
- 缓存失效问题，比如合并为 abc 了，随便一个变化都会造成缓存失效
  - 公共库合并，大部分情况不会变
  - 不同页面的文件单独打包
  - 随机应变

## 图片优化

JPG 使用 JPEG 压缩算法，属于有损压缩，也就是牺牲图片质量的基础上进行的压缩。

png8/png24/png32 之间的区别

- png8 - 256 色 + 支持透明
- png24 - 2^24 色 + 不支持透明
- png32 - 2^24 色 + 支持透明(增加了 8 位支持透明)

如果图片颜色简单，可以使用 png8。

- jpg 有损压缩，压缩率高，不支持透明
- png 支持透明，浏览器兼容性好
- webp 压缩程度好，在 ios webview 有兼容性问题。支持透明度和动画,支持有损、无损压缩
- svg 矢量图，代码内嵌，相对较小，图片样式相对简单的场景

- sharpP

css 雪碧图：把图片合成为一张，减少了 http 请求数量。但是图片很大，如果图片加载失败，则加载比较慢，页面出来也慢。所以要保证图片不太大，也要保证失败时不影响页面。

image-inline: 转 base64，内嵌到 html 页面中，减少网站的 http 请求数量。

矢量图：svg
iconfont 解决 icon 问题

淘宝网： 对图片降级处理 https://gw.alicdn.com/tfs/TB1wx_RQFXXXXbGXFXXXXXXXXXX-250-125.png_200x200q85s150.jpg_.webp

## css 和 js 的装载和执行

一个网站是如何在浏览器端渲染的

![](./1/2.png)

- 顺序加载，并发执行
  - 词法分析
  - 并发加载
  - 并发上限:经常设置多个 cdn 域名
- 是否阻塞
  - css 阻塞：css 放在 head 中 link 会阻塞页面的渲染，所以渲染出的 html 会带有样式；否则可能会导致页面没样式->有样式闪动
  - css 阻塞 js 的执行（因为 js 可能会修改 css），css 不阻塞外部脚本的加载(有个预先扫描类)
  - https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css?hl=zh-cn
  - 直接引入的 js 会阻塞页面的渲染
  - js 不阻塞资源的加载
  - js 顺序执行，阻塞后续 js 逻辑的执行
- 依赖关系，css 放 head 里，js 放 footer 里，async 属性
- 引入方式，css 的 link import，js script src defer async

## 懒加载和预加载

### 懒加载

- 图片进入可视区域之后再请求图片资源
- 对于电商等图片很多，页面很长的业务场景适用
- 减少无效资源的加载
- 并发加载的资源过多会阻塞 js 的加载，影响网站的正常使用。因为 js 一般放在 html 的最后面，前面的图片可能会阻塞 js 的加载。

不在可视区 img 的 src，可能是一个占位符，进入可视区再修改 src，请求图片资源。 window.onscroll。

```html
// html
<img src="" data-src="" lazyload="true" />

// js
<script>
  function lazyload() {
    getBoundingClientRect;
  }

  lazyload();
  document.addEventListener("scroll", lazyload, false);
</script>
```

注意: 懒加载的图片需要占位，否则一刚开始图片都缩在可视区域，直接就加载了。

- zepto.lazyload.js

### 预加载

- 图片等静态资源在使用之前提前请求
- 资源使用时能从缓存中加载，提升用户体验
- 页面展示的依赖关系维护，比如 webgl，要资源加载完成后再渲染。

比如 h5 页面滑动到下一面时，需要预加载时 loading。比如音乐，图片等。防止影响体验。

```html
// 预加载1
<img style="display:none" src="" />

// 预加载2 var img = new Image(); img.src = ''; // 预加载3:
XMLHttpRequest()，可以判断图片是否下载成功 onprogress，但是它会有跨域的问题
```

- preload.js

https://github.com/kaola-fed/blog/issues/175
https://juejin.im/post/5b17e7f5e51d4506af2e8e42

## 重绘与回流

一个线程 -> js 执行
一个线程 -> UI 渲染

但是程是互斥的，一个执行的时候另一个是停止的。频繁的触发重绘与回流，会导致 UI 频繁渲染，导致 js 变慢。

回流 reflow: 元素尺寸，布局、隐藏等改变时就需要重新构建。

- 盒子模型属性
- 定位属性和浮动
- 改变文字结构

![](./1/4.png)

重绘 repaint: 一些元素需要更新属性，但是只是改变元素的外观，风格，不会影响布局的。

![](./1/5.png)

回流一定会重绘，重绘不会回流。

![](./1/5.png)

- 图层纬度：将频繁重绘回流的 DOM 元素单独作为一个独立图层，那么只会影响这个图层，但是图层的合成会造成很大的运算消耗。

chrome 创建图层的条件

1. 3D 或透视变换 perspective transform。
2. 使用加速视频解码的 video 节点。
3. 拥有 3D（webgl） 上下文或加速 2D 上下文的 canvas 节点。
4. 混合插件 flash
5. opactity(需要单独创建一个图层)或 css3 的变换，会开启 GPU 加速，新建图层
6. 拥有加速 css 过滤器的元素
7. 元素拥有一个复合层的后代节点
8. 元素有个 z-index 较低且包含一个复合层的兄弟元素

- gif 会频繁的重绘回流，所以把它单独做一个图层

Rendering

will-change: transform

方法：

- 用 translate 替换 top
- 用 opacity 替换 visibility
- 不要一条条修改 DOM 样式，可以定义在 class 中一次性修改
- DOM 离线修改，先把 DOM 设置为 display:none，修改好后再显示
- 不要把 DOM 节点的属性值放在循环里，比如 offsetHeight、offsetWidth，因为它会强制刷新缓冲区(浏览器有缓冲区避免频繁的回流)
- 不要使用 table，可能一个小改动会造成整个 table 布局，div 会改变后面的布局，前面已经布局好的不会改变
- 动画实现的速度选择，动画频率过高会影响性能
- 对于动画新建图层
- 启用 GPU 加速

## 缓存优化

- 理解 cache-control 所控制的缓存策略
- 理解 last-modified 和 etag 和浏览器缓存机制

### Cache-Control

http1.1

- `max-age`: 有效期，浏览器不会发请求，优先级高于 expires(http1.0)
- `s-maxage`: 指定的是 public 的缓存，优先级高于`max-age`。表示要去 public 的缓存区(cdn)拿，所以返回 304。超出了 cdn 才会去更新源服务器。
- `private`:
- `public`: cdn 就是 public 的缓存设备
- `no-cache`: 会发请求到服务端判断浏览器端缓存有没有过期。
- `no-store`: 完全不使用缓存

### Expires

缓存过期时间，告诉浏览器在过期前从浏览器缓存中读取，而无需再次请求。

### Last-Modified/If-Modified-Since

上面不知道服务端的文件更改了没有。基于客户端和服务端协商的缓存机制。每次请求时头里有 If-Modified-Since。它会和 max-age 配合，max-age 过期后才会执行。

缺点：有些文件时间改了，但内容没变。或某些服务器不能获取精确的修改时间。

### ETag/If-None-Match

- 文件的 hash 值
- 需要和 cache-control 配合

分级缓存策略

![](./1/7.png)

chrome://chrome-urls/

https://superuser.com/questions/1316540/where-has-chrome-cache-been-moved-to
https://www.nirsoft.net/utils/chrome_cache_view.html

## 学习资料

- [大公司里怎样开发和部署前端代码？](https://github.com/fouber/blog/issues/6)
- [前端工程——基础篇](https://github.com/fouber/blog/issues/10)
  https://developer.yahoo.com/performance/rules.html?guccounter=1

## 大公司里怎样开发和部署前端代码

1. 所有静态资源添加指纹作为文件名。
2. 先部署静态资源，再上线页面。

指纹做文件名好处和原因：

1. 不会覆盖原来的静态文件从而导致部署时用户页面加载错误
2. 可以强缓存，节省带宽，提高速度

静态资源优化方案：

1. 节省带宽，提高性能: 配置超长时间的本地缓存
2. 精确的控制缓存: 采用内容摘要作为缓存更新依据
3. 优化网络请求: 静态资源 CDN 部署
4. 平滑升级: 更新资源发布路径实现非覆盖式发布

## 前端工程——基础篇

前端的四个阶段：

1. 框架选型
2. 构建优化
3. 模块化开发
4. 工程优化

## 学习资料

- [从点击到呈现 — 详解一次 HTTP 请求](https://zrj.me/archives/tag/%E4%BB%8E%E7%82%B9%E5%87%BB%E5%88%B0%E5%91%88%E7%8E%B0)
- [High Performance Networking in Chrome](http://aosabook.org/en/posa/high-performance-networking-in-chrome.html)
- [从输入 URL 到页面加载完成的过程中都发生了什么事情？](http://fex.baidu.com/blog/2014/05/what-happen/)
- [What really happens when you navigate to a URL](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)
- [在浏览器地址栏输入一个 URL 后回车，背后会进行哪些技术步骤？](https://www.zhihu.com/question/34873227)

## 简介

从输入 URL 到页面加载完成的过程，这个问题对我们了解计算机和浏览器的工作原理有很大帮助。它大致有下面几个流程：

1. 接受键盘输入
1. 匹配输入域名，预先加载
1. dns 解析
1. 建立 tcp 链接，发送 http 请求
1. 后端接受到请求后处理返回
1. 前端收到数据后展现

### dns 查询

dns(domain name system, 域名系统)，它是一个域名和 ip 地址相互映射的分布式数据库，能够让用户方便的用网址访问互联网，而不用记住 ip 地址。

dns 查询(域名解析)就是通过域名查询得到 ip 的过程。dns 协议运行在 UDP 之上，使用端口号 53.

主机名到 ip 地址的映射方式有 2 种：

1. 静态映射，就是每台设备配置主机名到 ip 地址的映射，只供本机使用，如 hosts 文件。
2. 动态映射，在专门的 dns 服务器上配置主机名到 ip 地址的映射，需要网络设备通过 dns 服务器查询 ip 地址。

为了提高解析效率，可以先用静态解析，当静态解析不成功时再用动态解析。

dns 查询实际过程就是浏览器发送请求，dns 服务器返回 ip 地址的过程。全球有 13 个 dns 服务器组。

> 域名注册后，注册商为域名提供免费的静态解析服务。一般的域名注册商不提供动态解析服务，如果需要用动态解析服务，需要向动态域名服务商支付域名动态解析服务费。

https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90/574285

## 学习资料

- [Web 前端应该从哪些方面来优化网站?](https://www.zhihu.com/question/21658448)
- [前端优化实践总结](https://zhuanlan.zhihu.com/p/21618222)
- [兴趣部落的前端性能优化实践概览](https://zhuanlan.zhihu.com/p/28322954)
- [让页面滑动流畅得飞起的新特性：Passive Event Listeners](https://www.qcloud.com/community/article/164816001481011865?fromSource=gwzcw.92748.92748.92748)
- [精读《2017 前端性能优化备忘录》](https://zhuanlan.zhihu.com/p/30349982)
- [前端必读：浏览器内部工作原理](https://kb.cnblogs.com/page/129756/)
- [(上面原文)浏览器的工作原理：新式网络浏览器幕后揭秘](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [ JS 一定要放在 Body 的最底部么？聊聊浏览器的渲染机制](https://segmentfault.com/a/1190000004292479)

https://www.zhihu.com/question/59024365

https://www.zhihu.com/question/52501361

- [从 Chrome 源码看浏览器如何加载资源](https://zhuanlan.zhihu.com/p/30558018)
- [从 Chrome 源码看浏览器如何计算 CSS](https://zhuanlan.zhihu.com/p/25380611)
- [从 Chrome 源码看浏览器如何构建 DOM 树](https://zhuanlan.zhihu.com/p/24911872)

浏览器组成部分：网络、存储、2d/3d 图形、音频和视频、图片解码器、渲染引擎(html 解释器、css 解释器、布局 layout)、js 解释器

渲染引擎
chrome Blink
IE/edge Trident
safire Webkit
firefox Gecko
opera Blink

## 渲染步骤

11. html 字符串变成 dom 树

`2+3-4`html/css/js 文本 -> 词法分析（拆成 token 即最小单元） -> 语法解析(扫描) -> 树

语法构成:表达式、项和运算符
表达式：项接运算符，再接项
项：一个整数或表达式
运算符：加号或减号
语言：任意数量的表达式

dom tree 和 render tree 的区别：

- 一一对应
- 可显示的元素
- 定位的元素

DOM 树和渲染树自然不会所有节点都对应，渲染树中通常是可显示的节点，`<head>` 这类元素不存在，当然，设置了 display:none 的元素也不存在。

渲染树在构建过程中会给元素布局（Layout），也叫重排（Reflow），之后就开始绘制（Painting）。

重排(relayout)和重绘(repaint)

重排：几何属性
重绘：color background

渲染过程，结合流程图

1. 边下载边解析边渲染
2. js 会阻塞渲染，因为 js 可能会改变 dom 树，所以要等 js 下载完再执行

**目录**

- [为什么要优化性能?](为什么要优化性能)
- [从哪些方面进行性能优化?](从哪些方面进行性能优化)
- [怎么进行性能优化?](性能优化方案)
- [性能衡量指标](性能衡量指标)

## performance 对象

### performance.memory

`performance.memory` 可以获取浏览器的内存情况，这个属性是非标准的，只有 chrome 浏览器有。它有三个属性分别是：

- `usedJSHeapSize` 表示所有被使用的 js 堆栈内存
- `totalJSHeapSize` 表示当前 js 堆栈内存总大小
- `jsHeapSizeLimit` 表示内存大小限制

`usedJSHeapSize`不能大于`totalJSHeapSize`，如果大于则可能出现内存泄露的情况。

## 为什么要优化性能

性能对于网站是十分重要的，比如谷歌搜索如果慢 400ms，将会损失 0.5%的用户，这意味着将失去很多的收益。所以提高性能，意味着提高用户体验和网站收益。

`window.performance`可以用来获取页面的一些性能数据。比如页面打开的时间，dns 的时间，白屏的时间等等。通过这些数据，我们可以找到网站打开慢的原因，从而更好的提高网站性能。

![](./optimize/1.png)

## 从哪些方面进行性能优化

要知道从哪些方面来进行性能优化，首先需要知道输入网址回车的时候，浏览器做了些什么。

1. 浏览器首先通过域名查询网址的 ip 地址
2. 信号通过网卡到达服务器
3. 服务器

- 减小数据大小：资源压缩后，数据变小，服务器读取、传输它的时间缩短，浏览器读取解析它的时间也缩短了。

## 具体性能优化

打开页面时：开始请求 -> 获取首字节 -> 页面开始展示 -> 首屏内容加载完成 -> 加载完成。

## 性能衡量指标

## 白屏时间

cs 和 bs 的区别：
cs 是把资源打包后，安装到机器上然后解压部署到机器上。
bs 是要去 cdn 或服务器下载资源然后显示。
cdn 域名不要和主站一样，因为静态资源不需要 cookie，如果一样，请求时会带 cookie，增加了请求数据。

打开浏览器，输入网址发生了什么。

## 资源的合并和压缩

为什么要压缩：减少流量，加快下载
为什么合并：减少 http 请求，减少请求时间。减少丢包概率，
不合并的缺点：
合并的缺点：首屏渲染问题（要请求完才渲染），缓存失效问题，一个文件改变，打包文件 md5 就会变化，缓存就失效了。
合并的方案：库合并，页面业务逻辑合并
压缩:删除空白字符、注释和没有用到的代码，css 语义合并。代码保护
开启 gzip

## 图片相关优化

图片压缩的原理
有损压缩
无损压缩

png8 - 256 色，支持透明。纯色时使用
png24 2^24(16777216)色，不支持透明
png32 2^24 色，支持透明

图片区别和常用业务场景
jpg 有损压缩，压缩率搞，不支持透明
png 支持透明，兼容好
webp 压缩程度更高，在 ios webview 有兼容性问题。通常在安卓使用。
svg 矢量图，代码内嵌，相对较小，图片样式相对简单的场景

css 雪碧图：优点减少 http 请求。缺点是如果图片比较大没有加载或加载错误，所有图片都没有出来。

image inline 把小图片的内容内嵌到 html 中，通过 base64，减少 http 请求，缺点是文件会增大一点。小于 8kb 的时候用。

使用矢量图：使用 svg 绘制，使用 iconfont 解决 icon 问题。

webp 优势体现在具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，同时具有无损和有损压缩模式、透明度以及动画的特性。在 jpeg 和 png 上的转化效果都非常优秀、稳定和统一。

facebook pc 版是将雪碧图拆分，某一块合并，而且大小也要控制

淘宝手机版是用的 webp, 图片格式是 .jpg\_.webp，如果不支持，就用 jpg。这通过图片服务器控制返回。

tinypng 智图
spritecow.com

## css 和 js 的装载和执行

html 加载渲染的过程，渲染过程的特点：

- 顺序执行，并发加载(是按域名来的，每个域名有上限，所以 cdn 设置多个域名)
- 是否阻塞
- 依赖关系
- 引入方式

**顺序执行、并发加载**

- 词法分析，是从上到下的顺序执行的
- 并发加载
- 并发上限

**css 阻塞**

- css head 中阻塞页面的渲染
- css 阻塞 js 的执行，因为 js 执行可能依赖 css
- css 不阻塞外部脚本的加载

**js 阻塞**

- 直接引入 js 会阻塞页面的渲染，没有加 async、defer 的话
- js 不阻塞资源的加载
- js 顺序执行，阻塞后续 js 逻辑的执行

懒加载和预加载

懒加载

- 图片进入可视区之后请求图片资源
- 对于电商等图片很多，页面很长的业务场景
- 减少无效资源的加载
- 并发加载的资源过多会阻塞 js 的加载，影响网站的正常使用。

预加载

- 图片等静态资源在使用之前提前请求
- 资源使用时能从缓存中加载，提升用户体验
- 页面展示的依赖关系维护
  方案
  img src display:none
  new Image
  ajax get，控制更加精细。但是有跨域问题
  preload.js 默认是 ajax 方式，传 false 就是普通的方式。

## 重绘和重排

ui 渲染和 js 执行是 2 个线程。
js 可能会依赖 ui 的结果，如果是并行，获取可能有问题。
所以浏览器固定在一个执行的时候冻结另一个的执行。
频繁的触发重绘和重排，会让 ui 渲染，导致 js 执行变慢

重排又叫回流，reflow，指的是 render tree 中一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。当页面布局和几何属性改变时就需要回流。
盒子模型属性、定位、浮动、节点内部文字结构。

当 render tree 中的一些元素需要更新属性，而这些属性只影响元素的外观，而不影响布局时，叫重绘，比如 background-color

## 参考资料

- [研究首屏时间？你先要知道这几点细节](http://www.alloyteam.com/2016/01/points-about-resource-loading/)
- [初探 performance – 监控网页与程序性能](http://www.alloyteam.com/2015/09/explore-performance/)
- [使用 performance API 监测页面性能](http://www.alloyteam.com/2012/11/performance-api-monitoring-page-performance/)
- [网页性能监控利器---Performance](http://www.imweb.io/topic/597f3cb01e8320bb61cf3aa8)
- [天猫双 11 前端分享系列（一）：活动页面的性能优化](https://github.com/tmallfe/tmallfe.github.io/issues/25)
- [天猫双 11 前端分享系列(二)：天猫双 11 页面服务容灾方案大揭秘](https://github.com/tmallfe/tmallfe.github.io/issues/26)
- [Javascript 高性能动画与页面渲染](http://www.infoq.com/cn/articles/javascript-high-performance-animation-and-page-rendering)
- [前端架构](http://saito.im/note/The-Architecture-of-F2E/)
- [http://www.css88.com/nav/]
- [JavaScript 中的 this 陷阱的最全收集--没有之一](https://segmentfault.com/a/1190000002640298#articleHeader1)
- [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
- [google performance guide，将左侧的 Performance 全部](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)
- [使用 RAIL 模型评估性能](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn)

  15.前端性能监控与性能优化、行为监控与安全防范 1.针对重绘重排的优化策略 2.如何发现性能短板与各个短板的优化 3.前端埋点上报 4.前端错误上报 5.前端性能上报 6.前端行为监控上报

  7.前端恢复上线与 A/B 测试
