---
title: "壹题面试题解答"
---

回答壹题项目面试题。

- 面试题地址：[https://github.com/Advanced-Frontend/Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question)



## 2. ['1','2','3'].map(parseInt)

parseInt 可以接收2个参数，字符串和基数。进制为2-32有效，如果是 0 undefined 之类且string参数不以“0x”和“0”开头时会默认为10进制。

```
1 0  -> 1
2 1  -> NaN
3 2  -> NaN
```

## 3. 防抖与节流区别与实现

防抖：n秒内函数只执行一次，如果事件再触发，则重新计算时间。
节流：针对高频事件触发，n秒内函数只执行一次。

## 4. Set、Map、WeakSet 和 WeakMap 的区别

## 7. ES5 和 ES6 继承的区别

1. 写法上
2. class 声明提升，但是不能使用，暂时性死区
3. class 内部会启用严格模式
4. class 的所有方法(静态方法和实例方法)都是不可枚举的
5. class 的所有方法都没有原型对象 prototype，所以也没有`[[construct]]`，不能用 new 调用。
6. class 必须使用 new 
7. class 内部无法重写类名， Foo='fol' 报错。
8. 子类继承父类，Sub.__proto__ === Super，Es5 Sub.__proto__ === Function.prototype

```
function Super(){}
let Sub = Object.create(Super)

Sub.__proto__ === Super;//true
```

9. this生成顺序不同。ES5 的继承先生成了子类实例，再调用父类的构造函数修饰子类实例，ES6 的继承先生成父类实例，再调用子类的构造函数修饰父类实例。这个差别使得 ES6 可以继承内置对象。
es6 子类的this必须先经过父类构造函数的处理，得到父类同样的实例属性和方法，然后再对其进行加工，加上自己的属性和方法，不调用 super() ，子类就得不到this

## 21. 判断数组的方法

> Object.prototype.toString.call() 、 instanceof 以及 Array.isArray() 的区别？

- 内置对象里都有一个`[[class]]`属性，可以通过`toString()`方法获得。所有数据类型都可以判断。通过Symbol.toStringTag 属性可以修改这个方法。
- instanceof 只能判断实例和类之间的关系，原型链也可以。另外如果 iframe 有问题。
- Array.isArray() 是 es5 新增的方法，判断数组很好。

## 26. 模块化发展历程

- IIFE 自执行函数
- AMD 依赖前置 requirejs CMD 支持动态引入 seajs
- COMMONjs  node
- UMD 兼容 AMD 和 commonjs
- es6

commonjs 和 es6 模块的区别？

## 27.全局下 const 声明变量在哪？

const、let、class 的变量会生成进入块级作用域。直接通过变量名获取。

## 33. 打印内容

```js
var b = 10;
(function b(){  // 这里是对b重新赋值
    b = 20;
    console.log(b); 
})();
```

1. 函数表达式和函数声明不同，函数名只在该函数内部有效，并且是常量绑定。
2. 对常量赋值，strict 模式下报错，非strict 模式下会静默失败。
3. iife 是函数表达式，不是函数声明。

## 34. 改造上题，分别打印10和20

打印10

```js
var b = 10;
(function b(){ 
    b = 20;
    console.log(window.b); 
})();
```

打印20

```js
var b = 10;
(function b(b) {
 b = 20;
 console.log(b)
})(b)
```

## 39. 介绍下 BFC 及其应用?

BFC 是块级格式化上下文。正常流的排版分为3种情况：
- 遇到行级元素，归入行级格式化上下文。行级元素是从左往右边排列(根据文字方向)，如果排不下，会新起一行盒，行盒是块级，归入块级格式化上下文。
- 遇到块级元素，归入块级格式化上下文。块级元素是独占一行，从上往下排列。
- 遇到 float 元素，顶部与当前行级格式化上下文对齐，左右边缘根据浮动左右与块级格式化上下文对齐。

行内盒子上下 margin 失效
特点是：
1. 块级格式化上下文包含其内的所有元素，包括浮动盒子，所以会计算高度。
2. BFC 里的元素上下 margin 会重叠。这个可以理解为 margin 是盒子之间的最小距离
3. BFC 内的元素会一个个从上往下放置。

新建 BFC 的方式：
1. 浮动元素
2. 绝对定位元素 poa pof
3. 非块级，但是能包含块的容器，如 inline-block，table-cell，table-captions
4. 块级元素设置 overflow: 非 visible，如 auto
5. 弹性盒子，网格元素

应用场景：
- 清除浮动
- margin 重叠



## 41. 输出

```js
var a = 10;
(function () {
    console.log(a)  // undefined
    a = 5     
    console.log(window.a)  // 10
    var a = 20;
    console.log(a)   // 20
})()
```

## 43. 输出结果

> 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果?

102、15、22、29、3、8。是按字典序来的。


## 46. 输出结果

```js
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)

```

{2:1,3:2,length:4} ，是从 length+1 开始替换



## 绝对定位是根据父元素的什么

padding?border?content

始终是以 content， left top:0 都是 content 左上角

fixed 不写 left top 是相对于 content，写了是相对于可是区域左上角。


绝对定位

一旦给元素加上absolute或float就相当于给元素加上了display:block
absolute元素覆盖正常文档流内元素（不用设z-index，自然覆盖）
可以减少重绘和回流的开销（如absolute+ top:-9999em，或absolute + visibility:hidden，将动画效果放到absolute元素中）

属性介绍

static，默认值。位置设置为static的元素，它始终会处于文档流给予的位置。
inherit，规定应该从父元素继承 position 属性的值。但是任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 “inherit”。
fixed，生成绝对定位的元素。默认情况下，可定位于相对于浏览器窗口的指定坐标。元素的位置通过 “left”, “top”, “right” 以及 “bottom” 属性进行规定。不论窗口滚动与否，元素都会留在那个位置。但当祖先元素具有transform属性且不为none时，就会相对于祖先元素指定坐标，而不是浏览器窗口。
absolute，生成绝对定位的元素，相对于距该元素最近的已定位的祖先元素进行定位。此元素的位置可通过 “left”、”top”、”right” 以及 “bottom” 属性来规定。
relative，生成相对定位的元素，相对于该元素在文档中的初始位置进行定位。通过 “left”、”top”、”right” 以及 “bottom” 属性来设置此元素相对于自身位置的偏移。

浮动、绝对定位和固定定位会脱离文档流，相对定位不会脱离文档流，绝对定位相对于该元素最近的已定位的祖先元素，如果没有一个祖先元素设置定位，那么参照物是body层。
绝对定位相对于包含块的起始位置：

如果祖先元素是块级元素，包含块则设置为该元素的内边距边界。
如果祖先元素是行内元素，包含块则设置为该祖先元素的内容边界。

问答题：

定位的元素的起始位置为父包含块的内边距（不会在border里，除非使用负值，会在padding里）
定位的元素的margin还是能起作用的
background属性是会显示在border里的
z-index是有层叠层级的，需要考虑同一个层叠上下文的层叠优先级
z-index是负值不会覆盖包含块的背景色（但是如果有内容，会被包含块的内容覆盖）
z-index的值影响的元素是定位元素以及flex盒子
上面一个定位元素，下面一个正常流的元素，定位元素会覆盖在正常流元素之上，除非给z-index是负值
页面根元素html天生具有层叠上下文，称之为“根层叠上下文”

## 52. 怎么让一个 div 水平垂直居中

**水平居中**

若是行内元素，给其父元素设置text-align:center即可实现行内元素水平居中
若是块级元素，该元素设置margin:0 auto即可（元素需要定宽）
若是块级元素，设置父元素为flex布局，子元素设置margin:0 auto即可（子元素不需要定宽）
使用flex 2012年版本布局，可以轻松的实现水平居中
使用绝对定位和CSS3新增的属性transform


基础布局

```html
<div class='parent'>
    <div class="child"></div>
</div>

.parent {
    outline: solid 1px red;
    width: 200px;
    height: 200px;
}

.child {
    width: 50px;
    height: 50px;
    background: blue;
}
```


布局方式如下：

1. flex 布局

```css
// 1
.parent{
    display: flex;
    align-items: center;
    justify-content: center;
}

// 2
.parent{
    display: flex;
}
.child{
    margin: auto
}
```

2. grid 布局

```css
.parent{
    display: grid
}
.child{
    align-self: center;
    justify-self: center;
}

// 2 
.child{
    margin: auto
}
```

3. absolute

```css
.parent{
    position: relative
}

// 1
.child{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:atuo;
}

// 2
.child{
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

// 3
.child{
    position:absolute;
    left: 50%;
    top: 50%;
    margin-left: -25px;
    margin-top: -25px;
}
```

4. table-cell

```css
.parent{
    display: tabel-cell;
    text-align: center;
    vertical-align: middle
}
.child{
    display: inline-block
}

// 如果只要文字居中，可以
.parent{
    display: table
}
.child{
    display: table-cell;
    vertical-align: middle;
    text-algin: center;
}
```


## 53. 执行结果

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```

.运算优先级高。 相当于

```
b = {n: 1}
a.x = {n:1, x:{n:2}}  // 实际修改了b
a = {n:2}

a.x // undefined
b.x = {n:2}
```

变形如下：

```js
var a = {n: 1};
var b = a;
a = a.x = {n: 2};

console.log(a.x) 	
console.log(b.x)
```

实际是一样。


## 57. 三种透明方案的分析比较

分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。


结构上： display:none 不会进 render tree，不占空间，opacity:0 占据空间，只是内容不可见，可点击，visibility:hidden，占据空间，内容不可见。

|属性| 显示时 | 占位|子元素|备注|
|--|--|--|--|
|`display:none`|重排|不占|无法显示||
|`visibility:hidden`|重绘|占|visiblility:visible可显示|
|`opacity:0`|重绘，重建图层，性能消耗少|占|无法显示|不进render tree|


问：用 CSS 隐藏页面上的一个元素有哪几种方法？

- 设置 fixed 并设置足够大负距离的 left top 使其“隐藏”；
- 用层叠关系 z-index 把元素叠在最底下使其“隐藏”；
- 用 text-indent:-9999px 使其文字隐藏。

## 58. 箭头函数和普通函数的区别

- 预解释
- 箭头函数没有自己的 this 
- 没有 function 关键字，不能用作 generator
- 不可以使用 arguments
- 不能 new
    - 因为没有自己的this，无法调用 call，apply
    - 没有 prototype



## 60. 覆盖 import 让图片宽度 300px

已知如下代码，让图片宽度 300px。

```html
<img src="1.jpg" style="width:480px!important;" />
```

方法如下：

```html
// 1
<img src="http://resource.muyiy.cn/image/winter.jpg" style="width:300px!important" style="width:480px!important;"  />

// 2
img{
    transform: scale(0.625)
}

// 3
img{
    max-width: 300px;
}

// 4
img{
    box-sizing: border-box;
    padding: 0 90px;
}

// 5. 动画样式优先级高于 important
img {
    animation: test 0s forwards;
}
@keyframes test {
    from {
        width: 300px;
    }
    to {
        width: 300px;
    }
}

// 6.zoom CSS 属性会根据 @viewport 来初始化一个缩放因数。
img {
    zoom: 0.625;
}
```

## 65. a.b.c 和 a['b']['c'] 性能


## 66. ES6 代码转 ES5 代码的思路

1. 生成AST，将字符串解析成抽象语法树  @babel/parser
2. 处理AST，进行替换  @babel/core 的 transformFromAstSync   @babel/traverse 来获取依赖文件
3. 将 AST 树转成代码字符串


## 68.如何解决移动端 1px 像素问题？

## 73.介绍下 BFC、IFC、GFC 和 FFC?


## 75. 数组取值

> 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少?

O(1) 基本一样。 js 里的数组实际是哈希表。

## 76. 输出结果

```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);  // c

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);  // 'b'

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);  // c
```

再看一下数据类型转换 toString() 和 valueOf()。

## 79.input处理中文

```js
function jeiliu(timeout){
    var timer;
    function input(e){
    if(e.target.composing){
        return ;
    }
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
            console.log(e.target.value);
            timer = null;
        }, timeout); 
    }
    return input;
}

