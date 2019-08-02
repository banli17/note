---
id: index
title: "HTML 基础知识总结"
sidebar_label: HTML 
---

## 元素

### 文档元信息

### 语义相关内容

> 语义类标签是什么，使用它有什么好处？

语义类标签是纯文本的补充，比如标题、自然段、章节、列表等，这些内容无法用纯文字表达，需要语义标签代为表达。

如果说 HTML 用于软件界面，实际是几乎没有语义的，可以直接使用 div 和 span。

正确使用语义类标签的好处：
1. 语义类标签对开发者更友好，可以增强可读性，即使没有 CSS，开发者也可以清晰的看出网页的结构，便于团队开发和维护。
1. 适合机器阅读，更适合 SEO，可以让搜索引擎更好的获取更多有效信息，提升网页搜索量。并且语义类可以支持读屏软件，根据文章自动生成目录等。

其实 HTML 和人类语言一样，如果说话的适合没有语气、没有停顿、没有重点会让人很难理解。而 HTML 面对的是人和机器(读屏软件、搜索引擎等)，没有语义也会很难阅读和理解。

使用场景:

- 作为自然语言和纯文本的补充，用来表达一定的结构或者消除歧义。

```html
<!-- <ruby> 元素由一个或多个需要解释/发音的字符和一个提供该信息的 <rt> 元素组成
       还包括可选的 <rp> 元素，定义当浏览器不支持 "ruby" 元素时显示的内容。 -->
<ruby>
汉 <rp>(</rp><rt>Han</rt><rp>)</rp>
字 <rp>(</rp><rt>zi</rt><rp>)</rp>
</ruby>
```


```html
<!-- 消除歧义 -->
<em>今天</em>我吃了一个苹果。
今天<em>我</em>吃了一个苹果。
今天我吃了<em>一个</em>苹果。
今天我吃了一个<em>苹果</em>。
```

em 表示重音，和 strong 的区别。

- 文章标题摘要：文章的结构

语义化的HTML能够支持自动生成目录结构，HTML标准中还专门规定了生成目录结构的算法，即使我们并不打算深入实践语义，也应该尽量在大的层面上保证这些元素的语义化使用。

首先我们需要形成一个概念，一篇文档会有一个树形的目录结构，它由各个级别的标题组成。这个树形结构 可能不会跟HTML元素的嵌套关系一致。

比如: 

```html
<!-- - JavaScript对象 -->
<!-- - 我们需要模拟类吗? -->
<h1></h1>  
<h2></h2>  

<!-- JavaScript对象 —— 我们需要模拟类吗? -->
<hgroup>
    <h1></h1>  
    <h2></h2>  
</hgroup>
```

上面两端代码生成的标题含义是不同的，前者 h2 属于 h1 的子标题，而后者 h2 是 h1 的副标题。

section 不仅是一个有语义的 div，而且会改变 h1-h6 的语义，可以让 h1-h6 标题降一级。所以前面的例子可以写成：

```html
<section>
    <h1></h1>
    <section>
        <h1></h1>
    </section>
</section>
```

- 适合机器阅读的整体结构：如浏览器的阅读模式，搜索引擎收录，读屏软件。

```html
<body>
    <header>
        <nav> ...... </nav>
    </header>
    <aside>
        <nav> ...... </nav>
    </aside>
    <section>......</section>
    <section>......</section>
    <section>......</section>
    <footer>
        <address>......</address>
    </footer>
</body>
```

article是一种特别的结构，它表示具有一定独立性质的文章。所以，article和body 具有相似的结构，同时，一个HTML页面中，可能有多个article存在。一个典型的场景是多篇新闻展示在同一个新闻专题页面中，这种类似报纸的多文章结构适合用article来组织。

```html
<body>
      <header>......</header>
      <article>
          <header>......</header>
          <section>......</section>
          <section>......</section>
          <section>......</section>
          <footer>......</footer>
      </article>
      <article>
          ......
      </article>
      <article> 
         ...... 
      </article>
      <footer>
          <address></address>
      </footer>
</body>
```

- header 通常出现在前部，表示导航或者介绍性的内容。
- footer，通常出现在尾部，包含一些作者信息、相关链接、版权信息等。

header、footer 一般作为 body 或 article 的直接子元素，但是标准中并没有明确规定，footer也可以和 aside，nav，section相关联(header不存在关联问题)。

aside表示跟文章主体不那么相关的部分，它可能包含导航、广告等工具性质的内容。侧边栏是aside，aside不一定是侧边栏。

aside和header中都可能出现导航(nav标签)，二者的区别是，header中的导航多数是到文章自己的目 录，而aside中的导航多数是到关联页面或者是整站地图。

address 表示文章(作者) 的联系方式。address 只关联 article 和 body。

