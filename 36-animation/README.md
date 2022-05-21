# 动画

-   时间线 Timeline
-   Animation

如何使用？

```
let animation = new Animation(
    object,
    property,
    start,
    end,
    duration,
    delay,
    timingFunction,
)

let animation2 = new Animation(object2, ....)

animation.start()

animation.pause()
animation.resume()

animation.stop()


setTimeout
setInterval
requestAnimationFrame

// 如果每次调用 animation.start, 都执行一下, 性能是不过关的
// 将 animation 添加 timeline, 进行合并操作
let timeline = new Timeline()
timeline.add(animation)
timeline.add(animation2)

timeline.start()
timeline.pause()
timeline.resume()
timeline.stop()
```
