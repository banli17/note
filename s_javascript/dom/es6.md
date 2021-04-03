---
title: 无名
---

- 引入 js 脚本
- 注释

## JSDoc 注释规范

```
/**
 * @override 对当前代码文件的描述
 * @copyright
 * @author <name> [<emailAddress>] 代码的作者信息
 * @version 当前代码的版本
 */
/**
 * 创建 Hi 实例.
 * @constructor
 * @param {string} name - 姓名.
 * @param {number} age - 年龄.
 * @returns {{name: *, age: *}}
 * @example
 * new Hi('jey', 12)
 */
function Hi(name, age) {
	return {
		name, age
	}
}
```

- http://usejsdoc.org/index.html

变量命名

- 以英文、 \_ 或 \$ 开始

## 流程控制

- if
- 三元运算符
- switch
- while
- do while
- break 跳出循环
- continue 跳出当前循环，继续下一次循环
- for in 遍历对象

# class

class 里的方法都是定义在 prototype 下。所以类的新方法可以这样添加。

```
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

class 已经自动校准了 constructor 属性，不写 constructor 也自动添加了指向。

![](./img/class.constructor.png)

类内部的方法都是不可枚举的。

es5 如 toString 方法可枚举，es6 类内部的 toString 不可枚举。

```
Object.keys(Person.prototype)
```

方法名可以用表达式的形式。

```
var say = 'speak'
class Person {
	toString() {

	}
	[say]() {

	}
}
```

类和模块的内部，默认就是严格模式，所以不需要使用 use strict 指定运行模式。

class 和构造函数的区别？

1. class 的原型自动会添加 constructor 指向 class。
2. class 声明不会提前。
3. class 里的方法都不能枚举。

严格模式和非严格模式的区别。

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

constructor 方法默认返回实例对象（即 this），完全可以指定返回另外一个对象。

```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。

```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

`__proto__` 可以使用 `Object.getPrototypeOf()` 来替代。

Class 表达式

```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是 MyClass 而不是 Me，Me 只在 Class 的内部代码可用，指代当前类。

采用 Class 表达式，可以写出立即执行的 Class。

```
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"
```

类不存在变量提升。

私有方法的三种方法。

1. 命名上通过下划线的方式。但是这种方法不保险。在类的外部，还是可以调用到这个方法。
2. 索性将私有方法移出模块，因为模块内部的所有方法都是对外可见的。

```
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```

上面代码中，foo 是公有方法，内部调用了 bar.call(this, baz)。这使得 bar 实际上成为了当前模块的私有方法。

3. 利用 Symbol 值的唯一性，将私有方法的名字命名为一个 Symbol 值。

```
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

上面代码中，bar 和 snaf 都是 Symbol 值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。无法访问对象的 Symbol 属性。

私有属性：es6 不支持，目前有个提案，是在通过`#name`的方式。

this 指向问题

Class 的 getter 和 setter，可以做拦截。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

```
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

上面代码中，存值函数和取值函数是定义在 html 属性的描述对象上面，这与 ES5 完全一致。

Class 的 Generator 方法
如果某个方法之前加上星号（\*），就表示该方法是一个 Generator 函数。

```
class Foo {
  constructor(...args) {
    this.args = args;
  }
  * [Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg;
    }
  }
}

for (let x of new Foo('hello', 'world')) {
  console.log(x);
}
// hello
// world
```

上面代码中，Foo 类的 Symbol.iterator 方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator 方法返回一个 Foo 类的默认遍历器，for...of 循环会自动调用这个遍历器。

静态方法使用 static，这样就直接使用类调用，不会被实例继承。如果方法里包含 this，则 this 指向类，而不是实例。

父类的静态方法可以被子类继承。静态方法也是可以从 super 上调用的。

静态属性的写法

```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

目前，只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

```
// 以下两种写法都无效
class Foo {
  // 写法一
  prop: 2

  // 写法二
  static prop: 2
}

Foo.prop // undefined
```

`new.target`属性一般用于构造函数当中，返回 new 命令作用于的那个构造函数。如果构造函数不是 new 调用的，则返回 undefined。

以前是通过 `this.constructor == Person`这样判断，现在直接

```
function Person(name) {
  if (new.target !== undefined) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

// 另一种写法
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

var person = new Person('张三'); // 正确
var notAPerson = Person.call(person, '张三');  // 报错
```

需要注意的是，子类继承父类时，new.target 会返回子类。利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。

一个类继承多个类的写法。

```
var calculatorMixin = Base => class extends Base {
	calc() {
	}
};

var randomizerMixin = Base => class extends Base {
	randomize() {
	}
};

class Foo {
}
class Bar extends calculatorMixin(randomizerMixin(Foo)) {
}

console.dir(new Bar)
```

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错。这是因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法，子类就得不到 this 对象。

extend 实际上是下面 2 句。

```
Child.__proto__ = Parent
Child.prototype.__proto__ = Parent.prototype

// 原理
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 的实例继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();



// setPrototypeOf
Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```

所以`new Child()`的`__proto__`就是`new Parent()`。

可以使用 Object.getPrototypeOf() 获取子类上的父类。

```
Object.getPrototypeOf(Child) === Parent
```

super 的作用

1. super 代表父类的构造函数，但是返回子类 B 的实例，即 super 内部的 this 是 B。相当于

```
A.prototype.constructor.call(this)
```

2. super 作为对象使用，在普通方法中，表示父类的原型对象(父类的方法都是挂在原型对象下)，所以方法可以调用，而属性不能使用。在静态方法中，指向父类。

```
class A {
	p() {
		return 2;
	}

	static say() {
		console.log(A.say)
	}
}

class B extends A {
	constructor() {
		super();

		console.log(super.p()); // 2
	}

	static say() {
		console.log(super.say)  //
	}
}

let b = new B();

console.log(B.say)
```

ES6 规定，通过 super 调用父类的方法时，方法内部的 this 指向子类。

```
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

由于 this 指向子类，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性。

super 在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

注意，使用 super 的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

```
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
    console.log(super.valueOf() instanceof B); // true
  }
}
```

上面代码中，super.valueOf()表明 super 是一个对象，因此就不会报错。同时，由于 super 使得 this 指向 B，所以 super.valueOf()返回的是一个 B 的实例。

最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用 super 关键字。

```
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

extend 的继承目标

```
// 1.子类继承Object类
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true

// 2.不存在任何继承
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true

// 3.子类继承null
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true

// 3实际是
class C extends null {
  constructor() { return Object.create(null); }
}
```

## 原生构造函数的继承

原生构造函数是指语言内置的构造函数，通常用来生成数据结构。ECMAScript 的原生构造函数大致有下面这些。

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个 Array 的子类。

```
function MyArray() {
  Array.apply(this, arguments);
}

MyArray.prototype = Object.create(Array.prototype, {
  constructor: {
    value: MyArray,
    writable: true,
    configurable: true,
    enumerable: true
  }
});
```

上面代码定义了一个继承 Array 的 MyArray 类。但是，这个类的行为与 Array 完全不一致。

```
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过 Array.apply()或者分配给原型对象都不行。原生构造函数会忽略 apply 方法传入的 this，也就是说，原生构造函数的 this 无法绑定，导致拿不到内部属性。

ES5 是先新建子类的实例对象 this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array 构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新 length 属性，这个内部属性无法在子类获取，导致子类的 length 属性行为不正常。

下面的例子中，我们想让一个普通对象继承 Error 对象。

```
var e = {};

Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []
```

上面代码中，我们想通过 Error.call(e)这种写法，让普通对象 e 具有 Error 对象的实例属性。但是，Error.call()完全忽略传入的第一个参数，而是返回一个新对象，e 本身没有任何变化。这证明了 Error.call(e)这种写法，无法继承原生构造函数。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 this，然后再用子类的构造函数修饰 this，使得父类的所有行为都可以继承。下面是一个继承 Array 的例子。

```
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```

注意，继承 Object 的子类，有一个行为差异。

```
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false
```

上面代码中，NewObj 继承了 Object，但是无法通过 super 方法向父类 Object 传参。这是因为 ES6 改变了 Object 构造函数的行为，一旦发现 Object 方法不是通过 new Object()这种形式调用，ES6 规定 Object 构造函数会忽略参数。

## Mixin 模式的实现

Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。

```
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```

下面是一个更完备的实现，将多个类的接口“混入”（mix in）另一个类。

```
function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```

上面代码的 mix 函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```

# js 相等性判断

在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false ); 而 Object.is 的行为方式与三等号相同，但是对于 NaN 和-0 和+0 进行特殊处理，所以最后两个不相同，而 Object.is（NaN，NaN）将为 true。(通常使用双等号或三等号将 NaN 与 NaN 进行比较，结果为 false。

## 严格相等 ===

全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。

```
// 特殊
+0 === -0  // true
```

## 非严格相等 ==

类型不一致的时候会进行隐式类型转换。规则如下：

- `Null` 和 `Undefined` 和其它类型比较都是`false`，注意有些特殊对象有时是`undefined`，比如`document.all`
- 基本类型会转成`Number`进行比较
- `Object`和原始值比较时，会首先调用`toString()`或`valueOf()`转成原始值。
- 如果类型一致，则直接比较，注意对象是比较的引用。

<img src="http://www.w3croad.com/images/20170906/8.jpg">

## 同值相等 Object.is()

`Object.is()`和`===`的区别如下是`Object.is()`对`NaN与NaN`和`+0与-0`的比较做了特殊处理。尽量不要使用，除非要处理`0`或`NaN`。

```
+0 === -0  // true

Object.is(NaN, 0/0) // true
Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
```

<img src="http://www.w3croad.com/images/20170923/5.jpg">

## 参考

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
- http://dorey.github.io/JavaScript-Equality-Table/

# Proxy

`Proxy`的意思是`代理`，就是在对对象访问时设置一层拦截，我们可以在这层拦截中做一些事情，这些事情包括：

- get(target, key, receiver)：拦截对象读取操作，比如 obj.x 和 obj['x']
- set(target, key, value, receiver)：拦截对象属性的设置，比如 obj.x = 'x' 或 obj['x'] = 'x'
- has(target, key)：拦截 `x in obj`操作
- deleteProperty(target, key)：拦截 delete obj[key] 操作
- ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, key)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, key, desc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)。

