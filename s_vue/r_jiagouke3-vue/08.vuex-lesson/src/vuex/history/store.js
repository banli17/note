// new Vuex.Store({state,getters,actions,mutations})
import { applyMixin } from './mixin';


const forEachValue = (obj, cb) => {
    Object.keys(obj).forEach(key => cb(obj[key], key))
}

export let Vue;

export class Store { // vuex 是基于Vue来实现的
    constructor(options) { // this.$store
        // 哪里的数据是响应式的 new Vue => data
        let computed = {}
        this.getters = {}
        forEachValue(options.getters, (value, key) => {
            // value是function 但是getters是属性
            computed[key] = () => { // 靠computed属性 做了优优化
                return value.call(this, this.state);
            }
            Object.defineProperty(this.getters, key, {
                // 每次取值都会重新执行用户的方法 ，性能差，我希望第一次取值就能把结果缓存下来
                get: () => {
                    return this._vm[key]; // 取computed的key属性,计算属性也会被放到当前实例上
                }
            })
        }) // getters 函数 和 “属性” 取值 
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        }); // 内部会使用代理 把所有属性代理给this._vm
        // vue中不会对$ 开头的属性进行代理操作

        this.mutations = {};
        this.actions = {}
        forEachValue(options.mutations, (fn, key) => {
            this.mutations[key] = (payload) => fn.call(this, this.state, payload)
        });

        forEachValue(options.actions, (fn, key) => {
            this.actions[key] = (payload) => fn.call(this, this, payload)
        })
    }
    get state() {
        return this._vm._data.$$state // _data
    }
    commit = (type, payload) => { // 类的箭头韩式 不是es6箭头函数
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => { // 原型方法
        this.actions[type](payload)
    }
}

export const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(Vue)
}

// function Store(){
//     let {commit} = this;
//     this.commit = ()=>{
//         commit.call(this);
//     }
// }
// Store.prototype.commit = function () {
//     // this
// }
// let {commit} = new Store();
// commit