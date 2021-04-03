---
title: bom
---

bom 的全称是 browser object model，包含浏览器自身的一些信息。它主要包含下面几个对象。

- window
- location
- navigator
- history

history 表示浏览器的历史记录。

```
length 访问记录的长度
go()   可以跳转到某个历史记录，history.go(0)刷新页面
forward()   相当于history.go(1)
back()      相当于history.go(-1)，通常是从浏览器缓存中加载
```

除了上面的方法之外，h5 又新增了 `pushState` 和 `replaceState()`方法，它们主要用来实现现在的单页应用。

**pushState()和 replaceState()**

pushState() 可以推入一个 history 记录，用来修改当前页面的地址。

```
history.pushState(state, title, url)
```

- 目前所有浏览器都是忽略参数 title，填 null 即可。
- 它只会让地址栏改变，不会刷新页面。
- 如果 pushState 的 url 参数设置了一个新的锚点，不会触发 hashChange 事件，如果是跨域网址，则会报错。

> 这个方法在安卓下没有问题。ios 版本微信的链接按照首次进入的链接来算，pushState 无效。这个是一个坑，注意一下

需要注意的是调用 `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()）

https://developer.mozilla.org/zh-CN/docs/Web/API/History_API

location.hash = 'xx' 设置的时候，会触发 popstate 事件。

## popstate 事件

`popstate` 事件只会针对同一文档，不同的文档的跳转不会触发。

`popstate` 事件函数的 `event.state` 就是 `pushState` 的 `state`，也可以通过 `history.state` 获取。

页面第一次加载时，load 事件后，webkit 浏览器会触发 popstate 事件，而 firefox 和 ie 不会。实际测试时没有触发。

## URLSearchParams API

URLSearchParams API 用来处理查询字符串。没有这个 API 的浏览器可以用 [url-search-params](https://github.com/WebReflection/url-search-params/blob/master/src/url-search-params.js) 垫片。

```javascript
var a = "name=zhangsan&age=12";
var oa = new URLSearchParams(a);
console.log(oa.get("name")); // 'zhangsan'
```

- has()
- get() 返回指定参数的第一个值
- getAll() 返回一个数组，成员是指定参数的所有值
- set() 设置指定参数
- delete() 删除指定参数
- append() 在查询字符串中，追加一个键值对
- toString() 返回整个查询字符串

遍历所有参数

- keys()
- values()
- entries()

```
var searchParams = new URLSearchParams('key1=value1&key2=value2');

for (var key of searchParams.keys()) {
  console.log(key);
}
// key1
// key2

for (var value of searchParams.values()) {
  console.log(value);
}
// value1
// value2

for (var pair of searchParams.entries()) {
  console.log(pair[0]+ ', '+ pair[1]);
}
// key1, value1
// key2, value2
```

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of

在 Chrome 浏览器之中，URLSearchParams 实例本身就是 Iterator 对象，与 entries 方法返回值相同。所以，可以写成下面的样子。

```
for (var p of searchParams) {
  console.log(p);
}
```

下面是一个替换当前 URL 的例子。

```
// URL: https://example.com?version=1.0
var params = new URLSearchParams(location.search.slice(1));
params.set('version', 2.0);

window.history.replaceState({}, '', `${location.pathname}?${params}`);
// URL: https://example.com?version=2.0
```

`URLSearchParams`实例可以当作 POST 数据发送，所有数据都会 URL 编码。

```
let params = new URLSearchParams();
params.append('api_key', '1234567890');

fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)
```

DOM 的 a 元素节点的 `searchParams` 属性，就是一个 `URLSearchParams` 实例。

```
var a = document.createElement('a');
a.href = 'https://example.com?filter=api';
a.searchParams.get('filter') // "api"
```

`URLSearchParams` 还可以与 URL 接口结合使用。

```
var url = new URL(location);
var foo = url.searchParams.get('foo') || 'somedefault';
```

location 表示窗口的地址信息。

```
location.href
location.assign()
location.reload(true)
location.host
```

window 对象的 `navigator` 属性，指向一个包含浏览器信息的对象。

## 总览

- navigator.userAgent
- navigator.plugins
- navigator.platform
- navigator.onLine
- navigator.geolocation
- navigator.javaEnabled(), navigator.cookieEnabled
- navigator.connection
- navigator.vendor

## navigator.userAgent

`navigator.userAgent`属性返回浏览器的`User-Agent`字符串，标志浏览器的厂商和版本信息。

通过 userAgent 属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能。

不过，通过 `userAgent` 可以大致准确地识别手机浏览器，方法就是测试是否包含`mobi` 字符串。

```
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```

如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。

```
/mobi|android|touch|mini/i.test(ua)
```

## navigator.plugins

navigator.plugins 属性返回一个类似数组的对象，成员是浏览器安装的插件，比如 Flash、ActiveX 等。

## navigator.platform

`navigator.platform` 属性返回用户的操作系统信息。

```
MacIntel
```

## navigator.onLine

`navigator.onLine` 属性返回一个布尔值，表示用户当前在线还是离线。

## navigator.geolocation

`navigator.geolocation` 返回一个 Geolocation 对象，包含用户地理位置信息。这个对象下面有三个方法：

### getCurrentPosition()

getCurrentPosition() 方法用于获取设备当前位置。

```
navigator.geolocation.getCurrentPosition(success, error, options)
```

经测试，微信里面获取成功但是没数据。其它浏览器正常。

## navigator.javaEnabled(), navigation.cookieEnabled

`javaEnabled` 方法返回一个布尔值，表示浏览器是否能运行`Java Applet`小程序。

`cookieEnabled` 属性返回一个布尔值，表示浏览器是否能储存 `Cookie`。

注意，这个返回值与是否储存某个网站的 Cookie 无关。用户可以设置某个网站不得储存 Cookie，这时 cookieEnabled 返回的还是 true。

## navigator.connection

`navigator.connection` 属性返回一个当前网络状况的 NetworkInformation 对象。这是一个实验中的功能。

```
{
    downlink: 2.35,
    effectiveType: '4g',
    onchange: null,
    rtt: 400
}
```

## navigator.vendor

navigator.vendor 返回浏览器公司信息

window 有 2 个角色：

1. 它是全局 global 对象，很对对象都是它的属性，比如 location 这些对象。
2. 它表浏览器窗口，可以通过它获取窗口的一些信息。

## window 对象的常用属性

### window.window 和 window.name

window 有 2 种类型，一种是 window，另一种是 iframe 的 window。

- window：window 对象的 window 属性就是它自己。
- iframe
  - iframe.contentWindow 获取 iframe 的 window 对象。
  - iframe.contentDocument 获取 iframe 的 document 对象。
  - iframe.ownerDocument 获取 iframe 所在的 document 对象

```javascript
window.window == window  // true

var iframe = document.getElementById('iframe');
iframe.window    //

window.innerWidth 获取浏览器视口宽度
window.open()
```

window.name 属性用于设置当前浏览器窗口的名字。

### window.location

```javascript
window.location === document.location; // true
```

### window.closed, window.opener

`window.closed` 属性表示窗口是否关闭。一般用来检查使用脚本打开的新窗口是否关闭。

```javascript
var popup = window.open();
if (popup !== null && !popup.closed) {
  // 窗口仍然打开着
}
```

`window.opener` 属性返回打开当前窗口的父窗口，如果当前窗口没有父窗口，则返回 `null`。

```javascript
window.open().opener === window; // true
```

通过上面的方法，可以获取父窗口的变量和方法。

### window.frames，window.length

`window.frames` 返回一个由 `frame` 元素和 `iframe` 元素组成的类数组。

如果 iframe 元素设置了 id 或 name 属性，则可以通过 frames[id]或 frame.id 的方式来

`frames` 实际是 `window` 对象的别名。

```javascript
frames === window; // true
```

因此，frames[0] 也可以用 window[0] 表示。但是 frames 语义上更清晰。

window.length 属性与 window.frames.length 相等。

### window.screenX, window.screenY

`window.screenX`和`window.screenY`属性，返回浏览器窗口左上角相对于当前屏幕左上角(`(0,0)`)的水平和垂直距离。

### window.innerWidth, window.innerHeight

`window.innerWidth`和`window.innerHeight`属性，返回网页在当前窗口中可见部分的高度和宽度，即`视口(viewport)`，单位是像素。

当用户放大网页的时候，这两个属性会变小。因为这时网页像素大小不变，只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。

注意，这两个属性值包括滚动条的高度和宽度。

### window.outerWidth, window.outerHeight

`window.outerWidth` 和 `window.outerHeight` 属性返回浏览器窗口的宽度和高度，包括浏览器菜单和边框，单位是像素。

### window.pageXOffset, window.pageYOffset

`window.pageXOffset`属性返回页面的水平滚动距离，`window.pageYOffset`属性返回页面的垂直滚动距离，但是都是像素。

举例来说，如果用户向下拉动了垂直滚动条 75 像素，那么 window.pageYOffset 就是 75。用户水平向右拉动水平滚动条 200 像素，window.pageXOffset 就是 200。

### window.screen

window.screen 对象包含了显示设备的信息。

screen.height 和 screen.width 两个属性，一般用来了解设备的分辨率。

```javascript
// 显示设备的高度，单位为像素
screen.height; // 1920

