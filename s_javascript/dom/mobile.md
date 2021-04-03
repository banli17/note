---
title: "移动web开发知识整理"
date: 2019-06-14 17:13:12
---

## 参考资料

- [mobileTech](https://github.com/jtyjty99999/mobileTech)
- [腾讯移动Web前端知识库](https://github.com/AlloyTeam/Mars)
- [移动前端的一些坑和解决方法（外观表现）](http://caibaojian.com/mobile-web-bug.html)
- [【原】移动web资源整理](http://www.cnblogs.com/PeunZhang/p/3407453.html)
- [移动Web应用开发入门指南](https://github.com/maxzhang/maxzhang.github.com/issues/21)
- [Mobile Web Favorites](https://github.com/hoosin/mobile-web-favorites)
- [微信webview中的一些问题](http://lin-chao.github.io/2014/11/14/%E5%BE%AE%E4%BF%A1webview%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98/)
o





HTML5新语义化标签及兼容处理
HTML5表单及验证
企业级音视频处理方案
离线缓存和本地存储
强大的CSS3选择器及应用
CSS3颜色、边框、阴影、艺术文字
CSS3重绘绚丽的背景
transition/transform
CSS3 Animate帧动画
景深和透视以及3D效果制作
响应式布局开发及媒体查询
viewport及DPI媒体适配
流式布局、弹性盒模型
栅格系统
rem的实战应用
移动端JavaScript事件模型
iscroll的深入解读和应用
hyBird模式及jsBridge实战应用
BAT响应式布局开发实战案例
超绚丽的H5场景应用
BAT企业级webApp开发与实战
一线互联网企业移动端实战优化
微信开发及JS-SDK的使用
移动端类库/UI框架的深入解读

HTML5新特性开发
结构化标签,功能标签,功能属性
表单类型,强化表单功能,全局属性
HTML5各类API
File、drag、Web Storage 、Web SQL Database、Web workers、Geolocation
将音视频技术融入到web APP中
使用百度地图API接口实现定位功能

css3各大模块详解
CSS3的介绍
CSS3新增各种伪类选择器
border-radius圆角原理及各种不规则效果的实现
渐变效果:linear-gradient/radial-gradient各种技巧
盒模型:box-shadow,text-shadow等
动画模块:过渡动画transition,animation
变形属性transform各种属性,以及2D方法,3D方法,制作绚丽3D效果


# 移动端开发总结

## meta知识

## 学习

移动端常用的三个事件是：`touchstart`、`touchmove`和`touchend`。

- 事件的绑定，使用`addEventListener`，因为使用`on`会存在前后覆盖的问题，并且在`Chrome`里有时会失效。
- 事件对象`event`，是事件绑定函数的第一个参数。
- 阻止`document`的`touchstart`默认行为使用`event.preventDefault()`可以阻止文本的选中以及系统菜单的出现。问题是也会阻止页面的滚动。如果有些文字需要被选中，可以阻止当前元素的冒泡行为`event.stopPropagation()`。
- 点透事件，是由于`300ms`延迟，后导致`a`链接的`click`事件触发，`href`进行跳转。
```
// 方法1： 阻止a链接的click事件默认行为
document.querySelectorAll('click', function(ev){
    ev.preventDefault()
}, {passive: false})

// 方法2： 阻止document的touchstart默认行为，缺点很多
document.querySelector('touchstart', function(ev){
    ev.preventDefault()
})

// 方法3： 不通过href做跳转，通过data-href
document.querySelectorAll('touchstart', function(ev){
    location.href = this.getAttribute('data-href') 
}, false)
```
- 我们可以通过传递 passive 为 true 来明确告诉浏览器，事件处理程序不会调用 preventDefault 来阻止默认滑动行为()。
  

```
```

**参考资料**
-[ 移动Web滚动性能优化: Passive event listeners](https://segmentfault.com/a/1190000007913386)

## 常见问题

## 常用移动端框架












































# 移动web开发常见问题


**1. 移动端如何定义font-family?**

中文字体使用系统默认即可，英文用Helvetica。

```css
/* 移动端定义字体的代码 */
body{font-family:Helvetica;}
```

参考[《移动端使用字体的思考》](http://www.cnblogs.com/PeunZhang/p/3592096.html)


# 响应式

## viewport

如果没有加viewport，视口宽度默认是980px(html)，这是因为最初大屏手机刚出来时，设计手机浏览器的时候，为了让pc网站正常显示而设定的，可以通过手指缩放进行浏览。

现在，大屏手机已经很常见了，基本所有网站都会制作手机网站，为了更好的显示，需要将视口宽度设置为屏幕宽度。

viewport就是浏览器的可视区域，它和浏览器的窗口没什么关系。比如viewport(980),而iphone6是375

```
<meta name="viewport" content="width=device-width,initial-scale=1.0">
```

上面代码会将可视区宽度设置为设备宽度。

## 媒体查询 


## 尺寸问题

- 物理像素：是绝对长度
- css像素px：是相对长度
比如iphone6  css像素/物理像素 = 2，当用户缩放屏幕到1倍大时，css的1px = 1个物理像素

window.devicePixelRatio 表示 设备物理像素/设备独立像素
比如iphone5 物理像素是 640px 设备独立像素相当于设备的尺寸， 是320pt

1pt = 1/72英寸
ppi: 像素密度，每英寸的像素数
ppi = Math.sqrt(x*x + y*y) / 屏幕尺寸
dpi 每英寸打印的点数，打印分辨率

三个viewport

- layout viewport 默认viewport document.documentElement.clientWidth
- visual viewport 浏览器可视区域大小 window.innerWindow
- ideal viewport  移动设备理想viewport 


尺寸相关：
1. 设备的物理像素分辨率  640px
2. CSS像素分辨率： 设备像素宽度 320px


## 相关概念

window.devicePixelRatio = 设备物理像素 / 设备独立像素 

设备物理像素，解释是设备能显示的最小单位，实际就是设备分辨率，比如iphone6















## 参考

- [关于 iOS 中 pt 的误解](http://www.zcool.com.cn/article/ZNDA1ODcy.html)
- http://www.cnblogs.com/PeunZhang/p/3441110.html


# 移动端事件详解

## 学习
- [移动端touch事件(区分webkit 和 winphone)](http://www.cnblogs.com/PeunZhang/p/3407453.html#question_3)
- [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent)
- [fastclick readme.md](https://github.com/ftlabs/fastclick)
- [移动页面点击穿透问题解决方案](http://www.ayqy.net/blog/移动页面点击穿透问题解决方案/)
- [300ms tap delay, gone away](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away) 

## 总结

**1. 支持的事件有哪些？**

- touchstart：手指触屏时触发
- touchmove：手指在屏幕上滑动时触发，通常在滑屏页面，通过event.preventDefault()阻止页面滚动。而且当其离开目标元素时，其target和touchstart目标也相同。
- touchend：手指离开屏幕时触发
- touchcancel：系统停止跟踪触摸时触发，比如突然页面alert()一个提示框时。这个事件比较少用

**2. 常用的event对象属性有哪些？**

- touches：屏幕上所有手指的信息
- targetTouches：手指在目标区域的手指信息
- changedTouches：最近一次触发该事件的手指信息
- touchend时，touches和targetTouches信息被删除，changedTouches保存的最后一个的信息。
- clientX、clientY 手指changedTouches[0]在显示区的坐标
- target：当前元素

**3. 移动端click延迟的原因和解决方法？**

移动设备上，用click事件会存在300ms的延迟，有时甚至点击失效。这是因为click时，设备不知道用户是单机还是双击缩放，所以需要等300ms后才能确定。所以这个延迟实际是双击缩放造成的。

解决思路是，禁止缩放页面：
- android通过设置`width=device-width`，这是因为chrome 32+禁止了`width=device-width`的网页缩放。旧的浏览器采用`user-scalable=no`来禁止页面缩放。
- ie11+可以通过css的`touch-action: manipulation;`禁止页面缩放。ie10需要加前缀`-ms-touch-action: manipulation`
- 可以通过touchstart事件，而不用click

在实际项目中，一般是使用库来解决的。
- [fastclick](https://github.com/ftlabs/fastclick)可以解决在手机上点击事件的300ms延迟。
- [zepto](https://github.com/madrobby/zepto)的touch模块，tap事件也是为了解决在click的延迟问题。

> 最新的移动系统（android和ios）都已经处理了300ms延迟问题，详细看上面学习资料里的[300ms tap delay, gone away](https://developers.google.com/web/updates/2013/12/300ms-tap-delay-gone-away) 

**4. 移动端点击穿透问题**

在移动端，比如a链接上面有个遮罩，点击时遮罩消失，之后页面也会进行a链接跳转，这就穿透了遮罩，点了a链接。

这和移动端事件的相应顺序有关：

```
1、ontouchstart 
2、ontouchmove 
3、ontouchend 
4、onclick
```

点击遮罩时，它虽然是用的touchstart事件，没有绑定click，但是依然会在300ms之后触发click事件。所以，后来又触发了屏幕相应位置a链接的click事件，发生跳转。

解决方法最好是是：
- 只用touch事件，包括a链接
- fastclick：上面学习资料文章中说有bug，我查了一下fastclick的issue，貌似没有解决。但是android 4.2已经过时了，所以可以用。

## 实战

1. 写一个点击穿透的例子，并用上面的解决方法解决穿透问题。

## 深入

- [fastclick源码阅读](./fastclick.md)



- [【读fastclick源码有感】彻底解决tap“点透”，提升移动端点击响应速度](http://www.cnblogs.com/yexiaochai/p/3442220.html)
- [提升手持设备点击速度之touch事件带来的坑！](http://www.cnblogs.com/yexiaochai/p/3391015.html)
- [原生andriod浏览器回退后dom（click）事件全体失效问题](http://www.cnblogs.com/yexiaochai/p/3498650.html)
- [【移动端兼容问题研究】javascript事件机制详解（涉及移动兼容）](http://www.cnblogs.com/yexiaochai/p/3462657.html)
- [【小贴士】【stringify神BUG】【localstorage失效】【消灭Safari alert框】【是否延迟加载】【页面10px白屏】](http://www.cnblogs.com/yexiaochai/p/3858994.html)
- [Web网页启动app及传参的方式](https://www.jianshu.com/p/94425b560ca4)
- [Universal Links – Make the Connection](https://www.raywenderlich.com/128948/universal-links-make-connection)



- [再聊移动端页面的适配 (最新的适配方案)](https://www.w3cplus.com/css/vw-for-layout.html)
- [如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)


- [移动端适配方案(上)](https://github.com/riskers/blog/issues/17)
- [深入了解viewport和px](http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201509/376281.shtml)




# 移动web页面适配历史方案

> 写这篇文章查阅了很多资料，花费了很多时间，自己动手也写了些测试案例，最终终于自认为是大致了解了移动端的适配方案和原理。这些都是一些曾经的方案。

最新的方案请看[移动web页面适配最新方案](/docs/front-1/mobile/adapter-new.md)

## 学习资料

- [移动端适配方案(下)](https://github.com/riskers/blog/issues/18)
- [使用Flexible实现手淘H5页面的终端适配](https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html)
- [手机百度移动适配切图解决方案介绍](http://js8.in/2015/12/12/手机百度移动适配切图解决方案介绍/)
- [移动端高清、多屏适配方案](http://div.io/topic/1092)
- [从网易与淘宝的font-size思考前端设计稿与工作流](http://www.cnblogs.com/lyzg/p/4877277.html)
- [移动端高清屏适配方案](https://juejin.im/entry/585b653061ff4b0058026ca4)
- [MobileWeb 适配总结](http://html-js.com/article/MobileWeb)
- [移动端字体单位font-size选择px还是rem](http://www.cnblogs.com/PeunZhang/p/3407453.html#question_2)
- [走向视网膜（Retina）的Web时代](https://www.w3cplus.com/css/towards-retina-web.html)
- [再谈Retina下1px的解决方案](https://www.w3cplus.com/css/fix-1px-for-retina.html)

可能遇到的一些问题：

- [flexible移动布局使用rem，但字体大小为什么使用px?](https://www.zhihu.com/question/44243091)
- [现在网页设计中的为什么少有人用 11px、13px、15px 等奇数的字体？](https://www.zhihu.com/question/20440679)

## 适配方案

结合上面的学习资料，应该知道移动端的适配方法大致有下面几种：

1. 宽度自适应，高度固定
1. 白色橡树说的方案：单纯只通过媒体查询设置不同尺寸屏幕的`<html>`的font-size，加rem布局。
1. 缩放viewport，直接按照设计图写
1. 淘宝h5方案：缩放viewport，动态设置`<html>`的font-size，rem布局

下面详细说说上面的几种方案。

### 宽度自适应，高度固定

这种方案直接将高度固定写死，然后宽度通过百分比、flex等自适应。它适合要求不高的页面，比如列表展示型。

```html
<meta name="viewport" content="width=device-width,initial-scale=1">
```

### rem布局 + 媒体查询@media

因为rem是根据html节点的font-size来计算的，所以可以针对不同的设备修改`<html>`的 font-size 达到适配的效果。这种适配方案是根据屏幕大小进行适配，方案简单实用，元素采用rem布局自动缩放，文字采用px保证大小一致。不过它的每个screen是一个屏幕范围，无法对每个手机都做精准的适配。

```html
// viewport设置
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">

// css代码
<style>
html{font-size:10px}
@media screen and (min-width:321px) and (max-width:375px){html{font-size:11px}}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:12px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:15px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:20px}}
@media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
@media screen and (min-width:800px){html{font-size:25px}}
</style>
```

### 宽度固定，viewport缩放

原理是直接按照设计稿的尺寸进行布局，然后利用js将viewport修改成对应的比例，比例为`设备宽度/设计稿宽度`，即进行等比例缩放。这种方案是对整体布局和文字都进行了缩放。

![](./img/adapter2.gif)

```html
<meta name="viewport" content="width=640,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no">
```

不过看了一下上面学习资料中的例子，现在[荔枝FM](http://m.lizhi.fm/)、[网易新闻](http://c.3g.163.com/CreditMarket/default.html) 都是只设置了下面一句，可能是已经没有兼容性问题了：

```html
<meta name="viewport" content="width=640,user-scalable=no">
```

### 淘宝h5方案

这种方案是淘宝采用的方案，它是上一个方案的改进版，改进内容是：将文字用px设置，不进行缩放，保证大小一致；适配高清的iphone屏。

我们知道，如果在上一个方案的基础上改进的话，保证文字大小一致是个难题。于是它采用的方法是：

1. 所有安卓设备的initial-scale=1，font-size为屏幕宽度/10，这样1rem就是 1/10屏幕宽。(不用viewport缩放的原因是有些android原生浏览器，initial-scale不等于1是无效的)
2. iphone设备由于是retina 高清屏幕，为了避免模糊，所以先将它<html>的font-size放大成window.devicePixelRatio倍，然后再用viewport缩小。(android 也有retina屏幕，但是不处理是因为有些androiddpr不准)

![](./img/adapter3.png)

看完上面的解释，还是云里雾里。结合它的[源代码flexible.js](https://github.com/amfe/lib-flexible/blob/master/src/flexible.js)就比较好理解了，核心代码如下。

```javascript
if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
}

docEl.setAttribute('data-dpr', dpr);
if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');

    // 这里的scale，android设备都是1，ios设备才有区分
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var wrap = doc.createElement('div');
        wrap.appendChild(metaEl);
        doc.write(wrap.innerHTML);
    }
}

function refreshRe(){
    // 这里相当于是根据 viewport 的scale 得到页面的宽度
    // android都是1倍宽度
    // ios是 宽度/scale，比如iphoneX 是 375/0.3333 = 1125
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
        width = 540 * dpr;
    }

    // 设置 <html> 的font-size 为屏幕宽度的 1/10，这样1rem就是 1/10宽度
    // iphone 的retina 屏幕会被处理，其fontSize会因为上面的width而放大，然后meta viewport又将它缩小了
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    flexible.rem = win.rem = rem;
}

win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
}, false);

// pageshow类似load，但是load是页面从缓存中读取则不触发，pageshow是只要页面加载就触发
// e.persisted是一个boolean，表示页面是否是从缓存中读取的
win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }
}, false);

// 处理页面文字的大小
if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
} else {
    doc.addEventListener('DOMContentLoaded', function(e) {
        doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
}


refreshRem();
```

看完上面的代码，清晰了一些，元素的适配很简单，只需要用rem即可。但是如果自定义文字大小呢？如果用px做单位，android上是正常的。iphone下却会缩小了。所以，需要通过[flexible.css]设置来修复这个问题：

```
div {
    width: 1rem; 
    height: 0.4rem;
    font-size: 12px; // 默认写上dpr为1的fontSize
}
[data-dpr="2"] div {
    font-size: 24px;
}
[data-dpr="3"] div {
    font-size: 36px;
}

// sass
@mixin font-dpr($font-size){
    font-size: $font-size;

    [data-dpr="2"] & {
        font-size: $font-size * 2;
    }

    [data-dpr="3"] & {
        font-size: $font-size * 3;
    }
}
@include font-dpr(16px);
```

flexible库详细的使用方法：[点击查看flexible github仓库](https://github.com/amfe/lib-flexible/tree/master)

到这里，大家应该都知道如何做移动端适配了。如果还是不知道，请慢慢思考并动手实践。

接着再说说这个方案的问题：
- iframe里貌似有问题（官方说的，我没有测试）
- 布局时px转rem是个问题，可以通过[postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem)，配置webpack自动完成。


# 移动we调试

移动 web 调试，主要是开发调试和真机调试。开发调试直接用 chrome 浏览器就可以。真机调试就需要一些其他的工具了，主要有。

- vconsole：在页面上生成一个类似 chrome 开发工具的盒子。里面可以查看 console、network等。
- spy-debugger：可以抓包，查看 html 等

## 学习资料

- [vConsole](https://github.com/Tencent/vConsole)


## vconsole

## spy-debugger




http://up.qq.com/2015/m/up/interactive.shtml
http://www.ui.cn/detail/57440.html
https://www.zhihu.com/question/30348181


# 移动端事件交互

## 事件

- touchstart 
- touchmove
- touchend

addEventListener 和 on 的区别。

1. 不会存在覆盖问题
2. 事件冒泡和捕获

事件对象

阻止默认事件：长按时文字选中(可以通过阻止冒泡让某个文字选中)和弹出系统菜单。

```javascript
document.addEventListener('touchstart', (e) => e.preventDefault() )
```

问题：上面会让滚动条滚动失效。

阻止冒泡： e.stopPropagation()

阻止ios页面回弹效果：document 的 touchstart 或 touchemove 事件。

[iOS safari 苹果手机如何阻止页面弹性“橡皮筋效果”？](https://www.zhihu.com/question/22256539)

preventoverscroll.min.js

点击穿透问题：
描述：div下面有个a，div点击时消失，但是触发了a的点击。
原因：PC鼠标事件移动端也可以使用，事件的执行会有300ms延迟。移动端事件是立马执行。所以会`touchstart -> click`。
解决方法：
1. 阻止div元素的默认事件，部分安卓不支持。
2. 不使用鼠标事件，不用a标签做页面跳转。

a链接误触问题：页面滑动时，刚好在a链接上抬起手指，页面会跳转。
解决方法：
1. 阻止a链接默认行为，a touchmove添加标记 ismove = true，touchend时判断ismove来是否跳转。

- e.touches: 当前屏幕上手指列表
- e.targetTouches: 当前元素上的手指列表
- e.changedTouches: 触发当前事件的手指列表



# 移动端微信H5场景制作有几个问题

- 第一个是页面适配，在不同尺寸下自适应，这个采用rem布局来解决
- 第二个是页面滑动效果的制作，采用swiper.js库 http://www.swiper.com.cn/ 
- 第三个是页面中元素的动画效果，采用animate.css库

下面来大致介绍一下如何制作：

## 轮播库的用法

首先需要引入 swiper.js、swiper.css 文件。
http://www.swiper.com.cn/download/index.html#file5

```markup
<section id="main">  // 用来限制页面最大宽度
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">1</div>
            <div class="swiper-slide">2</div>
        </div>
    </div>
</section>
```

## rem布局

原理：根据移动设备的宽度改变html的fontSize，以至于自动自适应布局。

**样式**
```css
html{
    font-size: 100px;
}
html,body{
    width: 100%;
    height: 100%;
}
```

**javscript**
```javascript
;(function(){
    var desW = 640;  // 设计稿的宽度
    var winW = document.documentElement.clientWidth;
    var rate = winW/desW;
    var main = document.getElementById('main');
    if(winW>desW){
        main.style.width = desW + 'px';
        return; // 限制最大宽度为设计稿的宽度
    }
    document.documentElement.style.fontSize = rate*100 + 'px';
})();
```

## 动画库animate.css的使用

要给页面中元素添加动画，只需要像下面这样就可以了:

```css
.page1.swiper-slide-active .box{
    -webkit-animation: bounceIn 1s;
    animation: bounceIn 1s;
}
```



# meta基础知识

### 学习

- [【原】移动web资源整理](http://www.cnblogs.com/PeunZhang/p/3407453.html#meta)
- [移动端网页设置的viewport 设置target-densitydpi有什么作用？](https://segmentfault.com/q/1010000006437059)
- [移动前端开发之viewport的深入理解](http://www.cnblogs.com/2050/p/3877280.html)
- [A tale of two viewports — part one](https://www.quirksmode.org/mobile/viewports.html)、[中文版](https://www.jianshu.com/p/6920a0d42a04)
- [A tale of two viewports — part two](https://www.quirksmode.org/mobile/viewports2.html)、[中文版](http://www.360doc.com/content/13/0918/12/8445249_315365119.shtml)
- [meta viewport](https://www.quirksmode.org/mobile/metaviewport/#link18)
- [淘宝的flexible适配方案为什么只对iOS进行dpr判断，对于Android始终认为其dpr为1?](https://www.zhihu.com/question/38303534)

### 总结

**1. 通用的模板**
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<!-- H5页面窗口自动调整到设备宽度，并禁止用户缩放页面 -->
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">

<!-- ios safari将网站添加到快速启动方式时，顶部状态栏样式，可选default、black、black-translucent -->
<meta content="black" name="apple-mobile-web-app-status-bar-style">

<!-- 忽略页面中的电话号码 -->
<meta content="telephone=no" name="format-detection">

<!-- 忽略android平台对邮箱地址的识别 -->
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>

<body>
这里开始内容
</body>

</html>
```

**2. target-densitydpi是什么？**