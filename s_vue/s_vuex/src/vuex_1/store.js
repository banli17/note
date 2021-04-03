import applyMixin from "./mixin";

let Vue

function forEach(obj, callback) {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key])
    })
}

export class Store {
    constructor(options) {
        // 这里的 state 是响应式的
        this.options = options

        let computed = {}
        console.log(this._vm)
        let getters = this.options.getters
        this.getters = {}
        if (getters) {
            forEach(getters, (key, fn) => {
                // 计算属性是函数
                computed[key] = () => {
                    return fn(this.state)
                }
                // 获取 getters 的值时，直接从 _vm 上取缓存
                // 如果依赖变化，会重新计算，重新计算后，取值也会变化
                Object.defineProperty(this.getters, key, {
                    get: () => {
                        console.log('重新取值')
                        return this._vm[key]
                    }// fn(this.state)
                })
            })
            console.log('this.getters,', this.getters)
        }
        this._vm = new Vue({
            data: {
                // 属性如果通过 $ 开头，则默认不会挂载到 vm 上，即没有 vm.$$state
                // 数据在哪里使用，vue 就会收集依赖
                $$state: this.options.state
            },
            computed
        })

        this.mutations = {}
        this.actions = {}
        forEach(options.mutations, (key, fn) => {
            this.mutations[key] = (payload) => {
                return fn(this.state, payload)
            }
        })
        forEach(options.actions, (key, fn) => {
            this.actions[key] = (payload) => {
                return fn(this, payload)
            }
        })
    }

    commit = (key, payload) => {
        return this.mutations[key](payload)
    }

    dispatch = (key, payload) => {
        return this.actions[key](payload)
    }

    get state() {
        return this._vm._data.$$state
    }
}


export const install = (_Vue) => {
    console.log('install')
    Vue = _Vue
    applyMixin(Vue)
}