// 显示设备的宽度，单位为像素
screen.width; // 1080
```

上面代码显示，某设备的分辨率是 1920x1080。

除非调整显示器的分辨率，否则这两个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。

下面是根据屏幕分辨率，将用户导向不同网页的代码。

```
if ((screen.width <= 800) && (screen.height <= 600)) {
  window.location.replace('small.html');
} else {
  window.location.replace('wide.html');
}
```

`screen.availWidth` 和 `screen.availHeight` 属性返回屏幕可用的宽度和高度，单位是像素。它们的值是屏幕的实际大小减去操作系统某些功能占据的空间，比如系统的任务栏。

`screen.colorDepth` 属性返回屏幕的颜色深度，一般是 16（16-bit）或 24 (24-bit)。也就是颜色种类。

## window 对象的方法

### window.moveTo(), window.moveBy()

window.moveTo() 方法用于移动浏览器窗口到指定位置，它接受 2 个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离。

window.moveBy() 方法将窗口移动到一个相对位置。

### window.scrollTo(), window.scrollBy()

window.scrollTo(x, y) 用于将网页滚动到距离浏览器左上角 x, y 的距离。它有个别名叫 window.scroll。

```
window.scrollTo === window.scroll  // false

window.scrollTo(0, 1000) // 页面滚动到1000px位置
```

window.scrollBy() 方法用于将网页移动指定距离，它接受 2 个参数：向右滚动的距离，向下滚动的距离。

### window.open(), window.close()

`window.open()`方法用于新建另一个浏览器窗口，并且返回该窗口对象。

```
var popup = window.open('1.html')
```

`open`方法一共可以接受四个参数：

1. 新窗口网址，如果省略，默认是 `about:blank`
2. 新窗口的名字，如果该名字的窗口已经存在，则调到该窗口，不再新建。如果省略，默认是 `_blank`，表示新建一个没有名字的窗口。
3. 新窗口的参数，内容是逗号分隔的键值对，比如有没有提示框，工具条等。如果省略，默认打开一个完整 UI 的新窗口。
4. 表示是否用参数 1 替换新窗口当前的网址，默认是 false。只有第二个参数指向已经存在的窗口时，才有意义。

```
var popup = window.open(
  'somepage.html',
  'DefinitionsWindows',
  'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
);
```

`window.close`方法用于关闭当前窗口，一般用来关闭`window.open`新建的窗口。该方法只对顶层窗口有效，`iframe`框架之中的窗口使用该方法无效。

### window.print()

`print()`方法会跳出打印对话框，和用户点击打印效果相同。手机没有打印功能，这时可以这样判断。

```
if(typeof window.print === 'function'){
    // 支持打印功能
}
```

### window.getComputedStyle()

该方法接收一个 html 元素作为参数，返回该 html 元素最终样式信息的对象。

### window.matchMedia()

`window.matchMedia()`用来检查 css 的 mediaQuery 语句。

### window.focus()

用于激活指定当前窗口，使其获得焦点。

```
var popup = window.open('popup.html', 'Popup Window');

if ((popup !== null) && !popup.closed) {
  popup.focus();
}


