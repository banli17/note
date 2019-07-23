---
title: es5 + es6 读书笔记
---

1. js 数据类型有哪些？
2. typeof 的各种返回值? typeof v 不会报错
3. null 和 undefined 的区别？

null 和 undefined，在 if 语句中都会转为 false， == 相等

```js
// 根据c
Number(null) // 0
5 + null // 5

Number(undefined) // NaN
5 + undefined // NaN
```

null 是一个表示空的对象，转为数值为 0，undefined 表示未定义，转为数值为 NaN。

4. 下面运算符返回布尔值

前置逻辑运算符 !   
相等 === !== == !=
比较 > >= < <=

一些转换，如 if

下面是false
undefined
null
false
0
NaN
""或''（空字符串）


1. js 所有数字都是 64 位浮点数形式存储，包括整数，所以 1===1.0，如果需要整数计算，则js会将它转成32位整数。
2. 小数的比较和运算要特别小心
```
0.1 + 0.2 === 0.3   // false
0.3 / 0.1
(0.3 - 0.2) === (0.2 - 0.1)
```

字符串

多行字符串，最后用 \，\后面只能是换行符，不能有空格

转义字符: 需要用 \ 来转义的特殊字符

\0 : null(\u0000)
\b  后退键,\u0008
\f  换页符 \u000C
\n  换行符 \u000A
\r  回车符 \u0009
\v  垂直制表符  \u000B
\'  \u0027
\"  \u0022
\\  



\HHH ，三个8进制数(000 - 377 即 0 - 255)，HHH表示Unicode码，如\251表示版权符号，只能输出 256 个字符,表示一个字符
console.log('\777')  // ?7

\xHH，2个十六进制数，00-FF 也是256个， \xA9 是版权，表示一个字符
\uXXXX 4个十六进制数，0000-FFFF，表示一个字符 \u00A9

如果在非特殊字符前面使用反斜杠，则反斜杠会被省略。

字符数组

```js
var s = 'hello';
s[0] // "h"
s[1] // "e"
s[4] // "o"

// 超出索引或索引不存在
'abc'[3] // undefined
'abc'[-1] // undefined
'abc'['x'] // undefined

// 无法改变单个字符
var s = 'hello';

delete s[0];
s // "hello"

s[1] = 'a';
s // "hello"
```

str.length 无法修改


js 引擎内部，所有字符都是用 Unicode 表示。

解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 Unicode 形式表示。输出给用户的时候，所有字符都会转成字面形式。

```js
var f\u006F\u006F = 'abc';
console.log(foo, f\u006F\u006F) // "abc""
```

每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节。

UTF-16 有两种长度：对于码点在U+0000到U+FFFF之间的字符，长度为16位（即2个字节）；对于码点在U+10000到U+10FFFF之间的字符，长度为32位（即4个字节），而且前两个字节在0xD800到0xDBFF之间，后两个字节在0xDC00到0xDFFF之间。举例来说，码点U+1D306对应的字符为𝌆，它写成 UTF-16 就是0xD834 0xDF06。


base64 目的不是为了加密，而是为了不出现特殊字符。将任何字符转成 0～9、A～Z、a-z、+和/这64个字符 组成的可打印字符。
有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码。
btoa()：任意值转为 Base64 编码
atob()：Base64 编码转为原来的值
只能用于 ASCII码的字符，否则报错

将非ASICC码字符转成 base64
```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好') // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE') // "你好"
```

delete 删除不存在的属性也会返回true，删除不能删除的属性configurable:false 时返回false。无法删除继承属性

in 不能识别是自身的还是继承的，要用 hasOwnProperty 判断

for...in 遍历对象的所有可遍历(enumerable) 属性，会编译继承属性。

with 语句没有创建单独的作用域，如果对象没有这个属性，会创建全局变量。不利于除错和模块化，编译器页无法优化，只能留到运行时判断。

var f = function f() {};
这种写法的用处有两个，一是可以在函数体内部调用自身，二是方便除错（除错工具显示函数调用栈时，将显示函数名，而不再显示这里是一个匿名函数）函数的表达式需要在语句的结尾加上分号，表示语句结束。

