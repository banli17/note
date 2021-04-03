import {arrayMethods} from './array'
import {defineProperty} from "../utils";
import Dep from "./dep";

class Observer {
    constructor(value) {
        // 1. 挂 dep，用于数组的更新，通过 dep 可以找到数组的 watcher
        // 2. 对象的 Vue.$set 方法也要用到
        this.dep = new Dep()

        // 这里给 value 增加 __ob__ 但是不能被枚举，否则会死循环
        // 另外 array 里新数据 监测也要用到 observeArray 方法
        defineProperty(value, '__ob__', this)

        // 使用 defineProperty 重写属性
        // console.log(value)
        if (Array.isArray(value)) {
            // 如果是数组，就不要对索引进行 definePropery 了，为了性能
            value.__proto__ = arrayMethods
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    observeArray(value) {
        value.forEach(item => {
            observe(item)
        })
    }

    walk(value) {
        Object.keys(value).forEach(key => {
            defineReactive(value, key, value[key])
        })
    }
}

function defineReactive(data, key, value) {
    const childDep = observe(value)

    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend()  // 说明走渲染了
                if (childDep) {
                    childDep.dep.depend() // 数组 depend
                }
            }
            // console.log('取值了')
            return value
        },
        set(newValue) {
            if (value === newValue) return
            // 如果是重写对象
            observe(newValue)
            // console.log('设置了值')
            value = newValue   // 这里 value 是个闭包

            dep.notify()
        }
    })
}

export function observe(data) {
    // console.log('observe', data)
    if (typeof data !== 'object' || data === null) {
        // console.error('data 必须是对象或函数')
        return
    }
    // 有 __ob__ 表示被拦截了的
    if (data.__ob__ instanceof Observer) {
        return data
    }
    return new Observer(data)
}
