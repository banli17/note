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

## 结尾写分号

最初，行尾使用分号是为了降低编译器的负担。但是今天编译器效率已经足够高，行尾使用分号反而成为了一种语法噪音。

### 自动插入分号规则

自动插入分号的规则有 3 条，如下：

1、有换行符，且下一个符号是不符合语法的，那么就尝试插入分号。

```js
let a = 1
let b = 2
```

2、有换行符，且语法中规定此处不能有换行符，那么就自动插入分号。

根据 JavaScript 标准，表达式和`++`之间不能有换行符。如下`[no LineTerminator here]`。

```
UpdateExpression[Yield, Await]:
    LeftHandSideExpression[?Yield, ?Await]
    LeftHandSideExpression[?Yield, ?Await][no LineTerminator here]++
    LeftHandSideExpression[?Yield, ?Await][no LineTerminator here]--
    ++UnaryExpression[?Yield, ?Await]
    --UnaryExpression[?Yield, ?Await]
```

再看下面代码：

```
var a = 1, b = 1, c = 1;
a
++
b
++
c
```

根据第 1 条规则，a 后面可以跟 ++，但是根据第 2 条规则，a 与 ++ 之间不能有换行，所以 a 后面会自动插入分号，而 b、c 会变成 2。

return 也有[no LineTerminator here] 规则的要求，而带换行符的注释也会被认为有换行符。

```js
function f(){
    return/*
        This is a return value.
    */1;
}
f();
```

上面代码会返回 undefined。

3、源代码结束处，不能形成完整的脚本或模块结构，那么就自动插入分号。

### no LineTerminator here 规则

`no LineTerminator here`规则表示，在规定的结构中不能有换行符，否则会自动插入分号，如上面的例子。

规则如下：

- 带标签的 continue 语句，不能在 continue 后插入换行。

```js
outer:for(var j = 0; j < 10; j++)
    for(var i = 0; i < j; i++)
        continue /*no LineTerminator here*/ outter
```

- 带标签的 break 语句，不能在 break 后插入换行。

```js
outer:for(var j = 0; j < 10; j++)
    for(var i = 0; i < j; i++)
        break /*no LineTerminator here*/ outter
```

- return 后面不能插入换行。
- 后自增，后自减运算符前不能插入换行。
- throw 和 Exception 之间不能插入换行。会报错`Uncaught SyntaxError: Illegal newline after throw`。
- async 关键字后面不能插入换行。
- 箭头函数箭头前，不能插入换行。
- yield 之后，不能插入换行。

### 不写分号注意情况

`no LineTerminator here`规则实际是为了保证自动插入分号符合预期，但是最初 JavaScript 设计遗漏了一些情况。所以需要注意它们。

1. 以括号开头的语句。会解析成函数调用。所以下面代码会报错。

```js
(function(a){
    console.log(a);
})()/* 这里没有被自动插入分号 */
(function(a){
    console.log(a);
})()
```

2. 以数组开头的语句。

```js
var a = [[]]/* 这里没有被自动插入分号 */
[3, 2, 1, 0].forEach(e => console.log(e))
```

上面代码被理解成了下标运输符和逗号表达式。这里不会报错，对代码调试是噩梦。

3. 以正则开头的语句。

```js
var x = 1, g = {test:()=>0}, b = 1/* 这里没有被自动插入分号 */
/(a)/g.test("abc")
console.log(RegExp.$1)
```

上面正则的`/`被理解成了除号。

4. 以 Template 开头的语句。

```js
var f = function(){
  return "";
}
var g = f/* 这里没有被自动插入分号 */
`Template`.match(/(a)/);
console.log(RegExp.$1)
```

我们知道 fn\`Template\` 是会执行函数的。上面代码被解析成了函数执行。

在实际项目中，如果不写分号，那么最好使用 eslint。


## 参考资料

- [重学前端](https://time.geekbang.org/column/article/87179)