```js
var f = function () {
  console.log('1');
}

function f() {
  console.log('2');
}

f() // 1
```

```
var f3 = function myName() {};
f3.name // 'myName'
```

获取参数函数的名字

```
var myFunc = function () {};

function test(f) {
  console.log(f.name);
}

test(myFunc) // myFunc
```

length是行参的个数，可以利用它实现重载

函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。

```
var x = function () {
  console.log(a);
};

function y(f) {
  var a = 2;
  f();
}

y(x)
// ReferenceError: a is not defined
```

同名参数取最后出现的值

```
function f(a, a) {
  console.log(a);
}

f(1, 2) // 2
```

正常模式下 arguments 对象可以修改，严格模式下，修改后和实际参数不会联动。

```js
var f = function(a, b) {
  'use strict'; // 开启严格模式
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

f(1, 1) // 2
```

arguments对象带有一个callee属性，返回它所对应的原函数。严格模式下禁用。

闭包的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中，即闭包可以使得它诞生环境一直存在。

IIFE，JavaScript 引擎规定，如果function关键字出现在行首，一律解释成语句。因此，JavaScript 引擎看到行首是function关键字之后，认为这一段都是函数的定义，不应该以圆括号结尾，所以就报错了。

eval命令接受一个字符串作为参数，并将这个字符串当作语句执行。如果参数字符串无法当作语句运行，那么就会报错。放在eval中的字符串，应该有独自存在的意义，不能用来与eval以外的命令配合使用。

```js
eval('var a = 1;');
a // 1

eval('3x') // Uncaught SyntaxError: Invalid or unexpected token
eval('return;'); // Uncaught SyntaxError: Illegal return statement return不能单独使用，必须在函数中使用。
```

如果eval的参数不是字符串，那么会原样返回。
```
eval(123) // 123
```

eval没有自己的作用域，都在当前作用域内执行，因此可能会修改当前作用域的变量的值，造成安全问题。

为了防止这种风险，JavaScript 规定，如果使用严格模式，eval内部声明的变量，不会影响到外部作用域。不过，即使在严格模式下，eval依然可以读写当前作用域的变量。

eval不利于引擎优化执行速度
引擎在静态代码分析的阶段，根本无法分辨执行的是eval。，eval别名调用
为了保证eval的别名不影响代码优化，JavaScript 的标准规定，凡是使用别名执行eval，eval内部一律是全局作用域。

```
var a = 1;

function f() {
  var a = 2;
  var e = eval;
  e('console.log(a)');
}

f() // 1
```

上面代码中，eval是别名调用，所以即使它是在函数中，它的作用域还是全局作用域，因此输出的a为全局变量。这样的话，引擎就能确认e()不会对当前的函数作用域产生影响，优化的时候就可以把这一行排除掉。

本质上，数组属于一种特殊的对象。typeof运算符会返回数组的类型是object。

JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。

```js
var arr = ['a', 'b', 'c'];

arr['0'] // 'a'
arr[0] // 'a'
```
注意，这点在赋值时也成立。一个值总是先转成字符串，再作为键名进行赋值。

```js
var a = [];

a[1.00] = 6;
a[1] // 6
```

对于数值的键名，不能使用点结构。arr.0的写法不合法，因为单独的数值不能作为标识符

如果人为设置length为不合法的值，JavaScript 会报错。

由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响length属性的值。
如果数组的键名是添加超出范围的数值，该键名会自动转为字符串。

```js
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';

arr.length // 0
arr[-1] // "a"
arr[4294967296] // "b"
```

检查某个键名是否存在的运算符in，适用于对象，也适用于数组。
for...in不仅会遍历数组所有的数字键，还会遍历非数字键。所以不推荐用它遍历。

数组的空位，可以读取是 undefined
使用delete命令删除一个数组成员，会形成空位，并且不会影响length属性。

```
var a = [, , ,];
```

数组的某个位置是空位，与某个位置是undefined，是不一样的。如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过。

