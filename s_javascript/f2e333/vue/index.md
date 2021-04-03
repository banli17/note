---
title: vue 知识点总结
sidebar_label: 知识点总结
---


## 虚拟 DOM 

### 什么是虚拟DOM

虚拟 DOM 就是利用一个简单的对象去代替复杂的 dom 对象。它实际是一种开发与性能的平衡。

人为的操作 DOM，理想情况下当然是性能最高的。但是开发起来非常复杂，每个地方都要手动操作 DOM，并且考虑性能。虚拟 DOM 库将操作 DOM 封装起来，我们不再需要操作 DOM，这可以大大提高开发效率。



### key 有什么用？

key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。

1、 某些时候性能高。默认情况下，不带 key 时，会对节点进行就地复用，提高性能。而带 key 时，会根据 key 进行对比增删节点，不但要销毁和创建vnode，在 DOM 里添加移除节点对性能的影响更大。不过在搜索要替换的旧 VNode 时，带 key 使用 map 映射查找的方式，要比不带 key 时遍历查找的方式更快。总的来说，不带 key 性能高。

```js
// vue项目  src/core/vdom/patch.js  -488行
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}

// 遍历寻找
function findIdxInOld (node, oldCh, start, end) {
  for (let i = start; i < end; i++) {
     const c = oldCh[i]
      
     if (isDef(c) && sameVnode(node, c)) return i
  }
}
```

2、 更准确。key 的作用主要用于虚拟 DOM 算法，用于标识 VNode，在替换更新节点时更准确，防止"原地复用"带来的问题，比如表单输入值。

```js
<div id="app">
    <div>
        <input type="text" v-model="name">
        <button @click="add">添加</button>
    </div>
    <ul>
        <li v-for="(item, i) in list">
            <input type="checkbox"> {{item.name}}
        </li>
    </ul>
</div>
<script>
    var vm = new Vue({
        el: '#app',
        data: {
            name: '',
            list: [{
                    name: 'a'
                }
            ]
        },
        methods: {
            add() {
                this.list.unshift({
                    name: this.name
                })
                this.name = ''
            }
        }
    });
</script>
```

比如上面代码，首先选中 a，然后添加 b，结果添加之后，选中的变成了 b。这是因为添加后和添加前的 vnode 进行对比时，发现input 没有变，名称变了，所以只更新了名称(从 a 变成 b)，后面又添加了一条 a。

![](/img/vue/1.jpg)

对于不更新的简单列表，可以不带 key 提升性能。而对于要更新的列表，建议使用 key，因为准确有时比性能重要。

## 参考资料

- [写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/1)
- [解析vue2.0的diff算法]https://github.com/aooy/blog/issues/2)