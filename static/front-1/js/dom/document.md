# dom节点

document节点是文档的根节点。可以通过下面方式获取。

- 对于正常的网页，document或window.document
- 包含某个节点的文档，使用ownerDocument属性
- 对于iframe，使用iframe节点的contentDocument
- 对于ajax返回的文档，使用XMLHttpRequest对象的responseXML属性。

```
document == window.document == document.body.ownerDocument
```

## 内部节点属性

快捷操作

## doctype, documentElement, defaultView, body, head

document.doctype 包含文档类型声明(DTD)。如果没有则返回null。

```
document.doctype  // "<!DOCTYPE html>"
document.doctype.name // "html"
```

`document.firstChild` 通常返回这个节点。

`document.documentElement` 返回当前文档的根节点`<html>`。

`document.defaultView` 在浏览器中返回document对象所在的window对象，否则返回null。

```
document.defaultView === window  // true
```

`document.body`返回当前文档的`<head>`节点，`document.body`返回当前文档的`<body>`。

```
document.head === document.querySelector('head')
document.body === document.querySelector('body')
```
这两个属性总存在，如果源码没有这两个标签，浏览器会自动创造。

`document.activeElement`属性返回当前文档中获得焦点的元素，通常可以用tab键移动焦点，使用空格激活焦点。

## 节点属性集合

以下属性返回文档内部特定元素的集合，都是类似数组的对象。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

### links, forms, images, embeds

`document.links` 属性返回当前文档所有设定了href属性的a及area元素。

`document.forms` 属性返回页面中所有表单元素form。

`document.images`属性返回页面所有图片元素（即img标签）。

`document.embeds`属性返回网页中所有嵌入对象，即embed标签。

以上四个属性返回的都是HTMLCollection对象实例。

由于HTMLCollection实例可以用HTML元素的id或name属性引用，因此如果一个元素有id或name属性，就可以在上面这四个属性上引用。

```
// HTML代码为
// <form name="myForm" >

document.myForm === document.forms.myForm // true
```

### scripts, styleSheets

`document.scripts` 属性返回当前所有脚本（即script标签）。

document.scripts返回的也是HTMLCollection实例。

document.styleSheets属性返回一个类似数组的对象，代表当前网页的所有样式表。每个样式表对象都有cssRules属性，返回该样式表的所有CSS规则，这样这可以操作具体的CSS规则了。

## 文档信息属性

### document.documentURI, document.URI

`document.documentURI`属性和`document.URL`属性都返回一个字符串，表示当前文档的网址。不同之处是`documentURI`属性可用于所有文档（包括 XML 文档），URL属性只能用于 HTML 文档。

```
document.documentURI === document.URL
```

`document.domain` 返回当前文档的域名。比如，某张网页的网址是 `http://www.example.com/hello.html`，domain属性就等于`www.example.com`。如果无法获取域名，该属性返回null。

### document.lastModified

document.lastModified属性返回当前文档最后修改的时间戳，格式为字符串。

```
document.lastModified
// Tuesday, July 10, 2001 10:19:42
```

注意，lastModified属性的值是字符串，所以不能用来直接比较，两个文档谁的日期更新，需要用Date.parse方法转成时间戳格式，才能进行比较。

document.location属性返回location对象，提供了当前文档的URL信息。

document.referrer 表示当前文档的访问来源，如果无法获取来源或是直接输入网址，则返回空字符串。它的值和http头的Referer一致。但是它有2个r。

document.title 返回当前文档的标题。

document.characterSet 返回当前文档的字符集。

document.readyState 返回当前文档的状态，共有三个可能性。

- loading: 加载html代码阶段
- interactive: 加载外部资源阶段
- complete: 加载完成时

这个属性变化的过程如下。
1. 浏览器开始解析html文档，document.readyState 的属性值为 loading。
2. 浏览器遇到html文档的script标签，并且没有async或defer属性，就暂停解析，开始执行脚本，这时document.readyState属性还是loading。
3. html文档解析完成，document.readyState属性变成interactive。
4. 浏览器等待图片、样式表、字体文件加载完成，一旦全部加载完成，document.readyState属性变成complete。

