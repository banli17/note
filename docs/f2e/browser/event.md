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

addEventListener 方法用于绑定事件处理程序。

```js
addEventListener(type, listener, useCapture)
```

addEventListener 方法的参数如下：

- `type <String>`: 事件名
- `listener <Function>`: 事件处理程序
- `useCapture <Boolean|Object>`: 是否冒泡，这个参数还可以是一个对象，它有属性：
    - `capture`:布尔值，是否冒泡
    - `once`:布尔值，是否只触发一次
    - `passive`: 布尔值，设为 true 时，表示事件处理程序 listener 永远不会调用`preventDefault()`，如果 listener 还是调用了`preventDefault()`，客户端将忽略它并抛出一个控制台警告。

DOM0 级还可以使用 onclick 方式绑定，但是它只能绑定一个事件处理函数。

## 事件传播

事件的传播分为三个阶段：捕获(从 window 到目标元素)、到达目标元素、冒泡(从目标元素到 window)。

要注意的是，给目标元素同时绑定捕获或冒泡事件，会按照绑定的顺序执行。

```js
target.addEventListener('click', e => console.log("冒泡") , false)
target.addEventListener('click', e => console.log("捕获") , true)
```

上面代码，点击 target，将依次输出`冒泡`、`捕获`。

### 事件兼容性

IE9 之前，事件有如下兼容性问题：

1. 只支持冒泡，不支持捕获，所以实际开发中很少使用捕获。
2. 不支持 addEventListener 和 removeEventListener，但是有对应的 attachEvent 和 detachEvent。
3. 事件对象是挂在 window 上。
4. 取消冒泡和取消默认行为

```js
// 取消冒泡
e.cancelBubble = true

// 取消默认行为
e.returnValue = false

// 事件目标元素
e.srcElement
```

所以兼容的方法如下：

```js
/**
 * 修复事件对象不兼容的地方
 */
function fixEventObj(e) {
  e.target = e.target || e.srcElement;
  e.preventDefault = e.preventDefault || function() {
    e.returnValue = false;
  };
  e.stopPropagation = e.stopPropagation || function() {
    e.cancelBubble = true;
  };

  return e;
}

/**
 * 跨浏览器的绑定事件
 */
function on(elem, type, handle) {
  if (elem.addEventListener) { // 检测是否有标准方法
    elem.addEventListener(type, handle, false);
  } else if (elem.attachEvent) { // 试图使用 `attachEvent`
    elem.attachEvent('on' + type, function(event) {
      event = fixEventObj(event);
      handle.call(elem, event); // 使用 call 来改变 handle 的作用域，使其指向 elem
    });
  } else { // 兜底
    elem['on' + type] = function() {
      var event = fixEventObj(window.event);
      handle.call(elem, event);
    }
  }
}
```

### 阻止事件传播

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

### 阻止事件默认行为

事件默认行为就是浏览器自带的一些事件行为。比如鼠标右键时会打开菜单，选中文字后可以按住拖动等。有时候，这些默认事件会影响我们的开发，所以需要阻止它。

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

## 事件对象

### Event 

### 实例属性

- e.bubbles
- e.eventPhase
- e.currentTarget: 事件触发时经过的节点，因为总是在当前对象触发，所以相当于 this。
- e.target: 事件触发目标

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
- 事件传播链越长，越耗时，可以从 jQuery 取消 live(直接委托在 document 上) 方法可以看出。

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
- `mouseout`: 鼠标离开节点时触发(如进入子节点)，离开子节点会再次触发。
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

键盘事件继承自 KeyboardEvent 接口，主要有三个：

- keydown: 按所有键都会触发
- keypress: 按字符集触发，用于检测用户输入了什么字符。对Ctrl、Alt、Shift、Meta 键无效。
- keyup: 松开键盘时触发

如果用户一直按着键盘，会连续触发键盘事件，顺序为`keydown -> keypress -> keydown -> keypress ... -> keyup`。

