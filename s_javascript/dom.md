# 操作 css

jQuery 中的 .css() 方法功能强大，可读可写。学习本节操作 css 的目的就是能实现一个 jQuery 版的 css()。

## 学习资料

- [dom css 阮一峰](https://github.com/ruanyf/jstutorial/blob/gh-pages/dom/css.md)

## 样式相关的构造函数

我们写样式有三种形式：行内样式、link 标签和 style 标签。它们的构造函数分别如下：

```js
// CSSStyleDeclaration 的实例
div.style;
window.getComputedStyle(div);

// HTMLLinkElement
document.querySelector("link");

// CSSStyleSheet，包含link css文件的相关信息
document.querySelector("link").sheet;

// HTMLStyleElement
document.querySelector("style");

// CSSStyleSheet，包含 <style> 标签内 css 的相关信息
document.querySelector("style").sheet;

CSSStyleSheet.__proto__ == StyleSheet; // true

// MediaList：css的media属性
document.querySelector("style").sheet.media;

// CSSRuleList：css规则列表
document.querySelector("style").sheet.cssRules;

// CSSStyleRule：css的每一条规则
document.querySelector("style").sheet.cssRules[0];

CSSStyleRule.__proto__ == CSSRule; // true

// CSSMediaRule：css每一条规则的media
document.querySelector("style").sheet.cssRules[0].media;
```

再总结一下：

- 获取的 css 对象是 CSSStyleDeclaration 的实例，比如 div.style 、window.getComputedStyle(div)。
- 通过 .sheet 属性可以获取 link 或 style 的 css 内容对象，它是 CSSStyleSheet 实例。
- css 的内容会被解析为一个类数组 CSSRuleList，每一条规则是一个 CSSStyleRule

了解了上面的内容，接下来就简单了，都是各个构造函数的属性和方法。

## CSSStyleDeclaration

获取元素的样式有下面几种方法：

1. 通过 `Element.style` 。如 `div.style`、`div.getAttribute('style')`等。可以获取和设置行内样式。
2. `window.getComputedStyle()` 可以获取元素计算后属性，第二个参数还支持获取伪元素样式

通过上面两种方法获取的样式对象都是 `CSSStyleDeclaration` 的实例。

注意事项：

- 属性要用驼峰命名，`js`保留字需要在前面加前缀`css`，如 `cssFloat`。
- 获取的属性值都是字符串，设置时必须带单位，如 `divStyle.width = '100px'`。
- `Element.style` 返回的只是行内样式，`window.getComputedStyle()` 获取的是全部样式。

`CSSStyleDeclaration` 的实例属性和方法：

- cssText
- length
- parentRule
- getPropertyPriority()
- getPropertyValue()
- item()
- removeProperty()
- setProperty()

## CSS 模块的侦探

通过判断 typeof style.width 是否是字符串来侦探。如果是字符串类型，则表示支持，如果是 undefined 则表示不支持。

> `style.backgroundColor` 和 `style['background-color']`都可以，但是获取行内样式时不能通过后者，只能是驼峰命名。

```
function isPropertySupported(property) {
  if (property in document.body.style) return true;
  var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
  var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

  for(var i = 0; i < prefixes.length; i++){
    if((prefixes[i] + prefProperty) in document.body.style) return true;
  }

  return false;
}

isPropertySupported('background-clip')
// true
```

## CSS 对象

- `CSS.escape()` 用于转义 css 选择器里的特殊字符。

```js
<div id="foo#bar">

document.querySelector('#foo#bar') // null

// 字符串传入 querySelector 之前会先转义一次 \ 变为 '#foo\#bar'，所以要双重转义
document.querySelector('#foo\\#bar')

document.querySelector('#' + CSS.escape('foo#bar'))  // 成功得到div
```

- `CSS.supports()` 表示当前环境是否支持某一句 css 规则。

```
// 写法1
CSS.supports('transform-origin', '5px')  // true

// 写法2
CSS.supports('transform-origin: 5px')  // true
```

## StyleSheet 接口

1. `document.styleSheets` 返回当前页面所有 StyleSheet 实例。
2. 通过 `<style>` 元素的 sheet 属性获取的对象是 StyleSheet 的实例。

实例属性：

- disabled：样式表是否禁用，可以通过设置 disabled 为 true，

```
// 禁用样式表
<link rel="alternate stylesheet" href="1.css">

// 或
var link = document.querySelector('link')
link.disabled = true
```

- href： 样式表的网址，内嵌样式表是 null。只读属性。
- media：返回一个类数组 MediaList 实例，表示当前样式表适用于哪些媒介。还可以通过 `appendMedium('handheld')`、`deleteMedium('print')` 添加、删除设备。
- title
- type：通常是 `text/css`
- parentStyleSheet：css 的@import 可以加载其它样式表，parentStyleSheet 返回包含当前样式表的父样式表。如果已经是顶层，则返回 null。
- ownerNode：返回 StyleSheet 对象所在的 DOM 节点，通常是 `<link>` 或 `<style>`。
- cssRules：返回类数组 CSSRuleList 实例。每一项包含一个 css 规则，可以通过 cssText 属性得到对应的 css 字符串。还可以读写具体的那一条 css 命令。

```
styleSheet.cssRules[0].style.color = 'red';
styleSheet.cssRules[1].style.color = 'purple';
```

- ownerRule

**实例方法**

- `insertRule()`
- `deleteRule()`

## CSSStyleRule 和 CSSRule

![](./imgs/css-style-rule.png)

## css 事件

- transitionEnd

  - e.propertyName：发生 transiton 效果的 css 属性
  - e.elapsedTime：transition 持续的秒数，不包含 transition-delay 的时间。
  - e.pseudoElement：如果 transition 发生在伪元素，则返回伪元素的名称，以 :: 开头。如果不发生在伪元素上，则返回空字符串。

- animationstart
- animationend
- animationiteration：开始新一轮动画循环时触发，当 animation-iteration-count > 1 时有效。

- e.animationName：返回动画的 css 属性名。
- e.elapsedTime：动画已经运动的秒数
- animation-play-state 属性可以控制动画的播放和暂停。

```
element.style.webkitAnimationPlayState = "paused";
element.style.webkitAnimationPlayState = "running";
```

# Image

## 学习资料

- [DOM Image 阮一峰](https://github.com/ruanyf/jstutorial/blob/gh-pages/dom/image.md)

## HTMLImageElement 实例

生成 HTMLImageElement 实例的方式有：

获取到 `<img>` 元素，如 document.querySelector('img')

- new Image()
- document.images 的成员
- document.createElement('img)

## HTMLImageElement 属性

有些属性是很简单的，像下面这些：

- src 可读写，读的是图片完整的绝对地址
- currentSrc 只读，当前显示图片的地址，比如 `<img src='1.jpg'>`，刚开始图片没有加载完全时，currentSrc 为空字符串，加载完后才和 src 属性值一样。
- alt 图片的文字说明
- width, height 表示 `<img>` 的宽度和高度，值都是整数
- naturalWidth, naturalHeight 图像的实际宽度和高度。如果图片还没有加载完，则为 0
- complete 表示图片是否加载完成，如果 `<img>` 没有 src 属性或下载失败 onerror，也返回 true
- x, y： 图片相对于可视区左上角的位置
- onerror
- onload

还有些属性不太熟悉了，需要一个个查资料。

- isMap 对应 `<img>` 元素的 ismap 属性，返回布尔值，表示图像是否是服务器端的图像映射的一部分。
- useMap 对应 `<img>` 的 usemap 属性，表示当前图像对应的 `<map>` 元素。

- srcset 用于读写 `<img>` 的 srcset 属性。可单独使用。
- sizes 用于读写 `<img>` 的 sizes 属性，必须和 srcset 同时使用。

- **crossOrigin** 一旦设置了这个属性，表示图片跨域请求。它的值可能是： - anonymous 跨域请求不需要用户身份，默认值。空字符串会指向 anonymous。 - use-credentials 跨域请求要求用户身份 - 不带这个属性，会跳过 cors，即常规的请求图片
  crossorigin 应该在需要获取 script 脚本加载错误时启用。同时，需要设置服务端的 Access-Control-Allow-Origin 头字段。

- referrerPolicy 用于读写 `<img>` 的 referrerpolicy 属性，表示请求图像资源时，如何处理 http 请求的 referrer 字段。
  - no-referrer
  - no-referrer-when-downgrade：从 https 协议降为 http 协议时不发送 referrer。默认值
  - origin
  - origin-when-cross-origin
  - unsafe-url

```html
// 不带 referrer
<img src="./1.jpeg" id="img" alt="" referrerpolicy="no-referrer" />

// referrer:http://127.0.0.1:5500/static/front-1/dom/demo/image/1.html 当前页面
<img src="./1.jpeg" id="img" alt="" referrerpolicy="referrer" />

// Referer: http://127.0.0.1:5500/
<img src="./1.jpeg" id="img" alt="" referrerpolicy="origin" />

// 跨域时才是 origin，否则是当前页面
<img src="./1.jpeg" id="img" alt="" referrerpolicy="origin-when-cross-origin" />

// Referer: http://127.0.0.1:5500/static/front-1/dom/demo/image/1.html 当前页面
<img src="./1.jpeg" id="img" alt="" referrerpolicy="unsafe-url" />
```

##

- [跨域，你需要知道的全在这里](https://zhuanlan.zhihu.com/p/30777994)
- [什么是 JS 跨域访问？](https://www.zhihu.com/question/26376773)
- [有哪些方式可以实现跨域？](https://www.zhihu.com/question/264308740)
- [为什么浏览器要限制跨域访问?](https://www.zhihu.com/question/26379635)

# 事件和事件对象

## 事件

js 和 html 的交互是通过事件来实现的，用户对页面进行操作，然后执行事件函数。事件名有如：click、hover 等。事件绑定函数名是在事件名前面加`on`。

```javascript
div.onclick = function () {};
```

## 事件流

点击某个元素时，实际上也点击了其外层元素、body 和 document 等元素。事件流就是事件传播的方向。

```html
<html>
  <head></head>
  <body>
    <div></div>
  </body>
</html>
```

dom2 级事件规范规定，事件流有 3 个阶段。拿点击 div 元素为例，事件传播过程如下。

1. 事件捕获流：即从外层元素往里传播，到达目标元素之前。`document -> html -> body`。
2. 到达目标元素：div。
3. 事件冒泡流：即从 div 离开之后，`body -> html -> document`。

另外还规定，从捕获到目标元素阶段，不触发事件处理函数。

但是各浏览器的实现和规范有一些差异。差异如下：

1. 在目标元素，不管是从捕获来还是冒泡离开，都会触发事件处理函数。
2. 标准规定最上层传播到 document，但是 ie9 和 chrome 等浏览器会一直传播到 window。
3. ie8 及之前版本只支持事件冒泡流。
4. ie5.5 及之前版本冒泡时会跳过 html，从 body 直接到 document。

## 事件处理函数

给元素添加事件绑定函数的方法有 3 种。

**1、直接在 html 元素上绑定。**

```html
<div onclick="alert(1)"></div>
```

这种方式绑定的方法里，直接就可以使用 this、event 这些变量。另外如果是处于 form 里的 input 元素，直接可以使用变量。

```html
<form>
  <input name="name" onfocus="console.log(name)" />
</form>
```

**2、dom0 级事件绑定**

dom0 级事件绑定就是通过`on+事件名 = 事件处理函数`的方式。

```javascript
div.onclick = function () {};

// 移除事件处理函数
div.onclick = null;
```

**3、dom2 级事件绑定**

dom2 级事件绑定是通过`addEventListener()`方法进行绑定。

```javascript
div.addEventListener("click", function () {}, false);
```

第一个参数是事件名。第二个参数是事件处理函数，第三个是 true 表示事件处理函数在捕获阶段触发，false 表示在冒泡阶段触发。

通过这种方式绑定的事件处理函数可以通过`removeEventListener()`进行移除。注意第二个参数要是同一个函数才行。

```javascript
// error
div.addEventListener("click", function () {}, false);
div.removeEventListener("click", function () {}, false);

// right
div.addEventListener("click", handler, false);
div.removeEventListener("click", handler, false);
```

上面移除的匿名函数实际不是同一个函数。

dom2 级和 dom0 级事件绑定的主要区别是：dom0 级多个事件处理函数后者会覆盖前者，dom2 级可以有多个，触发顺序是绑定的先后顺序。

**4、ie 事件绑定**

ie8 及之前版本只有冒泡，它提供了`attachEvent`和`detachEvent`。

```javascript
div.attachEvent("onclick", function () {
  console.log(this === window); // true
});
```

ie 绑定事件和`addEventListener()`的区别是：

1. 只有冒泡
2. 第一个参数是`on`+事件名
3. attachEvent 事件绑定函数里的 this 是 window，而 addEventListener 里的是当前元素。
4. 事件处理函数触发顺序不同，attachEvent 是倒序，而 addEventListener 是正序。

**5、兼容性处理**

```javascript
function bindEvent(el, ename, handler) {
  if (el.addEventListener) {
    el.addEventListener(ename, handler, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + ename, handler);
  } else {
    el["on" + ename] = handler;
  }
  return handler; // 用于方便移除事件
}

function removeEvent(el, ename, handler) {
  if (el.removeEventListener) {
    el.removeEventListener(ename, handler, false);
  } else if (el.detachEvent) {
    el.detachEvent("on" + ename, handler);
  } else {
    el["on" + ename] = null;
  }
}
```

上面的兼容处理只是很简单的处理了一下，没有处理一些如 attachEvent this 的问题。不过现在 ie8 基本都淘汰了，没什么大问题。

## 事件对象

各浏览器都支持事件对象，只是方式不同。

### DOM 中的事件对象

事件对象包含事件的相关信息。比如点击鼠标时，鼠标在屏幕的位置，事件名等等。标准的事件对象是通过事件处理函数第一个参数自动传递的。

```html
<div onclick="alert(event)"></div>

div.onclick = function(event){} div.addEventListener('click', function(event){
console.log(event) }, false)
```

**取消事件默认行为**

事件默认行为是指一些元素会有默认的事件行为，比如点击 a 链接时，默认会跳转到其 href 属性的链接。取消的方法是通过`event.preventDefault()`。

```javascript
div.onclick = function (event) {
  event.preventDefault();
};

div.addEventListener(
  "click",
  function (event) {
    event.preventDefault(); // 加上这句
  },
  false
);
```

不过前提是这个默认行为能取消掉，可以通过`event.cancelable`来判断。

**事件对象常用的属性：**

- bubbles：表明事件是否冒泡
- cancelable：事件是否可以被取消
- currentTarget：当前绑定处理程序的元素
- target：事件发生的目标
- defaultPrevented：true 表示已经调用了`event.preventDefault()`
- detail：事件细节信息
- eventPhase：调用事件程序的阶段，1 表示捕获，2 表示处于目标，3 表示冒泡
- preventDefault()：取消事件默认行为
- stopImmediatePropagation()：取消事件捕获和冒泡，同时阻止后面绑定自身上处理程序的调用
- stopPropagation()：取消事件捕获和冒泡
- trusted：true 表示浏览器触发的事件，false 表示开发者创建的
- type：通过 type 可以用判断类型，一个处理函数处理多个事件类型。
- view：与事件关联的抽象视图，等同于发生事件的 window 对象

**this、currentTarget、target 关系**

this、currentTarget 是绑定的元素，target 是实际触发的元素。

```javascript
// 点击div元素
// 处理函数绑定在div本身上
div.onclick = function () {
  // this == currentTarget == target
};

// 处理函数绑定在父级body上
body.onclick = function () {
  // this == currentTarget == body
  // target == div
};
```

### IE 中的事件对象

ie 中 DOM0 级添加事件处理程序时，event 对象是 window 的属性。

```javascript
// 只是通过window.event
div.onclick = function(){
    var event = window.event
    console.log(event.type)  // 'click'
}

// window.event和参数event都可以
div.attachEvent('onclick', function(event){
    console.log(event.type)  // 'click'
    console.log(window.event.type)  // 'click'
})

// 通过event
<input type="button" value="click" onclick="console.log(event.type)"
```

**ie 事件对象的属性**

- cancelBubble：默认是 false，如果是 true 则取消冒泡，
- returnValue：默认是 true，如果是 false 则取消默认行为
- srcElement：事件的目标，和 target 一样。
- type：事件类型

注意：attachEvent 事件处理程序里的 this 是 window，所以使用`event.srcElement`获取元素，而不要使用 this。

## 跨浏览器事件对象

```javascript
var EventUtil = {
  addHandler: function () {},
  removeHandler: function () {},
  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.cancelBubble = true;
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.returnValue = false;
    }
  },
};
```

注意 ie 不支持事件捕获，所以上面方法只能阻止事件冒泡。

## 事件类型

事件类型分为下面几类：

- UI 事件

### UI 事件

UI 事件包括：load、unload、abort、error、

**load**

页面完全加载完成时，就会触发 window 上的 load 事件。有 2 种方式定义事件处理程序。

1、通过 addHandler

```javascript
EventUtil.addHandler(window, "load", function (event) {});
```

要注意这里 event.target 指向 document。ie 不会为这个事件设置 srcElement 属性。

![](./imgs/load.png)

2、通过 body 绑定 onload

```javascript
<body onload="alert('loaded')">
```

一般来说 window 上的任何事件都可以通过 body 绑定的方法指定。dom2 级规范规定在 document 而非 window 上触发 load 事件。但是所以浏览器都是在 window 上实现的。

图像也有 load 事件。

```
<img onload="">

// 注意这里img不一定是需要插入到body才下载，只要设置src就开始下载
var img = document.createElement('img')
img.onload = function(){}
document.body.appendChild(img)
img.src = 'xx.png'

// 通过new Image，注意并不是所有浏览器都将new Image当做 <img> 元素
// 也就是有些浏览器可以直接插入img，有些不能
var img = new Image()
img.src = 'xx.png'
```

> 在不属于 dom 文档的图像（包括未添加到文档的`<img>`和 Image 对象）上触发 load，ie8 及之前不会生成 event 对象，ie9 才修复。

另外，ie9+和现代浏览器支持`<script>`元素的 load 事件。不过和图像不同，它是插入到页面时才会开始下载。firefox3 之前其 event 对象是 document。ie 和 opera 还支持 `<link>` 元素的 load 事件，它也是插入到页面才下载。

**unload**

在页面卸载后(页面刷新或关闭)触发。所以页面加载后存在的对象，如 dom 等就已经不存在了。操作会报错。

```javascript
window.onunload = function () {
  console.log("hi"); // 会执行
  alert("hi"); // 不会执行
};
```

暂时没发现这个事件有什么用。

dom2 级事件本来是规定在 body 上有 unload 事件，单身浏览器在 window 上实现了。

**resize**

浏览器宽高变化时触发，这个事件在 window 上触发。

```javascript
window.onresize = function(){}

<body onresize="">
```

传入的 event.target 依然是 document。ie8 及之前版本没有提供任何属性。

firefox 是在用户停止调整窗口时触发 resize 事件，而其它浏览器都是在窗口变化 1px 就触发。

**scroll**

虽然 scroll 是在 window 上触发，但是它实际表示页面中元素的变化。在混杂模式下，可以通过`<body>`的 scrollLeft 和 scrollTop 监控这一变化；在标准模式下，除了 safari，都是通过`<html>`元素反映这一变化，safari 还是通过`<body>`。

```javascript
// safari3.1之前不支持document.compatMode
EventUtil.addHandler(window, "scroll", function (event) {
  if (document.compatMode == "CSS1Compat") {
    alert(document.documentElement.scrollTop);
  } else {
    alert(document.body.scrollTop);
  }
});
```

### 焦点事件

**blur**

**focus**

**focusin**

**focusout**

### 鼠标与滚轮事件

DOM3 级事件中定义了 9 个鼠标事件：

- `click`：当按下主鼠标键或回车键时触发。
- `dbclick`：双击主鼠标键时触发。
- `mousedown`：按下任何鼠标键时触发。
- `mouseenter`：首次移动到元素内时触发，不冒泡，而且移动到后代元素不会触发。
- `mouseleavel`：移动到元素外时触发，不冒泡，而且移动到后代元素不会触发。
- `mousemove`：鼠标指针移动时重复触发。不能通过键盘触发。
- `mouseout`：鼠标从元素移动到另一个元素时触发，包括子元素。不能通过键盘触发。
- `mouseover`：移动到另一个元素边界时触发，不能通过键盘触发。
- `mouseup`：抬起鼠标按钮时触发，不能通过键盘触发。

除了 mouseenter 和 mouseleave，所有鼠标事件都能冒泡，也可以取消，但取消鼠标会影响浏览器默认行为。

click、dbclick 都会依赖先行事件。中间事件取消了，它们就不会被触发。(不知如何取消？)。

1. mousedown
1. mouseup
1. click
1. mousedown
1. mouseup
1. click
1. dbclick

ie8 及之前版本有个 bug，顺序是 mousedown -> mouseup -> click -> mouseup -> dbclick。

DOM2 级事件不包括 dbclick、mouseenter、mouseleave。检测支持度的方法是：

```javascript
// 支持DOM2级事件
var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");

// 支持上面所有事件，注意没有s
var isSupported = document.implementation.hasFeature("MouseEvent", "3.0");
```

滚轮事件只有 mousewheel 事件，对应鼠标滚动或 Mac 触控板。

**属性**

- 视口坐标位置：clientX、clientY。注意不包括页面滚动距离。
- 页面坐标位置：pageX、pageY。页面没有滚动距离时和视口坐标位置一致。ie8 及之前版本没有这 2 个属性。

```
// ie8及之前版本，需要通过document.body（混杂模式）或 document.documentElement（标准模式）计算
通过 e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft)
```

- 屏幕坐标位置：screenX、screenY
- 修改键，shiftKey、ctrlKey、altKey 和 metaKey(win 或 mac cmd 键)检测对应键是否按下，返回布尔值。ie8 不支持 metaKey。
- mouseover 主元素是指得到光标的元素，相关元素是指失去光标的元素。mouseout 相反。相关元素可以通过 relatedTarget 属性获取(只有这 2 个事件有值，其它都是 null)。ie8 及之前不支持 relatedTarget，但 mouseover 对应 fromElement 属性，mouseout 对应 toElement 属性。

```javascript
var EventUtil = {
  getRelatedTarget(e) {
    if (e.relatedTarget) {
      return e.relatedTarget;
    } else if (e.toElement) {
      return e.toElement;
    } else if (e.fromElement) {
      return e.fromElement;
    } else {
      return null;
    }
  },
};

// 使用 EventUtil.getRelatedTarget(e).tagName
```

- mousedown、mouseup 事件中 e.button 属性表示按下或释放的鼠标键。

```
// DOM
0 主键
1 滚轮键
2 鼠标次键

// ie8及之前，不太实用
0 没按下
1 按下主键
2 按下次键
3 同时按下主、次键
4 按下中键
5 按下主、中键
6 按下次、中键
7 按下主、中、次键
```

```javascript
var EventUtil = {
    getButton(e){
        if(document.implementation.hasFeature('MouseEvents', '2.0'){
            return e.button
        }else{
            // ie不支持 2.0
            switch(e.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0
                case 2:
                case 6:
                    return 2
                case 4:
                    return 1
            }
        }
    }
}
```

- e.detail 表示鼠标在同一地方单击的次数，如果 mousedown 和 mouseup 之间移动了，则重置为 0。

### 鼠标事件

1、DOM3 相关的 9 个事件，以及分别的含义。

- click
- dbclick
- mousedown
- mousemove
- mouseup
- mouseenter
- mouseleave
- mouseover
- mouseout

2、鼠标事件常用的事件对象属性。

- clientX、clientY
- pageX、pageY
- screenX、screenY
- shiftKey、ctrlKey、altKey、metaKey
- e.relatedTarget
- e.button
- e.detail

3、滚轮事件

标准滚轮事件是`mousewheel`。会冒泡到 window 对象(ie8 冒泡到 document)。当鼠标滚轮向前滚动，event.wheelDelta 是 120 的倍数，向后滚动是 -120 的倍数（mac 相反），所以总结就是页面向上滚动是正数，向下滚动是负数。opera9.5 之前版本正负号是反的。

firefox 是`DOMMouseScroll`事件，鼠标向前滚动时，event.detail 为 -3 的倍数，向后滚动是 3 的倍数。(测试新版 ff，页面向下滚动为正数，向上为负数)。

```javascript
var EventUtil = {
    ...
    getWheelDelta(e){
        if(event.wheelDelta){
            return e.wheelDelta > 0 ? 1 : -1
        }else{
            return e.detail > 0 ? -1 : 1
        }
    }
}
```

上面的方法没有兼容 opera9.5 之前版本，当页面向上滚动时，getWheelDelta() 返回 1，向下滚动返回 -1。

## 键盘事件

键盘事件有 3 个：

- keydown
- keypress
- keyup

按下一个键时，会依次触发上面三个键；如果按住一个字符键(可以在输入框输入的字符，如空格，a 等)不放，会依次触发`keydown -> keypress -> keydown -> keypress ... -> keyup`。如果按下非字符键，则会只触发一次`keydown -> keyup`。注意 Caps Lock 键按下和抬起算一次，只会依次触发一次`keydown -> keyup`。

**键值**

- event.keyCode：表示按下的键码，貌似已废弃(旧浏览器支持)。

![](./imgs/keycode1.png)
![](./imgs/keycode2.png)

- event.charCode：在 keypress 事件时才有，表示按键的 ASCII 编码，数字类型，DOM3 不再包含。

```javascript
var EventUtil = {
  getCharCode(e) {
    if (typeof e.charCode === "number") {
      return e.charCode;
    } else {
      return e.keyCode;
    }
  },
};
```

获取到键值后，可以通过`String.fromCharCode()`转成对应字符。

- event.key：按键的 ASCII 码，用于取代 keyCode。如果是字符键则是字符(m,n)，非字符键就是键名(如 Shift、Down)。
- event.char：字符键返回字符，非字符键返回 null。不推荐使用。
- event.keyIdentifier：测试 chrome 不支持。
- event.location：表示按了什么位置的键盘。
  - 0 表示默认键盘
  - 1 左侧位置，如左 shift
  - 2 右侧位置，如右 shift
  - 3 数字小键盘
  - 4 移动设备键盘，也就是虚拟键盘
  - 5 表示手柄
- event.getModifierState()：表示活动的修改键，Shift、Ctrl、Alt、Meta。返回 true 或 false。

```javascript
event.getModifierState("Shift");

// 下面属性类似，鼠标按下时是否同时按下了ctrl等键
e.shiftKey;
e.altKey;
e.ctrlKey;
e.metaKey;
```

### textInput 事件

ie9+、chrome 等支持 textInput 事件，它会在输入框输入字符时触发 。和 keypress 的区别：

1. 只有可编辑区域才能触发 textInput，任何可获得焦点的元素都可以触发 keypress 事件。
2. textInput 事件在按下实际字符时才触发，keypress 在按下能影响文本显示的键时也触发(如退格)。
3. textInput 事件的 e.key 是 undefined，e.data 表示用户输入的字符，如`shift+s`就是`S`。

ie 支持 e.inputMethod 属性，表示文本输入到文本框的方式。

如果一个按下非字符键不放，则会连续触发 keypress。如果按下字符键不放，则会连续触发 keydown。

文本事件只有一个：`textInput`。在文本插入到输入框前触发。

## 复合事件

## 模拟事件

模拟事件的步骤：

1. 创建 event 对象。
2. 初始化 event 对象，即设置 type、clientX、clientY 等。
3. 触发事件 dispatchEvent(event 对象)。

### DOM 中的事件模拟

可以使用`document.createEvents(eventString)`来创建 event 对象。DOM2 里都是复数形式，DOM3 都变成了单数。

eventString 可以是：

- UIEvents：一般化 UI 事件，鼠标和键盘事件都继承自 UI 事件。DOM3 级中是 UIEvent。
- MouseEvents：一般化鼠标事件，DOM3 级中是 MouseEvent。
- MutationEvents：一般化 DOM 变化事件，DOM3 中是 MutationEvent。
- HTMLEvents：一般化 HTML 事件，没有对应的 DOM3 事件（HTML 事件被分散到其他类别中）

DOM2 没有规定键盘事件，DOM3 才正式规定。IE9 支持 DOM3 级键盘事件。

**1、模拟鼠标事件**

```javascript
// 创建事件对象
var e = document.createEvent("MouseEvents");

// 初始化事件对象
e.initMouseEvent("click");

// 触发事件
document.dispatchEvent(e);
```

initMouseEvent 可以接受 15 个参数，分别是：

- type
- bubbles
- cancelable
- view：几乎总是要设置成 document.defaultView
- detail
- screenX
- screenY
- clientX
- clientY
- ctrlKey
- altKey
- shiftKey
- metaKey
- button
- relatedTarget

# dom

## 简述

`dom` 的全称是 `document object model`。因为 html 渲染引擎 和 js 引擎是分开的，为了操作 html 和 xml 文档，而制定了一套接口，这套接口就是 dom。

html 会形成 dom 树 (所有的节点都是 Node 类的实例)。js 可以操作 dom 树。dom 树最终会渲染到页面上。

nodeName
nodeType
nodeValue
parentNode
childNodes
appendChild()
insertBefore()

常用的节点类型
1 Element 大写标签名
2 Attribute
3 Text #text
9 Document #document
11 DocumentFragment #document-fragment

# DOM 模型概述

## Node

### nodeName,nodeType,nodeValue

- `Document`：整个文档树顶层结构，#document，9
- `DocumentType`: `doctype`标签，等同于 DocumentType.name, 10
- `Element`：大写 HTML 元素名，1
- `Attribute`: Attr.name, 2
- `Comment`: #comment, 8
- `Text`: #text, 3
- `DocumentFragment`: #document.fragment, 11

由于只有 Text 节点、Comment 节点、XML 文档的 CDATA 节点有文本值，因此只有这三类节点的 nodeValue 可以返回结果，其他类型的节点一律返回 null。同样的，也只有这三类节点可以设置 nodeValue 属性的值。对于那些返回 null 的节点，设置 nodeValue 属性是无效的。

`node`的其它属性

- contentText: 返回节点内文本内容，会忽略 html 标签。设置的文本不会解析
- baseURI: 当前网页绝对路径，如果无法获取，则返回，只读。
- ownerDocument: 返回当前节点的顶层文档对象 document,document.ownerDocument 为 null
- nextSibling: 返回当前节点后第一个同级节点，包含文本和注释，没有则返回 null
- previousSibling
- parentNode: 当前节点的父节点。可能是 element，document,或 documentFragment，对于那些生成没有插入的 dom 树节点，父节点为 null
- parentElement: 返回当前节点的父 Element 节点，如果没有，则返回，ie 中只有 Element 节点有该属性，其它浏览器则是所有类型节点都有该属性
- childNodes: 返回 NodeList 集合，没有则返回空的 NodeList 集合，它是动态集合
- firstChild, lastChild

`node`的其它方法

- appendChild()
- hasChildNodes()
- cloneNode(): 参数表示是否要克隆子节点，不会克隆`addEventListener`和`on-`属性
- insertBefore()
- removeChild()
- replaceChild()
- contains()
- compareDocumentPosition()
- isEqualNode()
- normalize()

**NodeList 对象**
**HTMLCollection 对象**

**ParentNode 接口**

- children：返回动态 HTMLCollection 集合
- firstElementChild
- lastElementChild
- childElementCount

**ChildNode 接口**
Element,DocumentType,CharacterData 部署了 ChildNode 接口。

- remove()
- before()
- after()
- replaceWith()

## 属性的操作

- Elements.attributes : name/value 和 nodeName/nodeValue 一致。其它节点 attributes 为 null。Elements.hasAttributes()
- 元素节点属性可读可写，通过 `f.id`形式，注意 className 和 htmlFor(label 特有)。delete 不能删除属性
- html 属性值一般是字符串，但是 js 属性会自动转换类型。

**属性操作的方法**

- Element.getAttribute(): 返回当前节点指定属性，如果不存在，返回 null
- Element.setAttribute(): 新增属性，如果存在则覆盖
- Element.hasAttribute(): 是否包含某个属性
- Element.removeAttribute(): 移除属性

**和 html 对象属性的区别**

- 适用性`html` 标签对象属性操作，只适合标准属性和 js 添加的属性。
- 返回值是字符串，而对象属性返回各种类型，字符串，数值，布尔值，对象等
- 属性名，都是标准名称比如 class，for 等。对大小写不敏感

**dataset 属性**

- 自定义属性不能通过 html 代码校验
- 可以添加 data-属性，然后通过`.dataset.`的方式获取。删除可以直接使用 delete
- 还可以通过`getAttribute('data-foo')`操作
- 注意，data-后面的属性名有限制，只能包含字母、数字、连词线（-）、点（.）、冒号（:）和下划线（\_)。而且，属性名不应该使用 A 到 Z 的大写字母，比如不能有`data-helloWorld`这样的属性名，而要写成`data-hello-world`。
- 出现大写会转成小写 `data-helloWord` -> `helloworld`

## css 操作

1. 通过 getAttribute()、setAttribute()、removeAttribute()操作 style 对象
2. 可以直接通过`.style.width`方式来读写行内 css 样式。background-color -> backgroundColor。 如果是保留字，前面要加 css，比如 cssFloat
3. `style`对象下的`cssText`属性,可以读写和删除整个样式，不用改写 css 属性名
4. css 模块的侦探，

```
console.log(isPropertySupport('webkitTransform'))

function isPropertySupport(property) {
    if (property in document.body) return true

    var prefixs = ['webkit', 'ms', 'o', 'moz']

    var prefProperty = property.charAt(0).toUpperCase() + property.substring(1)

    for (var i = 0; i < prefixs.length; i++) {
        if ((prefixs[i] + prefProperty) in document.body.style) {
            return true
        }
    }
    return false
}

// 也可以使用 CSS.supports('background','red')
```

5. 读写行内样式，通过 Style 对象的方法: setProperty(), getPropertyValue(),removeProperty()，参数都是 css 属性名，不用改写

6. window.getComputedStyle(), 第一个参数是 dom 对象，第二个参数是伪元素。这个方法获取的 style 对象是经过计算后的，也可以使用上面的 getPropertyValue('height')方法。是只读的。

- 返回的 css 值是绝对单位，比如长度都是像素，带'px'单位，颜色是 rgb 或 rgba
- css 规则简写无效，比如读 margin 需要读 marginLeft 详细的属性
- 如果不是绝对定位，top，left 总是 auto
- 这个方法返回的样式对象的 cssText 属性无效， 是 undefined
- 样式对象是只读的，如果想设置，需要使用.style.的方法
- 伪元素默认是行内样式

7.

## dom 查找

- document.getElementById()
- [document|Element].getElementsByClassName() HTML Collection 多个元素，>ie8
- [document|Element].getElementsByTagName()
- [document|Element].querySelector() 只有一个元素
- [document|Element].querySelectorAll() 元素集合 NodeList，如果是多个 id 相同的也会都找到

## dom 新增和删除

insertBefore
appendChild

DocumentFragment
removeChild

## property 和 attribute

属性 property 是值 dom 节点上的如 nodeName 之类的属性
特性 attribute 是指 html 节点上如 id，class，style 之类的特性

- 公认的 HTML 元素特性会映射到元素节点属性上，也就是 id，style 在 dom 节点上也有。所以自定义的特性通过 .的方式获取不到。只能通过 getAttribute 获取。通过 .xxx='ooo' 设置也不会在节点上显示
- 特性对象通过 .attributes 可以得到，它是一个 NamedNodeMap

```
<img hidefocus='true' src=''>
```

比如上面的 hidefocus 和 src 都是 img 元素的特性。由于 src 是公认特性，它会映射到 dom 节点上，所以通过 getAttribute('src')和.src 都可以获取。但是 hidefocus 是自定义特性，不会映射到 dom 节点上，所以只能通过 getAttribute('hidefocus')获取到。

`Element.attributes`返回元素的特性对象，是一个实时变化的动态类数组。其它类型节点也有 attributes 属性，但是都返回 null。所以这个属性相当于是元素对象特有的。

注意，delete 不能删除元素的特性。

html 属性名转为 javascript 属性时，要使用驼峰拼写法，有两个特殊的，for 属性改写为 htmlFor，class 属性改写为 className。

另外，html 属性值一般是字符串，而 js 属性会自动转换类型，比如 onclick 转为函数，字符串 true 转为布尔值，style 属性转为一个 CSSStyleDeclaration 对象。

属性操作的标准方法有四个：

- getAttribute() // 如果属性不存在，则返回 null
- setAttribute() // 不需要转换大小写，直接 class、for 即可。如果属性不存在，则新增属性
- hasAttribute()
- removeAttribute()

为了方便访问和标准化自定义属性。html 新增了`data-*`这种属性，它会映射到 dom 节点的`dataset`属性上。注意 data-后面的属性名，不能使用大写字母，只能包含字母、数字、连词线、点(.)、冒号(:)和下划线(\_)，所以`data-helloWorld`应该写成`data-hello-world`。

```
div.dataset.foo  // 访问
div.dataset.foo = 'xxx'  // 设置
```

这种`data-*`属性可以直接通过`delete`命令删除。

除了可以使用`dataset`属性进行操作，也可以用 getAttribute('data-foo')这样的方法进行操作。

## 修改样式和内容

- 修改样式
  - style \$0.style.color
  - class className $0.classList.add()  $0.classList.remove()
- 修改内容
  - innerHTML outerHTML

## DOM 遍历

childNodes - NodeList 包含文本节点，注释节点

children - 只有元素节点
parentElement
parentNode // 常用

previousSibling 包含文本节点
previousElementSibling
nextSibling
nextElementSibling
firstChild
firstElementChild
lastChild
lastElementChild

## Text 节点

通常使用 `Node.firstChild()` 、`Node.nextSibling()` 等属性获取 Text 节点，或者使用 Document 节点的 createTextNode 方法创建一个 Text 节点。

浏览器原生提供了一个 Text 构造函数。它返回一个 Text 节点，它的参数就是文本内容。

```
var text = new Text('hello')
```

Text 节点除了继承 Node 节点属性和方法，还继承了 CharacterData 接口。下面的属性来自 CharacterData 接口。

## Text 节点的属性

```
new Text() instanceof Text  // true
new Text() instanceof CharacterData // true

Text.prototype -> Text对象
new Text().__proto__ -> Text对象
Text对象.__proto__ -> CharacterData对象
Text.__proto -> CharacterData构造函数
CharacterData.constructor -> Function
```

data 等同于 nodeValue，用来设置或去读取 Text 节点的内容。

wholeText 返回当前 Text 节点与毗邻的 Text 节点，作为一个整体返回。大多数情况下，wholeText 属性的返回值，和 data 属性和 textContent(Node 的属性)相同。比如下面的代码。但是当移除 em 元素后，wholeText 属性返回值就不同了。

```
<p>a<em>b</em>c</p>
```

length 返回 Text 节点字符长度。

```
(new Text('hello')).length
```

appendData() 用于在 Text 节点尾部追加字符串。
deleteData() 用于删除子字符串，第一个参数是子字符串位置，第二个参数是子字符串长度。
insertData() 用于在 Text 节点插入字符串，第一个参数是插入位置，第二个参数是插入的子字符串。
replaceData() 用于替换文本，第一个参数是替换开始位置，第二个参数是需要被替换掉的长度，第三个参数是新加入的字符串。
subStringData() 用于获取子字符串，第一个参数是子字符串的开始位置，第二个参数是长度。

remove() 方法用于移除当前 Text 节点。

```
document.querySelector('p').firstChild.remove()
```

splitText() 用于将 Text 节点一分为二，变成两个毗邻的 Text 节点，参数是分割位置，必填，分割到该位置前结束，如果分割位置不存在，则报错。该方法返回分割后方的字符串。原 Text 节点变为只包含分割位置前方的字符串。

normalize() 方法将毗邻的两个 Text 节点合并。

## DocumentFragment 节点

DocumentFragment 节点表示一个文档片段，本身就是一个完整的 DOM 树形结构，它没有父节点,parentNode 为 null。

创建可以通过 document.createDocumentFragment() 或原生的 DocumentFragment 构造函数。

一旦 DocumentFragment 节点被添加到当前文档，它自身就变成空节点（textContent 属性为空字符串），可以被再次利用。

如果想保存 DocumentFragment 节点的内容，可以使用 cloneNode 方法。

DocumentFragment 节点对象没有自己的属性和方法，全部继承自 Node 节点和 ParentNode 接口。也就是说它比 Node 节点多出以下四个属性。

- children 动态 HTML Collection 集合
- firstElementChild
- lastElementChild
- childElementCount

## Mutation Observer API

Mutation Observer API 用来监视 DOM 变动，DOM 节点增加、删除、属性变动、文本改动，这个 API 都会得到通知。

它和事件类似，但是区别是事件是同步触发的，而 Mutation Observer 是异步触发，DOM 节点变化后不会马上触发，而是所有 DOM 操作完成后再触发。

Mutation Observer 的特点：

- 它等待所有脚本任务完成后，才会运行，即采用异步方式。
- 它把 DOM 变动记录封装成一个数组进行处理，而不是一条条地个别处理 DOM 变动。
- 它既可以观察发生在 DOM 的所有类型变动，也可以观察某一类变动。

封装 DOM 动画类库（一） http://ife.baidu.com/course/detail/id/52

封装 DOM 动画类库（二）http://ife.baidu.com/course/detail/id/53

# dom 节点

document 节点是文档的根节点。可以通过下面方式获取。

- 对于正常的网页，document 或 window.document
- 包含某个节点的文档，使用 ownerDocument 属性
- 对于 iframe，使用 iframe 节点的 contentDocument
- 对于 ajax 返回的文档，使用 XMLHttpRequest 对象的 responseXML 属性。

```
document == window.document == document.body.ownerDocument
```

## 内部节点属性

快捷操作

## doctype, documentElement, defaultView, body, head

document.doctype 包含文档类型声明(DTD)。如果没有则返回 null。

```
document.doctype  // "<!DOCTYPE html>"
document.doctype.name // "html"
```

`document.firstChild` 通常返回这个节点。

`document.documentElement` 返回当前文档的根节点`<html>`。

`document.defaultView` 在浏览器中返回 document 对象所在的 window 对象，否则返回 null。

```
document.defaultView === window  // true
```

`document.body`返回当前文档的`<head>`节点，`document.body`返回当前文档的`<body>`。

```
document.head === document.querySelector('head')
document.body === document.querySelector('body')
```

这两个属性总存在，如果源码没有这两个标签，浏览器会自动创造。

`document.activeElement`属性返回当前文档中获得焦点的元素，通常可以用 tab 键移动焦点，使用空格激活焦点。

## 节点属性集合

以下属性返回文档内部特定元素的集合，都是类似数组的对象。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

### links, forms, images, embeds

`document.links` 属性返回当前文档所有设定了 href 属性的 a 及 area 元素。

`document.forms` 属性返回页面中所有表单元素 form。

`document.images`属性返回页面所有图片元素（即 img 标签）。

`document.embeds`属性返回网页中所有嵌入对象，即 embed 标签。

以上四个属性返回的都是 HTMLCollection 对象实例。

由于 HTMLCollection 实例可以用 HTML 元素的 id 或 name 属性引用，因此如果一个元素有 id 或 name 属性，就可以在上面这四个属性上引用。

```
// HTML代码为
// <form name="myForm" >

document.myForm === document.forms.myForm // true
```

### scripts, styleSheets

`document.scripts` 属性返回当前所有脚本（即 script 标签）。

document.scripts 返回的也是 HTMLCollection 实例。

document.styleSheets 属性返回一个类似数组的对象，代表当前网页的所有样式表。每个样式表对象都有 cssRules 属性，返回该样式表的所有 CSS 规则，这样这可以操作具体的 CSS 规则了。

## 文档信息属性

### document.documentURI, document.URI

`document.documentURI`属性和`document.URL`属性都返回一个字符串，表示当前文档的网址。不同之处是`documentURI`属性可用于所有文档（包括 XML 文档），URL 属性只能用于 HTML 文档。

```
document.documentURI === document.URL
```

`document.domain` 返回当前文档的域名。比如，某张网页的网址是 `http://www.example.com/hello.html`，domain 属性就等于`www.example.com`。如果无法获取域名，该属性返回 null。

### document.lastModified

document.lastModified 属性返回当前文档最后修改的时间戳，格式为字符串。

```
document.lastModified
// Tuesday, July 10, 2001 10:19:42
```

注意，lastModified 属性的值是字符串，所以不能用来直接比较，两个文档谁的日期更新，需要用 Date.parse 方法转成时间戳格式，才能进行比较。

document.location 属性返回 location 对象，提供了当前文档的 URL 信息。

document.referrer 表示当前文档的访问来源，如果无法获取来源或是直接输入网址，则返回空字符串。它的值和 http 头的 Referer 一致。但是它有 2 个 r。

document.title 返回当前文档的标题。

document.characterSet 返回当前文档的字符集。

document.readyState 返回当前文档的状态，共有三个可能性。

- loading: 加载 html 代码阶段
- interactive: 加载外部资源阶段
- complete: 加载完成时

这个属性变化的过程如下。

1. 浏览器开始解析 html 文档，document.readyState 的属性值为 loading。
2. 浏览器遇到 html 文档的 script 标签，并且没有 async 或 defer 属性，就暂停解析，开始执行脚本，这时 document.readyState 属性还是 loading。
3. html 文档解析完成，document.readyState 属性变成 interactive。
4. 浏览器等待图片、样式表、字体文件加载完成，一旦全部加载完成，document.readyState 属性变成 complete。

当这个属性变化时，document 对象上的 readystatechange 事件将被触发。

`DOMContentLoaded`事件发生在 interactive 和 complete 之间。

`document.designMode`属性控制当前文档是否可编辑，通常用在制作可见即可得的编辑器，打开 iframe 元素包含的文档的 designMode 属性，就能将其变成一个编辑器。

`document.implementation`属性返回一个对象，用来甄别当前环境部署了哪些 DOM 接口。`implementation`属性的`hasFeature`方法，可以判断当前环境是否部署了特定版本的特定接口。

```
document.implementation.hasFeature('HTML', '2.0')
// true

document.implementation.hasFeature('MutationEvents','2.0')
// true
```

`document.compatMode`返回浏览器处理文档的模式,可能值是 BackCompact(向后兼容模式，混杂模式) 和 CSS1Compat(严格模式)。一般来说，如果网页代码第一行设置了明确的 doctype，都会返回 CSS1Compat。在 ie 中，盒模型渲染默认是混杂模式，它的解释和标准浏览器有很大区别，而在严格模式下解释是一致的。document.getElementsByClassName() 混杂模式下回忽略大小写，在设置和读取 clientWidth、clientHeight、scrollTop、scrollLeft、scrollWidth 值时有问题。

`document.cookie`用来操作浏览器 Cookie。

`document.open()`用于新建一个文档，供 write 方法写入内容，它实际上等于清除当前文档，重新写入内容。

```
document.write("<html><p>remove me</p></html>");
setTimeout(()=>{
    document.open();
})
```

上面的代码需要延迟调用 document.open() 才行。页面加载完成后调用 document.write() 会自动发生 document.open()调用。

document.close 方法用于关闭 open 方法所新建的文档。一旦关闭，write 方法就无法写入内容了。如果再调用 write 方法，就等同于又调用 open 方法，新建一个文档，再写入内容。

搞不懂有什么用，搜到一点答案：[what-is-the-point-of-documentopen-and-documentclose-in-javascript](https://teamtreehouse.com/community/what-is-the-point-of-documentopen-and-documentclose-in-javascript)。

document.write() 在文档没有加载完时调用，会追加到内容后面，如果页面已经 DOMContentLoaded，再调用 write，它会先调用 open 方法，擦除当前文档所有内容，再写入。

document.writeln 方法与 write 方法完全一致，除了会在输出内容的尾部添加换行符。

## 查找节点的方法

- document.querySelector() 返回第一个匹配的节点。找不到则返回 null。
- document.querySelectorAll() 返回一个 NodeList 对象。

```
// 选中data-foo-bar属性等于someval的元素
document.querySelectorAll('[data-foo-bar="someval"]');

// 选中myForm表单中所有不通过验证的元素
document.querySelectorAll('#myForm :invalid');

// 选中div元素，那些class含ignore的除外
document.querySelectorAll('DIV:not(.ignore)');

// 同时选中div，a，script三类元素
document.querySelectorAll('DIV, A, SCRIPT');
```

它们不支持 css 伪元素选择器(比如:first-line 和:first-letter)和伪类选择器(比如:link 和:visited)。

`document.querySelectorAll()` 返回的不是动态集合。

`document.getElementsByTagName()` 返回一个 HTMLCollection 动态对象，因为 HTML 标签名大小写不敏感，所以这个方法对大小写不敏感。

`document.getElementsByClassName()`返回一个 HTMLCollection 动态对象。如果同时具有多个属性，用空格隔开，顺序不重要。正常模式下 css 的 class 是大小写敏感的，混杂模式下，大小写不敏感。

`document.getElementsByName()`方法用于选择拥有 name 属性的 HTML 元素（比如`<form>、<radio>、<img>、<frame>、<embed>和<object>`等），返回一个类似数组的的对象（NodeList 对象的实例），因为 name 属性相同的元素可能不止一个。

getElementById 方法返回匹配指定 id 属性的元素节点。如果没有发现匹配的节点，则返回 null。这个方法只能在 document 对象上使用，不能在其他元素节点上使用。

`document.elementFromPoint`方法返回位于页面指定位置最上层的 Element 子节点。

比如 100*100 的盒子在 375*667 的最右上角，只有当坐标点[275, 99]时，才刚好。[274,100]都在外面。不在视口内，则返回 null。如果 html 元素不可返回(比如文本框滚动条)，则返回它的父元素。

## 生成节点的方法

document.createElement 方法用来生成网页元素节点。参数为元素的标签名，即元素节点的 tagName 属性，对于 HTML 网页大小写不敏感，即参数为 div 或 DIV 返回的是同一种节点。如果参数里面包含尖括号（即<和>）会报错。

document.createTextNode()方法用来生成文本节点，参数为所要生成的文本节点的内容。这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击。

```
var div = document.createElement('div');
div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
console.log(div.innerHTML)
// &lt;span&gt;Foo &amp; bar&lt;/span&gt;
```

需要注意的是，该方法不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

```
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

var userWebsite = '" onmouseover="alert(\'derp\')" "';
var profileLink = '<a href="' + escapeHtml(userWebsite) + '">Bob</a>';
var div = document.getElementById('target');
div.innerHTML = profileLink;
// <a href="" onmouseover="alert('derp')" "">Bob</a>
```

document.createAttribute 方法生成一个新的属性对象节点，并返回它。

```
var node = document.getElementById("div1");
var a = document.createAttribute("my_attrib");
a.value = "newVal";
node.setAttributeNode(a);

// 和

var node = document.getElementById("div1");
node.setAttribute("my_attrib", "newVal");
```

DocumentFragment 对象是一个存在于内存的 DOM 片段，但是不属于当前文档，常常用来生成较复杂的 DOM 结构，然后插入当前文档。这样做的好处在于，因为 DocumentFragment 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

## 事件相关的方法

document.createEvent 方法生成一个事件对象，该对象可以被 element.dispatchEvent 方法使用，触发指定事件。

document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
以下三个方法与 document 节点的事件相关。这些方法都继承自 EventTarget 接口。

document.hasFocus 方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。注意，有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如如果用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。

document.createNodeIterator 方法返回一个 DOM 的子节点遍历器。

```
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);
```

上面代码返回 body 元素的遍历器。createNodeIterator 方法的第一个参数为遍历器的根节点，第二个参数为所要遍历的节点类型，这里指定为元素节点。其他类型还有所有节点（NodeFilter.SHOW_ALL）、文本节点（NodeFilter.SHOW_TEXT）、评论节点（NodeFilter.SHOW_COMMENT）等。

所谓“遍历器”，在这里指可以用 nextNode 方法和 previousNode 方法依次遍历根节点的所有子节点。

```
var nodeIterator = document.createNodeIterator(document.body);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}
```

上面代码使用遍历器的 nextNode 方法，将根节点的所有子节点，按照从头部到尾部的顺序，读入一个数组。nextNode 方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回 null。previousNode 方法则是先将指针移向上一个节点，然后返回该节点。

```
var nodeIterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT
);

var currentNode = nodeIterator.nextNode();
var previousNode = nodeIterator.previousNode();

currentNode === previousNode // true
```

上面代码中，currentNode 和 previousNode 都指向同一个的节点。

有一个需要注意的地方，遍历器返回的第一个节点，总是根节点。

（2）document.createTreeWalker()

document.createTreeWalker 方法返回一个 DOM 的子树遍历器。它与 createNodeIterator 方法的区别在于，后者只遍历子节点，而它遍历整个子树。

document.createTreeWalker 方法的第一个参数，是所要遍历的根节点，第二个参数指定所要遍历的节点类型。

var treeWalker = document.createTreeWalker(
document.body,
NodeFilter.SHOW_ELEMENT
);

var nodeList = [];

while(treeWalker.nextNode()) nodeList.push(treeWalker.currentNode);
上面代码遍历 body 节点下属的所有元素节点，将它们插入 nodeList 数组。

document.adoptNode 方法将某个节点，从其原来所在的文档移除，插入当前文档，并返回插入后的新节点。

```
node = document.adoptNode(externalNode);
document.importNode()
document.importNode方法从外部文档拷贝指定节点，插入当前文档。
```

```
var node = document.importNode(externalNode, deep);
```

document.importNode 方法用于创造一个外部节点的拷贝，然后插入当前文档。它的第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为 true。

注意，importNode 方法只是拷贝外部节点，这时该节点的父节点是 null。下一步还必须将这个节点插入当前文档的 DOM 树。

```
var iframe = document.getElementsByTagName('iframe')[0];
var oldNode = iframe.contentWindow.document.getElementById('myNode');
var newNode = document.importNode(oldNode, true);
document.getElementById("container").appendChild(newNode);
```

上面代码从 iframe 窗口，拷贝一个指定节点 myNode，插入当前文档。

`document.getSelection()` 这个方法指向 `window.getSelection()`。

# event-type 事件类型

## 鼠标事件

**click 和 dblclick**

`click` 发生在`mousedown`、`mouseup`之后，`dblclick`发生在`click`之后。双击也会触发 click 事件。

**mouseup、mousedown 和 mousemove**

mousemove 事件是连续触发的，有时间间隔。

**mouseenter、mouseleave**

mouseenter 在进入元素只会触发一次。不管子元素。

**mouseover、mouseout**

父元素进入子元素，或子元素进入父元素时，都会触发父元素的 mouseover 和 mouseout 事件。

**contextmenu**

右键时触发，或者按下"上下文菜单"键触发。

## MouseEvent 对象

鼠标事件使用 MouseEvent 对象表示，它继承 UIEvent 对象和 Event 对象。浏览器提供一个 MouseEvent 构造函数，用于新建一个 MouseEvent 实例。

```
event = new MouseEvent(typeArg, mouseEventInit);
```

MouseEvent 构造函数的第一个参数是事件名称（可能的值包括 click、mousedown、mouseup、mouseover、mousemove、mouseout），第二个参数是一个事件初始化对象。该对象可以配置以下属性。

### MouseEvent 实例属性

**altKey, ctrlKey, metaKey, shiftKey**

表示是否同时按了某个键。 `event.metaKey` 对应 mac 的 command，windows 的 windows 键。

**button, buttons**

返回事件的鼠标键信息。

button 返回一个数值，表示按了按个鼠标键。

- -1 没有按下键
- 0 主键，通常是左键
- 1 辅助键，通常是中键
- 2 按下次键，通常是右键

buttons 返回 3 个比特位的值，表示同时按下哪些键。

- 1: 二进制 001，表示左键
- 2: 二进制 010，表示右键
- 4: 二进制 100，表示中键或滚轮键

**clientX,clientY**

表示鼠标位置先弄个对于 document 左上角的位置，单位是像素，与页面是否有滚动条无关。

**movementX，movementY**

movementX 属性返回一个水平位移，单位为像素，表示当前位置与上一个 mousemove 事件之间的水平距离。在数值上，等于 currentEvent.movementX = currentEvent.screenX - previousEvent.screenX。

movementY 属性返回一个垂直位移，单位为像素，表示当前位置与上一个 mousemove 事件之间的垂直距离。在数值上，等于 currentEvent.movementY = currentEvent.screenY - previousEvent.screenY。

**screenX，screenY**

返回鼠标相对于屏幕左上角的位置。

**relatedTarget**

返回事件的次要相关节点，没有则返回 null。比如 focusin 是失去焦点的节点，dragenter 是将要离开的节点。

## wheel 事件

用户滚动鼠标滚轮，就会触发 wheel 事件。该事件继承 MouseEvent,UIEvent,Event 的属性。自己的属性如下：

- deltaX: 水平滚动量
- deltaY: 垂直滚动量，大于 0 表示向上滚动，小于 0 表示向下滚动。
- deltaZ: Z 轴滚动量
- deltaMode: 返回一个数值，表示滚动的单位，0 表示像素，1 表示行，2 表示页

## 键盘事件

**keydown,keypress,keyup**

- keydown：按下键盘时触发该事件。
- keypress：只要按下的键并非 Ctrl、Alt、Shift 和 Meta，就接着触发 keypress 事件。
- keyup：松开键盘时触发该事件。

执行的顺序是`keydown -> keypress -> keyup`，如果用户一直按键不松开，则键盘事件会连续触发，顺序是 `keydown -> keypress -> keydown -> keypress ... -> keyup`

键盘事件使用 KeyboardEvent 对象表示，该对象继承了 UIEvent 和 MouseEvent 对象。

```
window.onkeydown = (e)=> {
    if (e.ctrlKey && e.keyCode == 65) {
        window.open('http://baidu.com')
    }
}
```

## 进度事件

进度事件用来描述一个事件进展的过程，比如 XMLHttpRequest 对象发出的 HTTP 请求的过程、`<img>、<audio>、<video>、<style>、<link>`加载外部资源的过程。下载和上传都会发生进度事件。

进度事件有以下几种。

- abort 事件：当进度事件被中止时触发。如果发生错误，导致进程中止，不会触发该事件。
- error 事件：由于错误导致资源无法加载时触发。
- load 事件：进度成功结束时触发。
- loadstart 事件：进度开始时触发。
- loadend 事件：进度停止时触发，发生顺序排在 error 事件\abort 事件\load 事件后面。
- progress 事件：当操作处于进度之中，由传输的数据块不断触发。
- timeout 事件：进度超过限时触发。

有时候，图片加载会在脚本运行之前就完成，尤其是当脚本放置在网页底部的时候，因此有可能使得 load 和 error 事件的监听函数根本不会被执行。所以，比较可靠的方式，是用 complete 属性先判断一下是否加载完成。

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

# 事件

## EventTarget 接口

DOM 的事件操作（监听和触发），都定义在`EventTarget`接口。Element 节点、document 节点和 window 对象，都部署了这个接口。此外，XMLHttpRequest、AudioNode、AudioContext 等浏览器内置对象，也部署了这个接口。

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

addEventListener 方法可以为当前对象的同一个事件，添加多个监听函数。这些函数按照添加顺序触发。如果给同一事件添加多次同一个监听函数，该函数只会执行一次，多余的添加将自动被去除，不必手动 removeEventListener()去除。
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

`dispatchEvent`方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了 `Event.preventDefault()`则返回 false，否则返回 true。

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

DOM 提供了三种方法用来为事件绑定监听函数。

### HTML 标签的 on-属性

```
<div onclick='say()' ></div>
```

这种绑定方式，里面是运行的代码，而不是函数。

一旦指定的事件发生，on-属性的值是原样传入 JavaScript 引擎执行。因此如果要执行函数，不要忘记加上一对圆括号。

另外，Element 元素节点的 setAttribute 方法，其实设置的也是这种效果。

```
el.setAttribute('onclick', 'doSomething()');
```

### Element 节点的事件属性

```
el.onclick = function(){}
```

使用这种方式指定的监听事件，只会在冒泡时触发，并且多次给同一个事件绑定事件函数，会被覆盖。

### addEventListener()

通过 Element 节点、document 节点、window 对象的 addEventListener 方法，也可以定义事件的监听函数。

这种绑定方法的优点：

- 可以针对同一个事件，添加多个监听函数。
- 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发回监听函数。
- 除了 DOM 节点，还可以在 window、XMLHttpRequest 等对象上面，等于统一了整个 JS 的监听函数接口。

### this 对象

- 元素通过 addEventListener 方法绑定的事件函数执行时，内部 this 指向该元素。

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

1. 从 window 传入到目标节点，叫做捕获阶段。
2. 在目标节点上触发，叫做目标阶段。
3. 从目标节点传出到 window 对象，叫做冒泡阶段。

事件传播： window -> document -> html -> body -> ...

利用事件冒泡机制，我们可以将子节点的事件监听函数绑定到父节点上，由父节点的监听函数统一处理多个子节点的事件。这种方法叫做事件委托，也叫做事件代理。

事件委托的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而且以后再添加子节点，监听函数依然有效。

如果希望事件到某个节点位置，不再传播，可以使用 event.stopPropagation() 方法。

```
p.addEventListener('click', function(event) {
  event.stopPropagation();
});
```

但是，stopPropagation 方法只会阻止当前监听函数的传播，不会阻止<p>节点上的其他 click 事件的监听函数。如果想要不再触发那些监听函数，可以使用 stopImmediatePropagation 方法。

```
p.addEventListener('click', function(event) {
 event.stopImmediatePropagation();
});

p.addEventListener('click', function(event) {
 // 不会被触发
});
```

## 事件对象

事件发生以后，会生成一个事件对象，作为参数传给监听函数。浏览器原生提供一个 Event 对象，所有的事件都是这个对象的实例，或者说继承了 Event.prototype 对象。

Event 对象本身就是一个构造函数，可以用来生成新的实例。

```
event = new Event(typeArg, eventInit);
```

第一个参数是事件名称，第二个参数是事件对象的配置，该参数可以有以下两个属性。

- bubbles: 是否冒泡，默认是 false
- cancelable: 是否可以被取消，默认是 false

```
var ev = new Event('look', {
    bubbles: true,
    cancelable: false
})
```

ie8 和以下版本，获取事件对象需要使用 window.event。事件对象的 target 属性叫做 srcElement 属性。

```
var e = event || window.event;
var t = e.target || e.srcElement;
```

event.bubbles 返回一个布尔值，表示当前事件是否会冒泡，只读。只能在新建事件时改变。除非显示声明，Event 构造函数生成的事件，默认是不冒泡的。

event.eventPhase 返回一个整数，表示事件目前所处的阶段。

- 0，事件目前没有发生
- 1，捕获阶段
- 2，目标阶段
- 3，冒泡阶段，只有 bubbles 属性为 true，这个阶段才会发生。

event.cancelable 表示事件是否可以取消，只读。只能在新建事件时改变。默认是不可以取消的。

如果要取消某个事件，需要使用 preventDefault 方法，这会阻止浏览器对某种事件部署的默认行为。

```
window.addEventListener('click', function (e) {
    console.log(1)
    e.preventDefault()
    console.log(2)
})
// 始终输出 1 2
```

event.defaultPrevented 属性返回一个布尔值，表示该事件是否调用过 preventDefault 方法。

```
window.addEventListener('click', function (e) {
    e.preventDefault()
    console.log(e.defaultPrevented)  // 需要放在preventDefault之后才能检测出true
})
```

event.currentTarget 属性返回事件绑定的元素。在监听函数中，它就是 this 对象。

event.target 属性返回触发事件的节点，即事件最初发生的节点。如果监听函数不在该节点触发，那么它的 currentTarget 属性返回的值不是一样的。

event.type 返回事件类型字符串。

event.detail 返回一个数值，表示事件的某种信息。具体含义和事件类型有关，对于鼠标事件，表示鼠标按键在某个位置按下的次数，比如 dblclick 的 detail 属性总是 2。

event.timeStamp 表示从 PerformanceTiming.navigationStart(相当于用户打开页面开始)到事件发生时距离的时间，单位是毫秒，精确到微秒。

如果要计算 Unix 纪元（1970-1-1 0 点）到事件发生距离的时间，需要加上 performance.timing.navigationStart。

event.screenX 和 event.screenY 表示事件发生时，鼠标距离屏幕的距离。

event.isTrusted 表示是否事件是用户真实触发的。可以用来区分 dispatchEvent。

event.preventDefault() 方法取消浏览器对当前事件的默认行为，比如点击链接后，浏览器跳转到指定页面，或者按一下空格键，页面向下滚动一段距离，或者单击单选框选中。该方法生效的前提是，事件的 cancelable 属性为 true。如果是 false，则无效。

该方法不会阻止事件的进一步传播（可以用 stopPropagation 方法）。只要在事件的传播过程中（捕获阶段、目标阶段、冒泡阶段都可），使用 preventDefault，该事件的默认方法就不会执行。

利用这个方法，可以为文本输入框设置校验条件，如果用户输入的不符合条件，则无法输入。

```
function checkName(e){
    if(e.charCode < 97 || e.charCode > 122) {
        e.preventDefault()
    }
}
input.addEventListener('keypress', checkName, false)
```

> `return false` 阻止默认行为，在使用 on(比如 el.onclick)绑定方式时有效，addEventListener 下无效。它也不能阻止冒泡。

event.stopPropagation() 方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上新定义的事件监听函数。

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

由于 Event 不支持带数据，所以有了 `new CustomEvent('drag', {name: 'zs'})` 这样的方法。

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

`keydown`和`keypress`的区别是：`keydown`所有的键盘按键都会触发，`keypress`是用来判断敲击的是哪个字符，只有字符才会触发。两者事件对象上的`keyCode`也不相同，keypress 是与 ASCII 码对应,i 是 105，而 keydown 的字符码会转成大写，比如按 i 是大写 I 的 ASCII 码 73。

dom3 新增了 textInput 事件，用来替代`keypress`。`textInput`支持中文输入法，而且只在输入框才会触发，而`keypress`不支持中文，且任何能获得焦点的控件都能触发。

**UI 类事件**

```
load
unload
resize
scroll
```

## 事件兼容总结

**ie8 及以下**

不支持 addEventListener 和 removeEventListener，但是支持 attachEvent 和 detachEvent。而且只支持冒泡，不支持捕获。所以捕获在实际开发中用的很少。

el.onclick 的方式，只能通过 window.event 获取事件对象。attachEvent 可以通过第一个参数 event 获取到。

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

# Image 对象

Image 是浏览器内置构造函数，通过`new Image()`将返回一个`__proto__`属性 为 HTMLImageElement 的对象。`<img>`元素也是继承自 HTMLImageElement。

```
new Image() instanceof HTMLImageElement
new Image() instanceof Image

function Image(){
    return new HTMLImageElement()
}
```

new Image() 功能相当于 document.createElement('img')

- 获取图片节点 document.images

Image 构造函数可以接受 2 个参数，分别是图片的宽和高。

## 常用属性

- alt
- width、height
- naturalWidth,naturalHeight 图片的原始宽高，只读
- src
- complete 表示图片是否加载完成
- onload 指定图片加载完成后的回调函数
- isMap
- useMap
- crossOrigin 图片跨域的 CORS 设置

## Node 简介

html 树会渲染成 dom 树，而 dom 树正是一个个 Node 的实例，dom 树的顶层是 document 节点，它表示整个文档。它的根节点(root node)是 `<html>`。

| 名称                   | nodeType | nodeName                       | nodeValue                    |
| ---------------------- | -------- | ------------------------------ | ---------------------------- |
| ELEMENT_NODE           | 1        | 大写的标签名 'DIV'             | null                         |
| ATTRIBUTE_NODE         | 2        | 属性名                         | 属性值                       |
| TEXT_NODE              | 3        | #text                          | 文本的值                     |
| COMMENT_NODE           | 8        | #comment                       | 注释的文本，`<!-- -->`内的值 |
| DOCUMENT_NODE          | 9        | #document                      | null                         |
| DOCUMENT_TYPE_NODE     | 10       | html,根据`<!DOCTYPE html>`来的 | null                         |
| DOCUMENT_FRAGMENT_NODE | 11       | #document-fragment             | null                         |

## 节点关系

```

除了根节点，其它节点对于周围的节点都存在三种关系。

父节点关系：parentNode
子节点关系：childNodes
同级节点关系：sibling

DOM 提供操作接口，用来获取三种关系的节点。其中，子节点接口包括 firstChild、lastChild 等属性，同级节点包括 nextSibling 、previousSibling 属性。

```