当这个属性变化时，document对象上的readystatechange事件将被触发。

`DOMContentLoaded`事件发生在interactive和complete之间。

`document.designMode`属性控制当前文档是否可编辑，通常用在制作可见即可得的编辑器，打开iframe元素包含的文档的designMode属性，就能将其变成一个编辑器。

`document.implementation`属性返回一个对象，用来甄别当前环境部署了哪些DOM接口。`implementation`属性的`hasFeature`方法，可以判断当前环境是否部署了特定版本的特定接口。

```
document.implementation.hasFeature('HTML', '2.0')
// true

document.implementation.hasFeature('MutationEvents','2.0')
// true
```

`document.compatMode`返回浏览器处理文档的模式,可能值是BackCompact(向后兼容模式，混杂模式) 和 CSS1Compat(严格模式)。一般来说，如果网页代码第一行设置了明确的doctype，都会返回CSS1Compat。在ie中，盒模型渲染默认是混杂模式，它的解释和标准浏览器有很大区别，而在严格模式下解释是一致的。document.getElementsByClassName() 混杂模式下回忽略大小写，在设置和读取clientWidth、clientHeight、scrollTop、scrollLeft、scrollWidth值时有问题。

`document.cookie`用来操作浏览器Cookie。

`document.open()`用于新建一个文档，供write方法写入内容，它实际上等于清除当前文档，重新写入内容。

```
document.write("<html><p>remove me</p></html>");
setTimeout(()=>{
    document.open();
})
```
上面的代码需要延迟调用document.open() 才行。页面加载完成后调用document.write() 会自动发生document.open()调用。

document.close方法用于关闭open方法所新建的文档。一旦关闭，write方法就无法写入内容了。如果再调用write方法，就等同于又调用open方法，新建一个文档，再写入内容。

搞不懂有什么用，搜到一点答案：[what-is-the-point-of-documentopen-and-documentclose-in-javascript](https://teamtreehouse.com/community/what-is-the-point-of-documentopen-and-documentclose-in-javascript)。

document.write() 在文档没有加载完时调用，会追加到内容后面，如果页面已经DOMContentLoaded，再调用write，它会先调用open方法，擦除当前文档所有内容，再写入。

document.writeln方法与write方法完全一致，除了会在输出内容的尾部添加换行符。

## 查找节点的方法

- document.querySelector() 返回第一个匹配的节点。找不到则返回null。
- document.querySelectorAll() 返回一个NodeList对象。

```
// 选中data-foo-bar属性等于someval的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中myForm表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些class含ignore的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中div，a，script三类元素
document.querySelectorAll('DIV, A, SCRIPT');
```

它们不支持css伪元素选择器(比如:first-line和:first-letter)和伪类选择器(比如:link和:visited)。

`document.querySelectorAll()` 返回的不是动态集合。

`document.getElementsByTagName()` 返回一个HTMLCollection动态对象，因为HTML标签名大小写不敏感，所以这个方法对大小写不敏感。

`document.getElementsByClassName()`返回一个HTMLCollection动态对象。如果同时具有多个属性，用空格隔开，顺序不重要。正常模式下css的class是大小写敏感的，混杂模式下，大小写不敏感。

`document.getElementsByName()`方法用于选择拥有name属性的HTML元素（比如<form>、<radio>、<img>、<frame>、<embed>和<object>等），返回一个类似数组的的对象（NodeList对象的实例），因为name属性相同的元素可能不止一个。

getElementById方法返回匹配指定id属性的元素节点。如果没有发现匹配的节点，则返回null。这个方法只能在document对象上使用，不能在其他元素节点上使用。

`document.elementFromPoint`方法返回位于页面指定位置最上层的Element子节点。

比如100*100的盒子在375*667的最右上角，只有当坐标点[275, 99]时，才刚好。[274,100]都在外面。不在视口内，则返回null。如果html元素不可返回(比如文本框滚动条)，则返回它的父元素。

## 生成节点的方法

document.createElement方法用来生成网页元素节点。参数为元素的标签名，即元素节点的tagName属性，对于 HTML 网页大小写不敏感，即参数为div或DIV返回的是同一种节点。如果参数里面包含尖括号（即<和>）会报错。

document.createTextNode()方法用来生成文本节点，参数为所要生成的文本节点的内容。这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作HTML代码渲染。因此，可以用来展示用户的输入，避免XSS攻击。
                                                    
```
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对HTML属性赋值。

```
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var userWebsite = '" onmouseover="alert(\'derp\')" "';
var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
var div = document.getElementById('target');
div.innerHTML = profileLink;
// <a href="" onmouseover="alert('derp')" "">Bob</a>
```

document.createAttribute方法生成一个新的属性对象节点，并返回它。

```
var node = document.getElementById("div1");
var a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);

