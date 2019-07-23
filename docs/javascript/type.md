---
id: type
title: "javascript 数据类型"
sidebar_label: 数据类型
---

## 简介

Javascript 语义规定了 7 种数据类型：

- Undefined
- Null
- Boolean
- String
- Number
- Symbol
- Object

前6个也叫做原始(Primitive)类型或基本类型。

## Undefined、Null

Undefined 表示未定义，在变量赋值之前，它是 Undefined 类型，值为 undefined。但是 javascript 中 undefined 是一个变量，而不是关键字。所以可能被修改。

```js
function a() {
    var undefined = 12
    console.log(undefined)  
}
a()

var undefined = 12
console.log(undefined) 
```

上面的代码，在 Chrome/75.0.3770.80 下输出 `12`、`undefined`。在 node v12.3.1 下输出`12`、`12`。可以看出，undefined 是有可能被修改的。所以可以使用`void 0`来代替 `undefined`。

`void`操作符会执行表达式，并返回 `undefined`。它通常用来获取原始的 undefined，或阻止 a 链接的点击。

```js
void (2 == '2'); // void (2 == '2'), returns undefined

void 2 == '2';   // (void 2) == '2', returns false

<a href="javascript:void(0);">
  当用户点击一个以 javascript: URI 时，它会执行URI中的代码,
  然后用返回的值替换页面内容，除非返回的值是undefined
  如果去掉 void()，点击之后整个页面会被替换成一个字符 0
</a>
```

Null 表示定义了但是为空，它只有一个值 null。可以放心使用 null，因为它是一个关键字。

`typeof null`会返回`object`，但是它并非对象，而是 JS 设计时的一个 Bug，JS 最初使用的是 32 位系统，为了性能考虑，使用地位存储变量的类型信息，`000`开头表示对象，然而`null`表示为全零，所以它被错误判断为`object`。虽然现在内部类型判断已经改变了，但是这个 Bug 一直都在。

> 面试题：原始类型有哪几种？null 是对象嘛？

## Boolean

Boolean 类型有两个值，true 和 false。在转换时只有下面 6 个值为 false，其余都为 true。

- 布尔值`false`
- 空字符串`'' 或 ""`
- `0(包括+0、-0)`
- `NaN`
- `undefined`
- `null`

## String

Javascript 字符串是以 UTF16 编码的，字符串的最大长度是 2^53 - 1，它并不是字符数，而是受字符串编码长度影响。Javascript 字符串把每个 UTF16 单元当作一个字符来处理，所以非 BMP 字符(Unicode 码点超出 U+0000 - U+FFFF区间,即超出 0-65536)会当作两个 UTF16 单元。

这样的设计是为了性能和实现起来更加简单。因为现实中很少用到 BMP 之外的字符。

## Number

JavaScript中的Number类型有 18437736874454810627 (即2^64-2^53+3) 个值。JavaScript 中的 Number 类型基本符合 IEEE 754-2008 规定的双精度浮点数规则，但是JavaScript为了表达几个额外的语言场景(比如不让除以0出错，而引入了无穷大的概念)，规定了几个例外情况:

- `NaN`，占用了 9007199254740990，这原本是符合 IEEE 规则的数字。
- `Infinity`
- `-Infinity`

注意，除法时，除以-0，会得到-Infinity。区分+0和-0的方式就是检测 1/x 是 Infinity 还是 -Infinity。

```
var a = -0
a.toString()  // 0

1/a   // -Infinity
```

根据双精度浮点数的定义，Number类型中有效的整数范围是-0x1fffffffffffff至0x1fffffffffffff，所以Number 无法精确表示此范围外的整数。

同样根据浮点数的定义，非整数的Number类型无法用 ==(===也不行) 来比较，这也正是为什么在JavaScript中，0.1+0.2!=0.3，正确的比较方法是:

```
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON   // true
```

检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。

### Number、parseInt、parseFloat

Number() 可以将字符串转换成数字。如果参数无法被转换为数字，则返回 NaN。

```js
// 转换日期
new Date("December 17, 1995 03:24:00").getTime() //819141840000
new Date("December 17, 1995 03:24:00").valueOf() //819141840000
Number(new Date("December 17, 1995 03:24:00"))  //819141840000

Number('.1') // 0.1
Number('hello') // NaN
```

`parseInt(string, radix)`用于将字符串以 radix 进制转为 10 进制，radix 介于 2-36 之间，未指定时默认为 10。如果参数不是字符串，将其转为字符串。它遇到非数值字符就终止。如果第一个字符就是非数值，则返回 NaN。

