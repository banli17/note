
html结构解析成dom树后，js可以通过 DOM API 对 dom 树进行操作。

## 节点NODE

节点的类型，都是继承自 NODE。

- Node
    - ELEMENT_NODE(1)
    - ATTRIBUTE_NODE(2)
    - TEXT_NODE(3)
    - CDATA_SECTION_NODE(4)
    - ENTITY_REFERENCE_NODE(5)
    - ENTITY_NODE(6)
    - PROCESSING_INSTRUCTION_NODE(7)
    - COMMENT_NODE(8)
    - DOCUMENT_NODE(9)
    - DOCUMENT_TYPE_NODE(10)
    - DOCUMENT_FRAGMENT_NODE(11)
    - NOTATION_NODE(12)

可以通过`.nodeType`获取节点类型，IE 没有公开 Node 函数，所以不能用如`NODE.ELEMENT_NODE`这样进行比较，但是可以用对应的数字比较。

```javascript
a.nodeType === 1
```

- `nodeName`：元素节点值为大写标签名
- `nodeValue`：元素节点值为 null
- `childNodes`：是个动态的NodeList类数组对象。可以通过`[]`或`item()`访问元素。

```
// ie8及之前无效
function convertToArray(nodes){
    var array = null;
    try {
        array = Array.prototype.slice.call(nodes, 0); //针对非 IE8之前浏览器 
    } catch (ex) {
        // IE8及之前NodeList是通过COM对象实现，不能像JScript对象那样
        array = new Array();
        for (var i=0, len=nodes.length; i < len; i++){
            array.push(nodes[i]);
        }
    }
    return array;
}
```

- `previousSibling`：没有则为 null
- `nextSibling`：没有则为 null
- `firstChild`：第一个子节点，没有则为 null
- `lastChild`
- `hasChildNodes()`：看是否有子节点
- `ownerDocument`：指向文档节点
- `appendChild()`：向 childNodes 列表末尾添加一个节点，然后对应的关系指针会更新，更新完成后返回新增的节点。如果有这个元素，则是移动到新位置。
- `insertBefore()`：插入到参考节点的前面。`p.insertBefore(newNode, 参考节点)`，如果参考节点为 null，则和 `appendChild()` 一样。
- `replaceChild()`：替换节点，`p.replaceChild(newNode, 被替换的节点)`，返回被替换掉的节点。注意被替换的节点不能是 null。
- `removeChild()`： 删除子节点，`p.removeChild(p.firstChild)`。

并不是所有节点都有子节点，在不支持子节点的节点上调用操作节点的方法，会报错。下面 2 个方法是所有类型节点都有的。

- `cloneNode()`：参数为 true 表示深拷贝，即复制该节点及其子节点。否则浅拷贝只复制该节点。
- `normalize()`：当子节点中文本节点包含文本，或2个相邻的文本节点，可以用这个方法来合并为一个文本节点。可以通过 `document.normalize()`合并文档中所有的相邻文本。

## Document类型

- `nodeType`：9
- `nodeName`：值为"#document"
- `nodeValue`：null
- `parentNode`：null
- `ownerDocument`：null
- 其子节点可能是DocumentType(最多一个)、Element（最多一个）、ProcessingInstruction 或 Comment。
- `documentElement`：指向`<html>`
- `body`：指向`<body>`
- `doctype`：指向`<!DOCTYPE>`，IE8及之前会解释为注释，值为 null。
- 注释：Firefox会忽略，IE8及以前和其他浏览器只解析第一条注释，IE9及之后都解析。

**文档信息**

- `title`：`<title>`中的文本，可读写。
- `URL`：地址栏的URL，只读。
- `domain`：页面的域名，可写，但是因为安全问题只能设置成包含的域，如当前为`p.x.com`，则可以设置为`x.com`。它可以用于框架之间通信，比如`p.x.com`里有个`q.x.com`的内嵌框架，因为 document.domain 不同，所以无法相互访问js对象，都设置成`x.com`后就可以访问了。而且设置后不能再设置。
- `referrer`：链接到当前页面的页面的URL，没有则为空字符串，只读。

**查找元素**