function onCompositionStart(e){
    e.target.composing = true;
}
function onCompositionEnd(e){
    //console.log(e.target)
    e.target.composing = false;
    var event = document.createEvent('HTMLEvents');
    event.initEvent('input');
    e.target.dispatchEvent(event);
}
var input_dom = document.getElementById('myinput');
input_dom.addEventListener('input',jeiliu(1000));
input_dom.addEventListener('compositionstart',onCompositionStart);
input_dom.addEventListener('compositionend',onCompositionEnd);
```

## 83.var let const 区别和实现原理

声明、初始化、赋值
var 声明和初始化提前了 undefined
let 只声明了，没有初始化，所以 not define

是执行到作用域的时候 预解释


## 96. 前端加密场景和方法

场景
1. 密码， http是明文传输，别人获取密码后可以进入网站或猜它另外网站的密码。

方法是：
- https
- 使用加密算法进行加密
- 前端逻辑混淆压缩 webpack

增加攻击者的成本


## 98. 打印结果

```js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);  // baidu.com
```

## 100. 打印结果

```js
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
Foo.prototype.a = function() {
    console.log(3)
}
Foo.a = function() {
    console.log(4)
}
Foo.a();  // 4
let obj = new Foo();
obj.a();  // 2
Foo.a();  // 1
```

## 106. 返回值

```js
String('11') == new String('11');  // true
String('11') === new String('11');  // false
```

## 108. 打印结果

```js
var name = 'Tom';
(function() {
    if (typeof name == 'undefined') {
        var name = 'Jack';
        console.log('Goodbye ' + name);  // Goodbye Jack
    } else {
        console.log('Hello ' + name);
    }
})();
```

## 109. 打印结果

```js
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();
```

## 116. 输出结果

```js
1 + "1"   // '11'

2 * "2"   //  4

[1, 2] + [2, 1]   // '1,22,1'

