---
title: 常见内置对象
---

dart:collection
dart:convert
dart:core
dart:developer
dart:math
dart:typed_data

## Async 异步

### Dart Async

`dart:async`库通过类 Future 和 Stream 支持异步编程。使用方法是：

```dart
import 'dart:async'
```

## Math 数学

### JavaScript Math

JavaScript 的 Math 是作为内置对象存在。使用方法如下：

```
Math.PI     // 3.14
Math.floor(3.14)    // 3
```

下面是常见属性和方法:

```js
Math.E
Math.PI
Math.LOG2E
...

Math.abs()      // 绝对值
Math.asin()
Math.ceil()    // 向上取整
Math.floor()   // 向下取整
Math.max(a, b, c...)     // 取最大数
Math.min(a, b, c...)     // 取最小数
Math.pow(2, 10)   // 求 2^10 次方
Math.random()   // 随机数
Math.round()     // 四舍五入
Math.sqrt()
...
```

### Dart Math

Math 库包含数学常数和函数，以及一个随机数生成器，需要使用 `dart:math` 库。

```dart
import 'dart:math';
```

下面是一些常用变量和方法：

```dart
const double e = 2.718281828459045;
const double pi = 3.1415926535897932;
const double sqrt2 = 1.4142135623730951;
const double log2e = 1.4426950408889634;
...
external num pow(num x, num exponent);
external double sin(num radians);
external double sqrt(num x);
external double log(num x);
...
class MutableRectangle{}
class Point{}
class Rectangle{}
abstract class Random {
    external factory Random([int seed]);
    external factory Random.secure();   // 获取真随机数
    int nextInt(int max);  // [1, 1<<32]
    double nextDouble();
    bool nextBool();
}
```

Dart 中一些像 `ceil()`、`floor()`、`abs()` 之类的函数都是作为 Number 数据的方法。

```dart
num a = 10.1;
a.ceil();
```

### 真伪随机数

大部分程序和语言中的随机数都是伪随机，是由确定的函数（常用线性同余），通过一个种子(常用时钟)，产生的伪随机数。这意味着：如果知道了种子，或者已经产生的随机数，都可能获得接下来随机数序列的信息（可预测性），因为计算机是一种可确定、可预测的设备。

真随机可以通过软硬结合、引入系统外的变量。比如 UNIX 内核中的随机发生器(/dev/random)，它维护一个熵池，不断搜集非确定性的设备事件，即机器运行环境中产生的硬件噪音来作种子，比如时钟、IO 响应时间、键盘敲击速度、鼠标位置变化、电磁波等等。

```js title="简单的 js 伪随机算法"
function makeRandom(seed) {
    return function () {
        seed = (seed + 0.125) % 1.0;
        return seed;
    };
}
Math.random = makeRandom(0.0);
```

可以看到，伪随机算法是有一定规律的。

## 资料

-   [电脑取随机数是什么原理，是真正的随机数吗？](https://www.zhihu.com/question/20423025)
-   [Javascript 里 Math.random()产生的随机数的规律是什么？](https://www.zhihu.com/question/27796927)
