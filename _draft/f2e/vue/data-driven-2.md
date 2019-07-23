---
title: "vue源码分析系列(2)：从虚拟DOM到真实DOM"
date: 2016-08-15 01:25:22
tags:
---

从虚拟DOM到真实的DOM，vue主要执行代码是:

```javascript
vm._update(vm._render(), hydrating)
```

这句代码执行了下面几个过程：

- `_render()`: 生成虚拟节点VNode
- `_update()`: 根据VNode来进行patch()
- `patch()`: 就是用来对比新旧节点，更新真实节点的

下面来看看这几个流程。

## render()

vue 在初始化的时候执行了 initRender，和 renderMixin()。renderMixin()在Vue上添加了 _render() 方法。

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

可以看到_render方法返回了一个vnode，这个vnode是通过`render.call(vm._renderProxy, vm.$createElement)`生成的，vm._renderProxy在生产环境就是vm。所以它相当于是调用`vm.render(vm.$createElement)`。vm.$createElement也就是我们经常写的`render: h=>h(App)`里的h函数。它的定义如下：

```javascript
// initRender
export function initRender(vm: Component) {
    // template编译执行这个方法
    vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    // 手写render执行这个方法
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
}
```

createElement主要做的事情就是参数重载，设置子元素的normalizationType。

```javascript
// src/core/vdom/create-element.js
const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2
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
        normalizationType = children
        children = data
        data = undefined
    }
    // 设置normalizationType
    if (isTrue(alwaysNormalize)) {
        normalizationType = ALWAYS_NORMALIZE
    }
    return _createElement(context, tag, data, children, normalizationType)
}
```

## normalizationType

normalizationType主要是和处理子元素的。

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


initRender里主要给实例上定义了$createElement方法。



createElement  生成 vnode
vm._c 模版编译的render函数
vm.$createElement 用户手写的

vdom/create-element.js

alwaysNormalize: 

参数的重载

createEmptyVnode

. children 做normalize  children都是数组  vdom/helpers/normalize-children.js

simpleNormalizeChildren 拍平一维数组
normalize 也是要返回一维数组
- 都是文件节点，合并
- 递归

- 平台内置标签
- 组件
- 不认识

vm._render() 返回 vnode

_update 将vnode 变成dom   instance/lifecycle.js

__patch__ 在 platform/web/runtime/index

createPathFunction : 执行hook生命周期
    - node-ops.js  dom操作
    - modules: 属性 class的钩子函数，patch中会调用

patch 函数科里化思想， 平台的node-ops, modules是不一样的


