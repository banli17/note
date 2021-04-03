import {isReservedTag} from "../utils";

export function renderMixin(Vue) {
    // 创建元素节点
    Vue.prototype._c = function (tag, data, ...children) {
        return createElement(this, tag, data, ...children)
    }
    // 将结果是对象时，对对象取值
    Vue.prototype._s = function (value) {
        return value === null ? '' :
            typeof value === 'object' ? JSON.stringify(value) :
                value
    }
    // 创建文本节点
    Vue.prototype._v = function (text) {
        return createTextVNode(text + '')
    }
    // 创建虚拟节点
    Vue.prototype._render = function () {
        const vm = this
        const render = vm.$options.render

        let vnode = render.call(vm)
        return vnode
    }
}

function createElement(vm, tag, data = {}, ...children) {
    // 如果是组件，需要创建组件
    if (isReservedTag(tag)) {
        return vnode(tag, data, data.key, children)
    } else {
        let Ctor = vm.$options.components[tag]
        return createComponent(vm, tag, data, data.key, children, Ctor)
    }
}

function createComponent(vm, tag, data, key, children, Ctor) {
    const baseCtor = vm.$options._base
    // 用户传递的 components 不是 Vue.component的，是一个对象，不是 VueComponent 的实例
    if (typeof Ctor === 'object') {
        Ctor = baseCtor.extend(Ctor)
    }
    // 给组件增加生命周期
    data.hook = {
        init(vnode) {
            let child = vnode.componentInstance = new Ctor({})
            console.log('child', child)
            child.$mount()
        }
    }
    // 这里的 children 是插槽
    return vnode(`vue-component-${Ctor.cid}-${tag}`, data, data.key, undefined, undefined, {Ctor, children})
}

function createTextVNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text)
}

function vnode(tag, data, key, children, text, componentOptions) {
    return {
        tag,
        data,
        key,
        children,
        text,
        componentOptions, // 用来保存组件的构造函数和插槽
    }
}
