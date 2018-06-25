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