- `getElementById()`：没有则返回`null`，如果有多个相同ID，只会返回第一个。ie7 及以前不区分 id 大小写，而且还会将表单元素name 和 ID 相同的元素也当作匹配的元素。
- `getElementByTagName()`：返回一个NodeList，在 HTML 文档中，返回一个动态的 HTMLCollection 对象。HTMLCollection 对象还有个`namedItem()`方法，可以通过标签的 name 属性获取对应的项，也可以通过[]。参数可以是 *，表示全部。ie中将注释节点也当作元素节点实现，所以还会返回注释节点。

```html
<img src='1.png' name='myImage'>

images.namedItem['myImage']
images['myImage']
```

- `getElementByName`：只有 HTMLDocument 类型才有的方法，返回一个 HTMLCollection, 比如单选按钮，会全部返回。但是 namedItem() 方法只能取第一项。

**特殊集合**

这些集合都是 HTMLCollection。

- document.anchors: 返回带 name 的`<a>`元素。
- document.forms: 返回所有的`<form>`元素。
- document.images: 返回所有的`<img>`元素。
- document.links: 返回所有带 href 的`<a>`元素。

**DOM一致性检测**

```javascript
// 接受DOM功能的名称和版本号
var hasXmlDom = document.implementation.hasFeature('XML', '1.0')
```

最好用能力检测。

**文档写入**

将输出流写入到网页中。chrome54之后不推荐使用 write()，会在控制台报警告`[Violation] Avoid using document.write().`。因为它对网页加载时间有重大影响。

- write()：原样写入。
- writeln()：末尾会添加换行符(\n)。
- open()：打开网页的输出流
- close()：关闭网页的输出流

页面加载时调用 write() 会自动调用 open() 方法，如果不想追加内容，可以使用`open('text/html','replace')`。如果页面加载完成后，open() 将会重新打开文档（清空文档），这就是页面加载完使用`document.write()`会重写文档的原因。

注意写入`</script>`时要转义。因为会被解释成与外部`<script>`标签匹配。

```javascript
document.write('<script type="text/javascript" src="file.js"><\/script>')
```

## Element类型

Element 类型用 于表现 XML 或 HTML 元素，提供了对元素标签名、子节点及特性的访问。

- nodeType: 1
- nodeName: 大写元素标签名
- nodeValue: null
- parentNode: Document 或 Element
- 子节点可能是  Element、Text、Comment、ProcessingInstruction、CDATASection 或
EntityReference。

- tagName: 和 nodeName 一样，主要是为了清晰。html中始终是大写，xml中和源代码一致。

**html元素**

下面几个属性是每个HTML元素中都存在的标准特性。

- id
- title: 元素的附加说明信息。
- lang: 元素内容的语言代码，很少用。
- dir: 语言的方向，ltr 或 rtl，很少用。
- className

**获取特性**

- getAttribute()，如果不存在返回 null
- setAttribute()：
- removeAttribute()：删除元素的特性，不常用。ie6不支持。

特性的名称不区分大小写，注意根据 html5 规范自定义特性应该加 data- 前缀。

元素的特性也可以通过DOM元素本身的属性来访问，但是只有公认的特性才会以属性的形式添加到 DOM 对象中。

**attributes属性**

attributes属性包含一个 NamedNodeMap 动态集合。它有下面方法：

- `getNamedItem(name)`
- `removeNamedItem(name)`：和 removeAttribute() 效果一样，区别是 removeNamedItem() 返回删除的 Attr 节点。
- `setNamedItem(node)`：不常用，参数是一个 Attr 特性节点。
- `item(pos)`

![](./dom/2.png)

```javascript
// 获取特性的值
el.attributes.getNamedItem('id').nodeValue
el.attributes['id'].nodeValue

// 设置特性的值
el.attributes['id'].nodeValue = 'id'
```

注意:

- attributes特性的顺序，不同的浏览器返回可能不同。
- ie7及之前会返回 html 元素所有可能的特性，包括没有指定的特性。每个特性都有 specified 属性表示 html 中是否指定了这个属性，指定则为 true，通过这个属性可以过滤掉没有指定的特性。

**创建元素**

`document.createElement()`可以创建一个元素，参数是要创建元素的标签名，在 html 中不区分大小写。创建元素的同时，也为新元素指定了 ownerDocument 属性。

ie中createElement() 的参数还可以是完整的元素标签。

