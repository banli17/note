---
title: "建立性能体系"
# sidebar_label: 
---

网站的性能会直接影响到用户体验，而用户体验会影响网站的收益。因此网站的性能优化十分重要。

## 建立性能体系

性能体系的建立主要有以下方面。

- 现状评估和建立指标
- 技术方案
- 执行
- 结果评估和监控

## 现状评估和建立指标

在性能优化之前，我们需要知道当前网站的性能情况。具体就需要监控获取性能数据(下面讲)、建立指标。

建立指标需要从两个方面来考虑：用户体验、公司业务。

用户体验主要涉及到：

- 页面加载性能
- 动画和操作性能
- 内存、电量消耗

实际上，页面加载性能和公司业务是相关的，因为它会导致用户的流失。

评价页面加载性能的指标可以用秒开率，也就是 1s 内打开页面的用户占比。要注意：

- 加载时间低于 1s 时，用户感知区别不大。
- 忽略少数加载时间过长的用户，如 2G 用户，而是考虑大多数用户。

## 技术方案

性能优化需要从客户端到服务端整个链路来进行优化。先来回顾以下浏览器打开页面经历了什么。

1. DNS 解析，根据域名获取 ip。
2. HTTP 请求，会产生 TCP 连接，可能还有 HTTPS 证书交换过程。
3. 页面返回后，浏览器还要请求图片等资源，而且浏览器请求对同域名有并发限制。所以要考虑请求大小与数量。

最终技术方案如下：

- 提高网络传输
    - 缓存: 客户端控制的强缓存策略，减少数据请求和服务器压力。
    - HTTP DNS :客户端控制，隔一段时间主动请求 DNS 获取域名ip，不走系统DNS
    - TCP/TLS 连接复用：由服务器升级到 HTTP2，尽量合并域名
    - CDN: 可以提高网络传输。另外可以配置多域名并发。
- 减少请求数
    - js,css 打包到 html
    - js 控制图片异步加载和懒加载
    - 小图片 data-uri
    - 合并请求
- 减少传输体积
    - 压缩资源 
    - gzip，根据请求头`accept-encoding:gzip`，服务端进行压缩并返回头`content-encoding:gzip`。
    - svg/gradient 代替图片
    - 根据机型和网络控制图片清晰度
    - 低清晰度图片使用锐化提升体验
    - 避免设计大型背景图

## 执行

- 纯管理
- 制度化
- 工程化

## 结果评估和线上监控

### 数据采集 Performance API

数据采集主要是靠 Performance API。`performance.timing`对象包含页面在各个阶段的时间。可以采集的数据包括：

- TTFB 获取首字节时间：  performance.timing.responseStart - performance.timing.navigationStart
- 白屏时间: 用户屏幕开始展示内容的时刻。可以使用开始渲染 body 的时间，减去 performance.timing.navigationStart。对于不支持 performance API 的浏览器，可以在 head 的头部和尾部插入 startTime、endTime 做差计算，

```js
// 支持performance
var time = endTime - performance.timing.navigationStart
// 不支持performance
var time = endTime - startTime
```

- 首屏时间: 首屏内容加载完成时间。可以在首屏元素代码处插入时间 Date.now()，然后减去 performance.timing.navigationStart，不过这种方式代码侵入性太强，而且成本较高，可以简单的使用 domready 代替 Date.now()。如果首屏上有图片，则遍历图片，找到最慢的图片的加载时间作为首屏时间。
- 用户可操作时间，即 domready 时间。
- Load: 页面总下载时间，window.onload 时间。还可以包括每个资源的加载时间。
- 自定义的时间(开发者关注的)

![](/img/performance/1.png)

具体属性如下：

- navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的时间。如果没有上一个页面，这个值会和 fetchStart 相同。通常我们也理解为准备加载新页面的起始时间。
- redirectStart：到当前页面的重定向开始的时间。当重定向的页面来自同一个域时这个属性才会有值，否则值为0。
- redirectEnd：到当前页面的重定向结束的时间。当重定向的页面来自同一个域时这个属性才会有值，否则值为0。
- fetchStart：准备使用HTTP请求(fetch)页面的时间。
- domainLookupStart：域名查询开始的时间。
- domainLookupEnd：域名查询结束的时间。
- connectStart：返回HTTP请求开始向服务器发送的时间,如果使用持久连接（persistent connection），则返回值等同于 fetchStart 的值。
- (secureConnectionStart)：可选特性。如果页面是HTTPS协议，则返回开始SSL握手的那个时间。如果当前网页不要求安全连接，则返回0。
- connectEnd：返回浏览器与服务器之间的连接建立的时间。如果建立的是持久连接，则返回值等同于 fetchStart 属性的值。连接建立指的是所有握手和认证过程全部结束。
- requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间。
- responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间。
- responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时的时间。
- unloadEventStart：返回同一个域名前一个网页的 unload 事件触发时的时间。否则返回值为0。
- unloadEventEnd：返回同一个域名前一个网页的 unload 事件触发时的时间。否则返回值为0。
- domLoading：返回当前网页 DOM 结构开始解析时（即Document.readyState属性变为 loading、相应的readystatechange事件触发时）的时间
- domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为 interactive 、相应的readystatechange事件触发时）的时间。
- domContentLoadedEventStart：返回当解析器发送 DOMContentLoaded 事件的开始时间
- domContentLoadedEventEnd：返回当文档的 DOMContentLoaded 事件的结束时间。
- domComplete：返回当前文档解析完成，即Document.readyState 变为 complete 且相对应的readystatechange 被触发时的时间。
- loadEventStart：返回该文档下，load 事件被发送时的时间。如果这个事件还未被发送，它的值将会是0。
- loadEventEnd：返回当 load 事件结束，即加载事件完成时的时间。如果这个事件还未被发送，或者尚未完成，它的值将会是0。


我们可以根据上面的属性，计算出一些网页性能相关的信息。

```js
var timing = performance.timing

// 页面总耗时
var pageLoadTime = timing.loadEventEnd - timing.navigationStart

// DNS 域名解析耗时
var dnsTime = timing.domainLookupEnd - timing.domainLookupStart

// tcp 连接耗时
var tcpTime = timing.connectEnd - timing.connectStart

// 页面从加载到现在的时间,单位是微秒us，但精度比 Date.now() 高1000倍。
var duration = performance.now()  // Date.now() 
```

performance.getEntriesByType('navigation')

![](/img/performance/2.png)

Performance API 虽然强大，但是它也不能解决一些问题：

1. 单页应用页面刷新时的数据统计
2. 

### 数据展现 

页面秒开率，1s 内打开页面的用户占比。

## 参考资料

- [重学前端](https://time.geekbang.org/column/article/94156)
- [前端监控实践——FMP的智能获取算法](https://segmentfault.com/a/1190000017092752)