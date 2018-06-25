# dom

## 简述

`dom` 的全称是 `document object model`。因为 html渲染引擎 和 js引擎是分开的，为了操作html和xml文档，而制定了一套接口，这套接口就是dom。

html 会形成 dom树 (所有的节点都是Node类的实例)。js可以操作dom树。dom树最终会渲染到页面上。

nodeName
nodeType
nodeValue
parentNode
childNodes
appendChild()
insertBefore()

常用的节点类型
1 Element 大写标签名
2 Attribute
3 Text     #text
9 Document #document
11 DocumentFragment  #document-fragment


# DOM模型概述

## Node
### nodeName,nodeType,nodeValue

- `Document`：整个文档树顶层结构，#document，9
- `DocumentType`: `doctype`标签，等同于DocumentType.name, 10
- `Element`：大写HTML元素名，1
- `Attribute`: Attr.name, 2
- `Comment`: #comment, 8
- `Text`: #text, 3
- `DocumentFragment`: #document.fragment, 11

由于只有Text节点、Comment节点、XML文档的CDATA节点有文本值，因此只有这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。同样的，也只有这三类节点可以设置nodeValue属性的值。对于那些返回null的节点，设置nodeValue属性是无效的。

`node`的其它属性

- contentText: 返回节点内文本内容，会忽略html标签。设置的文本不会解析
- baseURI: 当前网页绝对路径，如果无法获取，则返回，只读。
- ownerDocument: 返回当前节点的顶层文档对象document,document.ownerDocument为null
- nextSibling: 返回当前节点后第一个同级节点，包含文本和注释，没有则返回null
- previousSibling 
- parentNode: 当前节点的父节点。可能是element，document,或documentFragment，对于那些生成没有插入的dom树节点，父节点为null
- parentElement: 返回当前节点的父Element节点，如果没有，则返回，ie中只有Element节点有该属性，其它浏览器则是所有类型节点都有该属性
- childNodes: 返回NodeList集合，没有则返回空的NodeList集合，它是动态集合
- firstChild, lastChild

`node`的其它方法

- appendChild()
- hasChildNodes()
- cloneNode(): 参数表示是否要克隆子节点，不会克隆`addEventListener`和`on-`属性
- insertBefore()
- removeChild()
- replaceChild()
- contains()
- compareDocumentPosition()
- isEqualNode()
- normalize() 

**NodeList对象**
**HTMLCollection对象**

**ParentNode接口**

- children：返回动态HTMLCollection集合
- firstElementChild
- lastElementChild
- childElementCount

**ChildNode接口**
Element,DocumentType,CharacterData 部署了ChildNode接口。

- remove()
- before()
- after()
- replaceWith()


## 属性的操作

- Elements.attributes : name/value   和 nodeName/nodeValue一致。其它节点attributes为null。Elements.hasAttributes()
- 元素节点属性可读可写，通过 `f.id`形式，注意className和htmlFor(label特有)。delete不能删除属性
- html属性值一般是字符串，但是js属性会自动转换类型。

**属性操作的方法**

- Element.getAttribute(): 返回当前节点指定属性，如果不存在，返回null
- Element.setAttribute(): 新增属性，如果存在则覆盖
- Element.hasAttribute(): 是否包含某个属性
- Element.removeAttribute(): 移除属性

**和html对象属性的区别**

- 适用性`html` 标签对象属性操作，只适合标准属性和js添加的属性。
- 返回值是字符串，而对象属性返回各种类型，字符串，数值，布尔值，对象等
- 属性名，都是标准名称比如class，for等。对大小写不敏感

**dataset属性**

- 自定义属性不能通过html代码校验
- 可以添加data-属性，然后通过`.dataset.`的方式获取。删除可以直接使用delete
- 还可以通过`getAttribute('data-foo')`操作
- 注意，data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（_)。而且，属性名不应该使用A到Z的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。
- 出现大写会转成小写 `data-helloWord` -> `helloworld`


## css操作

