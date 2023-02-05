"use strict";(self.webpackChunkmy_note=self.webpackChunkmy_note||[]).push([[5275],{9613:(e,n,t)=>{t.d(n,{Zo:()=>i,kt:()=>m});var r=t(9496);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,l=function(e,n){if(null==e)return{};var t,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var s=r.createContext({}),p=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},i=function(e){var n=p(e.components);return r.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,l=e.mdxType,o=e.originalType,s=e.parentName,i=c(e,["components","mdxType","originalType","parentName"]),d=p(t),m=l,y=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return t?r.createElement(y,a(a({ref:n},i),{},{components:t})):r.createElement(y,a({ref:n},i))}));function m(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var o=t.length,a=new Array(o);a[0]=d;var c={};for(var s in n)hasOwnProperty.call(n,s)&&(c[s]=n[s]);c.originalType=e,c.mdxType="string"==typeof e?e:l,a[1]=c;for(var p=2;p<o;p++)a[p]=t[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1619:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>p});var r=t(7579),l=(t(9496),t(9613));const o={},a="\u5de5\u5382\u6a21\u5f0f",c={unversionedId:"c-pattern/factory",id:"c-pattern/factory",title:"\u5de5\u5382\u6a21\u5f0f",description:"\u7b80\u4ecb",source:"@site/docs/c-pattern/factory.md",sourceDirName:"c-pattern",slug:"/c-pattern/factory",permalink:"/note/docs/c-pattern/factory",draft:!1,editUrl:"https://github.com/banli17/note/blob/main/docs/c-pattern/factory.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5355\u4f8b\u6a21\u5f0f",permalink:"/note/docs/c-pattern/singleton"},next:{title:"\u5907\u5fd8\u5f55\u6a21\u5f0f",permalink:"/note/docs/c-pattern/mementos"}},s={},p=[{value:"\u7b80\u4ecb",id:"\u7b80\u4ecb",level:2},{value:"\u5de5\u5382\u65b9\u6cd5",id:"\u5de5\u5382\u65b9\u6cd5",level:3},{value:"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f",id:"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f",level:3},{value:"\u5e94\u7528\u573a\u666f",id:"\u5e94\u7528\u573a\u666f",level:3},{value:"\u8d44\u6599",id:"\u8d44\u6599",level:2}],i={toc:p};function u(e){let{components:n,...o}=e;return(0,l.kt)("wrapper",(0,r.Z)({},i,o,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"\u5de5\u5382\u6a21\u5f0f"},"\u5de5\u5382\u6a21\u5f0f"),(0,l.kt)("h2",{id:"\u7b80\u4ecb"},"\u7b80\u4ecb"),(0,l.kt)("p",null,"\u5de5\u5382\u6a21\u5f0f\u662f\u4e00\u4e2a\u521b\u5efa\u578b\u6a21\u5f0f\uff0c\u5b83\u5c06\u521b\u5efa\u8005\u548c\u6784\u9020\u51fd\u6570\u5206\u79bb\uff0c\u628a\u521b\u5efa\u5bf9\u8c61\u7684\u64cd\u4f5c(new)\u5c01\u88c5\u5728\u5de5\u5382\u7c7b\u4e2d\uff0c\u8ba9\u4e0a\u5c42\u53ea\u9700\u8981\u4f7f\u7528\u5de5\u5382\u7684\u65b9\u6cd5\u6765\u521b\u5efa\u5bf9\u8c61\uff0c\u4e0d\u7528\u5173\u5fc3\u5de5\u5382\u4e2d\u751f\u4ea7\u4ea7\u54c1\u7684\u7ec6\u8282\uff08\u6bd4\u5982\u4e0d\u7528\u5173\u5fc3\u5e94\u8be5 new \u90a3\u79cd\u4ea7\u54c1\u3001\u4ea7\u54c1\u53d8\u5316\u540e\u600e\u4e48\u529e\uff09\u3002"),(0,l.kt)("p",null,"\u5f53\u9700\u8981\u4f7f\u7528 new \u65f6\uff0c\u5c31\u8981\u8003\u8651\u662f\u5426\u4f7f\u7528\u5de5\u5382\u6a21\u5f0f\u3002"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u597d\u5904")),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u4e0d\u7528\u5199 new"),(0,l.kt)("li",{parentName:"ol"},"\u5f53\u4ea7\u54c1\u53d1\u751f\u53d8\u5316\u65f6\uff0c\u53ea\u9700\u8981\u4fee\u6539\u5de5\u5382\u51fd\u6570\u5373\u53ef\uff0c\u5982\u679c\u4e0d\u7528\u5de5\u5382\uff0c\u5c31\u9700\u8981\u4fee\u6539\u6bcf\u4e00\u4e2a new Class\u3002")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u5de5\u5382\u6a21\u5f0f\u7684\u5206\u7c7b")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\u7b80\u5355\u5de5\u5382\u6a21\u5f0f\uff1a\u4e00\u4e2a\u4ea7\u54c1\u4e00\u4e2a\u5de5\u5382\uff0c\u5341\u4e2a\u4ea7\u54c1\u4e00\u4e2a\u5de5\u5382\uff0c\u91cc\u9762\u901a\u8fc7 if else \u5224\u65ad\u3002\u603b\u7ed3\uff1a\u5de5\u5382\u53ef\u4ee5\u751f\u4ea7\u6240\u6709\u4ea7\u54c1"),(0,l.kt)("li",{parentName:"ul"},"\u5de5\u5382\u65b9\u6cd5\uff1a\u4e00\u4e2a\u4ea7\u54c1\u4e00\u4e2a\u5de5\u5382\uff0c\u5341\u4e2a\u4ea7\u54c1\u5341\u4e2a\u5de5\u5382\uff0c\u907f\u514d\u5927\u91cf if else\u3002\u603b\u7ed3\uff1a\u5de5\u5382\u53ea\u80fd\u751f\u4ea7\u4e00\u4e2a\u4ea7\u54c1"),(0,l.kt)("li",{parentName:"ul"},"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f\uff1aN \u4e2a\u4ea7\u54c1 M \u4e2a\u5de5\u5382\u3002\u603b\u7ed3\uff1a\u5de5\u5382\u53ef\u4ee5\u7075\u6d3b\u7684\u751f\u4ea7\u5546\u54c1\u3002")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u7b80\u6613\u5de5\u5382\u6a21\u5f0f")),(0,l.kt)("p",null,(0,l.kt)("img",{src:t(7650).Z,width:"1906",height:"422"})),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"\u865a\u7ebf: \u4f9d\u8d56\u5173\u7cfb\uff0c\u6ca1\u6709\u5c5e\u6027\u7528\u5230 Project\uff0c\u4f46\u662f\u8fd4\u56de\u503c\u7528\u5230\u4e86\u3002")),(0,l.kt)("p",null,"\u5c0f A \u51c6\u5907\u529e\u4e2a\u5de5\u5382\uff0c\u751f\u4ea7 hp \u952e\u76d8\u3002\u4e8e\u662f\u4ed6\uff1a"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'class HpKeyboard {\n  color: string;\n  constructor(color: string) {\n    this.color = color;\n  }\n\n  showColor() {\n    console.log("color", this.color);\n  }\n}\n\nclass KeyboardFactory {\n  create(name) {\n    return new HpKeyboard(name);\n  }\n}\n\nlet creator = new KeyboardFactory();\n\nlet p1 = creator.create("\u7eff\u8272");\np1.showColor();\n\nlet p2 = creator.create("\u7ea2\u8272");\np2.showColor();\n')),(0,l.kt)("p",null,"\u4e0a\u9762\u7684\u4ee3\u7801\u53ef\u4ee5\u770b\u5230\uff0c\u8c03\u7528 Creator \u7684 create \u65b9\u6cd5\u5c31\u53ef\u4ee5\u521b\u5efa\u4ea7\u54c1\uff0c\u5982\u679c\u4ea7\u54c1\u6709\u53d8\u5316\uff0c\u6bd4\u5982\u4ea7\u54c1\u505c\u4ea7\u6216\u5347\u7ea7\u4e86\uff0c\u53ea\u9700\u8981\u5728\u5de5\u5382\u7c7b\u5185\u90e8\u5904\u7406\uff0c\u65e0\u9700\u4fee\u6539\u4e0a\u5c42\u4ee3\u7801\u3002"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u7b80\u5355\u5de5\u5382\u6a21\u5f0f\u5347\u7ea7")),(0,l.kt)("p",null,"\u968f\u7740\u5de5\u5382\u751f\u610f\u8d8a\u6765\u8d8a\u5230\uff0c\u5c0f A \u51b3\u5b9a\u751f\u4ea7\u4e0d\u540c\u54c1\u724c\u7684\u952e\u76d8\u3002\u6709 hp \uff0c dell \u7b49\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{src:t(6331).Z,width:"1930",height:"722"})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"interface Keyboard {\n    color: string\n    showColor: () => void\n}\nclass HpKeyboard implements Keyboard {\n    color: string\n    constructor(color: string) {\n        this.color = color\n    }\n\n    showColor() {\n        console.log('hp \u952e\u76d8, color \u662f', this.color)\n    }\n}\n\nclass DellKeyboard implements Keyboard {\n    color: string\n    constructor(color: string) {\n        this.color = color\n    }\n\n    showColor() {\n        console.log('dell \u952e\u76d8, color \u662f', this.color)\n    }\n}\n\nclass KeyboardFactory {\n    create(type, color) {\n        if (type === 'hp') {\n            return new HpKeyboard(color)\n        }\n        if (type === 'dell') {\n            return new DellKeyboard(color)\n        }\n        throw new Error(`\u6ca1\u6709\u751f\u4ea7 ${type} \u7684\u952e\u76d8`)\n    }\n}\n\nlet creator = new KeyboardFactory()\n\nlet p1 = creator.create('hp', '\u7eff\u8272')\np1.showColor()\n\nlet p2 = creator.create('dell', '\u7ea2\u8272')\np2.showColor()\n")),(0,l.kt)("p",null,"\u8fd9\u4e2a\u5de5\u5382\u53ef\u4ee5\u751f\u4ea7\u591a\u4e2a\u4ea7\u54c1\u4e86\uff0c\u4f46\u662f\u7f3a\u70b9\u662f\u6269\u5c55\u6027\u8f83\u5dee\uff0c\u6bcf\u6b21\u65b0\u589e\u4e00\u4e2a\u5546\u54c1\uff0c\u90fd\u9700\u8981\u4fee\u6539\u5de5\u5382\uff0c\u8fdb\u884c if else \u5224\u65ad\u3002\u5f53\u5546\u54c1\u975e\u5e38\u591a\u4e14\u6742\u65f6\uff0c\u4f1a\u663e\u5f97\u5f88\u590d\u6742\u3002\u6bd4\u5982\u5c0f A \u8fd8\u5f00\u59cb\u751f\u4ea7\u9f20\u6807\u3001\u4e3b\u673a\u3001\u786c\u76d8\u7b49\u7b49\uff0c\u8fd9\u6837\u90fd\u9700\u8981\u5728\u5de5\u5382\u91cc\u8fdb\u884c if else\u3002"),(0,l.kt)("h3",{id:"\u5de5\u5382\u65b9\u6cd5"},"\u5de5\u5382\u65b9\u6cd5"),(0,l.kt)("p",null,"\u4e3a\u4e86\u89e3\u51b3\u4e0a\u9762\u5927\u91cf\u5546\u54c1\u6240\u5e26\u6765\u7684 if else \u95ee\u9898\uff0c\u5c0f A \u51b3\u5b9a\u591a\u5efa\u4e00\u4e9b\u5de5\u5382\uff0c\u4f7f\u7528\u6700\u521d\u7684\u751f\u4ea7 hp \u952e\u76d8\u7684\u65b9\u5f0f\uff0c\u9488\u5bf9\u6bcf\u4e2a\u4ea7\u54c1 \u90fd\u5efa\u7acb \u4e00\u4e2a\u5de5\u5382\u3002\u8fd9\u6837\u7528\u6237\u4e70\u5546\u54c1\u65f6\uff0c\u53bb\u5bf9\u5e94\u7684\u5de5\u5382\u5c31\u53ef\u4ee5\u4e86\uff0c\u6bd4\u5982\u4e70 hp \u952e\u76d8\uff0c\u5c31\u53bb hp \u952e\u76d8\u5382\uff0c\u4e70 dell \u952e\u76d8\uff0c\u5c31\u662f dell \u952e\u76d8\u5382\u3002\u4e70 hp \u9f20\u6807\uff0c\u5c31\u53bb hp \u9f20\u6807\u5382\uff0c\u4e70 dell \u9f20\u6807\uff0c\u5c31\u53bb dell \u9f20\u6807\u5382\u3002"),(0,l.kt)("p",null,(0,l.kt)("img",{src:t(5810).Z,width:"854",height:"615"})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"interface Keyboard {\n    color: string\n    showColor: () => void\n}\nclass HpKeyboard implements Keyboard {\n    color: string\n    constructor(color: string) {\n        this.color = color\n    }\n\n    showColor() {\n        console.log('hp \u952e\u76d8, color \u662f', this.color)\n    }\n}\n\nclass DellKeyboard implements Keyboard {\n    color: string\n    constructor(color: string) {\n        this.color = color\n    }\n\n    showColor() {\n        console.log('dell \u952e\u76d8, color \u662f', this.color)\n    }\n}\n\nclass HpKeyboardFactory {\n    create(color) {\n        return new HpKeyboard(color)\n    }\n}\n\nclass DellKeyboardFactory {\n    create(color) {\n        return new HpKeyboard(color)\n    }\n}\n\nlet hpCreator = new HpKeyboardFactory()\nlet dellCreator = new DellKeyboardFactory()\n\nlet p1 = hpCreator.create('\u7eff\u8272')\np1.showColor()\n\nlet p2 = dellCreator.create('\u7ea2\u8272')\np2.showColor()\n")),(0,l.kt)("p",null,"\u867d\u7136\u8fd9\u6837\u5f88\u6e05\u6670\uff0c\u53ef\u4ee5\u4e0d\u7528 if else \u5224\u65ad\u4e86\uff0c\u4f46\u662f\u7f3a\u70b9\u4e5f\u5f88\u660e\u663e\uff1a\u4e00\u4e2a\u5546\u54c1\u4e00\u4e2a\u5de5\u5382\uff0c\u5982\u679c\u4e1a\u52a1\u6d89\u53ca\u7684\u5546\u54c1\u8d8a\u6765\u8d8a\u591a\uff0c\u96be\u9053\u6bcf\u4e00\u4e2a\u5546\u54c1\u90fd\u8981\u5bf9\u5e94\u4e00\u4e2a\u5de5\u5382\u7c7b\u5417\uff1f\u8fd9\u6837\u4f1a\u4f7f\u5f97\u7cfb\u7edf\u4e2d\u7c7b\u7684\u4e2a\u6570\u6210\u500d\u589e\u52a0\uff0c\u589e\u52a0\u4e86\u4ee3\u7801\u7684\u590d\u6742\u5ea6\u3002"),(0,l.kt)("h3",{id:"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f"},"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f"),(0,l.kt)("p",null,"\u4e8e\u662f\u5c0f A \u60f3\u5230\u4e86\u53e6\u4e00\u4e2a\u65b9\u6cd5\uff0c\u5c31\u662f\u5c06 \u5546\u54c1\u8fdb\u884c\u5f52\u7c7b\u5206\u7ec4\uff0c\u6bd4\u5982\u6309\u54c1\u724c\u5206\u7c7b\uff0c\u6216\u8005\u6309\u7167\u4ea7\u54c1\u5206\u7c7b(\u6bd4\u5982\u952e\u76d8\uff0c\u9f20\u6807)\u3002\u8fd9\u6837\u53bb\u5efa\u7acb\u5de5\u5382\u3002"),(0,l.kt)("p",null,"\u5b83\u5c06\u591a\u4e2a\u4ea7\u54c1\u8fdb\u884c\u5206\u7ec4\uff0c\u653e\u5728\u540c\u4e00\u4e2a\u5de5\u5382\u4e2d\u751f\u4ea7\uff0c\u6bcf\u4e2a\u5c0f\u4ea7\u54c1\u7684\u751f\u4ea7\u5bf9\u5e94 \u5de5\u5382\u4e2d\u7684\u4e00\u4e2a\u65b9\u6cd5\u3002\u6bd4\u5982\u4e0d\u540c\u54c1\u724c\u7684\u7535\u8111\uff0c\u6bcf\u4e2a\u7535\u8111\u5305\u542b\u4e0d\u540c\u54c1\u724c\u7684\u663e\u793a\u5668\u3001\u952e\u76d8\u3001\u4e3b\u673a\u7b49\u5546\u54c1\u3002"),(0,l.kt)("p",null,"\u53e6\u5916\u6bcf\u4e2a\u5de5\u5382 \u751f\u4ea7 \u67d0\u4e2a \u4ea7\u54c1\u65f6\uff0c\u53ef\u4ee5\u4efb\u610f\u7684\u7ec4\u5408\u3002\u6700\u7ec8 client \u5ba2\u6237\u7aef\uff0c\u8c03\u7528 \u5de5\u5382 \u7684\u65b9\u6cd5\u8fdb\u884c\u751f\u4ea7\u4ea7\u54c1\u3002\n",(0,l.kt)("img",{src:t(6199).Z,width:"1080",height:"445"}),"\n",(0,l.kt)("img",{src:t(801).Z,width:"1080",height:"730"})),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"interface Mouse {}\nclass HpMouse implements Mouse {}\nclass DellMouse implements Mouse {}\n\ninterface Keyboard {}\nclass HpKeyboard implements Keyboard {}\nclass DellKeyboard implements Keyboard {}\n\n// \u5de5\u5382\u57fa\u7840\u7c7b\nclass Factory {\n  createPC() {\n    const mouse = this.createMouse();\n    const keyboard = this.createKeyboard();\n    return { mouse, keyboard };\n  }\n\n  createMouse() {}\n  createKeyboard() {}\n}\n\nclass HpFactory extends Factory {\n  createMouse() {\n    return new HpMouse();\n  }\n  createKeyboard() {\n    return new HpKeyboard();\n  }\n}\n\nclass DellFactory extends Factory {\n  createMouse() {\n    return new DellKeyboard();\n  }\n  createKeyboard() {\n    return new DellKeyboard();\n  }\n}\n\nclass MixFactory extends Factory {\n  createMouse() {\n    return new DellKeyboard();\n  }\n  createKeyboard() {\n    return new HpKeyboard();\n  }\n}\n\nconst hpfactory = new HpFactory();\nhpfactory.createMouse();\n")),(0,l.kt)("p",null,"\u4f18\u7f3a\u70b9\uff1a\u6269\u5c55\u4e00\u4e2a\u65b0\u7684\u54c1\u724c\u5f88\u7b80\u5355\uff0c\u52a0\u4e00\u4e2a\u5de5\u5382\u548c\u5546\u54c1\u7c7b\u5c31\u53ef\u4ee5\uff0c\u65e0\u9700\u4fee\u6539\u5df2\u6709\u5de5\u5382\uff0c\u4f46\u662f\u5982\u679c\u8981\u65b0\u52a0\u5546\u54c1\uff0c\u5c31\u9700\u8981\u4fee\u6539\u4e4b\u524d\u7684\u6bcf\u4e2a\u5de5\u5382\uff0c\u90fd\u9700\u8981\u65b0\u589e\u5546\u54c1\u3002"),(0,l.kt)("p",null,"\u62bd\u8c61\u5de5\u5382\u6a21\u5f0f\u89e3\u51b3\u7684\u662f \u4ea7\u54c1\u591a\u4e86\u4e4b\u540e\uff0c\u5de5\u5382\u65b9\u6cd5\u4ea7\u751f\u5927\u91cf\u5de5\u5382\u7684\u95ee\u9898\u3002"),(0,l.kt)("h3",{id:"\u5e94\u7528\u573a\u666f"},"\u5e94\u7528\u573a\u666f"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"1\u3001jquery \u5b9e\u4f8b\u7684\u521b\u5efa\u5c31\u662f\u5de5\u5382\u6a21\u5f0f")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},"// \u6269\u5c55 window.$\ndeclare interface Window {\n  $: (selector: string) => JQuery\n}\n\nclass JQuery {\n  selector: string\n  length: number\n  constructor(selector: string) {\n    const domList = Array.prototype.slice.call(document.querySelectorAll(selector)) const length = domList.length for (let i = 0; i < length; i++) {\n      this[i] = domList[0]\n    }\n    this.selector = selector\n    this.length = length\n  }\n  append(elem: HTMLElement): JQuery {\n    return this\n  }\n  addClass(key: string, value: string): JQuery {\n    return this\n  }\n  html(htmlStr: string): JQuery | string {\n    if (htmlStr) {\n      // set html\n      return this\n    } else { // get html\n      const html = 'xxx'\n      return html\n    }\n  }\n}\n\nwindow.$ = (selector) => {\n  return new JQuery(selector)\n}\n")),(0,l.kt)("p",null,"\u8fd9\u6837\u6211\u4eec\u53ea\u9700\u8981\u4f7f\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"$()"),"\u5373\u53ef\uff0c\u5982\u679c\u4f7f\u7528",(0,l.kt)("inlineCode",{parentName:"p"},"new $()"),"\u4e66\u5199\u8d77\u6765\u9ebb\u70e6\uff0c\u800c\u4e14\u94fe\u5f0f\u8c03\u7528\u4f1a\u5f88\u7e41\u6742(\u56e0\u4e3a\u90fd\u9700\u8981\u5199 new)\u3002\u53e6\u5916\u5982\u679c jQuery \u540d\u79f0\u4fee\u6539\u4e3a\u4e86 zQuery\uff0c\u90a3\u4e48\u4e0a\u5c42\u4ee3\u7801\u90fd\u9700\u8981\u4fee\u6539\u3002"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"2\u3001Vue \u7684 createElementVNode ")),(0,l.kt)("p",null,"\u5728\u7ebf\u7f16\u8bd1 ",(0,l.kt)("a",{parentName:"p",href:"https://vue-next-template-explorer.netlify.app/"},"https://vue-next-template-explorer.netlify.app/")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'<div>\n    <span>\u9759\u6001\u6587\u5b57</span>\n  <span :id="hello" class="bar">{{ msg }}</span>\n</div>\n')),(0,l.kt)("p",null,"\u7f16\u8bd1\u6210"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'export function render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (\n    _openBlock(),\n    _createElementBlock("div", null, [\n      _createElementVNode("span", null, "\u9759\u6001\u6587\u5b57"),\n      _createElementVNode(\n        "span",\n        {\n          id: _ctx.hello,\n          class: "bar",\n        },\n        _toDisplayString(_ctx.msg),\n        9 /* TEXT, PROPS */,\n        ["id"]\n      ),\n    ])\n  );\n}\n')),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"_createElementBlock()"),", ",(0,l.kt)("inlineCode",{parentName:"p"},"_createElementVNode()")," \u5c31\u662f\u5de5\u5382\u6a21\u5f0f\u3002"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"3\u3001React.createElement")),(0,l.kt)("p",null,"\u5728\u7ebf\u7f16\u8bd1 ",(0,l.kt)("a",{parentName:"p",href:"https://www.babeljs.cn/repl"},"https://www.babeljs.cn/repl")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'const profile = (\n  <div>\n    <img src="avatar.png" className="profile" />\n    <h3>{[user.firstName, user.lastName].join(" ")}</h3>{" "}\n  </div>\n);\n')),(0,l.kt)("p",null,"\u7f16\u8bd1\u6210"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-js"},'var profile = /*#__PURE__*/ React.createElement(\n  "div",\n  null,\n  /*#__PURE__*/ React.createElement("img", {\n    src: "avatar.png",\n    className: "profile",\n  }),\n  /*#__PURE__*/ React.createElement(\n    "h3",\n    null,\n    [user.firstName, user.lastName].join(" ")\n  ),\n  " "\n);\n')),(0,l.kt)("p",null,"createElement \u5c31\u662f\u5de5\u5382\u6a21\u5f0f\u3002"),(0,l.kt)("h2",{id:"\u8d44\u6599"},"\u8d44\u6599"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("a",{parentName:"li",href:"https://www.zhihu.com/question/27125796/answer/1615074467"},"https://www.zhihu.com/question/27125796/answer/1615074467"))))}u.isMDXComponent=!0},7650:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/2022-10-23-17-17-20-72740cd5d1ca285c104ce4249240dad1.png"},6331:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/2022-10-23-17-17-26-0cef9b0efbedd2ce571e96112367c9cd.png"},5810:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/2022-10-23-17-17-34-b42503c4716e36fa273b41f76aaeb83c.png"},6199:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/2022-10-23-17-17-45-d0a383877faa8d303efc324daed43e84.png"},801:(e,n,t)=>{t.d(n,{Z:()=>r});const r=t.p+"assets/images/2022-10-23-17-17-50-6f21d945e284324d6257765bbae1180a.png"}}]);