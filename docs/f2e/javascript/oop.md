---
title: "javascript 面向对象"
sidebar_label: 面向对象
---

## 构造函数

### 什么是构造函数

构造函数本身就是一个函数，为了规范，一般首字母大写。普通函数和构造函数的不同在于调用方式，如果是`fn()`这样调用，则是普通函数。如果通过`new`关键字调用，就是构造函数。

```js
function Person(name){
    this.name = name
}

Person()  // 普通函数
let p = new Person()  // 构造函数
```

### constructor

对于实例，都有一个 constructor 属性指向其构造函数(实际在其原型上)。

constructor 属性是可修改的，但是对基本类型来说是只读的，因为装箱操作。

```js
// -------引用类型--------
function A(){}
function B(){}
let b = new B()
b.constructor // B

b.constructor = A 
b.constructor // A

// -------基本类型--------
var one = 1
one.constructor  // ƒ Number() { [native code] }
one.constructor = A
one.constructor  // ƒ Number() { [native code] }

null.constructor  // TypeError: Cannot read property 'constructor' of null
undefined.constructor  // TypeError: Cannot read property 'constructor' of undefined
```

可以看到，对于引用类型，constructor 属性是可以修改的。对于基本类型，是只读的，而且`null`和`undefined`是不能调 constructor 属性的。

### Symbol是构造函数吗

要注意的是`Symbol`。`Symbol`是基本数据类型，但是作为构造函数，它不能`new`调用，在 chrome 下，`new Symbol`会报错。

```js
new Symbol(); // Symbol is not a constructor
```

`Symbol('hi')`是基本类型，但是可以获取 constructor 属性值。实际就是`Symbol.prototype.constructor`，它返回的就是`Symbol`函数，

```js
var s = Symbol('hi')

s  // Symbol(hi)
s.constructor  // ƒ Symbol() { [native code] }

Symbol.prototype.constructor === Symbol  // true
```





### new

> new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？

调用 new 时，执行的步骤如下：

1. 以构造函数的 prototype 属性为原型，创建新对象。
2. 将 this 和参数传递给构造器执行。
3. 如果构造器返回的是对象，则返回。否则返回第一步创建的对象。

```js
function myNew(constor, ...args) {
    let o = Object.create(null)
    // o.__proto__ = constor.prototype
    Object.setPrototypeOf(o, constor.prototype)
    let res = constor.call(o, ...args)
    return res instanceof Object ? res : o
}
```

要注意的是，`__proto__`属性是非标准属性，建议用`Object.setPrototypeOf()`代替。

### instanceof

> 面试题：instanceof 的原理是什么？

instanceof 内部机制是判断对象的原型链中是否能找到某个类的`prototype`。

下面实现一下 instanceof。

```js
function myInstanceof(left, right){
    let prototype = right.prototype
    left = left.__proto__
    while(true){
        if(left === null || left === undefined){
            return false
        } 
        if(prototype === left){
            return true
        }
        left = left.__proto__
    }
}
```


## 继承

### 组合继承

```js
function Parent(name, age){
    this.name = name
    this.age = age
}
Parent.prototype.getName = function(){
    console.log(this.name, this.age)
}
function Child(name, age){
    Parent.call(this, name, age)
}
Child.prototype = new Parent()

const child = new Child('zs', 12)
child.getName()  // 'zs'
child instanceof Parent  // true
child.constructor  // [Function: Parent]
```

组合继承主要是：
1. 使用`Parent.call()`拷贝属性。
2. 使用`Child.prototype = new Parent()`来设置原型。

组合继承的好处是，子类的属性是自己的，不会与父类属性共享，但是可以复用父类的函数。缺点是`Child.prototype`上还是存在不需要的属性(new Parent创建对象时导致的)，这会造成内存上的浪费。另外 child.constructor 指向 Parent，应该指向 Child。所以需要修改一下。

```js
Child.prototype.constructor = Child
```

![](/img/oop/3.png)

### 寄生组合继承

这种方式对上面组合继承进行了优化。

