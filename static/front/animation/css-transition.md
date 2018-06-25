# transition过渡

transition是过渡。可以控制元素从某个状态自然过渡到另一状态。

```css
div {
    width: 100px;
    height:100px;
    background: red;
    transition: 1s all ease
}
div:hover{
    width: 150px;
    height: 150px;
    background: blue;
}
```

上面的代码，当鼠标放在盒子上时，盒子会自然的放大和变色。这种设置一个起点和终点，浏览器自动补齐中间状态的动画，也叫补间动画。

`transition` 是几个属性的集合：

- `transition-property`：设置哪些属性会过渡，多个属性用逗号分隔，省略不写就默认是`all`，表示全部。
- `transition-duration`：设置过渡的时间
- `transition-delay`： 延迟多长时间开始过渡
- `transition-timing-function`： 缓动函数，即描述物体快慢的函数
    - `ease`： 慢快慢
    - `linear`：匀速
    - `ease-in`：加速
    - `ease-out`：减速
    - `ease-in-out`：先加速再减速
    - `cubic-bezier(n, n, n, n)`：贝塞尔曲线，n 在 0-1 之间。我们可以通过这种方式自定义缓动函数。

这里有3个问题：

1. 哪些属性可以过渡？
2. 过渡的时间、延迟的时间，这两个值写的时候顺序是怎么样的？
3. 缓动函数到底是什么？

接下来一一介绍。

## 哪些属性可以过渡?

## 过渡和延迟时间的编写顺序问题?

## 缓动函数到底是什么

自然界中，物体通常都不是匀速运动的，而是会加速和减速。所以利用这种规律做出自然的运动，会产生更好的用户体验。

缓动函数的原则：

1. 缓动使动画感觉更自然
2. 为UI元素选择缓出动画
3. 避免缓入或缓入缓出动画，除非很短，这类动画会让用户觉得迟钝。

缓入(慢入)即先慢后快；缓出(慢出)即先快后慢。

**缓动关键字**

css变换和动画都可以给动画使用缓动函数(timing)，也可以自定义缓动函数。

css中可以使用的关键词有：`linear`、`ease-in`、`ease-out`、`ease-in-out`。资料来源：[css变换，W3C](https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property)。

还可以使用 steps 关键字，它可以用来创建逐帧动画，后面再讲。先来看看缓动函数曲线。

- linear: 线性动画，也叫匀速动画

<img src="./imgs/linear.png" style="width:250px;"/>

- ease-in: 缓入动画，先慢后快
- ease-out: 缓出动画，先快后慢
![](./imgs/ease-out.png)
- ease-in-out: 缓入缓出动画，先慢在快后慢
![](./imgs/ease-in-out.png)

上面缓动函数结合图片来看是很简单的。我们可以通过它来控制物体的快慢变化。

如果要自定义缓动动画，下面这几个网站会有帮助：

- http://easings.net/zh-cn  引入后，可以直接使用
- http://cubic-bezier.com/  用来生成bezier曲线函数

关于js的缓动函数，可以参考GreenSock 的 TweenMax（或 TweenLite，如果您想要超轻量版本）是一个强大的框架，您可以在小型 JavaScript 库中获得很多控制，它是一个非常成熟的代码库。有大量缓动选项可供使用。[TweenMax 文档](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/)
