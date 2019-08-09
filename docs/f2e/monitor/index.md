---
title: 前端监控
---

## domReady

domReady 实际是 DOM 加载完成，图片等链接资源正在加载中。onload 表示资源都已经加载完毕，如果有资源错误，则会阻塞延迟 onload 的执行。

**如何判断domReady**

1. document.readyState 有三个状态：`loading/正在加载`、`interactive/可交互,图片、框架资源正在加载`、`complete/完成`。当这个属性值变化时，会触发`readystatechange`事件。
2. document 的 DOMContentLoaded 事件

## 简介

## 监控哪些数据

访问：
    - pv/uv
    - 流量来源
    - 操作系统
    - 浏览器
    - 分辨率
    - 登录率
    - 地域分布
    - 网络类型
    - 访问时段
    - 停留时间
    - 到达深度
    - 访问路径


性能
    - 白屏时间
    - 首屏时间
    - 用户可操作时间
    - 页面总下载时间
    - 自定义的时间(开发者关注的)

点击
    - 页面总点击量
    - 人均点击量
    - 流出 url
    - 点击时间
    - 首次点击时间
    - 点击热力图

异常
    - 异常提示信息
    - js 文件名称
    - 异常所在行
    - 发生异常的浏览器
    - 堆栈信息(可能需要截取)

其它
    - 对特殊功能的支持程度(canvas)
    - 轮播图的翻页次数



## 技术监控
- 页面性能监控
- 静态资源性能监控
### 错误监控

对于跨域的代码运行错误会显示 Script error. 对于这种情况我们需要给 script 标签添加 crossorigin 属性
对于某些浏览器可能不会显示调用栈信息，这种情况可以通过 arguments.callee.caller 来做栈递归

但是要注意线上运行的代码都是压缩过的，需要在打包时生成 sourceMap 文件便于 debug。

另外接口异常就相对来说简单了，可以列举出出错的状态码。一旦出现此类的状态码就可以立即上报出错。接口异常上报可以让开发人员迅速知道有哪些接口出现了大面积的报错，以便迅速修复问题。

### 接口性能监控

## 行为监控

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

## 技术监控

### 页面性能监控

页面性能监控主要是使用 performance API。`performance.timing`对象包含页面在各个阶段的时间。

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

    - 白屏时间
    - 首屏时间
    - 用户可操作时间
    - 页面总下载时间
    - 自定义的时间(开发者关注的)

performance.getEntriesByType('navigation')
![](/img/performance/2.png)

## 参考资料

- [打造自己前端监控系统之一：性能信息采集](https://zhyjor.github.io/2018/01/17/%E6%89%93%E9%80%A0%E8%87%AA%E5%B7%B1%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F%E4%B9%8B%E4%B8%80%EF%BC%9A%E6%80%A7%E8%83%BD%E4%BF%A1%E6%81%AF%E9%87%87%E9%9B%86/)
- [打造自己前端监控系统之二：实战篇](https://zhyjor.github.io/2018/01/18/%E6%89%93%E9%80%A0%E8%87%AA%E5%B7%B1%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7%E7%B3%BB%E7%BB%9F%E4%B9%8B%E4%BA%8C%EF%BC%9A%E5%AE%9E%E6%88%98%E7%AF%87/)
- [2018你应该知道的Web性能信息采集指南](https://juejin.im/post/5b9214c2f265da0aeb70e36e)
- [把前端监控做到极致](https://juejin.im/post/5a52f138f265da3e5b32a41b)
- [https://www.w3.org/TR/performance-timeline-2/#dom-performance](https://www.w3.org/TR/performance-timeline-2/#dom-performance)
- [web 埋点实现原理了解一下](https://segmentfault.com/a/1190000014922668)