"a" + + "b"   // "aNaN"
```

加号作为一元运算符时，其后面的表达式将进行ToNumber(参考es规范)的抽象操作：

true -> 1
false -> 0
undefined -> NaN
null -> 0
’字符串‘ -> 字符串为纯数字时返回转换后的数字（十六进制返回十进制数），否则返回NaN
对象 -> 通过ToPrimitive拿到基本类型值，然后再进行ToNumber操作

## 136. 实现骨架屏

https://github.com/Jocs/jocs.github.io/issues/22


## koa2

- 介绍koa2
- 使用过的koa2中间件
- koa2中间件原理
- koa-body原理
- 介绍自己写过的中间件
- koa原理，为什么要用koa(express和koa对比)
- 使用的koa中间件
- koa中response.send、response.rounded、response.json发生了什么事，浏览器为什么能识别到它是一个json结构或是html
- koa-bodyparser怎么来解析request

## pm2

- 介绍pm2
- master挂了的话pm2怎么处理
- pm2怎么做进程管理，进程挂掉怎么处理
- 不用pm2怎么做进程管理


## 网络

### 首屏加载优化
https://link.juejin.im/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F26710831
Vue-Router路由懒加载（利用Webpack的代码切割）
使用CDN加速，将通用的库从vendor进行抽离
Nginx的gzip压缩
Vue异步组件
服务端渲染SSR
如果使用了一些UI库，采用按需加载
Webpack开启gzip压缩
如果首屏为登录页，可以做成多入口
Service Worker缓存文件处理
使用link标签的rel属性设置   prefetch（这段资源将会在未来某个导航或者功能要用到，但是本资源的下载顺序权重比较低，prefetch通常用于加速下一次导航）、preload（preload将会把资源得下载顺序权重提高，使得关键数据提前下载好，优化页面打开速度）

### Service Worker有哪些作用

### get 和 post 有什么区别

本质上，这两个方法没有区别，hTTP最初设定这些方法，只是让请求更有语义。

语义上
根据语义，get是获取资源，post是提交资源

数据大小
get 通过 url 提交，浏览器中对 url 长度做了限制，所以 get 提交的数据大小也有限制
post 是没有大小限制

安全性
安全性上，post 比 get 稍微安全一点，

根据不同的请求，我们可以简单设计出 接口，restful api。
- 使用名词，而不是动词
- 请求的语义
- 接口版本化

### 网络的五层模型

- 应用层
- 传输层
- ip层
- 数据链路层
- 物理层

### HTTP和HTTPS的区别

HTTP: 是明文传输
HTTPS：是经过 SSL 加密后传输，可验证身份
端口不同 80 和 443

### 介绍SSL和TLS，HTTPS加密过程

SSL 是 TLS 不同时期的名称，是同一个东西，

### 介绍http2.0

相对于HTTP1.0，HTTP1.1的优化：

1.HTTP 1.0
浏览器与服务器只保持短暂的连接，浏览器的每次请求都需要与服务器建立一个TCP连接，服务器完成请求处理后立即断开TCP连接，服务器不跟踪每个客户也不记录过去的请求。
访问一个包含有许多图像的网页文件的整个过程包含了多次请求和响应，每次请求和响应都需要建立一个单独的连接，每次连接只是传输一个文档和图像，上一 次和下一次请求完全分离。即使图像文件都很小，但是客户端和服务器端每次建立和关闭连接却是一个相对比较费时的过程，并且会严重影响客户机和服务器的性能。

2.HTTP 1.1
HTTP 1.1允许客户端不用等待上一次请求结果返回，就可以发出下一次请求，但服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，以保证客户端能够区分出每次请求的响应内容，这样也显著地减少了整个下载过程所需要的时间。
由此可见http1.1并不支持一个tcp通道的多个http文件并行下载。但是它支持多通道并行下载，即同时建立多个TCP通道，并行传输对象，重叠了TCP连接建立时间，因而总体延迟会减少，但并行连接对客户端及服务器性能提出了更高要求，HTTP规范并行TCP连接不应超过2个，事实上现代浏览器已经支持6-10个不等。即我们实验中出现的多端口传输。
 
实验中发现接受一个网页时，不同的数据包可能来自不同的端口，即tcp通道，但是一个tcp通道必须等待上一个响应返回后才会发送下一个请求，也就是说就目前的网咯状况

缓存处理：多了Entity tag，If-Unmodified-Since, If-Match, If-None-Match等缓存信息（HTTTP1.0 If-Modified-Since,Expires）
带宽优化及网络连接的使用
错误通知的管理
Host头处理
长连接： HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。

相对于HTTP1.1，HTTP2的优化：

HTTP 2.0 会对 HTTP 的头进行一定的压缩，将原来每次都要携带的大量 key value 在两端建立一个索引表，对相同的头只发送索引表中的索引。
另外，HTTP 2.0 协议将一个 TCP 的连接中，切分成多个流，每个流都有自己的 ID，而且流可以是客户 端发往服务端，也可以是服务端发往客户端。它其实只是一个虚拟的通道。流是有优先级的。
HTTP 2.0 还将所有的传输信息分割为更小的消息和帧，并对它们采用二进制格式编码。常见的帧有 Header 帧，用于传输 Header 内容，并且会开启一个新的流。再就是Data 帧，用来传输正文实体。多 个 Data 帧属于同一个流。
通过这两种机制，HTTP 2.0 的客户端可以将多个请求分到不同的流中，然后将请求内容拆成帧，进行二 进制传输。这些帧可以打散乱序发送， 然后根据每个帧首部的流标识符重新组装，并且可以根据优先 级，决定优先处理哪个流的数据。


HTTP2支持二进制传送（实现方便且健壮），HTTP1.x是字符串传送
    - 单连接多资源，可以减少服务器连接压力，减少内存占用，连接吞吐量大
    - tcp 连接少，改善网络拥塞，慢启动时间减少，拥塞和丢包恢复速度更快
HTTP2支持多路复用。一个信道同时传输多路信号
    - 运行同时通过单一的 HTTP/2 连接发起多重请求-响应
    - http1 浏览器客户端同一实际，针对同一域名下的请求有一定数量限制，超过的将会被阻塞
HTTP2采用 HPACK 压缩算法压缩头部，减小了传输的体积
HTTP2支持服务端推送

2MSL就是一个发送和一个回复所需的最大时间。 MaximumSegmentLifetime英文的缩写,中文可以译为“报文最大生存时间”,

### 介绍DNS解析

域名解析，就是根据域名查出IP地址。因为人们很难记住ip。
DNS服务器： 人们都需要它，一旦出现故障，整个互联网都瘫痪，另外上网的人分布在全球，如果远了，会造成很大延迟，所以 DNS 服务器要高可用、高并发和分布式。

![](/img/net/dns.jpg)

### 常见Http请求头

请求头
Accept   
Accept-Encoding
Accept-Charset
Accept-Language
Cache-Control
Connection
Host
If-Modified-Since
If-None-Match
User-Agent
Cookie
Referer: 请求来源
Pragma
Sec-Fetch-Mode
Sec-Fetch-Site
Range
Content-Type

```
Accept: image/webp,image/apng,image/*,*/*;q=0.8
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7,da;q=0.6,und;q=0.5
Cache-Control: no-cache
Connection: keep-alive
Cookie: BIDUPSID=C5D29E79FB413765F95A74F1F61A4D4F;
Host: www.baidu.com
Pragma: no-cache
Referer: https://www.baidu.com/s?ie=UTF-8&wd=keep%20alive
Sec-Fetch-Mode: no-cors
Sec-Fetch-Site: same-origin
User-Agent: Mozilla/5.0 (Ma
```

相应头
Cache-Control
Connection
Content-Encoding
Content-Length
Content-Type
Date
ETag
Expires
Keep-Alive
Last-Modified
Server
Set-Cookie
Via
Accept-Ranges: bytes
Referrer-Policy: no-referrer-when-downgrade
X-Powered-By: W3 Total Cache/0.9.7.5

```
Accept-Ranges: bytes
Cache-Control: max-age=315360000
Connection: Keep-Alive
Content-Length: 705
Content-Type: image/gif
Date: Wed, 04 Sep 2019 01:15:32 GMT
Etag: "2c1-4a6473f6030c0"
Expires: Sat, 01 Sep 2029 01:15:32 GMT
Last-Modified: Wed, 22 Jun 2011 06:40:43 GMT
Server: Apache
```

### http 1.1 时如何复用tcp连接

默认情况下，http 是在请求完成之后关闭。可以开启 keep-alive 头信息。

Connection: Keep-Alive  表示连接复用

```
const http = require('http');
const keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
```

- Http报文的请求会有几个部分

请求行: 方法 URL 版本    GET / HTTP/1.1
请求头  k: v
请求体

响应报文 
状态行 版本 状态码 短语   HTTP/1.1 200 OK
响应头  k: v
实体

### tcp3次握手，四次挥手

![](/img/net/tcp3.jpg)
![](/img/net/tcp4.jpg)
![](/img/net/tcp2.jpg)


### tcp

tcp 属于传输层，它是面向连接的，可以保证数据安全有序到达，它的格式是

- (源、目标)端口号
- 序列号 seq  包编号，解决乱序
- 确认序号 ack  防止丢包，超时重发
- 窗口大小
    - 滑动窗口：流量控制
    - 拥塞控制：拥堵控制，防止过多的数据注入到网络中，这样可以使网络中的路由器或链路不致过载。

每个连接都有不同的序号。


### http缓存控制


缓存分为强缓存和协商缓存。强缓存不过服务器，协商缓存需要过服务器，协商缓存返回的状态码是304。两类缓存机制可以同时存在，强缓存的优先级高于协商缓存。当执行强缓存时，如若缓存命中，则直接使用缓存数据库中的数据，不再进行缓存协商。
强缓存
Expires(HTTP1.0)：Exprires的值为服务端返回的数据到期时间。当再次请求时的请求时间小于返回的此时间，则直接使用缓存数据。但由于服务端时间和客户端时间可能有误差，这也将导致缓存命中的误差。另一方面，Expires是HTTP1.0的产物，故现在大多数使用Cache-Control替代。
缺点：使用的是绝对时间，如果服务端和客户端的时间产生偏差，那么会导致命中缓存产生偏差。
Pragma(HTTP1.0)：HTTP1.0时的遗留字段，当值为"no-cache"时强制验证缓存，Pragma禁用缓存，如果又给Expires定义一个还未到期的时间，那么Pragma字段的优先级会更高。服务端响应添加'Pragma': 'no-cache'，浏览器表现行为和刷新(F5)类似。
Cache-Control(HTTP1.1)：有很多属性，不同的属性代表的意义也不同：

private：客户端可以缓存
public：客户端和代理服务器都可以缓存
max-age=t：缓存内容将在t秒后失效
no-cache：需要使用协商缓存来验证缓存数据
no-store：所有内容都不会缓存

请注意no-cache指令很多人误以为是不缓存，这是不准确的，no-cache的意思是可以缓存，但每次用应该去想服务器验证缓存是否可用。no-store才是不缓存内容。当在首部字段Cache-Control 有指定 max-age 指令时，比起首部字段 Expires，会优先处理 max-age 指令。命中强缓存的表现形式：Firefox浏览器表现为一个灰色的200状态码。Chrome浏览器状态码表现为200 (from disk cache)或是200 OK (from memory cache)。
协商缓存
协商缓存需要进行对比判断是否可以使用缓存。浏览器第一次请求数据时，服务器会将缓存标识与数据一起响应给客户端，客户端将它们备份至缓存中。再次请求时，客户端会将缓存中的标识发送给服务器，服务器根据此标识判断。若未失效，返回304状态码，浏览器拿到此状态码就可以直接使用缓存数据了。
Last-Modified：服务器在响应请求时，会告诉浏览器资源的最后修改时间。
if-Modified-Since：浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间。服务端收到此请求头发现有if-Modified-Since，则与被请求资源的最后修改时间进行对比，如果一致则返回304和响应报文头，浏览器只需要从缓存中获取信息即可。

如果真的被修改：那么开始传输响应一个整体，服务器返回：200 OK
如果没有被修改：那么只需传输响应header，服务器返回：304 Not Modified

if-Unmodified-Since: 从某个时间点算起, 是否文件没有被修改，使用的是相对时间，不需要关心客户端和服务端的时间偏差。

如果没有被修改：则开始`继续'传送文件，服务器返回: 200 OK
如果文件被修改：则不传输，服务器返回: 412 Precondition failed (预处理错误)

这两个的区别是一个是修改了才下载一个是没修改才下载。如果在服务器上，一个资源被修改了，但其实际内容根本没发生改变，会因为Last-Modified时间匹配不上而返回了整个实体给客户端（即使客户端缓存里有个一模一样的资源）。为了解决这个问题，HTTP1.1推出了Etag。
Etag：服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）
If-Match：条件请求，携带上一次请求中资源的ETag，服务器根据这个字段判断文件是否有新的修改
If-None-Match： 再次请求服务器时，浏览器的请求报文头部会包含此字段，后面的值为在缓存中获取的标识。服务器接收到次报文后发现If-None-Match则与被请求资源的唯一标识进行对比。

不同，说明资源被改动过，则响应整个资源内容，返回状态码200。
相同，说明资源无心修改，则响应header，浏览器直接从缓存中获取数据信息。返回状态码304.

但是实际应用中由于Etag的计算是使用算法来得出的，而算法会占用服务端计算的资源，所有服务端的资源都是宝贵的，所以就很少使用Etag了。

浏览器地址栏中写入URL，回车浏览器发现缓存中有这个文件了，不用继续请求了，直接去缓存拿（最快）
F5就是告诉浏览器，别偷懒，好歹去服务器看看这个文件是否有过期了。于是浏览器就胆胆襟襟的发送一个请求带上If-Modify-since
Ctrl+F5告诉浏览器，你先把你缓存中的这个文件给我删了，然后再去服务器请求个完整的资源文件下来。于是客户端就完成了强行更新的操作

缓存场景
对于大部分的场景都可以使用强缓存配合协商缓存解决，但是在一些特殊的地方可能需要选择特殊的缓存策略

对于某些不需要缓存的资源，可以使用 Cache-control: no-store ，表示该资源不需要缓存
对于频繁变动的资源，可以使用 Cache-Control: no-cache 并配合 ETag 使用，表示该资源已被缓存，但是每次都会发送请求询问资源是否更新
对于代码文件来说，通常使用 Cache-Control: max-age=31536000 并配合策略缓存使用，然后对文件进行指纹处理，一旦文件名变动就会立刻下载新的文件


### 介绍下HTTP状态码

1xx，表示临时回应，通常是浏览器请继续
2xx 表示成功
    200
3xx 表示重定向
    301
    302
    304 客户端缓存
4xx 表示客户端错误
    403
    404 请求页面不存在
    418 彩蛋
5xx 表示服务端错误
    500 服务端错误
    503 服务端暂时错误，等会再试


### 403、301、302是什么

- 403 表示客户端无权限
- 301 表示永久重定向
- 302 表示临时重定向

- 缓存相关的HTTP请求头
- 介绍HTTPS
- HTTPS怎么建立安全通道

## 从输入URL到页面加载全过程

## linux 

### Linux 754 介绍

1 2 4 分别表示读、写、执行

754 表示权限，三位表示：所属用户、所属用户组以及组外用户

## js

### 介绍暂时性死区

暂时性死区是指变量不能在声明之前使用。es5 var function 有预解析，es6 const let class 

### [1, 2, 3, 4, 5]变成[1, 2, 3, a, b, 5]

```js
let a = [1, 2, 3, 4, 5]
a.splice(3, 0, 'a', 'b')
```

- 取数组的最大值（ES5、ES6）

```js
let a = [1, 2, 3]
// es5 
Math.max.apply(null, a)

// es6
Math.max(...a)
```

- ES5和ES6有什么区别



- JS是什么范式语言(面向对象还是函数式编程)

既可以面向对象，也可以函数式编程


### 如何判断两个变量相等

Object.is 实现原理

### 介绍class和ES5的类以及区别

- class 不能提取使用
- class 


### 介绍箭头函数和普通函数的区别

- 箭头函数的 this 是查找父级
- 箭头函数不能 new 
- 预解析

### 介绍defineProperty方法，什么时候用?

可以定义对象的属性描述符，数据、存取
没用过，vue2 用来做响应式数据。

### for..in 和 object.keys的区别

- for...in 用来遍历对象，只能遍历可迭代属性，会遍历原型上的属性
- object.keys 返回对象的可迭代属性。

### 介绍闭包，使用闭包特权函数的使用场景

闭包是携带执行环境中的函数，个人理解是所有的函数都是闭包，因为它的执行环境有执行外层作用域的指针。

一般用来做封装，比如 throttle

### let、const以及var的区别

- 暂时性死区
- 块级作用域

### 浅拷贝和深拷贝的区别与实现


### 介绍 this 和原型

### 使用原型最大的好处

共享方法，节省内存

### 介绍localstorage的API

- setItem()
- getItem()
- removeItem()
- clear()
- key(index)

### 如何处理异常捕获

- try...catch
- window.onerror
- promise  onrejectionhandled
- 网络加载错误
    window.addEventListener('error') 捕获
- 页面崩溃错误
    - load beforeunload 有问题
    - Service Worker 
- 框架错误
    - vue   Vue.config.errorHandler  error vm info(错误时期信息,比如挂载)
- ajax错误
    - xhr error

### JS继承方案和区别

- call调用属性(防止多个对象串改父实例属性) + 原型链继承方法
- es6 class

- ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）.
- ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。

### 如何判断一个变量是不是数组

内置对象内部都有个私有的`[[Class]]`属性,toString 可以访问到它。

instanceof 的问题。

```
toString.call([]) === [object Array]
```

Array.isArray()

### 变量a和b，如何交换

1. temp

2. 
```
[a, b] = [b, a]
```

3. 整数数字

```
// 加2减1
a = a + b;
b = a - b;
a = a - b;

// 3次异或
a = a ^ b;
b = a ^ b;
a = a ^ b
```

### 多个标签生成的Dom结构

是一个类数组

### 类数组和数组的区别，转换

类数组不能用数组的方法，但是和数组类似，可以通过下标取值，可以循环。
- es5可以通过 call 转换
- es6 展开符

dom NodeList

### cookie 是为了解决什么问题

http是无状态的。


### cookie和localStorage的区别

操作
cookie 客户端，服务端都可以操作
localStorage 只在客户端
cookie 操作复杂
localStorage api 简单

大小
cookie 有大小4k，条数限制，chrome 53
localStorage 5M  每个浏览器不一致

有效期
cookie 可以通过 expires 设置有效期
localStorage 不手动清除长期有效

### formData和原生的ajax有什么区别

### 介绍下表单提交，和 formData 有什么关系

表单提交 content-type x/www-form-urlencoded

### 介绍this各种情况

- fn()
- obj.fn()
- fn.call()

### == 和 === 的区别，什么情况下用相等==

== 比较的是值，=== 比较的是引用和值

- ES6中的map和原生的对象有什么区别
- 介绍下原型链（解决的是继承问题吗）
- sum(2, 3)实现sum(2)(3)的效果
- 两个对象如何比较
- JS的原型

### 作用域链的理解

了解作用域链之前我们要知道一下几个概念：

函数的生命周期
变量和函数的声明
Activetion Object（AO）、Variable Object（VO）

函数的生命周期：


创建：JS解析引擎进行预解析，会将函数声明提前，同时将该函数放到全局作用域中或当前函数的上一级函数的局部作用域中。


执行：JS引擎会将当前函数的局部变量和内部函数进行声明提前，然后再执行业务代码，当函数执行完退出时，释放该函数的执行上下文，并注销该函数的局部变量。


变量和函数的声明：如果变量名和函数名声明时相同，函数优先声明。
Activetion Object（AO）、Variable Object（VO）：

AO：Activetion Object（活动对象）
VO：Variable Object（变量对象）

VO对应的是函数创建阶段，JS解析引擎进行预解析时，所有的变量和函数的声明，统称为Variable Object。该变量与执行上下文相关，知道自己的数据存储在哪里，并且知道如何访问。VO是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：

变量 (var, 变量声明);
函数声明 (FunctionDeclaration, 缩写为FD);
函数的形参

AO对应的是函数执行阶段，当函数被调用执行时，会建立一个执行上下文，该执行上下文包含了函数所需的所有变量，该变量共同组成了一个新的对象就是Activetion Object。该对象包含了：

函数的所有局部变量
函数的所有命名参数
函数的参数集合
函数的this指向

作用域链：
当代码在一个环境中创建时，会创建变量对象的一个作用域链（scope chain）来保证对执行环境有权访问的变量和函数。作用域第一个对象始终是当前执行代码所在环境的变量对象（VO）。如果是函数执行阶段，那么将其activation object（AO）作为作用域链第一个对象，第二个对象是上级函数的执行上下文AO，下一个对象依次类推。
在《JavaScript深入之变量对象》中讲到，当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。


- call、apply、bind的区别
- 防抖和节流的区别
- ES6新的特性

### prototype和__proto__区别

一个是构造函数的属性，一个是实例的属性

- new是怎么实现的

- localStorage和cookie有什么区别
- 介绍原型链
- 如何继承
- 介绍JS数据类型，基本数据类型和引用数据类型的区别
- Array 是 Object 类型吗
- 数据类型分别存在哪里
- var a = {name: "前端开发"}; var b = a; a = null那么b输出什么
- var a = {b: 1} 存放在哪里
- var a = {b: {c: 1}}存放在哪里
- 栈和堆的区别
- 垃圾回收时栈和堆的区别
- 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
- 栈和堆具体怎么存储
- JS执行过程中分为哪些阶段
- 词法作用域和this的区别
- 平常是怎么做继承
- 深拷贝和浅拷贝
- loadsh深拷贝实现原理
- ES6中let块作用域是怎么实现的
- JS变量类型分为几种，区别是什么
- 手写数组去重函数
- 手写数组扁平化函数
- 前端怎么控制管理路由
- 使用路由时出现问题如何解决
- 柯里化函数两端的参数具体是什么东西
- 如何设计一个 localStorage，保证数据的实效性
- some、every、find、filter、map、forEach有什么区别

## 重绘和回流

浏览器使用流式布局模型 (Flow Based Layout)
浏览器会把HTML解析成DOM，把CSS解析成CSSOM，DOM和CSSOM合并就产生了Render Tree
有了RenderTree就能知道所有节点的样式，计算节点在页面上的大小和位置，把节点绘制到页面上
由于浏览器使用流式布局，对Render Tree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，通常需要多次计算且要花费3倍于同等元素的时间，这也是为什么要避免使用table布局的原因之一

浏览器渲染过程如下：

解析HTML，生成DOM树
解析CSS，生成CSSOM树
将DOM树和CSSOM树结合，生成渲染树(Render Tree)
Layout(回流)：根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
Painting(重绘)：根据渲染树以及回流得到的几何信息，得到节点的绝对像素
Display：将像素发送给GPU，展示在页面上。（这一步其实还有很多内容，比如会在GPU将多个合成层合并为同一个层，并展示在页面中。而css3硬件加速的原理则是新建合成层，这里我们不展开，之后有机会会写一篇博客）

何时触发回流和重绘
何时发生回流：

添加或删除可见的DOM元素
元素的位置发生变化
元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
页面一开始渲染的时候（这肯定避免不了）
浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

何时发生重绘（回流一定会触发重绘）：
当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。现代浏览器会对频繁的回流或重绘操作进行优化，浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。你访问以下属性或方法时，浏览器会立刻清空队列：

clientWidth、clientHeight、clientTop、clientLeft
offsetWidth、offsetHeight、offsetTop、offsetLeft
scrollWidth、scrollHeight、scrollTop、scrollLeft
width、height
getComputedStyle()
getBoundingClientRect()

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，**最好避免使用上面列出的属性，他们都会刷新渲染队列。**如果要使用它们，最好将值缓存起来。
如何避免触发回流和重绘
CSS：

避免使用table布局。
尽可能在DOM树的最末端改变class。
避免设置多层内联样式。
将动画效果应用到position属性为absolute或fixed的元素上
避免使用CSS表达式（例如：calc()）
CSS3硬件加速（GPU加速）

JavaScript：

避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性
避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中
也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘
避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来
对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流


### 随机值存在一样的情况，如何避免?
加时间戳

### 如何找 0-5 的随机数，95-99呢

```
Math.floor(Math.random() * 5 + 1)
Math.floor(Math.random() * 4 + 95)
```

## 事件

### 浏览器事件流向

### 事件代理和优缺点

事件代理能节省内存，缺点是如果事件链太长，会稍慢一些

### 如何判断是button

```
e.target.tagName === 'BUTTON'
```

### 生成一万个button，并且绑定事件，如何做

1. 拼接字符串，插入
2. 事件委托

### 事件委托的优点

1. 只在内存中开辟了一块空间，节省资源同时减少了dom操作，提高性能
2. 对于新添加的元素也会有之前的事件

- target
- currentTarget
- relateTarget具体指向什么目标

### 改变 input 后 p 标签就跟着变

监听input的哪个事件，在什么时候触发

- 设置 input 事件

### React的事件机制（绑定一个事件到一个组件上）



## 性能优化

- 前端性能优化
- 304是什么
- 整个前端性能提升大致分几类
- 用户体验做过什么优化
- 前端性能优化（JS原生和React）
- 前端性能优化（1js css；2 图片；3 缓存预加载； 4 SSR； 5 多域名加载；6 负载均衡）
- 并发请求资源数上限（6个）
- base64为什么能提升性能，缺点
- 介绍 webp 这个图片文件格式
- 介绍service worker

## 异步

- 介绍异步方案
- Promise 和 async/await 和 callback的区别
- Promise有没有解决异步的问题（promise链是真正强大的地方）


### Promise和setTimeout的区别（Event Loop）

### 浏览器和 node 事件环的区别

Node.js中宏任务分成了几种类型，并且放在了不同的task queue里。不同的task queue在执行顺序上也有区别，微任务放在了每个task queue的末尾：

setTimeout/setInterval 属于 timers 类型；
setImmediate 属于 check 类型；
socket 的 close 事件属于 close callbacks 类型；
其他 MacroTask 都属于 poll 类型。
process.nextTick 本质上属于 MicroTask，但是它先于所有其他 MicroTask 执行；
所有 MicroTask 的执行时机在不同类型的 MacroTask 切换后。
idle/prepare 仅供内部调用，我们可以忽略。
pending callbacks 不太常见，我们也可以忽略。


- 介绍Promise和then
- 介绍Promise，异常捕获
- 介绍下Promise，内部实现
- 如何设计Promise.all()
- 使用Async会注意哪些东西
- Async里面有多个await请求，可以怎么优化（请求是否有依赖）
- Promise和Async处理失败的时候有什么区别
- 介绍下Promise的用途和性质
- Promise有几个状态
- promise 的精髓，以及优缺点
- JS怎么实现异步
- 异步整个执行周期
- Async/Await怎么实现
- Promise和setTimeout执行先后的区别
- JS为什么要区分微任务和宏任务
- Promise构造函数是同步还是异步执行，then呢
- Promise.all实现原理
- 介绍Promise的特性，优缺点
- promise如何实现then处理
- promise里面和then里面执行有什么区别
- setInterval需要注意的点
- 定时器为什么是不精确的
- setTimeout(1)和setTimeout(2)之间的区别
- 介绍宏任务和微任务
- JS 异步解决方案的发展历程以及优缺点
- 对async、await的理解，内部原理

## 算法

- 1块、4块、5块，求总数n块的最小硬币数
- 介绍冒泡排序，选择排序，冒泡排序如何优化
- 介绍快速排序
- 算法：前K个最大的元素
- 项目中树的使用场景以及了解
- 介绍排序算法和快排原理
- 如何判断链表是否有环
- 介绍二叉搜索树的特点
- 项目中如何应用数据结构
- 介绍下DFS深度优先

## 跨域

- 介绍下浏览器跨域
端口、协议、域名某一个不同时就会跨域，主要是为了安全，防止 csrf 攻击，

### 怎么去解决跨域问题

ajax 跨域解决方法有 CORS JSONP
窗口跨域可以用：postMessage、window.name、document.domain、hash、websocket 等

### jsonp方案需要服务端怎么配合

服务端返回 callback(data) 的形式。

### 加上CORS之后从发起到请求正式成功的过程

如果是简单请求，会有OPTIONS预检，检查服务器是否支持跨域请求。

简单请求是指: get head post请求、content-Type是文本、表单、formData类型，无自定义头。
非简单请求是：put delete、带自定义头，content-type 是 json

### 跨域怎么解决，有没有使用过Apache等方案

没有，用过 nginx。

### Access-Control-Allow-Origin 在服务端哪里配置

hader 里配置，可以设置一个白名单。

### csrf 跨站攻击怎么解决

解决方案有：
- 禁止第三方网站带 cookies，可以通过设置 cookie 的same-site属性实现。
- 在前端加入验证码（但是影响用户体验，可以用ccap模块）。
- 使用 token。前端将它放到页面`<input type=hidden token=xx>`或 `<meta>` 中，同时后端将它设置到 cookie 中，在发送请求时后端验证这2个值是否一致。因为攻击者不访问前端无法获得 token ，而且无法得到和修改 cookie 里的 token。
- 验证origin Header和referer Header。打开本地 url file://xx 不会发送 referer，通过 http 请求才会发。所以可以使用正则/https?\/\/localhost/ 验证 referer 是否符合条件。但有些浏览器可以让用户设置不发 referer，所以可能会导致一些问题。

### CORS如何设置

res.setHeader('Access-Control-Allow-Origin', '')

### 介绍同源策略

### jsonp 为什么不支持 post 方法

### jsonp 安全性

jsonp  csrf  
xss   1.强制 content-type: application/json  2.强制将字符转换 < $lt 等

## 小程序

- 小程序里面开页面最多多少  < 10  做了限制

## 设计模式

- 介绍下观察者模式
- 观察者和发布订阅的区别，各自用在哪里
- 观察者模式里面使用的数据结构(不具备顺序 ，是一个list)
- 单例、工厂、观察者项目中实际场景
- 介绍中介者模式
- 前端开发中用到哪些设计模式
- React/Redux中哪些功能用到了哪些设计模式

## 内存泄露

- 介绍垃圾回收
- 添加原生事件不移除为什么会内存泄露
- 还有哪些地方会内存泄露
- JS里垃圾回收机制是什么，常用的是哪种，怎么处理的

## 项目

- 遇到的复杂业务场景  火车票里的三种状态
- 什么是单页项目
- 使用过程中遇到的问题，如何解决的
- 网站SEO怎么处理
- 服务端怎么做统一的状态处理
- 介绍单页面应用和多页面应用
- 介绍MVP怎么组织
- 对PWA有什么了解

## webpack

### webpack 打包流程和生命周期

打包过程：
1. 初始化 option， entry-option
1. 开始编译  run

```js
// Compiler.js  经过改造，只为了让流程清晰
class Compiler{
    newCompilation(){
        const compilation = new Compilation(this)
        this.hooks.compilation.call()
    }
    compile(callback){
        this.hooks.beforeCompile.callAsync(()=>{
            this.hooks.compile.call()
            const compilation = this.newCompilation()
            this.hooks.make.callAsync(compilation, ()=>{
                compilation.finish(()=>{
                    compilation.seal(()=>{
                        this.hooks.afterCompile.callAsync(compilation, ()=>{
                            return callback(null, compilation)
                        })
                    })
                })
            })
        })
    }
    run(){
        const onCompiled = ()=>{
            this.hooks.shouldEmit.call()
            this.emitAssets(compilation, ()=>{
                this.hooks.done.callAsync(()=>{
                    this.hooks.additionalPass.callAsync(()=>{
                        this.compile(onCompiled)
                    })
                })
            })
        }
        this.hooks.beforeRun.callAsync(()=>{
            this.hooks.run.callAsync(()=>{
                this.compile(onCompiled)
            })
        })
    }
}
```

1. make:  从 entry 开始递归的分析依赖，对每个依赖模块进行 build
1. before-resolve: 对模块位置进行解析
1. build-module: 使用 loader 加载文件并开始构建某个模块
1. normal-module-loader: 对 loader 加载对文件用 acron 编译，生成 AST 树
1. program: 遍历 AST，当遇到 require 等一些调用表达式时，收集依赖
1. seal: 所有依赖 build 完成，开始优化（抽取公共模块，加 hash）
1. emit: 输出到 dist 目录

生命周期

compiler hooks 流程相关
- (before-)run
- (before-/after-)compile
- make
- (after-)emit
- done

监听相关
- watch-run
- watch-close

compilation hooks
compiler 也会调用 compilation 生命周期方法
addEntry -> addModuleChain
finish 模块错误上报
seal 构建完后资源的生成和优化


ModuleFactory会创建
NormalModuleFactory
ContextModuleFactory

Module 下有五种
NormalModule  普通模块
    - 使用loader-runner 运行 loaders
    - 通过 Parser 解析，内部是 acron，解析出 require 依赖
    - ParserPlugins 添加依赖
ContextModule ./src/a 带路径的
ExternalModule  module.exports = jQuery
DelegatedModule  manifest
MultiModule      entry:['a','b']

- 使用 webpack 构建时有无做一些自定义操作? 

之前将 vue-cli 的单页配置改为多页配置。

- webpack里面的插件是怎么实现的?

插件机制是通过 tapable 实现的，它类似 node 里的 EventEmitter。

- 抽取公共文件是怎么配置的?

```js
optimization:{
    splitChunks: {
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'all',
                minChunks: 2
            }
        }
    }
}
```

- `import { Button } from 'antd'` ，打包的时候只打包button，分模块加载，是怎么做到的

- loader 和 plugin 有什么区别

loader 主要是加载资源，转换资源。plugin 主要是扩展 webpack 功能，更强大。

- 介绍AST（Abstract Syntax Tree）抽象语法树

AST 抽象语法树是对源代码的一种抽象。将源代码抽象成树状结构，像 babel，场景的 ast 库有 babylon。之前模仿过一个四则运算的解析器。

- 使用过webpack里面哪些 plugin 和 loader ?

HtmlWebpackPlugin
CleanWebpackPlugin
TerserWebpackPlguin
DllPlugin
CommonsChunkPlugin
SplitChunksPlugin
HotModuleReplacementPlugin
MiniCssExtractPlugin
UglifyjsWebpackPlugin

- 一般怎么组织CSS（Webpack）

专门建一个 css 目录，通过`import`入口文件，通用样式放在入口文件中，按照模块添加样式文件，组件内文件放在 .vue 文件中。

- webpack和gulp的优缺点

gulp 是基于任务的，可以自动化完成一些任务，但是它没有解决模块化和打包的问题。
webpack 目的就是打包，支持各种模块化开发。

- webpack 配 sass 需要哪些 loader?

css-loader、less-loader、style-loader(或者 MiniCssExtractPlugin 将 css 提取出来)

- 如何配置把js、css、html单独打包成一个文件。

html 通过 HtmlWebpackPlugin 生成。css 通过 style-loader 或 html-inline-css-webpack-plugin 插件，可以嵌入到 html 中。
可以使用 raw-loader 在 html 模版里嵌入 html 和 js 文件。

```
<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
```

## vue

- 虚拟DOM主要做了什么
- 虚拟DOM本身是什么（JS对象）


## css

### 介绍flex布局

### 介绍css3中position:sticky

- 介绍position属性包括CSS3新增

### 清除浮动

## 浏览器

### 居中为什么要使用transform（为什么不使用marginLeft/Top）

- 定位问题（绝对定位、相对定位等）
- transform动画和直接使用left、top改变位置有什么优缺点
- 动画的了解
- CSS选择器有哪些

### css选择器优先级

- !important  
- 行内
- id
- 类/伪类/属性选择器
- 元素/关系/伪元素选择器
- 通配符选择器

### 伪类和伪元素的区别

: 和 ::(ie8)
伪类： 状态
伪元素: 新增一些元素，不在dom树中，在css树中


### 盒子模型，以及标准情况和IE下的区别

- 如何实现高度自适应
- 如何实现H5手机端的适配
- rem、flex的区别（root em）
- em和px的区别
- 两个元素块，一左一右，中间相距10像素
- 上下固定，中间滚动布局如何实现

### 盒模型

- margin border padding

box-sizing: content-box
border-box: border-box   ie6

### 如何实现左侧宽度固定，右侧宽度自适应的布局

## 安全

### 项目中如何处理安全问题
### 介绍css，xsrf
### xsrf跨域攻击的安全性问题怎么防范
### 对安全有什么了解
### 介绍下数字签名的原理

## ajax

- 文件上传如何做断点续传
- 表单可以跨域吗
- 异步请求，低版本fetch如何低版本适配
- 前端和后端怎么联调

### 文件上传的二进制具体是怎么处理的

form-data
application/x-www-form-urlencoded


## cookie session

- cookie放哪里，cookie能做的事情和存在的价值
- cookie和token都存放在header里面，为什么只劫持前者
- cookie和session有哪些方面的区别


## 300.前端怎么做单元测试

## html

- html语义化的理解
- `<b>`和`<strong>`的区别

## 防抖

- 搜索请求如何处理（防抖）

## 虚拟DOM

- 介绍虚拟DOM
- 为什么虚拟DOM比真实DOM性能好
- 渲染的时候key给什么值，可以使用index吗，用id好还是index好

## rn

- RN有没有做热加载
- RN遇到的兼容性问题
- RN如何实现一个原生的组件
- RN混原生和原生混RN有什么不同
- RN的原理，为什么可以同时在安卓和IOS端运行
- RN如何调用原生的一些功能
- 介绍RN的缺点
- RN和原生通信
- 如何做RN在安卓和IOS端的适配
- RN为什么能在原生中绘制成原生组件（bundle.js）
- native提供了什么能力给RN
- 安卓Activity之间数据是怎么传递的
- 安卓4.0到6.0过程中WebView对js兼容性的变化
- WebView和原生是如何通信

## 进程和线程

- 进程和线程的区别（一个node实例就是一个进程，node是单线程，通过事件循环来实现异步）

## node

### Node.js的加载机制

require和module.exports
module.exports和exports的区别，或者也可能问CommonJS引入和ES6引入的区别。

- node接口转发有无做什么优化
- node起服务如何保证稳定性，平缓降级，重启等
- node文件查找优先级

### 如何在Node端配置路径别名

类似于Webpack中的alias配置

- 全局变量
- 修改 rootRequire
- 封装自己的require


## npm2和npm3+有什么区别

## react

- 有没有涉及到Cluster
- 如何和MySQL进行通信
- 路由的动态加载模块
- Redux如何实现多个组件之间的通信，多个组件使用相同状态如何进行管理
- 多个组件之间如何拆分各自的state，每块小的组件有自己的状态，它们之间还有一些公共的状态需要维护，如何思考这块
- 使用过的Redux中间件
- 介绍redux，主要解决什么问题
- 搜索请求中文如何请求
- React组件中怎么做事件代理
- React组件事件代理的原理
- React怎么做数据的检查和变化
- react-router怎么实现路由切换
- react-router里的`<Link>`标签和`<a>`标签有什么区别
- `<a>`标签默认事件禁掉之后做了什么才实现了跳转
- React层面的性能优化
- React中Dom结构发生变化后内部经历了哪些变化
- React挂载的时候有3个组件，textComponent、composeComponent、domComponent，区别和关系，Dom结构发生变化时怎么区分data的变化，- 怎么更新，更新怎么调度，如果更新的时候还有其他任务存在怎么处理
- key主要是解决哪一类的问题，为什么不建议用索引index（重绘）
- Redux中异步的请求怎么处理
- Redux中间件是什么东西，接受几个参数（两端的柯里化函数）
- 中间件是怎么拿到store和action，然后怎么处理
- state是怎么注入到组件的，从reducer到组件经历了什么样的过程
- redux的设计思想
- 接入redux的过程
- 绑定connect的过程
- connect原理
- react异步渲染的概念,介绍Time Slicing 和 Suspense
- 16.X声明周期的改变
- 16.X中props改变后在哪个生命周期中处理
- 介绍纯函数
- pureComponent和FunctionComponent区别
- 介绍JSX
- 介绍高阶组件
- React高阶组件的作用有哪些
- React和Vue的区别
- react性能优化
- react生命周期
- 介绍Fiber
- 介绍DOM树对比
- react中的key的作用
- 如何设计状态树
- shouldComponentUpdate是为了解决什么问题
- 如何解决props层级过深的问题
- Redux在状态管理方面解决了React本身不能解决的问题
- Redux有没有做过封装
- react生命周期，常用的生命周期
- 对应的生命周期做什么事
- 遇到性能问题一般在哪个生命周期里解决
- 怎么做性能优化（异步加载组件...）
- 写react有哪些细节可以优化
- React子父组件之间如何传值
- Emit事件怎么发，需要引入什么
- 介绍下React高阶组件，和普通组件有什么区别
- 一个对象数组，每个子对象包含一个id和name，React如何渲染出全部的name
- 其中有几个 name 不存在，通过异步接口获取，如何做
- 对React看法，有没有遇到一些坑
- React生命周期
- componentWillReceiveProps的触发条件是什么
- React16.3对生命周期的改变
- 介绍下React的Filber架构
- 画 Filber 渲染树
- 介绍React高阶组件
- 父子组件之间如何通信
- Redux怎么实现属性传递，介绍下原理
- React-Router版本号
- 前后端通信使用什么方案
- RESTful 常用的 Method
- React声明周期
- 如何去除url中的#号
- Redux状态管理器和变量挂载到window中有什么区别
- 如何实现异步加载
- 如何实现分模块打包（多入口）
- React使用过的一些组件
- 介绍 Immuable
- 介绍下redux整个流程原理
- React中setState后发生了什么
- setState为什么默认是异步
- setState什么时候是同步的
- 为什么3大框架出现以后就出现很多native（RN）框架（虚拟DOM）
- a，b两个按钮，点击aba，返回顺序可能是baa，如何保证是aba（Promise.then）
- 介绍Redux
- 堆和栈的区别
- 介绍redux接入流程
- rudux和全局管理有什么区别（数据可控、数据响应）
- 常用的中间件
- 如何对相对路径引用进行优化
- knex连接数据库响应回调
- redux状态树的管理
- react设计思路
- react常见的通信方式
- redux整体的工作流程
- redux和全局对象之间的区别
- Redux数据回溯设计思路
- react生命周期
- react性能优化
- 介绍pureComponet
- 介绍Function Component
- React数据流
- props和state的区别
- 介绍react context
- React15/16.x的区别
- 重新渲染render会做些什么
- 哪些方法会触发react重新渲染
- state和props触发更新的生命周期分别有什么区别
- setState是同步还是异步
- 对无状态组件的理解
- 介绍Redux工作流程
- 对react看法，它的优缺点
- react的理念是什么（拿函数式编程来做页面渲染）
- React声明周期及自己的理解
- 如何配置React-Router
- 服务端渲染SSR
- 介绍路由的history

history.length
history.go(-1)
history.back()
history.forward()
hisotry.pushState()
hisotry.replaceState()
history.state 可以直接读取历史条目的状态，不需要等待 popstate
popstate 事件，只有点击浏览器才会触发，pushState 不会触发

- 介绍react优化
- redux请求中间件如何处理并发
- 介绍Redux数据流的流程



vuex

vuex 是 vue.js 开发的状态管理模式，是集中式存储管理的方式给所有组件提供状态。并保证状态以一种可预测的方式发生变化。

问题：多个组件共享时，单向数据流很容易被破坏。
- 多个视图依赖同一状态。多层嵌套，兄弟组件状态传递。
- 不同视图需要变更一个状态。

vuex 将组件的共享状态抽取出来，以一个全局单例模式来管理。

vuex 的核心思想： store 仓库

store 和单纯的全局变量的不同：
- store 是响应式的，store 的变化会导致响应组件更新
- 不能直接修改 store，只能通过 commit mutation提交，这样可以记录每一步的变化，来了解应用的状态

通过强制的规定，代码变得结构化且易维护。


1. 提供 install 方法。如果有 Vue 且是开发环境，报错 vuex 已经安装了。

```js
applyMixin(Vue)
```

2. applyMixin 就是给 Vue 添加 beforeCreate 方法，每个组件创建时会执行，即给每个组件注入 this.$store

组件渲染是从根到子的，所以根先有了，子再引用根的。

```js
Vue.mixin({ beforeCreate: vuexInit })

function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
```


## vue

### vue 运行机制

初始化流程

创建Vue实例对象
init过程会初始化生命周期，初始化事件中心，初始化渲染、执行beforeCreate周期函数、初始化 data、props、computed、watcher、执行created周期函数等。
初始化后，调用$mount方法对Vue实例进行挂载（挂载的核心过程包括模板编译、渲染以及更新三个过程）。
如果没有在Vue实例上定义render方法而是定义了template，那么需要经历编译阶段。需要先将template 字符串编译成 render function，template 字符串编译步骤如下 ：

parse正则解析template字符串形成AST（抽象语法树，是源代码的抽象语法结构的树状表现形式）
optimize标记静态节点跳过diff算法（diff算法是逐层进行比对，只有同层级的节点进行比对，因此时间的复杂度只有O(n)。如果对于时间复杂度不是很清晰的，可以查看我写的文章ziyi2/algorithms-javascript/渐进记号）
generate将AST转化成render function字符串


编译成render function 后，调用$mount的mountComponent方法，先执行beforeMount钩子函数，然后核心是实例化一个渲染Watcher，在它的回调函数（初始化的时候执行，以及组件实例中监测到数据发生变化时执行）中调用updateComponent方法（此方法调用render方法生成虚拟Node，最终调用update方法更新DOM）。
调用render方法将render function渲染成虚拟的Node（真正的 DOM 元素是非常庞大的，因为浏览器的标准就把 DOM 设计的非常复杂。如果频繁的去做 DOM 更新，会产生一定的性能问题，而 Virtual DOM 就是用一个原生的 JavaScript 对象去描述一个 DOM 节点，所以它比创建一个 DOM 的代价要小很多，而且修改属性也很轻松，还可以做到跨平台兼容），render方法的第一个参数是createElement(或者说是h函数)，这个在官方文档也有说明。
生成虚拟DOM树后，需要将虚拟DOM树转化成真实的DOM节点，此时需要调用update方法，update方法又会调用pacth方法把虚拟DOM转换成真正的DOM节点。需要注意在图中忽略了新建真实DOM的情况（如果没有旧的虚拟Node，那么可以直接通过createElm创建真实DOM节点），这里重点分析在已有虚拟Node的情况下，会通过sameVnode判断当前需要更新的Node节点是否和旧的Node节点相同（例如我们设置的key属性发生了变化，那么节点显然不同），如果节点不同那么将旧节点采用新节点替换即可，如果相同且存在子节点，需要调用patchVNode方法执行diff算法更新DOM，从而提升DOM操作的性能。


需要注意在初始化阶段，没有详细描述数据的响应式过程，这个在响应式流程里做说明。

响应式流程

在init的时候会利用Object.defineProperty方法（不兼容IE8）监听Vue实例的响应式数据的变化从而实现数据劫持能力（利用了JavaScript对象的访问器属性get和set，在未来的Vue3中会使用ES6的Proxy来优化响应式原理）。在初始化流程中的编译阶段，当render function被渲染的时候，会读取Vue实例中和视图相关的响应式数据，此时会触发getter函数进行依赖收集（将观察者Watcher对象存放到当前闭包的订阅者Dep的subs中），此时的数据劫持功能和观察者模式就实现了一个MVVM模式中的Binder，之后就是正常的渲染和更新流程。
当数据发生变化或者视图导致的数据发生了变化时，会触发数据劫持的setter函数，setter会通知初始化依赖收集中的Dep中的和视图相应的Watcher，告知需要重新渲染视图，Wather就会再次通过update方法来更新视图。


可以发现只要视图中添加监听事件，自动变更对应的数据变化时，就可以实现数据和视图的双向绑定了。


### Vue响应式原理

https://juejin.im/post/5cd8a7c1f265da037a3d0992#heading-22

Vue 3.0 在响应式原理上的优化


### 说说Vue中$nextTick的实现原理

flush 清空

isUsingMicroTask
1. Promise.then(ios 里回调会放入微任务队列，但是队列不更新，需要做一些其它事情才刷新 setTimeout) 
2. MutationObserver 观察一个 textNode，改变 textNode.data 更新
3. setImmediate 高版本IE和edge   宏任务
4. setTimeout

执行 nextTick(fn) 时，fn 会push 到 callbacks 数组中，flushCallbacks() 执行时循环去执行，包裹一层做错误处理
如果参数不是函数，就
nextTick().then(()=>{})


https://juejin.im/post/5cd9854b5188252035420a13


### React和Vue的区别

### 什么情况下会阻塞 DOM 渲染

### computed的实现原理

1. computed 初始化是在 Vue 实例初始化阶段 initState()，initState 初始化了 props，methods，data，computed，watch
2. watchers = vm._computedWatchers = {} 创建一个watcher对象
3. initComputed(vm, opts.computed) 中循环 computed 对象，获取每个属性的 getter，然后给每个属性创建一个 watcher，添加到 watchers ，`watcher[key] = new Watcher(vm,getter,noop, 计算watcher配置)`
4. 如果 computed 里的key 不在 vm 上，就定义`defineComputed(vm, key, userDef)`。否则开发环境检查 computed 是否定义成了 data 或 prop，报警告。
5. defineComputed 就是 给 Object.defineProperty(vm,key, {getter}), 如果computed里是函数, 非 ssr，getter 就是 createComputedGetter(key)，是ssr 就是 userDef

```js
function defineComputed(){
    if(typeof userDef === 'function'){
        // !ssr 缓存
        sharedPropertyDefinition.get = !ssr ? createComputedGetter(key) : userDef
    }else {
        // 是对象，且有 set，才有 setter，否则 noop
    }
    
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
function createComputedGetter(key){
    // 返回计算属性的 getter
    return function computedGetter(){
        const watcher = this._computedWatchers && this._computedWatchers[key]
        if(watcher){
            watcher.depend()
            return watch.evaluate()
        }
    }
}
```
6. computed watcher 和普通 watcher 的区别。



### Watch 的运行原理

1. initState() 初始化 initWatch
2. 遍历 watch，如果 属性的handler 是数组则遍历调用 createWatcher
3. createWatcher 

```
watch: {
    // 配置转换是在 合并配置时
    a(){}
    a: {handler}
    a: 'xx' // xx方法
    a:[]
}
```
4. vm.$watch(key, handler, options)，options 里有 {deep:true} 之列

### Vue 的数据为什么频繁变化但只会更新一次

Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。
另外，关于waiting变量，这是很重要的一个标志位，它保证 flushSchedulerQueue 回调（$nextTick中执行）允许被置入callbacks一次。
因为Vue的事件机制是通过事件队列来调度执行，会等主进程执行空闲后进行调度，所以先会去等待所有的同步代码执行完成之后再去一次更新。这样的性能优势很明显，比如：
现在有这样的一种情况，mounted的时候test的值会被循环执行++1000次。 每次++时，都会根据响应式触发setter->Dep->Watcher->update->run。 如果这时候没有异步更新视图，那么每次++都会直接操作DOM更新视图，这是非常消耗性能的。 所以Vue实现了一个queue队列，在下一个tick（或者是当前tick的微任务阶段）统一执行queue中Watcher的run。同时，拥有相同id的Watcher不会被重复加入到该queue中去，所以不会执行1000次Watcher的run。最终更新视图只会直接将test对的DOM的0变成1000。 保证更新视图操作DOM的动作是在当前栈执行完以后下一个tick（或者是当前tick的微任务阶段）的时候调用，大大优化了性能。
执行顺序update -> queueWatcher -> 维护观察者队列（重复id的Watcher处理） -> waiting标志位处理（保证需要更新DOM或者Watcher视图更新的方法flushSchedulerQueue只会被推入异步执行的$nextTick回调数组一次） -> 处理$nextTick（在为微任务或者宏任务中异步更新DOM）->

Vue是异步更新Dom的，Dom的更新放在下一个宏任务或者当前宏任务的末尾（微任务）中进行执行

由于VUE的数据驱动视图更新是异步的，即修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。
vue和react一样，对dom的修改都是异步的。它会在队列里记录你对dom的操作并进行diff操作，后一个操作会覆盖前一个，然后更新dom。

### Chrome插件如何屏蔽广告

提供右键 加入黑名单之类

### zindex

默认值是 auto

z-index:0 的会创建一个新的层叠上下文
而auto 不会

https://link.juejin.im/?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2016%2F01%2Funderstand-css-stacking-context-order-z-index%2F


### CSS3动画

CSS3动画硬件加速？CSS3动画的性能问题（重绘和重流，是否需要脱离正常文档流）？


### es678 新特性

- https://juejin.im/post/5c02b106f265da61764aa0c1
- https://www.jianshu.com/p/9da4aa1c9970


### 做过推动流程或者改善流程的事件


### HTTP状态码206是干什么的

断点续传


## 项目

## leader

为什么要离开现在的公司
以前公司的岗位制度是什么样
你是校招进去的么
你现在的岗位等级情况
你的绩效情况
你领导对你的评价是怎么样的
领导是不是经常找你沟通


你为什么要离开现在的公司
你们公司的岗位等级是怎么评定的，你现在是什么岗位等级
谈谈你在公司的绩效情况
你觉得你做的最有成就感的一件事
你一般解决问题的方法有哪些
你是因为什么契机选择做前端
你有对你所在的公司做过什么流程或制度规范上的改进么
你最近在看什么书，和工作相关么，你为什么要看这些书
看到你之前还面试了其他两个部门都挂在了一面，你感觉是什么原因
你期望的薪资待遇是多少


## 进程和线程

1、进程是资源分配的最小单位，线程是程序执行的最小单位（资源调度的最小单位）
2、进程有自己的独立地址空间，每启动一个进程，系统就会为它分配地址空间，建立数据表来维护代码段、堆栈段和数据段，这种操作非常昂贵。
而线程是共享进程中的数据的，使用相同的地址空间，因此CPU切换一个线程的花费远比进程要小很多，同时创建一个线程的开销也比进程要小很多。
3、线程之间的通信更方便，同一进程下的线程共享全局变量、静态变量等数据，而进程之间的通信需要以通信的方式（IPC)进行。不过如何处理好同步与互斥是编写多线程程序的难点。
4、但是多进程程序更健壮，多线程程序只要有一个线程死掉，整个进程也死掉了，而一个进程死掉并不会对另外一个进程造成影响，因为进程有自己独立的地址空间。


