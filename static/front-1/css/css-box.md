# css盒子

## 盒模型

每个元素都是一个盒子，由 width，height，padding，border，margin组成。

块级元素上面属性都是生效的。行内元素，宽高，上下margin无效。

## box-sizing

`box-sizing`属性可以用来控制盒子的`padding`、`border`是内减模式，还是外扩模式。

## 元素的显示隐藏

**display:none**
- 元素都隐藏了，包括子元素
- 在页面不占空间
 
**visibility:hidden**
- 只是当前元素隐藏，子元素还可以通过设置`visibility: visible`来显示
- 在页面还占空间，可以理解为透明度成0了

**overflow:hidden**
- 默认情况下，子元素溢出会显示出来
- `overflow: hidden` 直接将超过子元素截掉
- `overflow: auto` 超出会有滚动条。

## `overflow:hidden`

- 都是标准文档流，则可以隐藏掉超出部分
- 子元素`position:'absolute'`,父元素不设置`position:'relative'或'absolute'`，子元素始终显示，如果设置了，则隐藏超出部分。
- 子元素`position:'fixed'`始终会显示


## display:none
- 元素相当于直接不显示了
- 子元素也隐藏

## visibility: hidden
- 只是隐藏，位置还在，相当于`opacity:0`
- 子元素不管有没有定位，都会隐藏掉

## 背景

- 背景的属性

```
background: #fff url() no-repeat top left / 100px 100px;
```
- 渐变背景  background-image
    - linear-gradient
    - radius-gradient
    
**linear-gradient**

线性渐变的语法如下：

```
<linear-gradient> = linear-gradient([ [ <angle> | to <side-or-corner> ] ,]? <color-stop>[, <color-stop>]+)
<side-or-corner> = [left | right] || [top | bottom]
<color-stop> = <color> [ <length> | <percentage> ]?
```

`angle` 默认是向上，也就是 `0deg`(to top)，比如 `90deg` 是顺时针旋转。

`repeating-linear-gradient` 是重复线性渐变。

**radial-gradient**

```
-webkit-radial-gradient([<position> || <angle>,]?[<shape> || <size>,]?<color-stop>,<color-stop>[,<color-stop>]*);
```

- position 表示圆心的位置，默认是以盒子中心为圆心
- angle 是角度
- shape 可以指定 circle 和 ellipse（默认）
- size 定义渐变的大小，closest-side，farthest-side，closest-corner，farthest-corner
- color stop的百分比是以圆心到四边的长度来计算的

repeating-radial-gradient

- 雪碧图的原理和使用


子元素的padding 设置为 100%时，是以父元素的宽度来计算的。
