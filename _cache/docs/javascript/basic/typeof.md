# 数据类型、判断与转换

## 数据类型

JavaScript 具有七种内置数据类型，它们分别是：

- null
- undefined
- boolean
- number
- string
- object
  - function
  - date
  - array
  - 等等
- symbol

## 数据类型判断方法

### typeof

使用 typeof 可以准确判断出除 null 以外的基本类型，以及 function 类型、symbol 类型；null 会被 typeof 判断为 object。

### instanceof

使用 a instanceof B 判断的是：a 是否为 B 的实例，即 a 的原型链上是否存在 B 构造函数。

```js
5 instanceof Number; // false
new Number(5) instanceof Number; // true
```

instanceof 原理如下：

```js
// L 表示左表达式，R 表示右表达式
const instanceofMock = (L, R) => {
  if (typeof L !== "object") {
    return false;
  }
  while (true) {
    if (L === null) {
      return false; // 已经遍历到了最顶端
    }
    if (R.prototype === L.__proto__) {
      return true;
    }
    L = L.__proto__;
  }
};
```

### Object.prototype.toString

### constructor

```js
var foo = 5
foo.constructor
// ƒ Number() { [native code] }

var foo = true
foo.constructor
// ƒ Boolean() { [native code] }

var foo = []
foo.constructor
// ƒ Array() { [native code] }

var foo = {}
foo.constructor
// ƒ Object() { [native code] }

var foo = new Date()
foo.constructor
// ƒ Date() { [native code] }

var foo = Symbol("foo")
foo.constructor
// ƒ Symbol() { [native code] }

var foo = undefined
foo.constructor
// VM257:1 Uncaught TypeError: Cannot read property 'constructor' of undefined
    at <anonymous>:1:5

var foo = null
foo.constructor
// VM334:1 Uncaught TypeError: Cannot read property 'constructor' of null
    at <anonymous>:1:5
```

对于 undefined 和 null，如果尝试读取其 constructor 属性，将会进行报错。

## 类型转换

### 隐式类型转换

- 当使用 + 运算符计算 string 和其他类型相加时，都会转换为 string 类型；其他情况，都会转换为 number 类型，但是 undefined 会转换为 NaN，相加结果也是 NaN。如果存在复杂类型，那么复杂类型将会转换为基本类型，再进行运算。

```
console.log(1 + '1')
// 11

console.log(1 + true)
// 2

console.log(1 + false)
// 1

console.log(1 + undefined)
// NaN

console.log({} + true)
// [object Object]true
```

## valueOf 和 toString

基本上，所有 JS 数据类型都拥有这两个方法，null 除外。主要用来解决 js 值运算与显示的问题。

对象类型转基本类型过程：对象在转换基本类型时，会调用该对象上 valueOf 或 toString 这两个方法，该方法的返回值是转换为基本类型的结果。

那具体调用 valueOf 还是 toString 呢？这是 ES 规范所决定的，实际上这取决于内置的 toPrimitive 调用结果。主观上说，这个对象倾向于转换成什么，就会优先调用哪个方法(PreferredType)。

javascript 首先收集操作数的原始值，然后根据每个原始类型确定要应用加法还是串联。

## 函数参数传递

- 参数为基本类型时，函数体内复制了一份参数值，对于任何操作不会影响参数实际值
- 函数参数是一个引用类型时，当在函数体内修改这个值的某个属性值时，将会对参数进行修改
- 函数参数是一个引用类型时，如果我们直接修改了这个值的引用地址，则相当于函数体内新创建了一份引用，对于任何操作不会影响原参数实际值

## property of undefined 问题

cannot read property of undefined 是一个常见的错误，如果意外的得到了一个空对象或者空值，这样恼人的问题在所难免。

解决方案：

1. && 短路运算符进行可访问性嗅探 `a && a.b`
2. || 单元设置默认保底值，`(a || {}).b`
3. try...catch
4. lodash get，基本实现如下
5. `a?.b`

```js
const get = (p) => (o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

const getUserComments = get(["user", "posts", 0, "comments"]);

console.log(getUserComments(obj));
// [ 'Good one!', 'Interesting...' ]
console.log(getUserComments({ user: { posts: [] } }));
// null
```
