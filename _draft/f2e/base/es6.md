---
title: 无名
---

- 引入js脚本
- 注释

## JSDoc注释规范

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

- 以英文、 _ 或 $ 开始

## 流程控制

- if
- 三元运算符
- switch
- while
- do while
- break  跳出循环
- continue 跳出当前循环，继续下一次循环
- for in 遍历对象




# class

class里的方法都是定义在prototype下。所以类的新方法可以这样添加。

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

class已经自动校准了constructor属性，不写constructor也自动添加了指向。

![](./img/class.constructor.png)

类内部的方法都是不可枚举的。

es5 如toString方法可枚举，es6类内部的toString不可枚举。

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

类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。

class和构造函数的区别？
1. class的原型自动会添加constructor指向class。
2. class声明不会提前。
3. class里的方法都不能枚举。


严格模式和非严格模式的区别。

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

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

Class表达式

```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。

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

上面代码中，foo是公有方法，内部调用了bar.call(this, baz)。这使得bar实际上成为了当前模块的私有方法。

3. 利用Symbol值的唯一性，将私有方法的名字命名为一个Symbol值。

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

上面代码中，bar和snaf都是Symbol值，导致第三方无法获取到它们，因此达到了私有方法和私有属性的效果。无法访问对象的Symbol属性。

私有属性：es6不支持，目前有个提案，是在通过`#name`的方式。

this指向问题


Class的getter和setter，可以做拦截。

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

上面代码中，存值函数和取值函数是定义在html属性的描述对象上面，这与 ES5 完全一致。


Class 的 Generator 方法
如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。

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
上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。

静态方法使用static，这样就直接使用类调用，不会被实例继承。如果方法里包含this，则this指向类，而不是实例。

父类的静态方法可以被子类继承。静态方法也是可以从super上调用的。

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

`new.target`属性一般用于构造函数当中，返回new命令作用于的那个构造函数。如果构造函数不是new调用的，则返回undefined。

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

需要注意的是，子类继承父类时，new.target会返回子类。利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

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

子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。





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


子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。


extend实际上是下面2句。

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

super的作用

1. super代表父类的构造函数，但是返回子类B的实例，即super内部的this是B。相当于

```
A.prototype.constructor.call(this)
```

2. super作为对象使用，在普通方法中，表示父类的原型对象(父类的方法都是挂在原型对象下)，所以方法可以调用，而属性不能使用。在静态方法中，指向父类。

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

ES6 规定，通过super调用父类的方法时，方法内部的this指向子类。

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

由于this指向子类，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。

super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

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

上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B，所以super.valueOf()返回的是一个B的实例。

最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

```
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```

extend的继承目标

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

以前，这些原生构造函数是无法继承的，比如，不能自己定义一个Array的子类。

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

上面代码定义了一个继承 Array 的MyArray类。但是，这个类的行为与Array完全不一致。

```
var colors = new MyArray();
colors[0] = "red";
colors.length  // 0

colors.length = 0;
colors[0]  // "red"
```

之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过Array.apply()或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，原生构造函数的this无法绑定，导致拿不到内部属性。

ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，Array构造函数有一个内部属性[[DefineOwnProperty]]，用来定义新属性时，更新length属性，这个内部属性无法在子类获取，导致子类的length属性行为不正常。

下面的例子中，我们想让一个普通对象继承Error对象。
```
var e = {};

Object.getOwnPropertyNames(Error.call(e))
// [ 'stack' ]

Object.getOwnPropertyNames(e)
// []
```
上面代码中，我们想通过Error.call(e)这种写法，让普通对象e具有Error对象的实例属性。但是，Error.call()完全忽略传入的第一个参数，而是返回一个新对象，e本身没有任何变化。这证明了Error.call(e)这种写法，无法继承原生构造函数。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承。下面是一个继承Array的例子。
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

注意，继承Object的子类，有一个行为差异。

```
class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
o.attr === true  // false
```

上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为 ES6 改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6 规定Object构造函数会忽略参数。

## Mixin模式的实现

Mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。

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

上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

```
class DistributedEdit extends mix(Loggable, Serializable) {
  // ...
}
```




# js相等性判断


