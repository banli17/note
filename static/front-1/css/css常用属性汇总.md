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

ul, ol {
 /* 第一个none表示image，outside表示position，第二个none表示type */  
 list-style: none outside none; 
}
表格属性

border-collapse：是否合并表格边框
border-spacing：相邻单元格边框之间的距离
table-layout：设置表格的布局算法
上面三个属性，只作用于 table 元素，其余元素都没有作用，如：

table {
 border-collapse:collapse;
 border-spacing: 0;
 table-layout: fixed;
}
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

div {
 width: 200px;
 min-height: 400px;
}
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

p {
 background: #f00;
}
div {
 background: url(logo.png) no-repeat #fff;
}
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