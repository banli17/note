import {initState} from "./state";
import {compileToFunction} from './compiler/index'
import {callHook, mountComponent} from "./lifecycle";
import {mergeOptions} from "./utils";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this
        console.log('options', vm.constructor.options, options)
        this.$options = mergeOptions(vm.constructor.options, options)
        callHook(vm, 'beforeCreate')
        initState(vm)
        callHook(vm, 'created')
        // Vue 参考了 MVVM，因为它有 $ref，可以操作 dom
        // MVVM 是单纯的 M -VM -V，不能跳过数据去更新视图

        // 挂载 dom
        let el = vm.$options.el
        if (el) {
            this.$mount(el)
        }
    }

    Vue.prototype.$mount = function (el) {
        // 获取模版
        const vm = this
        const options = vm.$options
        el = document.querySelector(el)
        vm.$el = el  // 保存老节点

        // 没有 render，则转 template 为 render
        if (!options.render) {
            // 上面已经判断有 el 了
            let template = options.template
            if (!template && el) {
                template = el.outerHTML
            }

            // 将 options.template 转化为 render
            const render = compileToFunction(template)
            options.render = render
        }
        console.log(options.render)

        // 通过 render 方法，渲染组件
        mountComponent(vm, el)
    }
}
