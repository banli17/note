# 事件

## EventTarget接口

DOM的事件操作（监听和触发），都定义在`EventTarget`接口。Element节点、document节点和window对象，都部署了这个接口。此外，XMLHttpRequest、AudioNode、AudioContext等浏览器内置对象，也部署了这个接口。

该接口有三个方法：

- addEventListener： 绑定事件函数
- removeEventListener： 移除事件函数
- dispatchEvent： 触发事件

### addEventListener()

`addEventListener`方法用于在当前节点或对象上，定义一个特定事件的监听函数。

```
target.addEventListener(type, listener[, useCapture]);
```

老式浏览器规定必须写`useCapture`，所以为了兼容，需写上这个参数。

addEventListener方法可以为当前对象的同一个事件，添加多个监听函数。这些函数按照添加顺序触发。如果给同一事件添加多次同一个监听函数，该函数只会执行一次，多余的添加将自动被去除，不必手动removeEventListener()去除。
如果希望给监听函数传递参数，可以用匿名函数包装一下。

```
function print(x){console.log(x)}
el.addEventListener('click', function(){
    print('hello')
}, false)
```

### removeEventListener()

`removeEventListener`方法用来移除`addEventListener`方法添加的事件监听函数。

```
div.addEventListener('click', listener, false);
div.addEventListener('click', listener, true);
div.removeEventListener('click', listener, false);
div.removeEventListener('click', listener, true);

div.removeEventListener('click') // 报错，至少2个参数
div.removeEventListener('click, listener) // 默认只移除false
```

### dispatchEvent()

`dispatchEvent`方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了 `Event.preventDefault()`则返回false，否则返回true。

```
target.dispatchEvent(event)
```

`dispatchEvent`方法的参数是一个`Event`对象的实例。

```
el.addEventListener('click', hello, false)
var event = new Event('click')
el.dispatchEvent(event)
```

## 监听函数

DOM提供了三种方法用来为事件绑定监听函数。

### HTML标签的on-属性

```
<div onclick='say()' ></div>
```

这种绑定方式，里面是运行的代码，而不是函数。

一旦指定的事件发生，on-属性的值是原样传入JavaScript引擎执行。因此如果要执行函数，不要忘记加上一对圆括号。

另外，Element元素节点的setAttribute方法，其实设置的也是这种效果。

```
el.setAttribute('onclick', 'doSomething()');
```

### Element节点的事件属性

```
el.onclick = function(){}
```
使用这种方式指定的监听事件，只会在冒泡时触发，并且多次给同一个事件绑定事件函数，会被覆盖。

### addEventListener()

通过Element节点、document节点、window对象的addEventListener方法，也可以定义事件的监听函数。

这种绑定方法的优点：

- 可以针对同一个事件，添加多个监听函数。
- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发回监听函数。
- 除了DOM节点，还可以在window、XMLHttpRequest等对象上面，等于统一了整个JS的监听函数接口。

### this对象

- 元素通过addEventListener方法绑定的事件函数执行时，内部this指向该元素。

```
el.addEventListener('click', function(){
    // this -> el
}, false)

el.onclick = function(){
    // this -> el
}

// 3
function haha(){
    // this -> window
}
<div onclick='haha()'></div> 
// 或者 pElement.setAttribute('onclick', 'haha()');

// 4
function xixi(this){
    // this -> div
}
<div onclick='haha(this)'></div> 
```

## 事件模型

事件的传播分为三个阶段。

1. 从window传入到目标节点，叫做捕获阶段。
2. 在目标节点上触发，叫做目标阶段。
3. 从目标节点传出到window对象，叫做冒泡阶段。

事件传播： window -> document -> html -> body -> ...

利用事件冒泡机制，我们可以将子节点的事件监听函数绑定到父节点上，由父节点的监听函数统一处理多个子节点的事件。这种方法叫做事件委托，也叫做事件代理。

事件委托的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而且以后再添加子节点，监听函数依然有效。

如果希望事件到某个节点位置，不再传播，可以使用 event.stopPropagation() 方法。

```
p.addEventListener('click', function(event) {
  event.stopPropagation();
});
```

但是，stopPropagation方法只会阻止当前监听函数的传播，不会阻止<p>节点上的其他click事件的监听函数。如果想要不再触发那些监听函数，可以使用stopImmediatePropagation方法。

```
p.addEventListener('click', function(event) {
 event.stopImmediatePropagation();
});

p.addEventListener('click', function(event) {
 // 不会被触发
});
```

## 事件对象

事件发生以后，会生成一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象。

Event对象本身就是一个构造函数，可以用来生成新的实例。

```
event = new Event(typeArg, eventInit);
```

第一个参数是事件名称，第二个参数是事件对象的配置，该参数可以有以下两个属性。

- bubbles: 是否冒泡，默认是false
- cancelable: 是否可以被取消，默认是false

```
var ev = new Event('look', {
    bubbles: true,
    cancelable: false
})
```

ie8和以下版本，获取事件对象需要使用window.event。事件对象的target属性叫做srcElement属性。

```
var e = event || window.event;
var t = e.target || e.srcElement;
```

event.bubbles返回一个布尔值，表示当前事件是否会冒泡，只读。只能在新建事件时改变。除非显示声明，Event构造函数生成的事件，默认是不冒泡的。

