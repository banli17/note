---
id: oop
title: "javascript 面向对象"
sidebar_label: 面向对象
---

## new

> new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？

调用 new 时，执行的步骤如下：

1. 以构造函数的 prototype 属性为原型，创建新对象。
2. 将 this 和参数传递给构造器执行。
3. 如果构造器返回的是对象，则返回。否则返回第一步创建的对象。

```js
function myNew(constor, ...args) {
    let o = Object.create(null)
    o.__proto__ = constor.prototype
    let res = constor.call(o, ...args)
    return res instanceof Object ? res : o
}
```

## instanceof

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

![](/static/img/oop/3.png)

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

![](/static/img/oop/4.png)

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

![](/static/img/oop/5.png)



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

## 原型

> 面试题：如何理解原型？如何理解原型链？

原型是实现面向对象的一种方式。可以通过原型将对象关联起来。

![](/static/img/oop/2.webp)

通过上图可以看出：

1. Foo 构造函数有一个`prototype`属性指向其原型 Foo.prototype，原型有一个`constructor`属性指向 Foo。
2. Foo 构造的实例 new Foo() 的`__proto__`属性指向 Foo 的原型。
3. 所有对象都是 Object 类的实例。所有函数都是 Function 类的实例。
4. `Object.prototype.__proto__`为 null。
5. `Function.prototype.__proto__` 为 Object.prototype。

注：`__proto__`不是标准属性，这只是浏览器在早期为了让我们访问到内部属性`[[prototype]]`来实现的一个东西。

```js
`函数.__proto__.constructor == Function`
Function instanceof Object

`对象.__proto__.constructor == Object`
Object instanceof Function
```

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


