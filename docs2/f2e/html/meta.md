---
title: HTML 元信息类标签
sidebar_label: 元信息类标签
---

元信息，是指描述自身的信息。元信息类标签，就是 HTML 用于描述文档自身的一类标签，通常出现在 head 中，不会被页面显示出来，通常是给浏览器、搜索引擎阅读的。而与之相对的语义类标签，描述的是业务。

元信息类标签有：

- head
- title
- base
- meta


## head 标签

head 标签通常和 body 标签一样，用于容器使用。

head 规定如下：

- 必须是 html 标签中的第一个标签。
- 必须包含一个 title，如果文档作为 iframe，或其它地方指定了文档标题，可以不包含 title。
- 最多包含一个 base。

## title 标签

title 标签表示文档的标题。

title 标签和 heading(h1..h6) 标签的区别是：

- title 可能被用于浏览器收藏夹，微信推送名片，微博等场景，所以应该是完整的网页内容的概括
- h1 只是用于展示，而且默认有上下文，所以可以简写，影响不大。

## base 标签

base 标签最多有一个，表示页面的基准 URL，即其它链接是以它作为相对地址，非常危险，不建议使用。

```html
<!-- 后面要加 /，否则是相对 http://www.xx.com/ -->
<base href="http://www.xx.com/a/"> 

<!-- 会打开页面 http://www.xx.com/a/x.html -->
<a href="./x.html">this is a link</a>
<!-- 会打开页面 http://www.xx.com/x.html -->
<a href="../x.html">this is a link</a>
```

## meta 标签

meta 标签一般是一组键值对，由 name、content 属性组成。这里的 name 可以自定义。

### charset

HTML5 为了简化写法，meta 新增了 charset 属性。添加了 charset 后，不需再有 name、content。

```html
<meta charest="UTF-8">
```

charset 标签描述了 HTML 文档自身的编码形式。最好放 head 的最前面，这样浏览器读到这个标签之前，都是 ASCII 字符(很多字符集的子集)，一般不会出错，后面的字符再用 charset 来解析。这样可以最大程度防止乱码。

一般情况下，HTTP 服务器可以通过 http 头指定正确的编码，但是 file 协议打开 HTML 文件，没有 http 头，这时 charset 就有用了。

### http-equiv

http-equiv 属性，表示执行一个命令，这样的 meta 标签也不需要 name、content。

### viewport

viewport 没有在 HTML 标准中定义，但是是移动端开发的标准。

```html
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

- width: 页面宽度，也可以是 device-width
- height: 页面高度，也可以是 device-height
- initial-scale: 初始缩放比例
- minimum-scale: 最小缩放比例
- maximum-scale: 最大缩放比例
- use-scalable: 是否运行用户缩放

### 其它

还有一些 name 值表示含义如下：

- application-name: web application 的应用名称
- author: 页面作者
- description
- keywords
- generator: 生成页面所用的工具，如果是手写 HTML，则不需要。
- referrer: 跳转策略
- theme-color: 页面风格颜色，实际不会影响页面，但是浏览器可能根据它调整页面之外的 UI，如 tab 颜色或窗口边框。


```html
<!-- 禁止百度转码，防止百度贴广告 -->
<meta http-equiv="Cache-Control" content="no-siteapp">

<!-- 默认使用最新浏览器 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<!-- 不被网页(加速)转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp">

<!-- 搜索引擎抓取 -->
<meta name="robots" content="index,follow">

<!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- 设置苹果工具栏颜色 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- 关闭iOS上的内容识别 -->
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="date=no">
<meta name="format-detection" content="address=no">
<meta name="format-detection" content="email=no">

<!-- 对于多核浏览器，控制浏览器以哪种类型内核来显示 -->
<meta name="renderer" content="webkit|ie-comp|ie-stand">
```