---
title: "深入学习动画"
date: 2017-09-13 21:43:35
toc: true
---

## 动画的形式

动画的形式有三种：

1. 逐帧动画：利用人眼的视觉暂留，一秒钟放24张图片，人眼就感觉不到图片切换之间的空隙了。
2. 形状变形：比如方形变圆形。
3. 运动变形：物体自身的变化，比如移动、缩放、旋转、改变透明度。

我们先只讨论运动变形动画。

## 动画的一些参数

试想一下，我们要做一个运动变形动画需要知道哪些条件?

物体的起始状态、终点状态、中间状态、经历了多长时间、缓动函数(运动快慢)、运动的路径等。


## 我的动画史

最初我们是通过flash来制作动画，很多年前也会一点点，现在都忘记了。后来是通过js定时器来做动画(如旧版jquery)，再后来是css3(比如animation.css)。

js定时器做动画、css的transition、animation这些，我都特意学过。看了下animation.css的代码，也都能够看懂。但是动画的应用却很缺乏，对一个页面不知道哪里应该加动画，怎么加动画，我争取通过这一专题，来解决这个问题。

## css3动画

css3新增了两个属性：transition和animation。


### animation动画

上面的transition只能设置起始状态和终点状态，我们不能控制中间的状态。而animation可以让我们增加中间状态。它的定义语法如下：

```
// 定义一个动画，名字叫fade-in
@keyframes fade-in{
    0{opacity:0}
    20%{opacity:0.2}
    50%{opacity:0.8}
    100%{opacity:1}
}

// 使用它
div{
    animation: fade-in 1s
}
```

上面首先定义了一个叫fade-in的动画，设置了四个帧，然后div使用了它。浏览器同样会补齐这四帧的中间状态。

`animation` 是下面几个属性的简写：

- `animation-name`：动画的名字
- `animation-duration`：动画的事件
- `animation-delay`：延迟多长时间开始动画
- `animation-timing-function`：缓动函数
- `animation-iteration-count`：动画的重复次数
- `animation-direction`：动画的方向，是正向运动还是反向运动。
- `animation-play-state`：
- `animation-fill-mode`:
    - 默认值是`none`，结束时停留在元素默认原始位置。
    - 当值设置为 `forwards` 时，动画执行完后会停在 animation 最后一帧的位置上。
    - 当值设置为 `backwards` 时，如果设置了delay，元素刚开始动画前，会停留在 0% 第一帧的位置。否则是停留在元素默认位置。
    - `both`

如果动画没有设置最后一帧，则最后一帧为元素的默认位置，而不是0%处。




## 常见的css动画库

- https://github.com/daneden/animate.css
- https://github.com/miniMAC/magic
- https://github.com/IanLunn/Hover
- https://github.com/h5bp/Effeckt.css
- https://github.com/lukehaas/css-loader

## js动画基础

js动画最初是用定时器来做，后来是通过控制css3来做，再后来原生js推出了webAnimationAPI。接下来依次讲解。

前端制作动画主要有下面几种方式：

1. css3过渡和动画
2. javascript动画
3. svg动画
4. gif动画




## css对比javascript动画






## 视图切换动画

## 选择合适的缓动

- 为 UI 元素使用缓出动画；Quintic 缓出是一个非常好（虽然比较快速）的缓动。
- 一定要使用动画持续时间；缓出和缓入应为 200 毫秒 - 500 毫秒，而弹跳和弹性缓动的持续时间应更长，为 800 毫秒 - 1200 毫秒。

一般来说，缓出将是正确的选择，当然也是很好的默认选择。它开头较快，使动画有反应快速的感觉，这一点很受欢迎，但在结尾有一个不错的减速。

其他缓动公式应谨慎使用，特别是弹跳或弹性缓动，并且仅在适合于项目时才使用。很少有东西会像不协调的动画那样让用户体验很差。如果您的项目不是为了追求乐趣，那么就无需使元素在 UI 周围进行弹跳。相反，如果您将要创建一个轻松欢乐的网站，那么请务必使用弹跳！

