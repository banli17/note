---
title: "vue源码分析系列(1)：Vue初始化做了什么"
date: 2018-04-22 10:37:21
tags:
toc: true
---

## 本节目标

数据驱动就是如何将数据显示在页面上，这节主要介绍vue data里的数据是如何显示到页面上的。即下面代码的执行过程：

```html
<div id='app'>
    {{ message }}
</div>

new Vue({
    el: '#app',
    data: {
        message: 'hello world!'
    }
})
```

## new Vue发生了什么

当new Vue执行时，它实际去执行了`src/core/instance/index.js`文件中的代码，如下：

```javascript
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
```

Vue是一个构造函数，所以不能通过函数方式执行，否则会报警告，并报错，因为函数执行this是window，`this._init()`会报错。

`initMixin(Vue)`的时候混入添加了`_init`方法，在`src/core/instance/init.js`里。

```javascript
export function initMixin(Vue: Class<Component>) {
    Vue.prototype._init = function (options?: Object) {
        const vm: Component = this

        // 合并new Vue(options)参数即 options配置，先跳过
        if (options && options._isComponent) {
            initInternalComponent(vm, options)
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            )
        }

        // 设置_renderProxy，线上环境是vm，后面会用到
        if (process.env.NODE_ENV !== 'production') {
            initProxy(vm)
        } else {
            vm._renderProxy = vm
        }

        vm._self = vm
        initLifecycle(vm)
        initEvents(vm)
        initRender(vm)    // 挂vm._render()方法
        callHook(vm, 'beforeCreate')
        initInjections(vm) 
        initState(vm)    // 初始化状态：data\props\computed\methods\watch
        initProvide(vm)
        callHook(vm, 'created')

        if (vm.$options.el) {
            vm.$mount(vm.$options.el)   // 挂载元素到真实DOM
        }
    }
}
```

上面的代码，我删掉了很多与本节目标无关的代码。可以看到，`_init()`主要就是合并配置，将options放在了vm.$options上，初始化生命周期、事件、render、state，调用beforeCreate、created钩子等。

## initState()

`initState()`就是初始化状态，它定义在同目录的`src/core/instance/state.js`文件里：

```javascript
export function initState(vm: Component) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
        initData(vm)  // 初始化数据
    } else {
        observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch)
    }
}
```

可以看到状态包括属性、data数据、method方法、computed、watch。我们主要看数据的初始化，即`initData(vm)`，它定义在同一个文件里。

```javascript
function initData(vm: Component) {
    let data = vm.$options.data  

    // 将vm.$options.data赋值给了data和vm_data
    data = vm._data = typeof data === 'function'
        ? getData(data, vm)
        : data || {}

    // data如果不是对象，就报错
    if (!isPlainObject(data)) {
        data = {}
        process.env.NODE_ENV !== 'production' && warn(
            'data functions should return an object:\n' +
            'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
            vm
        )
    }
    // proxy data on instance
    const keys = Object.keys(data)
    const props = vm.$options.props
    const methods = vm.$options.methods
    let i = keys.length
    while (i--) {
        const key = keys[i]
        if (process.env.NODE_ENV !== 'production') {
            if (methods && hasOwn(methods, key)) {
                warn(
                    `Method "${key}" has already been defined as a data property.`,
                    vm
                )
            }
        }
        if (props && hasOwn(props, key)) {
            process.env.NODE_ENV !== 'production' && warn(
                `The data property "${key}" is already declared as a prop. ` +
                `Use prop default value instead.`,
                vm
            )
        } else if (!isReserved(key)) {
            proxy(vm, `_data`, key)
        }
    }
    // observe data
    observe(data, true /* asRootData */)
}
```

上面的initData方法，首先将vm.$options.data(即我们写的data)放在局部data和vm._data上，然后看如果data不是一个对象`[object Object]`就警告并将data重置成`{}`。接着它对比了data和props、methods上是否有相同的属性(props、method的属性比较在其它地方以后介绍)，如果有则警告。没有则执行`proxy(vm, '_data', key)`。最后执行`observe(data, true)`，也就是数据变化修改视图，这个在响应原理再介绍。现在主要来看看`proxy(vm, '_data', key)`方法干了什么。

```javascript
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export function proxy(target: Object, sourceKey: string, key: string) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

上面代码可以看到，`proxy(vm, '_data', key)`实际就是将`vm[key]`代理到了`vm._data[key]`。所以当我们在方法里访问`this.message`的时候，它实际去访问了`this._data.message`(也就是前面的vm.$options.data)。这就是为什么 this.message 能访问到 data 里定义的 message 的原因。


## $mount()

前面我们在_init方法里看到最后Vue是将el挂载了一下。

```javascript
// _init()最后一句
if (vm.$options.el) {
    vm.$mount(vm.$options.el)   // 挂载元素到真实DOM
}
```

那么就来看看$mount方法做了什么。它在`src/platform/web/entry-runtime.js`和`src/platform/web/entry-runtime-with-compiler.js`里都有。如果我们需用了编译版本，来看看代码：

```javascript
// entry-runtime-with-compiler.js
// 缓存 entry-runtime.js 里的$mount
const mount = Vue.prototype.$mount

