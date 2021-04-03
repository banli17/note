import {patch} from './vdom/patch'
import Watcher from './observer/watcher'

export function lifecycleMixin(Vue) {

    Vue.prototype._update = function (vnode) {
        const vm = this
        const prevVnode = vm._vnode; // 先取上一次的vnode 看一下是否有
        if(!prevVnode){ // 首次渲染
            vm.$el = patch(vm.$el, vnode); // 组件调用patch方法会产生$el属性
            vm._vnode = vnode // 保存上一次的虚拟节点
        }else{  // 更新
            vm.$el = patch(prevVnode,vnode);
        }
    }

}

export function mountComponent(vm) {
    // 调用 render 方法去渲染 el 属性
    callHook(vm, 'beforeMount')

    const updateComponent = () => {
        vm._update(vm._render())
    }
    new Watcher(vm, updateComponent, () => {
        callHook(vm, 'updated')
    }, true)

    callHook(vm, 'mounted')
}

export function callHook(vm, hookName) {
    const handlers = vm.$options[hookName]
    // console.log('hooks', hooks, hookName)
    if (handlers) {
        handlers.forEach(handler => {
            handler.call(vm)
        })
    }
}