## Proxy.revocable()

`Proxy.revocable()`返回一个可取消的 Proxy 实例。

```
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

## this 问题

Proxy 代理的情况下，目标对象内部的 this 关键字会指向 Proxy 代理。

```
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
```

# 语法

## block

块语句`{}`用来组织多条语句。在块语句里，使用`var`声明的变量也是全局的，`let`和`const` 定义的变量是有块级作用域的。

```
{
    statement_1;
    statement_2;
    ...
    statement_n;
}
```

## 错误处理机制

### Error 对象

`Error`对象有三个属性：

- message: 错误提示信息
- name: 错误名称(非标准)
- stack: 错误的堆栈(非标准)

继承自`Error`的函数有：

- SyntaxError: 解析代码时语法错误
- ReferenceError: 引用不存在变量时，或给不能复制的对象(this)或函数运行结果赋值
- RangeError: 值超出有效范围，如数组长度是负数，数值超出范围，以及函数堆栈超过最大值
- TypeError: 变量或参数不是预期类型，或调用对象不存在方法
- URIError: 与 url 相关函数的参数不正确时抛出
- EvalError: eval()没有被正确执行时抛出，es5 后不会出现

### 自定义错误

```
function UserError(message) {
   this.message = message || "默认信息";
   this.name = "UserError";
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
```

### try...catch...finally

主要说明语句的执行顺序。

```
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到finally代码块结束再执行
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会覆盖掉前面那句return
    console.log(4); // 不会运行
  }

  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```

上面代码中，catch 代码块结束执行之前，会先执行 finally 代码块。从 catch 转入 finally 的标志，不仅有 return 语句，还有 throw 语句。

```
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```

上面代码中，进入 catch 代码块之后，一遇到 throw 语句，就会去执行 finally 代码块，其中有 return false 语句，因此就直接返回了，不再会回去执行 catch 代码块剩下的部分了。

# 数据类型

## 简介

js 中的数据类型分为基本数据类型和引用数据类型，基本数据类型有：Number、String、Boolean、Null、Undefined。引用数据类型有 Object。

可以用 typeof 操作符来判断数据类型。

```
'number'
'string'
'boolean'
'undefined'

'object'
'function'
```

## 数值类型

数值分为整数和浮点数，整数可以通过十进制、八进制、十六进制来表示，默认是十进制。

```
// 十进制
var a = 10;
var b = 0;
var c = -1;

// 八进制：以0开头，数字在0-7之间，如果是无效八进制，则取10进制。
var a = 070; // -> 10进制的 7*8 + 0*8 = 56
var b = 079; // 无效8进制，为10进制的79
var c = 08;  // 无效8进制，为10进制的8

// 十六进制：以0x开头，数字在0-9之间，字符在A-F之间
var a = 0xA;  // -> 10
var b = 0x1f; // 1*16 + 15 -> 31
```

在进行数值计算时，8 进制和 16 进制的数都会转成 10 进制。

浮点数占据的内存空间是整数的 2 倍，如果小数点后面只有 0 或没有数字，为了节省空间，该小数会被抓换成整数。

```
var a = 5.0;  // -> 5
var b = 5.;   // -> 5
```

进行算数运算时，浮点数不如整数精准，所以一般不用浮点数计算。

```
var a = 0.1;
var b = 0.2;

a + b == 0.3   // false
a + b == 0.30000000000000004  // true
```

**e 表示法**

```
var a = 3.2e7;  // 3.2*10(7次幂)
var a = 3.2e-7;  // 3.2*10(-7次幂)
```

NaN 是一个特殊的值，它表示一个本来要返回的一个数值的操作数，但是没有返回数值的情况。

- NaN 进行任何操作都是 NaN
- NaN 和任何值都不相等，包括自己。

可以用 isNaN() 来检查一个值是不是 NaN。isNaN() 为 true 必须是这个参数是一个数值类型。isNaN 会进行数据转换，将参数转成数值类型。

```
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false
console.log(isNaN("10")); // false，可以被转成数值 10
console.log(isNaN("blue")); // true
console.log(isNaN(true)); // false，可以被转成数值 1
```

**Number 和 String 类型转换**

`js` 中有三个函数可以将数据转为数值类型，`Number()`、`parseInt()` 和 `parseFloat()`。

`Number()`: 可以转任何类型数据为数值，规则如下：

- boolean 值，true 转成 1, false 转成 0
- 数字只是简单的传入和返回
- `null` -> `0`
- `undefined` -> `NaN`
- 如果是字符串，则遵循下面规则： - 字符串中包含数字，则转成 10 进制数值，前导 0 会被忽略。'123' -> 123，'011' -> 11 - 字符串包含有效浮点数，则转成浮点数值，前导 0 会被忽略。 - ''或' ' -> 0 - 字符串包含非上述字符，转成 NaN
- 对象 会通过 `valueOf()` 转换，如果结果是 `NaN`，再调用 `toString()` 方法。

```
// 转换规则比较复杂，可详细参考下面的资料
var numN1 = Number("Hello world!");  // NaN
var numN2 = Number(" ");  // 0 空字符串转为0
var numN3 = Numberl("000011");  // 11
var numN4 = Number(true);  // 1
```

由于 `Number()` 函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是 `parseInt()` 函数。

`parseInt()` 转换规则是从左到右，查看字符串里的非空字符，如果第一位是不是数字或负号-，则返回 `NaN`。一直到非数字为止。比如`'123xx' -> 123`。`'12.3' -> 12`，因为小数点不是有效的数字。对象会隐式调用 `toString()` 方法转成字符串再进行转换。

注意，对于 8 进制和 16 进制，不同浏览器解析可能不一致，所以要统一标志第二个参数：数值的基数。如果标志了数值进制，16 进制数的 0x 就可以不写。

将整数转成特定基数的字符串的方法：`intValue.toString(radix)`，比如 `var a = 12; a.toString(2)` -> `'1100'`。

```
var numI1 = parseInt(22.5);   // 22
var numI2 = parselnt ("1234blue") ;  // 1234
var numI3 = parselnt (" ") ;   // NaN
var numI4 = parselnt("70");  //70（十进制数）
var numI5 = parselnt ("070") ;  // 56（八进制数）我的chrome是 70
var numI6 = parselnt ("0xA") ;  // 10（十六进制数）
```

`parseFloat()` 和 `parseInt()` 类似，区别如下：

- 第一个小数点对它也是有效的。
- 如果字符串后面的小数点全是 0，或没有小数点，它会返回整数。
- `parseFloat()` 没有第二个参数，它将数都当做 10 进制对待，比如`'0x1'` -> 0，而数字`0x1` -> 1。

```
var numF1 = parseFloat ("1234blue") ;  // 1234（整数）
var numF2 = parseFloat("0xA");   // 0
var numF3 = parseFloat("22.5");  // 22.5
var numF4 = parseFloat("22.34.5");  // 22.34
var numF5 = parseFloat("0908.5");   // 908.5
var numF6 = parseFloat("3.125e7");   // 31250000
parseFloat(Math.Infinite) // NaN
```

## 数值范围

js 里的最大数值是 `5*10e-324`( `Number.Min_VALUE` )，最小数是 `1.79 * 10e308` ( `Number.MAX_VALUE` )。超过最大值会自动变成 `Infinity`，可以使用 `Number.isFinite()` 来判断一个数是否有限。

```
Number.isFinite(Number.MAX_VALUE) // true
Number.MAX_SAFE_INTEGER   最大安全整数,2e53-1
```

## 数学函数 Math

```
Math.PI		 	3.14
Math.SQRT1_2    0.707
Math.SQRT2      1.414

Math.round()   // 四舍五入
Math.random()  // 生成一个[0, 1)之间的随机浮点数，小数点后保留16位
Math.ceil()
Math.floor()
Math.sqrt()    // 取平方
Math.pow(x, y) // x的y次幂
Math.abs()
Math.max()
Math.min()
Math.sign()    // 判断一个数的正负，1是正，-1是负
```

-> 需要注意的是三角函数（`sin()`, `cos()`, `tan()`, `asin()`, `acos()`, `atan()`, `atan2()`）是以弧度返回值的。可以通过除法（Math.PI / 180）把弧度转换为角度。比如 `tan(45°)` -> `tan(Math.PI/4)`

哪些情况下会产生 NaN。

- 0/0 分子和分母都是 0
-

# Array

`Array` 方法比较多，而且使用频繁。必须全部背下来。

![](./img/array.png)

## push()、 pop()、 shift()、 unshift()

这四个方法很常用，主要用于向数组的前后添加或删除一项。会改变原数组。

- `push()`：返回 `push()` 后新数组的长度。
- `pop()`：返回被移除的一项
- `shift()`：返回被移除的一项
- `unshift()`：返回 `unshift()` 后新数组的长度。

```
var a = [1, 2, 3, 4]
a.push() // 数组不变
a.push(5, 6, 7)  // 返回长度7，a = [1,2,3,4,5,6,7]

