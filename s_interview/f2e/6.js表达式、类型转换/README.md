# js 表达式

- 语法 Grammar
  - grammer tree vs priority
  - left hand side & right hand side
- 运行时 Runtime
  - type convertion
  - reference

Expressions

- Member 会返回一个 Reference 类型。
  - a.b
  - a[b]
  - fn\`string\` 字符串模版参数会分段传入，例子如下
  - super.b
  - super['b']
  - new.target 函数里面用，用来判断是否是被 new 调用
  - new fn()
- New
  - new fn
  - new fn()() 和 new new fn()，new fn()() 被解析成了 (new fn())()。new new fn() 被解析成了 new (new fn())，也就是`new fn()`优先级高。
- Call 函数调用
  - foo()
  - super()
  - foo()['b']
  - foo().b， 如`new a()['b']`被解析成`(new a())['b']`
  - foo()`abc`
- Left Handside & Right Handside，左值和右值
  - 左边运行时必须是 Reference
- Update
  - a++ ： a++中间不能有 LineTerminator
  - a--
  - --a
  - ++a
- Unary 单目运算符
  - delete a.b
  - void foo()，将所有的值变为 undefined。`void function(){}`
  - typeof a
  - +a
  - -a
  - ~a
  - !a
  - await a
- Exponental: 乘号
  - `3**2**3` 会被解析成 `3**(2**3)`，特殊：唯一一个右结合运算符
- Multiplicative
  - `* / %`
- Additive
  - `+ -`
- Shift
  - `<< >>`
- RelationShip 比较
  - `< > <= >= instanceof in`
- Equality
  - ==
  - !=
  - ===
  - !==
- Bitwise
  - `& ^ |`
- Logical 逻辑运算，有短路逻辑
  - `||`
  - `&&`
- Conditional
  - ? :
- Elision 逗号：返回最后一个表达式的值

```js
function foo() {
  console.log(arguments);
}
var name = "world";
foo`hello ${name}`;
// 输出[Arguments] { '0': [ 'hello ', '' ], '1': 'world' }
```

new 运算符，如果函数返回基本类型，则 new 返回对象，如果返回引用类型，则返回该引用类型。例子如下：

```js
function fn() {}
function fn1() {}
function fn1() {
  return fn;
}
new fn1(); // ƒ fn(){}
new fn1(); // ƒ fn(){}
new (fn1())(); // fn {}
```

Member 会返回一个 Reference 类型。

```
let a = {name: 1}
a.name 实际是一个 Reference 类型
a.name + 2 // 3

delete a.name
delete 1

// 底层实现
class Reference {
    constructor(object, property){
        this.object = object
        this.property = property
    }
}
```

```
let a = b = c = 1;
a  // 这里有换行，所以是 b、c 自增了
++
b
++
c
// 结果 a 1, b 2, c 2
```

```js
function foo1() {
  console.log(1);
  return false;
}
function foo2() {
  console.log(2);
}
foo1() && foo2(); // 2 没有执行
foo1() || foo2(); // 都执行了
true ? foo1() : foo2(); // 2 没有执行
```

## Type Convertion 类型转换

![](imgs/2020-11-16-14-39-25.png)

### Boxing & Unboxing 拆装箱

四种基本类型转对象时会进行装箱。

- String
- Number
- Boolean
- Symbol
- BigInt 和 Symbol 类似，都不能 new

```js
// 对 String Number Boolean装箱的方法
new String("hello");
Object("hello"); // String{'hello'}

// 不使用new，当函数调用会返回基本类型
String(1); // '1'

// 装箱对象与基本值区别
!new String(""); // false
!""; // true
typeof new String(""); // object
typeof ""; // string

// Symbol 不能 new
new Symbol(1);
// VM5655:1 Uncaught TypeError: Symbol is not a constructor
Symbol(1); // Symbol(1)
Object(Symbol(1)).constructor; // ƒ Symbol() { [native code] }
Object.getPrototypeOf(Object(Symbol(1))) === Symbol.prototype; //  true
Object(Symbol(1)) instanceof Symbol; // true
Symbol(true)(
  // Symbol(true)
  function () {
    return this;
  }
).apply(Symbol("x"));
// Symbol {Symbol(x)}description: "x"__proto__: Symbol[[PrimitiveValue]]: Symbol(x)

// BigInt
var c = BigInt(111);
c; //111n
c.length = 1; // 1
c.length; // undefined
c.constructor; // ƒ BigInt() { [native code] }
```

### valueOf 和 toString

调用顺序如下：

- [`Symbol.toPrimitive`] 方法
  - 存在？则直接调用这个方法。
  - 不存在，则调用 valueOf
    - 如果 valueOf 不存在，则调用 toString

```js
1 + {toString(){ return 'xx'}, valueOf(){return 'hi'}, [Symbol.toPrimitive](){ return {}}}
// VM7970:1 Uncaught TypeError: Cannot convert object to primitive value
    at <anonymous>:1:5

1 + {toString(){}} // NaN
1 + {valueOf(){ return 2}}  // 3
1 + {toString(){ return 2}, valueOf(){return 3}}  // 4
'a' + {toString(){ return 2}, valueOf(){return 'hi'}} // "ahi"
e = {toString(){ return 2}, valueOf(){return 11}} // e==11

{} + 1 // 1 ， {} 被解析成了语句块
{} + true // 1
```

练习：

- StringToNumber
- NumberToString