1. 通过getAttribute()、setAttribute()、removeAttribute()操作style对象
2. 可以直接通过`.style.width`方式来读写行内css样式。background-color -> backgroundColor。 如果是保留字，前面要加css，比如cssFloat
3. `style`对象下的`cssText`属性,可以读写和删除整个样式，不用改写css属性名
4. css模块的侦探，
```
console.log(isPropertySupport('webkitTransform'))

function isPropertySupport(property) {
    if (property in document.body) return true

    var prefixs = ['webkit', 'ms', 'o', 'moz']

    var prefProperty = property.charAt(0).toUpperCase() + property.substring(1)

    for (var i = 0; i < prefixs.length; i++) {
        if ((prefixs[i] + prefProperty) in document.body.style) {
            return true
        }
    }
    return false
}

// 也可以使用 CSS.supports('background','red')
```

5. 读写行内样式，通过Style对象的方法: setProperty(), getPropertyValue(),removeProperty()，参数都是css属性名，不用改写

6. window.getComputedStyle(), 第一个参数是dom对象，第二个参数是伪元素。这个方法获取的style对象是经过计算后的，也可以使用上面的getPropertyValue('height')方法。是只读的。

- 返回的css值是绝对单位，比如长度都是像素，带'px'单位，颜色是rgb或rgba
- css规则简写无效，比如读margin需要读marginLeft详细的属性
- 如果不是绝对定位，top，left总是auto
- 这个方法返回的样式对象的cssText属性无效， 是undefined
- 样式对象是只读的，如果想设置，需要使用.style.的方法
- 伪元素默认是行内样式

7. 



## dom查找

- document.getElementById()
- [document|Element].getElementsByClassName()  HTML Collection 多个元素，>ie8
- [document|Element].getElementsByTagName()
- [document|Element].querySelector()  只有一个元素
- [document|Element].querySelectorAll() 元素集合 NodeList，如果是多个id相同的也会都找到


## dom新增和删除

insertBefore
appendChild

DocumentFragment
removeChild


## property 和 attribute

属性property 是值dom节点上的如nodeName之类的属性
特性attribute 是指html节点上如id，class，style之类的特性

- 公认的HTML元素特性会映射到元素节点属性上，也就是id，style在dom节点上也有。所以自定义的特性通过 .的方式获取不到。只能通过getAttribute 获取。通过 .xxx='ooo' 设置也不会在节点上显示
- 特性对象通过 .attributes 可以得到，它是一个 NamedNodeMap

```
<img hidefocus='true' src=''>
```

比如上面的hidefocus和src都是img元素的特性。由于src是公认特性，它会映射到dom节点上，所以通过getAttribute('src')和.src都可以获取。但是hidefocus是自定义特性，不会映射到dom节点上，所以只能通过getAttribute('hidefocus')获取到。

`Element.attributes`返回元素的特性对象，是一个实时变化的动态类数组。其它类型节点也有attributes属性，但是都返回null。所以这个属性相当于是元素对象特有的。

注意，delete不能删除元素的特性。

html属性名转为javascript属性时，要使用驼峰拼写法，有两个特殊的，for属性改写为htmlFor，class属性改写为className。

另外，html属性值一般是字符串，而js属性会自动转换类型，比如onclick转为函数，字符串true转为布尔值，style属性转为一个CSSStyleDeclaration对象。

属性操作的标准方法有四个：

- getAttribute()   // 如果属性不存在，则返回null
- setAttribute()   // 不需要转换大小写，直接class、for即可。如果属性不存在，则新增属性
- hasAttribute()
- removeAttribute()

为了方便访问和标准化自定义属性。html新增了`data-*`这种属性，它会映射到dom节点的`dataset`属性上。注意data-后面的属性名，不能使用大写字母，只能包含字母、数字、连词线、点(.)、冒号(:)和下划线(_)，所以`data-helloWorld`应该写成`data-hello-world`。

```
div.dataset.foo  // 访问
div.dataset.foo = 'xxx'  // 设置
```

这种`data-*`属性可以直接通过`delete`命令删除。

除了可以使用`dataset`属性进行操作，也可以用getAttribute('data-foo')这样的方法进行操作。

## 修改样式和内容

