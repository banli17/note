(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{191:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",function(){return c}),n.d(t,"rightToc",function(){return i}),n.d(t,"default",function(){return p});n(0);var a=n(283);function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function r(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var c={title:"HTML 元信息类标签",sidebar_label:"元信息类标签"},i=[{value:"head 标签",id:"head-标签",children:[]},{value:"title 标签",id:"title-标签",children:[]},{value:"base 标签",id:"base-标签",children:[]},{value:"meta 标签",id:"meta-标签",children:[{value:"charset",id:"charset",children:[]},{value:"http-equiv",id:"http-equiv",children:[]},{value:"viewport",id:"viewport",children:[]},{value:"其它",id:"其它",children:[]}]}],b={rightToc:i},o="wrapper";function p(e){var t=e.components,n=r(e,["components"]);return Object(a.b)(o,l({},b,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"元信息，是指描述自身的信息。元信息类标签，就是 HTML 用于描述文档自身的一类标签，通常出现在 head 中，不会被页面显示出来，通常是给浏览器、搜索引擎阅读的。而与之相对的语义类标签，描述的是业务。"),Object(a.b)("p",null,"元信息类标签有："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"head"),Object(a.b)("li",{parentName:"ul"},"title"),Object(a.b)("li",{parentName:"ul"},"base"),Object(a.b)("li",{parentName:"ul"},"meta")),Object(a.b)("h2",{id:"head-标签"},"head 标签"),Object(a.b)("p",null,"head 标签通常和 body 标签一样，用于容器使用。"),Object(a.b)("p",null,"head 规定如下："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"必须是 html 标签中的第一个标签。"),Object(a.b)("li",{parentName:"ul"},"必须包含一个 title，如果文档作为 iframe，或其它地方指定了文档标题，可以不包含 title。"),Object(a.b)("li",{parentName:"ul"},"最多包含一个 base。")),Object(a.b)("h2",{id:"title-标签"},"title 标签"),Object(a.b)("p",null,"title 标签表示文档的标题。"),Object(a.b)("p",null,"title 标签和 heading(h1..h6) 标签的区别是："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"title 可能被用于浏览器收藏夹，微信推送名片，微博等场景，所以应该是完整的网页内容的概括"),Object(a.b)("li",{parentName:"ul"},"h1 只是用于展示，而且默认有上下文，所以可以简写，影响不大。")),Object(a.b)("h2",{id:"base-标签"},"base 标签"),Object(a.b)("p",null,"base 标签最多有一个，表示页面的基准 URL，即其它链接是以它作为相对地址，非常危险，不建议使用。"),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-html"}),'\x3c!-- 后面要加 /，否则是相对 http://www.xx.com/ --\x3e\n<base href="http://www.xx.com/a/"> \n\n\x3c!-- 会打开页面 http://www.xx.com/a/x.html --\x3e\n<a href="./x.html">this is a link</a>\n\x3c!-- 会打开页面 http://www.xx.com/x.html --\x3e\n<a href="../x.html">this is a link</a>\n')),Object(a.b)("h2",{id:"meta-标签"},"meta 标签"),Object(a.b)("p",null,"meta 标签一般是一组键值对，由 name、content 属性组成。这里的 name 可以自定义。"),Object(a.b)("h3",{id:"charset"},"charset"),Object(a.b)("p",null,"HTML5 为了简化写法，meta 新增了 charset 属性。添加了 charset 后，不需再有 name、content。"),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-html"}),'<meta charest="UTF-8">\n')),Object(a.b)("p",null,"charset 标签描述了 HTML 文档自身的编码形式。最好放 head 的最前面，这样浏览器读到这个标签之前，都是 ASCII 字符(很多字符集的子集)，一般不会出错，后面的字符再用 charset 来解析。这样可以最大程度防止乱码。"),Object(a.b)("p",null,"一般情况下，HTTP 服务器可以通过 http 头指定正确的编码，但是 file 协议打开 HTML 文件，没有 http 头，这时 charset 就有用了。"),Object(a.b)("h3",{id:"http-equiv"},"http-equiv"),Object(a.b)("p",null,"http-equiv 属性，表示执行一个命令，这样的 meta 标签也不需要 name、content。"),Object(a.b)("h3",{id:"viewport"},"viewport"),Object(a.b)("p",null,"viewport 没有在 HTML 标准中定义，但是是移动端开发的标准。"),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-html"}),'<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">\n')),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"width: 页面宽度，也可以是 device-width"),Object(a.b)("li",{parentName:"ul"},"height: 页面高度，也可以是 device-height"),Object(a.b)("li",{parentName:"ul"},"initial-scale: 初始缩放比例"),Object(a.b)("li",{parentName:"ul"},"minimum-scale: 最小缩放比例"),Object(a.b)("li",{parentName:"ul"},"maximum-scale: 最大缩放比例"),Object(a.b)("li",{parentName:"ul"},"use-scalable: 是否运行用户缩放")),Object(a.b)("h3",{id:"其它"},"其它"),Object(a.b)("p",null,"还有一些 name 值表示含义如下："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"application-name: web application 的应用名称"),Object(a.b)("li",{parentName:"ul"},"author: 页面作者"),Object(a.b)("li",{parentName:"ul"},"description"),Object(a.b)("li",{parentName:"ul"},"keywords"),Object(a.b)("li",{parentName:"ul"},"generator: 生成页面所用的工具，如果是手写 HTML，则不需要。"),Object(a.b)("li",{parentName:"ul"},"referrer: 跳转策略"),Object(a.b)("li",{parentName:"ul"},"theme-color: 页面风格颜色，实际不会影响页面，但是浏览器可能根据它调整页面之外的 UI，如 tab 颜色或窗口边框。")),Object(a.b)("pre",null,Object(a.b)("code",l({parentName:"pre"},{className:"language-html"}),'\x3c!-- 禁止百度转码，防止百度贴广告 --\x3e\n<meta http-equiv="Cache-Control" content="no-siteapp">\n\n\x3c!-- 默认使用最新浏览器 --\x3e\n<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n\n\x3c!-- 不被网页(加速)转码 --\x3e\n<meta http-equiv="Cache-Control" content="no-siteapp">\n\n\x3c!-- 搜索引擎抓取 --\x3e\n<meta name="robots" content="index,follow">\n\n\x3c!-- 删除苹果默认的工具栏和菜单栏 --\x3e\n<meta name="apple-mobile-web-app-capable" content="yes">\n\n\x3c!-- 设置苹果工具栏颜色 --\x3e\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n\n\x3c!-- 关闭iOS上的内容识别 --\x3e\n<meta name="format-detection" content="telephone=no">\n<meta name="format-detection" content="date=no">\n<meta name="format-detection" content="address=no">\n<meta name="format-detection" content="email=no">\n\n\x3c!-- 对于多核浏览器，控制浏览器以哪种类型内核来显示 --\x3e\n<meta name="renderer" content="webkit|ie-comp|ie-stand">\n')))}p.isMDXComponent=!0},283:function(e,t,n){"use strict";n.d(t,"a",function(){return i}),n.d(t,"b",function(){return m});var a=n(0),l=n.n(a),r=l.a.createContext({}),c=function(e){var t=l.a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},i=function(e){var t=c(e.components);return l.a.createElement(r.Provider,{value:t},e.children)};var b="mdxType",o={inlineCode:"code",wrapper:function(e){var t=e.children;return l.a.createElement(l.a.Fragment,{},t)}},p=function(e){var t=e.components,n=e.mdxType,a=e.originalType,r=e.parentName,i=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),b=c(t),p=n,m=b[r+"."+p]||b[p]||o[p]||a;return t?l.a.createElement(m,Object.assign({},i,{components:t})):l.a.createElement(m,i)};function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,c=new Array(r);c[0]=p;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[b]="string"==typeof e?e:a,c[1]=i;for(var m=2;m<r;m++)c[m]=n[m];return l.a.createElement.apply(null,c)}return l.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);