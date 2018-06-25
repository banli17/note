# css动画简介

css中动画分为2种，补间动画和帧动画。补间动画是设定一个初始和结束状态，浏览器自动完成中间的过渡。帧动画相比补间动画而言，可以设置多个中间状态。

下面是补间动画和帧动画的区别：

1. 补间动画只设置初始和结束状态，帧动画可以设置多个中间状态。
1. 补间动画只执行一次，帧动画可以重复执行
1. 补间动画由 `transition` 实现，帧动画由 `animation` 实现。
1. `transition` 需要交互才能执行，而 `animation` 可以独立执行。
1. `transition` 无法控制暂停和播放，`animation` 可以控制。

在css中，并不是所有的属性都可以动画。不支持动画的属性如下：

- background-image
- float: none -> left
- display: none -> block
- visibility: hidden -> visible
- width,height auto -> 100px
- position  static -> absolute

其实这些不支持动画的属性很好理解，稍微想一下就知道它们为啥不支持了。


https://github.com/amfe/article/issues/34



# 过渡与动画


## 基础

```
transition：复合属性。检索或设置对象变换时的过渡效果
transition-property：检索或设置对象中的参与过渡的属性
transition-duration：检索或设置对象过渡的持续时间
transition-timing-function：	检索或设置对象中过渡的类型
transition-delay：检索或设置对象延迟过渡的时间
animation
animation-name
animation-duration
animation-timing-function
animation-delay：延迟时间
animation-iteration-count：数字或 infinite。
animation-direction：normal/reverse/alternate(先正常再反向)/alternate-reverse(先反向，再正向)
animation-play-state：running/paused，可以让动画暂停或开始，比如 :hover 的时候
animation-fill-mode：none/forwards(停在结束状态)/backwards(停在开始状态)/both(结束或开始状态)
```

`transition-timing-function/animation-timing-function` 可以指定一个调速函数，默认是ease，还有`ease-in`、`ease-out`、`ease-in-out`、`linear`，作为补充，也可以指定贝塞尔函数：cubic-bezier(x1,y1,x2,y2)。它接受2个坐标，分别是控制锚点的坐标。x轴是时间[0,1]，y轴是动画进度。从逻辑上来说,只要我们把控制锚点的水平坐标和垂直坐标互换,就 可以得到任何调速函数的反向版本。

<img src="http://www.w3croad.com/images/20170508/animation.jpg">

- <a href='cubic-bezier.com'>贝塞尔图形化工具</a>
- <a href='https://daneden.github.io/animate.css/'>animate.css</a>

## 弹跳动画

物体从高处落下，弹跳2次，然后停止不动。
```
@keyframes bounce { 
    60%, 80%, to {
        transform: translateY(400px);
        animation-timing-function: ease; 
    }
    70% { transform: translateY(300px); }
    90% { transform: translateY(360px); } 
}
.ball {
    /* 外观样式 */
    animation: bounce 3s cubic-bezier(.1,.25,1,.25); 
}
```

## 参考

- https://github.com/cssmagic/CSS-Secrets