```

当前窗口获得焦点时，会触发 focus 事件，失去焦点会触发 blur 事件。不过窗口的 focus 的激活，需要先点一下该窗口的文档页面后切换窗口才行。

```
var a = window.open('1.html');
document.getElementById('btn').onclick = function () {
    if (a !== null && !a.closed) {
        a.focus()
    }
}
```

上面的代码，当点击按钮时，窗口会切换到 1.html。

### window.getSelection()

window.getSelection() 方法返回一个 Selection 对象，表示用户现在选中的文本。

使用该对象的 toString() 方法可以得到选中的文本。

## 多窗口操作

窗口的引用

- top
- parent
- self

与这些变量对应，浏览器还提供一些特殊的窗口名，供 open 方法、`<a>`标签、`<form>`标签等引用。

```
_top：顶层窗口
_parent：父窗口
_blank：新窗口
```

对于 iframe 嵌入的窗口，document.getElementById 方法可以拿到该窗口的 DOM 节点，然后使用 contentWindow 属性获得 iframe 节点包含的 window 对象，或者使用 contentDocument 属性获得包含的 document 对象。

`window.parent`引用父窗口，如果当前页面没有父窗口，则`window.parent`属性返回自身。因此，可以通过`window.parent`是否等于`window.self`，判断当前窗口是否为`iframe`窗口。

iframe 的 window 对象的 frameElement 属性，返回它在父窗口中的 DOM 节点。对于非嵌入的窗口，返回 null。

```
document.getElementById('iframe').contentWindow.frameElement === document.getElementById('iframe')
```

window.frames 返回 iframe 组成的类数组，每个成员是框架内的窗口，即(框架的 window 对象),而不是 iframe 在父窗口的 DOM 节点。

```
window.frames[0] === document.getElementById('iframe').contentWindow
```

如果 iframe 元素设置了 name 或 id 属性，那么属性值会自动成为全局变量，并且可以通过 window.frames 属性引用，返回子窗口的 window 对象。

```
// HTML代码为<iframe id="myFrame">
myFrame // [HTMLIFrameElement]
frames.myframe === myFrame // true
```

name 属性的值会自动成为子窗口的名称，可以用在 window.open 方法的第二个参数，或者`<a>`和`<frame>`标签的 target 属性。

## 事件

- onload
- onerror

## URL 的编码解码方法

网页 URL 的合法字符分成两类。

- URL 元字符：分号（;），逗号（’,’），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（\$），井号（#）
- 语义字符：a-z，A-Z，0-9，连词号（-），下划线（\_），点（.），感叹号（!），波浪线（~），星号（\*），单引号（\），圆括号（()`）

规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母。比如，UTF-8 的操作系统上，`http://www.example.com/q=春节`这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成`http://www.example.com/q=%E6%98%A5%E8%8A%82`。其中，“春”转成了`%E6%98%A5`，“节”转成了“%E8%8A%82”。这是因为“春”和”节“的 UTF-8 编码分别是 E6 98 A5 和 E8 8A 82，将每个字节前面加上百分号，就构成了 URL 编码。

encodeURI 方法会将元字符和语义字符之外的字符转义。它的参数通常是这个 URL。

```
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```

encodeURIComponent 会将语义字符之外的字符，元字符也会被转义。因此它的参数通常是 URL 的路径和参数值。

```
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```

**方法**

- alert()
- prompt(text[, default])
- confirm()

