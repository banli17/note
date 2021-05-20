# new Vue

先来看看 new Vue 时发生了什么？

Vue 是一个函数，代码如下：

```js
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
```

可以看到 Vue 只能通过 new 调用，在调用 new Vue 时，会执行 `this._init()` 方法。

```js
Vue.prototype._init = function (options?: Object) {
  const vm: Component = this;
  // a uid
  vm._uid = uid++;

  let startTag, endTag;
  // a flag to avoid this being observed
  vm._isVue = true;
  // merge options
  if (options && options._isComponent) {
    // optimize internal component instantiation
    // since dynamic options merging is pretty slow, and none of the
    // internal component options needs special treatment.
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    initProxy(vm);
  } else {
    vm._renderProxy = vm;
  }
  // expose real self
  vm._self = vm;
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, "beforeCreate");
  initInjections(vm); // resolve injections before data/props
  initState(vm);
  initProvide(vm); // resolve provide after data/props
  callHook(vm, "created");
  // ...
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};

export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  //
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

可以看到在执行 `this._init()` 方法初始化时，会合并配置、初始化生命周期、事件、render 方法、state(响应式数据包括 props, methods, data, computed, watch)。如果有 el，就会调用 $mount 方法进行挂载。