当 radix 为 undefined、0 或 未指定情况时，如果：
- 字符串以 0x 或 0X 开头，则 radix 为 16。
- 字符串以 0 开头，radix 为 8 或 10，具体看浏览器实现。
- 字符串以其它值开头，radix 为 10。

```js
parseInt('123', 5) // 将'123'看作5进制数，返回十进制数38 => 1*5^2 + 2*5^1 + 3*5^0 = 38

// 下面例子都返回 15
parseInt("0xF", 16);
parseInt("F", 16);
parseInt("17", 8);
parseInt(021, 8);
parseInt("015", 10);   // parseInt(015, 10); 返回 15
parseInt(15.99, 10);
parseInt("15,123", 10);
parseInt("FXX123", 16);
parseInt("1111", 2);
parseInt("15 * 3", 10);
parseInt("15e2", 10);
parseInt("15px", 10);
parseInt("12", 13);

// 下面例子都返回NaN
parseInt("Hello", 8); // 根本就不是数值
parseInt("546", 2);   // 除了“0、1”外，其它数字都不是有效二进制数字

// 下面例子返回4
parseInt(4.7, 10);
parseInt(4.7 * 1e22, 10); // Very large number becomes 4
parseInt(0.00000000000434, 10); // Very small number becomes 4
```

`parseFloat()` 将它的字符串参数解析成为浮点数并返回.如果在解析过程中遇到了正负号(+或-),数字(0-9),小数点,或者科学记数法中的指数(e或E)以外的字符,则它会忽略该字符以及之后的所有字符,返回当前已经解析到的浮点数.同时参数字符串首位的空白符会被忽略.

```js
parseFloat('e')   // NaN
parseFloat('1e3') // 1000
```

> ['1', '2', '3'].map(parseInt) what & why ?

相当于下面的代码：

```js
['1','2','3'].map((item, i)=>{
    return parseInt(item, i)
})
// item i -> 结果
// '1' 0  -> 1
// '2' 1  -> radix 为 2-36之间，NaN
// '3' 2  -> 2进制没有3， NaN
// 最终输出 [1, NaN, NaN]
```


## Symbol

Symbol 是具有字符串类型的描述，它是唯一的，即使描述相同，也不相等。

```js
var s = Symbol('hello')
```

可以使用 Symbol.iterator 来自定义 for...of 在对象上的行为。

```js
var o = {
    name: 'zs',
    age: 32,
    [Symbol.iterator]: function () {
        let i = 0
        return {
            next: function () {
                return {
                    value: i++,
                    done: i > 3
                }
            }
        }
    }
}

for (let i of o) {
    console.log(i)   // 0 1 2
}
```

## Object

### 普通对象

对象是属性的集合，属性分为数据属性和访问器属性，二者都是key-value结构，key 可以是字符串或 Symbol 类型。

javascript 中的类，实际是运行时对象的一个私有属性，而 javascript 是无法自定义类型的。

> 涉及面试题：对象类型和原始类型的不同之处？函数参数是对象会发生什么问题？

原始类型存储的是值，赋值时，会复制值。

```js
var a = 1
var b = a
b // 1
```

上面 a 赋值给 b 时，会将值 1 复制给 b。

对象类型存储的是指针，当存储对象时，计算机会在内存中新开辟一个空间来存放值，对象类型存储的是这个空间地址。赋值时，是复制的地址。

```js
var a = []
var b = a
a.push(1)
b  // [1]
```

上面代码中，a 实际是一个空间地址，将 a 赋值给 b 时，是将空间地址给 b。所以使用 push 改变空间值后，b 也会变化。

函数传参是对象时，实际会将地址传递给局部参数变量。

```js
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> { name: 'yck', age: 26 }
console.log(p2) // -> { name: 'yyy', age: 30 }
```

上面代码将 p1 传递给 test 时，person 就是 p1 执行的空间，






> 为什么给对象添加的方法能用在基本类型上？

`.` 运算符提供了装箱操作，会根据基础类型创建一个临时对象，使得我们可以在基本类型上调用对象的方法。。Number、String、Boolean 使用 new 时，会产生对象。当直接调用时，表示强制转换类型。Symbol 使用 new 会报错，但是它仍然 Symbol 对象的是构造器。

```js
var o = {
    name: 'zs',
    age: 32,
    [Symbol.iterator]: function () {
        let i = 0
        return {
            next: function () {
                return {
                    value: i++,
                    done: i > 3
                }
            }
        }
    }
}

for (let i of o) {
    console.log(i)   // 0 1 2
}
```

> 涉及面试题：对象类型和原始类型的不同之处？函数参数是对象会发生什么问题？

## 类型判断

### typeof()

javascript 类型是很有争议的，typeof 和运行时类型有些不一致。typeof 设计有缺陷，但是错过了修正它的时机。

