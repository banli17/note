# 浏览器 API

## DOM

DOM API 包含三块

- DOM Tree
- Events
- Range

### Event

EventTarget

```js
target.addEventListener(type, listener[, useCapture])

target.addEventListener(type, listener[, options])
options = {
  capture: false, // default false
  once: false, // default false
  passive: false, // 如果是 true, 将不会调用 preventDefault(), 它可以提升页面滑动的流畅度
}
```

**理解passive**

> 如果我们在 touchstart 事件调用 preventDefault 会怎样呢？这时页面会禁止，不会滚动或缩放。

当你触摸滑动页面时，页面应该跟随手指一起滚动。而此时你绑定了一个 touchstart 事件，你的事件大概执行 200 毫秒。这时浏览器就犯迷糊了：如果你在事件绑定函数中调用了 preventDefault，那么页面就不应该滚动，如果你没有调用 preventDefault，页面就需要滚动。但是你到底调用了还是没有调用，浏览器不知道。只能先执行你的函数，等 200 毫秒后，绑定事件执行完了，浏览器才知道，“哦，原来你没有阻止默认行为，好的，我马上滚”。此时，页面开始滚。

- [移动Web滚动性能优化: Passive event listeners](https://zhuanlan.zhihu.com/p/24555031)

**事件流**

- 冒泡
- 捕获

## CSSOM

## BOM

## Web Animation

## Crypto