12h   3天 珠峰 vue，搞定下面面试题

https://github.com/haizlin/fe-interview/blob/master/lib/Vue.md


MVVM如何实现模板绑定，依赖是如何收集的？

vue2中的diff算法是怎样实现的？

请详细说出vue生命周期的执行过程

vue组件间的交互有七种你知道几种？

vue-cli3.0如何实现的？

说说hash路由和history路由，你能自己编写一个前端路由吗？

你能手写vuex状态管理吗？

你能开发自己的组件库吗(树组件，日期组件，表格组件)？



## 自我介绍

我叫贺昱皓，家乡是湖北潜江，2011年7月份从三峡大学毕业，本科学的是物理学专业，毕业后从事过丝网印刷、软件测试等工作，2014 左右年了解到到可以使用 seo 做网站来做淘宝客，开始学习 seo 搭建淘宝客网站，做网站过程中发现对页面修改比较感兴趣。后来发现前端这个行业，开始学习前端，15年过年后在武汉找了一家公司，信阳佳创互联有限公司，一直做到今年的5月份。在这段过程中不断的学习技能，努力将公司产品做到更好、将工作流程更规范化。公司大多数时候只有我一个前端，没有专业的 UE，所以用户体验这块我比较注重，经常看一些文章，然后思考后和其它同事讨论，做对应的修改。

