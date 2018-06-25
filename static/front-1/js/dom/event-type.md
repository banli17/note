# event-type事件类型

## 鼠标事件

**click 和 dblclick**

`click` 发生在`mousedown`、`mouseup`之后，`dblclick`发生在`click`之后。双击也会触发click事件。

**mouseup、mousedown和mousemove**

mousemove事件是连续触发的，有时间间隔。

**mouseenter、mouseleave**

mouseenter在进入元素只会触发一次。不管子元素。

**mouseover、mouseout**

父元素进入子元素，或子元素进入父元素时，都会触发父元素的mouseover和mouseout事件。

**contextmenu**

右键时触发，或者按下"上下文菜单"键触发。

## MouseEvent对象

鼠标事件使用MouseEvent对象表示，它继承UIEvent对象和Event对象。浏览器提供一个MouseEvent构造函数，用于新建一个MouseEvent实例。

```
event = new MouseEvent(typeArg, mouseEventInit);
```

MouseEvent构造函数的第一个参数是事件名称（可能的值包括click、mousedown、mouseup、mouseover、mousemove、mouseout），第二个参数是一个事件初始化对象。该对象可以配置以下属性。

### MouseEvent实例属性

**altKey, ctrlKey, metaKey, shiftKey**

表示是否同时按了某个键。 `event.metaKey` 对应mac的command，windows的windows键。

**button, buttons**

返回事件的鼠标键信息。

button返回一个数值，表示按了按个鼠标键。

- -1 没有按下键
- 0 主键，通常是左键
- 1 辅助键，通常是中键
- 2 按下次键，通常是右键

buttons返回3个比特位的值，表示同时按下哪些键。

- 1: 二进制001，表示左键
- 2: 二进制010，表示右键
- 4: 二进制100，表示中键或滚轮键

**clientX,clientY**

表示鼠标位置先弄个对于document左上角的位置，单位是像素，与页面是否有滚动条无关。

**movementX，movementY**

movementX属性返回一个水平位移，单位为像素，表示当前位置与上一个mousemove事件之间的水平距离。在数值上，等于currentEvent.movementX = currentEvent.screenX - previousEvent.screenX。

movementY属性返回一个垂直位移，单位为像素，表示当前位置与上一个mousemove事件之间的垂直距离。在数值上，等于currentEvent.movementY = currentEvent.screenY - previousEvent.screenY。

**screenX，screenY**

返回鼠标相对于屏幕左上角的位置。

**relatedTarget**

返回事件的次要相关节点，没有则返回null。比如focusin 是失去焦点的节点，dragenter是将要离开的节点。

## wheel事件

用户滚动鼠标滚轮，就会触发wheel事件。该事件继承MouseEvent,UIEvent,Event的属性。自己的属性如下：

- deltaX: 水平滚动量
- deltaY: 垂直滚动量，大于0表示向上滚动，小于0表示向下滚动。
- deltaZ: Z轴滚动量
- deltaMode: 返回一个数值，表示滚动的单位，0表示像素，1表示行，2表示页

## 键盘事件

**keydown,keypress,keyup**

- keydown：按下键盘时触发该事件。
- keypress：只要按下的键并非Ctrl、Alt、Shift和Meta，就接着触发keypress事件。
- keyup：松开键盘时触发该事件。

执行的顺序是`keydown -> keypress -> keyup`，如果用户一直按键不松开，则键盘事件会连续触发，顺序是 `keydown -> keypress -> keydown -> keypress ... -> keyup`

键盘事件使用KeyboardEvent对象表示，该对象继承了UIEvent和MouseEvent对象。

```
window.onkeydown = (e)=> {
    if (e.ctrlKey && e.keyCode == 65) {
        window.open('http://baidu.com')
    }
}
```

## 进度事件

进度事件用来描述一个事件进展的过程，比如XMLHttpRequest对象发出的HTTP请求的过程、<img>、<audio>、<video>、<style>、<link>加载外部资源的过程。下载和上传都会发生进度事件。

进度事件有以下几种。

- abort事件：当进度事件被中止时触发。如果发生错误，导致进程中止，不会触发该事件。
- error事件：由于错误导致资源无法加载时触发。
- load事件：进度成功结束时触发。
- loadstart事件：进度开始时触发。
- loadend事件：进度停止时触发，发生顺序排在error事件\abort事件\load事件后面。
- progress事件：当操作处于进度之中，由传输的数据块不断触发。
- timeout事件：进度超过限时触发。

有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能使得load和error事件的监听函数根本不会被执行。所以，比较可靠的方式，是用complete属性先判断一下是否加载完成。

```
function loaded() {
  // code after image loaded
}

if (image.complete) {
  loaded();
} else {
  image.addEventListener('load', loaded);
}
```



## 参考资料

- http://javascript.ruanyifeng.com/dom/event-type.html

