标签名|描述
---|---
`abbr`| 表示缩写  `<abbr title="world wide web">WWW</abbr>`
`hr` | 表示故事走向的转变或话题的转变
<!-- `p`| 段落、额外注释  html 中没有 note相关语义标签，所以用`<p class="note">` -->
`strong` | 重要的词
`blockquote，q，cite`|都表示引述，blockquote 段落级引述 q 行内引述内容，cite 是引述的作品名
`time` | 让机器阅读日期，属性 datetime 有格式要求
`figure`、`figcaption`| 表示与主文章相关的图片、照片等流内容，不仅限图片，代码、表格等，只要是具有一定自包含性(类似独立句子)的内容，都可以用figure。  `<figure><img src="xx.JPG"/> <figcaption>The NeXT Computer used by Tim Berners-Lee at CERN.</figcaption> </figure>`
`dfn` | 包裹定义的名词  `the <dfn>World Wide Web</dfn> is a global collection of documents and other resources。`
`nav`、`ol`、`ul`| 
`pre`|预先排版过的，不需要浏览器进行排版
`samp`| 用于标识计算机程序输出，如代码示例 `<pre><samp> GET /home.html HTTP/1.1 Host: www.example.org </samp></pre>`
`code`| 包裹代码   `<pre><code></code></pre>`
`small`|代表注释，如免责声明、版权声明等，对理解文档不重要。
`s`|之前表示划线的废弃标签，html表示不准确或不相关的内容，常用语打折的价格
`i`|之前表示斜体的废弃标签，html5 表示读音变调
`b`|之前表示黑体的废弃标签，html5 表示关键字
`u`|之前表示下划线的废弃标签，html5 表示避免歧义的注记
`data`|
`var`|变量，用于计算机和数学领域
`kbd`|用户输入，表示键盘按键居多 `<p>Please press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> to re-render an MDN page.</p>`
`sub`|下标，多用于化学、物理、数学领域
`sup`|上标，多用于化学、物理、数学领域
[`bdi`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi)| 双向隔离元素，告诉浏览器的双向算法将其包含的文本与其周围文本隔离开来，dir默认是auto，不继承，相当于自动识别方向。双向文本是包含LTR和RTL的文本，例如嵌入在英语字符串中的阿拉伯语引号。浏览器实现Unicode双向算法来处理这个问题。在该算法中，字符被赋予隐式方向性：例如，拉丁字符被视为LTR，而阿拉伯字符被视为RTL。其他一些字符（例如空格和一些标点符号）被视为中性字符，并根据其周围字符的方向指定方向性。通常，双向算法将做正确的事情，但偶尔，算法需要帮助。`<li><bdi class="name">François fatale</bdi>: 2nd place</li>`
[`bdo`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo)|覆盖文本的当前方向性，属性 dir:`ltr`、`rtl`
`mark`| 高亮或标记，如标记用户感兴趣的文本
`wbr`|表示可以换行的位置，因为英文等文字不允许单词中间换行，一般在多个单词粘成很长的单词时使用。
`menu`|ul的变体，用于功能菜单时使用
`dl`、`dd`、`dt`|
`main`|整个页面只出现一次，表示页面的主要内容

完整的HTML元素列表:[https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5/HTML5_element_list)。

HTML这种语言，并不像严谨的编程语言一样，有一条非此即彼的线。一些语义的使用其实会带来 争议，所以尽量只用自己熟悉的语义标签，并且只在有把握的场景引入语义标签。这样，才能保证语义标签不被滥用，造成更多的问题。

### 链接
### 替换型元素
### 表单
### 表格
### 总集

## 语言
### 实体
### 命名空间
## 补充标准

## 面试题

### DOCTYPE有什么用？

DOCTYPE(`document type`)告诉浏览器用那种模式来渲染页面。它可以声明三种 DTD 类型。分别是标准模式、过度版本和基于框架的 HTML 文档。

这是历史原因导致的，最初浏览器渲染页面没有统一的方式，叫做混杂模式(quirks mod)。W3C 标准化后，有了统一的渲染方式，即标准模式(严格模式)。但是为了保证之前的页面正常显示，所以浏览器保留了这两种渲染方式(标准兼容模式)。具体采用哪种方式渲染，就要看 DOCTYPE 中的 DTD。

DTD(Document Type Definition) 是一套为了数据交换而建立的标记符的语法规范，可以通过文档类型定义文件来检查文档是否符合规范，元素和标签使用是否正确。

标准模式下，浏览器以支持最高的标准渲染页面。混杂模式下，页面以宽松的向后兼容模式显示，防止老站点无法工作。

如果XHTML、HTML 4.01 文档包含形式完整的 DOCTYPE，那么它以标准模式呈现。包含过渡 DTD 和 URI 的 DOCTYPE 也会以标准模式呈现，有过渡 DTD ，没有 URI 的页面会以混杂模式呈现，DOCTYPE 不存在或形式不正确会导致文档以混杂模式显示。

html5 没有 DTD，没有标准模式和混杂模式区分。语法相对宽松，已经尽可能实现向后兼容。