```
var a = [, , ,];

a.forEach(function (x, i) {
  console.log(i + '. ' + x);
})
// 不产生任何输出

for (var i in a) {
  console.log(i);
}
// 不产生任何输出

Object.keys(a)
// []
```
“类似数组的对象”的根本特征，就是具有length属性。只要有length属性，就可以认为这个对象类似于数组。但是有一个问题，这种length属性不是动态值，不会随着成员的变化而变化。
典型的“类似数组的对象”是函数的arguments对象，以及大多数 DOM 元素集，还有字符串。

var arr = Array.prototype.slice.call(arrayLike);

```js
// forEach 方法
function logArgs() {
  Array.prototype.forEach.call(arguments, function (elem, i) {
    console.log(i + '. ' + elem);
  });
}

// 等同于 for 循环
function logArgs() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(i + '. ' + arguments[i]);
  }
}
```

```
Array.prototype.forEach.call('abc', function (chr) {
  console.log(chr);
});
// a
// b
// c
```

注意，这种方法比直接使用数组原生的forEach要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的forEach方法。

```js
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
  console.log(chr);
});
```

运算符 

```js
true + true // 2
1 + true // 2

// 由于从左到右的运算次序，字符串的位置不同会导致不同的结果。
'3' + 4 + 5 // "345"
3 + 4 + '5' // "75"

// 减法、除法和乘法运算符，都是将字符串自动转为数值，然后再运算。

// 如果运算子是对象，必须先转成原始类型的值，然后再相加。
var obj = { p: 1 };
obj + 2 // "[object Object]2"
```

对象转原始类型的值，规则如下：
1. 调用对象的 valueOf()，一般来说，对象的valueOf方法总是返回对象自身，如果自定义返回了原始类型的值，则不再调用 toString
2. 调用对象的 toString() 转为字符串

```
var obj = { p: 1 };
obj.valueOf().toString() // "[object Object]"
```

特例，是日期 Date，会先调用 toString，再调用 valueOf。因为日期本来应该是字符串？

```js
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };

obj + 2 // "hello2"
```

余数运算符，需要注意的是，运算结果的正负号由第一个运算子的正负号决定。所以，为了得到负数的正确余数值，可以先使用绝对值函数。

```js
-1 % 2 // -1
1 % -2 // 1

// 错误的写法
function isOdd(n) {
  return n % 2 === 1;
}
isOdd(-5) // false
isOdd(-4) // false

// 正确的写法
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}
isOdd(-5) // true
isOdd(-4) // false

// 余数运算符还可以用于浮点数的运算。但是，由于浮点数不是精确的值，无法得到完全准确的结果。
6.5 % 2.1
// 0.19999999999999973

// 数值运算符的作用在于可以将任何值转为数值（与Number函数的作用相同）
+true // 1
+[] // 0
+{} // NaN

// 负数值运算符（-），也同样具有将一个值转为数值的功能，只不过得到的值正负相反。连用两个负数值运算符，等同于数值运算符。
var x = 1;
-x // -1
-(-x) // 1

// 指数运算符是右结合，而不是左结合
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

相等比较和非相等比较。两者的规则是不一样的，对于非相等的比较，算法是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小。

=== 
- 如果是复合类型，比较的是地址
- 如果是基本类型，比较的是值,

```js
1 === 0x1 // true
1 === 1.0
NaN === NaN  // false
+0 === -0 // true

var v1;
var v2;
v1 === v2 // true
undefined === undefined // true
null === null // true
```

== 
- 基本类型，数据类型不同，非false 转为数字比较 Number
- 对象与原始类型值比较，对象转成原始类型再比较
- undefined和null与其他类型的值比较时，结果都为false，它们互相比较时结果为true。

```js
false == null // false
false == undefined // false

0 == null // false
0 == undefined // false

undefined == null // true

0 == ''             // true
0 == '0'            // true

2 == true           // false
2 == false          // false

false == 'false'    // false
false == '0'        // true

false == undefined  // false
false == null       // false
null == undefined   // true

' \t\r\n ' == 0     // true
```

throw可以抛出任何类型的值，对于 JavaScript 引擎来说，遇到throw语句，程序就中止了。
catch代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

```js
try {
  throw "出错了";
} catch (e) {
  console.log(e);
}
console.log(222);
//  出错了
//  222