a.unshift('a', 'b', 'c')  // a = ['a,','b','c',1,2...]
```

## concat()

`concat()` 用于将其它数组与原数组合并，不会改变原数组，返回一个新数组。`concat()` 的参数可以是任意数据形式。

```
var a = [1]
a.concat()        // [1]
a.concat(2, {}, null)   // [1, 2, {}, null]
var b = ['e']
var c = ['d']
a.concat(b, c)   // [1, 'e', 'd']
```

`concat()` 会将原数组的项和新项目(新数组的项目，或直接项目)合并后，返回新数组。

## copyWithin()

## entries()

## find()、findIndex()、indexOf()、 lastIndexOf()、 includes()

## join()

`join()` 用于数组的元素拼接成字符串，默认用逗号拼接。

```
var a = ['a', 'b', 'c'];
a.join()     // 'a,b,c'
a.join('-')  // 'a-b-c'
```

## keys()

## forEach()、 map()、 every()、 filter()、 fill()、 some()

`forEach()`, `map()` 都可以对数组进行遍历。区别是前者没有返回值，后者会将每个元素处理后返回一个新数组。

```
var a = [1, 2]
a.forEach(function(){})  // undefined
a.map(function(){})      // 返回值：[undefined, undefined]
```

`every()` 如果所有元素都满足要求，则返回 true，否则返回 false
`some()` 如果有元素满足要求，则返回 true，否则返回 false
`filter()` 用于过滤元素

`fill()` 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。

```
// 语法
arr.fill(value [, start, end])  要填充的元素是 [start, end)

// 实例
var a = [1, 2, 3, 4]

var b = a.fill('a', 1, 2)
console.log(a, b)    // [1, "a", 3, 4]  [1, "a", 3, 4]

a.fill('a', 1, 1)   // [1, 2, 3, 4]
a.fill('a', 1, -2)  // [1, 'a', 3, 4]
```

- 如果 end 是负数，则从倒数开始计数，如果 start 和 - end 是同一个元素 ，则 start 会被填充，如果 start，end 交集为空，则没有元素选中
- 如果 start 是负数，则从倒数开始计数，如果 start、end 都是负数，则没有元素被填充
- 如果 start 是正数，start == end，则没有元素被填充
- 关于 undefined、null、NaN
  - null,null/NaN 没有元素选中
  - null,undefined 都被选中
  - NaN,undefined 都被选中
  - NaN,null/NaN 没有选中
  - undefined,undefined 都选中
  - undefined,null/NaN 没有选中

## reduce()、 reduceRight()

`reduce()` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。

```
// 语法 arr.reduce(function(accumulator, currentValue, currentIndex, array){}, initialValue)
```

- `callback` 的四个参数：
  - `accumulator`：累加器累加回调的返回值，它是上一次调用回调时返回的累积值，或`initialValue`
  - `currentValue`：数组中正在处理的元素
  - `currentIndex`：数组中正在处理的当前元素的索引，如果提供了 `initialValue`，则索引号为 0，否则为 1。
  - `array`：调用 `reduce` 的数组
- `initialValue`：可以提供一个初始值，默认是数组第一个元素。

```

// 例子
var a = [7, 2, 3, 4, 5]
var b = a.reduce(function(accumulator, currentValue, currentIndex, array){
    console.log('第几次遍历' + currentIndex )
    console.log(accumulator, currentValue, currentIndex, array)

    return now
})
console.log('b', b)
```

![](img/reduce.png)

`reduce()` 会遍历数组，回调函数的返回值会成为下次遍历的第一个参数 now。`initialValue` 默认是数组的第一个元素。在没有初始值的空数组[]上调用 reduce 会报错。

```
[].reduce(function(){}, 1)  // 1

var total = [0, 1, 2, 3].reduce(function(sum, value) {
  return sum + value;
}, 0);
// total = 6

var flattened = [[0, 1], [2, 3], [4, 5]].reduce(function(a, b) {
  return a.concat(b);
}, []);
// flattened is [0, 1, 2, 3, 4, 5]
```

对数组求和的另外一个方法：`eval(a.join('+'))`

## reverse()

将数组反转顺序。

## slice()

返回一个从开始到结束(不包括结束)选择的数组的一部分浅拷贝到一个新数组对象。不改变原数组。

```
// 语法
slice(start, end)
```

- start 为负数，则是倒数第几个元素到末尾
- end 如果是负数，则是 start 到 end，如果 end 大于数组长度，则会一直到数组末尾。

**将类数组转为数组**

```
[].slice.call(arguments)

// 或者
var slice = Function.prototype.call.bind(Array.prototype.slice)
slice(arguments)
```

## sort()

对数组进行排序。

## splice()

## toLocaleString()

## toString()

# Math 对象

## 对象属性

```
Math.E   算数常量，自然对数的底数(约等于2.718)
Math.LN2   loge2 = 0.693
Math.LN10  loge10 = 2.302
Math.LOG2E   返回以 2 为底的 e 的对数（约等于 1.414）。
Math.LOG10E	返回以 10 为底的 e 的对数（约等于0.434）。
Math.PI     返回圆周率（约等于3.14159）。
Math.SQRT1_2  返回返回 2 的平方根的倒数（约等于 0.707）。
Math.SQRT2   返回 2 的平方根（约等于 1.414）。
```

## 对象方法

**常用**

- abs(x)： 返回绝对值
- ceil(x)：向上取整
- floor(x)：向下取整
- max(x, y)：返回 x 和 y 中的最高值
- min(x, y)：返回 x 和 y 中的最小值
- pow(x, y)：返回 x 的 y 次幂
- random()：返回[0, 1)之间的随机数
- round(x)：四舍五入
- sqrt(x)：返回数的平方根
- toSource()：返回该对象的源代码，网上有误，测试是 undefined
- valueOf()：返回 Math 对象的原始值

**数学中**

- acos(x)：返回数的反余弦值。
- asin(x)：返回数的反正弦值。
- atan(x)：以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
- atan2(y, x)：返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
- sin(x)：返回数的正弦
- cos(x)：返回数的余弦
- tan(x)：返回角的正切
- exp(x)：返回 e 的指数
- log(x)：返回数的自然对数，以 e 为底

## 应用

1. 获取 1-10 之间的随机整数，包括 1 和 10

```
Math.floor(Math.random()*10+1)
```

2. 获取数组中的最小数

```
var a = [1, 4, 6, 10, 0, 7]
var min = Math.min.apply(null, a)
```

通过 apply 借用 Math 的 min 方法进行获取最小值。

3. 常用的还有向上取整、向下取整、四舍五入。

## Object 的方法和属性

### Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。

Object.getOwnPropertyNames()

包括不可枚举的，但是不包含 Symbol

# es6

## let 和 const

看下面一段代码运行 getClothing(false) 后的输出是什么？

```
function getClothing(isCold) {
  if (isCold) {
    var freezing = 'Grab a jacket!';
  } else {
    var hot = 'It's a shorts kind of day.';
    console.log(freezing);
  }
}
```

输出是 undefined，是不是很奇怪？因为浏览器解析 JavaScript 时，进行了变量提升。在执行任何 JavaScript 代码之前，所有变量都会被“提升”，也就是提升到函数作用域的顶部。

使用 let 和 const 声明的变量解决了这种提升问题，因为它们的作用域是到块，而不是函数。之前，当你使用 var 时，变量要么为全局作用域，要么为本地作用域，也就是整个函数作用域。

如果在代码块（用花括号 { } 表示）中使用 let 或 const 声明变量，那么该变量会陷入暂时性死区，直到该变量的声明被处理。这种行为会阻止变量被访问，除非它们被声明了。

let 和 const 还有一些其他有趣特性。

- 使用 let 声明的变量可以重新赋值，但是不能在同一作用域内重新声明。
- 使用 const 声明的变量必须赋初始值，但是不能在同一作用域内重新声明，也无法重新赋值。

最大的问题是何时应该使用 let 和 const？一般法则如下：

当你打算为变量重新赋值时，使用 let，以及
当你不打算为变量重新赋值时，使用 const。
因为 const 是声明变量最严格的方式，我们建议始终使用 const 声明变量，因为这样代码更容易读懂，你知道标识符在程序的整个生命周期内都不会改变。如果你发现你需要更新变量或更改变量，则回去将其从 const 切换成 let。

还有必要使用 var 吗？没有了。

## 模板字面量

```
const i = {name:'zs'};
const a = `hello
    world ${i.name}`;
a.indexOf('\n')  // 5
a.includes('\n') // true
```

模板字面量将换行符也当做字符处理了。模板字面量中的嵌入式表达式不仅仅可以用来引用变量。你可以在嵌入式表达式中进行运算、调用函数和使用循环！

```
a = `${1+2}`   // 3
```

## 解构

解构数组中的值
解构对象中的值

```
const point = [10, 25, -34];
const [x, y, z] = point;
console.log(x, y, z);  // 10 25 -34

const [x, , z] = point; //忽略了 y 坐标
```

## 对象字面量简写法

简写属性和方法名称。

```
let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```

## 迭代

迭代就是依次访问一个对象。比如循环时定义的 i，就是迭代器，它一个接一个的访问对象的每一项。

for...of 循环结合了 for 和 for...in 循环的优势。可以循环任何可迭代类型的数据，默认情况下，包括 String、Array、Map、Set,不包括 Object。默认情况下，对象不可迭代。

for 循环的最大缺点是需要跟踪计数器和退出条件。

在此示例中，我们使用变量 i 作为计数器来跟踪循环并访问数组中的值。我们还使用 digits.length 来判断循环的退出条件。如果只看一眼这段代码，有时候会比较困惑，尤其是对于初学者而言。

虽然 for 循环在循环数组时的确具有优势，但是某些数据结构不是数组，因此并非始终适合使用 loop 循环。

for...in 循环改善了 for 循环的不足之处，它消除了计数器逻辑和退出条件。

但是依然需要使用 key 来访问数组的值，这样很麻烦；几乎比之前更让人迷惑。此外，当你需要向数组中添加额外的方法（或另一个对象）时，for...in 循环会带来很大的麻烦。因为 for...in 循环循环访问所有可枚举的属性，意味着如果向数组的原型中添加任何其他属性，这些属性也会出现在循环中。

但是等等，还有更多优势！for...of 循环还具有其他优势，解决了 for 和 for...in 循环的不足之处。

你可以随时停止或退出 for...of 循环。

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
```