我的自我介绍就到这里。

## 哪个项目最满意，如何做的？

背景：代理商系统，当时公司准备做一个代理商系统，比较大，我之前了解过 vue，但是没有学过，在网上看了别个的对比后，容易上手，包体积小，数据驱动。于是花了两天时间将官方文档过了一遍。就开始做项目了。

当时是使用 vue-cli 搭建环境，然后使用 vue 全家桶做开发，样式库使用的是 weui。
1. 基础库方面，写了一些基本的方法。
1. 组件方面，基于 weui 封装了一些公共组件和业务组件，比如 tabbar，自动生成表单。
1. 在网络请求方面，我封装了 axios，使用工厂模式导出了三个方法，get post upload ，用于发请求。直接可以 async await 调用。并且内部使用拦截器处理了响应数据。
2. 在安全方面，防御 xss 攻击，csrf 攻击、密码安全、传输安全
3. 工作流程方面
    - gulp 一键发布到测试环境和正式环境
    - 使用 prettier 规范代码格式
    - 使用 eslint 规范代码
    - 使用 husky 增加 commit 规范
3. 性能优化方面：
    - 图片压缩
    - js懒加载和图片懒加载
    - 代码
    - 将项目进行拆分
    - 对 cli 增加配置
        - 去掉 console、warn
        - 
