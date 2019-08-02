---
title: "javascript 语法"
sidebar_label: 语法
---

## var、let 和 const

### 提升

提升是指使用 var 声明的变量、function 声明定义的函数会提升到作用域前面。

```js
a()
function a(){}

console.log(b)  // undefined
var b = 3
```

上面的代码，a 在`function a()`之前使用，b 在`var b`之前使用，并没有报错。这就是提升，实际相当于:

```js
var a = function(){}
a()

var b 
console.log(b)  // undefined
b = 3
```

可以看到，函数 a 的声明和定义都提前了，var 声明的变量 b 的声明提前了，赋值并没有提前，所以输出 b 为 undefind。

提升存在的根本原因就是为了解决函数间互相调用的情况

```js
function test1() {
    test2()
}
function test2() {
    test1()
}
test1()
```

### 重复声明

重复 var 声明同一个变量，只有第一次声明有效。后面的定义会覆盖前面的值。

```js
// --- example 1
var a = 1
var a = 3
// 相当于
var a 
a = 1
a = 3

// --- example 2
console.log(a) // ƒ a() {}
var a = 1
function a() {}
```

上面 example 2 可以看到，函数的声明定义要优先于变量 var 的声明。因为 function a 后，var a 并没有生效。

### 暂时性死区

var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用。

```js
function test(){
  console.log(a)
  let a
}
test()  // Uncaught ReferenceError: a is not defined
```

### 区别

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
- var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
- var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
- let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