关于缓动类型的完整列表及其演示，请参阅 [easings.net](http://easings.net/zh-cn#)

给项目添加的任何动画均须有正确的持续时间。若太短，动画让人感觉有攻击性和突然；若太长，则让人觉得很卡和讨厌。

缓出：约 200 毫秒 - 500 毫秒。这让眼睛有机会看到动画，但不会觉得卡顿。
缓入：约 200 毫秒 - 500 毫秒。请记住，它在结尾将晃动，没有时间量变化将缓和这种影响。
弹跳或弹性效果：约 800 毫秒 - 1200 毫秒。您需要留出时间让弹性或弹跳效果“停下”。若没有这点额外时间，动画的弹性跳动部分看上去比较有攻击性，让人感觉不舒服。

## 给模态框设置动画

模态视图用于重要消息，并且您有很好的理由来阻止用户界面。应谨慎使用模态视图，因为它们具有破坏性，如果过度使用，会很容易破坏用户体验。但是，在某些情况下，它们是适合使用的视图，并且加上一些动画将使其变得生动。

- 应谨慎使用模态视图；如果不必要地打断用户的体验，他们会感到失望。
- 给动画加上缩放可实现不错的“掉落”效果。
- 当用户关闭模态视图时，应迅速将其清除。但是，应让模态视图以较慢的速度进入屏幕，以防使用户感到突然。

不对称的动画定时

一般的经验法则为：

对于用户交互触发的 UI 动画，例如视图变换或显示元素，采用快速前奏（短持续时间）和慢速结尾（较长持续时间）。
对于由代码触发的 UI 动画，例如错误或模态视图，采用较慢前奏（较长持续时间）和快速结尾（短持续时间）。

## 动画与性能
在设置动画时应保持 60fps，因为任何卡顿或停顿都会引起用户注意，并对其体验产生负面影响。


注意您的动画不能导致性能问题；确保了解对指定 CSS 属性设置动画的影响。
改变页面（布局）结构或导致绘图的动画属性特别消耗资源。
尽可能坚持改变变形和透明度。
使用 will-change 来确保浏览器知道您打算对什么设置动画。

应尽可能避免给触发布局或绘制的属性设置动画。对于大部分现代浏览器，这意味着将动画限制为 opacity 或 transform，两种都可经浏览器高度优化；动画是由 JavaScript 还是由 CSS 处理并不重要。


使用 will-change 属性
使用 will-change 来确保浏览器知道您打算改变元素的属性。这使浏览器能够在您做出更改之前进行最合适的优化。但是，请勿过度使用 will-change，因为过度使用可能导致浏览器浪费资源，进而引起其他性能问题。

一般经验法则是，如果动画可能在接下来的 200 毫秒内触发（由用户交互触发或由应用的状态触发），则对动画元素使用 will-change 是个好主意。对于大多数情况，在应用的当前视图中您打算设置动画的任何元素都应启用 will-change，无论您打算改变哪个属性。在我们在之前的指南中一直使用的方框示例中，为变形和透明度加上 will-change 属性将产生如下结果：

.box {
  will-change: transform, opacity;
}
现在支持此属性的浏览器有 Chrome、Firefox 和 Opera，这些浏览器将在后台进行相应的优化，以支持这些属性的更改或动画设置。


CSS 对比 JavaScript 的性能
网络上有很多网页和评论从性能的角度讨论了 CSS 和 JavaScript 动画的相对优点。以下是要记住的几个要点：

基于 CSS 的动画以及原生支持的网络动画通常由一个名为“合成器线程”的线程处理。这不同于在其中执行样式、布局、绘制和 JavaScript 的浏览器“主线程”。这意味着，如果浏览器正在主线程上运行一些高开销任务，则这些动画可以继续运行而不中断。

在许多情况下，变形和透明度的其他更改还可由合成器线程来处理。

如果任何动画触发绘制、布局或同时触发这两者，则“主线程”将必须执行工作。这点同时适用于基于 CSS 和 JavaScript 的动画，并且布局或绘制的开销可能拖慢与 CSS 或 JavaScript 执行相关的任何工作，使问题变得无意义。

有关对指定的属性设置动画会触发哪个动作的详细信息，请参阅 [CSS 触发器](https://csstriggers.com/)。





















## 学习资料

- [Google Animation教程](https://developers.google.com/web/fundamentals/design-and-ux/animations/?hl=zh-cn)

注：google的教程必读。

## 简介

1. 动画是使应用吸引人的重要因素，给项目增加活力
2. 用户希望有快速响应和高度交互的用户界面
3. 动画能让交互看起来更加流畅
4. 要小心选择动画的属性，有些属性开销很大。卡顿会给用户体验产生负面影响。
5. 不要放一些无用的动画，要有策略的增强用户交互体验。

比如：如果用户点击菜单图标，滑动以显示抽屉式导航栏，或者点击按钮，则可以使用少量辉光或弹跳来确认交互。避免不必要地打断或妨碍用户活动的动画。

某些属性开销很大，可能让动画卡顿。与改变元素的文本颜色相比，改变元素的`box-shadow`需要开销大很多的绘图操作。同样，改变元素的`width`可能比改变其`transform`要多一些开销。要坚持使用`transform`、`opacity`、`will-change`。

https://csstriggers.com/

## css对比javascript动画

- 当为UI元素设置简单的动画时，使用CSS。
- 需要对动画进行大量控制时，使用JavaScript的`Web Animations API`。
- 如果需要石洞协调整个场景，使用`requestAnimationFrame`。

或者为了方便可以使用jQuery的`.animate()`或者[TweenMax](https://github.com/greensock/GreenSock-JS/tree/master/src/minified)。

## 动画的种类

- 补间动画
- 帧动画

## 补间动画

css - transition

## 创建动画

创建动画的两种主要方法：css 和 javascript。

- 使用 css 动画创建简单的一次性转换，如UI元素状态。
- 需要高级效果(如弹跳、停止、暂停、倒退或减速)时，使用 js。
- 如果使用 js 动画，选用 Web Animations API 或其他框架。

CSS 变换和动画非常适合于从侧面引入导航菜单，或显示工具提示。最后，可以使用 JavaScript 来控制状态，但动画本身是采用 CSS。

如果您需要手动协调整个场景，可直接使用 requestAnimationFrame。这属于高级 JavaScript 方法，但如果您构建游戏或绘制到 HTML 画布，则该方法非常有用。

## css动画

**过渡**

```
// css
.box {
  -webkit-transform: translate(0, 0);
  -webkit-transition: -webkit-transform 500ms;

  transform: translate(0, 0);
  transition: transform 500ms;
}

.box.move {
  -webkit-transform: translate(100px, 100px);
  transform: translate(100px, 100px);
}


// js
box.classList.add('move')；

// 过渡结束事件监听
var box = document.querySelector('.box');
box.addEventListener('transitionend', onTransitionEnd, false);

function onTransitionEnd() {
  // Handle the transition finishing.
}
```

**动画**

```
.box {
  /* Choose the animation */
  animation-name: movingBox;

  /* The animation’s duration */
  animation-duration: 1300ms;

  /* The number of times we want
      the animation to run */
  animation-iteration-count: infinite;

  /* Causes the animation to reverse
      on every odd iteration */
  animation-direction: alternate;
}

@keyframes movingBox {
  0% {
    transform: translate(0, 0);
    opacity: 0.3;
  }

  25% {
    opacity: 0.9;
  }

  50% {
    transform: translate(100px, 100px);
    opacity: 0.2;
  }

  100% {
    transform: translate(30px, 30px);
    opacity: 0.8;
  }
}
```

css动画是声明式，js动画是命令式。

## Web Animation API

```
var target = document.querySelector('.box');
var player = target.animate([
  {transform: 'translate(0)'},
  {transform: 'translate(100px, 100px)'}
], 500);
player.addEventListener('finish', function() {
  target.style.transform = 'translate(100px, 100px)';
});
```

## 缓动

自然界物体都是加减速的，没有匀速。做动画要根据这个规律。

- UI元素选择换出动画
- 避免缓入或缓入缓出动画，因为这类动画会让用户感觉迟钝

css中的关键字

- linear
- ease-in
- ease-out
- ease-in-out

还可以使用steps关键字，可缓解离散步骤的变换。

自定义缓动函数 cubic-bezier

![](./imgs/custom.png)

```
transition: transform 500ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
```

前两个数字是第一个控制点的 X 和 Y 坐标，后两个数字是第二个控制点的 X 和 Y 坐标。

为 UI 元素使用缓出动画；Quintic 缓出是一个非常好（虽然比较快速）的缓动。
一定要使用动画持续时间；缓出和缓入应为 200 毫秒 - 500 毫秒，而弹跳和弹性缓动的持续时间应更长，为 800 毫秒 - 1200 毫秒。

一般来说，缓出将是正确的选择，当然也是很好的默认选择。它开头较快，使动画有反应快速的感觉，这一点很受欢迎，但在结尾有一个不错的减速。
https://easings.net/zh-cn#

其他缓动公式应谨慎使用，特别是弹跳或弹性缓动，并且仅在适合于项目时才使用。很少有东西会像不协调的动画那样让用户体验很差。如果您的项目不是为了追求乐趣，那么就无需使元素在 UI 周围进行弹跳。相反，如果您将要创建一个轻松欢乐的网站，那么请务必使用弹跳！

缓出：约 200 毫秒 - 500 毫秒。这让眼睛有机会看到动画，但不会觉得卡顿。
缓入：约 200 毫秒 - 500 毫秒。请记住，它在结尾将晃动，没有时间量变化将缓和这种影响。
弹跳或弹性效果：约 800 毫秒 - 1200 毫秒。您需要留出时间让弹性或弹跳效果“停下”。若没有这点额外时间，动画的弹性跳动部分看上去比较有攻击性，让人感觉不舒服。

## 在视图之间设置动画

您常常需要让用户在应用的各视图之间切换，不管是从列表换到详情视图，还是显示边栏导航。在这些视图之间设置动画可以吸引用户，并让您的项目更生动活泼。


使用变换来切换不同视图；避免使用 left、top 或任何其他会触发布局的属性。
确保使用的所有动画简洁明快，并且设置较短的持续时间。
考虑在屏幕尺寸增大时您的动画和布局如何变化；考虑哪些适合小屏幕的动画用在桌面环境时可能看起来很怪。

## 模态框

- 谨慎使用模态框，如果不必要的打断用户的体验，用户会感到失望。
- 加上缩放可实现不错的掉落效果。用户关闭。
- 关闭时，应迅速清除，进入时应慢速，以防止用户感到突然。

## 不对称的动画定时

不对称的动画定时可让您在表达个性的同时快速响应用户交互，从而提升用户体验。还能使感觉出现对比，使界面在视觉上更吸引人。
经验法则是始终快速响应用户交互。

例如，当用户进行点按以显示边栏导航时，您应当尽快显示此导航，持续时间约 100 毫秒。但是，当用户清除菜单时，您可以让视图动画离开得慢一点，即大约 300 毫秒。

相比之下，在显示模态视图时，一般是显示错误或一些其他关键消息。在这种情况下，要慢一点显示视图，同样大约为 300 毫秒，但是在进行清除（由用户触发）时，应非常迅速地完成。

一般的经验法则为：

对于用户交互触发的 UI 动画，例如视图变换或显示元素，采用快速前奏（短持续时间）和慢速结尾（较长持续时间）。
对于由代码触发的 UI 动画，例如错误或模态视图，采用较慢前奏（较长持续时间）和快速结尾（短持续时间）。


## 动画与性能

- 注意您的动画不能导致性能问题；确保了解对指定 CSS 属性设置动画的影响。
- 改变页面（布局）结构或导致绘图的动画属性特别消耗资源。
- 尽可能坚持改变变形和透明度。
- 使用 will-change 来确保浏览器知道您打算对什么设置动画。

应尽可能避免给触发布局或绘制的属性设置动画。对于大部分现代浏览器，这意味着将动画限制为 opacity 或 transform，两种都可经浏览器高度优化；

使用 will-change 属性
使用 will-change 来确保浏览器知道您打算改变元素的属性。这使浏览器能够在您做出更改之前进行最合适的优化。但是，请勿过度使用 will-change，因为过度使用可能导致浏览器浪费资源，进而引起其他性能问题。

一般经验法则是，如果动画可能在接下来的 200 毫秒内触发（由用户交互触发或由应用的状态触发），则对动画元素使用 will-change 是个好主意。

CSS 对比 JavaScript 的性能
网络上有很多网页和评论从性能的角度讨论了 CSS 和 JavaScript 动画的相对优点。以下是要记住的几个要点：

基于 CSS 的动画以及原生支持的网络动画通常由一个名为“合成器线程”的线程处理。这不同于在其中执行样式、布局、绘制和 JavaScript 的浏览器“主线程”。这意味着，如果浏览器正在主线程上运行一些高开销任务，则这些动画可以继续运行而不中断。

在许多情况下，变形和透明度的其他更改还可由合成器线程来处理。

如果任何动画触发绘制、布局或同时触发这两者，则“主线程”将必须执行工作。这点同时适用于基于 CSS 和 JavaScript 的动画，并且布局或绘制的开销可能拖慢与 CSS 或 JavaScript 执行相关的任何工作，使问题变得无意义。

有关对指定的属性设置动画会触发哪个动作的详细信息，请参阅 [CSS 触发器](https://csstriggers.com/)。


1. 什么是补间动画？
2. transition的优点和局限性？
3. 《京东：2015JDC燃爆事件》(http://wqs.jd.com/promote//2015/paper/index.html)
4. 动画的过程
    - 属性分解和动画时间轴

5. 《腾讯：微众银行》http://www.sunnyzhen.com/course/demo/motorcycle/index.html?from=message&isappinstalled=0
6. 《拍拍小店全新上线》http://jdc.jd.com/fd/pp/weixiaodian_welcome/index.html

7. [The Guide To CSS Animation: Principles and Examples](https://www.smashingmagazine.com/2011/09/the-guide-to-css-animation-principles-and-examples/#more-105335)

8. [H5动画60fps之路](https://weibo.com/p/1001603865643593165786)

animation steps 用法
steps(n, start|end): n表示将两个关键帧之间的动画分为n步阶段性展示。start|end 是每个间隔从起点(从起点开始)或是终点(从结尾开始)开始发生变化。

http://www.cnblogs.com/aaronjs/p/4642015.html
- [CSS3动画帧数计算器](http://tid.tenpay.com/labs/css3_keyframes_calculator.html)

9. [拍拍无聊者联盟宣传页]()

- [主流动画实现方式总结](http://www.zuojj.com/archives/1292.html)


## 参考文章

- [CSS3制作Loading动画](http://www.alloyteam.com/page/2/?s=%E5%8A%A8%E7%94%BB)
- [JavaScript定时器与执行机制解析](http://www.alloyteam.com/2016/05/javascript-timer/)
- [CSS3 Transform的perspective属性](http://www.alloyteam.com/2012/10/the-css3-transform-perspective-property/)
- [CSS3 的 roate 与 rotateX 的顺序研究](http://www.alloyteam.com/2012/11/the-order-of-roate-with-rotatex-problem/)
- [聊聊移动端跨平台开发的各种技术](http://fex.baidu.com/blog/2015/05/cross-mobile/)
- [H5动画：轨迹移动](https://aotu.io/notes/2017/11/06/path-animation/index.html)
- [css3 animation 属性众妙](https://aotu.io/notes/2016/11/28/css3-animation-properties/)
- [CSS3动画之3D动画](https://aotu.io/notes/2016/05/06/CSS3-3D-Animation/)

- [腾讯干货！由浅入深科普最常用的八种Html 5动效制作手法](http://www.uisdc.com/8-html5-animation-method)
- [[转载]网页动画的十二原则](https://www.w3cplus.com/css3/animation-principles-for-the-web.html)
- [csstriggers](https://csstriggers.com/)
- [谷歌开发者动画手册(要翻墙)](https://developers.google.com/web/fundamentals/design-and-ux/animations/?hl=zh-cn)
- [完整的学习和使用 CSS 动画【翻译】](https://juejin.im/entry/58b25367ac502e006ca11b59)
- [快速制作高性能帧动画解决方案](http://www.alloyteam.com/2017/08/gka3/)
- [实例CSS3开场动画的制作与优化](http://www.alloyteam.com/2016/01/css3995527/)
- [使用 gka 一键生成帧动画](http://www.alloyteam.com/2017/07/gka/)
- [gif的故事：解剖表情动图的构成](http://www.alloyteam.com/2017/09/13121/)
- [【福利】乳摇动画初探](http://www.alloyteam.com/2015/08/fu-li-ru-yao-dong-hua-chu-tan/)
- [前端福利！10个免费好用功能强大的网页动画效果库](https://news.aotu.io/a/5a69a3b51b69e6003c2dda39)
- [H5动画60fps之路](https://weibo.com/p/1001603865643593165786)
- [High Performance Animations](https://www.html5rocks.com/zh/tutorials/speed/high-performance-animations/)
- [一篇文章说清浏览器解析和CSS（GPU）动画优化](https://segmentfault.com/a/1190000008015671)
- [使用 FLIP 来提高 Web 动画的性能](http://bubkoo.com/2016/03/31/high-performance-animations/)
- [CSS动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)
- [FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
- [Web Animations API polyfill](https://github.com/web-animations/web-animations-js)
- [flipjs](https://github.com/googlearchive/flipjs)
- [Boost Your CSS Animation Performance with the Repaintless.css Library](http://blog.lunarlogic.io/2016/boost-your-css-animation-performance-with-repaintless-css/)
- [Repaintless.css](https://github.com/szynszyliszys/repaintless)
- [JS动画效果](https://www.imooc.com/learn/167)
- [原生 JS 实现帧动画库](https://www.imooc.com/learn/659)
- [数学知识在CSS动画中的应用](https://www.imooc.com/learn/362)
- [CSS3的3D变换和动画](http://imweb.io/topic/556bb6f173956de01fad07f8)
- [animation动画实践](http://imweb.io/topic/55bb5e50193684376cd08b44)
- [搞定这些疑难杂症，向css3动画说yes](http://imweb.io/topic/5643850eed18cc424277050e)
- [浅谈前端动画](http://uedfamily.com/2017/04/09/genffy/fe-animation/)
- [骨骼动画原理与前端实现浅谈](http://taobaofed.org/blog/2015/11/30/animation-bone/)
- [Web Animations](https://drafts.csswg.org/web-animations/)
- [CSS Transitions](https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property)
- [SVG 动画精髓](https://www.villainhr.com/page/2017/05/01/SVG%20%E5%8A%A8%E7%94%BB%E7%B2%BE%E9%AB%93)
- [H5动画开发快车道](http://djt.qq.com/article/view/1527)
- [玩转HTML5移动页面(动效篇)](http://djt.qq.com/article/view/1400)
- [玩转HTML5移动页面(优化篇)](http://djt.qq.com/article/view/1402)
- [touches详解](https://segmentfault.com/q/1010000002870710)



## 学习文章

- [理解animation-fill-mode属性](https://www.w3cplus.com/css3/understanding-css-animation-fill-mode-property.html)
- [你所不知道的animation-fill-mode细节](https://www.w3cplus.com/css3/css-animation-fill-mode-property.html)

## 简介

`transition`的动画只能控制起始帧，而`animation`可以控制多个帧。下面我们来做一个加载圆圈不停转动的效果：

1. 通过`@keyframes`定义动画帧

```
// rotate是动画名
@keyframes rotate {
  // 也可以是0%
  from {
    transform: rotate(0deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  // 也可以是100%
  to {
    transform: rotate(360deg);
  }
}
```

2. 给元素添加`animation`属性

```css
.box {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid #eee;
  border-top-color: #ccc;
  animation: rotate 1s infinite linear;
}
```

效果如下：

![](./imgs/animation-rotate.apng)

## animation属性

`animation`属性是下面8个属性的复合属性：

- `animation-name`: 动画名称，就是`@keyframes`后面跟的名称
- `animation-duration`: 动画时间
- `animation-timing-function`: 缓动函数
- `animation-delay`: 动画延迟多少秒开始执行
- `animation-iteration-count`：动画重复次数，默认是1，可以是数字或`infinite`(无限次)
- `animation-direction`：动画的方向
    - `normal`: 默认值，正向，从 from 到 to
    - `reverse`: 反向，从 to 到 from
    - `alternate`: 先正向再反向，只有动画次数大于1时有效
    - `alternate-reverse`: 先反向再正向，动画大于1时有效
- `animation-play-state`：动画的状态，值为`running`或`paused`，可以让动画暂停或开始，比如`:hover`的时候，暂停。
- `animation-fill-mode`：设置动画起始或者结束时的帧样式
    - `none`: 就是正常动画
    - `forwards`: 结束时元素停在最后一帧
    - `backwards`: 动画开始前，元素处于第一帧状态
    - `both`:动画开始前，元素的样式设置为第一帧状态.动画结束时元素停在结束状态
    
`animation-fill-mode`调试可以通过设置`animation-play-state:paused`来查看。   
    
## transition和animation的区别

- `transition`需要借助交互，只能设置起始结束帧
- `animation`可以自动也可以交互，可以设置多帧，也可以暂停和播放

## css动画库

- [Animate.css](https://github.com/daneden/animate.css)
- [Magic CSS3 Animation](https://github.com/miniMAC/magic)
- [Hover CSS](https://github.com/IanLunn/Hover)
- [Effeckt](https://github.com/h5bp/Effeckt.css)
- [Single Element CSS Spinners](https://github.com/lukehaas/css-loaders)

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




## 学习资料

- [CSS3动画之逐帧动画](https://aotu.io/notes/2016/05/17/css3-animation-frame/)
- [CSS3动画实践](https://aotu.io/notes/2016/01/04/css3-animation/)
- [深入理解CSS3 Animation 帧动画](https://www.cnblogs.com/aaronjs/p/4642015.html)

## 简介

逐帧动画的原理是每帧不同的图像连续播放，从而产生动画效果。就比如我们小时候手快速翻动画册一样。

![](./css-frame/1.png)

## 前端实现逐帧动画的方案

css 实现逐帧动画的方案有：gif、js、animation 的 step

(1) gif

优点：gif 可以有多个动画帧，连续播放是其自身属性，是否循环也是由其本身决定的。它往往用来实现小细节动画，成本较低、使用方便。

缺点：画质上，支持色少，透明度支持差，图像毛边严重；交互上不能控制播放暂停；性能上会引起周期性重绘，性能差。

(2) js

js 的实现，是将动画帧放在背景图片中，然后js控制动画连续播放：

- 通过改变图片的`background-image`，但是多张图片会带来多个http请求，且不利于文件管理。
- 合成一张图片，改变雪碧图的`background-position`。

![](./css-frame/2.gif)

比如上图中的任务的手，通过雪碧图写下面的css代码:

```css
.hand{
    width: 135px;
    height: 135px;
    background: url("./5.1.png") no-repeat;
    background-position: 0 0;
}
.hand-wave{
    background-position: -135px 0;
}
```

然后通过控制元素的class即可实现。

```html
<div class="hand"></div>

$div.toggleClass('.hand-wave')
```

js优点是兼容性好，交互灵活，比如可以控制它的暂停播放。

(3) animation step

`animation-timing-function`除了可以设置成缓动函数外，还可以使用`steps(number_of_steps, direction)`来实现逐帧动画。

比如上面的任务可以直接通过下面的代码实现：

```css
@keyframes wave {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: -135px 0;
  }
}
.box {
  width: 135px;
  height: 135px;
  background: url("./5.1.png") no-repeat;
  background-position: 0 0;
  animation: wave steps(1, end) 1s forwards infinite;
}
```

要注意的是，steps() 的第一个参数是每个帧之间分成多少步骤。比如设置成1，就是0% - 50% 用一步完成，如果设置成2，就是两步完成，中间会再增加一步，如下图所示。

![](./css-frame/3.gif)

可以看到设置成2的时候，它是如下图运动的：

![](./css-frame/4.png)

steps()的第二个参数direction，表示该函数是左对齐还是右对齐：

![](./css-frame/steps.png)

- step-start等同于steps(1,start)：表示左连续函数，以便在动画开始时发生第一步;
- step-end等同于steps(1,end)：表示右连续函数，以便在动画结束时发生最后一步。


所以上面的 wave 设置成 steps(1, start) 表示一开始跳到50%的地方；steps(1, end)表示一开始在0%的地方，时间到了才跳到50%。

## css逐帧动画使用技巧

1) 动画帧的计算可以使用工具[CSS3动画帧数计算器](http://tid.tenpay.com/labs/css3_keyframes_calculator.html),或 less 自动计算：

```less
$spriteWidth: 140px; // 精灵宽度 
@keyframes ani {
  100% {
    background-position: -($spriteWidth * 12) 0; // 12帧
  }
}

// 使用 steps，类似下面这样
@keyframes ani {
  100% {
    background-position: -1000 0; // 12帧
  }
}
.ani {
    animation: ani steps(10, start) 1s infinite;
}
```

2) 适配方案：rem + scale

rem 的计算存在误差，所以使用雪碧图时不推荐用rem；如果是逐帧动画，由于误差会产生抖动。所以非逐帧动画部分采用rem，逐帧动画使用px，再结合js 对动画部分使用 scale 进行缩放。

## 实战

理论归理论，最终还是要实战。下面我来实战2个完整的例子：

- <<拍拍无聊者联盟宣传页>>
- <<京东年货送到家>>

### 1)、拍拍无聊者联盟宣传页

### 2)、京东到家http://jdc.jd.com/fd/promote/201601/djnianhuo/










## 学习资料

- [动画必备属性 transform](https://blog.csdn.net/Abudula__/article/details/81699242)
- [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/)
- [好吧，CSS3 3D transform变换，不过如此！](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
- [理解CSS3 transform中的Matrix(矩阵)](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)
- [线性代数拾遗（三）：线性变换以及矩阵的意义](https://mengqi92.github.io/2016/05/20/linear-algebra-3/)

## transform简介

学css动画之前必须先学习下transform属性，因为这个属性做起动画来高效方便，它还支持3D变换。(后面会讲为什么不用left)。

transform 意思是变换，也就是可以对元素进行移动(translate)、旋转(rotate)、缩放(scale)、倾斜(skew)。

## 二维2D变换

### translate偏移

语法如下，tx是x轴的偏移，ty是y轴的偏移:

![](./imgs/translate.png)

```
transform: translate(tx[,ty])
transform: translateX(tx)
transform: translateY(ty)
```

如果tx,ty是百分比的话，它的偏移是相对自身的宽和高，而不是父元素的宽高。所以可以用来设置定位剧中。

```
.box{
  position: absolute;
  top: 50%; /* 父元素高度的一半位置 */
  left: 50%; /* 父元素宽度的一半位置 */
  transform: translate(-50%, -50%); /* 元素本身的一半宽、高 */
}
```

### scale缩放

语法如下，sx，sy表示x轴和y轴的缩放比例。如果没有 sy，则 sy 和 sx 相等。

```
transform: scale(sx[, sy])
transform: scaleX(sx)
transform: scaleY(sx)
```

![](./imgs/scale.png)

### rotate旋转

语法如下，angle是顺时针角度。

```
transform: rotate(angle)

// 例子
transform: rotate(30deg)
```

![](./imgs/rotate.png)

### skew变换

语法如下，ax表示x方向的顺时针角度(像是人在x轴上加速跑，脚在前面，头在后面)，ay表示y方向的顺时针角度。

```
transform: skew(angleX[, angleY]);
transform: skewX(30deg);
transform: skewY(30deg);
```

![](./imgs/skew.png)


上面几个属性还可以组合使用，组成更复杂的变换。

```
transform: translate(30px) rotate(10deg) skew(0, 5deg);
```

### 变换中心点

默认上面的所有变换都是以元素中心为参考点，可以通过`transform-origin`来改变参考点。

```
// ox: left right center <length> <percentage>
// oy: top bottom center <length> <percentage>
transform-orgin: ox oy;
```

ox,oy 分别是 x，y 方向的位置。如果只传入一个值，另一个值默认是50%(那个方向的中心点)。

### 2D变换的本质——矩阵变换

transform 2D 除了上面的四种语法，还有一个矩阵语法，如下：

```
transform: matrix(a, b, c, d, e, f);
```

上面的`matrix(a, b, c, d, e, f)`的形式用矩阵表示，是这样的：

![](./imgs/matrix-0.png)

注意第三行是固定值`0,0,1`，所以 CSS 语法省去了这行，因为涉及到`x`、`y`和旋转，所以二维变换需要三个变量来表示。

其实变换就是起始元素和终点元素的映射。比如`transform: translate(30px, 20px)`是向x轴移动30px，y轴移动20px。也就是下面的公式：

```
// tx = 30px ty = 20px
x + tx = x'
y + ty = y'
```

稍微变换一下，让x'和x，y都关联。

```
x + 0*y + tx = x'
0*x + y + ty = y'
```

把两行的x、y系数提取出来，再补充一行(方便计算)，得到下面矩阵运算。

![](./imgs/matrix-3.png)

所以变换的本质就是坐标`(x,y)`到坐标`(x', y')`的映射。刚好矩阵可以用来描述这种数学变换。通用的二维变换矩阵就是：

![](./imgs/matrix-4.png)

### 常见的二维变换

![](./imgs/matrix-5.png)

如果每个变换都要用matrix来表示，要写很多参数，很麻烦，所以有了上面的四种简化写法。

![](./imgs/matrix-6.png)

## 三维3D变换

```
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
```


## css补间动画

css补间动画用`transition`属性来实现。它也叫做过渡。

```html
<style>
.box {
  width: 100px;
  height: 100px;
  background: #f50;
  transition: width 1s;
}
.box:hover {
  width: 200px;
}
</style>

<div class="box"></div>
```

上面的代码，css只设置了盒子起始宽度和鼠标放上去的宽度，通过transition，当鼠标放在`.box`元素上时，浏览器会自动补齐中间状态开始运动。

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





## 学习资料

- [动画必备属性 transform](https://blog.csdn.net/Abudula__/article/details/81699242)
- [Intro to CSS 3D transforms](https://3dtransforms.desandro.com/)
- [好吧，CSS3 3D transform变换，不过如此！](https://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)
- [理解CSS3 transform中的Matrix(矩阵)](https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/)
- [线性代数拾遗（三）：线性变换以及矩阵的意义](https://mengqi92.github.io/2016/05/20/linear-algebra-3/)

## transform简介

学css动画之前必须先学习下transform属性，因为这个属性做起动画来高效方便，它还支持3D变换。(后面会讲为什么不用left)。

transform 意思是变换，也就是可以对元素进行移动(translate)、旋转(rotate)、缩放(scale)、倾斜(skew)。

## 二维2D变换

### translate偏移

语法如下，tx是x轴的偏移，ty是y轴的偏移:

![](./imgs/translate.png)

```
transform: translate(tx[,ty])
transform: translateX(tx)
transform: translateY(ty)
```

如果tx,ty是百分比的话，它的偏移是相对自身的宽和高，而不是父元素的宽高。所以可以用来设置定位剧中。

```
.box{
  position: absolute;
  top: 50%; /* 父元素高度的一半位置 */
  left: 50%; /* 父元素宽度的一半位置 */
  transform: translate(-50%, -50%); /* 元素本身的一半宽、高 */
}
```

### scale缩放

语法如下，sx，sy表示x轴和y轴的缩放比例。如果没有 sy，则 sy 和 sx 相等。

```
transform: scale(sx[, sy])
transform: scaleX(sx)
transform: scaleY(sx)
```

![](./imgs/scale.png)

### rotate旋转

语法如下，angle是顺时针角度。

```
transform: rotate(angle)

// 例子
transform: rotate(30deg)
```

![](./imgs/rotate.png)

### skew变换

语法如下，ax表示x方向的顺时针角度(像是人在x轴上加速跑，脚在前面，头在后面)，ay表示y方向的顺时针角度。

```
transform: skew(angleX[, angleY]);
transform: skewX(30deg);
transform: skewY(30deg);
```

![](./imgs/skew.png)


上面几个属性还可以组合使用，组成更复杂的变换。

```
transform: translate(30px) rotate(10deg) skew(0, 5deg);
```

### 变换中心点

默认上面的所有变换都是以元素中心为参考点，可以通过`transform-origin`来改变参考点。

```
// ox: left right center <length> <percentage>
// oy: top bottom center <length> <percentage>
transform-orgin: ox oy;
```

ox,oy 分别是 x，y 方向的位置。如果只传入一个值，另一个值默认是50%(那个方向的中心点)。

### 2D变换的本质——矩阵变换

transform 2D 除了上面的四种语法，还有一个矩阵语法，如下：

```
transform: matrix(a, b, c, d, e, f);
```

上面的`matrix(a, b, c, d, e, f)`的形式用矩阵表示，是这样的：

![](./imgs/matrix-0.png)

注意第三行是固定值`0,0,1`，所以 CSS 语法省去了这行，因为涉及到`x`、`y`和旋转，所以二维变换需要三个变量来表示。

其实变换就是起始元素和终点元素的映射。比如`transform: translate(30px, 20px)`是向x轴移动30px，y轴移动20px。也就是下面的公式：

```
// tx = 30px ty = 20px
x + tx = x'
y + ty = y'
```

稍微变换一下，让x'和x，y都关联。

```
x + 0*y + tx = x'
0*x + y + ty = y'
```

把两行的x、y系数提取出来，再补充一行(方便计算)，得到下面矩阵运算。

![](./imgs/matrix-3.png)

所以变换的本质就是坐标`(x,y)`到坐标`(x', y')`的映射。刚好矩阵可以用来描述这种数学变换。通用的二维变换矩阵就是：

![](./imgs/matrix-4.png)

### 常见的二维变换

![](./imgs/matrix-5.png)

如果每个变换都要用matrix来表示，要写很多参数，很麻烦，所以有了上面的四种简化写法。

![](./imgs/matrix-6.png)

## 三维3D变换

```
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
```


## css补间动画

css补间动画用`transition`属性来实现。它也叫做过渡。

```html
<style>
.box {
  width: 100px;
  height: 100px;
  background: #f50;
  transition: width 1s;
}
.box:hover {
  width: 200px;
}
</style>

<div class="box"></div>
```

上面的代码，css只设置了盒子起始宽度和鼠标放上去的宽度，通过transition，当鼠标放在`.box`元素上时，浏览器会自动补齐中间状态开始运动。

# 过渡与动画

## 基础

```css
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

```css
element{
    transition: property duration timing-function delay
}
```

- `transition-property`：要动画的属性，多个属性使用空格分开，默认是all
- `transition-duration`: 动画时间，单位是秒，必须写，否则就没有动画效果
- `transition-timing-function`: 缓动函数，支持下面5种。
    - `ease`: 默认，先加速后减速
    - `linear`: 匀速
    - `ease-in`: 加速
    - `ease-out`: 减速
    - `ease-in-out`: 先加速后减速
- `transition-delay`：延迟多少秒开始动画

```
/*如果多个属性，每个属性时间不一样*/
transition: width 1s ease, height 5s 1s;
```

> `transition`动画是一次性的，需要交互才能执行(比如:hover，或者使用js给元素增加class)，无法暂停和播放。


## 缓动函数 timing-function

补间动画和帧动画有一些区别：

1. 补间动画只设置初始和结束状态，帧动画可以设置多个中间状态。
1. 补间动画只执行一次，帧动画可以重复执行。
1. 补间动画由 `transition` 实现，帧动画由 `animation` 实现。
1. `transition` 需要交互才能执行，而 `animation` 可以独立执行。
1. `transition` 无法控制暂停和播放，`animation` 可以控制。

在css中，并不是所有的属性都可以动画。不支持动画的属性如下：

- background-image：a.png -> b.png
- float: none -> left
- display: none -> block
- visibility: hidden -> visible
- width,height auto -> 100px
- position  static -> absolute

其实这些不支持动画的属性很好理解，稍微想一下就知道它们为啥不支持了。


https://github.com/amfe/article/issues/34


关于js的缓动函数，可以参考GreenSock 的 TweenMax（或 TweenLite，如果您想要超轻量版本）是一个强大的框架，您可以在小型 JavaScript 库中获得很多控制，它是一个非常成熟的代码库。有大量缓动选项可供使用。[TweenMax 文档](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/)





## 学习资料

- [CSS3动画之补间动画](https://aotu.io/notes/2016/05/06/Guide-To-Tween-Animation)

补间动画就是设置多个关键帧，浏览器自动补齐中间状态的动画。常见的补间动画实现方式有下面几种：

1) css animation
2) css transition
3) js：例如 tweenJS
4) svg 动画

## css transition

`transition`实现动画挺简单的，它只能设置2个关键帧:起始状态、终点状态。然后由浏览器自动补齐中间状态。

```css
.box{
    width: 100px;
    height: 100px;
    background: blue;
    transition: width 1s
}
.box:hover{
    width: 200px;
}
```

上面的代码可以看到当鼠标放在 box 上时，盒子的宽度从 100px 动画到了 200px。`transition`有一些限制：

1. 只能设置2个关键帧
2. 需要交互才能让元素执行动画，如`:hover`
3. 无法让动画重复，是一次性的，除非再次触发


事件

## css animation



- [谷歌开发者动画手册](https://developers.google.com/web/fundamentals/design-and-ux/animations/?hl=zh-cn)
- [High Performance Animations](https://www.html5rocks.com/zh/tutorials/speed/high-performance-animations/)
- [Accelerated Rendering in Chrome](https://www.html5rocks.com/zh/tutorials/speed/layers/)
- [Antialiasing 101](https://www.html5rocks.com/zh/tutorials/internals/antialiasing-101/)

- [微小店](http://jdc.jd.com/fd/pp/weixiaodian_welcome/index.html)



http://wqs.jd.com/promote//2015/paper/index.html
https://www.smashingmagazine.com/2011/09/the-guide-to-css-animation-principles-and-examples/#more-105335

## 简介

这篇文章主要是记录一下设计交互动画的结论，多看几遍记住。

**下面是我学习的文章：**

- [交互微动画设计指南](https://isux.tencent.com/articles/106.html)
- [Google动画教程](https://developers.google.com/web/fundamentals/design-and-ux/animations/?hl=zh-cn)

交互动画和聚焦于娱乐体验的动画(如动画影片、游戏动画)不同。功能性动画的目的是帮助用户理解当前的状态。交互动画包括：出入场动画、过渡和加载动画。

## 交互动画设计原则

1. 控制时长和出现频率，不增加额外操作，不干扰用户。
2. 重点突出，符合逻辑，给用户足够的阅读时间。
3. 做到过渡流畅，不卡顿。

设计过程中要思考：

1. 用户注意力集中在哪里。
2. 动画的目的是什么？
3. 动画的频率
4. 什么时候触发？

## 响应时间和持续时间

**响应时间**

- 直接触发: 100ms以内
- 间接触发: 100ms - 2s
- 超过2s才有反馈的，要加 loading 动画
- 2s-9s 的可以使用菊花加载动画
- 大于10s 设计有进度条的加载样式(如百分比)，还可以显示预期时间（如这可能需要至少1分钟）。如果时间不容易预估，可以使用已完成步数(如已下载4/50)

**乐天派UI设计**

有时候可以立即给用户反馈，比如点赞，立即看到红心被点亮的动画。然后根据服务器响应，如果失败就取消红心并提示用户。这样的设计需要满足下面条件：

1. 用户操作后，服务器99%返回成功。
2. 出错时，服务器在2s内给用户反馈。
3. 操作结果只有`成功`、`失败`两种场景。

**持续时间**

- 持续时间不超过500ms，加载动画除外
- 小元素的轻微变化效果（如渐隐渐现、大小变化等小范围变化），一般在 200~300毫秒以内
- 较大元素的复杂变化效果（如包含大范围缓动位移），可长达 400-500毫秒
- 较快的动画更容易吸引用户注意力，也更节省时间。
- 较慢的动画较少分散用户注意力，更适用于非用户直接触发的场景。
-  出场动画一般比入场动画更快 ( 如当入场动画设置为230毫秒时，出场动画可设置为200毫秒) 

## 常用动画类型

浏览器中，最常用保证性能的是位置、大小、旋转、透明度这四种属性的变化。

**线性变化**

线性变化具有 匀速、骤停 这两个特征，一般适用于与物理属性无关的过渡动画，如透明度、颜色的变化，或有规律的加载动画(循环、数值变化或进度变化)。

**曲线变化**

缓动曲线（easing）的应用范围最广、效果最自然、对用户的干扰也较小，多用于与物理属性相关的属性变化中。

- 位置的变化，使用标准曲线ease-in-out。
- 元素入场时，使用减速曲线ease-out。
- 元素出场时，使用加速曲线ease-in。

## 总结

1. 交互式动画的3大设计原则？
2. 设计前，思考什么？
3. 常用的动画类型？




## 学习资料

- [干货教程！12个常用动画原理（官方全系列）](http://uiiiuiii.com/other/121213830.html)
- http://minyos.its.rmit.edu.au/aim/a_notes/anim_contents.html
- [Animation Principles for the Web](https://cssanimation.rocks/principles/)

1. 挤压和拉伸。这个动作在角色移动时给出了重量和体积的错觉，它用于各种形式的角色动画，从弹跳球到行走的人的体重。不过要注意质量、体积是不变的。

2. 预备动作。这个动作是角色准备执行的动作，比如跳，它会首先下蹲一下。打拳需要首先后退一下。几乎所有真实动作都有重大或轻微的预期，例如投手的结束或高尔夫球手的后挥杆。

3. 分段引导。引导观众在画面的关注点，让故事的发生有明显的先后顺序。

4. 顺序渐进法和关键帧手法。特效用顺序渐进法，角色动画用关键帧手法。

5. 惯性动作和重叠动作。增加自然的真实感。

6. 缓进和缓出。跟机器人均速区别的动画节奏，增加真实感，比如汽车的启动和停止。

7. 弧形运动轨迹。现实运动规律。

8. 次要表演：辅助动作。

9. 时间节奏：越快的动作帧数越少。

10. 夸张

11. 透视，确保空间运动复合视觉科学守恒，比如近大远小，3d等。

12. 吸引力：凸显特征，让角色和动画更有趣味，省掉一些无趣的部分。




- [High Performance Animations](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
- [Accelerated Rendering in Chrome](https://www.html5rocks.com/zh/tutorials/speed/layers/)
- [前端性能优化（css动画篇）](https://www.cnblogs.com/langzi1989/p/5965818.html)
- [动画与性能](https://developers.google.com/web/fundamentals/design-and-ux/animations/animations-and-performance?hl=zh-cn)
- [动画性能优化](https://blog.csdn.net/abudula__/article/details/81707367)



# 缓动函数

自然界中，物体通常都不是匀速运动的，而是会加速和减速。所以利用这种规律做出自然的运动，会产生更好的用户体验。

缓动函数的原则：

1. 缓动使动画感觉更自然
2. 为UI元素选择缓出动画
3. 避免缓入或缓入缓出动画，除非很短，这类动画会让用户觉得迟钝。

> 缓入(慢入)即先慢后快；缓出(慢出)即先快后慢。

## css中的缓动函数

css中`transition-timing-function/animation-timing-function`两个属性可以指定缓动函数。

它的值可以是下面几种：

- `ease`: 默认值，慢速开始和结束，`cubic-bezier(0.25,0.1,0.25,1)`
- `linear`: 匀速,`cubic-bezier(0,0,1,1)`
- `ease-in`: 加速
- `ease-out`: 减速
- `ease-in-out`: 慢速开始和结束，`cubic-bezier(0,42,0,0.58,1)`。
- `cubic-bezier(n,n,n,n)`：立方贝塞尔函数

![](./imgs/time-func.png)

上图中，x轴是时间t，范围为[0, 1]，y轴是距离s。根据初中物理的知识，很容易知道是什么意思了。

从逻辑上来说,只要我们把控制锚点的水平坐标和垂直坐标互换,就 可以得到任何调速函数的反向版本。

## css缓动函数工具

通过下面2个工具，我们可以自定义自己想要的缓动函数。

- [easings.net](http://easings.net/zh-cn)
- [贝塞尔图形化工具](http://cubic-bezier.com)

## 参考资料
还可以使用 steps 关键字，它可以用来创建逐帧动画，后面再讲。先来看看缓动函数曲线。

- [CSS3中的transition属性详解](https://www.cnblogs.com/afighter/p/5731293.html)
- [animate.css](https://daneden.github.io/animate.css/)

- [mdn Using the Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)

- [QQ天气H5-前端完整解析](http://imweb.io/topic/570a7e7206f2400432c139ad)





# 从零开始做个swiper.js(一)

前一年的工作，做了很多h5微场景相关的事情。但是是一些将别人做好的场景自动导出工作，和用代码写微场景毫不相关。

只是用过像swiper.js，alloy_finger之类的框架。对里面的细节并不了解。最近在看动画相关的知识，发现里面涉及的知识很多都不知道，而且自己关于手势、动画的实战也很欠缺。所以现在是时候专门学一下了。

本系列文章将会按照自己的思想去实现一个`swiper.js`，然后再对比其源代码和我实现的区别。

## 目标

今天的目标是实现一个移动端轮播图，要求如下：

1. 手指往左右滑动时，轮播图进行切换，只需要在touchend时切换，不需要动画。
2. 试一试手指滑动时，轮播图跟着手指移动。

## 步骤

思路：和pc端轮播图一样。外层盒子刚好窗口大小，设置overflow:hidden，手指滑动时，内层盒子进行translate移动。

**1.实现index.html**

```
// index.html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
<div class="swiper-container">
    <div class="swiper-wrapper">
        <section class="swiper-section">1111</section>
        <section class="swiper-section">2222</section>
        <section class="swiper-section">3333</section>
        <section class="swiper-section">4444</section>
    </div>
</div>
<script src="index.js"></script>
</body>
</html>
```

**2.实现css文件**

```
* {
    padding: 0;
    margin: 0;
}

html, body {
    width: 100%;
    height: 100%;
}

.swiper-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.swiper-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
}

.swiper-section {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
}
```

**3.实现index.js**

```
var swiperContainer = document.querySelector('.swiper-container')
var wrapper = document.querySelector('.swiper-wrapper')
var sections = document.querySelectorAll('.swiper-section')

var activeIndex = 0      // 当前显示页面的索引
var winWidth = window.innerWidth   // 页面宽度
var startX = 0    // 手指触摸时开始位置
var moveX = 0     // 手指滑动时移动的距离
var nowX = 0      // 滚动盒子wapper当前的translateX
var direction = '' // 手指滑动的方向
var isMove = false  // 页面是否正在进行动画

/**
 * el 要运动的元素
 * target [object]
 *  transform
 *  opacity: 透明度
 *  duration: 运动时长
 *  timing: 运动函数
 */
function animate(el, target) {
	for (let i in target) {
		el.style[i] = target[i]
	}
}

function start(e) {
	var touch = e.touches[0]
	startX = touch.clientX
}

function move(e) {
	if (isMove) {
		return
	}
	moveX = e.touches[0].clientX - startX
	
	// 检测移动方向
	if (moveX < -100) { // 向左移动
		if (activeIndex == sections.length - 1) return
		direction = 'left'
		activeIndex++
		isMove = true
	}
	if (moveX > 100) { // 向右移动
		if (activeIndex == 0) return
		direction = 'right'
		activeIndex--
		isMove = true
	}
	
	// 让物体随手指运动到目标位置
	//animate(wrapper, {transform: `translate3d(${moveX + nowX}px,0,0)`})
	animate(wrapper, {transform: `translate3d(-${activeIndex * winWidth}px,0,0)`})
	
	// 延迟一些，防止触发连续滚动
	setTimeout(()=> {
		isMove = false
	}, 300)
	
	
}

function end() {
	nowX = nowX + moveX
}

document.addEventListener('touchstart', start, false)
document.addEventListener('touchmove', move, false)
document.addEventListener('touchend', end, false)
```

手指按下时，记录初始位置startX，手指滑动时，算出移动了多少距离，如果滑动距离超过100px，则切换轮播图。动画结束后，记录当前外层盒子的translateX(即nowX，这里由于动画还没有实现，所以放在touchend里)。

## 总结

好多知识之前都是详细学过，但是现在都忘记了，比如说`flex-shrink`貌似是收缩比例，不太会用。又去翻看了以前flex的笔记。

本文涉及的一些知识点:

1. `e.touches`、`e.targetTouches`、`e.changedTouches`的区别是什么？

2. 再去看看flex布局笔记。

3. 为什么用translate3d，而不是translate?