不用担心向对象中添加新的属性。for...of 循环将只循环访问对象中的值。

## 展开运算符

展开运算符（用三个连续的点 ( ... ) 表示）是 ES6 中的新概念，使你能够将字面量对象展开为多个元素。

使用 concat 方法结合数组麻烦了，如果有简写方法，会不会更好？

如果你可以使用展开运算符将数组展开为多个元素，那么肯定有一种方式将多个元素绑定到一个数组中吧？

实际上，的确有！叫做剩余参数，它是 ES6 中新加的另一个运算符。

剩余参数也用三个连续的点 ( ... ) 表示，使你能够将不定数量的元素表示为数组。它在多种情形下都比较有用。

```
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
// Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]
```

- 可变参数函数

```
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}
```

上面 nums 是个[]，没有参数，就是个空数组。

## 函数的变化

箭头函数，单条语句不需要 return

普通函数可以是函数声明或函数表达式，但是箭头函数始终是表达式。实际上，它们的全称是“箭头函数表达式”，因此仅在表达式有效时才能使用，包括：

- 存储在变量中，const greet = name => `Hello ${name}!`;
- 当做参数传递给函数，
- 存储在对象的属性中。

name => `Hello ${name}!`
如果你还记得，参数列表出现在箭头函数的箭头（即 =>）前面。如果列表中只有一个参数，那么可以像上述示例那样编写代码。但是，如果列表中有两个或多个参数，或者有零个，则需要将参数列表放在圆括号内：const sayHi = () => console.log('Hello Udacity Student!');

简写主体语法和常规主体语法

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
name => name.toUpperCase()
);
这种函数主体形式称为"简写主体语法"。简写语法：

在函数主体周围没有花括号
自动返回表达式。
如果箭头函数的主体内需要多行代码，则可以使用"常规主体语法"。

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
name = name.toUpperCase();
return `${name} has ${name.length} characters in their name`;
});
对于常规主体语法需要记住的重要事项：

它将函数主体放在花括号内
需要使用 return 语句来返回内容。

this 关键字的价值完全取决于它的函数（或方法）是如何被调用的。this 可以是以下任何内容：

- 如果函数使用 new 被调用,this 的值是新创建的对象
- 如果函数使用 call/apply 被调用，第一个参数明确设定 this 指代的是什么
- 如果函数是对象方法，this 的值将指代这个对象
- 如果函数被调用时没有上下文，this 将是全局对象或严格模式下是 undefined

[You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)

对于普通函数，this 的值基于函数如何被调用。对于箭头函数，this 的值基于函数周围的上下文。换句话说，箭头函数内的，this 的值与函数外面的 this 的值一样。
（undefined + 1 结果为 NaN

默认函数参数

```
function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';

  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```

greet() 函数中混乱的前两行的作用是什么？它们的作用是当所需的参数未提供时，为函数提供默认的值。但是看起来很难看……

幸运的是，ES6 引入了一个新的方式来创建默认值。它叫做默认函数参数。

```
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}
```

默认值和解构数组

你可以将默认函数参数和解构结合到一起， 创建非常强大的函数！

```
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
```

但是存在一个问题，下面的代码将不可行：

```
createGrid(); // Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined

```

出现错误，因为 createGrid() 预期传入的是数组，然后对其进行解构。因为函数被调用时没有传入数组，所以出现问题。但是，我们可以使用默认的函数参数！

```
function createGrid([width = 5, height = 5] = []) {
  return `Generating a grid of ${width} by ${height}`;
}
```

默认值和解构对象

就像使用数组默认值解构数组一样，函数可以让对象成为一个默认参数，并使用对象解构：

```
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
```

默认函数参数只是个简单的添加内容，但是却带来很多便利！与数组默认值相比，对象默认值具备的一个优势是能够处理跳过的选项。看看下面的代码：

function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
在 createSundae() 函数使用对象默认值进行解构时，如果你想使用 scoops 的默认值，但是更改 toppings，那么只需使用 toppings 传入一个对象：

createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
将上述示例与使用数组默认值进行解构的同一函数相对比。

function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
对于这个函数，如果想使用 scoops 的默认数量，但是更改 toppings，则必须以这种奇怪的方式调用你的函数：

createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
因为数组是基于位置的，我们需要传入 undefined 以跳过第一个参数（并使用默认值）来到达第二个参数。

除非你有很充足的理由来使用数组默认值进行数组解构，否则建议使用对象默认值进行对象解构！

类

将函数转换为类
es6 的类是 es5 构造函数的语法糖，实际是将构造函数里的属性定义在了 construct 中，在 new 的时候自动执行，原型上的方法定义在了类中。

```
class Plane{}
typeof Plane  // function
```

在类中，不用逗号来区分属性或方法。如果添加逗号，将出现 SyntaxError：unexpected token

静态方法，在方法前加 static 关键字

```
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

Plane.badWeather([plane1, plane2, plane3]);
```

类的优势

- 写法简单了
- 更加清晰
- 更加聚合

extends 用来继承类，

super 不能单独访问，否则报错。它在构造函数里需要以函数调用，super()，继承构造函数。如果一个类有构造函数同时使用了 extends，必须要调用 super。在方法里，它当做对象调用，比如 super.say()。super 的作用：

1. super()是在实例化父类
2. super 是那个实例

super 必须在 this 之前被调用，否则报错

```
class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy);
  }
}

```

使用类时需要注意的事项

- class 不是魔术: 关键字 class 带来了其它基于类的语言中的很多思想观念。它没有像变魔术一样向 JavaScript 类添加了此功能。
- class 是原型继承的抽象形式:我们已经多次提到，JavaScript 类实际上使用的就是原型继承。
- 使用类需要用到 new: 在创建 JavaScript 类的新实例时，必须使用关键字 new，否则报错 Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'

## Symbol

Symbol 是一种独特的且不可变的数据类型，经常用来标识对象属性。

要创建 Symbol，输入 Symbol()，并添加一个可选的字符串作为其描述。

```
const sym1 = Symbol('apple');
console.log(sym1);
```

它将创建唯一的标识符，并将其存储在 sym1 中。描述 "apple" 只是用来描述标识符的一种方式，但是不能用来访问标识符本身。

```
const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3); // false
```

当然，依然很难弄明白，所以，我们来看一个之前视频中的示例，看看标识符的作用。下面是代表该示例中的 bowl（碗）的代码。

const bowl = {
'apple': { color: 'red', weight: 136.078 },
'banana': { color: 'yellow', weight: 183.15 },
'orange': { color: 'orange', weight: 170.097 }
};
碗中包含水果，它们是 bowl 的属性对象。但是，当我们添加第二个香蕉时，遇到了问题。

const bowl = {
'apple': { color: 'red', weight: 136.078 },
'banana': { color: 'yellow', weight: 183.151 },
'orange': { color: 'orange', weight: 170.097 },
'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
Object {apple: Object, banana: Object, orange: Object}

新添加的香蕉将上一个香蕉覆盖了。为了解决该问题，我们可以使用标识符。

const bowl = {
[Symbol('apple')]: { color: 'red', weight: 136.078 },
[Symbol('banana')]: { color: 'yellow', weight: 183.15 },
[Symbol('orange')]: { color: 'orange', weight: 170.097 },
[Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}

通过更改 bowl 的属性并使用标识符，每个属性都是唯一的标识符，第一个香蕉不会被第二个香蕉覆盖。

Symbol 不能被 for...in 循环到。

用处不了解。

## 迭代器协议和可迭代协议

可迭代协议用来定义和自定义对象的迭代行为。也就是说在 ES6 中，你可以灵活地指定循环访问对象中的值的方式。对于某些对象，它们已经内置了这一行为。例如，字符串和数组就是内置可迭代类型的例子。

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}
```

任何可迭代的对象都可以使用新的 for...of 循环。Set（集合）和 Map（映射），它们也是内置可迭代类型。

为了使对象可迭代，它必须实现可迭代接口。接口其实就是为了让对象可迭代，它必须包含默认的迭代器方法。该方法将定义对象如何被迭代。

迭代器方法（可通过常量 [Symbol.iterator] 获得）是一个无参数的函数，返回的是迭代器对象。迭代器对象是遵守迭代器协议的对象。

迭代器协议用来定义对象生成一系列值的标准方式。实际上就是现在有了定义对象如何迭代的流程。通过执行 .next() 方法来完成这一流程。

工作原理
当对象执行 .next() 方法时，就变成了迭代器。.next() 方法是无参数函数，返回具有两个属性的对象：

value：表示对象内值序列的下个值的数据
done：表示迭代器是否已循环访问完值序列的布尔值
如果 done 为 true，则迭代器已到达值序列的末尾处。
如果 done 为 false，则迭代器能够生成值序列中的另一个值。

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```

## Set 和 Map

### 数学意义上的集合（Set）

回忆下之前的数学知识，Set 就是唯一项的集合。例如，{2, 4, 5, 6} 是 Set，因为每个数字都是唯一的，只出现一次。但是，{1, 1, 2, 4} 不是 Set，因为它包含重复的项目（1 出现了两次！）。

在 JavaScript 中，我们已经可以使用数组表示类似于数学意义上的集合。但是，数组并不要求项目必须唯一。
在 ES6 中，有一个新的内置对象的行为和数学意义上的集合相同，使用起来类似于数组。这个新对象就叫做“Set”。Set 与数组之间的最大区别是：

- Set 不基于索引，不能根据集合中的条目在集合中的位置引用这些条目
- Set 中的条目不能单独被访问

基本上，Set 是让你可以存储唯一条目的对象。你可以向 Set 中添加条目，删除条目，并循环访问 Set。这些条目可以是原始值或对象。

```
const games = new Set();  // 此代码会创建空的 Set
```

如果你想根据值列表创建 Set，则使用数组：

```
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
// Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}
```

注意上述示例在创建 Set 时，会自动移除重复的条目 "Super Mario Bros."，很整洁！

操作 Set

```
games.add('Banjo-Tooie');  // 返回Set对象
games.add('Age of Empires');
games.delete('Super Mario Bros.');  // true
games.clear()
```

创建 Set 后，你可能想要添加或删除条目。如何操作呢？可以使用名称对应的 .add() 和 .delete() 方法。另一方面，如果你想要删除 Set 中的所有条目，可以使用 .clear() 方法。如果你尝试向 Set 中 .add() 重复的条目，系统不会报错，但是该条目不会添加到 Set 中。此外，如果你尝试 .delete() Set 中不存在的条目，也不会报错，Set 保持不变。.add() 添加不管成功与否，都会返回该 Set 对象。另一方面，.delete() 则会返回一个布尔值，该值取决于是否成功删除（即如果该元素存在，返回 true，否则返回 false）。

使用 .size 属性可以返回 Set 中的条目数。注意，不能像数组那样通过索引访问 Set，因此要使用 .size 属性，而不是 .length 属性来获取 Set 的大小。

使用 .has() 方法可以检查 Set 中是否存在某个条目。如果 Set 中有该条目，则 .has() 将返回 true。如果 Set 中不存在该条目，则 .has() 将返回 false。

```
console.log(games.has('September'));
```

使用 .values() 方法可以返回 Set 中的值。.values() 方法的返回值是 SetIterator 对象。

.keys() 方法将和 .values() 方法的行为完全一样：将 Set 的值返回到新的迭代器对象中。.keys() 方法是 .values() 方法的别名，和 Map（映射）中的类似。

处理 Set 的最后一步是循环访问 Set。

如果还记得之前介绍的 ES6 中的新可迭代协议和迭代器协议，那么你会想起 Set 是内置可迭代类型。这意味着循环时的两件事：

你可以使用 Set 的默认迭代器循环访问 Set 中的每一项。
你可以使用新的 for...of 循环来循环访问 Set 中的每一项。
使用 SetIterator
因为 .values() 方法返回新的迭代器对象（称为 SetIterator），你可以将该迭代器对象存储在变量中，并使用 .next() 访问 Set 中的每一项。

const iterator = months.values();
iterator.next();
Object {value: 'January', done: false}

如果再次运行 .next() 呢？

iterator.next();
Object {value: 'February', done: false}

等等，一直运行到 done 等于 true 时，标志着 Set 的结束。

一种更简单的方法去循环访问 Set 中的项目是 for...of 循环。

const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
console.log(color);
}

