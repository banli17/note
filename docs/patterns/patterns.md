---
title: js设计模式
date: 2017-06-17 14:36:48
tags:
---

设计模式是一套让代码可重用，可读，可靠的经验总结。它可以分为三类：

- 创建型模式：对象实例化的模式，创建型模式用于解耦对象的实例化过程。
- 结构型模式：把类或对象结合在一起形成一个更大的结构。
- 行为型模式：类和对象如何交互，及划分责任和算法。

## 面向对象和UML类图

### 面向对象的意义

面向对象的本质实际是对数据进行结构化，即归类，这是为了更加方便的管理代码。对于计算机来说，结构化的才是最简单的。

面向对象的三要素: 继承、封装、多态

继承

js 里通过 extends 来继承类。

```javascript
class Person{
    constructor(name){
        this.name = name
    }
}

class Student extends Person{
    constructor(name, classroom){
        super(name)
        this.classroom = classroom 
    }
    study(){
        //...
    }
}
```

封装

面向对象语言中的封装是通过下面三个关键词来限定属性、方法的访问权限。

- `public`: 公开的，父类、子类、实例都可以访问。
- `protected`: 保护的，父类、子类可以访问。
- `private`: 私有的，只有当前类可以访问。

在 js 中没有这种语法，可以使用 typescript 来规范。

多态

多态是子类可以重写父类的方法，或者同名方法可以根据参数个数或类型的不同表示不同功能。

### UML类图

UML类图用来描述类和类之间的关系。

每个类有类名，属性和方法。

- `public`使用 + 号
- `protected`使用 # 号
- `private`使用 - 号

**关系**

- 泛化：表示继承，使用空心箭头。
- 关联：表示引用，使用实心箭头

![](./oop/a.png)

上面的这张图表示 A,B 类继承自 Person类，Person中引用了 House类。

## 设计原则与编程技巧

### 什么是设计

unix/linux设计哲学一书的总结：

1. 小即是美。
2. 让每个程序只做好一件事。
3. 快速建立原型，给用户用，使用过程中根据反馈和自己的规划继续完成。
4. 舍弃高效率而取可移植性，可移植性>高效率，因为计算机配置是不断升高的。
5. 采用纯文本来存储数据，即可读性，让适合人阅读，不要用二进制之类。
6. 充分利用软件的杠杆效应(软件复用)。
7. 使用 shell 脚本来提高杠杆效应和可移植性。
8. 避免强制性的用户界面。
9. 让每个程序都称为过滤器。

小准则：

1. 允许用户定制环境。
2. 尽量使操作系统内核小而轻量化。
3. 使用小写字母并尽量简短。
4. 沉默是金。
5. 各部分之和大于整体。
6. 寻求 90% 的解决方案。不要什么都做到完美，因为会耗费很大精力。

### SOLID五大设计原则

- S: 单一职责原则：一个程序只做好一件事，如果功能复杂就拆分开
- O: 开放封闭原则：对扩展开放，对修改封闭。增加需求时，扩展新代码，而非修改已有代码。
- L: 李氏置换原则：子类能覆盖父类，父类能出现的地方子类就能出现，js使用较少（继承使用较少）。
- I: 接口独立原则：保持接口的单一独立，避免出现胖接口。js没有接口，使用较少。
- D: 依赖倒置原则：面向接口编程，依赖于抽象而不依赖于具体，使用方只关注接口而不关注具体类的实现。js中使用较少(没有接口&弱类型)。


### 第二题

1. 某停车场，分3层，每层100车位 
2. 每个车位能监控到车辆的驶入和离开
3. 车辆进入前，显示每层的空余车位数量
4. 车辆进入时，摄像头可识别车辆号和时间
5. 车辆出来时，出口显示器显示车牌号和停车时长


## 创建型模式

### 工厂模式

工厂模式是一个创建型模式，它将创建者和构造函数分离，把创建对象的操作(new)封装在工厂类中，让上层只需要使用工厂的方法来创建对象，不用关心工厂中产品的实现。

**代码示例**

```javascript
class Product{
    constructor(name){
        this.name = name
    }
    init(){}
}

class Creator{
    create(name){
        return new Product(name)
    }
}

let creator = new Creator()
let p = creator.create('p1')
p.init()
```

上面的代码可以看到，我们调用工厂creator的create方法就可以创建产品，如果产品有变化，比如产品停产或换产品了，只需要在工厂类内部处理，无需修改上层代码。

**场景**

**1、jquery实例的创建就是工厂模式**

```javascript
window.$ = function(selector) {
  return new jQuery(selector)
}
```

