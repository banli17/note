import {observe} from './observer/index'
import {proxy, nextTick,} from "./utils";
import Watcher from './observer/watcher'
import Dep from "./observer/dep";

export function initState(vm) {
    console.log(vm)
    const opts = vm.$options
    if (opts.props) initProps(vm)
    if (opts.methods) initMethods(vm)
    if (opts.data) initData(vm)
    if (opts.computed) initComputed(vm)
    if (opts.watch) initWatch(vm)
}

function initProps() {

}

function initMethods() {

}

function initData(vm) {
    let data = vm.$options.data
    console.log('initData', vm)
    // data 可能是对象 或函数
    data = typeof data === 'function' ? data.call(vm) : data
    vm._data = data

    // 代理
    for (let key in data) {
        proxy(vm, '_data', key)
    }

    // 将data变为响应式
    observe(data)
    console.log(vm._data.a)
}

function initComputed(vm) {
    const watcher = vm._computedWatchers = {}
    let computed = vm.$options.computed
    console.log(computed)
    for (let key in computed) {
        const userDef = computed[key]
        const getter = typeof userDef === 'function' ? userDef : userDef.get

        // 懒 watcher，lazy 就是计算属性，依赖收集
        // 每个 computed 里的属性都有一个 watcher
        watcher[key] = new Watcher(vm, getter, () => {
        }, {lazy: true})
        // 将computed 的 key 全挂到 vm 上
        defineComputed(vm, key, userDef)
    }
}

function defineComputed(vm, key, userDef) {
    const sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: () => {
        },
        set: () => {
        }
    }
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key)
    } else {
        sharedPropertyDefinition.get = createComputedGetter(key)
        sharedPropertyDefinition.set = userDef.set
    }
    Object.defineProperty(vm, key, sharedPropertyDefinition)
}

// 计算属性的缓存
function createComputedGetter(key) {
    return function () {
        // 计算属性的 watcher
        const watcher = this._computedWatchers[key]
        if (watcher) {
            if (watcher.dirty) {
                // 计算属性求值
                watcher.evaluate()
            }
            // 如果 Dep.target 还有值，就也收集
            if (Dep.target) {
                console.log('gggggg')
                watcher.depend()
            }

            return watcher.value
        }
    }
}

function initWatch(vm) {
    let watch = vm.$options.watch

    for (let key in watch) {
        const handler = watch[key]
        if (Array.isArray(handler)) {  // 数组
            handler.forEach(handle => {
                createWatcher(vm, key, handle)
            })
        } else {
            createWatcher(vm, key, handler)  // 对象 字符串 函数
        }
    }
}

// key 可以是一个函数，是执行后的结果
// options 可以标记watcher是用户watcher
function createWatcher(vm, exprOrFn, handler, options) {
    if (typeof handler === "object") {
        options = handler  // {immediate, deep ,sync}
        handler = handler.handler
    }
    if (typeof handler === 'string') {
        handler = vm[handler]
    }

    return vm.$watch(exprOrFn, handler, options)
}

export function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
        nextTick(cb)
    }

    Vue.prototype.$watch = function (exprOrFn, handler) {
        new Watcher(this, exprOrFn, handler, {
            user: true
        })
    }
}