* [JavaScript 日期权威指南](https://juejin.im/entry/5b7d03306fb9a01a031af59b)
* https://juejin.im/entry/5835b54cc4c9710054a6093c
* http://momentjs.cn/docs/#/durations/

Date 日期是工作中经常要使用的对象。首先必须了解一下它的兼容性 Bug，再介绍它的详细使用方法。

## 兼容性 Bug(重要)

通过`new Date('2018-09-01 00:09:00')`这样的形式来生成日期，在 chrome 下是正常的，但是在 safari 下显示`Invalid Date`。所有浏览器都兼容的写法如下：

```javascript
var d = new Date(2011, 01, 07); // yyyy, mm-1, dd
var d = new Date(2011, 01, 07, 11, 05, 00); // yyyy, mm-1, dd, hh, mm, ss

var d = new Date("2011/02/07"); // "mm/dd/yyyy"
var d = new Date("2011/02/07 11:05:00"); // "mm/dd/yyyy hh:mm:ss"
var d = new Date("02/07/2011"); // "mm/dd/yyyy"
var d = new Date("02/07/2011 11:05:00"); // "mm/dd/yyyy hh:mm:ss"

var d = new Date(1297076700000); // milliseconds
var d = new Date("Mon Feb 07 2011 11:05:00 GMT"); // ""Day Mon dd yyyy hh:mm:ss GMT/UTC
```

所以只需要将 `-` 替换为 `/` 就可以了。

## 简介

- `UTC`:
- `GMT`:

## Date 构造函数

使用`new Date()`可以返回一个当前日期对象。如果不使用`new`关键字，将会返回一个时间字符串。

```javascript
Date("2019-01-02"); // "Fri Jan 04 2019 16:39:45 GMT+0800 (中国标准时间)"
typeof Date("2019-01-02"); //"string"

new Date("2019-01-02"); // Wed Jan 02 2019 08:00:00 GMT+0800 (中国标准时间)
typeof new Date("2019-01-02"); // "object"
```

new Date()传参数的形式有下面四种:

```javascript
// 不传参数，返回客户端当前的时间对象
new Date();

// 参数形式为时间戳，单位是毫秒
new Date(1453094034000);

// 参数形式为时间字符串
new Date("1995-12-17T03:24:00");

// 参数形式为年,月,日,时,分,秒,毫秒
new Date(1995, 11, 17); // Sun Dec 17 1995 00:00:00 GMT+0800 (中国标准时间)
new Date(1995, 11, 17, 1, 2, 2, 10); // Sun Dec 17 1995 01:02:02 GMT+0800 (中国标准时间)
```

要注意的是，在浏览器端，`new Date()`会将时间字符串自动转为本地时间。比如：

```javascript
new Date("Fri, 04 Jan 2019 08:16:01 GMT");
// Fri Jan 04 2019 16:16:01 GMT+0800 (中国标准时间)
```

可以看到，它自动将`GMT`时间转成了`GMT+0800(中国标准时间)`，也就是加了 8 小时的时区差。这在做一些定时活动页面时非常有用，因为需要检测当前时间(服务器时间，不能用本地时间，通过 ajax 服务器响应头的 date 字段可以得到)是否活动已经开始了。

## 常用函数

**1.获取某个日期加减多少天后的日期**

```
function getNewDate(date, changeDay){
    var t = new Date(date)
    return new Date(t.getFullYear(), t.getMonth(), t.getDate()+ changeDay)
}
```

使用 `new Date(2011, 1, 10)` 表示 `2011-2-10`。直接加减日期 10 就可以获取正确的时间。

**获取几月的第几周日期区间**

```javascript
function getWeek(year, month, week) {
  week = week || 0;
  var d = new Date();
  d.setFullYear(year, month - 1, 1);
  var w1 = d.getDay();
  if (w1 == 0) w1 = 7;
  d.setFullYear(year, month, 0);
  var dd = d.getDate();
  if (w1 != 1) d1 = 7 - w1 + 2;
  else d1 = 1;
  week_count = Math.ceil((dd - d1 + 1) / 7);
  // console.log(year + "年" + month + "月有" + week_count +"周");
  var arr = [];
  for (var i = 0; i < week_count; i++) {
    var monday = d1 + i * 7;
    var sunday = monday + 6;
    var from = year + "-" + month + "-" + monday;
    var to;
    if (sunday <= dd) {
      to = year + "-" + month + "-" + sunday;
    } else {
      d.setFullYear(year, month - 1, sunday);
      to = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    }
    arr.push({
      index: i + 1,
      from: from,
      to: to,
    });
    // console.log("第"+(i+1)+"周 从" + from + " 到 " + to + "");
  }
  return {
    arr: arr,
    w: arr[week - 1],
    week_count: week_count,
  };
}
```

## 属性描述符

对象的属性描述符有两种：数据描述符和存取描述符。设置时只能设置一种。

数据描述符和存取描述符共有的：

- `configurable`: 是否可配置：可修改(引用)，可删除，默认是 false。
- `enumerable`: 属性是否可枚举，默认是 false。

数据描述符特有：

- `value`: 默认是 undefined。
- `writable`: 为 true 时，value 才能被修改。默认是 false。

存取描述符特有：

- `get`: 访问属性时，会执行该方法。默认是 undefined。
- `set`: 设置属性时，会执行该方法，参数是赋的新值。默认是 undefined。

## 字符的 unicode 表示法

js 里一个字符是用 2 个字节表示的（UTF-16），但是有些字符是大于 0xFFFF 的，需要 4 个字节存储。js 会将它当作 2 个字符。这会导致之前的 charAt()、fromCharCode()方法有问题，所以新增了`codePointAt()`和`fromCodePoint()`方法。`for...of`可以正确判断出字符。

normalize()：unicode 正规化

```javascript
"\u01D1".normalize() === "\u004F\u030C".normalize();
// true
```

- includes()
- startsWith()
- endsWith()
- repeat()
- padStart()
- padEnd()

模版字符串

String.raw
