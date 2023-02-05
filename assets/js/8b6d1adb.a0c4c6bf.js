"use strict";(self.webpackChunkmy_note=self.webpackChunkmy_note||[]).push([[2905],{9613:(e,t,n)=>{n.d(t,{Zo:()=>i,kt:()=>g});var r=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},i=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,u=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),f=c(n),g=o,m=f["".concat(u,".").concat(g)]||f[g]||s[g]||l;return n?r.createElement(m,a(a({ref:t},i),{},{components:n})):r.createElement(m,a({ref:t},i))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,a=new Array(l);a[0]=f;var p={};for(var u in t)hasOwnProperty.call(t,u)&&(p[u]=t[u]);p.originalType=e,p.mdxType="string"==typeof e?e:o,a[1]=p;for(var c=2;c<l;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},1292:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>s,frontMatter:()=>l,metadata:()=>p,toc:()=>c});var r=n(7579),o=(n(9496),n(9613));const l={},a="rollup",p={unversionedId:"c-eng/rollup",id:"c-eng/rollup",title:"rollup",description:"js API",source:"@site/docs/c-eng/rollup.md",sourceDirName:"c-eng",slug:"/c-eng/rollup",permalink:"/note/docs/c-eng/rollup",draft:!1,editUrl:"https://github.com/banli17/note/blob/main/docs/c-eng/rollup.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Git",permalink:"/note/docs/c-eng/git"},next:{title:"v",permalink:"/note/docs/c-eng/webpack/v"}},u={},c=[{value:"js API",id:"js-api",level:2}],i={toc:c};function s(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},i,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"rollup"},"rollup"),(0,o.kt)("h2",{id:"js-api"},"js API"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://rollupjs.org/guide/en/#javascript-api"},"https://rollupjs.org/guide/en/#javascript-api")),(0,o.kt)("p",null,"rollup \u63d0\u4f9b\u4e86\u4e24\u4e2a\u65b9\u6cd5 rollup \u548c watch\u3002"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"rollup")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const bundle = await rollup(inputConfig);\nawait bundle.generate(outputConfig); // \u8f93\u51fa\u5230\u5185\u5b58\nawait bundle.write(outputConfig); // \u8f93\u51fa\u5230\u6587\u4ef6\n\nbundle.close();\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"watch")),(0,o.kt)("p",null,"watch(rollupConfig), \u8fd9\u4e2a rollupConfig \u662f inputConfig \u548c outputConfig \u7684\u5408\u5e76\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'watcher.on("event", (event) => {\n  if (event.result) {\n    event.result.close();\n  }\n});\n')))}s.isMDXComponent=!0}}]);