这样我们只需要使用`$()`即可，如果使用`new $()`书写起来麻烦，而且链式调用会很繁杂(以为都需要写 new)。另外如果jQuery名称修改为了zQuery，那么上层代码都需要修改。

**2、React.createElement也是工厂模式**

```javascript
React.createElement("div", null, {})

React.createElement = function(tag, attrs, children) {
   return new Vnode(tag, attrs, children)
}
```


- [javascript设计模式(2): 抽象工厂模式]

### 单例模式

单例模式就是一个类只有一个实例。比如整个网站的登陆弹出框，系统window对象等。

实现

```javascript
class SingleObject{

}

SingleObject.getInstance = (function(){
    let instance
    return function(){
        if(!instance){
            instance = new SingleObject()
        }
        return instance
    }
})()

let o1 = SingleObject.getInstance()
let o2 = SingleObject.getInstance()
o1 == o2  // true

// 但是还是可以new SingleObject
let o3 = new SingleObject()
```

实例

比如现在需要实现一个登陆弹出框。

```javascript
class LoginForm{
    show(){}
    hide(){}
}

LoginForm.getInstance = (function(){
    let instance = null
    return function(){
        if(!instance){
            instance = new LoginForm()
        }
        return instance
    }
})()
```

显然，可以将 getInstance 抽出来，因为其他组件也可能是单例，比如遮罩。

```javascript
class LoginForm {
    show() { }
    hide() { }
}

class Singleton { }
Singleton.getInstance = function (fn) {
    let instance = null
    return function () {
        return instance || (instance = fn.apply(this, arguments))
    }
}

let createLogin = Singleton.getInstance(function () {
    return new LoginForm()
})

let login1 = createLogin()
let login2 = createLogin()

class Mask { }
let createMask = Singleton.getInstance(function () {
    return new Mask()
})

let mask1 = createMask()
let mask2 = createMask()

console.log(login1 === login2)  // true
console.log(mask1 === mask2)    // true
console.log(login1 === mask1)   // false
```

看上面代码，单例就是获取实例的时候总是那个实例。

总结

- 符合单一职责原则，只实例化唯一的对象。
- 没法具体开放封闭原则，但是不违反开发封闭原则。

### 建造者模式

### 原型模式

原型模式是创建型模式的一种，其特点在于通过「复制」一个已经存在的实例来返回新的实例,而不是新建实例。被复制的实例就是我们所称的「原型」，这个原型是可定制的。原型模式多用于创建复杂的或者耗时的实例，因为这种情况下，复制一个已经存在的实例使程序运行更高效；或者创建值相等，只是命名不一样的同类数据。

```javascript
Object.create(prototype)
```

对比js中的原型prototype: js里的prototype是es6 class的一种底层实现，是面向对象的基础，而不是某个模式。多年后，es6全面普及后，js 里的 prototype 可以被改变，但是Object.create()会保留，因为它是原型设计模式的基础。

原型模式在前端用的不多。


## 结构型模式

### 适配器模式

适配器模式的主要用途是兼容旧接口。

代码1

```javascript
class Adaptee {
    oldFn(){}
}

class Target {
    constructor(){
        this.a = new Adaptee()
    }
    newFn(){
        // 修改 this.a.oldFn
    }
}

const t = new Target()
t.newFn()
```

代码2

```javascript
class A{
    show(){}
}

class B{
    display(){}
}

class AdapteB{
    show(){
        // 转换插头
        return B.display()
    }
}

function render(obj){
    obj.show()
}
// 之前 render(new A)
// 现在
render(new AdapteB)
```

场景

- 用于兼容旧接口。
- vue computed

```javascript
// 历史全是$.ajax，现在要用vue，自己封装一个 ajax()
function ajax() {
    
}

var $ = {
    ajax: function(options) {
        return ajax(options)
    }
}
```

设计原则

- 将旧接口和使用者分离
- 符合开放封闭原则

### 桥接模式

桥接模式(Bridge) 是将抽象部分与它的实现部分解耦，使它们独立变化。

它的一个典型应用场景是事件监听。

```javascript
li.addEventListener('click', getUserInfoBridge, false)

function getUserInfoBridge(event){
    getUserInfo(event.target.dataset.id, (data)=>{
        console.log('得到用户信息', data)
    })
}

function getUserInfo(id, callback){
    ajax.get(`/user/${id}`, (data)=>{
        callback && callback(data)
    })
}
```

上面`getUserInfoBridge()`方法作为桥将监听和处理函数解耦，让`getUserInfo()`方法更加通用。

桥接模式和适配器模式的区别

