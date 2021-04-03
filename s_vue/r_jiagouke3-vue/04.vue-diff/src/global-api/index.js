import { mergeOptions } from "../util";

export function initGlobalAPI(Vue){
    Vue.options = {}; // 用来存储全局的配置
    // filter directive component
    Vue.mixin = function (mixin) {
        // mergeOptions
        this.options = mergeOptions(this.options,mixin);
        return this;
    }
    Vue.options._base = Vue; // Vue的构造函数 后面会用到
    Vue.options.components = {}; // 用来存放组件的定义
    Vue.component = function (id,definition) {
        definition.name = definition.name || id;
        definition = this.options._base.extend(definition); // 通过对象产生一个构造函数
        this.options.components[id] = definition;
        console.log(this.options)
    }
    let cid = 0;
    Vue.extend = function (options) { // 子组件初始化时会
        //  new VueComponent(options)
        const Super = this;
        const Sub = function VueComponent(options){
            this._init(options);
        }
        Sub.cid = cid++;
        Sub.prototype = Object.create(Super.prototype);// 都是通过Vue继承来的
        Sub.prototype.constructor = Sub;
        Sub.component = Super.component;
        // ... 每次声明一个组件 都会把父级的定义放在自己的身上
        Sub.options = mergeOptions(
            Super.options,
            options)
        return Sub;// 这个构造函数是由对象产生而来的
    }
    // 手写dom-diff算法  看vue2源码
}