示例|typeof 结果|运行时类型行为
---|---|---
null|object|Null
{}|object|Object
(function(){})|function|Object
3|number|Number
'ok'|string|String
true|boolean|Boolean
void|undefined|Undefined
Symbol('a')|symbol|Symbol

### instanceof

instanceof 可以判断某个对象是否是类的实例。

```js
[] instanceof Array
{} instanceof Object
```

对于基本类型，它是无法正确判断的。当然可以用下面方法：

```js
class PrimitiveString{
    static [Symbol.hasInstance](x){
        return typeof x === 'string'
    }
}

'hello' instanceof Primitivestring  // true
```

`Symbol.hasInstance`可以让我们自定义 instanceof 的行为。所以上面`'hello' instanceof Primitivestring`结果返回 true。这也可以看出 instanceof 不是十分可靠。

另外，如果页面里嵌套了 iframe，将无法使用 instanceof 判断跨文档的对象，比如`父页面中的数组 instanceof iframe的Array`将返回 false，因为父页面的 window.Array 和 iframe 里的 window.Array 不是同一个。


### Object.prototype.toString()

`Object.prototype.toString.call()`可以准确的判断数据的类型，在下面装箱转换详细说。

## 类型转换

不要使用 == 进行判断，因为它的规则太复杂，属于设计失误，很多实践都进制使用它。

JS 中类型转换只有三种情况，分别是：

- 转换为布尔值
- 转换为 Number
- 转换为 String 

### toBoolean

转布尔值很简单。除了下面这 6 个，其它都是 true。

- false
- '' 或 ""
- undefined
- null
- 0(含+0、-0)
- NaN

### StringToNumber

字符串转数字，存在一个语法结构，类型转换支持十进制、二进制、八进制、十六进制，如:
- 30
- 0b111
- 0o13
- 0xFF

还支持正负号科学计数法。
- 1e3 (1000)
- -1e-2 (-0.01)

`parseInt()` 在不传入第二个参数情况下，只支持16进制前缀`0x`，而且忽略非数字字符，不支持科学计数法。在一些浏览器上，还支持0开头的数作为8进制前缀，这是很多错误的来源。所以任何情况下，都建议传入第二个参数。parseFloat 会将原字符串作为十进制解析，不会引入任何其它进制。

```js
parseInt(0x11)  // 17
parseInt('011')   // 11  
parseInt(011)     // 9

parseFloat('1e2')   // 100
parseFloat('1ae2')  // 1
parseFloat('0x11')  // 0
```

多数情况下，使用 `Number` 比 `parseInt` 和 `parseFloat` 更好。

### NumberToString

在较小的范围内，数字到字符串的转换是完全符合你直觉的十进制表示。当Number绝对值较大或者较小时，字符串表示则是使用科学计数法表示的。这个算法细节繁多，我们从感性的角度认识，它其实就是保证了产生的字符串不会过长。

```js
0x11.toString()  // 17
```

注：基本类型的隐式转换貌似是内部进行的。并没有调用 toString 或 String 方法。

```js
var nf = Number.prototype.toString
var s = String 
String = function(...args){
    console.log('called String')
    return s(...args)
}
Number.prototype.toString = function (...args) {
    console.log('called number toString')
    return nf.call(this, ...args)
}
2.1 + ''  // 无输出console
```

### 运算符

四则运算符会触发数据类型的转换。规律是:

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

```js
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"

'a' + + 'b' // -> "aNaN" 因为 +'b' 是 NaN

+ '1' // 1
+ new Date() // 1563891201093

4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```

比较运算符

- 如果是对象，就通过 toPrimitive 转换对象
- 如果是字符串，就通过 unicode 字符索引来比较

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return -2
  }
}
a > -1 // true
```

上面代码，a 会首先通过 valueOf() 转换为原始类型，即数字 0，然后再和 -1 进行比较。


### 装箱转换

基本类型存储的是值，是没有方法可以调用的。比如`null.toString()`会报错。但是为什么`(100).toString()`可以呢？这涉及到 JS 自带的装箱转换。

装箱转换，就是把基本类型转换为对应的对象。所以对于`(100).toString()`，实际上 JS 会将100进行装箱转换，变成对象`new Number(100)`。

每次装箱都会新建一个对象，所以给基本类型添加属性是无效的。

```js
var a = 1
a.id = 'hello'
a.id  // undefined
```

Number、String、Boolean、Symbol 都有对应的类。

Symbol 的装箱操作，可以使用下面方法：

```js
var symbolObj = (function(){ return this }).call(Symbol('a'))