在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false );  而Object.is的行为方式与三等号相同，但是对于NaN和-0和+0进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 true。(通常使用双等号或三等号将NaN与NaN进行比较，结果为false。

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
- deleteProperty(target, key)：拦截delete obj[key] 操作
- ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- getOwnPropertyDescriptor(target, key)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
- defineProperty(target, key, desc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
- preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
- getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
- isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
- setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。

## Proxy.revocable()

`Proxy.revocable()`返回一个可取消的Proxy实例。

```
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked
```

## this问题

Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
 
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

### Error对象

`Error`对象有三个属性：

- message: 错误提示信息
- name: 错误名称(非标准)
- stack: 错误的堆栈(非标准)

继承自`Error`的函数有：

- SyntaxError: 解析代码时语法错误
- ReferenceError: 引用不存在变量时，或给不能复制的对象(this)或函数运行结果赋值
- RangeError: 值超出有效范围，如数组长度是负数，数值超出范围，以及函数堆栈超过最大值
- TypeError: 变量或参数不是预期类型，或调用对象不存在方法
- URIError: 与url相关函数的参数不正确时抛出
- EvalError: eval()没有被正确执行时抛出，es5后不会出现

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
上面代码中，catch代码块结束执行之前，会先执行finally代码块。从catch转入finally的标志，不仅有return语句，还有throw语句。

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
上面代码中，进入catch代码块之后，一遇到throw语句，就会去执行finally代码块，其中有return false语句，因此就直接返回了，不再会回去执行catch代码块剩下的部分了。







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

在进行数值计算时，8进制和16进制的数都会转成10进制。

浮点数占据的内存空间是整数的2倍，如果小数点后面只有0或没有数字，为了节省空间，该小数会被抓换成整数。

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

**e表示法**

```
var a = 3.2e7;  // 3.2*10(7次幂)
var a = 3.2e-7;  // 3.2*10(-7次幂)
```

NaN 是一个特殊的值，它表示一个本来要返回的一个数值的操作数，但是没有返回数值的情况。

- NaN 进行任何操作都是NaN
- NaN 和任何值都不相等，包括自己。

可以用 isNaN() 来检查一个值是不是NaN。isNaN() 为true必须是这个参数是一个数值类型。isNaN会进行数据转换，将参数转成数值类型。

```
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false
console.log(isNaN("10")); // false，可以被转成数值 10
console.log(isNaN("blue")); // true
console.log(isNaN(true)); // false，可以被转成数值 1
```

**Number和String类型转换**

`js` 中有三个函数可以将数据转为数值类型，`Number()`、`parseInt()` 和 `parseFloat()`。

`Number()`: 可以转任何类型数据为数值，规则如下：
- boolean 值，true 转成 1, false 转成 0
- 数字只是简单的传入和返回
- `null` -> `0`
- `undefined` -> `NaN`
- 如果是字符串，则遵循下面规则：
	- 字符串中包含数字，则转成10进制数值，前导0会被忽略。'123' -> 123，'011' -> 11
	- 字符串包含有效浮点数，则转成浮点数值，前导0会被忽略。
	- ''或' ' -> 0
	- 字符串包含非上述字符，转成NaN
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

注意，对于8进制和16进制，不同浏览器解析可能不一致，所以要统一标志第二个参数：数值的基数。如果标志了数值进制，16进制数的0x就可以不写。

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
- 如果字符串后面的小数点全是0，或没有小数点，它会返回整数。
- `parseFloat()` 没有第二个参数，它将数都当做10进制对待，比如`'0x1'` -> 0，而数字`0x1` -> 1。

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

js里的最大数值是 `5*10e-324`( `Number.Min_VALUE` )，最小数是 `1.79 * 10e308` ( `Number.MAX_VALUE` )。超过最大值会自动变成 `Infinity`，可以使用 `Number.isFinite()` 来判断一个数是否有限。

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


















哪些情况下会产生NaN。
- 0/0 分子和分母都是0
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

`every()` 如果所有元素都满足要求，则返回true，否则返回 false
`some()`  如果有元素满足要求，则返回true，否则返回false
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

- 如果end是负数，则从倒数开始计数，如果 start 和 - end是同一个元素 ，则 start会被填充，如果start，end交集为空，则没有元素选中
- 如果start是负数，则从倒数开始计数，如果start、end都是负数，则没有元素被填充
- 如果start是正数，start == end，则没有元素被填充
- 关于undefined、null、NaN
    - null,null/NaN 没有元素选中
    - null,undefined 都被选中
    - NaN,undefined 都被选中
    - NaN,null/NaN  没有选中
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

`reduce()` 会遍历数组，回调函数的返回值会成为下次遍历的第一个参数now。`initialValue` 默认是数组的第一个元素。在没有初始值的空数组[]上调用reduce会报错。

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
- end 如果是负数，则是start到end，如果end 大于数组长度，则会一直到数组末尾。

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




# Math对象

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
- max(x, y)：返回x和y中的最高值
- min(x, y)：返回x和y中的最小值
- pow(x, y)：返回x的y次幂
- random()：返回[0, 1)之间的随机数
- round(x)：四舍五入
- sqrt(x)：返回数的平方根
- toSource()：返回该对象的源代码，网上有误，测试是undefined
- valueOf()：返回Math对象的原始值

**数学中**
- acos(x)：返回数的反余弦值。
- asin(x)：返回数的反正弦值。
- atan(x)：以介于 -PI/2 与 PI/2 弧度之间的数值来返回 x 的反正切值。
- atan2(y, x)：返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间）。
- sin(x)：返回数的正弦
- cos(x)：返回数的余弦
- tan(x)：返回角的正切
- exp(x)：返回e的指数
- log(x)：返回数的自然对数，以e为底

## 应用

1. 获取1-10之间的随机整数，包括1和10

```
Math.floor(Math.random()*10+1)
```

2. 获取数组中的最小数

```
var a = [1, 4, 6, 10, 0, 7]
var min = Math.min.apply(null, a)
```

通过apply借用Math的min方法进行获取最小值。

3. 常用的还有向上取整、向下取整、四舍五入。





## Object的方法和属性
 
### Object.keys()

Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 （两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性）。


Object.getOwnPropertyNames()

包括不可枚举的，但是不包含Symbol















# es6


## let和const

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

输出是undefined，是不是很奇怪？因为浏览器解析 JavaScript 时，进行了变量提升。在执行任何 JavaScript 代码之前，所有变量都会被“提升”，也就是提升到函数作用域的顶部。

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

迭代就是依次访问一个对象。比如循环时定义的i，就是迭代器，它一个接一个的访问对象的每一项。

for...of循环结合了for和for...in循环的优势。可以循环任何可迭代类型的数据，默认情况下，包括String、Array、Map、Set,不包括Object。默认情况下，对象不可迭代。

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

上面nums是个[]，没有参数，就是个空数组。

## 函数的变化

箭头函数，单条语句不需要return

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
- 如果函数被调用时没有上下文，this将是全局对象或严格模式下是 undefined

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
es6的类是es5构造函数的语法糖，实际是将构造函数里的属性定义在了construct中，在new的时候自动执行，原型上的方法定义在了类中。

```
class Plane{}
typeof Plane  // function
```

在类中，不用逗号来区分属性或方法。如果添加逗号，将出现 SyntaxError：unexpected token

静态方法，在方法前加static关键字

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

super不能单独访问，否则报错。它在构造函数里需要以函数调用，super()，继承构造函数。如果一个类有构造函数同时使用了extends，必须要调用super。在方法里，它当做对象调用，比如super.say()。super的作用：
1. super()是在实例化父类
2. super是那个实例

super必须在this之前被调用，否则报错

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
- 使用类需要用到 new: 在创建 JavaScript 类的新实例时，必须使用关键字 new，否则报错Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'




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

Symbol不能被for...in循环到。

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



## Set和Map


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

操作Set
```
games.add('Banjo-Tooie');  // 返回Set对象
games.add('Age of Empires');
games.delete('Super Mario Bros.');  // true
games.clear()
```
创建 Set 后，你可能想要添加或删除条目。如何操作呢？可以使用名称对应的 .add() 和 .delete() 方法。另一方面，如果你想要删除 Set 中的所有条目，可以使用 .clear() 方法。如果你尝试向 Set 中 .add() 重复的条目，系统不会报错，但是该条目不会添加到 Set 中。此外，如果你尝试 .delete() Set 中不存在的条目，也不会报错，Set 保持不变。.add() 添加不管成功与否，都会返回该 Set 对象。另一方面，.delete() 则会返回一个布尔值，该值取决于是否成功删除（即如果该元素存在，返回true，否则返回false）。

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

它接受2个参数
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

