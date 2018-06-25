# 移动web开发


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













































