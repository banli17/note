---
title: "snabbdom库实现原理(2): diff算法"
date: 2018-04-30 13:39:47
tags:
---

这一节会介绍snabbdom库`patch()`方法和`diff`算法的实现原理。原谅我水平不高，静下心来花了一天时间总算是理解了。

## patch()源码分析

snabbdom库的 init 方法返回一个 patch 方法。代码如下：

```javascript
function patch(oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];

    // 这是init时参数模块的钩子函数，先不用管
    for (i = 0; i < cbs.pre.length; ++i)
        cbs.pre[i]();

    // 如果不是vnode，是dom元素，则将其转换为vnode
    if (!isVnode(oldVnode)) {
        oldVnode = emptyNodeAt(oldVnode);
    }

    // sameVnode是用户标识的key相同，而且sel相同
    // 如果是同一个元素，则pathVnode修复一下，因为更新了
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
        // 如果不是同一个元素，直接新建节点替换旧元素
        elm = oldVnode.elm;  
        parent = api.parentNode(elm); 
        createElm(vnode, insertedVnodeQueue);
        if (parent !== null) {
            // 插入新节点
            api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
            // 删除旧节点
            removeVnodes(parent, [oldVnode], 0, 0);
        }
    }

    // 先忽略
    for (i = 0; i < insertedVnodeQueue.length; ++i) {
        insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    // 先忽略
    for (i = 0; i < cbs.post.length; ++i)
        cbs.post[i]();

    return vnode;
};
```

可以看到`patch()`方法做的事情很简单：

1. 如果不是vnode 而是 dom节点，则转成vnode节点形式。比如上一节中的`patch(container, vnode)`会将container转vnode。
2. 如果是同一个节点，就用`patchVnode()`方法修复旧节点。
3. 如果不是同一个节点，就新建新节点，删除旧节点。

上面的`emptyNodeAt()`方法可以将 dom 元素专程 Vnode 对象。

```javascript
function emptyNodeAt(elm) {
    var id = elm.id ? '#' + elm.id : '';
    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
    // 拼接成 div#app.xxx形式
    return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
}
```

## patchVnode()源码分析

`patchVnode()`方法是用来根据新节点修复旧节点的。具体代码如下：

```javascript
function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    // 忽略
    var i, hook;
    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
        i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (oldVnode === vnode)
        return;

    // 修复vnode的属性
    if (vnode.data !== undefined) {
        for (i = 0; i < cbs.update.length; ++i)
            cbs.update[i](oldVnode, vnode);
        i = vnode.data.hook;
        if (isDef(i) && isDef(i = i.update))
            i(oldVnode, vnode);
    }
    // 子元素不是text
    if (isUndef(vnode.text)) {
        // 都有子元素且不相同，这是重点，即diff算法
        if (isDef(oldCh) && isDef(ch)) {
            if (oldCh !== ch)
                updateChildren(elm, oldCh, ch, insertedVnodeQueue);
        }
        // 没有旧子元素，只有新的，新增即可
        else if (isDef(ch)) {
            if (isDef(oldVnode.text))
                api.setTextContent(elm, '');
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        }
        // 没有新的子元素，旧的有，删除旧的
        else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }
        // 旧的有文本，新的没有，删除旧的
        else if (isDef(oldVnode.text)) {
            api.setTextContent(elm, '');
        }
    }
    // 子元素是text，且和旧文本不同，就删除旧子元素，设置文本
    else if (oldVnode.text !== vnode.text) {
        if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }
        api.setTextContent(elm, vnode.text);
    }

    // 和插件相关，忽略
    if (isDef(hook) && isDef(i = hook.postpatch)) {
        i(oldVnode, vnode);
    }
}
```

上面的patchVnode方法目的就是修复vnode，主要做的事情有：

1. 修复vnode属性。
2. 更新子节点，新旧都有则调用`updateChildren()`，新的有旧的没有则新增，旧的有新的没有则删除。

下面就是介绍新旧子节点都有时，调用的`updateChildren()`方法，也就是diff算法。

## 理解diff算法

diff算法就是对比新旧节点之间的差异，然后根据差异来更新。如果一上来就看snabbdom的diff源码，不太好理解。所以先来看看下面这个例子。如何利用diff的思想将`oldArr = [1,2,3,9,4,5]`变成`newArr = [5,4,3,2,1,10,12]`？如果按snabbdom的算法具体步骤如下:

1. 设置四个指针，分别指向oldArr和newArr的首尾元素，即oldStartIdx，oldEndIdx，newStartIdx，newEndIdx。
2. 开始进行遍历，遍历条件是oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx。即新数组或旧数组中一个遍历完。
3. 如果oldArr头元素和newArr头元素相同，则oldStartIdx和newStartIdx后移。
3. 如果oldArr尾元素和newArr尾元素相同，则oldEndIdx和newEndIdx前移。
1. 如果oldArr头元素和newArr尾元素相同，则将oldArr头元素移动到oldArr的末尾去，oldStartIdx后移，newEndIdx前移。
1. 如果oldArr尾元素和newArr头元素相同，则将oldArr尾元素移动到oldArr的开头去，oldStartIdx前移，newEndIdx后移。
1. 如果是新增了元素就插入新元素。
1. 如果是元素移动了新位置，即oldArr里有这个元素，就移动元素到新位置。
2. 遍历到最后可能会有新数组还有元素，或旧数组还有元素的情况。这样就可以直接删除多余元素或者新增多余元素了。

具体可以自己画个图，一步一步的去理解。

## diff算法源码分析

如果把上面的理解diff算法理解了，那么下面的就不是那么困难了，思路是一样的。

```javascript
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0, newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx;
    var idxInOld;
    var elmToMove;
    var before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]; 
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
            api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            // 给 oldCh编号
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            // 看key在旧的有没有
            idxInOld = oldKeyToIdx[newStartVnode.key];

            // 新元素
            if (isUndef(idxInOld)) {
                api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                }
                else {
                    patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                    oldCh[idxInOld] = undefined;
                    api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
    }
    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
}
```

上面的算法有个问题，为什么while循环里，每一次只处理一次对比呢？而不是

```
if(oldStartVnode == null){}
if(oldEndVnode == null){}
```

因为每轮比较最多处理一个节点，算法复杂度会更低。即`if...else`如果if走了，else就不会判断了。而`if...if`都会判断。下一节将会介绍snabbdom库里的其它一些内容，如模块钩子，createElm等。



- [一篇文章告诉你React里为什么不能用index作为key](https://juejin.im/post/5a31dda3f265da43052ea207)