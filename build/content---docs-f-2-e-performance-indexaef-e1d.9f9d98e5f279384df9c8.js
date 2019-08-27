(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{211:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",function(){return b}),n.d(t,"rightToc",function(){return c}),n.d(t,"default",function(){return o});n(0);var a=n(283);function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b={title:"建立性能体系"},c=[{value:"建立性能体系",id:"建立性能体系",children:[]},{value:"现状评估和建立指标",id:"现状评估和建立指标",children:[]},{value:"技术方案",id:"技术方案",children:[]},{value:"执行",id:"执行",children:[]},{value:"结果评估和线上监控",id:"结果评估和线上监控",children:[{value:"数据采集 Performance API",id:"数据采集-performance-api",children:[]},{value:"数据展现",id:"数据展现",children:[]}]},{value:"参考资料",id:"参考资料",children:[]}],i={rightToc:c},p="wrapper";function o(e){var t=e.components,n=l(e,["components"]);return Object(a.b)(p,r({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"网站的性能会直接影响到用户体验，而用户体验会影响网站的收益。因此网站的性能优化十分重要。"),Object(a.b)("h2",{id:"建立性能体系"},"建立性能体系"),Object(a.b)("p",null,"性能体系的建立主要有以下方面。"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"现状评估和建立指标"),Object(a.b)("li",{parentName:"ul"},"技术方案"),Object(a.b)("li",{parentName:"ul"},"执行"),Object(a.b)("li",{parentName:"ul"},"结果评估和监控")),Object(a.b)("h2",{id:"现状评估和建立指标"},"现状评估和建立指标"),Object(a.b)("p",null,"在性能优化之前，我们需要知道当前网站的性能情况。具体就需要监控获取性能数据(下面讲)、建立指标。"),Object(a.b)("p",null,"建立指标需要从两个方面来考虑：用户体验、公司业务。"),Object(a.b)("p",null,"用户体验主要涉及到："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"页面加载性能"),Object(a.b)("li",{parentName:"ul"},"动画和操作性能"),Object(a.b)("li",{parentName:"ul"},"内存、电量消耗")),Object(a.b)("p",null,"实际上，页面加载性能和公司业务是相关的，因为它会导致用户的流失。"),Object(a.b)("p",null,"评价页面加载性能的指标可以用秒开率，也就是 1s 内打开页面的用户占比。要注意："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"加载时间低于 1s 时，用户感知区别不大。"),Object(a.b)("li",{parentName:"ul"},"忽略少数加载时间过长的用户，如 2G 用户，而是考虑大多数用户。")),Object(a.b)("h2",{id:"技术方案"},"技术方案"),Object(a.b)("p",null,"性能优化需要从客户端到服务端整个链路来进行优化。先来回顾以下浏览器打开页面经历了什么。"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"DNS 解析，根据域名获取 ip。"),Object(a.b)("li",{parentName:"ol"},"HTTP 请求，会产生 TCP 连接，可能还有 HTTPS 证书交换过程。"),Object(a.b)("li",{parentName:"ol"},"页面返回后，浏览器还要请求图片等资源，而且浏览器请求对同域名有并发限制。所以要考虑请求大小与数量。")),Object(a.b)("p",null,"最终技术方案如下："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"提高网络传输",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"缓存: 客户端控制的强缓存策略，减少数据请求和服务器压力。"),Object(a.b)("li",{parentName:"ul"},"HTTP DNS :客户端控制，隔一段时间主动请求 DNS 获取域名ip，不走系统DNS"),Object(a.b)("li",{parentName:"ul"},"TCP/TLS 连接复用：由服务器升级到 HTTP2，尽量合并域名"),Object(a.b)("li",{parentName:"ul"},"CDN: 可以提高网络传输。另外可以配置多域名并发。"))),Object(a.b)("li",{parentName:"ul"},"减少请求数",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"js,css 打包到 html"),Object(a.b)("li",{parentName:"ul"},"js 控制图片异步加载和懒加载"),Object(a.b)("li",{parentName:"ul"},"小图片 data-uri"),Object(a.b)("li",{parentName:"ul"},"合并请求"))),Object(a.b)("li",{parentName:"ul"},"减少传输体积",Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},"压缩资源 "),Object(a.b)("li",{parentName:"ul"},"gzip，根据请求头",Object(a.b)("inlineCode",{parentName:"li"},"accept-encoding:gzip"),"，服务端进行压缩并返回头",Object(a.b)("inlineCode",{parentName:"li"},"content-encoding:gzip"),"。"),Object(a.b)("li",{parentName:"ul"},"svg/gradient 代替图片"),Object(a.b)("li",{parentName:"ul"},"根据机型和网络控制图片清晰度"),Object(a.b)("li",{parentName:"ul"},"低清晰度图片使用锐化提升体验"),Object(a.b)("li",{parentName:"ul"},"避免设计大型背景图")))),Object(a.b)("h2",{id:"执行"},"执行"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"纯管理"),Object(a.b)("li",{parentName:"ul"},"制度化"),Object(a.b)("li",{parentName:"ul"},"工程化")),Object(a.b)("h2",{id:"结果评估和线上监控"},"结果评估和线上监控"),Object(a.b)("h3",{id:"数据采集-performance-api"},"数据采集 Performance API"),Object(a.b)("p",null,"数据采集主要是靠 Performance API。",Object(a.b)("inlineCode",{parentName:"p"},"performance.timing"),"对象包含页面在各个阶段的时间。可以采集的数据包括："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"TTFB 获取首字节时间：  performance.timing.responseStart - performance.timing.navigationStart"),Object(a.b)("li",{parentName:"ul"},"白屏时间: 用户屏幕开始展示内容的时刻。可以使用开始渲染 body 的时间，减去 performance.timing.navigationStart。对于不支持 performance API 的浏览器，可以在 head 的头部和尾部插入 startTime、endTime 做差计算，")),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"// 支持performance\nvar time = endTime - performance.timing.navigationStart\n// 不支持performance\nvar time = endTime - startTime\n")),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"首屏时间: 首屏内容加载完成时间。可以在首屏元素代码处插入时间 Date.now()，然后减去 performance.timing.navigationStart，不过这种方式代码侵入性太强，而且成本较高，可以简单的使用 domready 代替 Date.now()。如果首屏上有图片，则遍历图片，找到最慢的图片的加载时间作为首屏时间。"),Object(a.b)("li",{parentName:"ul"},"用户可操作时间，即 domready 时间。"),Object(a.b)("li",{parentName:"ul"},"Load: 页面总下载时间，window.onload 时间。还可以包括每个资源的加载时间。"),Object(a.b)("li",{parentName:"ul"},"自定义的时间(开发者关注的)")),Object(a.b)("p",null,Object(a.b)("img",r({parentName:"p"},{src:"/img/performance/1.png",alt:null}))),Object(a.b)("p",null,"具体属性如下："),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的时间。如果没有上一个\b页面，这个值会和 fetchStart 相同。通常我们也\b理解为准备加载新页面的起始时间。"),Object(a.b)("li",{parentName:"ul"},"redirectStart：到当前页面的重定向开始的时间。当重定向的页面来自同一个域时这个属性才会有值，否则值为0。"),Object(a.b)("li",{parentName:"ul"},"redirectEnd：到当前页面的重定向结束的时间。当重定向的页面来自同一个域时这个属性才会有值，否则值为0。"),Object(a.b)("li",{parentName:"ul"},"fetchStart：准备使用HTTP请求(fetch)页面的时间。"),Object(a.b)("li",{parentName:"ul"},"domainLookupStart：域名查询开始的时间。"),Object(a.b)("li",{parentName:"ul"},"domainLookupEnd：域名查询结束的时间。"),Object(a.b)("li",{parentName:"ul"},"connectStart：返回HTTP请求开始向服务器发送的时间,如果使用持久连接（persistent connection），则返回值等同于 fetchStart 的值。"),Object(a.b)("li",{parentName:"ul"},"(secureConnectionStart)：可选特性。如果页面是HTTPS协议，则返回开始SSL握手的那个时间。如果当前网页不要求安全连接，则返回0。"),Object(a.b)("li",{parentName:"ul"},"connectEnd：返回浏览器与服务器之间的连接建立的时间。如果建立的是持久连接，则返回值等同于 fetchStart 属性的值。连接建立指的是所有握手和认证过程全部结束。"),Object(a.b)("li",{parentName:"ul"},"requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的时间。"),Object(a.b)("li",{parentName:"ul"},"responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的时间。"),Object(a.b)("li",{parentName:"ul"},"responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时的时间。"),Object(a.b)("li",{parentName:"ul"},"unloadEventStart：返回同一个域名前一个网页的 unload 事件触发时的时间。否则返回值为0。"),Object(a.b)("li",{parentName:"ul"},"unloadEventEnd：返回同一个域名前一个网页的 unload 事件触发时的时间。否则返回值为0。"),Object(a.b)("li",{parentName:"ul"},"domLoading：返回当前网页 DOM 结构开始解析时（即Document.readyState属性变为 loading、相应的readystatechange事件触发时）的时间"),Object(a.b)("li",{parentName:"ul"},"domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为 interactive 、相应的readystatechange事件触发时）的时间。"),Object(a.b)("li",{parentName:"ul"},"domContentLoadedEventStart：返回当解析器发送 DOMContentLoaded 事件的开始时间"),Object(a.b)("li",{parentName:"ul"},"domContentLoadedEventEnd：返回当文档的 DOMContentLoaded 事件的结束时间。"),Object(a.b)("li",{parentName:"ul"},"domComplete：返回当前文档解析完成，即Document.readyState 变为 complete 且相对应的readystatechange 被触发时的时间。"),Object(a.b)("li",{parentName:"ul"},"loadEventStart：返回该文档下，load 事件被发送时的时间。如果这个事件还未被发送，它的值将会是0。"),Object(a.b)("li",{parentName:"ul"},"loadEventEnd：返回当 load 事件结束，即加载事件完成时的时间。如果这个事件还未被发送，或者尚未完成，它的值将会是0。")),Object(a.b)("p",null,"我们可以根据上面的属性，计算出一些网页性能相关的信息。"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{className:"language-js"}),"var timing = performance.timing\n\n// 页面总耗时\nvar pageLoadTime = timing.loadEventEnd - timing.navigationStart\n\n// DNS 域名解析耗时\nvar dnsTime = timing.domainLookupEnd - timing.domainLookupStart\n\n// tcp 连接耗时\nvar tcpTime = timing.connectEnd - timing.connectStart\n\n// 页面从加载到现在的时间,单位是微秒us，但精度比 Date.now() 高1000倍。\nvar duration = performance.now()  // Date.now() \n")),Object(a.b)("p",null,"performance.getEntriesByType('navigation')"),Object(a.b)("p",null,Object(a.b)("img",r({parentName:"p"},{src:"/img/performance/2.png",alt:null}))),Object(a.b)("p",null,"Performance API 虽然强大，但是它也不能解决一些问题："),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"单页应用页面刷新时的数据统计"),Object(a.b)("li",{parentName:"ol"})),Object(a.b)("h3",{id:"数据展现"},"数据展现"),Object(a.b)("p",null,"页面秒开率，1s 内打开页面的用户占比。"),Object(a.b)("h2",{id:"参考资料"},"参考资料"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"https://time.geekbang.org/column/article/94156"}),"重学前端")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"https://segmentfault.com/a/1190000017092752"}),"前端监控实践——FMP的智能获取算法"))))}o.isMDXComponent=!0},283:function(e,t,n){"use strict";n.d(t,"a",function(){return c}),n.d(t,"b",function(){return u});var a=n(0),r=n.n(a),l=r.a.createContext({}),b=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},c=function(e){var t=b(e.components);return r.a.createElement(l.Provider,{value:t},e.children)};var i="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},o=function(e){var t=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,c=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),i=b(t),o=n,u=i[l+"."+o]||i[o]||p[o]||a;return t?r.a.createElement(u,Object.assign({},c,{components:t})):r.a.createElement(u,c)};function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,b=new Array(l);b[0]=o;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c[i]="string"==typeof e?e:a,b[1]=c;for(var u=2;u<l;u++)b[u]=n[u];return r.a.createElement.apply(null,b)}return r.a.createElement.apply(null,n)}o.displayName="MDXCreateElement"}}]);