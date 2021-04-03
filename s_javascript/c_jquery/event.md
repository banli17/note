# 事件绑定

## 事件基础

DOM0
onclick = null 可以赋一个函数

DOM2

addEventListener
事件模型： 捕获和冒泡

事件委托

-   利用冒泡机制
-   性能优化

## jQuery 事件绑定 API

```
// 底层都是 on
.bind()  // 直接给元素添加事件程序，元素必须已经存在，没有利用委托机制，而且会给选中的所有元素绑定
.live()  // 已经废弃，事件处理程序绑定到 document 上，a 连接也会冒泡上去， ios 只有body 冒泡
.delegate() //
.on()
.one()

.unbind()
.undelegate()
.off()
.trigger()
.triggerHandler()
```

归根结底还是 addEventListener/attachEvent 处理。

委托的不足

-   并非所有事件都能冒泡：如 load, change, submit, focus, blur
-   加大管理复杂

## jquery 事件处理机制解决了什么问题

1. 不同浏览器下的事件兼容
2. 一个事件类型添加多个事件函数，一次添加多个事件类型的处理函数
3. 简洁的定义方式
4. 允许自定义事件
