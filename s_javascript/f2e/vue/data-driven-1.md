---
title: "vue源码分析系列(1)：Vue初始化做了什么"
date: 2018-04-22 10:37:21
tags:
toc: true
---

## 本节目标

数据驱动就是如何将数据显示在页面上，这节主要介绍 vue data 里的数据是如何显示到页面上的。即下面代码的执行过程：

```html
<div id="app">
  {{ message }}
</div>

new Vue({ el: '#app', data: { message: 'hello world!' } })
```

## new Vue 发生了什么

当 new Vue 执行时，它实际去执行了`src/core/instance/index.js`文件中的代码，如下：

```javascript
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
```

Vue 是一个构造函数，所以不能通过函数方式执行，否则会报警告，并报错，因为函数执行 this 是 window，`this._init()`会报错。

`initMixin(Vue)`的时候混入添加了`_init`方法，在`src/core/instance/init.js`里。

```javascript
export function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this;

    // 合并new Vue(options)参数即 options配置，先跳过
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }

    // 设置_renderProxy，线上环境是vm，后面会用到
    if (process.env.NODE_ENV !== "production") {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }

    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm); // 挂vm._render()方法
    callHook(vm, "beforeCreate");
    initInjections(vm);
    initState(vm); // 初始化状态：data\props\computed\methods\watch
    initProvide(vm);
    callHook(vm, "created");

    if (vm.$options.el) {
      vm.$mount(vm.$options.el); // 挂载元素到真实DOM
    }
  };
}
```

上面的代码，我删掉了很多与本节目标无关的代码。可以看到，`_init()`主要就是合并配置，将 options 放在了 vm.\$options 上，初始化生命周期、事件、render、state，调用 beforeCreate、created 钩子等。

## initState()

`initState()`就是初始化状态，它定义在同目录的`src/core/instance/state.js`文件里：

