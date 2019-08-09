---
title: "浏览器事件机制"
sidebar_label: 事件机制
---

## 事件绑定

与事件绑定相关的方法有：

- `addEventListener()`

`addEventListener()`方法的第三个参数还可以是一个对象，它可以使用如下属性：
    - capture
    - once
    - passive

- `removeEventListener()`
- `dispatchEvent()`

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




## 事件传播

事件的传播分为三个阶段：捕获(从 window 到目标元素)、到达目标元素、冒泡(从目标元素到 window)。

要注意的是，给目标元素同时绑定捕获或冒泡事件，会按照绑定的顺序执行。

```js
target.addEventListener('click', e => console.log("冒泡") , false)
target.addEventListener('click', e => console.log("捕获") , true)
```

上面代码，点击 target，将依次输出`冒泡`、`捕获`。

## 阻止事件传播

## 阻止默认事件

## 事件代理

事件代理是将本来绑定到子节点的事件，绑定到上级元素上。好处是：

- 新增子节点时，无需再重新绑定事件
- 节省内存


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

###

## 参考资料

- [](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)