```javascript
var div = document.createElement('<div id="id"></div>')
```

通过这种方式，可以解决ie7及之前版本动态创建元素的一些问题。

```javascript
if (client.browser.ie && client.browser.ie <= 7){
    // 1. 解决不能设置动态创建的<iframe>的name特性
    var iframe = document.createElement('<iframe name="name"></iframe>')

    // 2. 解决reset() 不能重设动态创建的<input>元素
    var button = document.createElement('<button type="checkout"></button>')

    // 3. 解决动态创建 reset 的 <button>不能重设表单
    var button = document.createElement('<button type="reset"></button>')

    // 4. 解决动态创建name相同的单选按钮毫无关系
    var radio1 = document.createElement('<input type="radio" name="choice" value="1">')
    var radio2 = document.createElement('<input type="radio" name="choice" value="2">')
}
```

**元素的子节点**

childNodes 包含所有子节点，可能是元素、文本节点、注释或处理指令。不同浏览器处理不同。

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

上面的代码，ie会认为ul有3个子节点，分别是3个li元素。其他浏览器任务ul有7个元素，包括3个li元素和4个文本节点。所以使用childNodes时要检测一下nodeType属性。

## Text类型

- nodeType：3
- nodeName：#text
- nodeValue：节点所包含的文本
- parentNode：一个Element
- 不支持子节点
- data：和nodeValue相同，而且是关联的，修改一个另一个会同时变化。
- appendData(text)： 将 text 添加到节点的末尾。
- deleteData(offset, count)：从offset指定的位置开始删除count个字符。
- insertData(offset, count)：从offset值指定的位置插入text。
- replaceData(offset, count, text)
- splitText(offset)：分割为2个文本节点。返回新的文本节点。
- substringData(offset, count)：提取从offset指定的位置开始到offset+count为止处的字符串。
- length：文本的长度

```javascript
var textNode = div.firstChild; // div.childNodes[0]
div.firstChild.nodeValue = 'hello';
```

修改文本节点时，字符串会经过HTML编码(或XML编码)。因为本来要插入的是文本，所以会转义。

```html
//输出结果是"Some &lt;strong&gt;other&lt;/strong&gt; message" 
div.firstChild.nodeValue = "Some <strong>other</strong> message";
```

**创建文本节点**

- `document.createTextNode()`
- `parentNode.normalize()`：将子文本节点合并

如果有两个文本节点是相邻同胞节点，可以调用父节点的normalize()方法合并。和normalize()相反的是splitText()。


## Comment类型

- nodeType：8
- nodeName: #comment
- nodeValue: 注释的内容
- parentNode: Document 或 Element
- 不支持子节点
- data：和 nodeValue 相同
- `document.createComment()` 创建注释节点，浏览器不会识别`</html>`后面的注释。

Comment类型和Text类型继承自相同的基类，它拥有除splitText()外所有字符串操作方法。

## CDATASection类型

CDATASection类型只针对 XML 文档，表示 CDATA 区域。它继承自 Text 类型，拥有除splitText()外所有字符串操作方法。

- nodeType：4
- nodeName：#cdata-section
- nodeValue：CDATA区域中的内容
- parentNode：可能是Document或Element
- 不支持子节点
- document.createCDataSection()：创建CDATA区域

它的功能是还原该语句本来含义。

举个例子，“<”这个符号我们知道是一个节点的开始符号，如果，我有个字符串，是这样的"我家门前有棵树<葡萄树>"，那么，如果直接放在节点对之间，当解析到"<"的时候就会报错，所以，当我们加上CDATA的时候，我们就是再告诉解析器，这个里面是内容，不希望被解析，希望被直接输出来。

html 中的 CDATA 区域会被浏览器解析为 Comment 或 Element。比如下面这段代码里的 CDATA 会被 chrome 浏览器解析为 Comment，data是`[CDATA[This is some content.]]`。

```html
<div id="myDiv"><![CDATA[This is some content.]]></div>
```

![](./dom/3.png)


## DocumentType类型

包含和 doctype 相关的信息。