// 重新定义$mount
Vue.prototype.$mount = function (
    el?: string | Element,
    hydrating?: boolean
): Component {
    el = el && query(el)

    // 不要挂载到 <body> <html> 上，因为元素不是当child插入，而是替换的
    // 如果是body，body会被 <div id=app>替换，html文档就有问题了
    if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
            `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }

    const options = this.$options
    // resolve template/el and convert to render function
    if (!options.render) {
        let template = options.template
        if (template) {
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    // 将 template尝试去转 dom
                    template = idToTemplate(template)
                    if (process.env.NODE_ENV !== 'production' && !template) {
                        warn(
                            `Template element not found or is empty: ${options.template}`,
                            this
                        )
                    }
                }
            } else if (template.nodeType) {
                template = template.innerHTML
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    warn('invalid template option:' + template, this)
                }
                return this
            }
        } else if (el) {
            // 如果写了 el，获取outerHTML
            template = getOuterHTML(el)
        }
        if (template) {
            const {render, staticRenderFns} = compileToFunctions(template, {
                shouldDecodeNewlines,
                shouldDecodeNewlinesForHref,
                delimiters: options.delimiters,
                comments: options.comments
            }, this)
            options.render = render
            options.staticRenderFns = staticRenderFns
        }
    }
    return mount.call(this, el, hydrating)
}
```

可以看到编译版本的$mount()方法，首先按照el去页面获取dom，如果el是html或body，则提示异常，因为其实我们写的`el:'#app'`会创建元素并将页面上的`<div id='app'>`替换掉，所以如果挂载在body上，它会将body替换，这样html文档就错误了。

如果没有写`render`，它会去找template，并尝试将template执行下面操作：

1. template是`'#app'`形式，会查找这个dom
2. template是个dom，就获取dom的innerHTML
3. template无法解析，警告

如果我们没有写template，会解析el，获取el的outerHTML并赋值给template。最后将template通过 compileToFunctions函数解析为render函数，挂载在`options.render`上。

所以总结来说，它就是会努力将template、el 都转成 render，挂载在`vm.$options.render`上，最后执行`mount.call(this, el, hydrating)`。

这里的mount就是缓存的`entry-runtime.js`里的$mount。因为runtimeOnly版本不需要编译，即不能写template(会警告，因为消耗性能)。里面的$mount方法也是可以直接供runtimeOnly版使用的。

```javascript
// entry-runtime.js 实际引用的 ./runtime/index.js
import { mountComponent } from 'core/instance/lifecycle'
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

它执行了`core/instance/lifecycle`中的`mountComponent()`方法，因为它是属于生命周期执行的方法。

```javascript
// core/instance/lifecycle
export function mountComponent(
    vm: Component,
    el: ?Element,
    hydrating?: boolean
): Component {
    vm.$el = el
    // 所以，使用runtimeOnly版本，写template会报这句警告，因为没有编译template
    if (!vm.$options.render) {
        vm.$options.render = createEmptyVNode
        if (process.env.NODE_ENV !== 'production') {
            /* istanbul ignore if */
            if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
                vm.$options.el || el) {
                warn(
                    'You are using the runtime-only build of Vue where the template ' +
                    'compiler is not available. Either pre-compile the templates into ' +
                    'render functions, or use the compiler-included build.',
                    vm
                )
            } else {
                warn(
                    'Failed to mount component: template or render function not defined.',
                    vm
                )
            }
        }
    }

    let updateComponent
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        // 性能埋点相关代码，先忽略
    } else {
        updateComponent = () => {
            vm._update(vm._render(), hydrating)
        }
    }

    // 执行beforeMount钩子
    callHook(vm, 'beforeMount')

    // 新建一个观察者，当数据变化时，执行updateComponent方法
    new Watcher(vm, updateComponent, noop, {
        before() {
            if (vm._isMounted) {
                // 执行beforeUpdate钩子
                callHook(vm, 'beforeUpdate')
            }
        }
    }, true )
    hydrating = false

    // 执行mounted钩子
    if (vm.$vnode == null) {
        vm._isMounted = true
        callHook(vm, 'mounted')
    }
    return vm
}
```

上面代码可以看到，当执行$mount时，runtimeOnly版本不会编译template。之后执行beforeMount钩子，创建了数据更新刷新组件的观察者。这里updateComponent方法在执行后，dom会生成并插入页面中，所以我们才能在mounted钩子里够操作dom，下面来看看`updateComponent()`方法，可以看到它实际是执行了`vm._update()`和`vm._render()`方法。这个方法同样定义在`src/core/instance/lifecycle.js`，

```javascript
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    // 关键
    if (!prevVnode) {
        // 如果是首次，#app不是vnode，就用虚拟节点创建的dom替换页面的#app
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
        // 新虚拟DOM替换旧的虚拟DOM
        vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    if (prevEl) {
        prevEl.__vue__ = null
    }
    if (vm.$el) {
        vm.$el.__vue__ = vm
    }
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el
    }
}
```

上面代码的关键就是标注的那句`vm.__patch__(prevVnode,vnode)`它是用虚拟dom的技术，替换新旧节点。上面`vm._render()`就返回了新节点。而`vm.__patch`执行了diff和生成实际DOM。

## 总结

本节主要将了new Vue都干了些什么，下一节将会介绍虚拟DOM是如何转成真实DOM的。

下面一节，将会介绍通过vnode创建元素，并插入到页面的过程。









new Vue发生了什么
Vue 
_init
initData

为什么访问 this.msg 能访问到 data上的数据？
为什么用代理proxy？

挂载
runtime+compiler  $mount


el -> render -> template -> 转render  都转render， -> runtime only $mount -> mountComponent

如果用了runtime 只写了 template 就警告

render

_render()  -> initRender -> $createElement(手写render函数提供的方法)  |  ->  initProxy()  es6proxy -> hasHandler -> 