4. 监控方面，增加错误上报

## 印象最深的技术问题，最后怎么解决的，有什么心得？

<!-- 代理中心上线后，发现微信分享功能有问题，ios 微信分享的验证签名是第一次打开的 url，所以后面用 push 后无效。 -->
<!-- 
之前做 app 时，我加入了 code-push 做热更新，但是还需要一个 app 硬更新的功能，所以我就去网上找有没有开源的库，后来发现别人的库要不是很难用就是很长时间没有更新不能用了。所以我决定基于`react-native-fs`库封装一个，这个包只能下载 apk，但是不能自动安装。所以到网上找了段代码集成进去了。学习到了封装原生包的流程，和 rn 是怎么将 原生提供给js 用的。

1. 使用 createlibrary 创建包。
1. 在 java 代码里写原生模块后，装饰器 @ReactMethod 会挂载到 js 层的 NativeModule 对象上，js层就可以使用了。 -->

## 做的最久的一个项目，项目有什么问题，你能做什么？

## 能给我们团队和产品带来什么？

之前经常和其它岗位的公司交流需求，开发产品，所以可以很好融入团队，并且担当起应该负起的责任，同时作为前端会以自己最大能力来优化产品，比如节省流量、提高用户体验等，为公司带来更高的效益。

webp
1. 图片体积小，而且肉眼看不出差别
2. 支持无损压缩和有损压缩
3. 支持透明和动画
PNG8 色彩不够丰富和在浏览器中可能会出现毛边的问题
jpg全名是JPEG,就是有损压缩
png 支持无损压缩和有损压缩
兼容性：通过 accept 判断

Animated PNG 可以解决高清动画图片的问题。PNG 动画图片支持 24 位（1600W 色），并且支持 alpha 透明度。另外，GIF 动画每秒最多限制为 10 帧，PNG 动画则无此限制，因此可以得到更为细腻的动画效果。

Animated PNG 很早就在 Firefox 中得到支持，并且在 Safari 8+、chrome 59+ 也得到支持。也就是说，除了微软系浏览器外，最新的主流浏览器都支持 Animated PNG 了