- nodeType: 10
- nodeName: doctype 的名称，`<!doctype html>`为"html"。
- nodeValue：null
- parentNode：Document
- 不支持子节点
- `document.doctype`：获取 doctype 可以使用。ie8及之前不支持这个对象，返回null。ie9有这个对象，但是不支持访问。
- `document.doctype.name`：里保存的是 doctype 名称，和nodeName一样。

## DocumentFragment类型

文档片段(document fragment)是一种轻量级文档，可以包含和控制节点，但是不会像完整文档那样占用额外的资源。

- nodeType: 11
- nodeName: #document-fragment
- nodeValue: null
- parentNode: null
- 子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或 EntityReference。

```javascript
var fragment = document.createDocumentFragment()
```

将文档片段插入到页面时，实际本身不会被插入，而是插入的文档片段的子元素。

## Attr类型

特性就是存在于元素attributes属性的节点。

- nodeType: 2
- nodeName: 特性的名称
- nodeValue: 特性的值
- parentNode: null
- 在HTML中不支持子节点
- 在XML中子节点可以是Text或EntityReference

尽管它们也是节点，但特性却不被认为是 DOM 文档树的一部分。Attr对象有3个属性：

- name
- value
- specified

创建特性节点可以使用`document.createAttribute()`，参数是特性的名称。

attributes 和 getAttributeNode() 会返回对应特性的 Attr 节点，而 getAttribute() 只返回特性的值。

- getAttributeNode()
- setAttributeNode()

```javascript
var attr = docuemnt.createAttribute('align');
attr.value = left;
element.setAttributeNode(attr)

element.attributes['align'].value
element.getAttributeNode['align'].value
element.getAttribute('align')
```

## DOM操作技术

### 动态脚本

方法1: script.src。

```javascript
function loadScript(url, callback){
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = callback
    document.body.appendChild(script)
}
```

方法2: 行内方式，这种方式和`eval()`一样。

```javascript
function loadScript(code){
    var script = document.createElement('script')
    script.type = 'text/javascript'
    try{
        // 非IE浏览器支持
        // ie中script特殊，不能操作字节点，会抛出错误
        script.appendChild(document.createTextNode(code))
    }catch(e){
        // safari3.0前不支持 text
        script.text = code   // ie
    }
    document.body.appendChild(script)
}
```

## 动态样式

方法1: link

```javascript
function loadCss(url){
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    document.head.append(link)
}
```

方法2:嵌入式

```javascript
function loadCss(code){
    var style = document.createElement('style')
    style.type = 'text/css'
    try{
        style.appendChild(document.createTextNode(code))
    }catch(e){
        // ie将style也当作特殊节点,注意ie里重用这个<style>元素并再次设置时，有可能导致浏览器崩溃
        style.styleSheet.cssText = code
    }
    document.head.appendChild(style)
}
```

## 操作表格

使用一般的方法操作表格太麻烦，所以HTML DOM提供了一些属性和方法。

**<table>元素的属性和方法**

- caption: 获取`<caption>`元素。
- tBodies: 获取`<tbody>`元素的 HTMLCollection。
- tFoot
- tHead
- rows
- createTHead()
- createTFoot()
- createCaption()
- deleteTHead()
- deleteTFoot()
- deleteCaption()
- deleteRow(pos): 删除制定位置的行
- insertRow(pos)

**<tbody>元素的属性和方法**

- rows: 保存`<tbody>`元素中行的HTMLCollection。
- deleteRow(pos): 删除指定位置的行。
- insertRow(pos): 向rows集合中的指定位置插入一行，返回对新插入行的引用。

**<tr>元素的属性和方法**

- cells: 保存`<tr>`元素中单元格的HTMLCollection。
- deleteCell(pos): 删除指定位置的单元格。
- insertCell(pos): 向cells集合中的特定位置插入一个单元格，返回对新插入单元格的引用。

```javascript
var table = document.createElement('table')
table.border = 1
table.width = '100%'

var tbody = document.createElement('tbody')
table.appendChild(tbody)

tbody.insertRow(0)
tbody.rows[0].insertCell(0)
tbody.rows[0].cells[0].appendChild(document.createTextNode('cell 1,1'))
tbody.rows[0].insertCell(1)
tbody.rows[0].cells[1].appendChild(document.createTextNode('cell 2,1'))
```

## 使用NodeList

