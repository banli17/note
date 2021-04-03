---
title: "snabbdom库实现原理(1): Vnode的创建"
date: 2017-10-20 10:37:34
toc: true
---

snabbdom 是一个 virtual DOM 库，vue 的虚拟 DOM 就是基于它的，所以学习这个库对于学习 vue 源码有很大帮助。

我们知道真实的 DOM 从浏览器创建就自带了很多的属性，操作它也很繁琐，要时刻关注性能问题。而虚拟 DOM 这个技术可以让我们解放出来。它主要有 2 个方法：

1. `create`: 创建 Vnode，也就是一个用来描述 DOM 的 js 对象(并不在文档中，所以操作它很快)。
2. `patch`: 对比新旧节点，使用 diff 算法进行差异化 DOM 更新。

## 虚拟 DOM 的好处

下面我们需要更新一个 DOM。

```html
// 更新前
<ul>
  <li>1</li>
  <li>3</li>
  <li>5</li>
</ul>

// 更新后
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

要进行上面的更新操作，有 2 种方法：

1. 常规方法：就是 html 拼接后赋值给 ul 的 innerHTML 或者创建节点插入到 ul 中，这些步骤都需要开发者手动完成。
2. 虚拟 DOM 方法：将旧的 Vnode 和新的 Vnode 进行对比更新，插入节点`<li>2</li>`，删除节点`<li>5</li>`。

从上面可以看到虚拟 DOM 的好处：

1. 不再需要关心 DOM 操作，交给虚拟 DOM 库内部就可以。
2. 差异化更新，性能更好。(当然有时候开发者手动更新性能更好，但是需要权衡一下)

## snabbdom 示例

接着来说说 snabbdom 库的基本使用。下面是一个简单的例子：

```javascript
var snabbdom = require("snabbdom");
var patch = snabbdom.init();
var h = require("snabbdom/h").default;

var container = document.getElementById("container");

// 创建vnode节点
var vnode = h("div#container.two.classes", { on: { click: someFn } }, [
  h("span", { style: { fontWeight: "bold" } }, "This is bold"),
  " and this is just normal text",
  h("a", { props: { href: "/foo" } }, "I'll take you places!"),
]);
// 创建vnode，生成对应的DOM节点替换container节点
patch(container, vnode);

// 创建新的vnode节点
var newVnode = h(
  "div#container.two.classes",
  { on: { click: anotherEventHandler } },
  [
    h(
      "span",
      { style: { fontWeight: "normal", fontStyle: "italic" } },
      "This is now italic type"
    ),
    " and this is still just normal text",
    h("a", { props: { href: "/bar" } }, "I'll take you places!"),
  ]
);
// 对比新的vnode和旧的vnode，进行差异化更新DOM
patch(vnode, newVnode);
```

上面的代码，通过`h()`方法创建了 vnode 节点，使用 patch 方法将 vnode 对应的 DOM 节点替换掉 container 节点。然后创建一个新的 newVnode 节点，又通过 patch()方法对比新旧节点，做差异化更新 DOM。

下面我们主要要学习`h()`方法是如何来创建 vnode 节点的。

## h()方法源码

snabbdom 库里有个`h()`方法是用来创建 Vnode 节点的。它接受 3 个参数，可以对照上面的 snabbdom 示例看：

1. 节点的 selector 选择器描述，形式是`标签名#id.className`。
2. 节点的属性，如 href，on 事件等。
3. 节点的子节点，可以是一个数组。

```javascript
function h(sel, b, c) {
  var data = {},
    children,
    text,
    i;

  // 1. 让参数传递有多种形式，非重点可忽略
  if (c !== undefined) {
    data = b;
    if (is.array(c)) {
      // 如果c是数组
      children = c;
    } else if (is.primitive(c)) {
      // c是字符串或数字，转成文本
      text = c;
    } else if (c && c.sel) {
      // 子节点形式可以是一个对象{sel:xx}
      children = [c];
    }
  } else if (b !== undefined) {
    if (is.array(b)) {
      // 如果b是数组
      children = b;
    } else if (is.primitive(b)) {
      text = b;
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }

  // 2. 循环创建子节点
  if (children !== undefined) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) {
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
      }
    }
  }

  // 3. 处理svg的， 即sel是 svg、svg.xx或者svg#xx
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    addNS(data, children, sel);
  }

  // 4. 返回vnode节点
  return vnode(sel, data, children, text, undefined);
}
```

