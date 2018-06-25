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