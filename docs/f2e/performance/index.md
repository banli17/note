---
title: "网站性能优化"
# sidebar_label: 
---

网站的性能会直接影响到用户体验，而用户体验会影响网站的收益。因此网站的性能优化十分重要。

## 性能衡量指标

打开一个页面时
- 开始请求  performance.timing.navigationStart
- 获取首字节  performance.timing.responseStart
- 页面开始展示 用户屏幕开始展示内容的时刻，白屏时间
- 首屏内容加载完成  首屏时间
- 加载完成

中间三个主要的性能衡量指标

白屏时间: 开始渲染 body 的时间，可以在 head 的头部和尾部插入 startTime endTime，

```
// 支持performance
var time = endTime - performance.timing.navigationStart
// 不支持performance
var time = endTime - startTime
```

首屏时间：above the fold 首屏线上的区域

在首屏线 代码处插入时间 Date.now() 兼容 performance 和 不兼容(用 head尾部作为startTime)

分析页面 network

## 优化手段

浏览器请求服务器资源，就是送货一样。可以减少运输次数(一次多运输点)，减少货物体积，增加货车速度。

- 减少请求文件数
- 减少资源体积： 精简体积、压缩文件、gzip (accept-encoding:gzip  content-encoding:gzip)
- 提高网络传输:浏览器缓存(减少数据传输，减少服务器压力) 

cdn(内容分发网络) :多域名并发 、网络线路


DNS解析和寻址
服务器建立连接
发送数据
等待服务器响应
接收数据

请求变多 -> 页面加载变慢，服务器压力变大


CDN(内容分发网络) 是将源站内容分发至最接近用户的节点，使用户可就近取得所需内容，提高用户访问的响应速度和成功率。解决因分布、带宽、服务器性能带来的访问延迟问题，适用于站点加速、点播、直播等场景。
合并请求 的主要目的是减少浏览器对服务器发起的请求数，从而减少在发起请求过程中花费的时间。
Gzip 是一种压缩技术，可以将资源在服务端进行压缩，然后发送给浏览器后再进行解压，这种方式会降低传输大小，提高网页加载性能。
通过工具移除代码中不必要的字符 如所有的注释和空白字符，可以减少代码资源文件体积，提高资源加载速度。