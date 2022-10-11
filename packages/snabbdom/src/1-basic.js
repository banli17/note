// 使用 webpack 5 打包才能使用下面路径写法, snabbdom 里 package.json 有 exports 字段
// import { init } from "snabbdom/init";
// import { h } from "snabbdom/h";

import { init } from "snabbdom/build/init.js";
import { h } from "snabbdom/build/h.js";

const patch = init([]);

// 第一个参数：标签 + 选择器
// 第二个参数：如果是字符串就是标签中的文本内容
let vnode = h("div#container.cls", "hello world");
let app = document.querySelector("#app");

// 第一个参数，旧 vnode
// 第二个参数，新 vnode
// 会使用新的 vnode 替换旧的 vnode
let oldVnode = patch(app, vnode);

vnode = h("div#container.xxx", "hello snabbdom");
patch(oldVnode, vnode);
