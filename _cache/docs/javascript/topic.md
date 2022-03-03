# js 专题系列

## 1-2.防抖与节流

## 3.数组去重

数组去重方法：

1. 暴力法(兼容性好): 新建一个空数组 res，遍历数组 arr，循环判断 res 中是否有相同的新元素，有则放入，没有则继续。
   - 注意内层循环新数组，如果新数组没有该值，则最后 j === res.length
   - indexOf 或 includes 可以简化内层循环
   - filter 简化外层循环
   - 排序后去重，只要相邻元素不等，即可放入新数组中，效率比 indexOf 高
   - 新需求，给 unique 增加迭代函数 iteratee，来判断值是否相等
2. 经典算法: 只插入最右边的，不管前面重复的
3. 使用 object 的 key
   - key 在 object 中只保存为字符串了，所以无法判断 1， '1'
   - 使用 typeof + key 做判断，但是无法判断对象类型
   - 最后使用 typeof + JSON.stringify 解决上面问题
4. 使用 Map，它的 key 可以是任意类型，且不能重复，但是对象类型对被当作不同的 key
5. 使用 Set， `[...new Set(arr)]`，可以去重 NaN

```
JSON.stringify(NaN)  // null

// demo1
var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1  indexOf 底层是 === 所以找不到NaN

// demo2
function unique(array) {
   return Array.from(new Set(array));
}
console.log(unique([NaN, NaN])) // [NaN]
```

[代码 demo](./3.数组去重)

## 4.类型判断

判断什么:

- 数字、字符串、数组、对象
- 日期，正则、错误类型
- plainObject(纯对象 `{a:1}` 这样的)，空对象`{}`，window，arrayLike

判断方法：

- typeof: 能返回 number、string、boolean、symbol、bigint、function、object
  - 只能判断基本类型，对象类型全是 object，注意 null 也返回 object
  - 能判断函数，返回 function
- Object.prototype.toString: 能检查所有类型
  - 内部执行步骤如下
    1. 如果 this = undefined，则返回 `[object Undefined]`
    2. 如果 this = null，就返回`[object Null]`
    3. let O = ToObject(this)，并添加 `[[Class]]`属性等于类名
    4. 返回 `[object [[Class]]]`形式的字符串
  - IE6: null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
  - jQuery3.0 是使用 Array.isArray 判断数组。
- 判断纯对象：$.plainObject()，代码如下
- 判断空对象：$.isEmptyObject()，没有属性就是纯对象
- 判断 window，一句代码 `obj != null && obj === obj.window`;
  - 现在可以用 toString 了，返回`[object Window]`，虽然 ie6/8 是`[object Object]`，safari4 是`[object DOMWindow]`，chrome 5 是`[object global]`，但是已经 out 了。
- 判断类数组，如`arguments: {a: 1, length: 0}`，必须三个条件至少满足一个:
  - 是数组
  - length 为 0
  - length 为大于 0 的整数，且 `o[length-1]`存在
- 判断是 dom： `!!(obj && obj.nodeType === 1)`
  > for in 对于 null、number、string、boolean、undefined 都可以

```js
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error"
  .split(" ")
  .map(function (item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
  });
// 获取类型
function type(obj) {
  // 一箭双雕
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[Object.prototype.toString.call(obj)] || "object"
    : typeof obj;
}
// 判断是函数
function isFunction(obj) {
  return type(obj) === "function";
}

function isEmptyObject(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
}

function isWindow(obj) {
  return obj != null && obj === obj.window;
}

// 判断是类数组
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var isArrayLike = function (collection) {
  var length = getLength(collection);
  return typeof length == "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// 判断是 DOM
isElement = function (obj) {
  return !!(obj && obj.nodeType === 1);
};
```

下面是 jQuery.isPlainObject 代码：

```js
var class2type = {};
var toString = class2type.toString; // 相当于 Object.prototype.toString
var hasOwn = class2type.hasOwnProperty; // 相当于 Object.prototype.hasOwnProperty

function isPlainObject(obj) {
  var proto, Ctor;
  // 1. 类型不是 object 就排除
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  // obj.__proto__ === Object.prototype
  proto = Object.getPrototypeOf(obj);
  // 2. 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true;
  }

  /**
   * 3. 判断通过 new Object 方式创建的对象，对象原型的构造函数是 Object
   */
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

  // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
  // 搞不懂为什么要用 hasOwn？可能性能考虑，也可proto.constructor == new Object().constructor
  // console.log(hasOwn.toString.call(Ctor)); // function Object() { [native code] } 这里还有比较了函数 Object 的内部代码
  // console.log(Object.prototype.toString.call(Ctor)); // [object Function]
  return (
    typeof Ctor === "function" &&
    hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
  );
}
```

