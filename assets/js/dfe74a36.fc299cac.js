"use strict";(self.webpackChunkmy_note=self.webpackChunkmy_note||[]).push([[6955],{9613:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(9496);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),p=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=p(r),f=o,m=d["".concat(i,".").concat(f)]||d[f]||u[f]||a;return r?n.createElement(m,l(l({ref:t},s),{},{components:r})):n.createElement(m,l({ref:t},s))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6428:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>p});var n=r(7579),o=(r(9496),r(9613));const a={},l="\u56fe\u89e3 v8 \u5b66\u4e60\u7b14\u8bb0",c={unversionedId:"c-base/v8",id:"c-base/v8",title:"\u56fe\u89e3 v8 \u5b66\u4e60\u7b14\u8bb0",description:"\u5feb\u6162\u5c5e\u6027",source:"@site/docs/c-base/v8.md",sourceDirName:"c-base",slug:"/c-base/v8",permalink:"/note/docs/c-base/v8",draft:!1,editUrl:"https://github.com/banli17/note/tree/main/docs/docs/c-base/v8.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u51fd\u6570\u5f0f\u7f16\u7a0b",permalink:"/note/docs/c-base/function-program"},next:{title:"Vue",permalink:"/note/docs/category/vue"}},i={},p=[{value:"\u5feb\u6162\u5c5e\u6027",id:"\u5feb\u6162\u5c5e\u6027",level:2}],s={toc:p};function u(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,n.Z)({},s,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"\u56fe\u89e3-v8-\u5b66\u4e60\u7b14\u8bb0"},"\u56fe\u89e3 v8 \u5b66\u4e60\u7b14\u8bb0"),(0,o.kt)("h2",{id:"\u5feb\u6162\u5c5e\u6027"},"\u5feb\u6162\u5c5e\u6027"),(0,o.kt)("p",null,"js \u5bf9\u8c61\u50cf\u4e00\u4e2a\u5b57\u5178\uff0c\u4f46\u662f v8 \u5b9e\u73b0\u5bf9\u8c61\u5b58\u50a8\u5e76\u6ca1\u6709\u5b8c\u5168\u6309\u5b57\u5178\u5b9e\u73b0\u3002\u5b57\u5178\u662f\u975e\u7ebf\u6027\u7ed3\u6784\uff0c\u67e5\u627e\u901f\u5ea6\u6bd4\u7ebf\u6027\u7ed3\u6784\u6162\u3002"),(0,o.kt)("p",null,"\u5b83\u6709\u4e24\u7c7b\u5c5e\u6027\uff0celements \u6392\u5e8f\u5c5e\u6027, properties \u5e38\u89c4\u5c5e\u6027\u3002"),(0,o.kt)("p",null,"\u4e8b\u5b9e\u4e0a\uff0c\u8fd9\u662f\u4e3a\u4e86\u6ee1\u8db3 ECMA \u89c4\u8303 \u8981\u6c42\u6240\u8fdb\u884c\u7684\u8bbe\u8ba1\u3002\u6309\u7167\u89c4\u8303\u4e2d\u7684\u63cf\u8ff0\uff0c\u53ef\u7d22\u5f15\u7684\u5c5e\u6027\u5e94\u8be5\u6309\u7167\u7d22\u5f15\u503c\u5927\u5c0f\u5347\u5e8f\u6392\u5217\uff0c\u800c\u547d\u540d\u5c5e\u6027\u6839\u636e\u521b\u5efa\u7684\u987a\u5e8f\u5347\u5e8f\u6392\u5217\u3002"),(0,o.kt)("p",null,"\u5b58\u50a8\u5728\u7ebf\u6027\u7ed3\u6784\u91cc\u7684\u5c5e\u6027\u53eb\u5feb\u5c5e\u6027\uff0c\u975e\u7ebf\u6027\u7ed3\u6784\u91cc\u7684\u5c5e\u6027\u53eb\u6162\u5c5e\u6027\u3002"),(0,o.kt)("p",null,"\u6570\u5b57\u7c7b\u578b\u5c5e\u6027\u4f1a\u6392\u5e8f\u653e\u5728 elements \u91cc\uff0c\u662f\u7ebf\u6027\u5b58\u50a8\uff0c\u67e5\u627e\u5feb\uff0c\u6dfb\u52a0\u5220\u9664\u6162\u3002\u5b57\u7b26\u4e32\u5c5e\u6027\u6309\u7167\u6dfb\u52a0\u987a\u5e8f\u653e\u5728 properties \u91cc\uff0c\u662f\u5b57\u5178\u5b58\u50a8\uff0c\u5b83\u867d\u7136\u964d\u4f4e\u4e86\u67e5\u627e\u901f\u5ea6\uff0c\u4f46\u662f\u63d0\u9ad8\u4e86\u589e\u5220\u901f\u5ea6\u3002"),(0,o.kt)("p",null,"\u8fd9\u6837\u6bcf\u6b21\u4f1a\u591a\u8bbf\u95ee\u4e00\u5c42 elements \u6216 properties\uff0c\u4e3a\u4e86\u63d0\u9ad8\u8bbf\u95ee\u901f\u5ea6\uff0cv8 \u4f1a\u5c06\u524d n \u4e2a\u5c5e\u6027\u76f4\u63a5\u4f5c\u4e3a\u5bf9\u8c61\u5185\u5c5e\u6027\u5b58\u50a8\u3002\u5982\u679c\u6ca1\u6709\u591a\u4f59\u5c5e\u6027\uff0c\u5c31\u4e0d\u4f1a\u751f\u6210 properties \u5c5e\u6027,\u5bf9\u8c61\u5185\u5c5e\u6027\u6570\u91cf\u53d6\u51b3\u4e8e\u521d\u59cb\u5bf9\u8c61\u5927\u5c0f\u3002"),(0,o.kt)("p",null,(0,o.kt)("img",{src:r(3086).Z,width:"1142",height:"490"})),(0,o.kt)("p",null,(0,o.kt)("img",{src:r(1723).Z,width:"1142",height:"876"})),(0,o.kt)("p",null,"\u5b9e\u8df5: \u7ed9\u4e00\u4e2a\u5bf9\u8c61\u6dfb\u52a0\u6570\u5b57\u5c5e\u6027\u548c\u5e38\u89c4\u5c5e\u6027\uff0c\u67e5\u770b chrome \u6d4f\u89c8\u5668\u4e2d\u5e38\u89c4\u5c5e\u6027\u5c11\u4e8e 10 \u4e2a\uff0c\u591a\u4f59 10 \u4e2a\u65f6\u7684\u5185\u5b58\u56fe\u3002"),(0,o.kt)("p",null,"\u4e3a\u4ec0\u4e48\u4e0d\u63a8\u8350 delete \u5c5e\u6027\uff1f\n\u5220\u9664\u540e\u53ef\u80fd\u5bfc\u81f4\u91cd\u65b0\u751f\u6210\u5185\u90e8\u5c5e\u6027"),(0,o.kt)("p",null,"Just do:"),(0,o.kt)("p",null,"user.password = undefined;\ninstead of:"),(0,o.kt)("p",null,"delete user.password;"))}u.isMDXComponent=!0},3086:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/2022-10-23-17-00-40-8b9fdeeed26aa361504afbdd347be0f9.png"},1723:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/2022-10-23-17-00-44-2267d84a54ae1b60020f382da5448f5e.png"}}]);