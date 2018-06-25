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