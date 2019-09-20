---
title: css 选择器
sidebar_label: 选择器
---


选择器由简单到复杂，可以分类为：

- 简单选择器: 针对某一特征选中元素。
- 复合选择器: 连续写在一起的简单选择器，根据元素自身特征选择单个元素。
- 复杂选择器: 由空格、>、～、+、|| 连接的复合选择器
- 选择器列表：由逗号分隔的复杂选择器，表示或。

## 简单选择器

简单选择器有：

### 全体选择器

`*` 

### 标签选择器

标签选择器有时候可能要加入命名空间，比如 svg 和 html 里都有 a 元素。

```js
@namespace svg url(http://www.w3.org/2000/svg);
@namespace html url(http://www.w3.org/1999/xhtml);
svg|a {
  stroke:blue;
  stroke-width:1;
}

html|a {
  font-size:40px
}
```

### class 选择器
### id 选择器
### 属性选择器

```css
a[href]    : 有属性的
a[href="#"]: 完全匹配#
a[href~="a b"]: 属性值是空格分开的列表，有其中一个值则匹配
a[href^="#"]: 以#开头的
a[href$="#"]: 以#结尾的
a[href*="#"]: 包含#的
a[href|="#"]: 以 # 开头或以 #- 开头
```

可以将属性值扩起来，表示 CSS 字符串，里面可以用单双引号和反斜杠转义。

### 伪类选择器

伪类选择器分为普通型和函数型。

**树结构关系伪类选择器**

- `:root`: 表示文档树的根元素。对于 HTML 来说，:root 表示`<html>`元素，只是优先级比 html 选择器更高。
- `:empty`: 表示没有子节点的元素，有空白文本节点的元素不算。
- `:nth-child()`和`:nth-last-child()`: 这两个是函数型伪类

```css
:nth-child(even){
  /* 选中偶数节点 */
}
:nth-child(4n-1){
  /* 选中 3 7 11... */
}
:nth-child(3n+1 of li.important){
  /* 选中 1 4 7 个 li.important，这里只有 li.important 会被计数 */
}
```
- `:nth-last-child`: 和`:nth-child`一样，只是方向是从后往前数。
- `:first-child`、`:last-child`: 表示选中第一个和最后一个元素。
- `:only-child`: 选中唯一一个子元素

of-type 系列，是一个变形的语法糖。`S:nth-of-type(An+B)`是`:nth-child(An+B of S)`的另一种写法。还有：

- `:nth-last-of-type`
- `:first-of-type`
- `:last-of-type`
- `:only-of-type`

**链接与行为伪类选择器**

- `:any-link`: 表示任意的链接，包括 a、area 和 link 都能匹配到。
- `:link`: 表示未访问过的链接。
- `:visited`: 表示已访问过的链接。
- `:hover`: 鼠标悬停时
- `:active`: 激活时，即鼠标按下未抬起
- `:focus`: 获取焦点时
- `:target`: 用于选中浏览器 URL 的 hash 部分所指示的元素。

在 Selector Level 4草案中，还新增了:

- `:target-within`: target 的父容器
- `:focus-within`: focus 的父容器

**逻辑伪类选择器**

- `:not(:hover)`: 3 级标准只能选中参数是简单选择器。

在 Selector Level 4草案中，还新增了:is、:where、:has，但是违背了选择器匹配 DOM 不回溯的原则，方案不知会不会通过。

**其它伪类选择器()**

还有一些伪类，在草案中或不常用，只需了解。

- 国际化
  - dir
  - lang
- 音频/视频: 用于区分播放状态
  - play
  - pause
- 时序：用于配合读屏软件
  - current
  - past
  - future
- 表格：处理 table 列的伪类
  - `nth-col`
  - `nth-last-col`


```
.box div : 后代选择器

// 新增选择器
father > child： 子元素选择器
sibling + sibling：相邻兄弟选择器
sibling ~ sibling: 后面兄弟选择器
,        : 群组选择器

// 属性选择器

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

```

## 选择器的组合

选择器列表是由逗号分隔的复杂选择器序列；复杂选择器是用空格、>、～等符号连接的复合选择器；复合选择器是连写的简单选择器组合。

选择器连接方式有优先级。

- 1级： 无符号连接
- 2级： 
    - 空格
    - >：子代
    - ～: 后继，选择后面满足条件的所有同级元素
    - +：直接后继
    - ||：列选择器
- 3级： , 

实践中，一般设置 class 来避免过于复杂的选择器结构。组件开发时，一般给外层容器加上独立的 class 避免冲突。

## 选择器的优先级

假设:

- id 数目为 a
- 伪类选择器和 class 数目为 b
- 伪元素选择器和标签选择器数目为 c
- `*` 不影响优先级

选择器的优先级算法是：

```
specificity = base * base * a + base * b + c
```

base 表示一个足够大的整数，IE6 之前采用 256 进制，于是 256 个 class 等于一个 id。之后扩大到 65536，才避免这个问题。现代浏览器采用更大的数量。

行内样式优先级高于 CSS 选择器。而`!import`优先级要高于行内样式。

重复 class 还有如下特点(下图)：

![](/img/css/selector/1.png)

## 伪元素

伪元素实际是一种机制，而不是元素，它是硬生的选出一个虚拟元素。

目前兼容性达到可用的伪元素有：

- `::first-line`
- `::first-letter`
- `::before`
- `::after`

### ::first-line 

`::first-line`: 只对块级元素有效，作用是选择元素的第一行，这里的第一行是排版后显示的第一行，与 HTML 代码中的换行无关。注意它是包裹在元素之外，所以下面代码第一行是绿色的。

```js
<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>

div>span#a {
    color:green;
}

div::first-line { 
    color:blue; 
}
```

### ::first-letter

`::first-letter`: 只对块级元素有效，作用是选择元素的第一个字母。常见英文效果，实现首字母变大且大写。

```css
p::first-letter { 
    text-transform: uppercase;
    font-size:2em;
    float:left; 
}
```

注意它是包裹在元素内，所以下面代码首字母是绿色的。

```html
<div>
  <span id=a>First paragraph</span><br/>
  <span>Second paragraph</span>
</div>

div>span#a {
    color:green;
}

div::first-letter{ 
    color:blue; 
}
```

CSS 标准只要求`::first-letter`和`::first-line`实现如下属性：

![](/img/css/selector/2.png)

### before 和 after

这两个元素是在元素中新增一个虚拟元素。

- `::before`: 相当于在元素内容开头插入一个虚拟元素。
- `::after`: 相当于在元素内容末尾插入一个虚拟元素。

它们都只有指定了 content 属性才有效。比如下面的计数器。

```html
<p class="special">I'm real element</p>
p.special::before {
    display: block;
    content: counter(chapno, upper-roman) ". ";
}
```

### :before 和 ::before 的区别

`:before`和`::before`效果是一样的，`:before`是 CSS2 提出的，兼容 IE8，`::before`是 CSS3 提出的，目的是为了区分伪元素和伪类。

H5 开发时如果不考虑兼容性，建议使用`::before`。

## 实践规则

实践中，不要使用太复杂的选择器。应该遵循规则如下：

1. id 选择单个元素。
2. class 和 class 组合选择组元素。
3. tag 确定页面布局。
4. 尽量不要使用伪类选择器。



练习题：
- 用 JavaScript 实现一个能够处理所有简单选择器的querySelector（行为伪类除外)
- 你所在的团队，如何规定 CSS 选择器的编写规范？
- 用 JavaScript 写一个仅包含 inline-block 的正常流布局算法。
- src 属性支持哪些协议的 uri   http://,https://,file://,data... blob
 