(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{289:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",function(){return c}),r.d(n,"rightToc",function(){return i}),r.d(n,"default",function(){return l});r(0);var t=r(301);function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e}).apply(this,arguments)}function a(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)r=a[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c={title:"vuex"},i=[],u={rightToc:i},p="wrapper";function l(e){var n=e.components,r=a(e,["components"]);return Object(t.b)(p,o({},u,r,{components:n,mdxType:"MDXLayout"}))}l.isMDXComponent=!0},301:function(e,n,r){"use strict";r.d(n,"a",function(){return i}),r.d(n,"b",function(){return f});var t=r(0),o=r.n(t),a=o.a.createContext({}),c=function(e){var n=o.a.useContext(a),r=n;return e&&(r="function"==typeof e?e(n):Object.assign({},n,e)),r},i=function(e){var n=c(e.components);return o.a.createElement(a.Provider,{value:n},e.children)};var u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},l=function(e){var n=e.components,r=e.mdxType,t=e.originalType,a=e.parentName,i=function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&-1===n.indexOf(t)&&(r[t]=e[t]);return r}(e,["components","mdxType","originalType","parentName"]),u=c(n),l=r,f=u[a+"."+l]||u[l]||p[l]||t;return n?o.a.createElement(f,Object.assign({},i,{components:n})):o.a.createElement(f,i)};function f(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var a=r.length,c=new Array(a);c[0]=l;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i[u]="string"==typeof e?e:t,c[1]=i;for(var f=2;f<a;f++)c[f]=r[f];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,r)}l.displayName="MDXCreateElement"}}]);