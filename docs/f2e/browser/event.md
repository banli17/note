---
title: "浏览器事件机制"
sidebar_label: 事件机制
---

## 事件绑定

与事件绑定相关的方法有：

- `addEventListener()`
- `removeEventListener()`
- `dispatchEvent()`

### addEventListener

```
addEventListener(type, listener, useCapture)
```

addEventListener 方法的参数如下：

- `type <String>`: 事件名
- `listener <Function>`: 事件处理程序
- `useCapture <Boolean|Object>`: 是否冒泡，这个参数还可以是一个对象，它有属性：
    - `capture`:布尔值，是否冒泡
    - `once`:布尔值，是否只触发一次
    - `passive`: 布尔值，设为 true 时，表示事件处理程序 listener 永远不会调用`preventDefault()`，如果 listener 还是调用了`preventDefault()`，客户端将忽略它并抛出一个控制台警告。


## 事件传播

事件的传播分为三个阶段：捕获(从 window 到目标元素)、到达目标元素、冒泡(从目标元素到 window)。

要注意的是，给目标元素同时绑定捕获或冒泡事件，会按照绑定的顺序执行。

```js
target.addEventListener('click', e => console.log("冒泡") , false)
target.addEventListener('click', e => console.log("捕获") , true)
```

上面代码，点击 target，将依次输出`冒泡`、`捕获`。


## 阻止事件传播

阻止事件传播的方法有 2 个：

- `stopPropagation()`: 这个方法会阻止当前绑定的事件传播，不会阻止其它的同名事件传播。
- `stopImmediatePropagation()`: 这个方法会阻止当前绑定事件的传播，以及之后绑定事件的传播。

```js
var b = document.body

document.addEventListener('click', (e) => {
    console.log('document capture')
}, true)

document.addEventListener('click', (e) => {
    console.log('document bubble')
}, false)

b.addEventListener('click', (e) => {
    console.log('body click 0')
}, false)

b.addEventListener('click', (e) => {
    // e.stopPropagation()
    e.stopImmediatePropagation()
    console.log('body click 1')
}, false)

b.addEventListener('click', (e) => {
    console.log('body click 2')
}, false)

// 如果使用 e.stopPropagation()，将输出
// document capture
// body click 0
// body click 1
// body click 2

// 如果使用 e.stopImmediatePropagation()，将输出
// document capture
// body click 0
// body click 1
```

上面的例子中，如果使用`e.stopImmediatePropagation()`，不会输出`body click 2`，也就是将自身后面写的事件也阻止了。

另外，要注意它是阻止冒泡，并没有阻止捕获。所以`document capture`总是会输出的。

## 阻止默认事件

默认事件就是浏览器自带的一些事件。比如鼠标右键时会打开菜单，选中文字后可以按住拖动等。有时候，这些默认事件会影响我们的开发，所以需要阻止它。

阻止默认事件的方法是使用事件对象的`preventDefault()`方法。

```js
b.addEventListener('contextmenu', (e) => {
    console.log('body click 1')
    e.preventDefault()
}, false)
```

上面例子中，禁止了右键菜单，所以鼠标右键点击时，不再出现菜单。

### 创建与触发自定义事件

自定义事件的创建触发流程如下：

```js
var event = new Event('build')
element.addEventListener('build', (e)=>{}, false)
element.dispatch(event)
```

上面例子，创建了一个 build 事件，然后给 element 元素注册 build 事件函数，最后使用 dispatch 触发。

如果需要在事件函数中传递数据，则需要使用 CustomEvent 的 detail 属性。

```js
var event = new CustomEvent('build', {detail: element.dataset.time})
function eventHandler(e){
    console.log(e.detail)
}
```

下面这个例子，可以将子元素事件冒泡给父级，并传递数据。

```js
// html 结构
// <form>
//   <textarea></textarea>
// </form>

const form = document.querySelector('form');
const textarea = document.querySelector('textarea');

// 创建事件，允许冒泡，并传递数据
const eventAwesome = new CustomEvent('awesome', {
  bubbles: true,
  detail: { text: () => textarea.value }
});

form.addEventListener('awesome', e => console.log(e.detail.text()));

textarea.addEventListener('input', e => e.target.dispatchEvent(eventAwesome));
// 或使用 function this
// textarea.addEventListener('input', function(e){
//     this.dispatchEvent(new CustomEvent('awesome', { 
//         bubbles: true, detail: { text: () => textarea.value } 
//     }))
// });
```


## 事件委托

```js
// 给100个li元素绑定事件
for(let i = 0; i < li.length; i++){
    li.addEventListener('click', handler, false)
}
```

上面例子中，在给大量元素(如列表`<li>`)绑定事件时，传统的事件绑定会有一些问题：

0. 大量事件绑定，消耗性能，而且 IE 还需要解绑，否则会内存泄露。
0. 绑定元素必须存在，后期插入的元素，需要重新绑定事件。
0. 语法过于复杂

优化的办法就是使用`事件委托`。事件委托就是将事件处理函数绑定在目标对象的父级或祖先级节点上，目标对象的事件会通过冒泡或捕获传递给它。主要的好处是：

- 新增子节点时，无需再重新绑定事件
- 节省内存

不足点是：

- 并非所有的事件都能冒泡，如`load`、`change`、`submit`、`focus`、`blur`。
- 加大管理复杂。
- 不好模拟用户触发事件。

## 鼠标事件

### MouseEvent接口

鼠标事件继承自`MouseEvent`接口，具体事件主要有：