NodeList，NamedNodeMap和HTMLCollection都是动态集合。所有NodeList对象都是在访问DOM文档时实时运行的查询。所以下面代码会死循环。

```javascript
var divs = document.getElementsByTagName('div') // HTMLCollection
for(var i = 0; i < divs.length; i++){
    document.body.appendChild(document.createElement('div'))
}
```

尽量减少访问 NodeList 的次数，因为每次访问都会允许一次基于文档的查询，所以最好缓存起来。


## DOM扩展

- 选择符API: 为了让浏览器支持css查询
- HTML5

### 选择符

之前只能通过js来查询元素，库开发者不断改进性能。但是变成原生API后，解析和树查询操作可以在浏览器内部通过编译后的代码来完成，极大的改善了性能。

- querySelector(): 没找到元素会返回null，如果传入的选择器不支持会抛出错误。
- querySelectorAll(): 返回一个NodeList实例，但是是快照，这样可以避免使用NodeList对象引起的性能问题。

它们可以通过Document、DocumentFragment 和 Element类型的实例调用。


- `matchesSelector()`: 为Element新增的方法，可以查看这个元素是否匹配css选择器。

```javascript
if(document.body.matchesSelector('body.page1')){}
```

### 元素遍历

为了解决ie(<=9)和其它浏览器里childNodes和firstChild等属性的行为不一致(空格的处理)。新增了下面属性：

- childElementCount
- firstElementChild
- lastElementChild
- previousElementSibling
- nextElementSibling

### HTML5

**与class相关**

- `getElementsByClassName()`:返回一个NodeList。多个类名用空格分开。Document/Element都可以调用。ie8及以下不支持。
- `classList`: 返回DOMTokenList集合，它有下面几个方法。
    - `add(className1,className2,..)`
    - `remove(className1,className2,...)`
    - `contains(className1,className2,..)`
    - `toggle(className)`: 返回是否有那个class,有则是true，没有为false。
    - `value`

**焦点管理**

- `document.activeElement`:返回获得焦点的元素。获取焦点的方式有：页面加载完成(`document.body`)，用户输入(通常是按tab键)或`focus()`。页面加载时，为null。
- `document.hasFocus`: 确定文档是否获得了焦点，只要焦点在文档上就返回true。可以确认用户是否和页面交互。

**HTMLDocument的变化**

- `readyState`: Document 的 readyState 属性值变化时它的`readystatechange`会被触发。`readyState`可能值是：
    - `loading`: 文档加载时
    - `interactive`: 文档加载完成且被解析，资源还在加载。
    - `complete`: 文档和资源都加载完成，load事件即将触发。

- `compatMode`:表示当前浏览器用的是标准模式(CSS1Compat)还是混杂模式(ie，值为BackCompat)。
- `head`: ie8及以下不支持。兼容处理`document.head || document.getElementsByTagName('head')[0]`
- `charset`: 表示文档实际使用的字符集。如`UTF-8`。characterSet是其别名。在chrome只读。
- `defaultCharset`: 表示当前浏览器文档默认的字符集

```javascript
if(document.charset !== document.defaultCharset){}
```

- 自定义数据属性，使用`data-`前缀。dataset属性返回 DOMStringMap实例。

```html
<div data-appId="hello"></div>

div.dataset.appId  // hello
div.dataset.appId = 'hi' // hello
```

- innerHTML: 解决插入大量HTML内容，使用DOM操作很复杂的问题。

```html
// 设置和获取的结果不一致，是因为HTML字符串创建的DOM树会经过序列化
div.innerHTML = "Hello & welcome, <b>\"reader\"!</b>";
<div id="content">Hello &amp; welcome, <b>&quot;reader&quot;!</b></div>
```

大多数浏览器通过innerHTML插入script不会执行脚本。ie8可以，但是必须为 script 指定defer，并且必须位于`有作用域元素`之后。script元素是无作用域的，在页面上看不到，和 style 和注释类似。innerHTML插入的字符串开头如果是一个无作用域元素，ie会在解析时删除该元素。

```html
// 会被解析为空字符串 ''
div.innerHTML = "<script defer>alert('hi');<\/script>"; //无效

// 影响布局，所以需要移除文本节点_
div.innerHTML = "_<script defer>alert('hi');<\/script>";

// div里面必须放内容，否则无效，影响布局，所以需要移除它
div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>"; 

// 推荐，不影响页面
div.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>";
```

