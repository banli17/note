---
title: css基础
---


## background

背景有下面8个属性：
- background-color	
- background-image
- background-repeat
- background-attachment
- background-position
- background-origin
- background-clip
- background-size

### background-color

用于设置背景颜色，当同时定义了背景图片时，图片覆盖在颜色之上。

### background-image

元素的背景占据了元素的全部尺寸，包括内边距和边框，但不包括外边距。

多个背景图片的写法：

```
background: url(1.jpg) 0 0 no-repeat;
            url(2.jpg) 100px 0 no-repeat;
```

### background-attachment 

背景依附，背景是否跟着页面滚动，默认是scroll，可以设置为fixed。

### background-position

设置背景图像的起始位置，可以设置3种类型的值：
- top left形式
- x% y%，如果只设置了一个值，另一个会是50%。100% 100%是最右下角
- xpos ypos

### background-clip

规定背景的绘制区域，可选值如下：
- border-box，表示从border开始绘制
- padding-box，表示从padding开始绘制
- content-box，表示从content开始绘制

### background-origin

规定background-position属性相对于什么位置来定位。如果设置了background-attachment为fixed，则该属性没效果。
- padding-box，默认值
- border-box
- content-box

### background-size

背景图像的尺寸，可以设置为下面这些值：
- 100px 100px ，如果只设置一个值，另一个是auto
- 50%
- cover
- contain


css值的来源有：

1. 继承父级的
2. 浏览器默认的
3. 我们自己写的


## 应用值

应用值是最终应用的样式。

如果元素本身声明了样式，则它是应用值；如果没有声明，如果该属性是默认继承，则取父元素同属性的应用值，通过该方式获得的值叫做继承值，如果属性默认不继承，则取该属性的初始值。

## 继承值


## 初始值

每个属性都有一个默认的初始值，如width: auto，font-size: medium。

## 其余值



常见继承属性

文本相关属性都可以继承

color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、letter-spacing、word-spacing、white-space、word-break、overflow-wrap、line-height、direction、text-indent、text-align、text-shadow

列表相关属性

list-style-image、list-style-position、list-style-type、list-style

表格相关属性

border-collapse、border-spacing

visibility 和 cursor

常见非继承属性

盒模型相关属性

margin、border、padding、height、min-height、max-height、width、min-width、max-width、box-sizing

布局类属性

display、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align

系列类

background 系列、transform 系列、transtion 系列、animation 系列、flexbox 系列、grid 系列


- https://www.w3.org/html/ig/zh/wiki/CSS2/cascade


## css计数器

今天想将网站左侧导航实现下面这个效果，于是想到了采用css计数器。但是又不太会，特地专门学习一下。

![css计数器](/static/img/css/css-counter.png)

css 计数器必须和伪元素的 content 属性一起使用才生效。主要属性如下：

- counter-reset
- counter-increment
- counter()/counters()

### counter-reset

counter-reset 用于指定计数器的名字，还可以设置从哪个数字开始计数(默认是0)。

![](/static/img/css/css-counter-reset1.png)

counter-reset 还可以是负数或小数，但是浏览器都不支持，会当做 0 处理(经测试 chrome 也是当做 0)。

counter-reset 还可以同时命名多个计数器。

![](/static/img/css/css-counter-reset2.png)

### counter-increment

counter-increment 用于定义计数器的递增规则，默认是增加 1。每个元素调用一次，计数器就会增加一次。

```
counter-increment: charpter 3;
```

![](/static/img/css/css-increment.png)

上图可以看到，计数器是根据 html 从上到下累加计数的。

另外，counter-increment 也可以设置多个计数器的递增规则，可以是负数，表示递减。还可以是 `none` 或 `inherit`：

```
counter-increment: charpter 3 charpter1 -1;
```

### counter()

counter() 方法可以用于显示某个计数器当前的值，最简单的用法就是 `counter(name)`。它还可以传第二个参数，表示 `list-style-type`。

> list-style-type：disc | circle | square | decimal | lower-roman | upper-roman | lower-alpha | upper-alpha | none | armenian | cjk-ideographic | georgian | lower-greek | hebrew | hiragana | hiragana-iroha | katakana | katakana-iroha | lower-latin | upper-latin

```
counter(name, style)
```


counter还支持拼接(级联)。比如：

