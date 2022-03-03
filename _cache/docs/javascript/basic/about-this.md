# this 详解

## this 到底指向谁

this 的指向，是在调用函数时根据执行上下文所动态确定的。它与作用域链毫无关系。

js 代码执行上下文分为 3 种：

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

## 从 ES 规范看 this

ES 规范里 Reference 是一个只存在于规范里的抽象类型，不存在于实际 js 代码中。

Reference 由三个部分组成：

- base value：就是属性所在的对象或 EnvironmentRecord(如果不指定对象)。
- referenced name：属性的名字
- strict reference

获取 Reference 组成的方法：

- GetBase: 获取 base value
- IsPropertyReference: 如果 base value 是对象，就返回 true，否则返回 false
- GetValue: 获取对象属性真正的值，注意调用 GetValue，返回的将是具体的值，而不再是一个 Reference

举个例子：

```js
var foo = 1;
// 对应的Reference是：
var fooReference = {
  base: EnvironmentRecord, // 相当于 window
  name: "foo",
  strict: false,
};

var bar = { name: 1 };
// 11.2.1 Property Accessors 规定属性访问时
// bar.name会返回一个 Reference
var nameReference = {
  base: bar,
  propertyName: "name",
  strict: false,
};
GetBase(nameReference); // bar
IsPropertyReference(nameReference); // true
GetValue(nameReference); // 1
```

ecmascript 规范对 this 的规定：

- 在函数执行时，首先计算 MemberExpression 的结果赋值给 ref
- 判断 ref 是否是 Reference 类型
  - 如果是 Reference，且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
  - 如果是 Reference，且 base value 值是(ref) 是 Environment Record, 那么 this 的值为 ImplicitThisValue(ref)，而它永远会返回 undefined。
  - 如果 ref 不是 Reference，那么 this 的值为 undefined

MemberExpression: 简单来说就是函数调用时，`()`左边的部分。它可以是：

- PrimaryExpression // 原始表达式
- FunctionExpression // 函数定义表达式
- MemberExpression [ Expression ] // 属性访问表达式
- MemberExpression . IdentifierName // 属性访问表达式
- new MemberExpression Arguments // 对象创建表达式

在规范中：

- 属性访问表达式`a.b`会返回一个 Reference(规范 11.2.1 Property Accessors)
- 解析标识符(如 var a=1 里的 a)，查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值。
- `()`会返回表达式的结果，可能是一个 Reference，不过不会对它进行 GetValue 求值。也就是说(a.b) 实际相当于 a.b，也会返回一个 Reference。
- `=`、`||`、`,`表达式会进行 `GetValue(ref)`求值，所以返回的值不是 Reference 类型
- `{}`、`/x/`、`123`、`"foo"`、`function(){}` 不是 Reference
- 在非严格模式下，this 如果是 null 或者 undefined，那么让它指向全局对象。

**分析案例 1**

```js
function foo() {
  console.log(this);
}

foo();
```

foo 是标识符，是 Reference，它的 base value 是 EnvironmentRecord，所以 this 是 undefined，非严格模式下是 window。

**分析案例 2**

```
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar()); // 2
//示例2
console.log((foo.bar)()); // 2
//示例3
console.log((foo.bar = foo.bar)()); // 1
//示例4
console.log((false || foo.bar)()); // 1
//示例5
console.log((foo.bar, foo.bar)()); // 1
```

- 示例 1: foo.bar 属性访问表达式是 Reference，`base value: foo` 为一个对象，即 IsPropertyReference(ref) 是 true，所以 this 是 GetBase(ref) 即 foo。
- 示例 2: (foo.bar) 不会进行计算，相当于还是 foo.bar，同上
- 示例 3、4、5： `=`、`||`、`,` 会求值，不是 Reference，所以是 undefined，this 指向 window

## this 的规则