**新建键盘事件**

```js
new KeyboardEvent(type, options)
```

- type: 事件类型
- options: 除了 Event 接口的属性，还有
    - key: 字符串，当前按下的键，默认为''。
    - code: 字符串，当前按下键的字符串形式，默认为''。
    - location: 整数，当前按下的键的位置，默认为 0。
    - ctrlKey: 是否按下 Ctrl 键，默认为false
    - shiftKey
    - altKey
    - metaKey
    - repeat: 是否重复按键，默认为 false

**KeyboardEvent 实例属性**

- e.ctrlKey
- e.altKey
- e.shiftKey
- e.metaKey
- e.key: 按下的键名，返回字符串，如`a`，如果无法识别，则返回字符串`Unidentified`。
- e.keyCode: 已废弃。
- e.code: [当前按键的字符串形式](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code#Code_values)，如`KeyA`。
- e.location: 返回一个整数，表示按下的键的位置。
    - 0: 主区域，或者无法判断在哪
    - 1: 键盘的左侧，只适用哪些有两个位置的键(如 Ctrl 和 Shift)
    - 2: 键盘的右侧，只适用哪些有两个位置的键(如 Ctrl 和 Shift)
    - 3: 处于数字小键盘
- `e.repeat`: 布尔值，表示用户是否按着不放
- `e.getModifierState()`: 表示是否按下或激活指定的功能键。常用参数如下：
    - `Alt`
    - `CapsLock`: 大写锁定键
    - `Control`: Ctrl 键
    - `Meta`
    - `NumLock`: 数字键盘开关
    - `Shift`

```js
if (
  event.getModifierState('Control') +
  event.getModifierState('Alt') +
  event.getModifierState('Meta') > 1
) {
  return;
}
```

上面代码中，只要 Ctrl、Alt、Meta ，同时按下两个键，就返回。

**键盘事件的兼容性问题**

在IE中，只有一个keyCode属性，并且它的解释取决于事件类型。对于keydown来说，keyCode存储的是按键码，对于 keypress事件来说，keyCode存储的是一个字符码。而IE中没有which和charCode属性，所以which和charCode属性始终为undefined。

FireFox中keyCode始终为0，时间keydown/keyup时，charCode=0，which为按键码。事件keypress时，which和charCode二者的值相同，存储了字符码。

在Opera中，keyCode和which二者的值始终相同，在keydown/keyup事件中，它们存储按键码，在keypress时间中，它们存储字符码，而charCode没有定义，始终是undefined。

```js
let key = e.key || e.keyCode || e.which
```

### 进度事件

进度事件主要用于 ajax 或 底层资源的加载，如`<img>`, `<audio>`, `<video>`, `<style>`，`<link>`。继承自`ProgressEvent`接口。它主要有下几个事件。

- abort
- error
- load
- loadstart
- loadend
- progress
- timeout

除了资源下载，文件上传也存在这些事件。

**ProgressEvent 接口**

```
new ProgressEvent(type, options)
```

- lengthComputable: 布尔值，表示加载的总量是否可以计算，默认是 false。
- loaded: 整数，表示已经加载的量，默认是 0。
- total: 整数，表示已经加载的总量，默认是 0。

如果`ProgressEvent.lengthComputable`为`false`，`ProgressEvent.total`实际上是没有意义的。

```js
var xhr = new XMLHttpRequest();

xhr.addEventListener('progress', updateProgress, false);
xhr.addEventListener('load', transferComplete, false);
xhr.addEventListener('error', transferFailed, false);
xhr.addEventListener('abort', transferCanceled, false);

xhr.open();

function updateProgress(e) {
  if (e.lengthComputable) {
    var percentComplete = e.loaded / e.total;
  } else {
    console.log('不能计算进度');
  }
}

function transferComplete(e) {
  console.log('传输结束');
}

function transferFailed(evt) {
  console.log('传输过程中发生错误');
}

function transferCanceled(evt) {
  console.log('用户取消了传输');
}
```

上面是下载过程的进度事件，上传过程的进度可以通过`xhr.upload`对象来监听。

```javascript
var xhr = new XMLHttpRequest();

xhr.upload.addEventListener('progress', updateProgress, false);
xhr.upload.addEventListener('load', transferComplete, false);
xhr.upload.addEventListener('error', transferFailed, false);
xhr.upload.addEventListener('abort', transferCanceled, false);

xhr.open();
```

### 表单事件

**input 事件**

`input`事件，当`<input>`、`<select>`、`<textarea>`的值发生变化时触发。对于复选框和单选框，用户改变选项时，也会触发这个事件。另外，对于 contenteditable 为 true 的元素，只要值发生变化，也就触发`input`事件。

`input`事件继承自`inputEvent`接口。

`input`事件和`change`事件的区别是，`input`事件在元素值发生变化后立即触发，而`change`在元素失去焦点时发生。`input`事件必然伴随`change`事件。

**select 事件**

`select`事件，在`<input>`、`<textarea>`里面选中文本时触发。

选中文本可以通过事件对象的`selectionDirection`、`selectionEnd`、`selectionStart`和`value`属性拿到。

**change 事件**

`change`事件，当`<input>`、`<select>`、`<textarea>`的值发生变化时触发。具体如下：

- 激活 radio 或 checkbox 时触发。
- 用户提交时触发，如在`<select>`下拉列表完成选择，在日期或文件输入框完成选择。
- 当文本框或`<textarea>`元素的值发生改变，并且丧失焦点时触发。

**invalid 事件**

用户提交表单时，如果表单的值不满足校验条件，就会触发`invalid`事件。

```js
<form>
  <input type="text" required oninvalid="console.log('invalid input')" />
  <button type="submit">提交</button>
</form>
```

上面代码中，输入框是必填的。如果不填，用户点击按钮提交时，就会触发输入框的invalid事件，导致提交被取消。

**reset 事件，submit 事件**

这两个事件发生在表单对象`<form>`上，而不是发生在表单的成员上。

`reset`事件当表单重置时触发。`submit`事件当表单数据向服务器提交时触发，注意它的发生对象时`<form>`，而不是`<button>`。

**InputEvent 接口**

```
new InputEvent(type, options)
```

`InputEvent`实例属性主要有：

- `data`: 表示改动的内容。如果手动在输入框里面输入`abc`，控制台会先输出`a`，再在下一行输出`b`，再在下一行输出`c`。然后选中`abc`，一次性将它们删除，控制台会输出`null`或一个空字符串。
- `inputType`: 返回一个字符串，表示字符串发生变更的类型。具体看[文档](https://w3c.github.io/input-events/index.html#dom-inputevent-inputtype)，对于常见类型，Chrome 浏览器返回值如下：
    - `insertText`: 手动插入文本
    - `insertFromPaste`: 粘贴插入文本
    - `deleteContentBackward`: 向后删除
    - `deleteContentForward`: 向前删除
- `dataTransfer`: 该属性只在文本框接收粘贴内容(insertFromPaste)或拖拽内容(insertFromDrop)时有效。

### 触摸事件

**Touch 接口**

Touch 接口表示单个触摸点，触摸可能是一个手指，或一根触摸笔。

```js
var touch = new Touch(touchOptions)
```

touchOptions 配置如下：

- `identifier`: 必需，类型是整数，表示触摸点的唯一 ID。


**TouchList 接口**
**TouchEvent 接口**

### 拖拉事件

在网页中，除了元素节点默认不可以拖拉，其它(图片、链接、选中的文字)都可以拖拉。如果要让元素可以拖拉，可以设置`draggable`属性为`true`。

```js
<div draggable="true">此区域可拖拉</div>
```

要注意，给默认可以拖拉的元素设置`draggable`为`false`，该元素还是可以拖拉。

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