```
body {
    counter-reset: chapter subChapter;
}

h2:before {
    content: counter(chapter);
    counter-increment: chapter 1
}

h3:before {
    content: counter(chapter) '.' counter(subChapter);  // 级联
    counter-increment: subChapter 1
}
```

![](/static/img/css/css-counter1.png)

上面的代码已经可以显示章节效果了。 

### counters() 

counters() 方法主要用来做嵌套效果。

```
counters(name, string, style)
```

string 表示子序号的连接符，style 表示 list-style-type。

嵌套是根据 counter-reset 来算的，它碰到 counter-reset 就生成一级，如果没有用 counter-reset 的元素嵌套，该元素依然和上一个元素属于同一级。(具体看上面张鑫旭的学习资料)。

### 注意事项

1. 一个元素如果设置了 counter-increment，但是它 display: none/hidden，则计数器不会增加。visibility:hidden 不会有此现象。

2. 应用举例：可以方便用于幻灯片的slide小圆点上。



## css 盒模型

每个元素都是一个盒子，由 width，height，padding，border，margin组成。

块级元素上面属性都是生效的。行内元素，宽高，上下margin无效。

### box-sizing

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

`overflow:hidden`

- 都是标准文档流，则可以隐藏掉超出部分
- 子元素`position:'absolute'`,父元素不设置`position:'relative'或'absolute'`，子元素始终显示，如果设置了，则隐藏超出部分。
- 子元素`position:'fixed'`始终会显示


display:none
- 元素相当于直接不显示了
- 子元素也隐藏

visibility: hidden
- 只是隐藏，位置还在，相当于`opacity:0`
- 子元素不管有没有定位，都会隐藏掉


子元素的padding 设置为 100%时，是以父元素的宽度来计算的。



# css基础

## css 语法

```
选择器 {
    属性: 值;
    属性: 值;
}
```

## css注释

```
/* 单行注释 */

/* 多行
   注释 */
```

## css引入的四种形式

- 行内样式
- 内嵌式
- 外链式
- `@import url(cssurl)`：可以放在`html`的`<style></style>`里面，也可以在css文件中使用。

**外链式和@import的区别在于**

1. @import 在 `<ie5.5` 下不支持（现在不考虑）
2. `link`属于`html`，`@import`属于`css`
3. 有些人说 `link` 方便用 `js` 进行 `dom` 操作，`@import` 也可以操作，而且不麻烦。

**不使用@import的原因**

这样做会导致css无法并行下载，因为使用@import引用的文件只有在引用它的那个css文件被下载、解析之后，浏览器才会知道还有另外一个css需要下载，这时才去下载，然后下载后开始解析、构建render tree等一系列操作。
    


    ## 属性和值

css的属性分为字体、文本、背景和空间，与之对应的值分为关键词、数字、数字加单位、多个值。

**字体属性**

```
font-family: '微软雅黑','宋体';
font-size: 14px
font-style: italic;
font-weight: bold;
```

**文本属性**

```
color
text-indent
text-align
line-height: 2;
text-decoration
```

**背景属性**

```
background-color
```

**空间属性**

```
width
margin
```


- 雪碧图的原理和使用


## 形状

## 列表属性list-style

list-style 是三个属性的简写

- list-style-type: none、disc、circle、square、decimal、low-alpha等
- list-style-position: inside 、outside
- list-style-image: 可以设置小图标为一个图片

不过一般都是设置 `list-style: none`，小图标直接用 `background` 来实现。




table -> div + css

table布局的缺点：

1. 加载慢，必须table加载完成后才显示给用户
2. table是表格，语义是展示数据，不应用于布局

zen garden是table->div+css的重要标志。但是后来div又被滥用了。

以前只能看class的命名才知道块是代表什么，但是现在可以直接用header,footer之类。

1. 方便团队开发和维护（看标签就知道是什么）
2. 有利于seo，不仅是人看的，还是蜘蛛看的
3. 屏幕阅读软件(盲人)，有助于正确读屏幕


## float