```javascript
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm); // 初始化数据
  } else {
    observe((vm._data = {}), true /* asRootData */);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

可以看到状态包括属性、data 数据、method 方法、computed、watch。我们主要看数据的初始化，即`initData(vm)`，它定义在同一个文件里。

```javascript
function initData(vm: Component) {
  let data = vm.$options.data;

  // 将vm.$options.data赋值给了data和vm_data
  data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};

  // data如果不是对象，就报错
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== "production" &&
      warn(
        "data functions should return an object:\n" +
          "https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",
        vm
      );
  }
  // proxy data on instance
  const keys = Object.keys(data);
  const props = vm.$options.props;
  const methods = vm.$options.methods;
  let i = keys.length;
  while (i--) {
    const key = keys[i];
    if (process.env.NODE_ENV !== "production") {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== "production" &&
        warn(
          `The data property "${key}" is already declared as a prop. ` +
            `Use prop default value instead.`,
          vm
        );
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}
```

上面的 initData 方法，首先将 vm.\$options.data(即我们写的 data)放在局部 data 和 vm.\_data 上，然后看如果 data 不是一个对象`[object Object]`就警告并将 data 重置成`{}`。接着它对比了 data 和 props、methods 上是否有相同的属性(props、method 的属性比较在其它地方以后介绍)，如果有则警告。没有则执行`proxy(vm, '_data', key)`。最后执行`observe(data, true)`，也就是数据变化修改视图，这个在响应原理再介绍。现在主要来看看`proxy(vm, '_data', key)`方法干了什么。

```javascript
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

上面代码可以看到，`proxy(vm, '_data', key)`实际就是将`vm[key]`代理到了`vm._data[key]`。所以当我们在方法里访问`this.message`的时候，它实际去访问了`this._data.message`(也就是前面的 vm.\$options.data)。这就是为什么 this.message 能访问到 data 里定义的 message 的原因。

## \$mount()

前面我们在\_init 方法里看到最后 Vue 是将 el 挂载了一下。

```javascript
// _init()最后一句
if (vm.$options.el) {
  vm.$mount(vm.$options.el); // 挂载元素到真实DOM
}
```

那么就来看看\$mount 方法做了什么。它在`src/platform/web/entry-runtime.js`和`src/platform/web/entry-runtime-with-compiler.js`里都有。如果我们需用了编译版本，来看看代码：

```javascript
// entry-runtime-with-compiler.js
// 缓存 entry-runtime.js 里的$mount
const mount = Vue.prototype.$mount;

// 重新定义$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  // 不要挂载到 <body> <html> 上，因为元素不是当child插入，而是替换的
  // 如果是body，body会被 <div id=app>替换，html文档就有问题了
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== "production" &&
      warn(
        `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
      );
    return this;
  }

  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === "string") {
        if (template.charAt(0) === "#") {
          // 将 template尝试去转 dom
          template = idToTemplate(template);
          if (process.env.NODE_ENV !== "production" && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== "production") {
          warn("invalid template option:" + template, this);
        }
        return this;
      }
    } else if (el) {
      // 如果写了 el，获取outerHTML
      template = getOuterHTML(el);
    }
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }
  return mount.call(this, el, hydrating);
};
```

可以看到编译版本的\$mount()方法，首先按照 el 去页面获取 dom，如果 el 是 html 或 body，则提示异常，因为其实我们写的`el:'#app'`会创建元素并将页面上的`<div id='app'>`替换掉，所以如果挂载在 body 上，它会将 body 替换，这样 html 文档就错误了。

如果没有写`render`，它会去找 template，并尝试将 template 执行下面操作：

1. template 是`'#app'`形式，会查找这个 dom
2. template 是个 dom，就获取 dom 的 innerHTML
3. template 无法解析，警告

如果我们没有写 template，会解析 el，获取 el 的 outerHTML 并赋值给 template。最后将 template 通过 compileToFunctions 函数解析为 render 函数，挂载在`options.render`上。

所以总结来说，它就是会努力将 template、el 都转成 render，挂载在`vm.$options.render`上，最后执行`mount.call(this, el, hydrating)`。

这里的 mount 就是缓存的`entry-runtime.js`里的$mount。因为runtimeOnly版本不需要编译，即不能写template(会警告，因为消耗性能)。里面的$mount 方法也是可以直接供 runtimeOnly 版使用的。

```javascript
// entry-runtime.js 实际引用的 ./runtime/index.js
import { mountComponent } from "core/instance/lifecycle";
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
```

它执行了`core/instance/lifecycle`中的`mountComponent()`方法，因为它是属于生命周期执行的方法。

```javascript
// core/instance/lifecycle
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;
  // 所以，使用runtimeOnly版本，写template会报这句警告，因为没有编译template
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== "production") {
      /* istanbul ignore if */
      if (
        (vm.$options.template && vm.$options.template.charAt(0) !== "#") ||
        vm.$options.el ||
        el
      ) {
        warn(
          "You are using the runtime-only build of Vue where the template " +
            "compiler is not available. Either pre-compile the templates into " +
            "render functions, or use the compiler-included build.",
          vm
        );
      } else {
        warn(
          "Failed to mount component: template or render function not defined.",
          vm
        );
      }
    }
  }

  let updateComponent;
  if (process.env.NODE_ENV !== "production" && config.performance && mark) {
    // 性能埋点相关代码，先忽略
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };
  }

  // 执行beforeMount钩子
  callHook(vm, "beforeMount");

  // 新建一个观察者，当数据变化时，执行updateComponent方法
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          // 执行beforeUpdate钩子
          callHook(vm, "beforeUpdate");
        }
      },
    },
    true
  );
  hydrating = false;

  // 执行mounted钩子
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }
  return vm;
}
```

上面代码可以看到，当执行\$mount 时，runtimeOnly 版本不会编译 template。之后执行 beforeMount 钩子，创建了数据更新刷新组件的观察者。这里 updateComponent 方法在执行后，dom 会生成并插入页面中，所以我们才能在 mounted 钩子里够操作 dom，下面来看看`updateComponent()`方法，可以看到它实际是执行了`vm._update()`和`vm._render()`方法。这个方法同样定义在`src/core/instance/lifecycle.js`，

```javascript
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this;
  const prevEl = vm.$el;
  const prevVnode = vm._vnode;
  const prevActiveInstance = activeInstance;
  activeInstance = vm;
  vm._vnode = vnode;
  // 关键
  if (!prevVnode) {
    // 如果是首次，#app不是vnode，就用虚拟节点创建的dom替换页面的#app
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // 新虚拟DOM替换旧的虚拟DOM
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  activeInstance = prevActiveInstance;
  if (prevEl) {
    prevEl.__vue__ = null;
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm;
  }
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el;
  }
};
```

上面代码的关键就是标注的那句`vm.__patch__(prevVnode,vnode)`它是用虚拟 dom 的技术，替换新旧节点。上面`vm._render()`就返回了新节点。而`vm.__patch`执行了 diff 和生成实际 DOM。

## 总结

本节主要将了 new Vue 都干了些什么，下一节将会介绍虚拟 DOM 是如何转成真实 DOM 的。

下面一节，将会介绍通过 vnode 创建元素，并插入到页面的过程。

new Vue 发生了什么
Vue
\_init
initData

为什么访问 this.msg 能访问到 data 上的数据？
为什么用代理 proxy？

挂载
runtime+compiler \$mount

el -> render -> template -> 转 render 都转 render， -> runtime only \$mount -> mountComponent

如果用了 runtime 只写了 template 就警告

render

\_render() -> initRender -> \$createElement(手写 render 函数提供的方法) | -> initProxy() es6proxy -> hasHandler ->

从虚拟 DOM 到真实的 DOM，vue 主要执行代码是:

```javascript
vm._update(vm._render(), hydrating);
```

这句代码执行了下面几个过程：

- `_render()`: 生成虚拟节点 VNode
- `_update()`: 根据 VNode 来进行 patch()
- `patch()`: 就是用来对比新旧节点，更新真实节点的

下面来看看这几个流程。

## render()

vue 在初始化的时候执行了 initRender，和 renderMixin()。renderMixin()在 Vue 上添加了 \_render() 方法。

```
export function renderMixin(Vue: Class<Component>) {
    Vue.prototype._render = function (): VNode {
        const vm: Component = this
        const {render, _parentVnode} = vm.$options

        // set parent vnode. this allows render functions to have access
        // to the data on the placeholder node.
        vm.$vnode = _parentVnode
        // render self
        let vnode
        try {
            vnode = render.call(vm._renderProxy, vm.$createElement)
        } catch (e) {
            handleError(e, vm, `render`)
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
                try {
                    vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
                } catch (e) {
                    handleError(e, vm, `renderError`)
                    vnode = vm._vnode
                }
            } else {
                vnode = vm._vnode
            }
        }
        // return empty vnode in case the render function errored out
        if (!(vnode instanceof VNode)) {
            if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
                warn(
                    'Multiple root nodes returned from render function. Render function ' +
                    'should return a single root node.',
                    vm
                )
            }
            vnode = createEmptyVNode()
        }
        // set parent
        vnode.parent = _parentVnode
        return vnode
    }
}
```

可以看到\_render 方法返回了一个 vnode，这个 vnode 是通过`render.call(vm._renderProxy, vm.$createElement)`生成的，vm.\_renderProxy 在生产环境就是 vm。所以它相当于是调用`vm.render(vm.$createElement)`。vm.\$createElement 也就是我们经常写的`render: h=>h(App)`里的 h 函数。它的定义如下：

```javascript
// initRender
export function initRender(vm: Component) {
  // template编译执行这个方法
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  // 手写render执行这个方法
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}
```

createElement 主要做的事情就是参数重载，设置子元素的 normalizationType。

```javascript
// src/core/vdom/create-element.js
const SIMPLE_NORMALIZE = 1;
const ALWAYS_NORMALIZE = 2;
export function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  // 参数的重载，如果第三个参数是数组或基本类型
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  // 设置normalizationType
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
```

## normalizationType

normalizationType 主要是和处理子元素的。

```
export function simpleNormalizeChildren (children: any) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
export function normalizeChildren (children: any): ?Array<VNode> {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}
```

initRender 里主要给实例上定义了\$createElement 方法。

createElement 生成 vnode
vm.\_c 模版编译的 render 函数
vm.\$createElement 用户手写的

vdom/create-element.js

alwaysNormalize:

参数的重载

createEmptyVnode

. children 做 normalize children 都是数组 vdom/helpers/normalize-children.js

simpleNormalizeChildren 拍平一维数组
normalize 也是要返回一维数组

- 都是文件节点，合并
- 递归

- 平台内置标签
- 组件
- 不认识

vm.\_render() 返回 vnode

\_update 将 vnode 变成 dom instance/lifecycle.js

**patch** 在 platform/web/runtime/index

createPathFunction : 执行 hook 生命周期 - node-ops.js dom 操作 - modules: 属性 class 的钩子函数，patch 中会调用

patch 函数科里化思想， 平台的 node-ops, modules 是不一样的

## Object.defineProperty()

数据描述符：value 、writable
存取描述符: get、set
公有：configurable、enumerable

默认 get/set/value 都为 undefined，configurable/enumberable/writable 都为 false。

- `configurable: false` 表示属性不能被删除。只有当属性是`configurable: true`时，才能重新用`Object.definePropery()`定义，否则报错。
  configurable:true，不可写，因为 writable 默认是 false。

```javascript
a.name = "zs"; // 无效
delete a.name; // 无效
```

- writable 会重写 configurable 的修改。

严格模式下修改只读属性会 typeError 错误。

- enumerable:

## Object.keys(o)

`Object.keys(o)`返回一个对象自身可枚举属性组成的数组。和`for...in`的区别是`for...in`还会枚举原型链上的属性。

## obj.propertyIsEnumerable(key)

`Object.prototype.propertyIsEnumerable(key)`用来判断一个对象的属性是否可枚举。

## obj.hasOwnProperty(key)

判断属性是否是对象的自身属性，不管这个属性是否可枚举，只要是自身属性即可。

## 监控一个对象的读和写

- 对象是多层的：递归
- 对象里有数组

http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/
