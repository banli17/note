---
title: 现代浏览器工作原理(翻译)
author: banli17
authorTitle: just do it
authorURL: https://github.com/banli17
authorImageURL: https://avatars3.githubusercontent.com/u/12556069?s=460&v=4
tags: [translate]
---

这篇文章翻译自[How Browsers Work: Behind the scenes of modern web browsers](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)，网上已经有中文翻译版本了，但是翻译的有些地方很难懂，于是自己重新翻译一边，并对每个难懂的地方进行解释。

<!--truncate-->

## 讨论的浏览器

**桌面浏览器**

- Chrome
- IE/Edge
- Firefox
- Safari
- Opera

**移动设备浏览器**

- Android浏览器
- Safari
- Opera Mini
- Opera Mobile
- UC浏览器
- Nokie S40/S60
- Chrome

## 浏览器的主要功能

浏览器主要功能是通过服务器请求web资源并在浏览器窗口显示它，通常是html文档，也可以是pdf，图片或其它内容。用户通过使用URI指定资源位置。

浏览器解析和显示html文件的方式在html和css规范里指定，这些规范由w3c制定。浏览器用户界面基本一致，是各大厂商模仿的结果：

- 地址栏
- 后退、前进按钮
- 书签
- 刷新和停止按钮
- 主页按钮

## 浏览器的组成部分

浏览器的主要组成部分是：

1. 用户界面: 包括地址栏，前进后退按钮等。
2. 浏览器引擎: 协调UI和渲染引擎
3. 渲染引擎: 负责显示请求的内容，比如html，则解析html和css在屏幕上显示。
4. 网络: 用于网络调用，用http请求，不同平台底层实现不同。
5. UI后端: 用于绘制组合框和窗口等基本小部件。它公开了一个非平台特定的通用接口。它底层是使用操作系统用户界面的接口。
6. js引擎: 解释和执行js代码。
7. 数据存储：用于本地保存数据，如cookie，localStorage，IndexedDB，WebSQL 和 FileSystem。

![](/static/img/browser-work/layers.png)

Chrome等浏览器会运行多个渲染引擎实例，每个选项卡一个，每个选项卡都是一个单独的进程。

## 渲染引擎

渲染引擎的作用是在浏览器上显示请求的内容。默认可以显示html和xml文档和图片。还可以通过插件来显示其它类型的文件，如pdf。

不同的浏览器使用不同的渲染引擎：

- IE/Edge: Trident
- Firefox: Gecko
- Safari: Webkit
- Chrome/Opear: Blink(一个Webkit分支)

## 主流程

渲染引擎将开始从网络层获取请求文档的内容，通常是以8kb的块(chunk, tcp/ip默认缓冲区大小)传输。

之后，渲染引擎的基本流程如下：

![](/static/img/browser-work/flow.png)

渲染引擎将开始解析HTML文档并将元素转换为DOM树(dom tree)中的节点。同时解析样式数据(包括外链CSS和内嵌样式)。样式信息和显示的html元素(非display:none元素)将会用来创建渲染树(render tree)。

渲染树(render tree)包含有视觉属性(如color和大小)的盒子，这些盒子已经排好了顺序用于显示在屏幕上。

渲染树构建完成后会进行布局(layout)过程，它会给每个节点计算出现在屏幕上的确切坐标。下一个阶段是绘制(painting)，它会遍历渲染树(render tree)，并用UI后端层绘制每个节点。

重要的是要理解这是一个渐进的过程。为了获得更好的用户体验，渲染引擎将尽快在屏幕上显示内容。在开始构建和布局（layout）渲染树之前，它不会等到所有HTML解析(HTML Parser)完成。它会一边解析和显示(display)，一边继续处理从网络层接受的剩余内容。


## 主要流程示例

![](/static/img/browser-work/webkitflow.png)
图：Webkit主要流程
![](/static/img/browser-work/image008.jpg)
图：Firefox的Gecko主要流程

上面图片显示，虽然Webkit和Gecko使用的术语不同，但是流程基本相同。

**语义化差异**

- Gecko将视觉格式化元素树叫做帧树(frame tree)，每个元素都是一帧。放置元素叫做`Reflow`。
- Webkit将它叫做渲染树(render tree)，它由渲染对象(render objects)组成。放置元素叫做`Layout`。连接DOM树和样式规则的叫做附件(Attachment)。

它们之间还有一个非语义化差异，就是 Gecko 的 HTML 和 DOM 树之间有一个额外的层(叫做Content Sink)，它是用于创建DOM元素的工厂。

**大致的解析原理**

解析（Parser）文档是将文档转换为代码可以使用的结构。解析的结果通常是表示文档结构的节点树。这称为解析树或语法树。

例如，解析表达式`2 + 3 - 1`可以返回这棵树：

![](/static/img/browser-work/image009.png)
图：数学表达式树节点

**语法**

解析是基于文档遵守的语法规则的(所编写的语言和格式)，能解析的每个格式必须具有由词汇和语法规则组成的确定性语法。它被称为`上下文无关语法`(也就是不考虑上下文关系，只是单纯的语法是否正确)。人类语言不是这样的语言，因此无法使用传统的解析技术进行解析。

**Parser-Lexer组合**

解析分为2个子过程：词法分析和语法分析。

词法分析是将输入分解为令牌(token，也可以叫标记。语言构成的基本单位)的过程。在人类语言中，它就是出现在该词典中的所有单词。语法分析用于分析语言的语法规则。

解析的工作通常会分给2个组件去完成，词法分析器(lexer,有时叫做tokenizer)负责将输入分解为有效令牌。而语法分析器(parser)负责通过根据语言语法规则分析文档结构来构造解析树(parse tree)。词法分析器知道如何去掉不相关的字符，如空格和换行符。

![](/static/img/browser-work/image011.png)
图：从原文档到解析树

解析过程是迭代完成的，语法分析器会从词法分析器取令牌(token)，然后尝试用语法规则匹配它。如果规则匹配，和这个令牌相关的节点会被添加到解析树(Parse Tree)上，然后再去取下一个令牌。如果没有规则匹配，语法解析器会在内部存储令牌，然后继续取令牌，直到找到匹配所有内部存储令牌的规则。如果没有找到规则，解析器会出现异常。这就表示文档没有通过验证，包含语法错误。

**编译**