- 浮动最初是为了做文字环绕效果
- 浮动会造成父元素的塌陷问题
```
.clearfix::after{
    content: '';
    display: table;
    clear: both;
}
```
解决塌陷的方法
- 清除浮动：将后面的元素设置 clear:both，css2.0原理是给后面元素设置一个margintop，css2.1引入了一个清除区域的概念。只能设置浮动元素的margin-bottom，而不能设置后面元素的margin-top
- 闭合子元素浮动，有2种方法
    - 刚开始是隔墙法(不优雅，冗余),后来是利用伪元素{content:'';display:table;clear:both}
    - 新建bfc:父元素在新建一个 BFC 时，其高度计算时会把浮动子元素的包进来
        - 根元素或其它包含它的元素
          浮动 (元素的 float 不是 none)
          绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
          内联块 inline-blocks (元素具有 display: inline-block)
          表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
          表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
          块元素具有overflow ，且值不是 visible
          display: flow-root
          
          
常用的是overflow:hidden

```
<div class="container">
    <div class="box"></div>
</div
.container {
    overflow: hidden;
}
.box {
    float: left;
}
```


## display

// 基本
- none
- block
- inline: 上下margin,width,height无效
- inline-block: 有空隙
    - font-size: 0
    - 去掉空格
    
    
// table
- table,table-row, table-cell。可以直接用vertical-align

// flexbox

// grid


## 对齐问题  vertical-align 行内元素

- 四条线
- 取值及效果

http://web.jobbole.com/90844/
http://blog.jobbole.com/46574/
https://www.tuicool.com/articles/q2a6Znn

- 首先浮动元素，后面是块元素，浮动元素的起始位置带上块元素的margin-top



属性参考
CSS 属性也是一个非常庞大的知识体系，这里先介绍下一些基本的属性，方便我们入门练习，后续将慢慢学习更多。如果你对某些属性不太了解，也可以直接参考文档：

CSS 参考 - CSS | MDN
CSS 参考手册 | W3school
如何阅读 CSS 属性值定义语法。
下面的前四个相关属性（字体，文本，列表，表格）需要自己多学习实践，如有不明白，可以在上面的参考手册中查阅对应的资料（如需快速查找，可以在网页中使用ctrl+f快捷键，打开搜索，输入下面的属性，点击搜索即可找到该属性）。之后的相关属性我们以后也会慢慢讲到，你也可以先提前了解下。

字体相关属性

font-family：定义文本的字体，如：font-family: arial;
font-size：字体尺寸，如：font-size: 18px;
font-style ：字体样式，如：font-style: italic;
font-weight：字体的粗细，如：font-weight: bold;
文本相关属性

color：定义文字颜色，如：color: red;
line-height：设置行高，如：line-height: 1.5;
text-align：文本的水平对齐方式，如：text-aligin: center;
text-decoration：文本的装饰效果，如：text-decoration: underline;
text-indent：首行的缩进，如：text-indent: 2em;
text-shadow：文本的阴影效果，如：text-shadow: 0 0 5px #ff0000;
列表属性

list-style：在一个声明中设置所有的列表属性
list-style-image：将图象设置为列表项标记
list-style-position：设置列表项标记的放置位置
list-style-type：设置列表项标记的类型
上面的几个属性一般只作用于ul/ol、li元素重置的时候（其他时候几乎从来不用），使用的时候也是使用第一个简写的形式（简写形式以后的课程将会详细介绍），如：
```
ul, ol {
 /* 第一个none表示image，outside表示position，第二个none表示type */  
 list-style: none outside none; 
}
```
表格属性

border-collapse：是否合并表格边框
border-spacing：相邻单元格边框之间的距离
table-layout：设置表格的布局算法
上面三个属性，只作用于 table 元素，其余元素都没有作用，如：

```
table {
 border-collapse:collapse;
 border-spacing: 0;
 table-layout: fixed;
}
```

盒子相关

盒子相关属性可以等到学完本章的“CSS 盒子”内容之后再来查阅。

盒子大小

主要是宽高及最小和最大宽高。

width
min-width
max-width
height
min-height
max-height
box-sizing
简单示例如下：
```
div {
 width: 200px;
 min-height: 400px;
}
```
盒子边框

每个元素都有四条边，你可以给任何一条边设置边框，分别为上（top）、右（right）、下（bottom）、左（left）表示，而每个边框又包括宽度（width）、样式（style）及颜色（color）三个样式，这样组合起来就有很多属性了，不过我们一般使用简写的模式来写。