### WeakSet

WeakSet 和普通 Set 很像，但是具有以下关键区别：

WeakSet 只能包含对象
WeakSet 无法迭代，意味着不能循环访问其中的对象
WeakSet 没有 .clear() 方法

```
const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);

roster.add('Amanda');// 报错Uncaught TypeError: Invalid value used in weak set(…)
```

但是如果你尝试添加对象以外的内容，系统将报错！这是预期到的行为，因为 WeakSet 只能包含对象。但是为何只能包含对象？如果普通 Set 可以包含对象和其他类型的数据，为何还要使用 WeakSet？这个问题的答案与为何 WeakSet 没有 .clear() 方法有很大的关系……

在 JavaScript 中，创建新的值时会分配内存，并且当这些值不再需要时，将自动释放内存。这种内存不再需要后释放内存的过程称为垃圾回收。

WeakSet 通过专门使用对象作为键值来利用这一点。如果将对象设为 null，则本质上是删除该对象。当 JavaScript 的垃圾回收器运行时，该对象之前占用的内存将被释放，以便稍后在程序中使用。

```
student3 = null;
console.log(roster);
```

由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历

## Map

类似于对象

如果说 Set 类似于数组，那么 Map 就类似于对象，因为 Map 存储键值对，和对象包含命名属性及值相类似。要创建 Map，只需输入：

```
const employees = new Map();
console.log(employees);  // Map {}
```

和 Set 不同，你无法使用值列表创建 Map；而是使用 Map 的 .set() 方法添加键值。

```
const employees = new Map();

employees.set('james.parkes@udacity.com', {
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer'
});
employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
});
employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
});
```

.set() 方法有两个参数。第一个参数是键，用来引用第二个参数，即值。

要移除键值对，只需使用 .delete() 方法。

构建 Map 后，可以使用 .has() 方法并向其传入一个键来检查 Map 中是否存在该键值对。还可以通过向 .get() 方法传入一个键，检索 Map 中的值。

```
console.log(members.get('Evelyn'));
```

你已经创建了 Map，添加了一些键值对，现在你想循环访问该 Map。幸运的是，可以通过以下三种方式循环访问：

- 使用 Map 的默认迭代器循环访问每个键或值
- 使用新的 for...of 循环来循环访问每个键值对
- 使用 Map 的 .forEach() 方法循环访问每个键值对

在 Map 上使用 .keys() 和 .values() 方法将返回新的迭代器对象，叫做 MapIterator。你可以将该迭代器对象存储在新的变量中，并使用 .next() 循环访问每个键或值。你所使用的方法将决定迭代器是否能够访问 Map 的键或值。

let iteratorObjForKeys = members.keys();
iteratorObjForKeys.next();
Object {value: 'Evelyn', done: false}

使用 .next() 获得下个键值对。

iteratorObjForKeys.next();
Object {value: 'Liam', done: false}

等等。

Map 的第二种循环访问方式是使用 for...of 循环。

```
for (const member of members) {
  console.log(member);  // member是一个键值对数组 ['Marcus', 10.25]
}
```

但是，在对 Map 使用 for...of 循环时，并不会得到一个键值或一个值。键值对会拆分为一个数组，第一个元素是键，第二个元素是值。有没有什么方法可以解决这一问题？

最后一种循环访问 Map 的方式是使用 .forEach() 方法。

```
members.forEach((value, key) => console.log(value, key));
```

WeakMap 和普通 Map 很像，但是具有以下关键区别：

- WeakMap 只能包含对象作为键，
- WeakMap 无法迭代，意味着无法循环访问，并且
- WeakMap 没有 .clear() 方法。

WeakMap 通过专门处理对象作为键来利用这一点。如果将对象设为 null，则本质上是删除该对象。当 JavaScript 的垃圾回收器运行时，该对象之前占用的内存将被释放，以便稍后在程序中使用。

book1 = null;
console.log(library);

## Proxy

它接受 2 个参数

- 代理对象
- 处理器，如果处理器为空对象，则请求是直接传递给源对象

```
var richard = {status: 'looking for work'};
var agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'
```

上述代码并没有对 Proxy 执行任何特殊操作，只是将请求直接传递给源对象！如果我们希望 Proxy 对象截获请求，这就是 handler 对象的作用了！

让 Proxy 变得有用的关键是当做第二个对象传递给 Proxy 构造函数的 handler 对象。handler 对象由将用于访问属性的方法构成。我们看看 get：

get 用来截获对属性的调用

```
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target); // the `richard` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
    }
};
const agent = new Proxy(richard, handler);
agent.status; // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
```

在上述代码中，handler 对象具有一个 get 方法（因为被用在 Proxy 中，所以将"function"（方法）称之为"trap"（捕获器））。当代码 agent.status; 在最后一行运行时，因为存在 get 捕获器，它将截获该调用以获得 status（状态）属性并运行 get 捕获器方法。这样将会输出 Proxy 的目标对象（richard 对象），然后输出被请求的属性（status 属性）的名称。它的作用就是这些！它不会实际地输出属性！这很重要 —— 如果使用了捕获器，你需要确保为该捕获器提供所有的功能。

- get trap - 使 proxy 能处理对属性访问权的调用
- set trap - 使 proxy 能将属性设为新值
- apply trap - 使 proxy 能被调用（被代理的对象是函数）
- has trap - 使 proxy 能使用 in 运算符
- deleteProperty trap - 使 proxy 能确定属性是否被删除
- ownKeys trap - 使 proxy 能处理当所有键被请求时的情况
- construct trap - 使 proxy 能处理 proxy 与 new 关键字一起使用当做构造函数的情形
- defineProperty trap - 使 proxy 能处理当 defineProperty 被用于创建新的对象属性的情形
- getOwnPropertyDescriptor trap - 使 proxy 能获得属性的描述符
- preventExtenions trap - 使 proxy 能对 proxy 对象调用 Object.preventExtensions()
- isExtensible trap - 使 proxy 能对 proxy 对象调用 Object.isExtensible
- getPrototypeOf trap - 使 proxy 能对 proxy 对象调用 Object.getPrototypeOf
- setPrototypeOf trap - 使 proxy 能对 proxy 对象调用 Object.setPrototypeOf

一开始，可能不太清楚的是，ES5 中已经提供了 getter 和 setter 方法，为何还要 Proxy。对于 ES5 的 getter 和 setter 方法，你需要提前知道要获取/设置的属性：

```
var obj = {
    _age: 5,
    _height: 4,
    get age() {
        console.log(`getting the "age" property`);
        console.log(this._age);
    },
    get height() {
        console.log(`getting the "height" property`);
        console.log(this._height);
    }
};
```

对于 ES6 中的 Proxy，我们不需要提前知道这些属性。

## 参考资料