```js
function Parent(name, age){
    this.name = name
    this.age = age
}
Parent.prototype.getName = function(){
    console.log(this.name, this.age)
}
function Child(name, age){
    Parent.call(this, name, age)
}
Child.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Child,
        enumerable: false,
        writable: true,
        configrable: true
    }
})

const child = new Child('zs', 12)
child.getName()  // 'zs'
child instanceof Parent  // true
```

![](/img/oop/4.png)

### Class 继承

```js
class Parent {
  constructor(name, age) {
    this.name = name
  }
  getName() {
    console.log(this.name, this.age)
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name, age)  // 这一句可以看作 Parent.call(this, name, age)
    this.name = name 
    this.age = age
  }
}
let child = new Child('zs', 12)
child.getName() // 'zs', 12
child instanceof Parent // true
```

![](/img/oop/5.png)


## 关于 this

### this 解析

> 涉及面试题：如何正确判断 this？箭头函数的 this 是什么？

this 的本质是函数执行时的上下文环境。代码中 this 其实很简单，谁调用它，this 就指向谁。

```js
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()
```

上面代码，`foo()` 执行时，没有指定调用对象，调用对象就是全局 global 对象。所以在浏览器中，this 就指向 window。`obj.foo()`是通过 obj 调用，所以 this 指向 obj。最后，`new foo()`时，this 就是 new 创建的对象 c。

要注意，箭头函数是没有 this 的，它也不能通过 bind 绑定 this。箭头函数中的 this 实际会查找上级作用域链。

```js
function a() {
    return () => {
      console.log(this)
    }
}
a()()
```

上面代码中，箭头函数是没有 this 的，所以 this 是函数 a 的，指向 window。


## 闭包

闭包是函数和声明该函数的词法环境的组合。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

```
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1
```

> 面试题，循环中使用闭包解决 `var` 定义函数的问题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

上面代码中，setTimeout 的函数 timer 会在 for 循环执行完后再执行。这时 i 已经是 6 了。所以全部输出 6。

解决方法有：
1. 使用 let (推荐)
2. 使用闭包

```js
for (var i = 1; i <= 5; i++) {
    (function (i){
        setTimeout(function timer() {
            console.log(i)
        }, i * 1000)
    })(i);
}
```