border：简写模式，四边边框
border-width：边框宽度
border-style：边框样式，常用的为solid和dashed
border-color：边框颜色
border-top：上边框
border-right：右边框
border-bottom：下边框
border-left：左边框
这里来几个简单的例子，更详细的请参考各个属性文档。
```
p {
 /* 
 四边样式 
 1px为border-width
 solid为border-style
 #f00为border-color
 */ 
 border: 1px solid #f00; 
}
div {
 border-top: 2px dashed #f00; /* 单边样式 */
}
span {
 border: 1px solid #ccc; /* 先定义四边样式 */
 border-top-color: #f00; /* 重新定义上边框的颜色 */
}
h1 {
 border: 1px dashed #999; /* 先定义四边样式 */
 border-width: 1px 2px; /* 重新边框的宽度 */
}
```
盒子内外边距

内边距为 padding，外边距为 margin，和 border 一样，也有四边可以设置，分别为上（top）、右（right）、下（bottom）、左（left），同样我们一般也采用简写的形式。

margin
margin-top
margin-right
margin-bottom
margin-left
padding
padding-top
padding-right
padding-bottom
padding-left
简单示例如下：
```
h1 {
 margin-top: 0; /* 外边距上 */
 margin-bottom: 20px; /* 外边距下 */
}
p {
 margin: 0; /* 外边距 */
}
div {
 padding: 15px 20px; /* 内边距，15px为上下值，20px为左右值 */
 margin: 0 20px 30px; /* 外边距，0为上，20p为左右，30px为下 */
}
```
盒子背景

设置背景图片，背景颜色，图片位置及是否平铺等，一般也采用简写形式。

background：总的简写形式，包括了下面各个单条属性
background-color：背景色
background-image：背景图片
background-position：背景图片起始位置
background-repeat：背景图片平铺方式
background-size：背景图片大小
background-clip：背景图片绘制区域
background-origin：背景图片的定位区域
简单示例如下：
```
p {
 background: #f00;
}
div {
 background: url(logo.png) no-repeat #fff;
}
```
盒子显示隐藏

overflow：指定当内容溢出其块级容器时,是否剪辑内容，渲染滚动条或显示内容
visibility：是否可见
盒子其他

border-radius：圆角
box-shadow：阴影
空间位置相关

这一块涉及元素定位布局，第三章会详细讲解。

display
float
clear
position
top
right
bottom
left
transform
z-index
opacity
动画相关

同样这块我们也在第三章再具体介绍

transition
animation


## css颜色

