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


