(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{125:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",function(){return c}),t.d(n,"rightToc",function(){return i}),t.d(n,"default",function(){return u});t(0);var r=t(283);function a(){return(a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c={title:"javascript 享元模式",sidebar_label:"享元模式"},i=[],l={rightToc:i},p="wrapper";function u(e){var n=e.components,t=o(e,["components"]);return Object(r.b)(p,a({},l,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"书籍《javascript设计模式与开发实践》 ",Object(r.b)("a",a({parentName:"li"},{href:"https://www.cnblogs.com/xiaohuochai/p/8039957.html"}),"网文"))),Object(r.b)("p",null,"享元模式就是将大量重复的对象根据内部状态抽象成少量的对象，从而解决大量重复对象产生的性能问题。"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"共享内存，主要考虑内存，而不是效率。"),Object(r.b)("li",{parentName:"ul"},"相同的数据，共享使用。")),Object(r.b)("p",null,"js中使用场景很少，因为浏览器端基本不需要考虑内存问题。"))}u.isMDXComponent=!0},283:function(e,n,t){"use strict";t.d(n,"a",function(){return i}),t.d(n,"b",function(){return f});var r=t(0),a=t.n(r),o=a.a.createContext({}),c=function(e){var n=a.a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},i=function(e){var n=c(e.components);return a.a.createElement(o.Provider,{value:n},e.children)};var l="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},u=function(e){var n=e.components,t=e.mdxType,r=e.originalType,o=e.parentName,i=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===n.indexOf(r)&&(t[r]=e[r]);return t}(e,["components","mdxType","originalType","parentName"]),l=c(n),u=t,f=l[o+"."+u]||l[u]||p[u]||r;return n?a.a.createElement(f,Object.assign({},i,{components:n})):a.a.createElement(f,i)};function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=u;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[l]="string"==typeof e?e:r,c[1]=i;for(var f=2;f<o;f++)c[f]=t[f];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);