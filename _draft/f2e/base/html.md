---
        title: 无名
        ---
        # doctype

## 学习资料

- [https://www.w3.org/html/ig/zh/wiki/HTML5/syntax](https://www.w3.org/html/ig/zh/wiki/HTML5/syntax)
- [html dtd声明有必要吗？](https://www.zhihu.com/question/21974902)
- [CS002: DOCTYPE 与浏览器模式分析](http://w3help.org/zh-cn/casestudies/002)
- [怪异模式（Quirks Mode）对 HTML 页面的影响](https://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/)


## 总结

早期html是基于SGML(标准通用标记语言)的，DTD作用是定义SGML文档的文档类型，用于浏览器解析。html5不基于SGML，所以不需要DTD。但是为了兼容以前的浏览器。所以需要：

```html
<!DOCTYPE html>
```

现代浏览器一般有多种渲染模式：标准模式、怪异模式(quirks)和近乎标准模式。上面的 DTD 在 ie6&7 下会触发近乎标准模式，ie8之后都是标准模式。

所以现在只需要上面简化的 doctype 就行。

通过`document.compatMode`可以获取文档的渲染模式。它的值有：
- BackCompat: 标准兼容模式未开启，没写doctype
- CSS1Compat: 标准兼容模式开启



# table表格

## 属性(5个)

**`border-collapse`**

`border-collapse` 表示表格的边框是否合并。默认情况下，`table`，`tr`,`td`，`th` 都是有各自的边框的，设置这个属性值为 `collapse` 后，相邻的边框会合并为一条。

另外设置为 `collapse` 后，会忽略 `border-spacing` 和 `empty-cells` 属性。

```
border-collapse: collapse / separate
```

当给 `tr` 设置 `border` 时，发现没有生效，这个时候，需要设置 `border-collapse:collapse`。

**`border-spacing`**

`border-spacing` 设置相邻单元格边框间距，（只有当border-collapse:separate时有效）。

```
border-spacing: length length;  // 水平 垂直间距
```

尽管它是设置在 `table` 上，但是 `table` 里的所有元素都会继承。

**`caption-side`**

`caption-side` 设置表头的位置，可以设置为 `top` 或 `bottom`。

**`empty-cells`**

`empty-cells` 规定是否显示表格中的空单元格上的边框和背景。可选值是 `show` 和 `hide`。

**`table-layout`**

`table-layout` 用于设置表格的布局算法，可选值是：automatic 和 fixed。

默认是`automatic`，自动表格布局。列的宽度是由单元格中没有换行的最宽内容决定。这个算法会当表格内容全部加载完才显示。

`fixed`是固定表格布局。它直接按设置的宽度渲染，不考虑单元格的内容。第一行加载完就显示。


## 不要使用的属性

样式直接用css就可以控制了，不要再使用下面的属性。

- border
- cellpadding
- cellspacing
- rules：内侧边框的那部分是可见的
- summary：表格摘要
- width
- frame：外侧边框显示哪些是可见的



# 内联文本语义




**`<data>`**

用于将制定内容和机器可读的翻译(可能是产品id或其它)联系在一起。翻译用value表示。

```
<data value="198290192">番茄酱</data>
```
上面的代码，在机器看来198290192就是番茄酱。


**`<time>`**

用来表示时间或日期。比如：

```
<p>This article was created on <time pubdate>2011-01-28</time>.</p>
<p>The concert took place on <time datetime="2001-05-15 19:00">May 15</time>.</p>
```
可以使用`pubdate`表示发布时间，或者使用`datetime`详细说明时间。

**`<var>`**

用来表示变量的名称，或者由用户提供的值。

```
<p> A simple equation: <var>x</var> = <var>y</var> + 2 </p>
```

**`<wbr>`**

表示软换行，当浏览器窗口宽度不够时，会在该标签处进行换行。如果宽度够，则不会换行。


自定义checkbox， radio样式 http://ife.baidu.com/course/detail/id/23


# 浏览器内核有哪些

浏览器的核心部分是"Rendering Engine",翻译为渲染引擎，不过我们习惯叫浏览器内核。

## 目前内核主要有

- Trident：ie和国产浏览器的兼容模式。
- Gecko：firefox。
- Webkit：Safari，国产浏览器极速模式，Android默认浏览器。
- Blink：基于Webkit，Chrome和Opera目前使用。
- Edge：js用的是Chakra内核，html排版引擎是：edgeHTML

## 已经没用的内核：

Presto：Opera之前使用。

## 排版引擎

- WebCore：苹果公司开发，它是基于KHTML的。
- KHTML：HTML网页排版引擎，Webkit、WebCore都是基于它。

> 如何查看chrome内核，在浏览器地址栏输入： chrome://version/




### web简史

web 全称为 world wide web。

最初由于网络上资源只能单点传输，这样共享科研资料非常不方便。Tim博士想出了一个中央服务器共享，客户端浏览的结构，并且自己一个人实现了服务器、客户端以及数据传输协议http。

http发展：http最知名的是http1.1版本，在2005年推出了http2.0。


### html结构

下面是一个最简单的`html`结构。

```HTML
<!doctype html>
<html>
<head>
    <title>html文档</title>
    // 这里是文档的元数据信息
</head>
<body>
</body>
</html>
```

`<!doctype html>`叫做文档类型声明，它的作用是告诉浏览器这是一个`html5`文档，浏览器就可以用对应的标准来解析它。除了`html5`文档声明之外，还有`xhtml`等声明，不过都已经过时了。

`head`元素里的内容包括三个方面：

1. 文档的元数据，比如标题，字符编码等
2. 外部文件，比如css,js等
3. 浏览器自定义的一些标签

`body`元素里放的文档的内容。

元素的结构是：`<tag>内容</tag>`，是成对的，有些元素没有结束标签，比如 br，img，hr，input。这些元素末尾可以加一个`/`表示结束符，也可以不加。

## html语义

每个元素都有其语义，比如p表示`paragraph`段落，ul表示`unorder list`无序列表。div表示`division`一块内容。

html语义化的代码好处：

1. 形成一套行业标准。写的代码方便其他人查看，便于团队开发和维护。
2. 去掉css样式，结构也十分清晰。
3. 搜索引擎优化

## 行内元素和块级元素

`html`元素根据其页面布局表现可以分为行内元素和块级元素。 块级元素是默认独占一行，行内元素是挨个排列的，宽度由内容决定，超出的会换行显示。


常见的块级元素有：`div`、`p`、`ul`、`li`、`ol`、`dl`、`form`、`hr`、`table`、`address`、`h标题`等。

常见的行内元素有：`a`、`input`、`img`、`span`、`em`、`b`、`i`等。

## 元素嵌套规则

1. 块级元素与块级元素平级、内嵌元素与内嵌元素平级 
2. 块元素可以包含内联元素或某些块元素，但内联元素不能包含块元素，它只能包含其它的内联元素
3. 有几个特殊的块级元素只能包含内嵌元素，不能再包含块级元素
4. 块级元素不能放在标签p里面
5. li 标签可以包含 div 标签，因为li 和 div 标签都是装载内容的容器

## 实体字符

在html文档中，`<` 、`>`、`"`等这些字符都有其含义，比如标签符号，如果要显示一个`<`，最好使用它的字符实体。
常见的实体字符：

```javascript
空格    &nbsp;
>   &gt;
<   &lt;
&   &amp;
©   &copy;
×   &times;
¥   &yen;
```



# 表单

## form 

`form`元素本身主要有2个属性：

- `name`：表示表单的名称。
- `action`：表示表单提交的处理地址。值可以被`<button>`或`<input>`中的`formaction`属性覆盖。
- `method`：表示提交内容的方式，默认是`get`，可以设置为`post`。
- `autocomplete`：表示输入框是否应该启用自动完成功能。默认是`on`，也可以设置为`off`
- `enctype`：表示发送服务器之前，如果对表单数据进行编码。
    - `application/x-www-form-urlencoded`：发送前编码所有字符。
    - `multipart/form-data`：发送前不对字符编码，有文件上传时必须使用该值。
    - `text/plain`：空格转换为`+`加号，但不对特殊字符编码。
- `novalidate`：表示不会对元素进行验证。添加了` novalidate="novalidate"`之后，对`type='email'`不进行格式验证。
- `target`：默认是`_self`，可选值是`_blank`，`_parent`，`_top`，`framename
`。
    
form表单元素的几个通用属性：

- name：表示字段名称
- value：表示字段值（最后提交的表单数据就是所有的字段值）
- disabled：添加该属性后，表单空间会被禁用（不可用和不可点击），数据也不会被提交。
- readonly：加上该属性即表示只读，只读元素不能修改，数据会被提交。

## `<input>`元素

- size: 表示输入控件的长度，以字符记，默认是20。html中，只有type是text,search,tel,url,email和password时有用，type是其它值时会被忽略。该值必须大于0，否则会自动改为20。
- maxlength：规定输入字段允许的最大长度。超过就输入不了了。该属性不会提供任何反馈，要提醒用户需要使用js。
- type:
    - button: 没有默认行为
    - checkbox：复选框，使用checked属性指示控件是否被选择，使用value表示提交的值。
    - color：用于提交一个颜色值，格式是`'#00000'`
    - date： 选择年月日，格式是`2017-10-21`
    - datetime： 选择时间、日期、月、年（UTC 时间），貌似谷歌不支持
    - datetime-local：选择时间、日期、月、年（本地时间），体验不好
    - time：
    - week：
    - email：可以用:`valid` 和`:invalid` css伪类
    - file： 可以用accept属性定义可选文件类型，比如图片可以设置为`accept="image/*"`，如果需要指定可以：`accept="image/gif, image/jpeg"`
    - hidden：控件不会显示，但是值会被提交
    - image：图片提交按钮，必须使用`src`和`alt`
    - month：可输入年月，没有日
    - number：输入数字，不能输入小数
    - password
    - radio
    - range：默认值是`min:0, max:100, value:min+(max-min)/2, step:1`
    - reset：将表单内容设置为默认值 
    - search：输入搜索字符串的单行文本字段，换行会自动移除。
    - submit：提交表单
    - tel：可以用:`valid` 和`:invalid` css伪类
    - text：单行字段
    - url
- accept：可以是以 STOP 字符 (U+002E) 开始的文件扩展名。（例如：".jpg,.png,.doc"）。可以是 一个有效的 MIME 类型，但没有扩展名。 `audio/* `，`video/*`，`image/*`。
- autocomplete： 值可以是on和off。
- autofocus 自动获得焦点,第一个元素
- autosave
- checked：用于`type`是`radio`和`checkbox`
- disabled
- form，知名所属的form
- formaction
- formenctype
- formmethod
- formnovalidate
- formtarget
- height：如果type是image，则是定义图片高度
- list
- max：此项目的最大（数字或日期时间）值不得小于其最小值（min属性）值。
- min
- maxlength
- minlength
- multiple：type是email或file时生效
- name
- pattern：当类型属性的值为text, search, tel, url 或 email时，此属性适用，否则将被忽略。
- placeholder
- readonly：如果是hidden, range, color, checkbox, radio, file, 或 button 类型，会被忽略
- required
- selectionDirection
- size
- spellcheck
- tabindex

## `<datalist>`元素

datalist要和input连用，通过属性list和id连在一起，和select类型的区别是：datalist可以输入。

```html
<label>Choose a browser from this list:
    <input list="browsers" name="myBrowser" /></label>
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Internet Explorer">
</datalist>
```

## `<meter>`元素

`<meter>`元素用来显示已知范围的标量值或者分数值。属性有：

- value
- min：默认是0
- max：默认是1
- low：低值区间的上限值
- high：定义了高值区间的下限值。
- optimum：最佳取值
- form

## `<fieldset>`元素

fieldset 元素可将表单内的相关元素分组。

## `<legend>`元素

用作`fieldset`的标题

## `<output>`元素

用于计算的结果。

```
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
    <input type="range" name="b" value="50" /> +
    <input type="number" name="a" value="10" /> =
    <output name="result"></output>
</form>
```

## `<textarea>`元素

- cols：文本域的可视宽度，必须是正数，默认是20
- rows：输入文本的行数，显示的高度
- resize:none ：设置样式，取消文本域右下角的默认的灰色斜杠
- disabled
- form
- maxlength
- minlength
- selectionDirection
- selectionEnd：选中文本光标所在末尾位置，汉字也是一个字符算
- selectionStart：选中文本的开头位置
- spellcheck：全局属性，对可编辑内容进行拼写检查
- wrap：指定文本换行的方式，默认是soft，
    - soft：表示不会自动插入换行符。
    - hard：达到最大宽度的时候会自动插入换行符(CR+LF)

textarea的value属性只能通过js进行设置，写在元素上不生效，设置需要设置其innerHTML。

另外textarea的基线html5并没有指定，在Gecko内核的浏览器中 <textarea> 的基线是文本的第一行的基线。其他的浏览器可能把元素的底部设置为基线。所以不要用vertical-align: baseline ，在不同浏览器中的外观是不确定的。

## `<select>`、`<optgroup>`、`<option>`元素

optgroup可以将option进行分组显示。

## `<button>`元素

button设置name后，value值可以被提交。其type可选值是submit,reset,button,menu。

## `<label>`元素

- for


## `<progress>`元素

```
<progress value="70" max="100">70 %</progress>
```