上面第一段的`if..else`都是为了让参数的传递可以多种形式，比如可以这样传参数：

```javascript
h("div", []);
h("div", {}, []);
h("div", { sel: "xx" });
```

总的来说就是参数归位操作，就是将节点的属性赋值给 data，节点的子元素赋值给 children，子元素如果是文本则赋值给 text。为什么要将文本节点单独拿出来呢？是因为文本节点和元素节点的处理方法有些区别。

接下来看看上面的`vnode()`方法：

```javascript
function vnode(sel, data, children, text, elm) {
  let key = data === undefined ? undefined : data.key;
  return {
    sel: sel,
    data: data,
    children: children,
    text: text,
    elm: elm, // 真实的DOM节点指针
    key: key, // 节点的key，比如vue里循环时写的key
  };
}
```

可以看到这个方法就是返回一个 js 对象，即 vnode。它的格式很简单，只有 6 个属性。

## 额外的方法

上面用到的`is.primitive`、`is.array`方法都十分简单，看下面代码：

```javascript
// is.ts文件
export const array = Array.isArray;
export function primitive(s) {
  return typeof s === "string" || typeof s === "number";
}
```

再看看 svg 那段的`addNS()`方法：

```javascript
function addNS(data: any, children: VNodes | undefined, sel: string | undefined): void {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (let i = 0; i < children.length; ++i) {
            let childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, (children[i] as VNode).children as VNodes, children[i].sel);
            }
        }
    }
}
```

因为我对 svg 不了解先跳过，之后学习后再来解释。下面一节将会介绍 snabbdom 库的核心 diff 算法。

这一节会介绍 snabbdom 库`patch()`方法和`diff`算法的实现原理。原谅我水平不高，静下心来花了一天时间总算是理解了。

## patch()源码分析

snabbdom 库的 init 方法返回一个 patch 方法。代码如下：

```javascript
function patch(oldVnode, vnode) {
  var i, elm, parent;
  var insertedVnodeQueue = [];

  // 这是init时参数模块的钩子函数，先不用管
  for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

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
  for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();

  return vnode;
}
```

可以看到`patch()`方法做的事情很简单：

1. 如果不是 vnode 而是 dom 节点，则转成 vnode 节点形式。比如上一节中的`patch(container, vnode)`会将 container 转 vnode。
2. 如果是同一个节点，就用`patchVnode()`方法修复旧节点。
3. 如果不是同一个节点，就新建新节点，删除旧节点。

上面的`emptyNodeAt()`方法可以将 dom 元素专程 Vnode 对象。

```javascript
function emptyNodeAt(elm) {
  var id = elm.id ? "#" + elm.id : "";
  var c = elm.className ? "." + elm.className.split(" ").join(".") : "";
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
  if (
    isDef((i = vnode.data)) &&
    isDef((hook = i.hook)) &&
    isDef((i = hook.prepatch))
  ) {
    i(oldVnode, vnode);
  }
  var elm = (vnode.elm = oldVnode.elm);
  var oldCh = oldVnode.children;
  var ch = vnode.children;
  if (oldVnode === vnode) return;

  // 修复vnode的属性
  if (vnode.data !== undefined) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    i = vnode.data.hook;
    if (isDef(i) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // 子元素不是text
  if (isUndef(vnode.text)) {
    // 都有子元素且不相同，这是重点，即diff算法
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
    }
    // 没有旧子元素，只有新的，新增即可
    else if (isDef(ch)) {
      if (isDef(oldVnode.text)) api.setTextContent(elm, "");
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
    }
    // 没有新的子元素，旧的有，删除旧的
    else if (isDef(oldCh)) {
      removeVnodes(elm, oldCh, 0, oldCh.length - 1);
    }
    // 旧的有文本，新的没有，删除旧的
    else if (isDef(oldVnode.text)) {
      api.setTextContent(elm, "");
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
  if (isDef(hook) && isDef((i = hook.postpatch))) {
    i(oldVnode, vnode);
  }
}
```

