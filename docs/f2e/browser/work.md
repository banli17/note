---
title: 浏览器工作原理
sidebar_label: 浏览器工作原理
---

以前自己试着翻译过一篇巨文 [How Browsers Work: Behind the scenes of modern web browsers](/blog/2018/07/05/browser-work)。现在我基本都不记得里面的细节了，只记得一些词语：如词法解析、token，生成 DOM 树，布局、计算、重绘等。今天看 [重学前端中浏览器原理的介绍](https://time.geekbang.org/column/article/80240)，顺便来总结下，这次就很精简了，最好能永久记忆。


## 浏览器组成

- 渲染引擎
    - html 解释器
    - css 解释器
    - 布局
- js 引擎
- 网络
- 存储
- 2D/3D 图形
- 音频和视频
- 图片解码器


渲染引擎
- chrome、opera: blink
- edge/ie: trident
- safari: webkit
- firefox: gecko


html/css/js -> 词法解析 -> 语法解析 -> 树

渲染过程画图



## 构建 DOM 树


js 会阻塞 dom 树的构建。

dom 树和render tree的区别

不严格一一对应
渲染树中通常是可显示元素，不含 head，display:none
定位的元素

### 重绘和重排

layout(reflow)  repaint