适配器模式是 A 不能使用 B，所以用适配器模式将 B 包装后给 A 使用。桥接模式是 A、B 能正常使用，但是为了让 A、B 解耦，所以用 C 将 A、B 分开。让 A、B 更加通用。

### 组合模式

组合模式（Composite Pattern），又叫部分整体模式，是用于把一组相似的对象当作一个单一的对象。组合模式依据树形结构来组合对象，用来表示部分以及整体层次。

比如vnode节点的遍历，因为对象和其子对象数据结构是一样的，可以用一样的操作。它将对整体和单个节点的操作抽取出来。

### 装饰者模式

装饰器模式是不改变原来的结构和功能，给对象添加新功能。

![](./decorator/uml.png)

下面是实现的代码：

```javascript
class A{
    plus(){}
}

class Decorator{
    constructor(target){
        this.target = target
    }
    plus(){this.target.plus()}
    subtract(){}
}

class Client{
    constructor(a, decorator){
        this.a = a
        this.decorator = decorator
    }
}

let a = new A()
let d = new Decorator(a)
d.plus()
d.substract()

let c = new Client(a, decorator)
c.a.plus()
c.decorator.substract()
```

上面的代码可以看到，装饰器实际是对原来的对象进行了一层包装，它具有原来对象的方法，并且能新增一些方法。可以个人认为有些问题：

1. 如果A里面有很多个方法。Decorator里岂不是都需要写一遍？可以使用克隆原型属性的方法解决。
2. 如何给A添加新的属性呢？可以在装饰器里定义一个方法给target设置新属性解决。
3. 为什么不使用继承呢？

《javascript设计模式与开发实践》里解释了为什么不使用继承。原因如下：

1. 继承使父类和子类强耦合，父类改变后，子类实际也改变了。
2. 父类对子类是可见的，也就是通过子类，知道父类的实现，这破坏了封装性。

上面的装饰器模式确实没有这2个问题。实际上上面的Decorator完全可以用一个函数来实现：

```javascript
function decorator(target){
    target.num = 13
    target.prototype.substract = function(){}
}
```

使用函数可以很方便的增加属性和方法，个人觉得这种用法要比上面用Decorator类更好些。

实际应用场景

AOP切面

装饰器的目的就是新增一些功能。比如需要在函数执行前后执行一些方法，可以写下面2个方法：

```javascript
function before(fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments)
        return fn.apply(this, arguments)
    }
}

function after(fn, afterFn) {
    return function () {
        let ret = fn.apply(this, arguments)
        afterFn.apply(this, arguments)
        return ret
    }
}
```

因为before方法里的fn,beforeFn都使用了arguments，所以可以在beforeFn里对arguments进行修改。


比如希望在点击按钮后上报一些数据：

```javascript
function clickHandler(){}
function log(){
    // 上报数据
}
el.onclick = after(clickHandler, log)
```

或者在当前项目请求数据需要添加token，但是其它项目不需要。为了不修改基础的ajax方法。我们可以像下面这样：

```javascript
function ajax(options){}
ajax = ajax.before(function(options){
    options.params.token = 'xxx'
})
```

表单提交时验证也可以用过装饰器模式来实现。通过我们表单校验的代码如下：

```javascript
function submit(){
    if(!validate()) return 
    // 验证通过...
}
```

但是如果我们不想将表单提交的submit()方法和表单校验validate()方法混合在一起。可以使用下面的方法：

```javascript
function submit() {
    console.log('submit')
}

function validate(params) {
    console.log('validate')
    if (params) return
}

function before(fn, beforeFn) {
    return function () {
        if (beforeFn.apply(this, arguments) === false) return
        return fn.apply(this, arguments)
    }
}

submit = before(submit, validate)
submit(false))
```

 总结

- 装饰器模式最好使用函数来实现，在这个函数里直接对对象进行处理。
- 有时候我们不想让一个对象太复杂，这时可以使用装饰器模式动态来添加方法。
- 如果嵌套多个装饰器，函数作用域会很长，性能会有影响。

装饰器模式和代理模式

装饰器模式和代理模式都使用了另一个对象进行操作。它们的区别是设计目的。装饰器模式是增加功能，是一开始不能确定对象的全部功能，可以形成很长的装饰链。而代理模式是做一些拦截，提供访问权限，只有一级。


es7装饰器

es7已经有了装饰器，生产中使用需要安装插件`babel-plugin-transform-decorators-legacy`。

core-decorators

