# css基础

## 选择器

```markup
*
div
.box
#box
.box div : 后代选择器

// 新增选择器
father > child： 子元素选择器
sibling + sibling：相邻兄弟选择器
sibling ~ sibling: 后面兄弟选择器
,        : 群组选择器

// 属性选择器
a[href]    : 有属性的
a[href="#"]: 完全匹配#
a[href~="#"]: 包含#的
a[href^="#"]: 以#开头的
a[href$="#"]: 以#结尾的
a[href*="#"]: 包含#的
a[href|="#"]: 以 # 开头或以 #- 开头

// 伪类选择器，相当于是自身的属性
// 动态伪类，用户交互时触发
:link, :visited  锚点伪类,a自带的效果
:hover, :active, :fouces 用户行为伪类

// ui元素状态伪类
:enabled, :disabled, :checked

div:first-child 如果是父级的第一个子元素，且是div，则选中 
div:last-child

div:nth-child()  odd=2n+1,even=2n
div:nth-last-child(n)  倒着数第n个，且是div

div:nth-of-type(2)  父级的第二个 div 子元素
div:nth-last-of-type(n)

div:first-of-type
div:last-of-type
div:only-child  只有一个子元素，且是唯一的
div:only-of-child  只有一个div子元素

:empty  没有子元素(包括文本节点)

a:not(:last-of-type)

// 伪元素选择器，元素::伪元素
:first-line  只用于块级元素
:first-letter
```









## border

- `border-width` 不能是百分比，还可以设置为`thin`(1px),`normal`(3px),`thick`(5px)。
- `border-style`的值可以是`solid`、`dashed`和`dotted`，`dashed`虚线在`ie`(长宽比2/1)和`chrome`(长宽比3/1)表现不一致。`dotted`在`chrome`为方点，而在`ie`为园点。另外还有些属性`double`(双线)、`groove`(凹槽)、`ridge`（垄状）、`inset`、`outset`。3d属性在各浏览器表现都不一致，另外现在流行扁平化，所以基本不用。
- `border-color`会继承`color`的颜色。



## filter

之前ie的`filter`已经废弃。最新的`filter`支持`edge`。

```
filter: url(resource.svg#c1)   
blur()
```





css选择器的解析是从右往左的，比如`#div a`并不是先查找id为div的元素，然后再找里面的a元素。而是首先在页面中找所有的a，再看每一个a有没有一个id为div的祖先元素。

所以，为了优化页面，需要写出高效的css选择器。

## 选择器效率

各种 CSS 选择器的效率由高至低排序如下：

- id选择器（#myid）
- 类选择器（.myclassname）
- 标签选择器（div,h1,p）
- 相邻选择器（h1 + p）
- 子选择器（ul > li）
- 后代选择器（li a）
- 通配符选择器（*）
- 属性选择器（a[rel="external"]）
- 伪类选择器（a:hover,li:nth-child）


## 优化方法

1. 不要使用通用选择器
2. 不要限制id，class选择器。比如不要写`div#box`这样的代码
3. 层级尽量减短
4. 避免使用子选择器
5. 使用继承
