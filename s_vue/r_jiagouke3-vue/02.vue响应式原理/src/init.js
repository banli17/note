import { compileToFunctions } from "./compiler/index.js";
import { mountComponent } from "./lifecycle.js";
import { initState } from "./state";
import { nextTick } from "./util.js";
export function initMixin(Vue){
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options; // 实例上有个属性$options 表示的是用户传入的所有属性
        // 初始化状态
        initState(vm);

        if(vm.$options.el){ // 数据可以挂载到页面上
            vm.$mount(vm.$options.el);
        }
    }
    Vue.prototype.$nextTick = nextTick
    Vue.prototype.$mount = function (el) {
        el = document.querySelector(el);
        const vm = this;
        const options = vm.$options;
        vm.$options.el = el;
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

        mountComponent(vm,el);// 组件挂载



    }
}