try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.log(e.name + ": " + e.message);
  } else if (e instanceof RangeError) {
    console.log(e.name + ": " + e.message);
  }
  // ...
}
```

finally

```js
function cleansUp() {
  try {
    throw new Error('出错了……');
    console.log('此行不会执行');
  } finally {
    console.log('完成清理工作');
  }
} 

cleansUp() 
console.log('由于没有catch语句块，一旦发生错误，代码就会中断执行。中断执行之前，会先执行finally代码块，然后再向用户提示报错信息。')
```

return语句里面的count的值，是在finally代码块运行之前就获取了。

```js
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
// 0
count
// 1
```

应用场景

```js
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

顺序: try catch 的return 会等到 finally 后面执行，finally 的return 覆盖了前面的。注意这是在 try catch 语句中才这样。

```js
function f() {
    try {
      console.log(0);
      //throw 'bug';
      return 1  
    } catch(e) {
      console.log(1);
      return true; // 这句原本会延迟到 finally 代码块结束再执行
      console.log(2); // 不会运行
    } finally {
      console.log(3);
      return false; // 这句会覆盖掉前面那句 return
      console.log(4); // 不会运行
    }
  
    console.log(5); // 不会运行
  }
  
  var result = f();
  // 0
  // 3
  
  console.log(result)
  // false
```

catch代码块之中，触发转入finally代码快的标志，不仅有return语句，还有throw语句。
```js
function f() {
  try {
    throw '出错了！';
  } catch(e) {
    console.log('捕捉到内部错误');
    throw e; // 这句原本会等到finally结束再执行
  } finally {
    return false; // 直接返回
  }
}

try {
  f();
} catch(e) {
  // 此处不会执行
  console.log('caught outer "bogus"');
}

//  捕捉到内部错误
```

只有下一行的开始与本行的结尾，无法放在一起解释，JavaScript 引擎才会自动添加分号。

```js
// 引擎解释为 c(d+e)
var a = b + c
(d+e).toString();

// 引擎解释为 a = b/hi/g.exec(c).map(d)
// 正则表达式的斜杠，会当作除法运算符
a = b
/hi/g.exec(c).map(d);

// 解释为'b'['red', 'green']，
// 即把字符串当作一个数组，按索引取值
var a = 'b'
['red', 'green'].forEach(function (c) {
  console.log(c);
})

// 解释为 function (x) { return x }(a++)
// 即调用匿名函数，结果f等于0
var a = 0;
var f = function (x) { return x }
(a++)
```

debugger 语句


位运算符

位运算只对整数有效。js 数都是 64位浮点数存储，做位运算时，都会转成 32位。

```js
// 将数转为整数
function toInt32(x) {
  return x | 0;
}

toInt32(1.001) // 1
toInt32(1.999) // 1
toInt32(1) // 1
toInt32(-1) // -1
toInt32(Math.pow(2, 32) + 1) // 1
toInt32(Math.pow(2, 32) - 1) // -1
```

二进制或

```js
0 | 3 // 3
00  11 -> 11

// 位运算只对整数有效，遇到小数时，会将小数部分舍去，只保留整数部分。
2.9 | 0  -> 2
-2.9 | 0 -> -2

// 这种取整方法不适用超过32位整数最大值2147483647的数。
2147483649.4 | 0;
// -2147483647
```

二进制与
```js
0 & 3 // 0
00  11 -> 00
```

二进制否运算符: 每个二进制位 0 变为 1，1 变为 0

```js
~ 3 // -4
```

3的32位整数形式是00000000000000000000000000000011，二进制否运算以后得到11111111111111111111111111111100。由于第一位（符号位）是1，所以这个数是一个负数。JavaScript 内部采用补码形式表示负数，即需要将这个数减去1，再取一次反，然后加上负号，才能得到这个负数对应的10进制值。这个数减去1等于11111111111111111111111111111011，再取一次反得到00000000000000000000000000000100，再加上负号就是-4。考虑到这样的过程比较麻烦，可以简单记忆成，一个数与自身的取反值相加，等于-1。

对一个整数连续两次二进制否运算，得到它自身。

```
~~3 // 3

~~2.9 // 2
~~47.11 // 47
~~1.9999 // 1
~~3 // 3
```

