import applyMixin from "./mixin";
import ModuleCollection from './module_collection'
import util from './util'

let Vue

function getState(state, path) {
    return path.reduce((memo, current) => {
        return memo[current]
    }, state)
}

function installModule(store, rootState, path, module) {

    let namespace = store._modules.getNamespaced(path)
    console.log(namespace)

    // 设置 state
    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current]
        }, rootState)
        // console.log(parent, path, path[path.length - 1])
        parent[path[path.length - 1]] = module.state
    }

    module.forEachGetter((key, getter) => {
        store._wrappedGetters[key] = () => {
            return getter(module.state)
        }
    })
    module.forEachMutation((key, mutation) => {
        key = namespace + key
        store._mutations[key] = store._mutations[key] || []
        store._mutations[key].push((payload) => {
            // mutation.call(store, module.state, payload)
            console.log('getState(store, path)', getState(store.state, path))

            // 这里 store 里的数据永远是最新的，但是 module 里的数据不是最新的
            // _vm.data = x 重写了
            mutation.call(store, getState(store.state, path), payload)
            store._subscribes.forEach(subscribe => {
                // 传入 mutation, state
                console.log('触发')
                subscribe(mutation, store.state)
            })
        })
    })
    module.forEachAction((key, action) => {
        key = namespace + key
        store._actions[key] = store._actions[key] || []
        store._actions[key].push((payload) => {
            action.call(store, store, payload)
        })
    })

    // store, rootState, path, module
    module.forEachChildren((key, child) => {
        installModule(store, rootState, path.concat(key), child)
    })
}

function resetStoreVM(store, state) {
    let computed = {}
    store.getters = {}

    util.forEach(store._wrappedGetters, (key, getter) => {
        computed[key] = () => getter(state)
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        })
    })

    store._vm = new Vue({
        data: {
            $$state: state
        },
        computed
    })
}

export class Store {
    constructor(options) {
        // 这里的 state 是响应式的
        const state = options.state

        this.options = options

        this._mutations = {}
        this._actions = {}
        this._wrappedGetters = {}
        this._subscribes = []

        // 1. 收集依赖：格式化数据
        this._modules = new ModuleCollection(options)
        // 2. 安装模块
        installModule(this, state, [], this._modules.root)
        console.log('this', this)

        // 3. 重置 state 和 computed，将它们设置到 store._vm = new Vue 上
        resetStoreVM(this, state)

        // 4. 注册插件
        if (options.plugins.length) {
            options.plugins.forEach(plugin => {
                return plugin(this)  // 这里传入 store
            })
        }

        // let computed = {}
        // // console.log(this._vm)
        // let getters = this.options.getters
        // this.getters = {}
        // if (getters) {
        //     util.forEach(getters, (key, fn) => {
        //         // 计算属性是函数
        //         computed[key] = () => {
        //             return fn(this.state)
        //         }
        //         // 获取 getters 的值时，直接从 _vm 上取缓存
        //         // 如果依赖变化，会重新计算，重新计算后，取值也会变化
        //         Object.defineProperty(this.getters, key, {
        //             get: () => {
        //                 // console.log('重新取值')
        //                 return this._vm[key]
        //             }// fn(this.state)
        //         })
        //     })
        //     // console.log('this.getters,', this.getters)
        // }
        // this._vm = new Vue({
        //     data: {
        //         // 属性如果通过 $ 开头，则默认不会挂载到 vm 上，即没有 vm.$$state
        //         // 数据在哪里使用，vue 就会收集依赖
        //         $$state: this.options.state
        //     },
        //     computed
        // })
    }

    replaceState(state) {
        this._vm._data.$$state = state
    }

    subscribe(callback) {
        // 传入 mutation 和 state
        this._subscribes.push(callback)
    }

    commit = (key, payload) => {
        if (!this._mutations[key]) {
            console.error('没有 mutation:' + key)
            return
        }
        return this._mutations[key].forEach(mutation => mutation(payload))
    }

    dispatch = (key, payload) => {
        if (!this._actions[key]) {
            console.error('没有 action:' + key)
            return
        }
        return this._actions[key].forEach(action => action(payload))
    }

    get state() {
        return this._vm._data.$$state
    }
}


export const install = (_Vue) => {
    Vue = _Vue
    applyMixin(Vue)
}

