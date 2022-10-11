import { init } from "snabbdom/build/init.js";
import { h } from "snabbdom/build/h.js";

const patch = init([]);

// 子元素可以是一个数组， 每个元素又是一个 vnode, 用 h 函数创建
let vnode = h("div#container.cls", [h("h1", "hello world"), h("p", "ppp")]);
let app = document.querySelector("#app");

let oldVnode = patch(app, vnode);

setTimeout(() => {
  // vnode = h("div#container", [h("h1", "hello world"), h("p", "this is a p")]);
  // patch(oldVnode, vnode);

  // 会生成一个注释节点 <!---->
  patch(oldVnode, h("!"));
}, 1000);