多数情况下，解析树不是最终的产品，解析后还需要翻译：即将输入文档转换成另一种格式。比如编译。编译器首先将源代码解析成解析树(Parse Tree)，然后再将树翻译为机器码。

![](/static/img/browser-work/image013.png)
图：编译流程

注：这里有点疑惑，不知道source code是上面的解析树还是文档?

**解析示例**

在上面`图：数学表达式树节点`中，我们用数学表达式构建了一个解析树。让我们尝试定义一个简单的数学语言并查看解析过程。

词法：我们的语言可以包含整数，`+`、`-`符号。

语法：

1. 语法块有表达式(`express`)，项(`term`)和操作符(`operation`)。
2. 可以包含任何数量的表达式。
3. `term + operation + term`这种形式是一个表达式。
4. 操作符包括 `+` 和 `-`。
5. 项是一个整数(interger)或一个表达式。

接下来分析`2 + 3 -1`。

第一个子字符串是`2`，根据规则5，它是一个项。接着匹配`2 + 3`，匹配到第3个规则，是一个表达式。第三次匹配`2 + 3 - 1`，又匹配到第3项。`2 + +` 不会匹配到任何规则，所以是无效的输入。

**词法和语法的正式定义**

词法通常用正则表达式表示。比如我们的语言定义为：

```
INTEGER: 0|[1-9][0-9]*
PLUS: +
MINIS: -
```

如上，整数用正则表达式定义。

语法通常用`[BNF(巴科斯范式)](https://baike.baidu.com/item/BNF/7328753?fr=aladdin)`格式定义：

```
expression :=  term  operation term
operation :=  PLUS | MINUS
term := INTEGER | expression
```

如果这个语言的语法是上下文无关的，那么这个语言可以用常规的解析器解析。上下文无关的语法可以用 BNF 定义。有关正式定义，请参阅[Wikipedia关于无上下文语法的文章](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)。

**解析器的类型**

解析器有两种类型：自顶向下解析器和自底向上解析器。比较直观的是自顶向下的解析器检查语法的高级结构并尝试查找规则匹配。自底向上的解析器从输入开始并逐渐将其转换为语法规则，从低级规则开始直到满足高级规则。

下面是这两种解析器的示例：

自顶向下解析器将从更高级别的规则开始：它将识别表达式`2 + 3`，然后识别表达式`2 + 3 - 1`(从最高级别规则开始分析)。

自底向上解析器将扫描输入，直到匹配规则，然后用规则替换匹配的输入，一直到结束。匹配到的表达式压入解析器的栈中。

| stach 栈| input 输入|
| -       |  -       |
|         | 2 + 3 - 1 |  
| term    |  + 3 - 1    |
| term operation |  3 - 1   |
| express |  - 1   |
| express operation |  1   |
| operation |  -   |

这种类型的自底向上解析器称为shift-reduce解析器，因为输入向右移动（想象一个指针首先指向输入开始并向右移动）并逐渐简化为语法规则。

**自动生成解析器**

有些工具可以生成解析器。你可以为它们提供词法和语法规则生成一个有效的解析器。创建解析器需要深入理解解析，并且手动创建优化的解析器并不容易，因此解析器生成器非常有用。

WebKit使用两个众所周知的解析器生成器：用于创建词法分析器的Flex和用于创建语法解析器的Bison。Flex输入是包含标记的正则表达式定义的文件。Bison的输入是BNF格式的语法规则。

**HTML解析器**