- 在函数体中，简单调用该函数时（非显式/隐式绑定下），严格模式下 this 绑定到 undefined，否则绑定到全局对象 window／global；
- 一般构造函数 new 调用，绑定到新创建的对象上；
- 一般由 call/apply/bind 方法显式调用，绑定到指定参数的对象上；
- 一般由上下文对象调用，绑定在该对象上；
- 箭头函数执行不会创建自身执行上下文，其 this 执行外层上下文的 this。

## this 优先级

- new > 显示调用(bind/call/apply) > 隐式调用
- 箭头函数无法通过 bind 等方法修改 this 指向

## new 做了什么

```js
function Foo() {
  this.bar = "bar";
}

function myNew(fn) {
  var obj = {};
  Object.setPrototypeOf(obj, fn.prototype);
  var res = fn.call(obj);
  return typeof res === "object" && typeof res !== "null" ? res : obj;
}
```

## 实现一个 bind 方法

### 初级版本

bind 是 es5 新增的方法。但是 call/apply 之前就存在了。

```js
Function.prototype.bind =
  Function.prototype.bind ||
  function (context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1); // 绑定的参数
    return function bound() {
      var innerArgs = Array.prototype.slice.call(arguments); // 后传递的参数
      var finalArgs = args.concat(innerArgs);
      return me.apply(context, finalArgs);
    };
  };
```

上面的代码有几个问题：

- 如果 bind 后的函数是通过 new 调用，那么绑定的 this 需要忽略。
- 使用 bind 之后，返回函数的 length 会失效，且函数的 length 属性是不可改的。(函数 length 应该是形参的个数)
- 需要判断只有函数才能调用 bind

来看看新版本。

### 几乎完美版本

```js
isCallable = function isCallable(value) {
  if (typeof value !== "function") {
    return false;
  }
};
Function.prototype.bind =
  Function.prototype.bind ||
  function (context) {
    if (typeof this !== "function") {
      throw new TypeError(
        "Function.prototype.bind - what is trying to be bound is not callable"
      );
    }
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var F = function () {};
    F.prototype = this.prototype;
    var bound = function () {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.contact(innerArgs);
      return me.apply(this instanceof F ? this : context || this, finalArgs);
    };
    bound.prototype = new F();
    return bound;
  };
```

### 函数 length 的问题

```js
a = function (x, y) {
  console.log(this);
};
a.length; // 2
b = a.bind(null);
b.length; // 2
b = a.bind(null, 3);
b.length; // 1
b = a.bind(null, 3, 4, 5);
b.length; // 0
```

可以看到 bind 后的函数 length 为剩余形参的个数。

### 完美兼容版本

```
bind: function bind(that) {
    var target = this;
    if (!isCallable(target)) {
        throw new TypeError('Function.prototype.bind called on incompatible ' + target);
    }
    var args = array_slice.call(arguments, 1);
    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                array_concat.call(args, array_slice.call(arguments))
            );
            if ($Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                array_concat.call(args, array_slice.call(arguments))
            );
        }
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        array_push.call(boundArgs, '$' + i);
    }
    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

    if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
}
function Empty(){}
```

Function 构造器的语法是：

```
new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

## 实现 apply

```js
Function.prototype.applyFn = function (targetObject, argsArray) {
  if (typeof argsArray === "undefined" || argsArray === null) {
    argsArray = [];
  }

  if (typeof targetObject === "undefined" || targetObject === null) {
    targetObject = window;
  }

  targetObject = new Object(targetObject);

  const targetFnKey = Symbol("targetFnKey");
  targetObject[targetFnKey] = this;

  const result = targetObject[targetFnKey](...argsArray);
  delete targetObject[targetFnKey];
  return result;
};
```

上面代码主要是将 `fn.applyFn(targetObject,y)` 的调用方式修改为 `targetObject.fn(y)`，这样 this 就指向了 targetObject。

## 参考资料

- [从一道面试题的进阶，到“我可能看了假源码”](https://exp-team.github.io/blog/2017/02/20/js/bind/)