对其它类型，JavaScript 引擎会先调用Number函数，将字符串转为数值。

```js
// 相当于~Number('011') -> 11
~'011'  // -12

// 相当于~Number('42 cats') -> NaN -> 0
~'42 cats' // -1

// 相当于~Number('0xcafebabe')
~'0xcafebabe' // 889275713

// 相当于~Number('deadbeef')
~'deadbeef' // -1

// 相当于 ~Number([])
~[] // -1

// 相当于 ~Number(NaN)
~NaN // -1

// 相当于 ~Number(null)
~null // -1
```

异或运算（^）在两个二进制位不同时返回1，相同时返回0。

```js
0 ^ 3 // 3
00 11 -> 11
```

异或运算也可以用来取整。

```js
12.9 ^ 0 // 12
```

左移运算符（<<）表示将一个数的二进制值向左移动指定的位数，尾部补0，即乘以2的指定次方。向左移动的时候，最高位的符号位是一起移动的。

```js
// 4 的二进制形式为100，
// 左移一位为1000（即十进制的8）
// 相当于乘以2的1次方
4 << 1
// 8

-4 << 1
// -8
```

上面代码中，-4左移一位得到-8，是因为-4的二进制形式是11111111111111111111111111111100，左移一位后得到11111111111111111111111111111000，该数转为十进制（减去1后取反，再加上负号）即为-8。

如果左移0位，就相当于将该数值转为32位整数，等同于取整，对于正数和负数都有效。

```js
13.5 << 0
// 13

-13.5 << 0
// -13
```

```js
var color = {r: 186, g: 218, b: 85};

// RGB to HEX
// (1 << 24)的作用为保证结果是6位数
var rgb2hex = function(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16) // 先转成十六进制，然后返回字符串
    .substr(1);   // 去除字符串的最高位，返回后面六个字符串
}

rgb2hex(color.r, color.g, color.b)
// "#bada55"
```


右移运算符（>>）表示将一个数的二进制值向右移动指定的位数。如果是正数，头部全部补0；如果是负数，头部全部补1。右移运算符基本上相当于除以2的指定次方（最高位即符号位参与移动）。

```js
4 >> 1
// 2
/*
// 因为4的二进制形式为 00000000000000000000000000000100，
// 右移一位得到 00000000000000000000000000000010，
// 即为十进制的2
*/

-4 >> 1
// -2
/*
// 因为-4的二进制形式为 11111111111111111111111111111100，
// 右移一位，头部补1，得到 11111111111111111111111111111110,
// -1 取反，加负号   11111111111111111111111111111101 -> 10000000000000000000000010
// 即为十进制的-2
*/
```

右移运算可以模拟 2 的整除运算。

```js
5 >> 1
// 2
// 相当于 5 / 2 = 2

21 >> 2
// 5
// 相当于 21 / 4 = 5

21 >> 3
// 2
// 相当于 21 / 8 = 2

21 >> 4
// 1
// 相当于 21 / 16 = 1
```

头部补零的右移运算符，不用考虑符号，都转为正数

```js
4 >>> 1
// 2

-4 >>> 1
// 2147483646
/*
// 因为-4的二进制形式为11111111111111111111111111111100，
// 带符号位的右移一位，得到01111111111111111111111111111110，
// 即为十进制的2147483646。
*/
```

这个运算实际上将一个值转为32位无符号整数。
查看一个负整数在计算机内部的储存形式，最快的方法就是使用这个运算符。

```
-1 >>> 0 // 4294967295
// 11111111111111111111111111111111 即 2^32 -1
```

就来看看~1的计算步骤：

将1(这里叫：原码)转二进制 ＝ 00000001
按位取反 ＝ 11111110
发现符号位(即最高位)为1(表示负数)，将除符号位之外的其他数字取反 ＝ 10000001
末位加1取其补码 ＝ 10000010
转换回十进制 ＝ -2


## 标准库

### Object

```js
'foo' instanceof String  // false
Object('foo') instanceof String // true  转换为包装对象
```

Object() 当函数使用
1. 如果参数为null/undefined，则返回一个空对象
1. 如果参数是原始类型，则返回包装对象
1. 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。

所以可以写一个函数，判断变量是否是对象

