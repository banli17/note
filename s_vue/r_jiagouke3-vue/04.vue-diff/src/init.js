import { debug } from "webpack";
import { compileToFunctions } from "./compiler/index.js";
import { callHook, mountComponent } from "./lifecycle.js";
import { initState } from "./state";
import { mergeOptions, nextTick } from "./util.js";
export function initMixin(Vue){

    // vue是如何渲染的 1.ast 2.renders 3.vnode(不应该是my-button)

    Vue.prototype._init = function (options) { // options 是用户传入的对象
        const vm = this;
        vm.$options = mergeOptions(vm.constructor.options,options);
        // vm.$options = options; // 实例上有个属性$options 表示的是用户传入的所有属性
        // 初始化状态
        callHook(vm,'beforeCreate');
        initState(vm);
        callHook(vm,'created');

        if(vm.$options.el){ // 数据可以挂载到页面上
            vm.$mount(vm.$options.el);
        }
    }
    Vue.prototype.$nextTick = nextTick
    Vue.prototype.$mount = function (el) {
        el = el &&  document.querySelector(el);
        const vm = this;
        const options = vm.$options;
        vm.$el = el;
        // 如果有render 就直接使用render
        // 没有render 看有没有template属性
        // 没有template 就接着找外部模板

        if(!options.render){
            let template = options.template;
            if(!template && el){
                template = el.outerHTML; // 火狐不兼容 document.createElement('div').appendChild('app').innerHTMl
            }
            // 如何将模板编译成render函数
            const render =  compileToFunctions(template); // compileToFunctions
            options.render = render;
        }
        mountComponent(vm);// 组件挂载

    }
}