- [阮一峰 es6 入门 Decorator](http://es6.ruanyifeng.com/#docs/decorator)

Decorator(装饰器)，就是一个函数，用来对类进行修改。

## 安装

要使用 Decorator，需要安装插件`@babel/plugin-proposal-decorators`。

```
npm i @babel/plugin-proposal-decorators
```

然后在配置`.babelrc`。

```
{
    "plugins": ["transform-decorators-legacy"]
}
```

## 类的修饰

装饰器，就是一个函数，用来对类进行处理。

```javascript
// 装饰器
@test
class Test {}

function test(target) {
  target.age = 12; // 给Test类添加静态属性 isTest
}

console.log(Test.age); // 12
```

还可以通过高阶函数来对装饰器进行改进，如下。

```
const test = (age) => (target) => {
    target.age = age
}

@test(16)
class Test {
}

@test(17)
class Test1 {
}

console.log(Test.age)  // 16
console.log(Test1.age)  // 17
```

装饰器对类的行为的改变，是发生在代码编译时，而不是运行时。所以装饰器本质是编译时执行的函数。

如果向在实例上添加属性。可以在装饰器里对 prototype 进行操作。

```javascript
const test = (age) => (target) => {
  target.prototype.age = age;
};
@test(18)
class Test {}
const t = new Test();
console.log(t.age); // 18
```

下面是一个将方法拷贝到一个类实例上的例子。

```javascript
const mixins = (...list) => (target) => {
  Object.assign(target.prototype, ...list);
};

const Foo = {
  foo() {
    console.log("foo");
  },
};

const Too = {
  too() {
    console.log("too");
  },
};

@mixins(Foo, Too)
class Test {}

let t = new Test();

console.log(t.foo);
console.log(t.too);
```

我们可以将 mixins 抽出来以公用。

实际开发中 react + redux 也可以使用装饰器。

```javascript
class MyReactComponent extends React.Component {}

export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

// 使用装饰器
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

## 方法的装饰

装饰器还可以装饰类的属性。

```javascript
const readonly = (target, name, descriptor) => {
  descriptor.writable = false;
  //console.log(descriptor)
  // - configurable: true
  // - enumerable: false
  // - value: ƒ getAge()
  // - writable: false

  return descriptor;
};

class Person {
  @readonly
  getAge() {
    return "12";
  }
}

let p = new Person();
console.log(p.getAge());

p.getAge = () => {
  return "13";
};

console.log(p.getAge);
```

上面的代码，readonly 装饰器参数如下：

- `target`是`Person.prototype`而不是类本身。
- `name`是方法的名称
- `descriptor`是属性描述对象。
  - `value:function`
  - `enumerable:false`
  - `configurable:true`
  - `writable:true`

装饰器需要返回一个对象，可以利用这个对象来修改原来的方法：

```javascript
const readonly = (target, name, descriptor) => {
  // 如果不返回descriptor，这句相当于不起效
  descriptor.writable = false;

  // 这里相当于返回一个新的属性描述对象
  // 这个如果没有value，则不会影响原来的getAge方法
  return {
    value: () => {
      return 19;
    },
  };
};

p.getAge(); // 返回19
```

所以它的行为类似于 defineProperty：

```javascript
Object.defineProperty(Person.prototype, "name", descriptor);
```

既然实例调用方法的时候会调用装饰器，那么我们可以用装饰器来输出日志。只需要在装饰器里 log 即可。

```javascript
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value;

  descriptor.value = function () {
    console.log(`Calling ${name} with`, arguments);
    return oldValue.apply(this, arguments);
  };

  return descriptor;
}

const math = new Math();

// passed parameters should get logged now
math.add(2, 4);
```

装饰器还有注释的作用。

```javascript
@testable
class Person {
  @readonly
  @nonenumerable
  name() {
    return `${this.first} ${this.last}`;
  }
}
```

如上，我们一看到 name 就知道它是只读不可枚举的。

如果有多个装饰器，则会从外到内生成装饰器函数，再由内而外的执行装饰器函数。

```javascript
function dec(id) {
  console.log("evaluated", id);
  return (target, property, descriptor) => console.log("executed", id);
}

class Example {
  @dec(1)
  @dec(2)
  method() {}
}
// evaluated 1    生成装饰器函数 dec(1)
// evaluated 2    生成装饰器函数 dec(2)
// executed 2     执行装饰器函数 des(2)(target)
// executed 1     执行装饰器函数 des(2)(target)
```

## 装饰器不能装饰函数

因为函数提升，所以装饰器不能作用于函数(疑惑)。如果要装饰函数，可以使用高阶函数。

```javascript
function say(name) {}

function log(fn) {
  return function () {
    console.log("start");
    const result = fn.apply(this, arguments);
    console.log("end");
    return result;
  };
}

say = log(say);
say();
```

## core-decorators.js

这个库提供了很多常用的装饰器。

- `@autobind`：将方法中的 this 绑定原始对象
- `@readonly`
- `@override`：检查子类方法覆盖父类同名方法，不正确会报错。
- `@deprecate`或`@deprecated`:表示该方法将废除，会警告
- `@suppressWarnings`：防止`deprecated`修改器导致的`console.warn()`调用。异步代码发出的调用除外。

## 使用装饰器实现自动发布事件

很简单，就是调用方法的同时，发布事件。貌似可以用来做路由，路由切换时跳到不同的页面。

```javascript
class Test {
  @publish("click")
  say() {}

  @publish("toggle")
  walk() {}
}
```

## Mixin

可以用装饰器实现 Mixin。所谓 Mixin 模式，就是对象继承的一种替代方案。

```javascript
// mixins.js
export function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

// foo.js
import { mixins } from "./mixins";

const Foo = {
  foo() {
    console.log("foo");
  },
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo(); // "foo"
```

不过上面的方法会改写`MyClass`类的`prototype`属性。所以可以通过类来实现`Mixin`。

```javascript
// mixin(superclass)返回一个继承自superclass的子类
const mixin = (superclass) =>
  class extends superclass {
    walk() {
      console.log("walk from mixin");
    }
  };

class Monkey {}

// mixin(Monkey)
class Person extends mixin(Monkey) {}

const p = new Person();
console.log(p.walk);
```

上面的方法做到了保持 Person 和 Monkey 类的纯净，使用 minxin 增加了额外的方法。当然还可以混入多个方法，如`mixin1(mixin2(Monkey))`。

这样写的好处是可以调用`super`。避免在混入中覆盖父类的同名方法。

```javascript
let Mixin1 = (superclass) =>
  class extends superclass {
    foo() {
      console.log("foo from Mixin1");
      if (super.foo) super.foo();
    }
  };

let Mixin2 = (superclass) =>
  class extends superclass {
    foo() {
      console.log("foo from Mixin2");
      if (super.foo) super.foo();
    }
  };

class S {
  foo() {
    console.log("foo from S");
  }
}

class C extends Mixin1(Mixin2(S)) {
  foo() {
    console.log("foo from C");
    super.foo();
  }
}

new C().foo();
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S
```

上面的混入，可以让父类的方法行为得以保存下来，而不被覆盖调。

## Trait

Trait 也是一种修饰器，效果和 Mixin 类似。但是提供了更多的功能。比如防止同名方法冲突、排除混入某些方法、为混入的方法起别名等。

下面是[`traits-decorator`](https://github.com/CocktailJS/traits-decorator)的例子。

### 拷贝方法

```javascript
import { traits } from "traits-decorator";

class TFoo {
  foo() {
    console.log("foo");
  }
}

const TBar = {
  bar() {
    console.log("bar");
  },
};

@traits(TFoo, TBar)
class MyClass {}

let obj = new MyClass();
obj.foo(); // foo
obj.bar(); // bar
```

Trait 不允许“混入”同名方法。如果有同名方法则在混入时会报错。有两种方法解决：

1. 排除某个同名方法。
2. 起别名，这样别名方法也会混入到类中

```javascript
// 排除同名方法
@traits(TFoo, TBar::excludes('foo'))

// 起别名
@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))

// 结合起来写
@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
class MyClass {}

// 结合起来写的另一种写法
@traits(TExample::as({excludes:['foo', 'bar'], alias: {baz: 'exampleBaz'}}))
```

## 总结

1. 什么是`Decorator`?
1. `Decorator`装饰类时函数的参数?
1. `Decorator`装饰类方法时函数的参数?
1. `Mixin`案例?
1. 两个库的基本用法。

1. js 数据类型有哪些？
2. typeof 的各种返回值? typeof v 不会报错
3. null 和 undefined 的区别？

null 和 undefined，在 if 语句中都会转为 false， == 相等

```js
// 根据c
Number(null) // 0
5 + null // 5

Number(undefined) // NaN
5 + undefined // NaN
```

null 是一个表示空的对象，转为数值为 0，undefined 表示未定义，转为数值为 NaN。

4. 下面运算符返回布尔值

前置逻辑运算符 !   
相等 === !== == !=
比较 > >= < <=

一些转换，如 if

下面是false
undefined
null
false
0
NaN
""或''（空字符串）


1. js 所有数字都是 64 位浮点数形式存储，包括整数，所以 1===1.0，如果需要整数计算，则js会将它转成32位整数。
2. 小数的比较和运算要特别小心
```
0.1 + 0.2 === 0.3   // false
0.3 / 0.1
(0.3 - 0.2) === (0.2 - 0.1)
```

字符串

多行字符串，最后用 \，\后面只能是换行符，不能有空格

转义字符: 需要用 \ 来转义的特殊字符

\0 : null(\u0000)
\b  后退键,\u0008
\f  换页符 \u000C
\n  换行符 \u000A
\r  回车符 \u0009
\v  垂直制表符  \u000B
\'  \u0027
\"  \u0022
\\  



\HHH ，三个8进制数(000 - 377 即 0 - 255)，HHH表示Unicode码，如\251表示版权符号，只能输出 256 个字符,表示一个字符
console.log('\777')  // ?7

\xHH，2个十六进制数，00-FF 也是256个， \xA9 是版权，表示一个字符
\uXXXX 4个十六进制数，0000-FFFF，表示一个字符 \u00A9

如果在非特殊字符前面使用反斜杠，则反斜杠会被省略。

字符数组

```js
var s = 'hello';
s[0] // "h"
s[1] // "e"
s[4] // "o"

// 超出索引或索引不存在
'abc'[3] // undefined
'abc'[-1] // undefined
'abc'['x'] // undefined

