(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{183:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",function(){return r}),t.d(n,"rightToc",function(){return b}),t.d(n,"default",function(){return o});t(0);var l=t(283);function a(){return(a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l])}return e}).apply(this,arguments)}function i(e,n){if(null==e)return{};var t,l,a=function(e,n){if(null==e)return{};var t,l,a={},i=Object.keys(e);for(l=0;l<i.length;l++)t=i[l],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(l=0;l<i.length;l++)t=i[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var r={title:"布局",sidebar_label:"css 布局"},b=[{value:"正常流布局",id:"正常流布局",children:[{value:"正常流的行为",id:"正常流的行为",children:[]},{value:"正常流原理",id:"正常流原理",children:[]},{value:"等分布局",id:"等分布局",children:[]},{value:"自适应宽度",id:"自适应宽度",children:[]}]},{value:"table 布局",id:"table-布局",children:[]},{value:"flex 布局",id:"flex-布局",children:[{value:"flex 布局原理",id:"flex-布局原理",children:[]},{value:"垂直局中问题",id:"垂直局中问题",children:[]},{value:"两列等高问题",id:"两列等高问题",children:[]},{value:"自适应宽度问题",id:"自适应宽度问题",children:[]}]},{value:"Grid 布局",id:"grid-布局",children:[]},{value:"参考资料",id:"参考资料",children:[]}],c={rightToc:b},p="wrapper";function o(e){var n=e.components,t=i(e,["components"]);return Object(l.b)(p,a({},c,t,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"正常流布局"},"正常流布局"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{className:"language-html",metastring:"live",live:!0}),"hello\n")),Object(l.b)("h3",{id:"正常流的行为"},"正常流的行为"),Object(l.b)("p",null,"正常流的排版行为，就是依次排列，排不下了就换行。"),Object(l.b)("p",null,"float 的规则是使得一些盒占据正常流需要的空间"),Object(l.b)("p",null,"vertical-align: 规定如何在垂直方向对齐盒子。分为基线、文字顶/底、行顶/底、中线。"),Object(l.b)("p",null,"margin 折叠：可以将 margin 理解为一个元素规定了自身周围至少需要的空间。"),Object(l.b)("h3",{id:"正常流原理"},"正常流原理"),Object(l.b)("p",null,'在 CSS 标准中，规定了如何排列每个文字和盒子的算法，这个算法依赖一个排版的当前状态，CSS 把它叫做"格式化上下文(formatting context)"。'),Object(l.b)("p",null,"可以认为排版过程是：格式化上下文 + 盒子/文字 = 位置。"),Object(l.b)("p",null,"盒子分为块级盒和行内级盒，所以排版规定了块级格式化上下文和行内级格式化上下文。"),Object(l.b)("p",null,"块级格式化上下文是每个块盒子独占一行，从上往下排列。行内级格式化上下文是每个盒子从左往右排列(受书写方向影响)。"),Object(l.b)("p",null,"正常流中的盒子或文字排版，分为三种情况："),Object(l.b)("ol",null,Object(l.b)("li",{parentName:"ol"},"遇到块盒子，排入块级格式化上下文。"),Object(l.b)("li",{parentName:"ol"},"遇到行内盒子或文字，新建一个行盒(行盒是块级，归入块级格式化上下文)，它内部会创建一个行内级格式化上下文，如果排列不下，则再重新创建一个行盒。"),Object(l.b)("li",{parentName:"ol"},"遇到 float 盒，把盒的顶部对齐到当前行内级上下文边缘，根据 float 方法把盒对应边缘对齐到块级格式化上下文边缘，之后重排当前行盒。")),Object(l.b)("p",null,Object(l.b)("img",a({parentName:"p"},{src:"/img/css/layout/float.png",alt:null}))),Object(l.b)("p",null,"另外，格式化上下文边缘的空格会被忽略，只有行内级格式化上下文内部的空格才有效。"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{className:"language-js"}),'<div>\n    111\n    <div style="height:10px;background: blue;"></div>\n    <div style="height:10px;background: gold;"></div>\n    <span>x</span> 只有这里的空格才有效 <span>y</span>\n</div>\n')),Object(l.b)("p",null,"除此之外，一些元素还会在内部创建新的块级格式化上下文。"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"浮动元素"),Object(l.b)("li",{parentName:"ul"},"绝对定位的元素"),Object(l.b)("li",{parentName:"ul"},"非块级，但是能包含块级的容器(如 inline-block，table-cell，table-captions)"),Object(l.b)("li",{parentName:"ul"},"自身为块级，且属性 overflow 不为 visible。")),Object(l.b)("h3",{id:"等分布局"},"等分布局"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{className:"language-html"}),'<div class="outer">\n    <div class="inner"></div>\n    <div class="inner"></div>\n    <div class="inner"></div>\n</div>\n\n.outer{\n    font-size: 0;     // 文本干扰\n    width: 201px;     // 配合后面的 margin-right ，兼容一些浏览器\n}\n\n.inner{\n    display: inline-block;\n    width: 33.3%;\n    height: 100px;\n}\n\n.inner:last-child{\n    margin-right: -5px; \n}\n')),Object(l.b)("p",null,"float 也能实现效果，但是它只能顶对齐。不如 inline-block 灵活。"),Object(l.b)("h3",{id:"自适应宽度"},"自适应宽度"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{}),'<div class="outer">\n    <div class="bar"></div>\n    <div class="content"></div>\n</div>\n\n.outer{\n    font-size: 0\n}\n.bar{\n    display: inline-block;\n    width: 100px;\n    transform: translateZ(0); // 防止 content 有背景色时将 bar 覆盖掉\n}\n.content{\n    margin-left: -100px;\n    padding-left: 100px;\n    width: 100%;\n    display: inline-block;\n    box-sizing: border-box;\n    vertical-align: top;\n}\n')),Object(l.b)("h2",{id:"table-布局"},"table 布局"),Object(l.b)("h2",{id:"flex-布局"},"flex 布局"),Object(l.b)("h3",{id:"flex-布局原理"},"flex 布局原理"),Object(l.b)("p",null,"当给一个盒子设置了 ",Object(l.b)("inlineCode",{parentName:"p"},"display: flex")," 属性后，它的子元素就形成了 flex 布局模型。flex 模型图如下："),Object(l.b)("p",null,Object(l.b)("img",a({parentName:"p"},{src:"/img/css/layout/flex.png",alt:null}))),Object(l.b)("p",null,"父盒子有如下 6 个属性:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"flex-direction：主轴方向。",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"row")," 默认"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"row-reverse")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"column")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"column-reverse")))),Object(l.b)("li",{parentName:"ul"},"flex-wrap：一条轴线排不下时，如何换行。",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"nowrap")," 默认"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"wrap")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"wrap-reverse")))),Object(l.b)("li",{parentName:"ul"},"flex-flow: 上面2个属性的缩写",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"row nowrap")," 默认"))),Object(l.b)("li",{parentName:"ul"},"justify-content",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"flex-start")," 默认"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"flex-end")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"center")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"space-between")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"space-around")))),Object(l.b)("li",{parentName:"ul"},"align-items: 项目在交叉轴上如何对齐",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"stretch")," 默认"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"flex-start")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"flex-end")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"center")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"baseline")))),Object(l.b)("li",{parentName:"ul"},"align-content: 多根轴线的对齐方式，如果只有一根轴线，该属性不起作用",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"stretch")," 默认"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"flex-start")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"flex-end")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"center")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"space-between")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"space-around"))))),Object(l.b)("p",null,"子盒子的属性："),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"order：子盒子的排序。默认值为 0"),Object(l.b)("li",{parentName:"ul"},"flex-grow: 父盒子空间有富余时，子元素怎么占用"),Object(l.b)("li",{parentName:"ul"},"flex-shrink: 子盒子空间超出父盒子空间时，子元素怎么收缩"),Object(l.b)("li",{parentName:"ul"},"flex-basis: 在主轴上的长度，会覆盖width或height属性"),Object(l.b)("li",{parentName:"ul"},"flex: 上面3个属性的缩写",Object(l.b)("ul",{parentName:"li"},Object(l.b)("li",{parentName:"ul"},Object(l.b)("inlineCode",{parentName:"li"},"0 1 auto")," 默认"),Object(l.b)("li",{parentName:"ul"},"auto (1 1 auto) "),Object(l.b)("li",{parentName:"ul"},"none (0 0 auto)"))),Object(l.b)("li",{parentName:"ul"},"align-self: 子盒子自身在副轴上的分布，覆盖父盒子的",Object(l.b)("inlineCode",{parentName:"li"},"align-items"),"。")),Object(l.b)("h3",{id:"垂直局中问题"},"垂直局中问题"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{className:"language-html"}),'<div id="parent">\n  <div id="child">\n  </div>\n</div>\n\n#parent {\n  display:flex;\n  width:300px;\n  height:300px;\n  outline:solid 1px;\n  justify-content:center;\n  align-content:center;\n  align-items:center;\n}\n#child {\n  width:100px;\n  height:100px;\n  outline:solid 1px;\n}\n')),Object(l.b)("h3",{id:"两列等高问题"},"两列等高问题"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{}),'<div class="parent">\n  <div class="child" style="height:300px;">\n  </div>\n  <div class="child">\n  </div>\n</div>\n\n.parent {\n  display:flex;\n  width:300px;\n  justify-content:center;\n  align-content:center;\n  align-items:stretch;\n}\n.child {\n  width:100px;\n  outline:solid 1px;\n}\n')),Object(l.b)("h3",{id:"自适应宽度问题"},"自适应宽度问题"),Object(l.b)("pre",null,Object(l.b)("code",a({parentName:"pre"},{className:"language-html"}),'<div class="parent">\n  <div class="child1">\n  </div>\n  <div class="child2">\n  </div>\n</div>\n\n\n.parent {\n  display:flex;\n  width:300px;\n  height:200px;\n  background-color:pink;\n}\n.child1 {\n  width:100px;\n  background-color:lightblue;\n}\n.child2 {\n  width:100px;\n  flex:1;\n  outline:solid 1px;\n}\n')),Object(l.b)("h2",{id:"grid-布局"},"Grid 布局"),Object(l.b)("h2",{id:"参考资料"},"参考资料"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"重学前端"),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",a({parentName:"li"},{href:"http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html"}),"Flex 布局教程：语法篇")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",a({parentName:"li"},{href:"http://www.ruanyifeng.com/blog/2015/07/flex-examples.html"}),"Flex 布局教程：实例篇")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",a({parentName:"li"},{href:"http://www.ruanyifeng.com/blog/2018/10/flexbox-form.html"}),"Flexbox 布局的最简单表单")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",a({parentName:"li"},{href:"https://demos.scotch.io/visual-guide-to-css3-flexbox-flexbox-playground/demos/"}),"flexbox demo")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",a({parentName:"li"},{href:"http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html"}),"CSS Grid 网格布局教程")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",a({parentName:"li"},{href:"https://css-tricks.com/snippets/css/complete-guide-grid"}),"A Complete Guide to Grid "))))}o.isMDXComponent=!0},283:function(e,n,t){"use strict";t.d(n,"a",function(){return b}),t.d(n,"b",function(){return u});var l=t(0),a=t.n(l),i=a.a.createContext({}),r=function(e){var n=a.a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},b=function(e){var n=r(e.components);return a.a.createElement(i.Provider,{value:n},e.children)};var c="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},o=function(e){var n=e.components,t=e.mdxType,l=e.originalType,i=e.parentName,b=function(e,n){var t={};for(var l in e)Object.prototype.hasOwnProperty.call(e,l)&&-1===n.indexOf(l)&&(t[l]=e[l]);return t}(e,["components","mdxType","originalType","parentName"]),c=r(n),o=t,u=c[i+"."+o]||c[o]||p[o]||l;return n?a.a.createElement(u,Object.assign({},b,{components:n})):a.a.createElement(u,b)};function u(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var i=t.length,r=new Array(i);r[0]=o;var b={};for(var p in n)hasOwnProperty.call(n,p)&&(b[p]=n[p]);b.originalType=e,b[c]="string"==typeof e?e:l,r[1]=b;for(var u=2;u<i;u++)r[u]=t[u];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,t)}o.displayName="MDXCreateElement"}}]);