// 和

var node = document.getElementById("div1");
node.setAttribute("my_attrib", "newVal");
```

DocumentFragment对象是一个存在于内存的DOM片段，但是不属于当前文档，常常用来生成较复杂的DOM结构，然后插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的DOM有更好的性能表现。

## 事件相关的方法

document.createEvent方法生成一个事件对象，该对象可以被element.dispatchEvent方法使用，触发指定事件。

document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
以下三个方法与document节点的事件相关。这些方法都继承自EventTarget接口。

document.hasFocus方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如如果用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。
                                                 
document.createNodeIterator方法返回一个DOM的子节点遍历器。

```
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
```

上面代码返回body元素的遍历器。createNodeIterator方法的第一个参数为遍历器的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点。其他类型还有所有节点（NodeFilter.SHOW_ALL）、文本节点（NodeFilter.SHOW_TEXT）、评论节点（NodeFilter.SHOW_COMMENT）等。

所谓“遍历器”，在这里指可以用nextNode方法和previousNode方法依次遍历根节点的所有子节点。

```
var nodeIterator = document.createNodeIterator(document.body);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}
```
上面代码使用遍历器的nextNode方法，将根节点的所有子节点，按照从头部到尾部的顺序，读入一个数组。nextNode方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回null。previousNode方法则是先将指针移向上一个节点，然后返回该节点。

```
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var currentNode = nodeIterator.nextNode();
var previousNode = nodeIterator.previousNode();

currentNode === previousNode // true
```

上面代码中，currentNode和previousNode都指向同一个的节点。

有一个需要注意的地方，遍历器返回的第一个节点，总是根节点。

（2）document.createTreeWalker()

document.createTreeWalker方法返回一个DOM的子树遍历器。它与createNodeIterator方法的区别在于，后者只遍历子节点，而它遍历整个子树。

document.createTreeWalker方法的第一个参数，是所要遍历的根节点，第二个参数指定所要遍历的节点类型。

var treeWalker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var nodeList = [];

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
上面代码遍历body节点下属的所有元素节点，将它们插入nodeList数组。


document.adoptNode方法将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。

```
node = document.adoptNode(externalNode);
document.importNode()
document.importNode方法从外部文档拷贝指定节点，插入当前文档。
```

```
var node = document.importNode(externalNode, deep);
```

document.importNode方法用于创造一个外部节点的拷贝，然后插入当前文档。它的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为true。

注意，importNode方法只是拷贝外部节点，这时该节点的父节点是null。下一步还必须将这个节点插入当前文档的DOM树。

```
var iframe = document.getElementsByTagName('iframe')[0];
var oldNode = iframe.contentWindow.document.getElementById('myNode');
var newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);
```
上面代码从iframe窗口，拷贝一个指定节点myNode，插入当前文档。

`document.getSelection()` 这个方法指向 `window.getSelection()`。













































































