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

## 脚本与模块

JavaScript 有两种源文件，一种叫脚本，一种叫模块(ES6)。脚本可以在浏览器或 node 环境执行，模块只能由 import 引入执行。
脚本是主动执行的代码，而模块是被调用执行的代码。实际上，区别脚本或模块，可以看是否包含 import 和 export。

script 标签可以引入脚本或模块，如果要引入模块，需要加`type="module"`。

```js
<script type="module" src="xxxxx.js"></script>
```

上面代码，如果不加`type="module"`，浏览器认为这是一个脚本，而不是模块，所以如果里面写了 export，就会报错。

脚本可以包含语句，而模块可以包含语句、import 声明和 export 声明。

### import 声明

`import`声明有两种用法。

```js
import 'mod'         // 引入模块
import v from 'mod'  // 将模块导出的默认值赋给变量v
```

单纯引入模块，只是为了执行模块。带 from，则是将模块的信息变成本地变量使用。

带 from 的 import 又细分为三种用法。

```js
import x from "./a.js"    // 1.引入默认值
import {a as x, modify} from './a.js'  // 2.引入模块中的变量
import * as x from './a.js'    // 3.将模块所有变量以属性形式挂在对象x上

// 第一种方式还可以与后面两种混合使用,语法要求不带 as 的默认值永远在最前面
import d, {a as x, modify} from './a.js'
import d, * as x from './a.js'
```

注意，这里的变量仍然受原来模块的控制。

### export 声明

`export`的用法有下面几种:

1、`export`后面跟变量名列表，如`export {a, b, c}`。

2、`export`可以加在任何声明语句前，如 var、function(含 async 和 generator)、class、let、const。

3、`export default`,导出一个默认值

`export default`可以用于`class`、`function`和表达式。这里导出的变量没有名字，可以用`import x from './a.js'` 语法引入。

当它导出一个变量时，实际上会导出变量的值，之后对变量重新赋值，不影响导出的值。

**a.js**

```js
let a = 1
function modify(){
    a = 2
}
export default a
```

**b.js**

```js
import a from './a.js'
a  // 1
modify()
a  // 1
```

当然，如果导出的是对象，可以给对象添加属性。

**a.js**

```js
let a = {}
function modify(){
    a.x = 1
}
export default a
```

**b.js**

```js
import a from './a.js'
a  // {}
modify()
a  // {x:1}
```

4、`export from`语法，从文件导出。

**x.js**

```js
export a from 'a.js'
export b from 'b.js'
```

**main.js**

```
import {a, b} from 'x.js'
```

### 函数体

宏任务可能会执行的代码包括脚本、模块和函数体。

函数体多了 return 语句，函数体可以分为四种：

1. 普通函数体
2. 异步函数体
3. 生成器函数体
4. 异步生成器函数体

它们的区别在于，能否使用 await 或 yield 语句。


### 预处理

JavaScript 执行前，会对脚本、模块和函数体中的语句进行预处理。预处理过程会提前处理`var/let/const`、`function/class`。

```js
var a = 1;

function foo() {
    var o= {a:3}
    with(o) {
        var a = 2;
    }
    console.log(o.a);   // 2
    console.log(a);     // undefined
}

foo();
```

function 声明出现在 if 等语句中时，只会提前声明，不再提前赋值。

class 声明前使用 class 名，会报错。它也会预处理，但是在声明前访问会报错。另外 class 声明不会穿透 if 等语句结构，所以只有写在全局才有声明作用。

```js
var c = 1;
function foo(){
    console.log(c);   // Uncaught ReferenceError: Cannot access 'c' before initialization
    class c {}
}
foo();
```

### 指令序言

脚本和模块都支持指令序言(Directive Prologs)。它规定了给 JavaScript 代码添加元信息的方式。"use strict"是标准中规定的唯一一种指令序言。但指令序言的目的，是为了给引擎和实现者一些统一的表达方式，在静态扫描时指定代码的一些特性。

指令序言只能出现在脚本、模块和函数体的最前面。否则，它不是指令序言。

```js
function doSth(){
    //......
}
"use strict";  // 不是指令序言
var a = 1;
//......
```

## 语句

语句
声明

## 表达式语句

## 参考资料

- [重学前端](https://time.geekbang.org/column/article/87179)

