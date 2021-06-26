# Vuex 原理

## 分析

我们在项目中初始化 Vuex 时，只做了 2 个步骤：

```js
// 步骤 1
Vue.use(Vuex)

// 步骤2
let store = new Vuex.Store({
  state,
  actions,
  modules:{...}
  ...
})
new Vue({
  store,
  render:(h)=>h(App)
})
```

## Vue.use(Vuex) 做了什么

`Vue.use(Vuex)`这一步会在所有组件上挂载 $store 属性（就我们创建的 store）。来看看具体是怎么做的。

### Vue.use

use 方法的源码如下：

```js
function (plugin: Function | Object) {
  // 1. 防止插件多次安装
  if (plugin.installed) {
    return
  }
  // 2. 给 args 最左边添加一个参数 this，即 Vue 构造函数
  const args = toArray(arguments, 1)
  args.unshift(this)

  // 3. 如果插件 install 方法，就执行 install，这里 args 的第一个参数是 Vue
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else {
    // 4. 如果没有 instal，插件是一个函数，就调用函数
    plugin.apply(null, args)
  }
  plugin.installed = true
  return this  // 返回 Vue
}
```

可以看到 use 方法实际会调用 `Vuex.install(Vue)` 方法进行挂载。

### Vuex.install

install 方法如下：

```js
let Vue;

export function install(_Vue) {
  // 1. 防止 install 方法多次调用，即插件多次安装
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        "[vuex] already installed. Vue.use(Vuex) should be called only once."
      );
    }
    return;
  }
  Vue = _Vue;

  applyMixin(Vue);
}
```

可以看到， install 就做了 2 件事情：

1. 防止自己被重复调用
2. 调用 `applyMixin(Vue)` 方法

### applyMixin

```js
export default function (Vue) {
  // 1. 获取 Vue 大版本号
  const version = Number(Vue.version.split(".")[0]);

  // 2. 如果是 Vue2 以上，就混入 beforeCreate: vuexInit
  // 也就是每个组件初始化时，都会执行 vuexInit
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // 3. 兼容 Vue1 版本，改写 _init 方法，并添加一个 vuexInit
    // 因为每个组件初始化都会执行 _init 方法，也就执行了 vuexInit
    const _init = Vue.prototype._init;
    Vue.prototype._init = function (options = {}) {
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }

  function vuexInit() {
    const options = this.$options; // Vue.$options
    // 1. 注入 store，调用 new Vue({store}) 时会传入 options.store
    if (options.store) {
      // 2. 添加 Vue.$store
      this.$store =
        typeof options.store === "function" ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      // 3. 子组件实例化时，会一层层的新增 $store 属性
      this.$store = options.parent.$store;
    }
  }
}
```

applyMixin 的目的是给所有组件添加一个 $store 属性，也就是我们`new Vue({store})`里的 store。它是这样做的：

1. Vue2 给所有组件混入`beforeCreate: vuexInit`，这样在组件初始化的时候就会执行。
2. 兼容 Vue1，因为组件的初始化会调用`Vue.prototype._init()`方法，所以在 `_init` 里给组件混入一个 init 方法，它会被执行。
3. vuexInit 执行时，会给组件添加 `$store` 属性，这样所有组件里都有 `this.$store` 了。

## new Store 做了什么

### Store 类

通过 `new Vuex.Store`可以看出，Vuex.Store 是一个类。

## 原理总结

- 通过 mixin 在所有组件的 beforeCreate 生命周期注入 vuexInit 方法，即给组件添加 $store 属性
- 初始化 store
  - `没 install && window.Vue` 会自动调用注册 Vuex
  - `new ModuleCollection` 收集模块，将配置转为一颗模块树
  - 绑定 dispatch、commit 里的 this
  - `installModule` 递归安装模块
    - 将所有模块扁平的放在 `store._modulesNamespaceMap` 对象中，属性 key 是命名空间，值是 module。
    - 将模块里的 state 通过 Vue.set 合并到 rootState 上，这样就是响应式的
    - 给每个模块添加一个 context 属性，它里面保存着每个模块私有的经过 namespace 化的 dispatch 和 commit。
    - 将所有模块的 mutations、actions、getters 全部扁平的放在 store 对应的 `store._mutations={}`、`store._actions={}`、`store._wrappedGetters={}` 里。其中 key 是经过 namespace 化的。
  - resetStoreVM: 创建一个 `store._vm` 实例，它使用 new Vue 绑定了 state 和 computed，这样就实现了数据刷新视图，且 getters 具有缓存的功能。
- 注册插件，循环 plugins 数组里的函数，并执行。
- dispatch 时,先 subAction.before，再 fn 最后 subAction.after
- commit 时，先 fn，再走 sub

难点： computed 的处理。

## 辅助函数

## mapState

1. 因为调用方式有三种，通过 normalizeNamespace 方法兼容参数 namespace 和 state

```
// 1. 没有namespace，namespace就是 ''
mapState(['age']) //
mapState({
  age: state=> state.age
})
// 2. namespace = 'a/'，末尾不是/需要添加/
mapState('a', ['age'])
```

2. mapState 的第二个参数可以是对象或数组，所以也通过 normalizeMap 方法兼容，将它们都转成形式为 `[{key,value}...]`的数组

```
['age']  // [{key: 0, val: 'age'}]
{age: state => state.age}  // [{key: 'age', val: state=>state.age}]
```

3. 返回当前模块(根、或子模块)的 state、getters 的对象，这样，页面上使用时就直接是读取的 state 里的数据了。

4. `...mapState` 是在 computed 里使用的，这样 state 就变成了

```
computed: {
  age: mappedState // 经过函数化了
}
```
