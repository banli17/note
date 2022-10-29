"use strict";(self.webpackChunkmy_note=self.webpackChunkmy_note||[]).push([[1569],{9613:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>f});var r=t(9496);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),p=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},s=function(e){var n=p(e.components);return r.createElement(i.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=p(t),f=o,m=d["".concat(i,".").concat(f)]||d[f]||u[f]||a;return t?r.createElement(m,c(c({ref:n},s),{},{components:t})):r.createElement(m,c({ref:n},s))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,c=new Array(a);c[0]=d;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,c[1]=l;for(var p=2;p<a;p++)c[p]=t[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6494:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var r=t(7579),o=(t(9496),t(9613));const a={},c="acorn",l={unversionedId:"c-eng/acorn",id:"c-eng/acorn",title:"acorn",description:"https://github.com/acornjs/acorn",source:"@site/docs/c-eng/acorn.md",sourceDirName:"c-eng",slug:"/c-eng/acorn",permalink:"/note/docs/c-eng/acorn",draft:!1,editUrl:"https://github.com/banli17/note/tree/main/docs/docs/c-eng/acorn.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6d4b\u8bd5\u57fa\u7840\u4e0e jest \u6846\u67b6",permalink:"/note/docs/c-eng/test"},next:{title:"Babel \u63d2\u4ef6\u624b\u518c",permalink:"/note/docs/c-eng/babel/plugin"}},i={},p=[{value:"\u5f00\u59cb",id:"\u5f00\u59cb",level:2}],s={toc:p};function u(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"acorn"},"acorn"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("a",{parentName:"p",href:"https://github.com/acornjs/acorn"},"https://github.com/acornjs/acorn"))),(0,o.kt)("h2",{id:"\u5f00\u59cb"},"\u5f00\u59cb"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"astexplorer \u53ef\u4ee5\u628a\u4ee3\u7801\u8f6c\u6210\u8bed\u6cd5\u6811"),(0,o.kt)("li",{parentName:"ul"},"acorn \u89e3\u6790\u7ed3\u679c\u7b26\u5408 The Estree Spec \u89c4\u8303")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'import { Parser } from "acorn";\n\nconst sourceCode = \'import $ from "jquery"\';\n\nconst ast = Parser.parse(sourceCode, {\n  sourceType: "module",\n  ecmaVersion: 8,\n});\n\nlet indent = 0;\nconst padding = () => " ".repeat(indent);\nast.body.forEach((statement) => {\n  walk(statement, {\n    enter(node) {\n      if (node.type) {\n        console.log(padding() + node.type + "\u8fdb\u5165");\n        indent += 2;\n      }\n    },\n    leave(node) {\n      if (node.type) {\n        indent -= 2;\n        console.log(padding() + node.type + "\u79bb\u5f00");\n      }\n    },\n  });\n});\n\nfunction walk(astNode, { enter, leave }) {\n  visit(astNode, null, enter, leave);\n}\n\nfunction visit(node, parent, enter, leave) {\n  if (enter) {\n    enter.call(null, node, parent);\n  }\n  let keys = Object.keys(node).filter((k) => typeof node[k] === "object");\n  keys.forEach((key) => {\n    const value = node[key];\n    if (Array.isArray(value)) {\n      value.forEach((n) => {\n        visit(n, node, enter, leave);\n      });\n    } else if (value && value.type) {\n      visit(node[key], node, enter, leave);\n    }\n  });\n  if (leave) {\n    leave.call(null, node, parent);\n  }\n}\n')),(0,o.kt)("p",null,"astexplore \u7ed3\u679c\u5982\u4e0b"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "type": "Program",\n  "start": 0,\n  "end": 22,\n  "body": [\n    {\n      "type": "ImportDeclaration",\n      "start": 0,\n      "end": 22,\n      "specifiers": [\n        {\n          "type": "ImportDefaultSpecifier",\n          "start": 7,\n          "end": 8,\n          "local": {\n            "type": "Identifier",\n            "start": 7,\n            "end": 8,\n            "name": "$"\n          }\n        }\n      ],\n      "source": {\n        "type": "Literal",\n        "start": 14,\n        "end": 22,\n        "value": "jquery",\n        "raw": "\\"jquery\\""\n      }\n    }\n  ],\n  "sourceType": "module"\n}\n')),(0,o.kt)("p",null,"\u6700\u540e\u6253\u5370\u7ed3\u679c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"ImportDeclaration\u8fdb\u5165\n  ImportDefaultSpecifier\u8fdb\u5165\n    Identifier\u8fdb\u5165\n    Identifier\u79bb\u5f00\n  ImportDefaultSpecifier\u79bb\u5f00\n  Literal\u8fdb\u5165\n  Literal\u79bb\u5f00\nImportDeclaration\u79bb\u5f00\n")))}u.isMDXComponent=!0}}]);