---
title: "前端面试题"
date: 2016-08-14 19:19:33
toc: true
---

## HTML

> DOCTYPE有什么用？

DOCTYPE 用来告诉浏览器用什么模式来解析文档，内部的 dtd 决定是标准模式和混合模式。 html5 没有 dtd，会用最新的标准来解析。

> 如何提供包含多种语言内容的页面？

> 在设计开发多语言网站时，需要留心哪些事情？

> 什么是 data- 属性？

data- 属性是标准的 HTML 自定义属性前缀。

> 将 HTML5 看作成开放的网络平台，什么是 HTML5 的基本构件（building block）？

> 请描述`<script>`、`<script async>`和`<script defer>`的区别。

默认情况下，script 执行时会阻塞页面，async 是异步，即脚本谁下载完谁就执行，defer 是延迟，下载完后

> 为什么最好把 CSS 的`<link>`标签放在`<head></head>`之间？为什么最好把 JS 的`<script>`标签恰好放在`</body>`之前，有例外情况吗？

因为 html 和 css 解析成 dom 树渲染过程是流式的，如果 link 放后面，可能会导致页面没有样式，后来有了样式后闪一下，体验不好。script 的执行会阻塞页面的渲染，放前面会让页面的呈现延迟。所以放在最后面。

> 什么是渐进式渲染（progressive rendering）？

渐进式渲染是用来加快页面的展现的技术。

- 图片懒加载
- 分层渲染
- 异步加载 HTML 片段 - 当页面通过后台渲染时，把 HTML 拆分，通过异步请求，分块发送给浏览器。https://www.ebayinc.com/stories/blogs/tech/async-fragments-rediscovering-progressive-html-rendering-with-marko/

> 为什么在`<img>`标签中使用 srcset 属性？请描述浏览器遇到该属性后的处理过程。
https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

> 你有过使用不同模版语言的经历吗？

只用过 ejs，jade 写过demo。实际项目中没有用过，模版引擎主要是用来渲染页面的，个人认为业务逻辑复杂的页面还是直接用 vue 这样的框架好些。另外直接使用 php 模版引擎嵌套也不复杂。

## CSS

## Javascript

### 事件

> 请解释事件委托（event delegation）?

事件委托是利用事件的冒泡机制，比如点击 li 时，事件会冒泡给 ul，所以可以在 ul 上绑定事件函数，好处是:
- 减少内存占用，不用给每个 li 绑定事件。
- 新增元素后不需要重新绑定事件。




## 浏览器相关

> 请描述cookie、sessionStorage和localStorage的区别。

- 操作: cookie 前后端都可以操作，storage 只有浏览器可以操作。
- 失效时间: cookie 有过期时间，通过cookie 的 expires 控制，sessionStorage 会话完过期，localStorage 不过期。
- 大小：cookie 一般是 5k，storage chrome 是 5M，不同浏览器不一样。
- api：cookie api 复杂，storage要简单。