- `click`: 点击鼠标主键时触发。鼠标点击时，事件触发顺序是`mousedown`->`mouseup`->`click`。
- `dblclick`: 双击鼠标时触发。
- `mousedown`: 鼠标键按下时触发。
- `mouseup`: 鼠标键抬起时触发。
- `mousemove`: 鼠标移动时触发。
- `mouseenter`: 鼠标移动进入节点时触发，进入子节点不会触发。
- `mouseleave`: 鼠标离开节点时触发
- `mouseover`: 鼠标进入节点时触发，进入子节点会再次触发。（记忆方法，over、out，两个o是一对）。
- `mouseout`: 鼠标离开节点时触发，离开子节点会再次触发。
- `contextmenu`：鼠标右键时触发。或按下上下文菜单键时触发。
- `wheel`: 滚动鼠标的滚轮时触发，该事件继承自`WheelEvent`接口。

鼠标事件对象，是`MouseEvent`的实例。它的主要属性如下：

- `altKey`
- `ctrlKey`
- `metaKey`: meta 键是否按下(mac 是 command 键，windows 是 windows 键)。
- `shiftKey`
- `button`: 表示鼠标按下的哪个键，0是主键，或事件没有初始化这个属性(如 mousemove)，1是辅助键(中键或滚轮键)，2是次键。
- `buttons`: 返回三个 bit 的值，表示同时按下了哪些键。1(`001`)表示按下左键，2(`010`)表示按下右键，4(`100`)表示按下中键或滚轮键。所以 3(`011`)表示同时按下左键和右键。
- `clientX`、`clientY`: 鼠标举例浏览器窗口左上角的位置，单位是像素。它们还有别名`x`、`y`。
- `movementX`、`movementY`: 返回当前位置与上一个`mousemove`事件的距离。
- `screenX`、`screenY`: 返回鼠标相对于屏幕左上角的位置。
- `offsetX`、`offsetY`: 返回鼠标与目标节点左上角的 padding 外边缘的距离(包括 padding)。
- `pageX`、`pageY`: 返回鼠标与文档的距离，即包括滚动条。
- `relatedTarget`: 返回事件的相关节点。对于没有相关节点的事件，该属性返回 null。个人理解为副相关节点。具体如下。

|事件名|target|relatedTarget|
|---|---|---|
focusin|获得焦点的元素|失去焦点的元素
focusout|失去焦点的元素|获得焦点的元素
mouseenter|将要进入的元素|将要离开的元素
mouseleave|将要离开的元素|将要进入的元素
mouseover|将要进入的元素|将要离开的元素
mouseout|将要离开的元素|将要进入的元素
dragenter|将要进入的元素|将要离开的元素
dragexit|将要离开的元素|将要进入的元素

- `getModifierState()`: 返回有没有按下特定的功能键，参数是一个[功能键字符串](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState#Modifier_keys_on_Gecko)。

```js
document.addEventListener('click', function (e) {
    // 是否按下大写键
    console.log(e.getModifierState('CapsLock'));
}, false);
```

### WheelEvent 接口

WheelEvent 接口继承了 MouseEvent 实例，代表鼠标滚轮事件的实例对象。鼠标滚轮事件目前只有一个`wheel`事件。

浏览器原生提供了`WheelEvent()`构造函数，用来生成`WheelEvent`实例。

```js
var wheelEvent = new WheelEvent(type, options)
```

type 是事件类型，目前只能是`wheel`。第二个参数是事件配置对象，它有下面属性。

- `deltaX`: 数值，表示滚轮的水平滚动量，默认是0.0。
- `deltaY`: 数值，表示滚轮的垂直滚动量，默认是0.0。
- `deltaZ`: 数值，表示滚轮的Z轴滚动量，默认是0.0。
- `deltaMode`: 数值，表示相关的滚轮事件的单位，适用于上面三个属性。`0`表示单位是像素，`1`表示单位是行，`2`表示单位是页，默认是`0`。

### 键盘事件

### 进度事件

### 表单事件

### 触摸事件

### 拖拉事件

### 其它常见事件

## jQuery事件绑定

### 简介

jQuery 事件绑定主要有下面几个 API。

- `bind`、`unbind()`
- `delegate()`、`undelegate()`
- `on()`、`off()`
- `one()`
- `trigger()`、`triggerHandler()`

其中`bind`、`live`、`delegate`都是通过 on 实现的。`unbind`、`undelegate`都是通过 off 实现的。

**.bind()**

直接给元素绑定事件处理程序，没有利用事件委托。3.0 已废弃。

**.live() []**

1.7 已废弃，它的作用是将事件处理程序委托绑定到 document 上，从而简化使用。

```js
$('a').live('click', function() { alert("!!!") });
```

这个方法的缺点是：

1. 调用 live() 前，jQuery 会搜索匹配元素，这一点对大型文档比较耗时。
2. 不支持链式写法。$("a").find(".offsite, .external").live( ... ) 是不支持的。
3. 由于添加在 document 上，事件传播链较长，所以事件处理程序的触发较慢。

**.delegate()** 

利用事件委托绑定事件处理程序。jQuery 扫描文档，查找`#element`，并使用 click 事件和 a 选择器将事件处理函数绑定到 `#element`上，只要有事件冒泡到`#element`，它就查看该事件是否是 click，该事件目标元素是否是 a，如果都匹配，则执行事件处理程序。

```js
$('#element).delegate('a', 'click', function() {  });
```

**.on()**



## 参考资料

- [](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)
- [jQuery源码分析系列(17 - 22) 事件绑定](https://www.cnblogs.com/aaronjs/p/3279314.html)
- [jquery 1.9 API中文文档](https://www.html.cn/jqapi-1.9/)