大多数浏览器可以通过innerHTML插入style元素。ie8将style当作没有作用域的元素，所以需要前置一个有作用域的元素。

不支持 innerHTML 的元素有:`<col>`、`<colgroup>`、 `<frameset>`、`<head>`、`<html>`、`<style>`、`<table>`、`<tbody>`、`<thead>`、`<tfoot>`和`<tr>`。此 外，在 IE8 及更早版本中，`<title>`元素也没有 innerHTML 属性。

为了保证插入的HTML安全，ie8提供了`window.toStaticHTML()`方法，可以删除源HTML里的脚本节点和事件处理程序属性。

```html
var text = "<a href=\"#\" onclick=\"alert('hi')\">Click Me</a>";
var sanitized = window.toStaticHTML(text); //Internet Explorer 8 only 
alert(sanitized); //"<a href=\"#\">Click Me</a>"
```

- outerHTML: 和innerHTML类似。
- insertAdjacentHTML(): 第一个参数必须小写。第二个参数必须是元素，不能是文本。

```javascript
//作为前一个同辈元素插入 
element.insertAdjacentHTML("beforebegin", "<p>Hello world!</p>");
//作为第一个子元素插入
element.insertAdjacentHTML("afterbegin", "<p>Hello world!</p>");
//作为最后一个子元素插入
element.insertAdjacentHTML("beforeend", "<p>Hello world!</p>");
//作为后一个同辈元素插入
element.insertAdjacentHTML("afterend", "<p>Hello world!</p>");
```

- `insertAdjacentElement()`

**内存和性能问题**

使用innerHTML、outerHTML和insertAdjacentHTML()时，最好先删除被替换元素的所有事件处理程序和js对象属性。否则被删除元素和事件处理程序之间的绑定关系在内存中并没有删除，如果这种情况多，会导致页面内存占用增加。也就是:

```javascript
a.onclick = function(){}

// 下面删除a，a和onclick之间的关系还在内存中
a = null

// 还需要
a.onclick = null
```


## html属性(attribute)和DOM属性(property)

html结构转成DOM时，公认的html属性(如id, class等)会转成DOM节点的属性。html属性会存在DOM节点的 attributes 属性中，操作的方式是通过 getAttribute()、setAttribute()。

```html
<a href='' xx='oo'>

a.xx  // undefined (IE除外)
```

操作DOM节点时，公认的html属性也会映射到html属性上，而非公认的不会。

```html
// 操作公认属性
a.href = 'http://xx.com'
// 结果
<a href='http://xx.com' xx='oo'>
同时a.attributes里的href也变化了

// 操作非公认属性
a.xx = 'ee'
// 结果
<a href='http://xx.com' xx='oo'>
a.attributes里的xx没有变化
```

有几个特殊的html属性转成DOM属性会改变：

1. class 变成了 className。
2. style 变成了 CSSStyleDeclaration 对象。
3. label 的 for 属性 变成了 htmlFor。
4. onclick 会变成函数。

ie7及之前getAttribute() 返回的值和DOM属性的值一样。如 style 是对象，onclick是函数。ie8修复了这个问题。

因为这些差别，js 操作 dom 时，经常不使用 getAttribute()，而是用对象的属性，只有自定义特性值的情况才使用 getAttribute()。

注意 input 的 value 不是公认属性，页面上显示值是DOM属性的值，而不是特性的值。

通过 setAttribute() 设置的属性名会统一转为小写，即 ID 会变成 id。ie7及之前这个方法设置 class、style、事件无效。

**操作样式**

1. `el.style.fontSize = '12px'`
2. `el.style = 'font-size:12px;color:red';`
3. 通过 class


**修改内容**

- 文本节点
- html 可以通过 innerHTML 和 outerHTML 修改

```
$0.childNodes[0].data = 'hello'

$0.innerHTML = 'hello'
```

**dom遍历**

document.getElementByTagName(')

- 访问子元素：children 只包含元素节点。childNodes 不常用，因为它还包含文本节点类型。
- 访问父元素：parentNode
- 访问兄弟节点：
    - 常用 previousElementSibling，而 previousSibling 不常用。