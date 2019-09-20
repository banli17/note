---
title: vue 知识点
sidebar_label: 知识点
---

前端最重要的两个工作:

1. 数据渲染到页面
2. 处理用户交互


## 响应式原理

修改 this.msg 时，视图 {{message}} 变化？

如果不用 vue，我们会监听事件，修改数据，手动渲染 dom。它和 vue 的区别就是手动渲染 dom。问题是：

1. 修改哪块 dom?
1. 手动渲染 dom 效率和性能最高？
1. 每次数据修改都修改 dom?
1. 需要针对每个项目都这样修改 dom 逻辑？

### 响应式对象

Object.defineProperty 只支持 ie8+。

```js
Object.defineProperty(obj, prop, descriptor)

configurable
enumerable
get() set()
writable value
```


```js
function _init(){
    initState(vm)
}
function initState(vm){
    initProps()
    initMethods()
    initData()
    initComputed()
    initWatch()
}
function initProps(){
    const keys = vm.$options._propKeys = []
    const props = vm._props = {}
    for(const key in propsOptions){
        keys.push(key)
        value = validateProp()
        defineReactive(props, key, value)  // 将 props 变成响应式
        proxy(vm, `_props`, key)  //  vm.x = vm._props.x  这样就可以通过 this.msg 访问到 props上的属性
    }
}
function initData(vm){
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? getData() : data || {}
    if (!isPlainObject(data)) { data = {} }   // 保证data是{}基本对象类型

    let i = keys.length
    while(i--){
        if(hasOwn(methods, key)){ warn(`已经在 data 里定义了`) }
        if(hasOwn(props, key)){ warn(`在 props 重复声明了，用 prop default value代替`) }
        const key = keys[i]
        proxy(vm, `_data`, key)
    }
    observe(data, true)  // 观测 data 的变化
}
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,   // noop 就是空函数 ()=>{}
    set: noop
}
function proxy(target, sourceKey, key){
    sharedPropertyDefinition.get = function proxyGetter(){
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val){
        this[sourceKey][key] = val
    }
    // proxy(vm, `_data`, key)  
    // 就相当于 vm[key] = {get(){return vm._data[key],set(val){ vm._data[key] = val} }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
function observe(value, asRootData){
    // 非对象或 是VNode对象 直接返回
    if(!isObject(value) || value instanceof VNode) return 

    let ob
    if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer){
        ob = value.__ob__
    }else{
        ob = new Observer(value)
    }
    if(asRootData && ob){
        ob.vmCount ++
    }
    return ob
}

// 给对象添加 getter 和 setter，用于依赖收集和派发更新
class Observer{
    constructor(value){
        this.value = value
        this.dep = new Dep()
        this.vmCount = 0
        def(value, '__ob__', this) // vm.$options.data.__ob__ = this
        if(Array.isArray(value)){
            this.observeArray(value)
        }else{
            this.walk(value)
        }
    }
    walk(obj){
        const keys = Object.keys(obj)
        for(let i=0;i<keys.length;i++){
            defineReactive(obj, keys[i])
        }
    }
    observeArray(items){
        for(let i=0,l=items.length;i<l;i++){
            observe(items[i])  
        }
    }
}
function defineReactive(obj, key, value){
    const dep = new Dep()

    // 如果不可配置，直接返回
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if(property && property.configurable === false){
        return 
    }

    // 迎合预定义的 getter 和 setter

    // 响应式 
    Object.defineProperty(obj, key, {
        get(){
            const value = getter ? getter.call(obj) : val
            if(Dep.target){
                dep.depend()
                if(childOb){
                    childOb.dep.depend()
                    if(Array.isArray(value)){
                        dependArray(value)
                    }
                }
            }
            return value
        },
        set(newVal){
            if(newVal === value || (newVal !== newVal && value !== value)) return 

            val = newVal
            childOb = !shallow && observe(newVal)
            dep.notify()
        }
    })

}
```

initProps()做了2件事:
1. 将 props 变为响应式
2. 将每个值 vm._props.x 代理到 vm.x

initData()做了2件事:
1. 把每个值 vm._data.x 代理到 vm.x
2. observe(data)，把 data 变成响应式，可以通过 vm._data.x 访问到定义在 data 中的属性

proxy的作用是，将 props 和 data 上的属性代理到 vm 上，所以可以通过 this.msg 访问到 props 或 data 里的属性。

observer() 的作用是给非 VNode 对象添加一个 Observer，如果已经添加过，则直接返回。

defineReactive() 是递归整个 obj 对象，添加 getter和setter 属性。
getter 做依赖收集，setter 做派发更新。


### 依赖收集

Dep 

```js
let uid = 0
class Dep{
    constructor(){
        this.id = uid++
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    removeSub(sub){
        remove(this.subs, sub)
    }
    depend(){
        if(Dep.target){
            Dep.target.addDep(this)
        }
    }
    notify(){
        const subs = this.subs.slice()
        for(let i = 0, l = subs.length;i < l; i++){
            subs[i].update()
        }
    }
}
Dep.target = null 
const targetStack = []
function pushTarget(_target){
    if(Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}
function popTarget(){
    Dep.target = targetStack.pop()
}
```

Dep 实际是对 Watcher 的管理。

```
class Watcher {

}
```