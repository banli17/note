---
title: Math 对象
date: 2019-03-28 22:10:01
tags:
toc: true
---

## 静态属性

- Math.E：常数e。
- Math.LN2：2 的自然对数。
- Math.LN10：10 的自然对数。
- Math.LOG2E：以 2 为底的e的对数。
- Math.LOG10E：以 10 为底的e的对数。
- Math.PI：常数π。
- Math.SQRT1_2：0.5 的平方根。
- Math.SQRT2：2 的平方根。


```js
Math.E // 2.718281828459045
Math.LN2 // 0.6931471805599453
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.LOG10E // 0.4342944819032518
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476
Math.SQRT2 // 1.4142135623730951
```

## 静态方法

### Math.abs()

绝对值

### Math.ceil()

向上取整

### Math.floor()

向下取整

```js
// 和 parseInt 类似
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}
```

### Math.max()

返回参数中的最大值，如果参数为空，返回 Infinity。

### Math.min()

返回参数中的最小值，如果参数为空，返回 -Infinity。

### Math.pow()：指数运算

### Math.sqrt()

Math.sqrt方法返回参数值的平方根。如果参数是一个负值，则返回NaN。

```js
Math.sqrt(4) // 2
Math.sqrt(-4) // NaN
```


### Math.log()

Math.log方法返回以e为底的自然对数值。


### Math.exp()

Math.exp方法返回常数e的参数次方。

```
Math.exp(1) // 2.718281828459045
Math.exp(3) // 20.085536923187668
```

### Math.round()

四舍五入。

```js
Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1

Math.round(-1.1) // -1
Math.round(-1.5) // -1  注意
Math.round(-1.6) // -2
```

### Math.random()

random 返回一个 [0, 1) 的随机数。

```js
// 任何范围的随机整数, [min, max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6) // 5
```

返回随机字符串的例子如下：

```js
function random_str(length) {
  var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
  ALPHABET += '0123456789-_';
  var str = '';
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6) // "NdQKOr"
```

## 三角函数

Math对象还提供一系列三角函数方法。

- Math.sin()：返回参数的正弦（参数为弧度值）
- Math.cos()：返回参数的余弦（参数为弧度值）
- Math.tan()：返回参数的正切（参数为弧度值）
- Math.asin()：返回参数的反正弦（返回值为弧度值）
- Math.acos()：返回参数的反余弦（返回值为弧度值）
- Math.atan()：返回参数的反正切（返回值为弧度值）