- 修改样式
    - style   $0.style.color
    - class   className   $0.classList.add()  $0.classList.remove()
- 修改内容
    - innerHTML outerHTML
    
## DOM遍历

childNodes - NodeList 包含文本节点，注释节点

children - 只有元素节点
parentElement
parentNode  // 常用

previousSibling 包含文本节点
previousElementSibling
nextSibling
nextElementSibling
firstChild
firstElementChild
lastChild
lastElementChild


## Text节点

通常使用 `Node.firstChild()` 、`Node.nextSibling()` 等属性获取Text节点，或者使用Document节点的createTextNode方法创建一个Text节点。

浏览器原生提供了一个Text构造函数。它返回一个Text节点，它的参数就是文本内容。

```
var text = new Text('hello')
```

Text节点除了继承Node节点属性和方法，还继承了CharacterData接口。下面的属性来自CharacterData接口。

## Text节点的属性

```
new Text() instanceof Text  // true
new Text() instanceof CharacterData // true

Text.prototype -> Text对象   
new Text().__proto__ -> Text对象
Text对象.__proto__ -> CharacterData对象
Text.__proto -> CharacterData构造函数
CharacterData.constructor -> Function
```

data 等同于nodeValue，用来设置或去读取Text节点的内容。

wholeText返回当前Text节点与毗邻的Text节点，作为一个整体返回。大多数情况下，wholeText属性的返回值，和data属性和textContent(Node的属性)相同。比如下面的代码。但是当移除em元素后，wholeText属性返回值就不同了。

```
<p>a<em>b</em>c</p>
```

length返回Text节点字符长度。

```
(new Text('hello')).length
```

appendData() 用于在Text节点尾部追加字符串。
deleteData() 用于删除子字符串，第一个参数是子字符串位置，第二个参数是子字符串长度。
insertData() 用于在Text节点插入字符串，第一个参数是插入位置，第二个参数是插入的子字符串。
replaceData() 用于替换文本，第一个参数是替换开始位置，第二个参数是需要被替换掉的长度，第三个参数是新加入的字符串。
subStringData() 用于获取子字符串，第一个参数是子字符串的开始位置，第二个参数是长度。

remove() 方法用于移除当前Text节点。

```
document.querySelector('p').firstChild.remove()
```

splitText() 用于将Text节点一分为二，变成两个毗邻的Text节点，参数是分割位置，必填，分割到该位置前结束，如果分割位置不存在，则报错。该方法返回分割后方的字符串。原Text节点变为只包含分割位置前方的字符串。

normalize() 方法将毗邻的两个Text节点合并。


## DocumentFragment节点

DocumentFragment节点表示一个文档片段，本身就是一个完整的DOM树形结构，它没有父节点,parentNode为null。

创建可以通过 document.createDocumentFragment() 或原生的 DocumentFragment 构造函数。

一旦DocumentFragment节点被添加到当前文档，它自身就变成空节点（textContent属性为空字符串），可以被再次利用。

如果想保存DocumentFragment节点的内容，可以使用cloneNode方法。

DocumentFragment节点对象没有自己的属性和方法，全部继承自Node节点和ParentNode接口。也就是说它比Node节点多出以下四个属性。

- children 动态HTML Collection集合
- firstElementChild
- lastElementChild
- childElementCount





## Mutation Observer API 

Mutation Observer API 用来监视DOM变动，DOM节点增加、删除、属性变动、文本改动，这个API都会得到通知。

它和事件类似，但是区别是事件是同步触发的，而Mutation Observer是异步触发，DOM节点变化后不会马上触发，而是所有DOM操作完成后再触发。

Mutation Observer的特点：

- 它等待所有脚本任务完成后，才会运行，即采用异步方式。
- 它把DOM变动记录封装成一个数组进行处理，而不是一条条地个别处理DOM变动。
- 它既可以观察发生在DOM的所有类型变动，也可以观察某一类变动。







封装DOM动画类库（一） http://ife.baidu.com/course/detail/id/52

封装DOM动画类库（二）http://ife.baidu.com/course/detail/id/53





































