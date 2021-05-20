# 什么是数据驱动

Vue.js 一个核心思想是数据驱动，即视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据来完成。这样做的好处是：

1. 直接修改数据，代码逻辑简化和清晰
2. 不用操作 DOM，利于维护

```js
<div id="app">
  {{ message }}
</div>

<script>
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
</script>
```

上面代码将在页面上显示出 `Hello Vue`，在 Vue.js 内部是如何让模版加数据渲染成最终真实 DOM 的?大体代码如下：

```js
function Vue(options) {
  this._init(options);
}
initMixin(Vue);

function initMixin(Vue) {
  Vue.prototype._init = function () {
    // ...初始化数据、生命周期、方法等

    if (vm.$options.el) {
      vm.$mount(vm.$options.el); // mounteComponent
    }
  };
}

Vue.prototype.$mount = function (el) {
  return mountComponent(this, el);
};

function mountComponent() {
  let updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };
  new Watcher(vm, updateComponent);
}

Vue.prototype._render = function (el) {
  vnode = render.call(vm._renderProxy, vm.$createElement);
  return vnode;
};

Vue.prototype._update = function (vnode) {
  if (!prevVnode) {
    // 初始化渲染
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // 更新
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
};

Vue.prototype.__patch__ = createPatchFunction()
function createPatchFunction(){
  return patch(oldVnode, vnode){
    // ... 里面有新创建 dom 和更新dom的逻辑省略
    createElm(vnode, parentElm)
  }
}
function createElm(vnode, parentElm){
  if(tag){
    createElement(tag, vnode)
    insert(parentElm, vnode.elm, refElm)
  }else{
    createTextNode(vnode.text)
    insert(parentElm, vnode.elm, refElm)
  }
}

function insert (parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
        parent.insertBefore(newNode, ref)
    } else {
      parent.appendChild(elm)
    }
  }
}
```

所以从 new Vue() 到页面渲染的过程是：

1. new Vue 会触发 `_init`，在 `_init` 里会初始化一些数据、事件、生命周期等，如果有 el，就会调用 $mount 方法进行挂载
2. $mount 实际调用了 mountComponent，其内部会实例化一个 Watcher，并在第一次实例化和更新时会触发回调函数 updateComponent。
3. updateComponent 首先会通过 `vm._render()` 生成新的 vnode 节点，然后调用 `_update(vnode)` 方法进行更新。
4. `_update()` 方法内部调用了 `__patch__`方法，其内部还会去比较新旧 vnode，然后根据具体情况去更新或创建真实的 DOM 并渲染到页面上。

![](./imgs/2021-05-06-16-56-51.png)

接下来将详细介绍每个过程。