event.eventPhase返回一个整数，表示事件目前所处的阶段。

- 0，事件目前没有发生
- 1，捕获阶段
- 2，目标阶段
- 3，冒泡阶段，只有bubbles属性为true，这个阶段才会发生。

event.cancelable 表示事件是否可以取消，只读。只能在新建事件时改变。默认是不可以取消的。

如果要取消某个事件，需要使用preventDefault方法，这会阻止浏览器对某种事件部署的默认行为。

```
window.addEventListener('click', function (e) {
    console.log(1)
    e.preventDefault()
    console.log(2)
})
// 始终输出 1 2
```

event.defaultPrevented属性返回一个布尔值，表示该事件是否调用过preventDefault方法。

```
window.addEventListener('click', function (e) {
    e.preventDefault()
    console.log(e.defaultPrevented)  // 需要放在preventDefault之后才能检测出true
})
```

event.currentTarget属性返回事件绑定的元素。在监听函数中，它就是this对象。

event.target属性返回触发事件的节点，即事件最初发生的节点。如果监听函数不在该节点触发，那么它的currentTarget属性返回的值不是一样的。

event.type 返回事件类型字符串。

event.detail 返回一个数值，表示事件的某种信息。具体含义和事件类型有关，对于鼠标事件，表示鼠标按键在某个位置按下的次数，比如dblclick的detail属性总是2。

event.timeStamp 表示从PerformanceTiming.navigationStart(相当于用户打开页面开始)到事件发生时距离的时间，单位是毫秒，精确到微秒。

如果要计算Unix纪元（1970-1-1 0点）到事件发生距离的时间，需要加上performance.timing.navigationStart。

event.screenX 和 event.screenY 表示事件发生时，鼠标距离屏幕的距离。

event.isTrusted 表示是否事件是用户真实触发的。可以用来区分dispatchEvent。

event.preventDefault() 方法取消浏览器对当前事件的默认行为，比如点击链接后，浏览器跳转到指定页面，或者按一下空格键，页面向下滚动一段距离，或者单击单选框选中。该方法生效的前提是，事件的cancelable属性为true。如果是false，则无效。

该方法不会阻止事件的进一步传播（可以用stopPropagation方法）。只要在事件的传播过程中（捕获阶段、目标阶段、冒泡阶段都可），使用preventDefault，该事件的默认方法就不会执行。

利用这个方法，可以为文本输入框设置校验条件，如果用户输入的不符合条件，则无法输入。

```
function checkName(e){
    if(e.charCode < 97 || e.charCode > 122) {
        e.preventDefault()
    }
}
input.addEventListener('keypress', checkName, false)
```

> `return false` 阻止默认行为，在使用on(比如el.onclick)绑定方式时有效，addEventListener下无效。它也不能阻止冒泡。

event.stopPropagation() 方法阻止事件在DOM中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上新定义的事件监听函数。

event.stopImmediatePropagation() 方法会阻止同事件后面绑定的监听函数执行，以及阻止传播。

```
div.addEventListener('click', function (e) {
        console.log(11)
        e.stopImmediatePropagation()
}, false)
div.addEventListener('click', function (e) {
    console.log(22)  // 不执行
}, false)
document.addEventListener('click', function (e) {
    console.log(333) // 不执行
}, false)
```

## 自定义事件和事件模拟

现代浏览器的写法很简单。
```
var e = new Event('drag')
div.dispatchEvent(e)
```

由于Event不支持带数据，所以有了 `new CustomEvent('drag', {name: 'zs'})` 这样的方法。

## 事件类型

**鼠标类**

```
click
mousedown
mouseup
mouseenter  // 和子元素无关
mouseleave
mouseover   // 移入到子元素会触发mouseout
mouseout
mousemove
oncontextmenu  // 右键
```

**键盘**
```
keydown
keypress
keyup
```

事件顺序是 `keydown -> keypress -> keyup`。

`keydown`和`keypress`的区别是：`keydown`所有的键盘按键都会触发，`keypress`是用来判断敲击的是哪个字符，只有字符才会触发。两者事件对象上的`keyCode`也不相同，keypress 是与ASCII码对应,i是105，而keydown的字符码会转成大写，比如按i 是大写I的ASCII码 73。

dom3新增了textInput事件，用来替代`keypress`。`textInput`支持中文输入法，而且只在输入框才会触发，而`keypress`不支持中文，且任何能获得焦点的控件都能触发。

**UI类事件**

```
load
unload
resize
scroll
```

## 事件兼容总结

**ie8及以下**

不支持addEventListener和removeEventListener，但是支持 attachEvent 和 detachEvent。而且只支持冒泡，不支持捕获。所以捕获在实际开发中用的很少。

el.onclick的方式，只能通过window.event获取事件对象。attachEvent 可以通过第一个参数event获取到。

阻止事件冒泡，需要使用 `event.cancelBubble = true`。
阻止默认行为，需要使用 `event.returnValue = false`
获取目标对象，需要使用 `event.srcElement`

下面是处理兼容的代码。

```
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

// 调用
on(document.body, 'click', function(e) {
  console.log('哈哈哈，好用！', e);
});
```

自定义网页右键菜单 http://ife.baidu.com/course/detail/id/26

## 参考资料

- http://javascript.ruanyifeng.com/dom/event.html
- http://javascript.ruanyifeng.com/dom/event-type.html