- [core-decorators](https://github.com/jayphelps/core-decorators)

### 外观模式

外观模式(Facade)也叫做门面模式，它是为子系统（一组类的集合，这些类可以相互协助组成系统中一个相对独立的部分）中的一组接口提供一个统一的高层接口，使得子系统更容易使用。

比如启动电脑的时候。我们不关心CPU，内存，硬盘的启动和加载，只需要按一个启动键就可以了。

```javascript
class CPU{
    freeze(){}
    jump(){}
    execute(){}
}
class Memory{
    load(){}
}
class HardDrive{
    read(){}
}

// Facade 门面
class Computer{
    start(){
        cpu.freeze()
        memory.load()
        cpu.jump()
        cpu.execute()
    }
}

let c = new Computer()
c.start()
```

可以看到外观模式屏蔽了客户操作子系统的复杂性，提供了一个简单的高层接口。请求外观不是强制的，也可以绕过外观直接操作子系统。

场景

1、比如将阻止事件冒泡和默认事件封装在一起。

```javascript
var stopEvent = function( e ){   //同时阻止事件默认行为和冒泡
    e.stopPropagation();
    e.preventDefault();
}
```

2、比如传几种参数。

```javascript
function bindEvent(elem, type, selector, fn){
    if(fn == null){
        fn = selector
        selector = null
    }
}

// 调用
bindEvent(elem, 'click', '#div1', fn)
bindEvent(elem, 'click', fn)
```

3. 设置css

```javascript
function setStyles( id, styles ){
    var element = document.getElementById( id );
    for( var key in styles ){
        if( styles.hasOwnProperty( key ) ){
            element.style[ key ] = styles[ key ];
        }
    }
}

setStyles( 'content', {
    color : 'red'，
    height : '200px'
} ); 
```

如果要批量操作元素，还可以再次包装。

```javascript
function setCSS( ids, styles ){
    for( var i = 0,len = ids.length; i<len; i++ ){
         setStyles( ids[i], styles );
    }
} 
```

总结

- 不符合单一职责原则和开发封闭原则，胖接口。因此谨慎使用，不可滥用。
- 符合最少知识原则。
- 子系统的内部变化了，只要外观不变就不会对客户造成影响。
- 外观模式是封装的子系统，而普通的封装是都可以封装。

### 享元模式


- 书籍《javascript设计模式与开发实践》 [网文](https://www.cnblogs.com/xiaohuochai/p/8039957.html)

享元模式就是将大量重复的对象根据内部状态抽象成少量的对象，从而解决大量重复对象产生的性能问题。

- 共享内存，主要考虑内存，而不是效率。
- 相同的数据，共享使用。

js中使用场景很少，因为浏览器端基本不需要考虑内存问题。


### 代理模式

代理模式(proxy pattern)是通过代理去访问对象，代理提供了一些拦截操作。操作者操作的是代理。

比如送花，X 需要给 A 送花，但是不好意思，于是委托好朋友 B 给 A 送花。

![](./proxy/uml.png)

```javascript
const Flower = function(){}
const X = {
    sendFlower: function(){
        B.receiveFlower()
    }
}
const B = {
    receiveFlower: function(){
        if(A.happy){  // 当A开心时
            var f = new Flower()
            A.receiveFlower(f)
        }
    }
}
const A = {
    happy: false,
    receiveFlower: function(flower){
        console.log('A收到花了')
    }
}

X.sendFlower()
```

上面代码可以看出：

1. 代理和目标对象提供了相同的接口，使得操作者仿佛是操作目标对象一样。
2. 代理保护：可以拒绝一些对目标对象访问，比如A不开心的时候就不送花。
3. 虚拟代理：可以延迟Flower对象在需要的时候才创建，不需要在`X.sendFlower`中创建，这样节省了内存。

图片预加载

图片预加载常用的方法是先用一张loading图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到img节点里，这种场景就很适合使用虚拟代理（等准备好后再执行本体）。

```javascript
var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );
    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage.setSrc( this.src );
    }
    return {
        setSrc: function( src ){
            myImage.setSrc( 'loading.gif' );
            img.src = src;
        }
    }
})();
proxyImage.setSrc( 'https://static.xiaohuochai.site/icon/icon_200.png' );
```

这样做的好处是符合单一职责原则。本来是只需要给img节点设置src。预加载只是让效果更好的功能。于是代理的作用在这里就体现出来了，代理负责预加载图片，预加载的操作完成之后，把请求重新交给本体MyImage。即使有一天不需要代理了，只需要修改成请求本体即可。

代理对象和本体都对外提供了setSrc方法，在客户看来，代理对象和本体是一致的， 代理接手请求的过程对于用户来说是透明的，用户并不清楚代理和本体的区别，这样做有两个好处：

1. 用户可以放心地请求代理，只关心是否能得到想要的结果；
2. 在任何使用本体的地方都可以替换成使用代理。

合并http请求

频繁的http请求会造成巨大的开销，有时我们可以在代理中通过延迟来合并http请求。比如：

```javascript
var synchronousFile = function( id ){
    console.log( '开始同步文件，id 为: ' + id );
};

var proxySynchronousFile = (function(){
    var cache = [], // 保存一段时间内需要同步的ID
    timer; // 定时器
    return function( id ){
        cache.push( id );
        if ( timer ){ // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function(){
        synchronousFile( cache.join( ',' ) ); // 2 秒后向本体发送需要同步的ID 集合
        clearTimeout( timer ); // 清空定时器
        timer = null;
        cache.length = 0; // 清空ID 集合
    }, 2000 );
    }
})();

var checkbox = document.getElementsByTagName( 'input' );
for ( var i = 0, c; c = checkbox[ i++ ]; ){
    c.onclick = function(){
        if ( this.checked === true ){
            proxySynchronousFile( this.id );
        }
    }
};
```

虚拟代理在惰性加载中的应用

比如调试打印内容，可以先把打印内容收集起来，当用户通过f2打开控制台的时候才加载js并执行打印操作。

```javascript
var miniConsole = (function(){
    var cache = [];
    var handler = function( ev ){
        // 按下f2时踩加载miniConsole.js
        if ( ev.keyCode === 113 ){
            var script = document.createElement( 'script' );
            script.onload = function(){
                for ( var i = 0, fn; fn = cache[ i++ ]; ){
                    fn();
                }
            };
            script.src = 'miniConsole.js';
            document.getElementsByTagName( 'head' )[0].appendChild( script );
            document.body.removeEventListener( 'keydown', handler );// 只加载一次miniConsole.js
        }
    };
    document.body.addEventListener( 'keydown', handler, false );
    return {
        log: function(){
            var args = arguments;
            cache.push( function(){
                return miniConsole.log.apply( miniConsole, args );
            });
        }
    }
})();

miniConsole.log( 11 ); // 开始打印log
// miniConsole.js 代码
miniConsole = {
    log: function(){
        // 真正代码略
        console.log( Array.prototype.join.call( arguments ) );
    }
}
```

缓存代理

有时我们可以将结果缓存到缓存代理中，下次又计算相同内容时，将结果直接从缓存中取出来。

```javascript
/**************** 计算乘积 *****************/
var mult = function(){
    var a = 1;
    for ( var i = 0, l = arguments.length; i < l; i++ ){
        a = a * arguments[i];
    }
    return a;
};
/**************** 计算加和 *****************/
var plus = function(){
    var a = 0;
    for ( var i = 0, l = arguments.length; i < l; i++ ){
        a = a + arguments[i];
    }
    return a;
};
/**************** 创建缓存代理的工厂 *****************/
var createProxyFactory = function( fn ){
    var cache = {};
    return function(){
        var args = Array.prototype.join.call( arguments, ',' );
        if ( args in cache ){
            return cache[ args ];
        }
        return cache[ args ] = fn.apply( this, arguments );
    }
};

var proxyMult = createProxyFactory( mult ),
proxyPlus = createProxyFactory( plus );
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24
alert ( proxyMult( 1, 2, 3, 4 ) ); // 输出：24
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
alert ( proxyPlus( 1, 2, 3, 4 ) ); // 输出：10
```

在 JavaScript 开发中最常用的是虚拟代理和缓存代理。虽然代理 模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。

 $.proxy

jQuery 里的 $.proxy(fn, this) 可以将函数里的 this 进行代理。

```javascript
el.onclick = function(){
    $.proxy(setTimeout(function(){
        console.log(this)
    }), this)
}
```

 es6 Proxy代理

请明星做广告时，不能直接访问明星，而是要通过经纪人。如果报价低了，经纪人直接拒绝。通过es6的 Proxy 来实现。

```javascript
const star = {
    name: '孙悟空',
    price: 10000
}

const agent = new Proxy(star, {
    get(target, key) {
        if (key === 'price') {
            console.log('访问了price')
        }
        return target[key]
    },
    set(target, key, val) {
        if (key === 'customPrice') {
            if (val < target.price) {
                throw new Error('价格太低了')
            } else {
                target[key] = val
            }
        }
    }
})

console.log(agent.price)
agent.customPrice = 100000
```

代理模式和命令模式的区别

1. 代理模式目的主要是做拦截，拦截时可以延迟创建对象(虚拟代理)或缓存数据(缓存代理)。
2. 命令模式主要是将命令发出者和接受者解耦。使得发出者不需要关心接受者代码的具体实现。
3. 代理模式主要操作的对象是代理，命令模式主要操作对象是命令发出者。

代理模式和适配器模式，装饰者模式的区别

- 代理模式主要用于访问权限的控制，提供一模一样的接口，仿佛有权限访问原对象，功能是经过限制的。
- 适配器模式是提供不同的接口，处理不兼容，比如插头的转换。
- 装饰器模式目的是新增功能，原功能不变。


总结

1. 送花的故事
2. jQuery的$.proxy
3. es6 Proxy明星拍广告的故事
4. 虚拟代理的作用，保护代理的作用
5. 什么是单一职责原则：一个类应该只有一个发生变化的原因
6. http合并请求
7. 图片预加载，将预加载和插图片分开
8. 虚拟代理在惰性加载中的应用，将延迟到需要的时候再创建，先收集打印内容，再加载miniConsole.js后执行。
9. 缓存代理

## 行为型模式

### 策略模式

- 书籍《javascript设计模式与开发实际》

策略模式是定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

比如下面的代码：

```javascript
function do(x){
    if(x == 'A'){
        //...
    }
    if(x == 'B'){
        //...
    }
    if(x == 'C'){
        //...
    }
    ....
}
```

上面的代码if分支太多，而且如果执行Z，上面的if分支都需要判断一遍。可以用策略模式来改写它。

```javascript
class A{
    do(x){}
}
class B{
    do(x){}
}
class C{
    do(x){}
}
....

function do(o, x){
    o.do()
}

let a = new A()
do(a, x)
```

可以看到，只需要传入对应的策略，执行方法即可。


### 模板方法模式


模板方法模式(template method pattern)用于子类具有相同方法和步骤，但是具体方法的实现不同。

```javascript
class Drink{
    constructor(){
    }
}
```

 应用场景

比如模块的渲染：
1. ajax发请求
2. 获取到数据，渲染模板并显示

```javascript
class RenderHtml {
    
}

var a = RenderHtml()
```

js里直接用高阶函数替换继承

```javascript
var Drink = function(params) {
    var boilWater = function() {
        console.log('boil water')
    }
    var a = params.a || function (props) {}
    return {
        init:function() {
           boilWater() 
        }
    }
}

var tea = Drink({
    a: function() {
      console.log('加茶叶')
    }
});
tea.init();
```

### 观察者模式


- [设计模式（三）：观察者模式与发布/订阅模式区别](http://www.cnblogs.com/lovesong/p/5272752.html)
- [观察者模式和发布订阅模式有什么不同？](https://www.zhihu.com/question/23486749)

有些人经常将发布订阅模式和观察者模式弄混淆，实际它们是有区别的，下面来详细介绍。

## 发布订阅模式

### 简介

发布订阅模式是一种消息范式，消息发布者和订阅者是解耦无关的，它们之间通过消息中心来管理。消息可以分为多个类别，不关注订阅者。订阅者可以订阅一个或多个类别感兴趣的消息，也不关心发布者。(它实际是去除了发布者和订阅者，只关注消息的发布和订阅)。

### 实现

```javascript
function Event() {
    this.callbacks = []
}

Event.prototype.on = function (fn) {
    this.callbacks.push(fn)
}

Event.prototype.emit = function () {
    var _this = this
    var _args = arguments
    this.callbacks.forEach(function (callback) {
        callback.apply(_this, _args)
    })
}

var e = new Event()
e.on(function (a) {
    console.log(1, a)
})
e.on(function (a, b) {
    console.log(2, a, b)
})
e.emit('hi', 'xx')
```

## 观察者模式

观察者模式是软件设计模式的一种，是一个目标对象管理所有依于它的观察者对象，并且在它本身的状态改变时主动发出通知。目标被观察者观察，目标变化时观察者执行某些操作。它们是紧耦合的。

**被观察者Subject实例的方法**

- `attach(observer)`: 让观察者绑定被观察者
- `notifyAllObserver()`: 状态变化时，通知观察者(即调用观察者的update()方法)

**观察者Observer实例的方法**

- `update()`: 目标变化时，观察者执行的操作

注意被观察者和观察者时紧耦合的

实现

```javascript
// 目标
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
        this.notifyAllObserver()
    }

    notifyAllObserver() {
        this.observers.forEach(observe => {
            observe.update()
        })
    }

    attach(observer) {
        this.observers.push(observer)
    }
}

// 观察者
class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)  // 目标绑定观察者
    }

    update() {
        console.log(`my name is ${this.name},subject state is ${this.subject.getState()}`)
    }
}

const s = new Subject()
const o1 = new Observer('o1', s)
const o2 = new Observer('o2', s)

s.setState(1)
s.setState(2)
```

当目标变化时，即调用`s.setState()`时，观察者会收到消息。

 发布订阅模式和观察者模式的区别

发布订阅模式是最常用的一种观察者模式的实现。观察者模式是耦合的，它强调目标和观察者，当目标变化通知观察者。但是大多数场景中我们并不关心目标和观察者，而是只关心目标的变化。所以发布订阅模式只通过消息中心来调度，它去除了发布者和订阅者(解耦)，只管消息的订阅和发布。

优缺点也很明显，紧密耦合的方式简单直接，扩展性差，而且要求两端同时存在。松散耦合不直接产生依赖，更容易扩展，想在哪里用就在哪里用。

![](./imgs/observer.png)

应用场景

- 网页事件绑定：点击按钮的时候触发绑定的事件
- Promise

```javascript
result.then(()=>{
    // then这里是绑定，等到promise pending状态变化时触发
}).then()
```

- jQuery callbacks

```javascript
var callbacks = $.Callbacks()
callbacks.add(function(info){console.log(info)})  // fire
callbacks.fire('fire')
```

- 自定义事件

```javascript
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()
emitter.on('end', function(){
    console.log('hi')
})
emitter.emit('end')

// 2
class Person extends EventEmitter{

}
let p = new Person()
p.on('talk', ()=>{})
p.emit('talk')

// 3、坏处是可能不是一行一行的读
var fs = require('fs')
var readStream = fs.createReadStream('./1.txt')
var length = 0
readStream.on('data', function(chunk){
    length += chunk.toString().length
})
readStream.on('end',function(){
    console.log(length)
})

// 4、一行行的读，利用readline
var readline = require('readline')
```

- nodejs中：处理 http 请求，多进程通讯
- vue 和 react 组件生命周期触发
- vue watch

### 迭代器模式



迭代器模式是将数组、类数组等数据格式的遍历封装在一个方法中。

```javascript
class Iterator {
    constructor(container) {
        this.list = container.list
        this.index = 0
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
        return null
    }
    hasNext() {
        return this.index < this.list.length
    }
}

class Container {
    constructor(list) {
        this.list = list
    }
    getInterator() {
        return new Iterator(this)
    }
}
let container = new Container([1, 4, 2, 19, 22])
let it = container.getInterator()

while (it.hasNext()) {
    let n = it.next()
    console.log(n)
}
```

## es6 Iterator

es6中，有序集合的数据类型已经有很多了，如Array,Map,Set,String,TypedArray,arguments,NodeList等。

它们都内置了[Symbol.iterator]方法，这个方法会返回迭代器，执行`for...of`方法时会自动执行这个迭代器。

```javascript
function each(data, callback) {
    let it = data[Symbol.iterator]()

    let isDone = false
    while (!isDone) {
        let { value, done } = it.next()
        !done && callback.call(data, value)
        isDone = done
    }
}

each([1, 3, 4, 9], function (item) {
    console.log(item)
})
```

因为语法糖`for...of`就会执行对象的迭代器方法，所以可以将上面的方法简化为：

```javascript
function each(data, callback) {
	for(let item of data){
		callback.call(data, item)
	}
}
```

- 迭代器对象和目标对象分离。
- 迭代器将使用者与目标对象分离，不关心对象类型。
- 符合开放封闭原则。

### 职责链模式

在职责链模式(chain-of-responsibility)里，有很多函数节点组成了一条链，数据传递给第一个函数处理，如果失败则抛给第二个函数，直到某个函数节点成功处理该数据为止。

```javascript
function processType(type){
    if(type == 1){
        //...大量代码
        return 
    }
    if(type == 2){
        //...大量代码
        return 
    }
    if(type == 3){
        //...大量代码
        return 
    }
    // 兜底
}
```

上面这段代码会造成函数太长难以维护，当然其中的大量代码可以使用一些函数抽取出来，但是当需要新增了`type == 4`，就需要去修改 processType 函数，违反了开闭原则。

职责链模式就可以来优化这段代码。我们可以在`type==1`处理完成后，再对`type==2`处理，再对`type==3`处理。


```javascript
class Action {
    constructor(name) {
        this.name = name
        this.nextAction = null
    }

    setNextAction(action) {
        this.nextAction = action
    }

    handle() {
        console.log(`${this.name}审批`)
        if(this.nextAction != null){
            this.nextAction.handle()
        }
    }
}
let a = new Action('组长')
let b = new Action('总监')
let c = new Action('老总')
a.setNextAction(b)
b.setNextAction(c)
a.handle()
```



### 命令模式


命令模式可以降低发起者和执行者的耦合度，还可以进行撤销、排队等操作。

命令模式的关键要素： 发起者，执行者，命令(发起者,执行者.doSomething)。发起者不关心执行者，调用时，直接通过命令层来绑定发起者，来让执行者执行某个操作。

比如点击一个按钮让遮罩隐藏。

```javascript
const mingling = (obj, fn) => obj.onclick = fn
mingling(btn, mask.hide)
mingling(btn, menu.refresh)
```

这种方式将绑定事件的逻辑抽出来了, 看起来要更加精简。

关于撤销操作，是需要记录某对象的原始信息，然后某个操作时，进行还原。通常的做法是定义一个变量，或者在执行者对象上新增一个属性，但是会在很多地方进行记录，恢复。 如果使用命令模式，命令就是这么一个缓存对象。可以在执行某个操作前就绑定原始信息。集中化管理

比如游戏的录制，可以通过命令模式将按键记录保存在对象中，然后对这个对象进行shift()重现。

```html
<html> 
<body>
<button id="replay">播放录像</button> </body>
<script>
var Ryu = {
    attack: function(){ console.log( '攻击' ); },
    defense: function(){ console.log( '防御' ); },
    jump: function(){ console.log( '跳跃' );},
    crouch: function(){ console.log( '蹲下' ); }
}

var makeCommand = function( receiver, state ){
    return function(){
        receiver[ state ]();
    } 
};

var commands = {
    "119": "jump",
    "115": "crouch", 
    "97": "defense", 
    "100": "attack"
 };

var commandStack = [];
document.onkeypress = function( ev ){
    var keyCode = ev.keyCode,
    command = makeCommand( Ryu, commands[ keyCode ] );
    if ( command ){
        command(); // 执行命令 commandStack.push( command );
    } 
};

// 将刚刚执行过的命令保存进堆栈
document.getElementById( 'replay' ).onclick = function(){ // 点击播放录像 var command;
    while( command = commandStack.shift() ){
        command();
    }
};
</script> 
</html>
```

命令队列就是有时候一个任务不能及时完成，我们需要将所有任务进行排队处理。比如动画队列。一个动画结束后该如何通知队列。通常可以使用回调函数来通知队 列，除了回调函数之外，还可以选择发布订阅模式。

宏命令是批量执行命令。

```javascript
const openQQ = ()=>{
    console.log('打开qq')
}

const openChrome = ()=>{
    console.log('打开谷歌浏览器')
}

const openPS = ()=>{
    console.log('打开PS')
}

const command = {
    tasks: [],
    add(command){
        this.tasks.push( command );
    },
    execute(){
        this.tasks.forEach((command)=>{
            command()
        })
    }
}
command.add(openQQ)
command.add(openChrome)
command.add(openPS)

command.execute()
```

一般来说，命令模式都会在 command 对象中保存一个接收者来负责真正执行客户的请求，这种情况下命令对象是“傻瓜式”的，它只负责把客户的请求转交给接收者来执行，这种模式的好处是请求发起者和请求接收者之间尽可能地得到了解耦。

但是我们也可以定义一些更“聪明”的命令对象，“聪明”的命令对象可以直接实现请求， 这样一来就不再需要接收者的存在，这种“聪明”的命令对象也叫作智能命令。



```
document.execCommand('bold')
document.execCommand('undo')
```

### 备忘录模式


所谓备忘录模式(memento pattern)就是在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。


### 状态模式


- 一个对象有状态变化，比如交通灯、收藏按钮。
- 每个状态变化都会触发一个逻辑
- 不能总是用if...else来控制

```javascript
class State {
    constructor(color) {
        this.color = color
    }
    // 状态改变时调用
    handler(context) {
        context.setState(this)
    }
}

class Context {
    constructor() {
        this.state = null
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
    }
}

let yellow = new State('yellow')
let red = new State('red')
let green = new State('green')
let context = new Context()  // 实体

yellow.handler(context)
console.log(context.getState())

red.handler(context)
console.log(context.getState())

green.handler(context)
console.log(context.getState())
```

有限状态机(收藏和取消收藏)

javascript-state-machine


 设计原则验证

- 将状态对象和主题对象分离，状态变化逻辑单独处理
- 符合开发封闭原则


### 访问者模式

访问者模式(vistor pattern)是一种将算法与对象结构分离的软件设计模式。

### 中介者模式

中介者模式(mediator mode)就是通过中介者让两个类解耦。

### 解释器模式

interpreter patter

### 生产消费模式


## 参考资料


https://www.kancloud.cn/kancloud/learn-js-design-patterns/56451