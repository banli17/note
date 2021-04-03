import Watcher from "./observer/watcher"
import { patch } from './vdom/patch'
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        // 将虚拟节点转换成真实的dom
        const vm = this;
        // 首次渲染 需要用虚拟节点 来更新真实的dom元素
        vm.$el = patch(vm.$options.el, vnode);


    }
}


export function mountComponent(vm, el) {


    // 默认vue是通过watcher来进行渲染  = 渲染watcher （每一个组件都有一个渲染watcher）

    let updateComponent = () => {
        vm._update(vm._render()); // 虚拟节点
    }
    new Watcher(vm, updateComponent, () => {}, true); // updateComponent();
}