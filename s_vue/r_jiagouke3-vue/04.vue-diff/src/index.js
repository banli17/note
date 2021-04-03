// Vue2.0中就是一个构造函数 class

import { compileToFunctions } from "./compiler/index";
import { initGlobalAPI } from "./global-api/index";
import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { createElm, patch } from "./vdom/patch";

function Vue(options) {
    this._init(options); // 当用户new Vue时 就调用init方法进行vue的初始方法
}
// 可以拆分逻辑到不同的文件中 更利于代码维护 模块化的概念

initMixin(Vue); // 扩展初始化方法
lifecycleMixin(Vue); // 扩展_update方法
renderMixin(Vue); // 扩展_render方法


initGlobalAPI(Vue); // 混合全局的api


// 我们自己构建两个虚拟dom，之后手动进行比对

// let vm1 = new Vue({
//     data() {
//         return { name: 'zf' }
//     }
// });
// // 将模板变成render函数
// let render1 = compileToFunctions(`<div>
//    <li key="A" style="background:red">A</li>
//    <li key="B" style="background:yellow">B</li>
//    <li key="C" style="background:blue">C</li>
//    <li key="D" style="background:green">D</li>
//    <li key="F" style="background:pink">F</li>
// </div>`); // 将模板编译成render函数
// let oldVnode = render1.call(vm1); // 老的虚拟节点
// let el = createElm(oldVnode);
// document.body.appendChild(el);
// let vm2 = new Vue({
//     data() {
//         return { name: 'jw' }
//     }
// })
// let render2 = compileToFunctions(`<div>
//    <li key="N" style="background:pink">N</li>
//    <li key="A" style="background:red">A</li>
//    <li key="C" style="background:blue">C</li>
//    <li key="B" style="background:yellow">B</li>
//    <li key="E" style="background:purple">E</li>
// </div>`);
// let newVnode = render2.call(vm2)

// setTimeout(() => {
//     patch(oldVnode, newVnode); //  包括了初渲染和diff算法的流程
// }, 2000);


export default Vue

// 库 => rollup  项目开发webpack  