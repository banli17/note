---
title: 代码规范
---

## 如何写好注释

对于注释，必须明白：注释，最多是一种不得不为的“恶”。再好的注释，也是迫不得已才写。能不写就不写。
好的注释是这样的：

对意图的阐释。
对程序员的警示。比如有一段非常危险的代码，一定要通过注释将这种危险传达给程序员。
对某段代码作用或功能的放大。
好的注释美化不了糟糕的代码。首选做法不是写“注释”，而是优化代码，通过代码传达意图。
法律信息。比如版权等信息。
提供信息。
TODO 注释。有时某段代码由于某种原因暂时不能写，就可以使用 TODO 注释标记。需及时整理 TODO 注释，
时间久了，TODO 注释会变为无用的坏注释。

### TODO、FIXME、XXX

- TODO: 等待实现的功能
- FIXME: 需要修正的功能
- XXX: 需要改进的功能

```
/* TODO: How about auto-correcting small spelling errors? */
/* FIXME: This won't work if the file is missing. */
/* XXX: This method badly needs refactoring: should switch by core type. <mbp> */
```

### 安全的类型检测

js 类型检测的一些问题：

1、typeof 的问题，无法判断对象的类型
2、instanceof 的问题，在跨 frame 时有问题

```javascript
var isArray = value instanceof Array;
```

3、不好检测某个对象是原生还是自定义的。比如 JSON 对象，有很多人使用 JSON 库。

解决方法是通过`Object.prototype.toString()`方法，它会返回`[object NativeConstructorName]`字符串。每个类在内部都有一个[[Class]]属性，这个属性就是构造函数名。

```javascript
function isArray(value) {
  return Object.prototype.toString.call(value); // "[object Array]"
}
function isFunction(value) {
  return Object.prototype.toString.call(value) == "[object Function]";
}
```

不过 IE 中以 COM 对象形式实现的函数，isFunction()都将返回 false。因为它们不是原生 js 函数。

注意 toString() 本身也可以被修改。

### 作用域安全的构造函数

```javascript
function Person(name) {
  this.name = name;
}
```

上面的代码如果调用方式是 Person('lili')，name 会绑定到 window 上，因为 window.name 是识别链接目标和 frame 的，所以对该属性进行覆盖可能会导致错误。解决方法是创建一个作用域安全的构造函数。

```javascript
function Person(name) {
  if (this instanceof Person) {
    this.name = name;
  } else {
    return new Person(name);
  }
}
```

上面代码无论怎么调用，都会返回一个 Person 实例，避免了在全局对象上意外设置属性。

但是如果使用了构造函数窃取模式的继承且不使用原型链，那么这个继承可能会被破坏。

```javascript
function Child(name) {
  Person(this, name); // 没有绑定在this上
  this.age = 1;
}
var c = new Child("zs"); // 这里c没有name属性
```

上面代码，Child 的实例并没有 name 属性，解决方法是使用原型链或寄生组合：

```javascript
Child.prototype = new Person();

var c = new Child("zs");
```

### 惰性载入函数

它实际是对函数的重写。比如创建 xhr 对象，每次都需要 if 判断，通过惰性载入函数，就只需要判断一次。如下：

```javascript
function createXHR() {
  if (typeof XMLHttpRequest != "undefined") {
    createXHR = function () {
      return new XMLHttpRequest();
    };
  } else {
    createXHR = function () {
      return new ActiveXObject("Microsoft.XMLHTTP"); // ie6
    };
  }
  return createXHR();
}

var xhr = createXHR();
```

还有一种实现是直接返回适当的函数。

```javascript
var createXHR = (function () {
  if (typeof XMLHttpRequest != "undefined") {
    return function () {
      return new XMLHttpRequest();
    };
  } else {
    return function () {
      return new ActiveXObject("Microsoft.XMLHTTP"); // ie6
    };
  }
})();

var xhr = createXHR();
```

运行一次后，createXHR 就是适当的函数了，第二次就不需要判断。惰性载入函数的优点是只在执行时牺牲一点性能。

### 函数绑定
