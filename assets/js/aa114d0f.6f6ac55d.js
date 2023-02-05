"use strict";(self.webpackChunkmy_note=self.webpackChunkmy_note||[]).push([[5042],{9613:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(9496);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,i=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,k=d["".concat(i,".").concat(m)]||d[m]||p[m]||l;return n?a.createElement(k,o(o({ref:t},u),{},{components:n})):a.createElement(k,o({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<l;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8237:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var a=n(7579),r=(n(9496),n(9613));const l={title:"\u89c2\u5bdf\u8005\u6a21\u5f0f"},o="\u89c2\u5bdf\u8005\u6a21\u5f0f",s={unversionedId:"c-pattern/observer",id:"c-pattern/observer",title:"\u89c2\u5bdf\u8005\u6a21\u5f0f",description:"\u6709\u4e9b\u4eba\u7ecf\u5e38\u5c06\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u548c\u89c2\u5bdf\u8005\u6a21\u5f0f\u5f04\u6df7\u6dc6\uff0c\u5b9e\u9645\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u662f\u89c2\u5bdf\u8005\u6a21\u5f0f\u884d\u751f\u51fa\u6765\u7684\u4ea7\u7269\uff0c\u5b83\u4eec\u662f\u6709\u533a\u522b\u7684\u3002",source:"@site/docs/c-pattern/observer.md",sourceDirName:"c-pattern",slug:"/c-pattern/observer",permalink:"/note/docs/c-pattern/observer",draft:!1,editUrl:"https://github.com/banli17/note/blob/main/docs/c-pattern/observer.md",tags:[],version:"current",frontMatter:{title:"\u89c2\u5bdf\u8005\u6a21\u5f0f"},sidebar:"tutorialSidebar",previous:{title:"\u5907\u5fd8\u5f55\u6a21\u5f0f",permalink:"/note/docs/c-pattern/mementos"},next:{title:"\u6570\u636e\u7ed3\u6784\u4e0e\u7b97\u6cd5",permalink:"/note/docs/category/\u6570\u636e\u7ed3\u6784\u4e0e\u7b97\u6cd5"}},i={},c=[{value:"\u89c2\u5bdf\u8005\u6a21\u5f0f",id:"\u89c2\u5bdf\u8005\u6a21\u5f0f-1",level:2},{value:"\u7b80\u4ecb",id:"\u7b80\u4ecb",level:3},{value:"\u5e94\u7528\u573a\u666f",id:"\u5e94\u7528\u573a\u666f",level:3},{value:"\u4f18\u7f3a\u70b9",id:"\u4f18\u7f3a\u70b9",level:3},{value:"\u4ee3\u7801\u5b9e\u73b0",id:"\u4ee3\u7801\u5b9e\u73b0",level:3},{value:"\u793a\u4f8b-stream",id:"\u793a\u4f8b-stream",level:3},{value:"\u793a\u4f8b-readline",id:"\u793a\u4f8b-readline",level:3},{value:"\u793a\u4f8b-MutationObserve",id:"\u793a\u4f8b-mutationobserve",level:3},{value:"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f",id:"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f",level:2},{value:"\u7b80\u4ecb",id:"\u7b80\u4ecb-1",level:3},{value:"\u4ee3\u7801\u5b9e\u73b0",id:"\u4ee3\u7801\u5b9e\u73b0-1",level:3},{value:"\u89c2\u5bdf\u8005\u6a21\u5f0f\u548c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u7684\u533a\u522b",id:"\u89c2\u5bdf\u8005\u6a21\u5f0f\u548c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u7684\u533a\u522b",level:2},{value:"\u5e94\u7528\u573a\u666f\u5b9e\u4f8b",id:"\u5e94\u7528\u573a\u666f\u5b9e\u4f8b",level:2},{value:"\u793a\u4f8b-\u81ea\u5b9a\u4e49\u4e8b\u4ef6",id:"\u793a\u4f8b-\u81ea\u5b9a\u4e49\u4e8b\u4ef6",level:3},{value:"\u793a\u4f8b-iframe postMesage",id:"\u793a\u4f8b-iframe-postmesage",level:2},{value:"\u53c2\u8003\u8d44\u6599",id:"\u53c2\u8003\u8d44\u6599",level:2}],u={toc:c};function p(e){let{components:t,...l}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u89c2\u5bdf\u8005\u6a21\u5f0f"},"\u89c2\u5bdf\u8005\u6a21\u5f0f"),(0,r.kt)("p",null,"\u6709\u4e9b\u4eba\u7ecf\u5e38\u5c06\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u548c\u89c2\u5bdf\u8005\u6a21\u5f0f\u5f04\u6df7\u6dc6\uff0c\u5b9e\u9645\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u662f\u89c2\u5bdf\u8005\u6a21\u5f0f\u884d\u751f\u51fa\u6765\u7684\u4ea7\u7269\uff0c\u5b83\u4eec\u662f\u6709\u533a\u522b\u7684\u3002"),(0,r.kt)("h2",{id:"\u89c2\u5bdf\u8005\u6a21\u5f0f-1"},"\u89c2\u5bdf\u8005\u6a21\u5f0f"),(0,r.kt)("h3",{id:"\u7b80\u4ecb"},"\u7b80\u4ecb"),(0,r.kt)("p",null,"\u89c2\u5bdf\u8005\u6a21\u5f0f\u662f\u8f6f\u4ef6\u8bbe\u8ba1\u6a21\u5f0f\u7684\u4e00\u79cd\u3002\u5728\u6b64\u79cd\u6a21\u5f0f\u4e2d\uff0c\u4e00\u4e2a\u76ee\u6807\u7269\u4ef6\u7ba1\u7406\u6240\u6709\u76f8\u4f9d\u4e8e\u5b83\u7684\u89c2\u5bdf\u8005\u7269\u4ef6\uff0c\u5e76\u4e14\u5728\u5b83\u672c\u8eab\u7684\u72b6\u6001\u6539\u53d8\u65f6\u4e3b\u52a8\u53d1\u51fa\u901a\u77e5\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(1066).Z,width:"832",height:"214"})),(0,r.kt)("p",null,"\u88ab\u89c2\u5bdf\u76ee\u6807\u7ba1\u7406\u591a\u4e2a\u89c2\u5bdf\u8005\uff0c\u5f53\u5185\u90e8\u72b6\u6001\u53d8\u5316\u65f6\uff0c\u901a\u8fc7 notify() \u65b9\u6cd5\u901a\u77e5\u89c2\u5bdf\u8005(\u8c03\u7528\u89c2\u5bdf\u8005\u7684 update() \u65b9\u6cd5)\u3002\u89c2\u5bdf\u8005\u548c\u88ab\u89c2\u5bdf\u8005\u662f\u7d27\u8026\u5408\u7684\u3002"),(0,r.kt)("admonition",{title:"\u4e3a\u4ec0\u4e48\u8981\u4f7f\u7528\u89c2\u5bdf\u8005\u6a21\u5f0f?",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"\u964d\u4f4e\u8026\u5408\uff1a\u964d\u4f4e\u4e86\u76ee\u6807\u4e0e\u89c2\u5bdf\u8005\u4e4b\u95f4\u7684\u8026\u5408\u5173\u7cfb\uff0c\u4e24\u8005\u4e4b\u95f4\u662f\u62bd\u8c61\u8026\u5408\u5173\u7cfb\u3002\u7b26\u5408\u4f9d\u8d56\u5012\u7f6e\u539f\u5219\uff1b ",(0,r.kt)("br",null),"\n\u5373\u65f6\u89e6\u8fbe\uff1a\u5728\u76ee\u6807\u4e0e\u89c2\u5bdf\u8005\u4e4b\u95f4\u5efa\u7acb\u4e86\u4e00\u5957\u89e6\u53d1\u673a\u5236\uff0c\u5f53\u76ee\u6807\u72b6\u6001\u6539\u53d8\u65f6\uff0c\u53ef\u4ee5\u5373\u65f6\u7684\u89e6\u53d1\uff1b")),(0,r.kt)("h3",{id:"\u5e94\u7528\u573a\u666f"},"\u5e94\u7528\u573a\u666f"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"nodejs \u4e2d\uff1a\u5904\u7406 http \u8bf7\u6c42(http.createServer \u56de\u8c03)\uff0c\u591a\u8fdb\u7a0b\u901a\u8baf"),(0,r.kt)("li",{parentName:"ul"},"MutationObserve()"),(0,r.kt)("li",{parentName:"ul"},"DOM \u4e8b\u4ef6"),(0,r.kt)("li",{parentName:"ul"},"\u56fe\u7247\u52a0\u8f7d onload \u7b49"),(0,r.kt)("li",{parentName:"ul"},"Vue \u751f\u547d\u5468\u671f"),(0,r.kt)("li",{parentName:"ul"},"Vue Watch")),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(2534).Z,width:"992",height:"578"})),(0,r.kt)("h3",{id:"\u4f18\u7f3a\u70b9"},"\u4f18\u7f3a\u70b9"),(0,r.kt)("p",null,"\u89c2\u5bdf\u8005\u6a21\u5f0f\u7684\u4e3b\u8981\u7684\u4f5c\u7528\u5c31\u662f\u5bf9\u5bf9\u8c61\u89e3\u8026\uff0c\u5c06\u89c2\u5bdf\u8005\u548c\u88ab\u89c2\u5bdf\u8005\u5b8c\u5168\u9694\u79bb\u3002"),(0,r.kt)("p",null,"\u7a0b\u5e8f\u4e2d\u5305\u62ec\u4e00\u4e2a\u88ab\u89c2\u5bdf\u8005\u548c\u591a\u4e2a\u88ab\u89c2\u5bdf\u8005\uff0c\u5f00\u53d1\u548c\u8c03\u8bd5\u6bd4\u8f83\u590d\u6742\u3002\u4e00\u4e2a\u89c2\u5bdf\u8005\u7684\u5361\u987f\u4f1a\u5f71\u54cd\u6574\u4f53\u7684\u6267\u884c\u6548\u7387\u3002\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u4e00\u822c\u8003\u8651\u91c7\u7528\u5f02\u6b65\u7684\u65b9\u5f0f\u3002"),(0,r.kt)("h3",{id:"\u4ee3\u7801\u5b9e\u73b0"},"\u4ee3\u7801\u5b9e\u73b0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'class Subject {\n  constructor() {\n    this.observers = [];\n    this.state = 0;\n  }\n\n  getState() {\n    return this.state;\n  }\n\n  setState(newState) {\n    this.state = newState;\n    this.notify();\n  }\n\n  // \u6dfb\u52a0\u89c2\u5bdf\u8005\n  attach(observer) {\n    this.observers.push(observer);\n  }\n\n  // \u64a4\u9500\u89c2\u5bdf\n  detach(observer) {}\n\n  // \u901a\u77e5\u89c2\u5bdf\u8005\n  notify() {\n    this.observers.forEach((observer) => observer.update(this.state));\n  }\n}\n\nclass Observer {\n  constructor(name) {\n    this.name = name;\n  }\n  update(state) {\n    console.log(`${this.name} updated, state is ${state}`);\n  }\n}\n\nconst o1 = new Observer("o1");\nconst o2 = new Observer("o2");\nconst s = new Subject();\ns.attach(o1);\ns.attach(o2);\ns.setState(3);\n')),(0,r.kt)("p",null,"\u6253\u5370\u7ed3\u679c\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sh"},"o1 updated, state is 3\no2 updated, state is 3\n")),(0,r.kt)("h3",{id:"\u793a\u4f8b-stream"},"\u793a\u4f8b-stream"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const fs = require("fs");\nconst readStream = fs.createReadStream("./1.txt");\nlet length = 0;\nreadStream.on("data", function (chunk) {\n  length += chunk.toString().length;\n});\nreadStream.on("end", function () {\n  console.log(length);\n});\n')),(0,r.kt)("h3",{id:"\u793a\u4f8b-readline"},"\u793a\u4f8b-readline"),(0,r.kt)("p",null,"readline \u53ef\u4ee5\u4e00\u884c\u884c\u7684\u8bfb\u6587\u4ef6\u5185\u5bb9\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// 4\u3001\nconst readline = require("readline");\nconst rl = readline.createInterface({\n  input: process.stdin,\n  output: process.stdout,\n});\nrl.on("line", (input) => {\n  // \u5728\u56de\u8f66 \\n \\r \\r\\n \u65f6\u89e6\u53d1\n  console.log(`Received: ${input}`);\n});\nrl.on("close", () => {\n  console.log(`Readline closed.`);\n});\n')),(0,r.kt)("h3",{id:"\u793a\u4f8b-mutationobserve"},"\u793a\u4f8b-MutationObserve"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const el = document.querySelector(".container");\nconst callback = (mutationList, observer) => {\n  console.log("record", mutationList);\n};\n\nconst mutationObserve = new MutationObserver(callback);\n\n// childList\u3001attributes \u548c characterData \u4e2d\uff0c\u5fc5\u987b\u6709\u4e00\u4e2a\u53c2\u6570\u4e3a true\u3002\u5426\u5219\u4f1a\u629b\u51fa TypeError \u5f02\u5e38\nmutationObserve.observe(el, {\n  attributes: true, // \u89c2\u5bdf\u6240\u6709\u76d1\u542c\u8282\u70b9\u5c5e\u6027\u503c\u7684\u53d8\u5316\n  // attributeFilter: [], // \u54ea\u4e9b\u5c5e\u6027\u540d\u4f1a\u88ab\u76d1\u542c\n  // attributeOldValue: true, // \u8bb0\u5f55\u4e0a\u4e00\u6b21\u88ab\u76d1\u542c\u7684\u8282\u70b9\u7684\u5c5e\u6027\u53d8\u5316\n  childList: true, // \u76d1\u542c target \u8282\u70b9\u4e2d\u53d1\u751f\u7684\u8282\u70b9\u7684\u65b0\u589e\u548c\u5220\u9664\n  characterData: true, // \u6587\u672c\u5185\u5bb9\n  characterDataOldValue: true, // \u8bb0\u5f55\u4e0a\u4e00\u4e2a\u88ab\u76d1\u542c\u8282\u70b9\u4e2d\u53d1\u751f\u7684\u6587\u672c\u53d8\u5316\n  subtree: true, // \u5c06\u76d1\u542c el \u4e3a\u6839\u8282\u70b9\u7684\u6574\u4e2a\u5b50\u6811\n});\n')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"characterDataOldValue")),(0,r.kt)("p",null,"characterDataOldValue \u4e3a true \u65f6\uff0ccharacterData \u9ed8\u8ba4\u4e3a true\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(2329).Z,width:"604",height:"496"})),(0,r.kt)("h2",{id:"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f"},"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f"),(0,r.kt)("h3",{id:"\u7b80\u4ecb-1"},"\u7b80\u4ecb"),(0,r.kt)("p",null,"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u4e0d\u662f\u4f20\u7edf\u7684 23 \u79cd\u8bbe\u8ba1\u6a21\u5f0f\u4e4b\u4e00\uff0c\u5b83\u662f\u4e00\u79cd\u6d88\u606f\u8303\u5f0f\uff0c\u6d88\u606f\u53d1\u5e03\u8005\u548c\u8ba2\u9605\u8005\u662f\u89e3\u8026\u65e0\u5173\u7684\uff0c\u5b83\u4eec\u4e4b\u95f4\u901a\u8fc7\u6d88\u606f\u4e2d\u5fc3\u6765\u7ba1\u7406\u3002\u6d88\u606f\u53ef\u4ee5\u5206\u4e3a\u591a\u4e2a\u7c7b\u522b\uff0c\u4e0d\u5173\u6ce8\u8ba2\u9605\u8005\u3002\u8ba2\u9605\u8005\u53ef\u4ee5\u8ba2\u9605\u4e00\u4e2a\u6216\u591a\u4e2a\u7c7b\u522b\u611f\u5174\u8da3\u7684\u6d88\u606f\uff0c\u4e5f\u4e0d\u5173\u5fc3\u53d1\u5e03\u8005\u3002(\u5b83\u5b9e\u9645\u662f\u53bb\u9664\u4e86\u53d1\u5e03\u8005\u548c\u8ba2\u9605\u8005\uff0c\u53ea\u5173\u6ce8\u6d88\u606f\u7684\u53d1\u5e03\u548c\u8ba2\u9605)\u3002"),(0,r.kt)("h3",{id:"\u4ee3\u7801\u5b9e\u73b0-1"},"\u4ee3\u7801\u5b9e\u73b0"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'function Event() {\n  this.callbacks = [];\n}\n\nEvent.prototype.on = function (fn) {\n  this.callbacks.push(fn);\n};\n\nEvent.prototype.emit = function () {\n  this.callbacks.forEach((callback) => {\n    callback.apply(this, arguments);\n  });\n};\n\nvar e = new Event();\ne.on(function (a) {\n  console.log(1, a);\n});\ne.on(function (a, b) {\n  console.log(2, a, b);\n});\ne.emit("hi", "zhangsan");\n')),(0,r.kt)("p",null,"\u6253\u5370\u7ed3\u679c\u5982\u4e0b\uff1a"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"1 'hi'\n2 'hi' 'zhangsan'\n")),(0,r.kt)("h2",{id:"\u89c2\u5bdf\u8005\u6a21\u5f0f\u548c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u7684\u533a\u522b"},"\u89c2\u5bdf\u8005\u6a21\u5f0f\u548c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u7684\u533a\u522b"),(0,r.kt)("p",null,"\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u662f\u6700\u5e38\u7528\u7684\u4e00\u79cd\u89c2\u5bdf\u8005\u6a21\u5f0f\u7684\u5b9e\u73b0\u3002\u89c2\u5bdf\u8005\u6a21\u5f0f\u662f\u8026\u5408\u7684\uff0c\u5b83\u5f3a\u8c03\u76ee\u6807\u548c\u89c2\u5bdf\u8005\uff0c\u5f53\u76ee\u6807\u53d8\u5316\u901a\u77e5\u89c2\u5bdf\u8005\u3002\u4f46\u662f\u5927\u591a\u6570\u573a\u666f\u4e2d\u6211\u4eec\u5e76\u4e0d\u5173\u5fc3\u76ee\u6807\u548c\u89c2\u5bdf\u8005\uff0c\u800c\u662f\u53ea\u5173\u5fc3\u76ee\u6807\u7684\u53d8\u5316\u3002\u6240\u4ee5\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u53ea\u901a\u8fc7\u6d88\u606f\u4e2d\u5fc3\u6765\u8c03\u5ea6\uff0c\u5b83\u53bb\u9664\u4e86\u53d1\u5e03\u8005\u548c\u8ba2\u9605\u8005(\u89e3\u8026)\uff0c\u53ea\u7ba1\u6d88\u606f\u7684\u8ba2\u9605\u548c\u53d1\u5e03\u3002"),(0,r.kt)("p",null,"\u4f18\u7f3a\u70b9\u4e5f\u5f88\u660e\u663e\uff0c\u7d27\u5bc6\u8026\u5408\u7684\u65b9\u5f0f\u7b80\u5355\u76f4\u63a5\uff0c\u6269\u5c55\u6027\u5dee\uff0c\u800c\u4e14\u8981\u6c42\u4e24\u7aef\u540c\u65f6\u5b58\u5728\u3002\u677e\u6563\u8026\u5408\u4e0d\u76f4\u63a5\u4ea7\u751f\u4f9d\u8d56\uff0c\u66f4\u5bb9\u6613\u6269\u5c55\uff0c\u60f3\u5728\u54ea\u91cc\u7528\u5c31\u5728\u54ea\u91cc\u7528\uff0c\u4f46\u662f\u4ee3\u7801\u5206\u6563\uff0c\u4e0d\u77e5\u9053\u5728\u54ea\u8ba2\u9605\u4e86\u6d88\u606f\u3002"),(0,r.kt)("p",null,"\u89c2\u5bdf\u8005\u6a21\u5f0f\u4e0b\uff0c\u53ea\u80fd\u53bb\u89c2\u5bdf\u67d0\u4e2a\u76ee\u6807\uff0c\u800c\u4e0d\u80fd\u4e3b\u52a8\u53bb\u89e6\u53d1\u4e8b\u4ef6\uff0c\u800c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u4e0b\uff0c\u53ef\u4ee5\u4e3b\u52a8\u89e6\u53d1\u3002"),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(2046).Z,width:"1040",height:"610"})),(0,r.kt)("admonition",{title:"\u5982\u4f55\u5224\u65ad\u89c2\u5bdf\u8005\u6a21\u5f0f\u548c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f?",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"\u770b\u662f\u5426\u9700\u8981\u624b\u52a8\u89e6\u53d1 emit")),(0,r.kt)("h2",{id:"\u5e94\u7528\u573a\u666f\u5b9e\u4f8b"},"\u5e94\u7528\u573a\u666f\u5b9e\u4f8b"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"\u7f51\u9875\u4e8b\u4ef6\u7ed1\u5b9a\uff1a\u70b9\u51fb\u6309\u94ae\u7684\u65f6\u5019\u89e6\u53d1\u7ed1\u5b9a\u7684\u4e8b\u4ef6"),(0,r.kt)("li",{parentName:"ul"},"Promise")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"result\n  .then(() => {\n    // then\u8fd9\u91cc\u662f\u7ed1\u5b9a\uff0c\u7b49\u5230promise pending\u72b6\u6001\u53d8\u5316\u65f6\u89e6\u53d1\n  })\n  .then();\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"jQuery callbacks")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'var callbacks = $.Callbacks();\ncallbacks.add(function (info) {\n  console.log(info);\n}); // fire\ncallbacks.fire("fire");\n')),(0,r.kt)("h3",{id:"\u793a\u4f8b-\u81ea\u5b9a\u4e49\u4e8b\u4ef6"},"\u793a\u4f8b-\u81ea\u5b9a\u4e49\u4e8b\u4ef6"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'const EventEmitter = require("events").EventEmitter;\nconst emitter = new EventEmitter();\nemitter.on("end", function () {\n  console.log("hi");\n});\nemitter.emit("end");\n\nclass Person extends EventEmitter {}\nlet p = new Person();\np.on("talk", () => {\n  console.log("talk");\n});\np.emit("talk");\n')),(0,r.kt)("h2",{id:"\u793a\u4f8b-iframe-postmesage"},"\u793a\u4f8b-iframe postMesage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// parent.html\nwindow.addEventListener("message", (e) => {\n  console.log(e.data);\n});\nwindow.iframe.contentWindow.postMessage("hello", "*");\n\n// child.html\nwindow.parent.postMessage("data", "*");\n')),(0,r.kt)("h2",{id:"\u53c2\u8003\u8d44\u6599"},"\u53c2\u8003\u8d44\u6599"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"http://www.cnblogs.com/lovesong/p/5272752.html"},"\u8bbe\u8ba1\u6a21\u5f0f\uff08\u4e09\uff09\uff1a\u89c2\u5bdf\u8005\u6a21\u5f0f\u4e0e\u53d1\u5e03/\u8ba2\u9605\u6a21\u5f0f\u533a\u522b")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.zhihu.com/question/23486749"},"\u89c2\u5bdf\u8005\u6a21\u5f0f\u548c\u53d1\u5e03\u8ba2\u9605\u6a21\u5f0f\u6709\u4ec0\u4e48\u4e0d\u540c\uff1f"))))}p.isMDXComponent=!0},1066:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/2022-10-30-15-50-09-b3bdfe3e224fb751e415b7bb3324ec20.png"},2534:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/2022-10-30-16-24-53-df4589103b4508fe96b6cc61acb773f5.png"},2329:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/2022-10-30-22-13-15-c9588b943350aae8fe04a234d941dd6e.png"},2046:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/2022-10-30-22-16-34-e23d821ed8a1cc2c8d4d4fb28b85c105.png"}}]);