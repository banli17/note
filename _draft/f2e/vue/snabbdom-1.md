---
title: "snabbdom库实现原理(1): Vnode的创建"
date: 2017-10-20 10:37:34
toc: true
---

snabbdom是一个virtual DOM库，vue的虚拟DOM就是基于它的，所以学习这个库对于学习vue源码有很大帮助。

我们知道真实的DOM从浏览器创建就自带了很多的属性，操作它也很繁琐，要时刻关注性能问题。而虚拟DOM这个技术可以让我们解放出来。它主要有2个方法：

1. `create`: 创建Vnode，也就是一个用来描述DOM的js对象(并不在文档中，所以操作它很快)。
2. `patch`: 对比新旧节点，使用diff算法进行差异化DOM更新。

## 虚拟DOM的好处

下面我们需要更新一个DOM。

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

要进行上面的更新操作，有2种方法：

1. 常规方法：就是 html 拼接后赋值给 ul 的 innerHTML或者创建节点插入到 ul中，这些步骤都需要开发者手动完成。
2. 虚拟DOM方法：将旧的 Vnode 和新的 Vnode 进行对比更新，插入节点`<li>2</li>`，删除节点`<li>5</li>`。

从上面可以看到虚拟DOM的好处：

1. 不再需要关心DOM操作，交给虚拟DOM库内部就可以。
2. 差异化更新，性能更好。(当然有时候开发者手动更新性能更好，但是需要权衡一下)

## snabbdom示例

接着来说说 snabbdom 库的基本使用。下面是一个简单的例子：

```javascript
var snabbdom = require('snabbdom');
var patch = snabbdom.init();
var h = require('snabbdom/h').default; 

var container = document.getElementById('container');

// 创建vnode节点
var vnode = h('div#container.two.classes', {on: {click: someFn}}, [
  h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
  ' and this is just normal text',
  h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
]);
// 创建vnode，生成对应的DOM节点替换container节点
patch(container, vnode);

// 创建新的vnode节点
var newVnode = h('div#container.two.classes', {on: {click: anotherEventHandler}}, [
  h('span', {style: {fontWeight: 'normal', fontStyle: 'italic'}}, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', {props: {href: '/bar'}}, 'I\'ll take you places!')
]);
// 对比新的vnode和旧的vnode，进行差异化更新DOM
patch(vnode, newVnode); 
```

上面的代码，通过`h()`方法创建了vnode节点，使用 patch 方法将vnode对应的DOM节点替换掉container节点。然后创建一个新的newVnode节点，又通过patch()方法对比新旧节点，做差异化更新DOM。

下面我们主要要学习`h()`方法是如何来创建vnode节点的。

## h()方法源码

snabbdom 库里有个`h()`方法是用来创建Vnode节点的。它接受3个参数，可以对照上面的snabbdom示例看：

1. 节点的selector选择器描述，形式是`标签名#id.className`。
2. 节点的属性，如href，on事件等。
3. 节点的子节点，可以是一个数组。

```javascript
function h(sel, b, c){
    var data = {}, children, text, i;

    // 1. 让参数传递有多种形式，非重点可忽略
    if(c !== undefined){
        data = b
        if(is.array(c)){  // 如果c是数组
            children = c
        }
        else if(is.primitive(c)){  // c是字符串或数字，转成文本
            text = c
        }
        else if(c && c.sel){  // 子节点形式可以是一个对象{sel:xx}
            children = [c]
        }
    }else if(b !== undefined){
        if(is.array(b)){  // 如果b是数组
            children = b
        }
        else if(is.primitive(b)){
            text = b
        }
        else if(b && b.sel){
            children = [b]
        }
        else{
            data = b
        }
    }

    // 2. 循环创建子节点
    if(children !== undefined){
        for(i = 0; i < children.length; ++i){
            if(is.primitive(children[i])){
                children[i] = vnode(undefined, undefined, undefined, children[i], undefined)
            }
        }
    }

    // 3. 处理svg的， 即sel是 svg、svg.xx或者svg#xx
    if(
        sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
    ){
        addNS(data, children, sel)
    }

    // 4. 返回vnode节点
    return vnode(sel, data, children, text, undefined)
}
```

上面第一段的`if..else`都是为了让参数的传递可以多种形式，比如可以这样传参数：

```javascript
h('div', [])
h('div',{}, [])
h('div',{sel:'xx'})
```

总的来说就是参数归位操作，就是将节点的属性赋值给data，节点的子元素赋值给children，子元素如果是文本则赋值给text。为什么要将文本节点单独拿出来呢？是因为文本节点和元素节点的处理方法有些区别。

接下来看看上面的`vnode()`方法：

```javascript
function vnode(sel, data, children, text, elm){
    let key = data === undefined ? undefined : data.key;
    return {
       sel: sel,
       data: data, 
       children: children,
       text: text, 
       elm: elm, // 真实的DOM节点指针
       key: key  // 节点的key，比如vue里循环时写的key
    }
}
```

可以看到这个方法就是返回一个js对象，即vnode。它的格式很简单，只有6个属性。

## 额外的方法

上面用到的`is.primitive`、`is.array`方法都十分简单，看下面代码：

```javascript
// is.ts文件
export const array = Array.isArray;
export function primitive(s){
  return typeof s === 'string' || typeof s === 'number';
}
```

再看看svg那段的`addNS()`方法：

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

因为我对svg不了解先跳过，之后学习后再来解释。下面一节将会介绍snabbdom库的核心diff算法。