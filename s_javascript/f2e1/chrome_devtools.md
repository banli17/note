---
title: Chrome调试工具
---

## 学习资料

- [Chrome 开发者工具](https://developers.google.com/web/tools/chrome-devtools/)

打开快捷键 Ctrl+Shift+I (Windows) 或 Cmd+Opt+I (Mac)

## console API

**打印类**

- console.log() 可以带样式打印，比如`console.log('%chello world', 'color:red')`，也可以打印多个值，用逗号分隔
- console.info()
- console.warn()
- console.error()
- console.debug()
- console.group()
- console.groupEnd()
- console.dir() 以 js 对象形式打印，log 是以 dom 树形式打印
- console.table() 以表格形式打印，`data = [{},{}]`形式。
- console.assert()
- console.count()

```
function count(){
    console.count('函数执行的次数是')
}
```

- `console.time()` 和 `console.timeEnd()`
- `console.profile()` 和 `console.profileEnd()` 查看 CPU 相关信息
- `console.timeLine()` 和 `console.timeLineEnd()` 记录时间轴
- `console.trance()` 调用此方法的位置输出一个堆叠追踪。
- $ ， $\_表最近一次表达式执行结果， $0-$4 表示最近选择的 DOM 节点
- \$() 表示 `document.querySelector()`
- $$
  $$
- copy() 可以粘贴数据到剪贴板，比如 `copy(obj)`
- keys(obj) 和 values(obj)
- monitor(fn) 和 unmonitor(fn)， 用于监听函数的执行和取消监听
- debug(fn) 和 undebug(fn) 用于打断点，现在控制台 `debug(fn)`，再执行 `fn()`

## 参考资料

- [chrome 控制台不完全指南](http://www.cnblogs.com/Wayou/p/chrome-console-tips-and-tricks.html)
- [Console API 参考](https://developers.google.com/web/tools/chrome-devtools/console/console-reference?utm_source=dcc&utm_medium=redirect&utm_campaign=2016q3#consolelogobject-object)
- [Profiles，深度性能优化必备](https://www.jianshu.com/p/504bde348956)
- [Network，网络加载分析利器](https://www.jianshu.com/p/471950517b07)
- [Timeline，快捷性能优化工具](https://www.jianshu.com/p/b8cdcd9bfad8)
- [如何使用 Timeline 工具](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
- [chrome 调试工具官网](https://developer.chrome.com/devtools)
- [Chrome 开发者工具中文文档](http://www.css88.com/doc/chrome-devtools/)

# Chrome 开发者工具之 Performance

> 这章比较复杂，平时没有用过，而且知识较多。多投入点时间，将学习资料多读 10 遍。

## 学习资料

- [Get Started With Analyzing Runtime Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
- [分析运行时性能](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/)
- [Performance Analysis Reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)
- [时间线事件参考](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/performance-reference)
- [加速执行 JavaScript](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution)
- [如何用 FPS 衡量 web 页面性能？](https://www.zhihu.com/question/47911480)
- [为什么游戏帧数一般要到 60 帧每秒才流畅，而过去的大部分电影帧数只有 24 帧每秒却没有不流畅感？](https://www.zhihu.com/question/21081976)

## 总结

**1. 如何获取页面性能数据?**

- 首先新建无痕浏览模式，快捷键是`ctrl + shift + n` 。因为无痕浏览模式是一个纯净的环境。它会去掉 chrome 插件对性能的影响。
- 打开 Performance 面板，点击右侧的设置按钮，会展开一个面板，上面有 CPU 设置。移动端设备性能比 PC 要差很多，所以可以将它开启，看看页面在移动端上的表现。

![](./img/performance-cpu.png)

- 记录某时段的性能表现，通过点击 Record 按钮，等几秒后，按 stop 按钮。

![](./img/profiling.png)

**2. 如何分析页面性能数据？**

任何动画最主要的性能指标都是`frames per second`(FPS)，如果能达到 60 FPS，用户体验会很好。

- 查看 FPS 图表。如果看到 FPS 上面有红色条，说明 FPS 太低，用户体验差。通常绿条越高，FPS 越高。

![](./img/fps-chart.svg)

- 查看 CPU 图标。在 FPS 下面有个 CPU，颜色丰富说明 CPU 已经最大化和长时间工作，所有时间都花在 Rendering 和 Scripting。需要找出方法减少它的工作。

![](./img/cpu-summary.svg)

\*\*3.

## 深入学习

学习后面的 3.3 性能与工程化章节。

# Network 面板

> 这章比较简单，因为平时经常用，只有几个不知道的知识点。

## 学习资料

- [Get Started with Analyzing Network Performance in Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/)
- [Network Issues Guide](https://developers.google.com/web/tools/chrome-devtools/network-performance/issues)
- [Network Analysis Reference](https://developers.google.com/web/tools/chrome-devtools/network-performance/reference)

> 通过[chrome://help](chrome://help)可以查看谷歌浏览器版本

## 总结

**1. 分析网络请求的方法**

- 看是否有 js 影响页面渲染，因为 js 下载时会执行，这段时间页面会停止渲染。
- 找大的请求，通过分析加载时各个时间段的截图，看哪里花了长时间。也要分析 waterfall 里的请求时间。

**1. 将 js 文件设为 async，并放在 body 的底部?**

疑问：放开头设置为 async 会怎么样？

**1. waterfall 里面都是些什么?**

![](./img/get-started-waterfall.png)

TTFB，全称是`Time To First Byte`，意思是等待从服务器返回第一个字节所花费的时间。引起它慢的原因可能是客户端到服务器连接慢，或者服务器响应太慢。可以通过在本地搭建服务器测试，如果照样很慢，则是服务器的问题了。

TTFB 时间长的解决方法是：如果是连接慢，可以搭建 CDN 或者换主机。如果是服务端慢，则优化数据库、缓存或修改服务端配置。

`content download`：表示内容下载。下载慢的原因可能是客户端到服务端连接慢，或者下载的内容太多。解决方法是：搭建 CDN 或者换主机。减小发送的内容。

**4. 学习资料中，优化后的页面依然会 4s 后才加载完成是怎么回事？**

![](./img/net2.png)

原来是因为 js 的执行不会显示在网络的资源加载面板中，页面 js 执行完成后，load 才完成(浏览器加载转圈按钮才会停止)。

**5. 一些网络请求的问题**

http/1.0 或 http/1.1，谷歌浏览器下，同一个域名最多同时允许 6 个 tcp 连接，比如请求资源时，最多同时请求 6 个，会形成一个队列，请求完一个后，再插新的请求到队列中。

解决方法是：1、在 http1.0 或 1.1 下资源分布到多个域名。2、使用 http/2，就不需要多个域名了。3、去掉或延迟不必要的请求，最新加载重要的请求。

**6. 修改用户代理**

可以修改用户代理，最新版谷歌在更多工具里，如图：

![](./img/user-agent.png)

**7. filter 的使用**

比如说筛选大于 1kb 的 jpeg 图片，通过`mime-type:image/jpeg larger-than:1K`。

**8. Hide data URLs 是什么?**

哦，它是隐藏`data:`开头的 url。

## 深入学习

学习后面的网络数据请求章节。