颜色的值可以设置为关键词(如red)，16进制(#ff0000)或rgb(255,0,0)，除此之外，还有2个关键词：transparent 和 currentColor。currentColor表示当前元素的文字颜色，如果没有则继承父元素的color。

css颜色名

http://www.w3school.com.cn/cssref/css_colornames.asp

十六进制

rgb定义颜色：

```
rgb(255, 0, 0)
rgb(0%, 50%, 20%);
```

rgba()
alpha透明度

hsl 是什么，回忆图片
hue(色调), saturation(饱和度), lightness(亮度)

hsl(0, 100%, 50%)

hsla()
## 十六进制和rgb的换算关系

十六进制换成rgb值的公式为:
```
ff -> 15*16 + 15 = 255
00 -> 0*16 + 0 = 0
```

## 自定义字体@font-face

@font-face 的语法规则如下：

```
@font-face {
    font-family: <fontFamily>; /* 自定义的字体名称; */
    src: <source> [<format>][,<source> [<format>]]*;  /* 自定义的字体的存放路径、格式; */
    [font-weight: <weight>]; /*  是否为粗体 */ 
    [font-style: <style>]; /*  定义字体样式，如斜体 */
}
```
其取值说明如下：

- fontFamily 此值指的就是你自定义的字体名称，如“font-family: myFirstFont”。

- source 此值指的是你自定义的字体的存放路径，可以是相对路径也可以是绝对路径。

- format 此值表达自定义的字体的格式，用于帮助浏览器识别字体类型。

- weight和style 这两个值大家一定很熟悉，weight 定义字体是否为粗体，style 主要定义字体样式，如斜体。

- https://www.dafont.com/

```
@font-face {
    font-family: Quinzey;
    src: url('./font/Quinzey.otf')
}

div {
    font-family: Quinzey;
    font-size: 30px;
}
```


## 字体格式

- TrueType (.ttf)

Windows 和 Mac 系统最常用的字体格式，其最大的特点就是它是由一种数学模式来进行定义的基于轮廓技术的字体，这使得它们比基于矢量的字体更容易处理，保证了屏幕与打印输出的一致性。同时，这类字体和矢量字体一样可以随意缩放、旋转而不必担心会出现锯齿。

- OpenType (.otf)

OpenType 是一种可缩放字型（scalable font）电脑字体类型，采用 PostScript 格式，是美国微软公司与Adobe 公司联合开发，用来替代 TrueType 字型的新字型。这类字体的文件扩展名为.otf，类型代码是 OTTO。

- Embedded Open Type (.eot)

嵌入字体格式（EOT）是微软开发的一种技术，允许 OpenType 字体嵌入到网页并可以下载至浏览器渲染。这些文件只在当前页活动的状态下，临时安装在用户的系统中。

- Web Open Font Format (.woff)

相对于 TrueType 和 OpenType ，WOFF（Web开发字体格式）是一种专门为了 Web 而设计的字体格式标准，它并不复杂，实际上只是对于 TrueType / OpenType 等字体格式的封装，并针对网络使用加以优化：每个字体文件中含有字体以及针对字体的元数据（ Metadata ），字体文件被压缩，以便于网络传输，并且不包含任何加密或者 DRM 措施。

- Scalable Vector Graphics Fonts (.svg)

顾名思义，就是使用SVG技术来呈现字体，还有一种 gzip 压缩格式的 SVG 字体 .svgz。

这么多字体带来的问题是浏览器的支持：目前现代浏览器基本都支持 .ttf、 .otf、 .woff 的字体格式。但需要注意的是 IE8以下仅支持 .eot 格式，而 .svg 目前只有 safari 支持。

## 如何兼容

通过上面我们可以了解到若在使用 @font-face 规则时仅仅考虑一种字体格式，则可能导致在某些浏览器中无法生效。因此为了兼容不同的浏览器，我们一般会使用多个格式，如下：

```
@font-face {
    font-family: 'myFont';
    src: url('myFont.eot'); /* IE9 Compat Modes */
    src: url('myFont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('myFont.woff') format('woff'), /* Modern Browsers */
}
```

可以设置多个，粗体，细。

## 自定义图标字体 (iconfont)

对于使用图片的图标来说，iconfont 图标有许多优点：

灵活性：改变图标的颜色，背景色，大小都非常简单
兼容性：基本没有兼容性问题，在IE6，Android2.3都能够兼容
扩展性：替换图标很方便，新增图标也非常简单
高效性：iconfont有矢量特性，不会失真
轻便性：在使用上字体文件和普通的静态资源一样，既可以外链也可以内链，并且字体文件也可以使用gzip压缩


## 字体资源与字体图标库

dafont
有字库
GoogleFont（需要翻墙）
字蛛
Fontello
icomoon
iconfont




# css display属性详解

我们知道，div、p、ul这些元素是单独占用一行显示的，而 span、i、em等这些元素是在一行显示的，元素的显示样式是css的范畴，它是由元素的 `display` 属性来控制的。

display的取值大致分为四类：

- 基本值：none、inline、block、inline-block
- flexbox系列：flexbox
- grid系列: grid
- table系列: table、table-cell、table-row

## 基本值

设置为`none`时，元素隐藏。

`inline`和`block`的区别除了显示效果之外，`inline`元素的行高、上下`margin` 无效。

当元素设置了 `inline-block` 时，有一个问题，就是相邻元素会产生空隙，这是由于空白字符导致的，解决方法有2个：

1. 删除空格，不推荐
2. 将父元素 `font-size` 设置为0，然后再给子元素设置 `font-size` 即可。

`inline-block`属于行内级元素，所以可以使用 `vertical-align` 设置文本对齐方式。

![](./img/inline-block-baseline.png)。

文本有四条基本线，如上图所示。

## table系列

当设置元素 `display: table` 时，它就具有了表格属性，里面的一行设置为 `display: table-row`，单元格设置为 `display: table-cell`。

而且如 `vertical-align` 这样的属性也是生效的。比如:

```
// css
.box {
    display: table;
    border-collapse: collapse;
}

.row {
    display: table-row
}

.box1 {
    display: table-cell;
    width: 100px;
    height: 100px;
    border: 1px solid red;
}

// html
<div class="box">
    <div class="row">
        <div class="box1"></div>
        <div class="box1"></div>
        <div class="box1"></div>
    </div>
    <div class="row">
        <div class="box1"></div>
        <div class="box1"></div>
        <div class="box1"></div>
    </div>
</div>
```

上面代码的显示效果如下图：

![](./img/display_table.png)




引入css有四种方式

1. 行内式

```
<div style="color:red"></div>
```

2. 内嵌式

```
<style type="text/css">
    div {color: red}
</style>
```

3. 外链式

```
<link rel="stylesheet" type="text/css" href="style.css">
```

优点是容易维护，能复用，因为浏览器有缓存。

4. @import导入方式

```
<style>
    @import url(style.css);
</style>

也可以在css文件中 @import url("style.css")或者 @import "style.css"
```

@import也是引入外部css文件，不过它和外链有如下区别：

- 范畴不同： `<link>` 属于 HTML 元素，通过其href属性来引入外部文件；而 @import 属于 CSS，所以导入语句应写在 CSS 中，要注意的是导入语句应写在样式表的开头，否则无法正确导入外部文件
- 兼容性差别： `@import` 是 `CSS2.1` 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件；而`<link>`则没有任何兼容问题；
- 加载顺序不同：当 HTML 文件被加载时，`<link>`引用的文件会同时被加载，而 @import引用的文件则会等页面全部下载完毕再被加载
- js 修改支持：`<link>`支持使用JavaScript控制DOM改变CSS样式，@import不支持




# 媒体查询media

媒体查询可以使用`and`、`not`或`only`组合。它的2种引入方式如下

```
// 1、外链，css始终会加载，只是不被应用
<link rel="stylesheet" media="print and (max-width: 800px)" href="1.css">

// 2、内嵌
<style>
    @media (max-width: 600px){
        .box{
            display: none;
        }
    }
</style>
```

除非使用not或only操作符，否则媒体类型是可选的，默认值是all(全部)。若使用了not或only操作符，必须明确指定一个媒体类型。

你也可以将多个媒体查询以逗号分隔放在一起；只要其中任何一个为真，整个媒体语句就返回真。相当于or操作符。

```
@media (min-width: 700px) { ... }
(min-width: 700px) and (orientation: landscape) { ... }
@media tv and (min-width: 700px) and (orientation: landscape) { ... }

@media (min-width: 700px), handheld and (orientation: landscape) { ... }

```

 not关键字仅能应用于整个查询，而不能单独应用于一个独立的查询。
 ```
 @media not all and (monochrome) { ... }
 // 等价于
 @media not (all and (monochrome)) { ... }
 
 @media not screen and (color), print and (color)
 // 等价于
 @media (not (screen and (color))), print and (color)
 ```
color表示彩色显示设备, media/visual。指定输出设备每个像素单元的比特值。如果设备不支持输出颜色，则该值为0。
注意：如果每个颜色单元具有不同数量的比特值，则使用最小的。例如，如果显示器为蓝色和红色提供5比特，而为绿色提供6比特，则认为每个颜色单元有5比特。如果设备使用索引颜色，则使用颜色表中颜色单元的最小比特数。

```
@media all and (color) { ... }

//向每个颜色单元至少有4个比特的设备应用样式表：
@media all and (min-color: 4) { ... }
```

```
media_query_list: <media_query> [, <media_query> ]*
media_query: [[only | not]? <media_type> [ and <expression> ]*]
  | <expression> [ and <expression> ]*
expression: ( <media_feature> [: <value>]? )
media_type: all | aural (阅读设备)| braille (盲文)| handheld | print |
  projection (项目演示，比如幻灯)| screen (彩色电脑屏幕) | tty | tv | embossed (盲文打印)
media_feature: width | min-width | max-width
  | height | min-height | max-height
  | device-width | min-device-width | max-device-width
  | device-height | min-device-height | max-device-height
  | aspect-ratio | min-aspect-ratio | max-aspect-ratio
  | device-aspect-ratio | min-device-aspect-ratio | max-device-aspect-ratio
  | color | min-color | max-color
  | color-index | min-color-index | max-color-index
  | monochrome | min-monochrome | max-monochrome
  | resolution | min-resolution | max-resolution
  | scan | grid | orientation protrait/landscape
```
媒体查询是大小写不敏感的，包含未知媒体类型的查询通常返回假。

大多数媒体属性可以带有“min-”或“max-”前缀，用于表达“最低...”或者“最高...”。例如，max-width:12450px表示应用其所包含样式的条件最高是宽度为12450px，大于12450px则不满足条件，不会应用此样式。这避免了使用与HTML和XML冲突的“<”和“>”字符。如果你未向媒体属性指定一个值，并且该特性的实际值不为零，则该表达式被解析为真。

## 实战

当做响应式设计时，需要根据不同的屏幕尺寸来设置媒体查询。常用尺寸如下：

```
- 手机横屏 544px
- 平板竖屏 768px
- pc窄屏  992px
- pc宽屏  1200px
- pc超大屏1380px
```

写媒体查询还需要考虑移动优先，或者PC优先，如果移动优先，可以先写移动端样式，再逐渐增加屏幕适配。

```
// 手机样式
.box{}

// 适配pc，大于或等于1200px。注意max 和 min 都是包含1200px
@media screen and (min-width: 1200px){}
```
这样做的好处是移动端首先加载，另外移动端一般样式简单，pc端需要覆盖的样式会很少。


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




# table表格样式

table css属性有下面几个：

- border-collapse
- border-colspacing
- caption-side
- empty-cells
- table-layout


## 属性和值

### 单位

单位分为绝对单位和相对单位。

绝对单位有：

- px
- cm
- mm
- pt
- in

相对单位有：

- %: 是相对于父元素的。
- em: 不建议使用。是按照父元素的 font-size 计算的，另外元素的 border、width、height、padding、margin、line-height 如果单位设置为 em，则是按照自身的 font-size 计算。
- rem：按照根元素 html 的 font-size 计算，修改 html 的 font-size，所有尺寸都会变化。浏览器默认字体大小是 16px，可以设置`html{font-size: 625%}`将默认字体设为 100px 方便计算。因为chrome 最小字体为 12px，所以不设置为 62.5%。
- vw: 1vw 表示视窗宽度的 1%。
- vh：1vh 表示视窗高度的 1%。
- vmin：
- vmax：

css 的单位主要有以下几个：

- px：px是绝对单位
- em：1em 等于父元素设置的字体大小。如果父元素没有设置字体大小，则继续往父级元素查找，直到有设置大小的，如果都没有设置大小，则使用浏览器默认的字体大小。其它属性border, width, height, padding, margin, line-height是参照该元素的font-size计算的，如果没有设置，则往父级查找，都没有设置，则使用浏览器默认的字体大小。计算较复杂，不建议使用
- rem：r表示root，是相对于根元素html的font-size来计算的。修改了html的font-size，则所有的尺寸都会变化。


calc 可以进行长度运算，支持 IE9+。注意括号里面运算符左右两边要有空格，如`calc(1rem - 10px)`，否则无效。


### 颜色

- RGB
- CMYK
- HLS
- RGBA
- 内置名称型颜色(140种)
- 渐变
    - 线性渐变
    - 径向渐变


**rgb 和 十六进制的转换**

```js
// 16进制转成10进制
ff -> 15*16 + 15
00 -> 0*16 + 0
```

**currentColor** 

`currentColor` 会找自己的 color 属性，如果没有，找父元素的color。

```
.parent {
    color: green;
    border-color: currentColor;
}
```

#### 渐变

background-image 的值可以设置为渐变色，渐变分为线性渐变和径向渐变。

**线性渐变**

线性渐变的语法如下

```css
linear-gradient([角度 | 方向词], color-stop1, color-stop2, ...)
```

- 角度：方向从 x 轴开始正方向旋转。0 是从下到上，90deg 是从左到右，3.14rad 表示从上到下。
- 方向词：top、right、bottom、left、left top、top right、bottom right 或 left bottom。默认是`to bottom`。
- color：表示渐变的色标
    - `rgba(0, 0, 0, 0)`
    - `yellow 10%`
    - `orange 20px`

下面是一个金色盒子的例子。

```jsx live 
class GoldBox extends Component{
    render(){
        return <div style={{display: 'flex'}}>
            <div style={{
                width: '100px',
                height: '50px',
                marginRight: '50px',
                background: 'linear-gradient(90deg, gold 10%, yellow 50%, gold 90%)'
            }}>线性渐变</div>

            <div style={{
                width: '100px',
                height: '50px',
                marginRight: '10px',
                background: 'repeating-linear-gradient(90deg, gold, yellow 10%)'
            }}>重复线性渐变</div>
        </div>
    }
}
```

```jsx live
class A extends Component{
    constructor(){
        this.state = {
            borderColor: 'transparent',
            background: 'transparent'
        }
    }

    componentDidMount(){
        let h = 25
        setInterval(()=>{
            h ++
            h = h % 360
            this.setState({
                borderColor: `hsl(${h}, 95%, 40%)`,
                background: `linear-gradient(to bottom, hsl(${h}, 95%, 54.1%), hsl(${h}, 95%, 84.1%))`
            })
            
        }, 100)
    }

    render(){
        return <div style={{
            display: 'inline-block',
            textAlign: 'center',
            textDecoration: 'none',
            padding: '.5em 2em .55em',
            border: 'solid 1px',
            borderColor: this.state.borderColor,
            background: this.state.background
        }}>变色按钮</div>
    }
}
```


```
background: #fff url() no-repeat top left / 100px 100px;
```


**径向渐变**

径向渐变的语法如下:

```css
radial-gradient([<position> | <angle>,]?[<shape> | <size>,]?<color-stop>,<color-stop>[,<color-stop>]*);
repeat-radial-gradient([<position> | <angle>,]?[<shape> | <size>,]?<color-stop>,<color-stop>[,<color-stop>]*);
```

- position 表示圆心的位置，默认是 center，以盒子中心为圆心，还可以是`top`、`bottom`。
- angle 是角度
- shape 可以指定 circle 和 ellipse（默认）
- size 定义渐变的大小，closest-side，farthest-side，closest-corner，farthest-corner
- color stop 的百分比是以圆心到四边的长度来计算的


```jsx live
function A(){
    return <div style={{
        width: 50,
        height: 50,
        background: 'radial-gradient(10px 10px, red, yellow)'
    }}></div>
}
```



## 样式计算

### 样式的继承

样式的来源有三种：

- 浏览器默认样式
- 继承的样式
- 自定义样式

哪些样式会被继承，哪些不会被继承。

比如背景、border这些不会被继承，font-size可以被继承。是通用的属性。

### 一些概念

- 应用值，如果有自定义，则使用自定义，如果没有，则看是否继承。
    - 继承：则使用父元素的应用值，这种方式叫做继承值inherit
    - 非继承，则使用初始值initial，比如width: auto。
- 初始值
- 指定值
- 计算值

### 样式的层叠

自定义样式 > 浏览器默认样式 > 继承

### 样式优先级

!import > style > id > class 伪类 属性选择器> tag 伪元素 > * > 浏览器默认 > 继承

## css reset

由于很多元素默认样式在不同浏览器上表现不一致，所以需要css reset，有2种不同的方式
- normalize.css 设置为一致
- reset.css 全部清零


## 浏览器兼容

解决浏览器兼容的步骤如下：

1. 看属性是否支持

有些属性在各个浏览器表现不一致，可以通过[can i use](https://caniuse.com/#index) 来查看。

2. 针对某个浏览器进行修复

如果要修复样式，可以使用hack， http://browserhacks.com/

```
.inline-block {
    display: inline-block;
    *display: inline;  // ie6/7不兼容
    *zoom: 1;
}
```

## 继承和非继承属性

常见继承属性

文本相关属性都可以继承

color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、letter-spacing、word-spacing、white-space、word-break、overflow-wrap、line-height、direction、text-indent、text-align、text-shadow

列表相关属性

list-style-image、list-style-position、list-style-type、list-style

表格相关属性

border-collapse、border-spacing

visibility 和 cursor

常见非继承属性

盒模型相关属性

margin、border、padding、height、min-height、max-height、width、min-width、max-width、box-sizing

布局类属性

display、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align

系列类

background 系列、transform 系列、transtion 系列、animation 系列、flexbox 系列、grid 系列

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference
- https://www.w3.org/TR/CSS22/




## 网格布局


















## 参考资料

- [CSS counter计数器(content目录序号自动递增)详解](http://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/)(都自己动手实践一遍)
- [w3.org counter](https://www.w3.org/TR/CSS2/generate.html#scope)
- [mdn Counters](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters)
- [Automatic Numbering With CSS Counters](https://dev.opera.com/articles/automatic-numbering-with-css-counters/)
- [如何居中一个元素（终结版）](https://github.com/ljianshu/Blog/issues/29)
- https://css-tricks.com/examples/ShapesOfCSS/
- https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries#Media_features
- http://www.cnblogs.com/august-8/p/4537685.html
