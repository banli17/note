---
title: 函数
---

## Dart 函数

### 简介

Dart 函数返回值类型和参数类型都是可选的。

```dart
add(int a, b){
    return a + b;
}
```

上面可以简写为箭头函数：

```dart
add(int a, b) => a + b;
```

如果调用函数时不传实参，参数值将默认为 `null`。

### 函数的参数

Dart 中，函数的参数分为

-   必选参数
-   可选参数
    -   命名可选参数: 定义方式为 `fn({paramName})`，调用时通过 `fn(paramName: value)` 传参。
    -   位置参数

> 命名可选参数不能和位置参数混用，而且如果有必选参数，必选参数要放在最前面。

命名参数可以通过 @require 注解表示必须，需要引入 meta 包 `import 'package:meta/meta.dart'`，但是它只在编辑器提示报错，运行时不会报错。

```dart
// 可选命名参数
fn(d, {a, b, @required String c}){}
fn(5, a:3, c: 2)

// 位置参数
fn(a, b, [c, d]){}
fn(3, 2, 5)
```

> 函数也可以作为参数值传递。它是引用传递。

### 参数默认值

只有可选参数(命名可选参数和位置参数)可以设置默认值。必须参数不能设置默认值。

```dart
// 语法错误
fn(a = 1){}

// 正确
fn({a = 2}){}
fn([a = 2]){}
```

### 函数表达式

可以将函数赋值给变量，作为函数表达式。

```
var fn4 = (msg) => 'hello ${msg}';
```

### 匿名函数

```dart
var list = ['apple', 'orange', 'bananas'];
list.forEach((element) {
    print('${list.indexOf(element)}: $element');
});

//    0: apple
//    1: orange
//    2: bananas
```

### 变量作用域

函数可以访问其作用域外的变量。

```dart
var mainV = 'mainV';
fn5() {
    print(mainV);
}
```

### 闭包

```dart
fn6(a) {
    return (b) => a + b;
}

var fn6addA = fn6(6);
print(fn6addA(19)); // 25
print(fn6addA(10)); // 16
```

### 函数返回值

函数默认返回值为 `null`。

```
fn7(){}
assert(fn7() == null);
```

### 函数相等性测试

不同实例的方法不想等。

```dart
var x;
x = foo;
assert(x == foo);  // 说明是引用赋值
x = A.bar;
assert(x == A.bar);
var a1 = A();
var a2 = A();
assert(a1 != a2);
var a3 = a2;
x = a2.baz;
assert(a3.baz == x);  // 引用赋值
assert(a1.baz != a2.baz); // 注意！不同实例的方法不相同
```
