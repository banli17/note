// Vue2.0中就是一个构造函数 class

import { initMixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";

function Vue(options){
   this._init(options); // 当用户new Vue时 就调用init方法进行vue的初始方法
}
// 可以拆分逻辑到不同的文件中 更利于代码维护 模块化的概念

initMixin(Vue); // 扩展初始化方法
lifecycleMixin(Vue); // 扩展_update方法
renderMixin(Vue); // 扩展_render方法
export default Vue

// 库 => rollup  项目开发webpack  