上面的 patchVnode 方法目的就是修复 vnode，主要做的事情有：

1. 修复 vnode 属性。
2. 更新子节点，新旧都有则调用`updateChildren()`，新的有旧的没有则新增，旧的有新的没有则删除。

下面就是介绍新旧子节点都有时，调用的`updateChildren()`方法，也就是 diff 算法。

## 理解 diff 算法

diff 算法就是对比新旧节点之间的差异，然后根据差异来更新。如果一上来就看 snabbdom 的 diff 源码，不太好理解。所以先来看看下面这个例子。如何利用 diff 的思想将`oldArr = [1,2,3,9,4,5]`变成`newArr = [5,4,3,2,1,10,12]`？如果按 snabbdom 的算法具体步骤如下:

1. 设置四个指针，分别指向 oldArr 和 newArr 的首尾元素，即 oldStartIdx，oldEndIdx，newStartIdx，newEndIdx。
2. 开始进行遍历，遍历条件是 oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx。即新数组或旧数组中一个遍历完。
3. 如果 oldArr 头元素和 newArr 头元素相同，则 oldStartIdx 和 newStartIdx 后移。
4. 如果 oldArr 尾元素和 newArr 尾元素相同，则 oldEndIdx 和 newEndIdx 前移。
5. 如果 oldArr 头元素和 newArr 尾元素相同，则将 oldArr 头元素移动到 oldArr 的末尾去，oldStartIdx 后移，newEndIdx 前移。
6. 如果 oldArr 尾元素和 newArr 头元素相同，则将 oldArr 尾元素移动到 oldArr 的开头去，oldStartIdx 前移，newEndIdx 后移。
7. 如果是新增了元素就插入新元素。
8. 如果是元素移动了新位置，即 oldArr 里有这个元素，就移动元素到新位置。
9. 遍历到最后可能会有新数组还有元素，或旧数组还有元素的情况。这样就可以直接删除多余元素或者新增多余元素了。

具体可以自己画个图，一步一步的去理解。

## diff 算法源码分析

如果把上面的理解 diff 算法理解了，那么下面的就不是那么困难了，思路是一样的。

```javascript
function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
  var oldStartIdx = 0,
    newStartIdx = 0;
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
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
      api.insertBefore(
        parentElm,
        oldStartVnode.elm,
        api.nextSibling(oldEndVnode.elm)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
      api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 给 oldCh编号
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      // 看key在旧的有没有
      idxInOld = oldKeyToIdx[newStartVnode.key];

      // 新元素
      if (isUndef(idxInOld)) {
        api.insertBefore(
          parentElm,
          createElm(newStartVnode, insertedVnodeQueue),
          oldStartVnode.elm
        );
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(
            parentElm,
            createElm(newStartVnode, insertedVnodeQueue),
            oldStartVnode.elm
          );
        } else {
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
      addVnodes(
        parentElm,
        before,
        newCh,
        newStartIdx,
        newEndIdx,
        insertedVnodeQueue
      );
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
}
```

上面的算法有个问题，为什么 while 循环里，每一次只处理一次对比呢？而不是

```
if(oldStartVnode == null){}
if(oldEndVnode == null){}
```

因为每轮比较最多处理一个节点，算法复杂度会更低。即`if...else`如果 if 走了，else 就不会判断了。而`if...if`都会判断。下一节将会介绍 snabbdom 库里的其它一些内容，如模块钩子，createElm 等。

- [一篇文章告诉你 React 里为什么不能用 index 作为 key](https://juejin.im/post/5a31dda3f265da43052ea207)
