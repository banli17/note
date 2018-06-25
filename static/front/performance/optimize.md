# 性能优化

**目录**

- [为什么要优化性能?](为什么要优化性能)
- [从哪些方面进行性能优化?](从哪些方面进行性能优化)
- [怎么进行性能优化?](性能优化方案)
- [性能衡量指标](性能衡量指标)

## 为什么要优化性能

性能对于网站是十分重要的，比如谷歌搜索如果慢400ms，将会损失0.5%的用户，这意味着将失去很多的收益。所以提高性能，意味着提高用户体验和网站收益。

`window.performance` 可以用来获取页面的一些性能数据。比如页面打开的时间，dns的时间，白屏的时间等等。通过这些数据，我们可以找到网站打开慢的原因，从而更好的提高网站性能。

## 从哪些方面进行性能优化

要知道从哪些方面来进行性能优化，首先需要知道输入网址回车的时候，浏览器做了些什么。

1. 浏览器首先通过域名查询网址的ip地址
2. 信号通过网卡到达服务器
3. 服务器

- 减小数据大小：资源压缩后，数据变小，服务器读取、传输它的时间缩短，浏览器读取解析它的时间也缩短了。

## 具体性能优化



## 性能衡量指标

## 白屏时间
cs和bs的区别：
cs是把资源打包后，安装到机器上然后解压部署到机器上。
bs是要去cdn或服务器下载资源然后显示。
cdn域名不要和主站一样，因为静态资源不需要cookie，如果一样，请求时会带cookie，增加了请求数据。

打开浏览器，输入网址发生了什么。

## 资源的合并和压缩
为什么要压缩：减少流量，加快下载
为什么合并：减少http请求，减少请求时间。减少丢包概率，
不合并的缺点：
合并的缺点：首屏渲染问题（要请求完才渲染），缓存失效问题，一个文件改变，打包文件md5就会变化，缓存就失效了。
合并的方案：库合并，页面业务逻辑合并
压缩:删除空白字符、注释和没有用到的代码，css语义合并。代码保护
开启gzip
## 图片相关优化

图片压缩的原理
有损压缩
无损压缩


png8 - 256色，支持透明。纯色时使用
png24  2^24(16777216)色，不支持透明
png32  2^24色，支持透明

图片区别和常用业务场景
jpg 有损压缩，压缩率搞，不支持透明
png支持透明，兼容好
webp 压缩程度更高，在ios webview有兼容性问题。通常在安卓使用。
svg 矢量图，代码内嵌，相对较小，图片样式相对简单的场景

css雪碧图：优点减少http请求。缺点是如果图片比较大没有加载或加载错误，所有图片都没有出来。

image inline 把小图片的内容内嵌到html中，通过base64，减少http请求，缺点是文件会增大一点。小于8kb的时候用。

使用矢量图：使用svg绘制，使用iconfont解决icon问题。

webp 优势体现在具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，同时具有无损和有损压缩模式、透明度以及动画的特性。在jpeg和png上的转化效果都非常优秀、稳定和统一。

facebook pc版是将雪碧图拆分，某一块合并，而且大小也要控制

淘宝手机版是用的webp, 图片格式是 .jpg_.webp，如果不支持，就用jpg。这通过图片服务器控制返回。

tinypng 智图
spritecow.com  

## css和js的装载和执行

html加载渲染的过程，渲染过程的特点：

- 顺序执行，并发加载(是按域名来的，每个域名有上限，所以cdn设置多个域名)
- 是否阻塞
- 依赖关系
- 引入方式

**顺序执行、并发加载**

- 词法分析，是从上到下的顺序执行的
- 并发加载
- 并发上限

**css阻塞**

- css head中阻塞页面的渲染
- css阻塞js的执行，因为js执行可能依赖css
- css不阻塞外部脚本的加载

**js阻塞**

- 直接引入js会阻塞页面的渲染，没有加async、defer的话
- js不阻塞资源的加载
- js顺序执行，阻塞后续js逻辑的执行

懒加载和预加载

懒加载
- 图片进入可视区之后请求图片资源
- 对于电商等图片很多，页面很长的业务场景
- 减少无效资源的加载
- 并发加载的资源过多会阻塞js的加载，影响网站的正常使用。

预加载
- 图片等静态资源在使用之前提前请求
- 资源使用时能从缓存中加载，提升用户体验
- 页面展示的依赖关系维护
方案
img src  display:none
new Image
ajax get，控制更加精细。但是有跨域问题
preload.js  默认是ajax方式，传false就是普通的方式。
## 重绘和重排

ui渲染和js执行是2个线程。
js可能会依赖ui的结果，如果是并行，获取可能有问题。
所以浏览器固定在一个执行的时候冻结另一个的执行。
频繁的触发重绘和重排，会让ui渲染，导致js执行变慢

重排又叫回流，reflow，指的是render tree中一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。当页面布局和几何属性改变时就需要回流。
盒子模型属性、定位、浮动、节点内部文字结构。

当render tree中的一些元素需要更新属性，而这些属性只影响元素的外观，而不影响布局时，叫重绘，比如background-color

## 参考资料

- [研究首屏时间？你先要知道这几点细节](http://www.alloyteam.com/2016/01/points-about-resource-loading/)
- [初探 performance – 监控网页与程序性能](http://www.alloyteam.com/2015/09/explore-performance/)
- [使用performance API 监测页面性能](http://www.alloyteam.com/2012/11/performance-api-monitoring-page-performance/)
- [网页性能监控利器---Performance](http://www.imweb.io/topic/597f3cb01e8320bb61cf3aa8)
- [天猫双11前端分享系列（一）：活动页面的性能优化](https://github.com/tmallfe/tmallfe.github.io/issues/25)
- [天猫双11前端分享系列(二)：天猫双11页面服务容灾方案大揭秘](https://github.com/tmallfe/tmallfe.github.io/issues/26)
- [Javascript高性能动画与页面渲染](http://www.infoq.com/cn/articles/javascript-high-performance-animation-and-page-rendering)
- [前端架构](http://saito.im/note/The-Architecture-of-F2E/)
- [http://www.css88.com/nav/]
- [JavaScript中的this陷阱的最全收集--没有之一](https://segmentfault.com/a/1190000002640298#articleHeader1)
- [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)
- [google performance guide，将左侧的Performance全部](https://developers.google.com/web/fundamentals/performance/why-performance-matters/)
- [使用 RAIL 模型评估性能](https://developers.google.com/web/fundamentals/performance/rail?hl=zh-cn)