## 5.深拷贝与浅拷贝

## 6.求数组的最大最小值

求数组的最大最小值方法如下：

- Math.max(v1, v2, v3)
  - `Math.max(...arr)` 或者 `Math.max.apply(null, arr)`(apply 会将 arr 分解开)
  - 如果有一个参数不能转为数值，则返回 NaN，因为数字才能比较。
  - 如果没有参数，返回 -Infinity，相反 Math.min() 返回 Infinity。
- 遍历查找
  - for 遍历
  - reduce 遍历
- 排序
- eval 将数组转为 `a,b,c` 形式

## 7.数组扁平化

将数组扁平化(flatten)的方法有：

- 递归将多层数组元素放入到新数组中
  - 普通递归
  - reduce 递归
- 先 toString 后，再 split
  - toString 可以将多层数组弄成扁平的字符串
  - 注意，扁平后，无法区分数据类型，如`[1, '2', 'null']` 变成了 `1,2,null`
- es6 扩展运算符 ...，`[].concat(...arr)`
  - 只对一层有效，多层需要继续扁平
- es6 `.flat(Infinity)`
- underscore flatten 方法
  - 参数
    - input 要处理的数组
    - shallow 是否只扁平一层
    - strict 忽略非数组，只处理内层是数组的元素
    - output 方便递归
  - 基于 flatten 实现的方法有
    - \_.flatten(array, shallow)
    - \_.union
    - \_.difference

## 8.在数组中查找指定元素

- es6 findIndex/findLastIndex 的使用和实现，
- 使用 createIndexFinder 生成 findIndex 和 findLastIndex 函数(findIndex 和 findLastIndex 代码几乎相同)。
- 针对有序数组查找索引，采用二分查找
- indexOf(item, fromIndex): 从前往后找
  - fromIndex 默认为 0，如果 < 0 时，会抵消索引值，如果抵消后还 < 0 ，则为 0。
- lastIndexOf: 从后往前找
  - fromIndex 默认为 len-1，如果 > len-1，则整个数组都会被查找，如果为负，则时末尾向前的便宜。

自己实现 indexOf 时要注意：

- 如果值是 NaN 时，indexOf 不能找 NaN 的下标
- 排序数组用二分查找(第三个参数如果不传 fromIndex，而是个布尔值，表示数组是有序的)

## 9.jQuery.each 方法

$.each(o, callback) 方法可以遍历数组和对象。callback 返回 false 时，可以退出循环。

isArrayLike: 有 length 属性，值为 number， 并且有 `[length-1]` 属性

for、forEach、map 性能问题：

- for 最快，没有函数调用栈和上下文。
- forEach(function(item, index, arr), thisValue) 第二。
- map 最慢，需要返回一个与数组等长的新数组。

## 10. 判断两个对象相等

对象相等基于：

0. 有 null 或 undefined 直接返回 false
1. NaN 和 NaN
2. [1] 和 [1]
3. {a: 1} 和 {a: 1}
   - 对象的构造器不同?
4. +0 和 -0
5. 'a' 和 new String('a) 以及其它类型 Number，Date，RegExp，Boolean
   - 使用 toString() 类型 + 将数据转为相同形式的方法，如 +date == +date
6. 循环引用
   - 情况
     - 1)自己引用自己，2) 其它对象引用自己，自己又引用其它对象
     - 会造成 JSON.stringify 错误，和深拷贝可能报错为题
   - 解决方法
     - 将循环引用的值标记为一个特殊对象，如 `{'$ref': '$'}`？
     - 将比较的对象 push 到 aStack 中，遍历 aStack 看有没有与当前元素相等的，如果有，则看 bStack 是不是一样的情况，一样的情况才行
7. 函数直接返回 false

## 11.函数柯里化

柯里化是一种将多参数函数转成一系列使用一个参数函数的技术。

作用是参数复用，本质是降低函数的通用性，提高适用性。

**实现**

- `curry(fn, ...args)`使用闭包保存参数并返回函数 curryFn，执行 curryFn(...restArgs) 时，将参数(args, restArgs)合并，执行函数 fn。
- 当参数总数量大于等于 fn.length 时，才执行函数 fn，否则继续返回 curry。
- 使用占位符\_，实现后续可以传递其它位置的参数
  - 如对 fn(a,b,c) 柯里化 curryFn(fn, a, \_ ,c) 之后可以执行 curryFn(b)。
  - 如果后续参数有占位符，则一一匹配，curryFn(_, _ ,1) -> curryFn(2, _, 4)，则等价于 currFn(2, _, 1, 4)

