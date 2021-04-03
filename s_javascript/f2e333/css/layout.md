---
title:  布局
sidebar_label: css 布局
---


## 正常流布局

```html live
hello
```

### 正常流的行为

正常流的排版行为，就是依次排列，排不下了就换行。

float 的规则是使得一些盒占据正常流需要的空间

vertical-align: 规定如何在垂直方向对齐盒子。分为基线、文字顶/底、行顶/底、中线。

margin 折叠：可以将 margin 理解为一个元素规定了自身周围至少需要的空间。

### 正常流原理

在 CSS 标准中，规定了如何排列每个文字和盒子的算法，这个算法依赖一个排版的当前状态，CSS 把它叫做"格式化上下文(formatting context)"。

可以认为排版过程是：格式化上下文 + 盒子/文字 = 位置。

盒子分为块级盒和行内级盒，所以排版规定了块级格式化上下文和行内级格式化上下文。

块级格式化上下文是每个块盒子独占一行，从上往下排列。行内级格式化上下文是每个盒子从左往右排列(受书写方向影响)。

正常流中的盒子或文字排版，分为三种情况：

1. 遇到块盒子，排入块级格式化上下文。
2. 遇到行内盒子或文字，新建一个行盒(行盒是块级，归入块级格式化上下文)，它内部会创建一个行内级格式化上下文，如果排列不下，则再重新创建一个行盒。
3. 遇到 float 盒，把盒的顶部对齐到当前行内级上下文边缘，根据 float 方法把盒对应边缘对齐到块级格式化上下文边缘，之后重排当前行盒。

![](/img/css/layout/float.png)

另外，格式化上下文边缘的空格会被忽略，只有行内级格式化上下文内部的空格才有效。

```js
<div>
    111
    <div style="height:10px;background: blue;"></div>
    <div style="height:10px;background: gold;"></div>
    <span>x</span> 只有这里的空格才有效 <span>y</span>
</div>
```

除此之外，一些元素还会在内部创建新的块级格式化上下文。

- 浮动元素
- 绝对定位的元素
- 非块级，但是能包含块级的容器(如 inline-block，table-cell，table-captions)
- 自身为块级，且属性 overflow 不为 visible。

### 等分布局

```html
<div class="outer">
    <div class="inner"></div>
    <div class="inner"></div>
    <div class="inner"></div>
</div>

.outer{
    font-size: 0;     // 文本干扰
    width: 201px;     // 配合后面的 margin-right ，兼容一些浏览器
}

.inner{
    display: inline-block;
    width: 33.3%;
    height: 100px;
}

.inner:last-child{
    margin-right: -5px; 
}
```

float 也能实现效果，但是它只能顶对齐。不如 inline-block 灵活。

### 自适应宽度

```
<div class="outer">
    <div class="bar"></div>
    <div class="content"></div>
</div>

.outer{
    font-size: 0
}
.bar{
    display: inline-block;
    width: 100px;
    transform: translateZ(0); // 防止 content 有背景色时将 bar 覆盖掉
}
.content{
    margin-left: -100px;
    padding-left: 100px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
}
```

## table 布局

## flex 布局

### flex 布局原理

当给一个盒子设置了 `display: flex` 属性后，它的子元素就形成了 flex 布局模型。flex 模型图如下：

![](/img/css/layout/flex.png)

父盒子有如下 6 个属性:

- flex-direction：主轴方向。
    - `row` 默认
    - `row-reverse`
    - `column`
    - `column-reverse`
- flex-wrap：一条轴线排不下时，如何换行。
    - `nowrap` 默认
    - `wrap`
    - `wrap-reverse`
- flex-flow: 上面2个属性的缩写
    - `row nowrap` 默认
- justify-content
    - `flex-start` 默认
    - `flex-end`
    - `center`
    - `space-between`
    - `space-around`
- align-items: 项目在交叉轴上如何对齐
    - `stretch` 默认
    - `flex-start`
    - `flex-end`
    - `center`
    - `baseline`
- align-content: 多根轴线的对齐方式，如果只有一根轴线，该属性不起作用
    - `stretch` 默认
    - `flex-start`
    - `flex-end`
    - `center`
    - `space-between`
    - `space-around`

子盒子的属性：

- order：子盒子的排序。默认值为 0
- flex-grow: 父盒子空间有富余时，子元素怎么占用
- flex-shrink: 子盒子空间超出父盒子空间时，子元素怎么收缩
- flex-basis: 在主轴上的长度，会覆盖width或height属性
- flex: 上面3个属性的缩写
    - `0 1 auto` 默认
    - auto (1 1 auto) 
    - none (0 0 auto)
- align-self: 子盒子自身在副轴上的分布，覆盖父盒子的`align-items`。


### 垂直局中问题


```html
<div id="parent">
  <div id="child">
  </div>
</div>

#parent {
  display:flex;
  width:300px;
  height:300px;
  outline:solid 1px;
  justify-content:center;
  align-content:center;
  align-items:center;
}
#child {
  width:100px;
  height:100px;
  outline:solid 1px;
}
```
### 两列等高问题

```
<div class="parent">
  <div class="child" style="height:300px;">
  </div>
  <div class="child">
  </div>
</div>

.parent {
  display:flex;
  width:300px;
  justify-content:center;
  align-content:center;
  align-items:stretch;
}
.child {
  width:100px;
  outline:solid 1px;
}
```

### 自适应宽度问题


```html
<div class="parent">
  <div class="child1">
  </div>
  <div class="child2">
  </div>
</div>


.parent {
  display:flex;
  width:300px;
  height:200px;
  background-color:pink;
}
.child1 {
  width:100px;
  background-color:lightblue;
}
.child2 {
  width:100px;
  flex:1;
  outline:solid 1px;
}
```

## Grid 布局


## 参考资料

- 重学前端
- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
- [Flexbox 布局的最简单表单](http://www.ruanyifeng.com/blog/2018/10/flexbox-form.html)
- [flexbox demo](https://demos.scotch.io/visual-guide-to-css3-flexbox-flexbox-playground/demos/)
- [CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
- [A Complete Guide to Grid ](https://css-tricks.com/snippets/css/complete-guide-grid)