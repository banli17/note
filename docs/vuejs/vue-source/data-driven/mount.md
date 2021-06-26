# 实例挂载 $mount

$mount 这个方法的实现是和平台、构建方式都相关的，不同的平台 $mount 不同。这里重点看 `src/platform/web/entry-runtime-with-compiler.js` 版本里的 $mount。

```js
const mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  // el 不能是 html 或 body
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
          template = idToTemplate(template);
          /* istanbul ignore if */
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
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== "production" && config.performance && mark) {
        mark("compile");
      }

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

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== "production" && config.performance && mark) {
        mark("compile end");
        measure(`vue ${this._name} compile`, "compile", "compile end");
      }
    }
  }
  return mount.call(this, el, hydrating);
};
```

上面代码所做的事情：

1. 缓存 runtime 版本的 $mount，因为它是可以被 runtime only 版本的 Vue 直接使用的。

```js
// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean // 与服务端渲染相关
): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
```

2. el 挂载的节点不能是 body 和 html。
3. 如果没有 render，会将 template 或 el.outerHTML 通过 compileToFunctions 方法编译成 render。
4. 最后调用缓存的 mount 方法进行挂载，el 可以传入的选择器或者元素节点，它会通过 query 进行转化成 dom。

```js
export function query(el: string | Element): Element {
  if (typeof el === "string") {
    const selected = document.querySelector(el); // queuySelector
    if (!selected) {
      process.env.NODE_ENV !== "production" &&
        warn("Cannot find element: " + el);
      return document.createElement("div");
    }
    return selected;
  } else {
    return el; // 返回dom元素
  }
}
```

5. mount 实际会调用 mountComponent 进行最终的挂载。

```js
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;
  // 如果没有 render，会返回一个生成空节点的函数
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    // ...
  }
  callHook(vm, "beforeMount");

  let updateComponent;

  updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, "beforeUpdate");
        }
      },
    },
    true /* isRenderWatcher */
  );
  hydrating = false;

  // vm.$vnode 表示实例的 parentVNode，为 null 表示它是根节点
  if (vm.$vnode == null) {
    vm._isMounted = true; // 表示实例已经挂载
    callHook(vm, "mounted");
  }
  return vm;
}
```

mountComponent 内部实例化了一个 Watcher，在回调中执行 updateComponent，它会先通过 vm.\_render 生成 vnode，然后调用 vm.\_update 更新 DOM。

这里的 Watch 的 updateComponent 会在初始化和更新时调用。

```
updateComponent = () => {
    vm._update(vm._render(), hydrating);
};
```