HTML解析器负责将HTML标记解析为解析树(Parse Tree)。HTML的词汇和语法在W3C组织创建的[规范](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/#w3c)中定义。

它的语法不是用 BNF 定义的，所有的传统解析器都不适合 HTML。因为它不是上下文无关的(可能是标签是成对出现的)。

这看起来很奇怪，HTML非常接近XML。有许多可用的XML解析器。有一个HTML-XHTML的XML变体 - 那么最大的区别是什么？

区别在于HTML更宽松，它允许省略某些标记然后隐式添加(不懂)；或者省略开始和结束标记。而 XML 是严格要求的语法。

**HTML DTD**

HTML 定义采用 DTD 格式。此格式用于定义 SGML(标准通用标记语言) 系列的语言。这个格式包含所有允许元素，属性和层次结构的定义。正如我们之前看到的，HTML DTD不会形成上下文无关语法。

DTD有一些变体。严格模式仅符合规范，但其他模式包含对过去浏览器使用的标记的支持。目的是向后兼容旧内容。目前严格的DTD在这里： www.w3.org/TR/html4/strict.dtd

**DOM**

解析树(Parse Tree)是由 DOM 元素和属性节点组成的，DOM是文档对象模型的缩写。它是 HTML 文档对象和元素提供给外界的接口，如 js。树的根是 Document 对象。

DOM与标记是一一对应的。例如：

```html
<html>
  <body>
    <p>
      Hello World
    </p>
    <div> <img src="example.png"/></div>
  </body>
</html>
```

上面的结构将会转换为下面的 Dom 树。

![](/static/img/browser-work/image015.png)
图：DOM树

和 HTML 一样，DOM 也是W3C组织制定的，查看[www.w3.org/DOM/DOMTR](http://www.w3.org/DOM/DOMTR)。它是操作文档的通用规范。HTML 的定义可以查看[www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/idl-definitions.html](www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/idl-definitions.html)。

当我说树包含DOM节点时，我的意思是树由实现了DOM接口的元素构成。浏览器内部可能还会增加一些其它属性。

**解析算法**

正如我们在前面部分中看到的那样，无法使用常规的自顶向下或自底向上解析器来解析HTML。

原因是：

- 语法是宽松的
- 浏览器具有传统的容错能力，以支持无效HTML格式
- 解析过程是可重入的。对于其他语言，代码在解析期间是不会更改的，但在HTML中，js 可以添加额外的令牌，因此解析过程实际上会修改输入。

所以浏览器创建了自己的HTML解析器。具体算法可以看[parsing algorithm is described in detail by the HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html)。它包含两个阶段：令牌化(tokenization)和树结构化(tree construction)。

令牌化是词法分析，将输入解析成令牌(token)。HTML 标记包括开始标记、结束标记、属性名称和属性值。

标记器(tokenizer)用来识别令牌，将它提供给树构造函数，并使用下一个字符来识别下一个令牌，依此类推，直到输入结束。

![](/static/img/browser-work/image015.png)
图：HTML解析流程

**令牌化算法**

算法的输出是HTML令牌。该算法是一个状态机。每个状态消耗输入流的一个或多个字符，并根据这些字符更新下一个状态。该决定受当前标记化状态和树构造状态的影响。这意味着相同的消耗字符将为正确的下一状态产生不同的结果，具体取决于当前状态。这个算法很复杂，无法完全描述，所以看下面一个简单的例子帮助我们理解原理。

示例：

```html
<html>
  <body>
    Hello world
  </body>
</html>
```

以`<html>`标签为例，初始状态是数据状态(Data State)，遇到字符`<`时，状态会变为`标签打开状态(Tag open state)`。遇到字符`a - z`会导致创建`开始标签令牌(Start tag open)`，状态变为`标签名称状态(Tag name state)`，然后一直停留在这个状态直到遇到字符`>`。每个字符都会附加到新令牌名称上。所以会形成一个`html`令牌。

当遇到字符`>`，当前的令牌会发给`Tree Construction`进行下一步操作，状态变回数据状态(Data State)。`<body>`标签也是相同的步骤，在`<html>`和`<body>`都发出后，状态回到了数据状态。接下来遇到 Hello world 里的字符`H`，将会创建和发出一个字符令牌，一直到遇到`</body>`里的`<`。我们会为`Hello world`的每个字符发出一个字符令牌。

然后又到了`标签打开状态(Tag open state)`，遇到下一个字符`/`将会创建一个`结束标签令牌(end tag token)`并且状态变为`标签名称状态(Tag name state)`。然后停留在这个状态直到遇到`>`，然后一个新的标签令牌会被发出，状态又变回`数据状态(Data State)`。`</html>`也和上一步流程一样。

![](/static/img/browser-work/image019.png)
图：令牌化示例

**树结构化(Tree construction)算法**

解析器创建时，Document对象也会同时创建。在树构建阶段，以Document对象为根的DOM树会被修改，元素也会被添加进去。每一个标记器发出的节点都将由树构造函数进行处理。对于每个令牌，规范定义了与之相关的DOM元素。该元素会被添加到DOM树和开放元素的堆栈。此堆栈的作用是纠正不匹配的嵌套关系和未闭合的标签。该算法也被描述为状态机。这些状态称为“插入模式(insertion modes)”。

还是以这段代码为例：

```html
<html>
  <body>
    Hello world
  </body>
</html>
```

树结构化阶段的输入是来自于令牌化阶段的一系列令牌。第一个状态是`初始模式(initial mode)`，收到`html`令牌后会变为`before html`状态，并在该状态下重新处理令牌。它会创建 HTMLHtmlElement 元素，然后插入根 Document 对象上。

接着状态会变成`before head`，然后收到`body`令牌，虽然没有 head 令牌，但是 HTMLHeadElement 还是会被创建，它也会加到树上。

然后变成`in head`状态，之后上`after head`状态。接着对`body`令牌重加工，创建 HTMLBodyElement并插入到树上，状态变为`in body`。

接着开始收到`Hello world`的每个字符令牌，首先它会创建并插入一个 Text 节点，然后字符会被插入到这个节点中。

收到`body结束标签令牌(body end token)`后，状态会转成`after body`。然后收到`html结束标签令牌(html end tag)`后状态会变成`after after body`。接受到文件最后的令牌后，解析就结束了。

![](/static/img/browser-work/image022.gif)
图：树结构化示例

**解析完成后的操作**

在这个阶段，浏览器将会把文档标记为交互状态，并且开始解析`deferred`模式的脚本。这些操作都在文档解析完成后执行，文档的状态会被设置成`complete`，`load`事件被触发。

具体可以查看[the full algorithms for tokenization and tree construction in the HTML5 specification](http://www.w3.org/TR/html5/syntax.html#html-parser)。

**浏览器的容错处理**

HTML页面重来不会报`无效语法(Invalid Syntax)`之类的错误，浏览器会修复所有的无效内容。

拿下面这段代码为例：

```html
<html>
  <mytag>
  </mytag>
  <div>
  <p>
  </div>
    Really lousy HTML
  </p>
</html>
```

上面代码虽然`mytag`不是标准标记，而且`<p>`和`<div>`标签的嵌套关系不正确，但是浏览器仍然能正确显示。

错误处理在浏览器中非常一致，但是它还没有成为HTML规范的一部分。像书签和后退/前进按钮一样，它只是浏览器多年来发展起来的东西。在许多站点上都有错误的HTML结构，并且浏览器尝试以与其他浏览器一致的方式修复它们。

HTML5规范确实定义了其中一些要求。（WebKit在HTML解析器类开头的注释中很好地总结了这一点。）

解析器将标记化输入解析为文档，构建文档树。如果文档格式正确，则解析它很简单。但是错误时，也要能处理它，至少能够处理以下错误：

1. 一个标签(明确禁止放在一些外层标签里，这种情况需要闭合外层标签，然后将标签移到它的后面去。
2. 漏写了一些标签
3. 将块元素放在行内元素里，关闭所有内联元素，直到下一个更高的块元素。
4. 如果不是上面的情况，关闭标签，直到我们允许添加这个元素。或者忽略这个标签。

下面来看 Webkit 的容错示例：

**`<br>`写成了`</br>`**

有些网站使用`</br>`而不是`<br>`。为了与 IE 和 Firefox 兼容，WebKit 将它视为`<br>`。 

```c
if (t->isCloseTag(brTag) && m_document->inCompatMode()) {
     reportError(MalformedBRError);
     t->beginTag = true;
}
```

请注意，错误处理是内部的，它不会呈现给用户。

**嵌套错误的table**

table 应该在外层 table 的单元格里，而不是直接嵌套在外层 table 里。比如：

```html
<table>
    <table>
        <tr><td>inner table</td></tr>
    </table>
    <tr><td>outer table</td></tr>
</table>
```

Webkit 会将它转换成两个相邻的 table。

```html
<table>
    <tr><td>outer table</td></tr>
</table>
<table>
    <tr><td>inner table</td></tr>
</table>
```

代码如下：

```c
if (m_inStrayTableContent && localName == tableTag)
        popBlock(tableTag);
```

Webkit 用一个栈管理当前元素内容，它会将内层的 table 从外层 table 里弹出，然后两个 table 就是兄弟节点了。

**嵌套表单元素**

如果将一个表单放在另一个表单中，则忽略第二个表单。

```c
if (!m_currentFormElement) {
        m_currentFormElement = new HTMLFormElement(formTag,    m_document);
}
```

**标签嵌套层次太深**

Webkit 最多运行 20 个相同类型的标签嵌套，否则将它们全部忽略。(这里貌似有问题了，可能 chrome 已经修改了，因为我做实验没有测出来，嵌套了300个b标签，审查元素，依然还是300个)

```
bool HTMLParser::allowNestedRedundantTag(const AtomicString& tagName)
{

unsigned i = 0;
for (HTMLStackElem* curr = m_blockStack;
         i < cMaxRedundantTagDepth && curr && curr->tagName == tagName;
     curr = curr->next, i++) { }
return i != cMaxRedundantTagDepth;
}
```

**错误的 html 或 body 结束标签**

为了兼容，Webkit 不会关闭 body 标签。因为有些网页会犯错将内容写在`</body>`或`</html>`结束标签的后面。最后会用 end() 去关闭它。

```c
if (t->tagName == htmlTag || t->tagName == bodyTag )
        return;
```

![](/static/img/browser-work/error-body.png)

上图可以看到，写在后面的内容也会放在 body 内部。

## css解析

还记得介绍中的解析概念吗？与HTML不同，CSS是一种上下文无关语法，能用前面介绍的解析器进行解析。实际上，[css规范定义了 css词法和语法](http://www.w3.org/TR/CSS2/grammar.html)。

词法由正则表达式定义：

```
comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
num   [0-9]+|[0-9]*"."[0-9]+
nonascii  [\200-\377]
nmstart   [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name    {nmchar}+
ident   {nmstart}{nmchar}*
```

`ident`是标志符的缩写，就像一个 class 的名字。`name`是元素的 id(就是#xx里xx)。

语法用 BNF 描述：

```
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ] ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
  ;
```

比如下面一段 css 的 ruleset:

```css
div.error, a.error {
  color:red;
  font-weight:bold;
}
```

div.error 和 a.error 是选择器，花括号内的部分包含此规则集应用的规则。此结构的定义是：

```
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
```

上面表示css语法规则是选择器或由逗号和空格分割的多个选择器。后面是`{`，里面是声明，最后是`}`和空格。声明和选择器也是在 BNF 里定义的。

**WebKit CSS解析器**

WebKit 使用 Flex 和 Bison 解析器生成器从 CSS 语法文件中自动创建解析器。Bison 创建了一个自底向上的 shift-reduce 解析器。Firefox 是用自己开发的一个自顶向下的解析器。每个CSS文件都被解析为StyleSheet对象。每个对象都包含 CSS 规则。CSS 规则对象包含选择器和声明对象，以及 CSS 语法对应的其它对象。

![](/static/img/browser-work/image023.png)
图：解析CSS

## 处理脚本和样式表的顺序

### 脚本

网络模型是同步的，解析器到达`<script>`时文档会暂停解析。不管是内嵌脚本还是外链脚本(等待网络下载完成)，都会等待脚本解析并执行完成后，文档才开始重新解析。这个模型是 html4/5 规范制定的。你可以在脚本中添加`defer`属性(只对外链有用)，将这个脚本标记为异步，这样浏览器会新开一个线程解析并执行它。这种情况下它不会暂停文档解析并在解析文档后执行脚本。

所以如果有个需求要获取元素的颜色，给脚本加了`defer`，即使样式写在文档后面，js也会在后面执行。

```
<p>hello</p>
<script defer src="./a.js"></script>
<style>
    p {
        color: red
    }
</style>
```

### 推测性解析

WebKit 和 Firefox 都进行了这种优化。在执行脚本时，会有一个线程去解析文档的其余部分，并找出需要从网络加载的其他资源并加载它们。通过这种方式，可以并行的加载资源，提高整体速度。注意：推测解析器只解析外部脚本、样式表和图像等外部资源的引用。它不会修改DOM树，这会留给主解析器。

### 样式表

从概念上讲，由于样式表似乎不会更改 DOM 树，所以没理由因为等待它解析而停止文档的解析。但是在文档解析阶段如果js要获取样式，而样式还没有加载和解析，js会得到错误的结果。

当样式表在加载或解析时，Firefox会阻止所有的脚本。Webkit 只是在解析可能被未下载样式影响的样式属性时阻止脚本。

## 构建渲染树

在构建 DOM 树时，浏览器同时也在构建渲染树。该树由按其显示顺序排列的元素组成(所以display:none不显示的元素不会进入渲染树)。它的目的是按正确顺序绘制内容。

Firefox 将渲染树元素叫做帧(Frames)，Webkit 叫做渲染对象。渲染对象知道如何布局和绘制自己及其子元素。

Webkit 的渲染对象构造函数，基本定义如下：

```c
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}
```

每个渲染对象代表一个矩形区域，和节点的 CSS 框对应。它包含宽、高和位置信息。

其类型受节点的 display 属性影响。下面代码显示 display 属性决定了 DOM 节点会创建成哪种类型的渲染对象。

```
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
```

上面也可以看出`display:none`的 DOM 节点不会进入渲染树中。

另外，元素类型也会被考虑，比如表单和表格有特殊的处理。Webkit中，如果一个元素想创建一个特殊的渲染器，需要重写其`createRenderer()`方法使渲染器不指向包含几何信息的样式对象。

### 渲染树和DOM树的关系

渲染器对应于DOM元素，但关系不是一对一的。非可视DOM元素不会插入渲染树中。一个例子是`head`元素。display 值为`none`的元素也不会出现在树中（而具有`visiblity:hidden`的元素将出现在树中）。

DOM元素对应于多个可视对象。这些通常是具有复杂结构的元素，不能用单个矩形来描述。例如，`select`元素有三个渲染器：一个用于显示区域，一个用于下拉列表框，一个用于按钮。此外，当文本被分成多行时，因为宽度不足以容纳一行，新行将被添加为额外的渲染器。 
多个渲染器的另一个例子是HTML。根据CSS规范，内联元素必须只包含块元素或仅包含内联元素。对于混合内容，将创建匿名块渲染器以包装内联元素。

一些对应 DOM 节点的渲染对应并不在树的相同位置。例如浮动和绝对定位的元素在文本流之外，它会渲染树上标识出真实的结构，并用一个占位结构标识出它们原来的位置。

![](/static/img/browser-work/image025.png)
图：渲染树和DOM树，Viewport是初始的包含块，在Webkit里它是RenderView对象

上图可以看到，head 没有进入右边的渲染树中。

### 构建树的流程

在 Firefox 里，表述为一个监听 Dom 更新的监听器，将 frame 的创建委派给Frame Constructor，这个构建器计算样式（参看样式计算）并创建一个frame。

在 WebKit 中，解析样式和创建渲染器的过程称为`附件（Attachment）`，每个 DOM 节点都有个 attach() 方法，Attachment的过程是同步的，节点插入 DOM 树会调用新节点的 attach() 方法。

处理 html 和 body 标签将构建渲染树的根，这个根渲染对象对应被 css 规范称为 containing block 的元素——包含了其他所有块元素的顶级块元素。它的大小就是 viewport ——浏览器窗口的显示区域，Firefox 称它为 viewPortFrame，webkit 称为 RenderView，这个就是文档所指向的渲染对象，树中其他的部分都将作为一个插入的 Dom 节点被创建。

更多可以查看[See the CSS2 spec on the processing model](http://www.w3.org/TR/CSS21/intro.html#processing-model)。

## 样式计算

构建渲染树需要计算每个渲染对象的可视属性。这是通过计算每个元素的样式属性来完成的。

该样式包括各种来源的样式表，内联样式元素和 HTML 中的可视化属性（如“bgcolor”属性），可视化属性会转化为css样式属性。

样式表来源于浏览器默认样式表　　样式表来源于浏览器默认样式表，及页面作者和用户提供的样式表——有些样式是浏览器用户提供的（浏览器允许用户定义喜欢的样式，例如，在Firefox中，可以通过在Firefox Profile目录下放置样式表实现）。

样式计算的一些困难：

1. 样式数据是一个很大的结构，保存大量的样式属性会带来内存问题。
2. 如果不优化，查找每个元素的匹配规则将会引起性能问题。查找每个元素的匹配规则都需要去遍历整个样式表，这任务是非常繁重的。选择符可以有复杂的结构，匹配过程如果沿着一条路径开始看似正确，后来却被证明是无用的路径，则必须去尝试另一条路径。

下面是示例：

```css
div div div div {
    ...
}
```

上面的代码是有个`<div>`，它有3个后代`<div>`。假设您要检查规则是否适用于给定`<div>`元素。您可以选择树上的某个路径进行检查。您可能需要遍历节点树，以发现只有两个div，并且该规则不适用。然后，您需要尝试树中的其他路径。

3. 应用规则涉及非常复杂的级联规则，它们定义了规则的层次结构。

让我们看看浏览器如何处理这些问题：

## 共享样式数据

WebkKit节点引用样式对象（渲染样式），某些情况下，这些对象可以被节点间共享，这些节点需要是兄弟或是堂兄弟节点(也就是同一个爷爷节点)，并且：

1. 元素必须处于相同的鼠标状态（例如，一个不能处于：悬停而另一个不是）
2. 这两个元素都不应该有id
3. 标签名称应匹配
4. class属性应该匹配
5. 对应的属性必须相同
6. 链接状态必须匹配
7. 焦点状态必须匹配
8. 元素不能受属性元素影响, 其中protected被定义为具有任何选择器匹配，在选择器中的任何位置都使用属性选择器
9. 元素上必须没有内联样式属性
10. 必须没有使用兄弟选择器。当遇到任何兄弟选择器时，WebCore会抛出一个全局开关，并在整个文档存在时禁用它们的样式共享。这包括+选择器和选择器，如：first-child和：last-child。

## Firefox规则树

Firefox有两个额外的树，可以更轻松地进行样式计算：规则树和样式上下文树。WebKit也有样式对象，但它们不像样式上下文树那样存储在树中，只有DOM节点指向其相关样式。

![](/static/img/browser-work/image035.png)
图：Firefox样式上下文树

样式上下文包含最终值，这些值是通过以正确顺序应用所有匹配的规则，并将它们由逻辑值转换为具体的值，例如，如果逻辑值为屏幕的百分比，则通过计算将其转化为绝对单位。样式树的使用确实很巧妙，它使得在节点中共享的这些值不需要被多次计算，同时也节省了存储空间。

所有匹配的规则都存储在规则树中，一条路径中的底层节点拥有最高的优先级，这棵树包含了所找到的所有规则匹配的路径（译注：可以取巧理解为每条路径对应一个节点，路径上包含了该节点所匹配的所有规则）。规则树并不是一开始就为所有节点进行计算，而是在某个节点需要计算样式时，才进行相应的计算并将计算后的路径添加到树中。

我们将树上的路径看成辞典中的单词，假如已经计算出了如下的规则树：

![](/static/img/browser-work/tree.png)

假如我们需要匹配内容树中一个元素的规则，并且已经发现匹配规则是B-E-I，我们已经有这个路径了，因为已经计算出了A-B-E-I-L。让我们看看这棵树是如何为我们的节省工作的。

### 划分结构

样式上下午会被划分为结构，这些结构包含特定类别（如边框或颜色）的样式信息。结构中的所有属性都是继承的或非继承的。除非由元素定义，否则继承的属性是从其父级继承的属性。如果未定义，非继承属性（称为“重置”属性）将使用默认值。

树通过缓存树中的整个结构（包含计算的结束值）来帮助我们。如果底层节点没有为结构提供定义，则可以使用上层节点中的缓存结构。

### 使用规则树计算样式上下文

在计算特定元素的样式上下文时，我们首先在规则树中计算路径或使用现有路径。然后，我们开始在路径中应用规则来填充新样式上下文中的结构。我们从路径的底部节点开始 - 具有最高优先级的节点（通常是最具体的选择器）并遍历树直到我们的结构已满。如果该规则节点中没有结构的规范，那么我们可以大大优化 - 我们上去树直到找到一个完全指定它的节点并简单地指向它 - 这是最好的优化 - 整个结构被共享。这节省了最终值和内存的计算。 
如果我们找到了部分定义，我们就会在树上填充结构。

如果我们没有为我们的结构找到任何定义，那么在结构是“继承”类型的情况下，我们指向上下文树中父类的结构。在这种情况下，我们也成功地分享了结构。如果它是重置结构，则将使用默认值。

如果最具体的节点确实添加了值，那么我们需要做一些额外的计算以将其转换为实际值。然后我们将结果缓存在树节点中，以便儿童可以使用它。

如果元素具有指向同一树节点的兄弟或兄弟，则可以在它们之间共享整个样式上下文。

让我们看一个例子：假设我们有这个HTML

```html
<html>
  <body>
    <div class="err" id="div1">
      <p>
        this is a <span class="big"> big error </span>
        this is also a
        <span class="big"> very  big  error</span> error
      </p>
    </div>
    <div class="err" id="div2">another error</div>
  </body>
</html>
```

样式规则如下：

```css
div {margin:5px;color:black}
.err {color:red}
.big {margin-top:3px}
div span {margin-bottom:4px}
#div1 {color:blue}
#div2 {color:green}
```

为了简化，我们只需要填写两个结构：颜色结构和边距结构。颜色结构只包含一个成员：颜色边距结构包含四个边。 
生成的规则树将如下所示（节点标有节点名称：它们指向的规则编号）：

![](/static/img/browser-work/image027.png)
图：规则树

上下文树将如下所示（节点名称：它们指向的规则节点）：

![](/static/img/browser-work/image029.png)
图：上下文树

假设我们解析HTML并转到第二个`<div>`标记。我们需要为此节点创建样式上下文并填充其样式结构。 
我们将匹配规则并发现`<div>`的匹配规则是1,2和6.这意味着树中已经有一个我们的元素可以使用的现有路径，我们只需要为它添加另一个节点规则6（规则树中的节点F）。 
我们将创建一个样式上下文并将其放在上下文树中。新样式上下文将指向规则树中的节点F.

我们现在需要填充样式结构。我们将从填写边距结构开始。由于最后一个规则节点（F）没有添加到margin结构，我们可以上去树，直到找到在前一个节点插入中计算的缓存结构并使用它。我们将在节点B上找到它，节点B是指定边距规则的最高节点。

我们确实有颜色结构的定义，所以我们不能使用缓存的结构。由于颜色具有一个属性，因此我们不需要在树上填充其他属性。我们将计算结束值（将字符串转换为RGB等）并在此节点上缓存计算结构。

第二个`<span>`元素的工作更加容易。我们将匹配规则并得出结论它指向规则G，就像前一个跨度一样。由于我们有指向同一节点的兄弟，我们可以共享整个样式上下文，只需指向上一个跨度的上下文。

对于包含从父级继承的规则的结构，缓存是在上下文树上完成的（颜色属性实际上是继承的，但Firefox将其视为重置并将其缓存在规则树中）。 

例如，如果我们在段落中添加了字体规则：

```css
p {font-family: Verdana; font size: 10px; font-weight: bold}
```

然后，p 元素（它是上下文树中div的子元素）可以与其父元素共享相同的字体结构。如果没有为段落指定字体规则。
在没有规则树的WebKit中，匹配的声明被遍历四次。应用第一个非重要的高优先级属性（应首先应用的属性，因为其他属性依赖于它们，例如显示），然后是高优先级重要，然后是普通优先级不重要，然后是普通优先级重要规则。这意味着将多次出现的属性将根据正确的级联顺序进行解析。最后的胜利。 
总而言之：共享样式对象（完全或其中的一些结构）解决了困难1和3。Firefox规则树还有助于以正确的顺序应用属性。

## 操纵规则以便轻松匹配

- CSS规则，可以是外部样式表或样式元素。

```css
p {color: blue}
```

- 内联样式属性，如

```html
<p style="color: blue" />
```

- HTML可视属性（映射到相关样式规则）

```html
<p bgcolor="blue" />
```

最后两个很容易与元素匹配，因为他拥有样式属性，并且可以使用元素作为键来映射HTML属性。

如前面的问题＃2所述，CSS规则匹配可能比较棘手。为了解决这个难题，操纵规则以便于访问。

解析样式表后，根据选择器将规则添加到多个哈希映射之一。按照ID，按类名，按标签名称以及不适合这些类别的任何内容的一般地图都有地图。如果选择器是id，则规则将被添加到id映射，如果它是一个类，它将被添加到类映射等。 
这种操作使得匹配规则更容易。没有必要查看每个声明：我们可以从地图中提取元素的相关规则。这种优化消除了95 +％的规则，因此在匹配过程中甚至不需要考虑它们（4.1）。

让我们看看例如以下样式规则：

```css
p.error {color: red}
#messageDiv {height: 50px}
div {margin: 5px}
```

第一条规则将被插入到类映射中。第二个进入id映射，第三个进入标记映射。 
对于以下HTML片段;

```html
<p class="error">an error occurred </p>
<div id=" messageDiv">this is a message</div>
```

我们将首先尝试查找p元素的规则。类映射将包含一个“错误”键，在该键下可以找到“p.error”的规则。div元素在id映射中具有相关规则（键是id）和标记映射。所以剩下的唯一工作就是找出按键提取的哪些规则真正匹配。 
例如，如果div的规则是

```css
table div {margin: 5px}
```

它仍将从标记映射中提取，因为该键是最右边的选择器，但它不匹配我们的div元素，它没有表祖先。
WebKit和Firefox都进行了这种操作。

## 以正确的级联顺序应用规则

样式对象具有与每个可视属性相对应的属性（所有CSS属性但更通用）。如果属性未由任何匹配的规则定义，则父元素样式对象可以继承某些属性。其他属性具有默认值。

当存在多个定义时，问题就开始了 - 这就是解决问题的级联顺序。

## 样式表级联顺序

样式属性的声明可以出现在多个样式表中，并且可以在样式表中多次出现。这意味着应用规则的顺序非常重要。这称为“级联”顺序。根据CSS2规范，级联顺序是（从低到高）：

- 浏览器声明
- 用户正常声明
- 作者正常声明
- 作者重要声明
- 用户重要声明

浏览器声明最不重要，只有在声明被标记为重要时，用户才会覆盖作者。具有相同顺序的声明将按下面的特异性排序，然后按指定顺序排序。HTML可视属性被转换为匹配的CSS声明。它们被视为具有低优先级的作者规则。

## 特异性

选择器特异性由CSS2规范定义如下：

- 如果它来自的声明是'style'属性而不是带选择器的规则，则计数为1，否则为0（= a）
- 计算选择器中ID属性的数量（= b）
- 计算选择器中其他属性和伪类的数量（= c）
- 计算选择器中元素名称和伪元素的数量（= d）

连接四个数字abcd（在具有大基数的数字系统中）给出了特异性。
您需要使用的数字基数由您在其中一个类别中的最高计数定义。 
例如，如果a = 14，则可以使用十六进制基数。在a = 17的情况下，你需要一个17位数的基数。后面的情况可能发生在这样的选择器：html body div div p ...（选择器中的17个标签......不太可能）。

一些例子：

```css
 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

### 排序规则

匹配规则后，将根据级联规则对其进行排序。WebKit对小型列表使用冒泡排序，对大型列表使用合并排序。WebKit通过覆盖规则的“>”运算符来实现排序：

```c
static bool operator >(CSSRuleData& r1, CSSRuleData& r2)
{
    int spec1 = r1.selector()->specificity();
    int spec2 = r2.selector()->specificity();
    return (spec1 == spec2) : r1.position() > r2.position() : spec1 > spec2;
}
```

### 渐进的过程

WebKit使用一个标志来标记是否已加载所有顶级样式表（包括@imports）。如果在安装时样式没有完全装入，则使用占位符并在文档中标记，并且在装入样式表后将重新计算它们。

### 布局

创建渲染器并将其添加到树中时，它没有位置和大小。计算这些值称为布局或重排。

HTML使用基于流的布局模型，这意味着大多数情况下可以在一次通过中计算几何。元素后来“在流程中”通常不会影响早期“在流程中”的元素的几何形状，因此布局可以从左到右，从上到下贯穿文档。有例外：例如，HTML表可能需要多次传递（3.5）。

坐标系相对于根框架。使用顶部和左侧坐标。

布局是一个递归过程。它从根渲染器开始，它对应于`<html>`HTML文档的元素。布局以递归方式继续通过部分或全部帧层次结构，计算需要它的每个渲染器的几何信息。

根渲染器的位置为0,0，其尺寸为视口 - 浏览器窗口的可见部分。
所有渲染器都有“布局”或“重排”方法，每个渲染器调用其子窗体的布局方法需要布局。

### 脏位系统

为了不在每次发生小改变时都进行重新布局，浏览器使用了`dirty bit system(脏位系统)`，也就是把要更改或添加的渲染器和它的子元素标记为`dirty bit(脏位)`，这些元素需要重新布局。

有两个标志：

- `dirty`: 渲染器自身需要重新布局
- `children dirty`，这意味着渲染器本身没问题，但它至少有一个子节点需要重新布局。

### 全局和增量布局

可能触发整个渲染树的重新布局，这叫全局布局。这可能是由于：

- 更改了一个影响所有渲染器的全局样式，如字体大小的改变。
- 调整浏览器窗口大小。

布局还可以是增量布局，只会重新布局脏的渲染器（这可能会造成一些损坏，需要额外的布局）。 

当渲染器变脏时，会触发异步的增量布局。例如，当请求新的内容添加到DOM树后，新渲染器附加到渲染树时。

![](/static/img/browser-work/image046.jpg)
图：仅增量布局的脏渲染器及其子布局

### 异步和同步布局

增量布局是异步完成的。Firefox为增量布局排队“reflow命令”，调度程序触发这些命令的批量执行。WebKit也有一个执行增量布局的计时器，负责遍历树和脏渲染器的布局。 

脚本访问样式信息，如获取元素的offsetHeight会触发同步增量布局。全局布局通常也是同步的。 

有时布局会在初始布局后作为回调触发，比如滚动位置改变后。

### 优化

当通过调整浏览器窗口大小或渲染器位置的变化（不是大小）触发重新布局时，渲染大小将从缓存中获取而不会重新计算。 

在某些情况下，仅修改子树重新布局不会从根开始，而是局部的,它不会影响周围的元素，比如在输入框输入文字时(否则每次按键都会导致从根节点重新渲染)。

### 布局流程

布局流程如下：

- 父渲染器确定自己的宽度。
- 父母跳过孩子，并且：
    - 放置子渲染器（设置其x和y）。
    - 如果需要，则子元素重新布局，比如它们是脏的或者全局布局，或者计算子元素的高。
- 父级使用子元素的累计高度、margin 和 padding 来设置自己的高度 - 这会提供给父渲染器的父级使用。
- 将其脏位设置为false。

Firefox使用 state 对象（nsHTMLReflowState）作为布局参数（称为“reflow”）。其中包括父元素宽度。 

Firefox布局的输出是 metrics 对象（nsHTMLReflowMetrics）。它将包含渲染器计算高度。

### 宽度计算

渲染器的宽度使用容器块的宽度，渲染器的样式“宽度”属性，边距和边框计算。例如，以下div的宽度：

```html
<div style="width: 30%"/>
```

将由WebKit计算如下（类RenderBox方法calcWidth）：
- 容器宽度是可用容器宽度和0的最大值。在这种情况下，availableWidth是contentWidth，其计算公式如下：

```
clientWidth() - paddingLeft() - paddingRight()
```

clientWidth和clientHeight表示除边框和滚动条之外的对象的内部。
- 元素宽度是“宽度”样式属性。它将通过计算容器宽度的百分比计算为绝对值。
- 现在添加了水平边框和填充。

到目前为止，这是“首选宽度”的计算。现在将计算最小和最大宽度。 

如果首选宽度大于最大宽度，则使用最大宽度。如果它小于最小宽度（最小的不可破坏单元），则使用最小宽度。
如果需要布局，则缓存值，但宽度不会更改。

### 换行

当布局中间的渲染器决定它需要中断时，渲染器会停止并传播到需要断开的布局父级。父级创建额外的渲染器并在其上调用布局。



## 绘制

在绘制阶段，遍历渲染树并调用渲染器的`paint()`方法在屏幕上显示内容。绘画使用UI基础组件。

## 全局和增量

和布局一样，绘制也可以全局(绘制完整的树)或增量的。在增量绘制中，一些渲染对象以不影响整棵树的方式改变，改变的渲染对象使其在屏幕上的矩形区域失效，这将导致操作系统将其看作dirty区域，并产生一个paint事件，操作系统很巧妙的处理这个过程，并将多个区域合并为一个。在Chrome中，它更复杂，因为渲染器与主进程处于不同的进程。Chrome在某种程度上模拟了操作系统行为。表现为监听事件并派发消息给渲染根，在树中查找到相关的渲染对象，重绘这个对象（往往还包括它的children）。

## 绘制顺序

[CSS2定义了绘制过程的顺序](http://www.w3.org/TR/CSS21/zindex.html)。这实际上是元素在堆叠上下文中堆叠的顺序。这个顺序会影响绘制，因为堆栈是从后向前绘制的。一个块渲染器的堆叠顺序为：

1. background color
2. background image
3. border
4. children
5. outline

## Firefox显示列表

Firefox遍历渲染树并为绘制的矩形创建一个显示列表。它包含与矩形相关的渲染器，按照正确的绘制顺序（先是背景，然后是边框等）。这样，树只需要遍历一次进行重绘，而不是几次 - 绘制所有背景，然后是所有图像，然后是所有边界等。

Firefox通过不绘制隐藏的元素（例如完全位于其他不透明元素下方的元素）来优化该过程。

## WebKit矩形存储

在重新绘制之前，WebKit将旧矩形保存为位图。然后它只绘制新旧矩形之间的差值。 

## 动态变化

浏览器总是试着以最小的动作响应一个变化，所以一个元素颜色的变化将只导致该元素的重绘，元素位置的变化将导致元素的布局和重绘。比如修改了`html`元素的字体大小会导致缓存失效，重新布局和绘制整个树。

## 渲染引擎的线程

渲染引擎是单线程的。除网络操作外，几乎所有事情都发生在一个线程中。在Firefox和Safari中，这是浏览器的主线程。在Chrome中，它是一个 tab 进程主线程。 

网络操作可以由几个并行线程执行。并行连接的数量是有限的（通常同一个域名是2-6个连接）。

## 事件循环

浏览器主线程是一个事件循环。它是一个无限循环，它会检查事件(如布局和绘制事件)并处理它们。Firefox代码是：

```c
while (!mExiting)
    NS_ProcessNextEvent(thread);
```

## CSS2视觉模型

### 画布

根据CSS2规范，画布用来描述格式化的结构所渲染的空间——浏览器绘制内容的地方。画布对每个维度空间都是无限大的，但浏览器基于viewport的大小选择了一个初始宽度。

根据[http://www.w3.org/TR/CSS2/zindex.html](http://www.w3.org/TR/CSS2/zindex.html)的定义，画布如果是包含在其他画布内则是透明的，否则浏览器会指定一个颜色。

### CSS盒模型

[CSS盒模型](http://www.w3.org/TR/CSS2/box.html)描述了矩形盒，这些矩形盒是为文档树中的元素生成的，并根据可视的格式化模型进行布局。每个 box 包括内容区域（如图片、文本等）及可选的四周 padding、border 和 margin 区域。

![](/static/img/browser-work/image046.jpg)
图：CSS2 盒模型

每个节点生成 0..n 这样的框。所有元素都有一个`display`属性，用于确定将生成的框的类型。例如：

```
block: 生成一个块盒子
inline: 生成一个或多个行内盒子
none: 不生成盒子
```

默认为内联，但浏览器样式表可能设置其他默认值。例如：div 元素的默认显示是 block。 可以查看默认样式[www.w3.org/TR/CSS2/sample.html](www.w3.org/TR/CSS2/sample.html)

## 定位方案

有三种方案：

1. normal：根据文档中的位置定位对象。这意味着它在渲染树中的位置就像它在DOM树中的位置，并根据其框类型和尺寸进行布局。
2. float：物体首先像正常流一样布置，然后尽可能向左或向右移动。
3. absolute：将对象放在渲染树中的位置和DOM树不同。

定位方案由属性`position`和`float`决定：

- `static`和`relative`是 normal 流
- `absolute`和`fixed`是 absolute 流

在static定位中，不定义位置而使用默认的位置。其他方案中，可以通过top、bottom、left、right指定位置。

盒子布局的方式取决于：

- 盒子类型
- 盒子尺寸
- 定位方案
- 外部信息，如图像大小和屏幕大小

## 盒子类型

Block box：形成一个块 - 在浏览器窗口中有自己的矩形。

![](/static/img/browser-work/image057.png)
图：block框

Inline box：没有自己的快，包含在块内。

![](/static/img/browser-work/image059.png)
图：inline 框

block 是一个接一个的垂直排列，inline 是水平排列的。

![](/static/img/browser-work/image061.png)
图：block和inline元素

inline 盒模型放置在行内或是 line box 中，每行至少和最高的 box 一样高，当 box 以 baseline 对齐时(即一个元素的底部和另一个box上除底部以外的某点对齐，行高可以比最高的 box 高)。当容器宽度不够时，行内元素将被放到多行中，这在一个 p 标签中经常发生。

![](/static/img/browser-work/image063.png)
图：lines

## 定位

### Relative

相对定位: 先按照一般的定位，然后按要求的差值移动

![](/static/img/browser-work/image065.png)

### Floats

浮动的盒子会移动到一行的最左边或最右边。有趣的是其他盒子围绕在它周围。

```html
<p>
  <img style="float: right" src="images/image.gif" width="100" height="100">
  Lorem ipsum dolor sit amet, consectetuer...
</p>
```

显示结果如下图：

![](/static/img/browser-work/image067.png)
图：Float

### Absolute和Fixed

这种情况下的布局完全不顾普通的文档流，元素不属于文档流的一部分，大小取决于容器。Fixed时，容器为viewport（可视区域）。

![](/static/img/browser-work/image069.png)
图：Fixed定位

fixed即使在文档流滚动时也不会移动。

### 分层表现

由 z-index 决定，它表示盒子在z轴的位置。

这些盒子被分到栈里（称为堆叠上下文），每个栈中后面的元素先绘制，前面的元素将在上层绘制，更靠近用户。在重叠时，上面的元素会覆盖下面的元素。栈是根据 z-index 属性排列的。有 z-index 属性的盒子形成一个局部堆栈，viewport 有外部堆栈。

示例：

```html
<style type="text/css">
      div {
        position: absolute;
        left: 2in;
        top: 2in;
      }
</style>

<p>
    <div
         style="z-index: 3;background-color:red; width: 1in; height: 1in; ">
    </div>
    <div
         style="z-index: 1;background-color:green;width: 2in; height: 2in;">
    </div>
 </p>
```

显示结果如下：

![](/static/img/browser-work/image071.png)
图：Fixed 定位

虽然 html 代码中红色 div 写在绿色 div 前面，并且在正常流中之前已经绘制过，但是 z-index 属性更高，因此它在根box的堆栈中更靠前。(可以理解为绘制后，还要进行层级显示)