3. 使用 setTimeout 的第三个参数，它会当作 timer 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
    setTimeout(function timer(i) {
        console.log(i)
    }, i * 1000, i)
}
```

## 深浅拷贝

> 面试题：什么是浅拷贝？如何实现浅拷贝？什么是深拷贝？如何实现深拷贝？

### 浅拷贝

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。

1、 `Object.assign`就是浅拷贝。

```js
let a = {
  age: 1
}
let b = Object.assign({}, a)
a.age = 2
console.log(b.age) // 1
```

2、 `...`也可以实现浅拷贝。

```js
let a = {
  age: 1,
  jobs: {
    first: 'FE'
  }
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

3、 自定义函数

```js
function copy(obj){
    var n = {}
    for(let i in obj){
        n[i] = obj[i]
    }
    return n
}
```

浅拷贝只解决了第一层的问题，如果深层还有对象，则会共享地址。所以在项目中，我一般使用深拷贝。

### 深拷贝

深拷贝就是复制一个与原对象完全不相关的新对象。通常的实现方法有：

1. `JSON.parse(JSON.stringify(obj))`

```js
var a = {x: 1, y: {z: 3}}
var b = JSON.parse(JSON.stringify(a))
a.y.z = 4
b.y.z // 3
```

但是这个方法有一些问题：
- 如果属性值为 undefined 或 symbol，则会被忽略
- 不能序列化函数
- 不能解决循环引用的对象

```js
let a = {
  age: undefined,
  sex: Symbol('male'),
  jobs: function() {},
  name: 'zs'
}
let b = JSON.parse(JSON.stringify(a))
console.log(b) // {name: "zs"}
{name: "zs"}
```

不过对于一般业务代码，这个方法完全够用了。

2. 使用`MessageChannel`

```js
function structuralClone(obj) {
    return new Promise(resolve => {
      const { port1, port2 } = new MessageChannel()
      port2.onmessage = ev => resolve(ev.data)
      port1.postMessage(obj)
    })
  }
  
  var obj = {
    a: 1,
    b: {
      c: 2
    }
  }
  
  obj.b.d = obj.b
  
  // 注意该方法是异步的
  // 可以处理 undefined 和循环引用对象
  const test = async () => {
    const clone = await structuralClone(obj)
    console.log(clone)
  }
  test()
```

3. 自己实现一个简单的深拷贝

```js
function deepClone(obj) {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }

  let isArray = Array.isArray(obj)
  let newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })

  return newObj
}

let obj = {
  a: [1, 2, 3],
  b: {
    c: 2,
    d: 3
  }
}
let newObj = deepClone(obj)
newObj.b.c = 1
console.log(obj.b.c) // 2
```

原型链如何处理、DOM 如何处理

4. lodash 的深拷贝


## 原型和原型链

### 原型

常见的面向对象都是通过类实现的，但 JavaScript 是通过原型来实现的。每个对象都以一个原型对象作为模版，可以继承属性和方法。

![](/img/oop/2.webp)

通过上图可以看出：

1. Foo 构造函数有一个`prototype`属性指向其原型 Foo.prototype，原型有一个`constructor`属性指向 Foo。
2. Foo 构造的实例 new Foo() 的`__proto__`属性指向 Foo 的原型。
3. 所有对象都是 Object 类的实例。所有函数都是 Function 类的实例。
4. `Object.prototype.__proto__`为 null。
5. `Function.prototype.__proto__`为 Object.prototype。
6. 

```js
`函数.__proto__.constructor == Function`
Function instanceof Object

`对象.__proto__.constructor == Object`
Object instanceof Function
```

注：`__proto__`在 ES6 才归为标准属性，它是一个访问器属性(即getter和setter)，可以通过它访问到内部属性`[[prototype]]`。不过建议使用`Object.getPrototypeOf()`。因为`__proto__`可能有兼容问题和性能问题。

原型相关的方法有：

```js
// 获取
Object.getPrototypeOf()
Reflect.getPrototypeOf()

// 设置
Object.setPrototypeOf()
Reflect.setPrototypeOf()

// 创建
Object.create()
```

### 原型链

每个对象拥有一个原型对象，通过`__proto__`指针指向上一个原型 ，并从中继承方法和属性，同时原型对象也可能拥有原型，这样一层一层，最终指向 null。这种关系被称为原型链 (prototype chain)。

```js
function A(){}
let a = new A()

a.__proto__ === A.prototype // true
a.__proto__.__proto__ === Object.prototype  // true
a.__proto__.__proto_.__proto__  // null

a.name  // undefined
```

要注意的是，null 并非原型对象。上面代码显示，`a.name`找到最终的原型对象`a.__proto__.__proto__`(非null)上，发现没有 name 属性，即返回`undefined`。

### Function、Object鸡蛋问题

函数都是 Function 创建的，对象都是 Object 创建的。Function、Object 既是对象，也是函数，它们之间有如下关系：

```js
Object instanceof Function  // true
Function instanceof Object  // true
Object instanceof Object    // true
Function instanceof Function  // true
```

**Object.prototype**

`Object.prototype`是对象的最顶层原型对象。根据 ECMAScript 上[关于Object.prototype的定义](http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.4)。

```
Object.prototype.[[Prototype]] = null
Object.prototype.[[Class]] = Object
Object.prototype.[[Extensible]] = true
```

如果`Object.prototype`是通过 Object 函数创建的，其`[[Prototype]]`属性应该是`Object.prototype`。所以它并不是 Object 函数创建的。实际上，`Object.prototype`是浏览器底层根据 ECMAScript 规范创建的对象。

`Object.prototype`是原型链的顶端(不考虑 null)。所有对象都继承了它的 toString 等属性和方法。

**Function.prototype**

`Function.prototype`是函数实例的最顶层原型对象。根据 ECMAScript 上[关于Function.prototype的定义](http://www.ecma-international.org/ecma-262/5.1/#sec-15.3.4)。

```js
Function.prototype.[[Class]] = Function   // typeof Function.prototype == 'function'
Function.prototype.[[Prototype]] = Object.prototype
Function.prototype.valueOf 实际是继承自 Object.prototype.valueOf


Function.prototype
// ƒ () { [native code] }

Function.prototype.prototype
// undefined

let fun = Function.prototype.bind()
// ƒ () { [native code] }

fun.prototype
// undefined
```

根据上面内容可以发现，并不是所有的函数都有 prototype 属性，函数`Function.prototype`就没有 prototype 属性。

**Object()**

Object 构造函数的`[[Prototype]]`属性值是`Function.prototype`。

```js
Object.__proto__ === Function.prototype  // true
```

**Function()**

```js
Function.[[Class]] = Function
Function.[[Prototype]] = Function.prototype
```

上面代码可以看出，Function 构造函数本身是一个函数类型对象。它的原型指向`Function.prototype`。

```js
typeof Function === 'function'  // true
Function.__proto__ === Function.prototype // true
```

> 面试题：Function 对象是不是 Function 函数的实例？

虽然在 JavaScript 层面上来看，Function 对象确实是 Function 函数的实例。

```js
Function instanceof Function  // true
Function.constructor === Function  // true
```

但是 Function 是一个内置对象，是在C/C++层面处理(具体需要看 V8 源码)，我们写一个函数`function f(){}`时，并没有调用 Function 构造器。所以个人认为它不是 Function 的实例。

```js
let f = Function
Function = function (...args) {
    console.log('调用了Function')  // 没有输出
    return f(...args)
}
function a() {
    console.log(1)
}
a()  // 1
```

上面代码可以看出，写`function a()`并没有调用 Function 构造函数。

**内置类型构建过程**

浏览器自带的 Javascript 内置对象是在 C/C++ 层面实现的，其初始化过程如下：

1. 用 C/C++ 构造内部数据结构创建一个 OP 即 (Object.prototype) 以及初始化其内部属性但不包括行为。
2. 用 C/C++ 构造内部数据结构创建一个 FP 即 (Function.prototype) 以及初始化其内部属性但不包括行为。
3. 将 FP 的 [[Prototype]] 指向 OP。
4. 用 C/C++ 构造内部数据结构创建各种内置引用类型。
5. 将各内置引用类型的[[Prototype]]指向 FP。
6. 将 Function 的 prototype 指向 FP。
7. 将 Object 的 prototype 指向 OP。
8. 用 Function 实例化出 OP，FP，以及 Object 的行为并挂载。
9. 用 Object 实例化出除 Object 以及 Function 的其他内置引用类型的 prototype 属性对象。
10. 用 Function 实例化出除Object 以及 Function 的其他内置引用类型的 prototype 属性对象的行为并挂载。
11. 实例化内置对象 Math 以及 Grobal

至此，所有内置类型构建完成。


## map、filter、reduce

`map`和`filter`返回一个新数组


`reduce`可以挨个处理数组的元素，最终返回一个值。


## 实现call、apply 和 bind

> 面试题：call、apply 及 bind 函数内部实现是怎么样的？

```js
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError(`Error`)
    }
    // 如果 context 是基本类型，需要是对象才能挂载 .fn 属性
    context = typeof context === 'object' ? context || window : Object.create(null)
    // 下面最好用 Symbol，因为如果原对象可能有fn属性，这样会被覆盖掉
    context.fn = this
    var args = [...arguments].slice(1)
    // 谁调用，this 就是谁
    var result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context = typeof context === 'object' ? context || window : Object.create(null)
  context.fn = this
  let result
  // 处理参数和 call 有区别
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}

Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    const args = [...arguments].slice(1)
    context = typeof context === 'object' ? context || window : Object.create(null)
    context.fn = this
    return function () {
        if (new.target) {
            return new context.fn(...args, ...arguments)
        }
        return context.fn(...args, ...arguments)
    }
}
```

要注意 myBind 返回一个函数，可以通过普通方式和 new 调用。


## 面试题

1. bind、call、apply的区别?
1. 介绍下原型链（解决的是继承问题吗）?
1. 深拷贝和浅拷贝?lodash深拷贝实现原理？
1. JS继承方案?平常是怎么做继承?
1. 介绍this是什么，this的各种情况?
1. 怎么实现this对象的深拷贝?
1. 介绍原型？原型链？使用原型最大的好处?
1. 栈和堆具体怎么存储?
1. 栈和堆的区别?
1. `prototype`和`__proto__`区别?
1. `constructor`是什么?
1. new 是怎么实现的?