// 无法改变单个字符
var s = 'hello';

delete s[0];
s // "hello"

s[1] = 'a';
s // "hello"
```

str.length 无法修改


js 引擎内部，所有字符都是用 Unicode 表示。

解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 Unicode 形式表示。输出给用户的时候，所有字符都会转成字面形式。

```js
var f\u006F\u006F = 'abc';
console.log(foo, f\u006F\u006F) // "abc""
```

每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。

UTF-16 有两种长度：对于码点在U+0000到U+FFFF之间的字符，长度为16位（即2个字节）；对于码点在U+10000到U+10FFFF之间的字符，长度为32位（即4个字节），而且前两个字节在0xD800到0xDBFF之间，后两个字节在0xDC00到0xDFFF之间。举例来说，码点U+1D306对应的字符为𝌆，它写成 UTF-16 就是0xD834 0xDF06。


base64 目的不是为了加密，而是为了不出现特殊字符。将任何字符转成 0～9、A～Z、a-z、+和/这64个字符 组成的可打印字符。
有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。
btoa()：任意值转为 Base64 编码
atob()：Base64 编码转为原来的值
只能用于 ASCII码的字符，否则报错

将非ASICC码字符转成 base64
```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

delete 删除不存在的属性也会返回true，删除不能删除的属性configurable:false 时返回false。无法删除继承属性

in 不能识别是自身的还是继承的，要用 hasOwnProperty 判断

for...in 遍历对象的所有可遍历(enumerable) 属性，会编译继承属性。

with 语句没有创建单独的作用域，如果对象没有这个属性，会创建全局变量。不利于除错和模块化，编译器页无法优化，只能留到运行时判断。

var f = function f() {};
这种写法的用处有两个，一是可以在函数体内部调用自身，二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）函数的表达式需要在语句的结尾加上分号，表示语句结束。

```js
var f = function () {
  console.log('1');
}

function f() {
  console.log('2');
}

f() // 1
```

```
var f3 = function myName() {};
f3.name // 'myName'
```

获取参数函数的名字

```
var myFunc = function () {};

function test(f) {
  console.log(f.name);
}

test(myFunc) // myFunc
```

length是行参的个数，可以利用它实现重载

函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。

```
var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x)
// ReferenceError: a is not defined
```

同名参数取最后出现的值

```
function f(a, a) {
  console.log(a);
}

f(1, 2) // 2
```

正常模式下 arguments 对象可以修改，严格模式下，修改后和实际参数不会联动。

```js
var f = function(a, b) {
  'use strict'; // 开启严格模式
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

f(1, 1) // 2
```

arguments对象带有一个callee属性，返回它所对应的原函数。严格模式下禁用。

闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。

IIFE，JavaScript 引擎规定，如果function关键字出现在行首，一律解释成语句。因此，JavaScript 引擎看到行首是function关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

eval命令接受一个字符串作为参数，并将这个字符串当作语句执行。如果参数字符串无法当作语句运行，那么就会报错。放在eval中的字符串，应该有独自存在的意义，不能用来与eval以外的命令配合使用。

```js
eval('var a = 1;');
a // 1

eval('3x') // Uncaught SyntaxError: Invalid or unexpected token
eval('return;'); // Uncaught SyntaxError: Illegal return statement return不能单独使用，必须在函数中使用。
```

如果eval的参数不是字符串，那么会原样返回。
```
eval(123) // 123
```

eval没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

为了防止这种风险，JavaScript 规定，如果使用严格模式，eval内部声明的变量，不会影响到外部作用域。不过，即使在严格模式下，eval依然可以读写当前作用域的变量。

eval不利于引擎优化执行速度
引擎在静态代码分析的阶段，根本无法分辨执行的是eval。，eval别名调用
为了保证eval的别名不影响代码优化，JavaScript 的标准规定，凡是使用别名执行eval，eval内部一律是全局作用域。

```
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e('console.log(a)');
}

f() // 1
```

上面代码中，eval是别名调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的a为全局变量。这样的话，引擎就能确认e()不会对当前的函数作用域产生影响，优化的时候就可以把这一行排除掉。

本质上，数组属于一种特殊的对象。typeof运算符会返回数组的类型是object。

JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

```js
var arr = ['a', 'b', 'c'];

arr['0'] // 'a'
arr[0] // 'a'
```
注意，这点在赋值时也成立。一个值总是先转成字符串，再作为键名进行赋值。

```js
var a = [];

a[1.00] = 6;
a[1] // 6
```

对于数值的键名，不能使用点结构。arr.0的写法不合法，因为单独的数值不能作为标识符

如果人为设置length为不合法的值，JavaScript 会报错。

由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值。
如果数组的键名是添加超出范围的数值，该键名会自动转为字符串。

```js
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';

arr.length // 0
arr[-1] // "a"
arr[4294967296] // "b"
```

检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
for...in不仅会遍历数组所有的数字键，还会遍历非数字键。所以不推荐用它遍历。

数组的空位，可以读取是 undefined
使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性。

```
var a = [, , ,];
```

数组的某个位置是空位，与某个位置是undefined，是不一样的。如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。

```
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
  console.log(i);
}
// 不产生任何输出

Object.keys(a)
// []
```
“类似数组的对象”的根本特征，就是具有length属性。只要有length属性，就可以认为这个对象类似于数组。但是有一个问题，这种length属性不是动态值，不会随着成员的变化而变化。
典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。

var arr = Array.prototype.slice.call(arrayLike);

```js
// forEach 方法
function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i + '. ' + elem);
  });
}

// 等同于 for 循环
function logArgs() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(i + '. ' + arguments[i]);
  }
}
```

```
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c
```

注意，这种方法比直接使用数组原生的forEach要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的forEach方法。

```js
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
```

运算符 

```js
true + true // 2
1 + true // 2

// 由于从左到右的运算次序，字符串的位置不同会导致不同的结果。
'3' + 4 + 5 // "345"
3 + 4 + '5' // "75"

// 减法、除法和乘法运算符，都是将字符串自动转为数值，然后再运算。

// 如果运算子是对象，必须先转成原始类型的值，然后再相加。
var obj = { p: 1 };
obj + 2 // "[object Object]2"
```

对象转原始类型的值，规则如下：
1. 调用对象的 valueOf()，一般来说，对象的valueOf方法总是返回对象自身，如果自定义返回了原始类型的值，则不再调用 toString
2. 调用对象的 toString() 转为字符串

```
var obj = { p: 1 };
obj.valueOf().toString() // "[object Object]"
```

特例，是日期 Date，会先调用 toString，再调用 valueOf。因为日期本来应该是字符串？

```js
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };

obj + 2 // "hello2"
```

余数运算符，需要注意的是，运算结果的正负号由第一个运算子的正负号决定。所以，为了得到负数的正确余数值，可以先使用绝对值函数。

```js
-1 % 2 // -1
1 % -2 // 1

// 错误的写法
function isOdd(n) {
  return n % 2 === 1;
}
isOdd(-5) // false
isOdd(-4) // false

// 正确的写法
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}
isOdd(-5) // true
isOdd(-4) // false

// 余数运算符还可以用于浮点数的运算。但是，由于浮点数不是精确的值，无法得到完全准确的结果。
6.5 % 2.1
// 0.19999999999999973

// 数值运算符的作用在于可以将任何值转为数值（与Number函数的作用相同）
+true // 1
+[] // 0
+{} // NaN

// 负数值运算符（-），也同样具有将一个值转为数值的功能，只不过得到的值正负相反。连用两个负数值运算符，等同于数值运算符。
var x = 1;
-x // -1
-(-x) // 1

// 指数运算符是右结合，而不是左结合
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

相等比较和非相等比较。两者的规则是不一样的，对于非相等的比较，算法是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小。

=== 
- 如果是复合类型，比较的是地址
- 如果是基本类型，比较的是值,

```js
1 === 0x1 // true
1 === 1.0
NaN === NaN  // false
+0 === -0 // true

var v1;
var v2;
v1 === v2 // true
undefined === undefined // true
null === null // true
```

== 
- 基本类型，数据类型不同，非false 转为数字比较 Number
- 对象与原始类型值比较，对象转成原始类型再比较
- undefined和null与其他类型的值比较时，结果都为false，它们互相比较时结果为true。

```js
false == null // false
false == undefined // false

0 == null // false
0 == undefined // false

undefined == null // true

0 == ''             // true
0 == '0'            // true

2 == true           // false
2 == false          // false

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

throw可以抛出任何类型的值，对于 JavaScript 引擎来说，遇到throw语句，程序就中止了。
catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

