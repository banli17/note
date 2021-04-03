import { createElement, createTextVnode } from "./vdom/index.js"

export function renderMixin(Vue) {
    Vue.prototype._c = function(...args) { // 创建元素的虚拟节点
        return createElement(this,...args);
    }   
    Vue.prototype._v = function(text) { // 创建文本的虚拟节点
        return createTextVnode(this,text);
    }
    Vue.prototype._s = function(val) { // 转化成字符串
        return val == null ? '' : (typeof val == 'object') ? JSON.stringify(val) : val
    }
    Vue.prototype._render = function() {
        // render
        const vm = this;
        let render = vm.$options.render; // 获取编译后的render方法

        // 调用render方法产生虚拟节点
        let vnode = render.call(vm); // _c(xxx,xx,xxx,xxx) 调用时会自动将变量进行取值，将实例结果进行渲染

        return vnode; // 虚拟节点

        // _c('div',{},_c())
    }
}