```js
function isObject(value) {
  return value === Object(value);
}

isObject([]) // true
isObject(true) // false
```

Object构造函数，new Object()，可以接收一个参数，和当函数使用一样。但是语义不同，一个是转换，一个是新生成。

```js
var o1 = {a: 1};
var o2 = new Object(o1);
o1 === o2 // true 直接返回这个对象

var obj = new Object(123);
obj instanceof Number // true
```

Object.keys() 自身属性名，可枚举
Object.getOwnPropertyNames(obj) 自身属性名，不可枚举也返回

```js
Object.getOwnPropertyNames(a.__proto__)
// (12) ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "isPrototypeOf", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "toLocaleString"]
Object.keys(a.__proto__)
// []

var a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替。

（1）对象属性模型的相关方法

Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
Object.defineProperty()：通过描述对象，定义某个属性。
Object.defineProperties()：通过描述对象，定义多个属性。
（2）控制对象状态的方法

Object.preventExtensions()：防止对象扩展。
Object.isExtensible()：判断对象是否可扩展。
Object.seal()：禁止对象配置。
Object.isSealed()：判断一个对象是否可配置。
Object.freeze()：冻结一个对象。
Object.isFrozen()：判断一个对象是否被冻结。
（3）原型链相关方法

Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
Object.getPrototypeOf()：获取对象的Prototype对象。


valueOf方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

```js
var obj = new Object();
obj.valueOf() === obj // true
```

toString方法的作用是返回一个对象的字符串形式，默认情况下返回类型字符串。

数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。

```js
[1, 2, 3].toString() // "1,2,3"

'123'.toString() // "123"

(function () {
  return 123;
}).toString()
// "function () {
//   return 123;
// }"

(new Date()).toString()
// "Tue May 10 2016 09:11:31 GMT+0800 (CST)"
```

上面代码中，数组、字符串、函数、Date 对象调用toString方法，并不会返回[object Object]，因为它们都自定义了toString方法，覆盖原始方法。

Object.prototype.toLocaleString方法与toString的返回结果相同，也是返回一个值的字符串形式。这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。

```
var person = {
  toString: function () {
    return 'Henry Norman Bethune';
  },
  toLocaleString: function () {
    return '白求恩';
  }
};

person.toString() // Henry Norman Bethune
person.toLocaleString() // 白求恩
```

目前，主要有三个对象自定义了toLocaleString方法。

Array.prototype.toLocaleString()
Number.prototype.toLocaleString()
Date.prototype.toLocaleString()
举例来说，日期的实例对象的toString和toLocaleString返回值就不一样，而且toLocaleString的返回值跟用户设定的所在地域相关。

```
var date = new Date();
date.toString() // "Tue Jan 01 2018 12:01:33 GMT+0800 (CST)"
date.toLocaleString() // "1/01/2018, 12:01:33 PM"
```


Object.prototype.hasOwnProperty() 表示对象自身是否具有某属性


```js
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double() // 246
```


注意

```js
if (Boolean(false)) {
  console.log('true');
} // 无输出

if (new Boolean(false)) {
  console.log('true');
} // true

if (Boolean(null)) {
  console.log('true');
} // 无输出

if (new Boolean(null)) {
  console.log('true');
} // true
```

字符串在js中的存储，码点大于 0xFFFF 时。

注意，该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）。

String.fromCharCode(0x20BB7)
// "ஷ"
String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
// true
上面代码中，String.fromCharCode参数0x20BB7大于0xFFFF，导致返回结果出错。0x20BB7对应的字符是汉字𠮷，但是返回结果却是另一个字符（码点0x0BB7）。这是因为String.fromCharCode发现参数值大于0xFFFF，就会忽略多出的位（即忽略0x20BB7里面的2）。

这种现象的根本原因在于，码点大于0xFFFF的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把0x20BB7拆成两个字符表示。

String.fromCharCode(0xD842, 0xDFB7)
// "𠮷"
上面代码中，0x20BB7拆成两个字符0xD842和0xDFB7（即两个两字节字符，合成一个四字节字符），就能得到正确的结果。码点大于0xFFFF的字符的四字节表示法，由 UTF-16 编码方法决定。