```js
try {
  throw "出错了";
} catch (e) {
  console.log(e);
}
console.log(222);
//  出错了
//  222

try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

finally

```js
function cleansUp() {
  try {
    throw new Error('出错了……');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
} 

cleansUp() 
console.log('由于没有catch语句块，一旦发生错误，代码就会中断执行。中断执行之前，会先执行finally代码块，然后再向用户提示报错信息。')
```

return语句里面的count的值，是在finally代码块运行之前就获取了。

```js
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
// 0
count
// 1
```

应用场景

```js
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

顺序: try catch 的return 会等到 finally 后面执行，finally 的return 覆盖了前面的。注意这是在 try catch 语句中才这样。

```js
function f() {
    try {
      console.log(0);
      //throw 'bug';
      return 1  
    } catch(e) {
      console.log(1);
      return true; // 这句原本会延迟到 finally 代码块结束再执行
      console.log(2); // 不会运行
    } finally {
      console.log(3);
      return false; // 这句会覆盖掉前面那句 return
      console.log(4); // 不会运行
    }
  
    console.log(5); // 不会运行
  }
  
  var result = f();
  // 0
  // 3
  
  console.log(result)
  // false
```

catch代码块之中，触发转入finally代码快的标志，不仅有return语句，还有throw语句。
```js
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```

只有下一行的开始与本行的结尾，无法放在一起解释，JavaScript 引擎才会自动添加分号。

```js
// 引擎解释为 c(d+e)
var a = b + c
(d+e).toString();

// 引擎解释为 a = b/hi/g.exec(c).map(d)
// 正则表达式的斜杠，会当作除法运算符
a = b
/hi/g.exec(c).map(d);

// 解释为'b'['red', 'green']，
// 即把字符串当作一个数组，按索引取值
var a = 'b'
['red', 'green'].forEach(function (c) {
  console.log(c);
})

// 解释为 function (x) { return x }(a++)
// 即调用匿名函数，结果f等于0
var a = 0;
var f = function (x) { return x }
(a++)
```

debugger 语句


位运算符

位运算只对整数有效。js 数都是 64位浮点数存储，做位运算时，都会转成 32位。

```js
// 将数转为整数
function toInt32(x) {
  return x | 0;
}

toInt32(1.001) // 1
toInt32(1.999) // 1
toInt32(1) // 1
toInt32(-1) // -1
toInt32(Math.pow(2, 32) + 1) // 1
toInt32(Math.pow(2, 32) - 1) // -1
```

二进制或

```js
0 | 3 // 3
00  11 -> 11

// 位运算只对整数有效，遇到小数时，会将小数部分舍去，只保留整数部分。
2.9 | 0  -> 2
-2.9 | 0 -> -2

// 这种取整方法不适用超过32位整数最大值2147483647的数。
2147483649.4 | 0;
// -2147483647
```

二进制与
```js
0 & 3 // 0
00  11 -> 00
```

二进制否运算符: 每个二进制位 0 变为 1，1 变为 0

```js
~ 3 // -4
```

3的32位整数形式是00000000000000000000000000000011，二进制否运算以后得到11111111111111111111111111111100。由于第一位（符号位）是1，所以这个数是一个负数。JavaScript 内部采用补码形式表示负数，即需要将这个数减去1，再取一次反，然后加上负号，才能得到这个负数对应的10进制值。这个数减去1等于11111111111111111111111111111011，再取一次反得到00000000000000000000000000000100，再加上负号就是-4。考虑到这样的过程比较麻烦，可以简单记忆成，一个数与自身的取反值相加，等于-1。

对一个整数连续两次二进制否运算，得到它自身。

```
~~3 // 3

~~2.9 // 2
~~47.11 // 47
~~1.9999 // 1
~~3 // 3
```

对其它类型，JavaScript 引擎会先调用Number函数，将字符串转为数值。

```js
// 相当于~Number('011') -> 11
~'011'  // -12

// 相当于~Number('42 cats') -> NaN -> 0
~'42 cats' // -1

// 相当于~Number('0xcafebabe')
~'0xcafebabe' // 889275713

// 相当于~Number('deadbeef')
~'deadbeef' // -1

// 相当于 ~Number([])
~[] // -1

// 相当于 ~Number(NaN)
~NaN // -1

// 相当于 ~Number(null)
~null // -1
```

异或运算（^）在两个二进制位不同时返回1，相同时返回0。

```js
0 ^ 3 // 3
00 11 -> 11
```

异或运算也可以用来取整。

```js
12.9 ^ 0 // 12
```

左移运算符（<<）表示将一个数的二进制值向左移动指定的位数，尾部补0，即乘以2的指定次方。向左移动的时候，最高位的符号位是一起移动的。

```js
// 4 的二进制形式为100，
// 左移一位为1000（即十进制的8）
// 相当于乘以2的1次方
4 << 1
// 8

-4 << 1
// -8
```

上面代码中，-4左移一位得到-8，是因为-4的二进制形式是11111111111111111111111111111100，左移一位后得到11111111111111111111111111111000，该数转为十进制（减去1后取反，再加上负号）即为-8。

如果左移0位，就相当于将该数值转为32位整数，等同于取整，对于正数和负数都有效。

```js
13.5 << 0
// 13

-13.5 << 0
// -13
```

```js
var color = {r: 186, g: 218, b: 85};

// RGB to HEX
// (1 << 24)的作用为保证结果是6位数
var rgb2hex = function(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16) // 先转成十六进制，然后返回字符串
    .substr(1);   // 去除字符串的最高位，返回后面六个字符串
}

rgb2hex(color.r, color.g, color.b)
// "#bada55"
```


右移运算符（>>）表示将一个数的二进制值向右移动指定的位数。如果是正数，头部全部补0；如果是负数，头部全部补1。右移运算符基本上相当于除以2的指定次方（最高位即符号位参与移动）。

```js
4 >> 1
// 2
/*
// 因为4的二进制形式为 00000000000000000000000000000100，
// 右移一位得到 00000000000000000000000000000010，
// 即为十进制的2
*/

-4 >> 1
// -2
/*
// 因为-4的二进制形式为 11111111111111111111111111111100，
// 右移一位，头部补1，得到 11111111111111111111111111111110,
// -1 取反，加负号   11111111111111111111111111111101 -> 10000000000000000000000010
// 即为十进制的-2
*/
```

右移运算可以模拟 2 的整除运算。

```js
5 >> 1
// 2
// 相当于 5 / 2 = 2

21 >> 2
// 5
// 相当于 21 / 4 = 5

21 >> 3
// 2
// 相当于 21 / 8 = 2

21 >> 4
// 1
// 相当于 21 / 16 = 1
```

头部补零的右移运算符，不用考虑符号，都转为正数

```js
4 >>> 1
// 2

-4 >>> 1
// 2147483646
/*
// 因为-4的二进制形式为11111111111111111111111111111100，
// 带符号位的右移一位，得到01111111111111111111111111111110，
// 即为十进制的2147483646。
*/
```

这个运算实际上将一个值转为32位无符号整数。
查看一个负整数在计算机内部的储存形式，最快的方法就是使用这个运算符。

```
-1 >>> 0 // 4294967295
// 11111111111111111111111111111111 即 2^32 -1
```

就来看看~1的计算步骤：

将1(这里叫：原码)转二进制 ＝ 00000001
按位取反 ＝ 11111110
发现符号位(即最高位)为1(表示负数)，将除符号位之外的其他数字取反 ＝ 10000001
末位加1取其补码 ＝ 10000010
转换回十进制 ＝ -2


## 标准库

### Object

```js
'foo' instanceof String  // false
Object('foo') instanceof String // true  转换为包装对象
```

Object() 当函数使用
1. 如果参数为null/undefined，则返回一个空对象
1. 如果参数是原始类型，则返回包装对象
1. 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。

所以可以写一个函数，判断变量是否是对象

```js
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

Object构造函数，new Object()，可以接收一个参数，和当函数使用一样。但是语义不同，一个是转换，一个是新生成。

```js
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true 直接返回这个对象

var obj = new Object(123);
obj instanceof Number // true
```

Object.keys() 自身属性名，可枚举
Object.getOwnPropertyNames(obj) 自身属性名，不可枚举也返回

```js
Object.getOwnPropertyNames(a.__proto__)
// (12) ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]
Object.keys(a.__proto__)
// []

var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。

（1）对象属性模型的相关方法

Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
Object.defineProperty()：通过描述对象，定义某个属性。
Object.defineProperties()：通过描述对象，定义多个属性。
（2）控制对象状态的方法

Object.preventExtensions()：防止对象扩展。
Object.isExtensible()：判断对象是否可扩展。
Object.seal()：禁止对象配置。
Object.isSealed()：判断一个对象是否可配置。
Object.freeze()：冻结一个对象。
Object.isFrozen()：判断一个对象是否被冻结。
（3）原型链相关方法

Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
Object.getPrototypeOf()：获取对象的Prototype对象。


valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

```js
var obj = new Object();
obj.valueOf() === obj // true
```

toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。

```js
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

上面代码中，数组、字符串、函数、Date 对象调用toString方法，并不会返回[object Object]，因为它们都自定义了toString方法，覆盖原始方法。

Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式。这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。

```
var person = {
  toString: function () {
    return 'Henry Norman Bethune';
  },
  toLocaleString: function () {
    return '白求恩';
  }
};

person.toString() // Henry Norman Bethune
person.toLocaleString() // 白求恩
```

目前，主要有三个对象自定义了toLocaleString方法。

Array.prototype.toLocaleString()
Number.prototype.toLocaleString()
Date.prototype.toLocaleString()
举例来说，日期的实例对象的toString和toLocaleString返回值就不一样，而且toLocaleString的返回值跟用户设定的所在地域相关。

```
var date = new Date();
date.toString() // "Tue Jan 01 2018 12:01:33 GMT+0800 (CST)"
date.toLocaleString() // "1/01/2018, 12:01:33 PM"
```


Object.prototype.hasOwnProperty() 表示对象自身是否具有某属性


```js
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double() // 246
```


注意

```js
if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) {
  console.log('true');
} // true

if (Boolean(null)) {
  console.log('true');
} // 无输出

if (new Boolean(null)) {
  console.log('true');
} // true
```

字符串在js中的存储，码点大于 0xFFFF 时。

注意，该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）。

String.fromCharCode(0x20BB7)
// "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
// true
上面代码中，String.fromCharCode参数0x20BB7大于0xFFFF，导致返回结果出错。0x20BB7对应的字符是汉字𠮷，但是返回结果却是另一个字符（码点0x0BB7）。这是因为String.fromCharCode发现参数值大于0xFFFF，就会忽略多出的位（即忽略0x20BB7里面的2）。

这种现象的根本原因在于，码点大于0xFFFF的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把0x20BB7拆成两个字符表示。

String.fromCharCode(0xD842, 0xDFB7)
// "𠮷"
上面代码中，0x20BB7拆成两个字符0xD842和0xDFB7（即两个两字节字符，合成一个四字节字符），就能得到正确的结果。码点大于0xFFFF的字符的四字节表示法，由 UTF-16 编码方法决定。