## 12.偏函数

便函数是指固定一个函数的参数，然后产生另一个更少参数的函数。

如：fetch(method, url, data) 可以转换为 get(url, data) 和 post(url, data)。

柯里化与偏函数的区别是：

- 柯里化是将多个参数转成多个单参数函数，即 n 转成 n 个 1
- 偏函数是将多个参数转为少参数函数，即 n 转成 n - x

## 13. 惰性函数

惰性函数是为了解决每次都要判断的问题。就是判断完成后重写原来函数。

一般我们做缓存，会写如下代码。

```js
var foo = function () {
  var t;
  return function () {
    if (t) return t;
    t = new Date();
    return t;
  };
};
```

但是这样也是需要每次都判断 t 是否存在。可以通过惰性函数解决。

```js
var foo = function () {
  t = new Date();
  foo = function () {
    return t;
  };
  return foo();
};
var time = foo(); // t
var x = foo(); // t
```

上面代码执行完后，time 就变成了 t。再次执行 foo() 时，返回的还是 t。

实际可以应用在一些兼容方法的书写上，如下：

```js
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false);
    };
  } else if (window.attachEvent) {
    addEvent = function (type, el, fn) {
      el.attachEvent("on" + type, fn);
    };
  }
  addEvent(type, el, fn);
}
```

## 14. 函数组合

函数组合是将函数组合起来返回一个新的函数的技巧，有点像 pipe 管道，或者链式调用，上个函数的执行结果会传递给下一个函数执行。

compose 返回一个函数，当这个函数执行时，会传给多个函数依次执行。

```js
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}

function add10(a) {
  return a + 10;
}
function minus5(a) {
  return a - 5;
}
const add5 = compose(add10, minus5);
console.log(add5(20)); // 25
```

使用 reduce 实现 compose。

```js
function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
// a, b, c, d
// a, b => ()=>a(b())
// ()=> (()=>a(b())(c())
// ()=> ((()=>a(b())(c()))(d())
```

## 15. 函数记忆

函数记忆是指将函数计算过的结果缓存起来，以后计算时，如果有则返回。

这里的 key 可以是:

- arg.length + args
- 自定义生成 key 的 hasher 函数

值得注意的是，这种操作可能会更慢，比如缓存计算两个数字相加，查找缓存过程可能比计算更慢。

## 16. 递归

程序调用自身的编程技巧称为递归(recursion)。

递归的特点是：

- 能分解为相同的子问题
- 能够退出递归

尾调用，是指函数内部的最后一个动作是函数调用。该调用的返回值，直接返回给函数。尾调用只需要保存内层函数的执行环境就行，不用保存外层函数的，因为最后它只需要内层函数的执行结果就可以了。

```
function f(){
    return g()
}

// 执行栈的流程
f stack push()
f stack pop()  // 尾调用，可以直接 pop，es6严格模式下有用
g stack push()
g stack pop()
```

如果最后调用的函数是自己，那就是尾递归。普通递归改写成尾递归的方法是：把所有用到的内部变量改写成函数的参数。

```js
function tailFactorial(n, total) {
  if (n === 1) return total;
  return tailFactorial(n - 1, n * total);
}

function factorial(n) {
  return tailFactorial(n, 1);
}

factorial(5); // 120
```

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。

尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

## 17.数组乱序

Fisher–Yates 随机置乱算法原理：遍历数组，和随机位置的元素交换位置。

```js
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}
```

## 花式表示 26 个字母

是使用隐式类型转换来的，转成字符串后取下标。

```
[][0]  // undefined
[][0] + []  // 'undefined'
([][0]+[])[0]  // u， 通过下标获取 u n d e f i

+[][0]  // NaN
[] == []  // false
+[] == +[] // true
+("1e309") // Infinity
[]["find"]  // function find() { [native code] }

// 获取 m g
0["constructor"] // function Number() { [native code] }
""["constructor"] // function String() { [native code] }

"to" + ""["constructor"]["name"]  // toString
```

NumberObject.toString(radix)

- radix 数字的基数，2-36 之间，默认是 10

```js
var number = new Number(10);
number.toString("16"); // a
(35)["toString"](36); // z
```

## 学习资料

- [冴羽的博客](https://github.com/mqyqingfeng/Blog)