typeof symbolObj   // object
symbolObj instanceof Symbol // true
symbolObj.constructor    // Symbol
```

装箱机制会频繁产生临时对象，在一些性能高的场景下，应该避免对基本类型做装箱转换。

使用内置的 Object() 函数，也可以显示调用装箱能力。

```js
var symbolObj = Object(Symbol('a'))

typeof symbolObj   // object
symbolObj instanceof Symbol // true
symbolObj.constructor    // Symbol

Object.prototype.toString.call(symbolObj)  // [object Symbol]
```

Object.prototype.toString 可以准确识别对象对应的基本类型。比instance 更加准确。但是 call 本身会产生装箱操作，所以需要配合 typeof 来区分基本类型和对象类型。

### 拆箱转换

拆箱转换，就是对象类型转成基本类型。它会调用内置的`[[ToPrimitive]]`方法。

对象到 String 和 Number 的转换都遵循`先拆箱，再转换`的规则，通过拆箱转换，将对象变为基本类型，再从基本类型转换为对应的 String 或 Number。

拆箱转换会尝试调用 valueOf 和 toString 来获取拆箱后的基本类型，如果 valueOf 和 toString 都不存在，或者没有返回基本类型，则会报错 TypeError。

```js
var a = {
    valueOf() {
        console.log('valueOf')
        return {}
    },
    toString() {
        console.log('toString')
        return {}
    }
}

// 对象转Number
a * 2
// valueOf
// toString
// TypeError: Cannot convert object to primitive value

// 对象转String
String(a)
// toString
// valueOf
// TypeError
```

可以看到，转 Number 是先调用 valueOf()，再调用 toString()。转 String 是先调用 toString() 再调用 valueOf()。

> 规范指出，类型转换的内部实现是通过ToPrimitive ( input [ , PreferredType ] )方法进行转换的，这个方法 的作用就是将input转换成一个非对象类型。
> 参数preferredType是可选的，它的作用是，指出了input被期待转成的类型。 如果不传preferredType进来，默认的是'number'。
> 如果preferredType的值是"string"，那就先执行"toString", 后执行"valueOf"。否则，先执行"valueOf", 后 执行"toString"。
> 由此可见，"toString", "valueOf"的执行顺序，取决于preferred的值。
> 加法运算符的规则，ToPrimitive 没有传第二个参数，默认是 number

在 ES6 之后，可以重写`Symbol.toPrimitive`来覆盖原有的行为，不再调用 `valueOf` 或 `toString`。

```js
a[Symbol.toPrimitive] = function(){
    console.log('@@toPrimitive Symbol')
    return 2

    // 如果 return {}， 会报错 TypeError
}

String(a)
// @@toPrimitive Symbol
// 2
```

上面代码中，`Symbol.toPrimitive`返回了一个基本类型，所以直接执行`String(2)`。如果返回一个对象，则会报错`TypeError: Cannot convert object to primitive value`。


除了这七种语言类型，还有一些语言的实现者更关心的规范类型。

- List 和 Record: 用于描述函数传参过程。
- Set: 主要用于解释字符集等。
- Completion Record: 用于描述异常、跳出等语句执行过程。
- Reference: 用于描述对象属性访问、delete等。
- Property Descriptor: 用于描述对象的属性。
- Lexical Environment 和 Environment Record: 用于描述变量和作用域。
- Data Block: 用于描述二进制数据。


关于Number类型，如果想要进一步理解可以去参考IEEE 754中关于浮点数的表达规范，了解这64位中各
个位数段表达的含义
文中有几个叙述不清的地方:
1. NaN和+Infinity的规定实际是IEEE 754标准规定的特殊值: (e为指数的位数，双精度中e=11)
- 指数为2^e – 1且尾数的小数部分全0，这个数字是±∞。(符号位决定正负)
- 指数为2^e – 1且尾数的小数部分非全0，这个数字是NaN，比如单精度浮点数中按位表示:S111 1111 1 AXX XXXX XXXX XXXX XXXX XXXX，S为符号位值无所谓，A是小数位的最高位(整数位1省略)，其取值表 示了NaN的类型:X不能全为0，并被称为NaN的payload
2. NaN，占用了 9007199254740990，这个叙述不对
留言里很多童鞋都提出了 9007199254740990 被占用是什么意思的疑问，实际是第一点描述的关于NaN 规定和参考双精度浮点数的表达方式，尾数共有53位，指数固定为2^e – 1并去掉±∞两个值，那么NaN其 实是 2^53-2 个特殊数字的合集(2^53-2 = 9007199254740990 );
并不是 9007199254740990 被占用，而是 9007199254740990 个特殊值被占用来表示 NaN 扩展一下，我们就可以理解为什么NaN !== NaN了，它确实不是一个值，而是一群值呢0 0!
