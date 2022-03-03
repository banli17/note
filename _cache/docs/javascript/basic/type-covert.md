# 数据类型转换

JS 中存在 2 套类型系统：

- 基础类型系统（base types）：由 typeof 检测，有 7 种类型：undefined、number、string、boolean、object、function、symbol
- 对象类型系统（object types）

## 包装类

为了实现一切皆为对象，JS 在类型系统上做了妥协，即为部分基础类型系统种的“值类型”设定对应包装类。然后通过包装类，将值类型数据作为对象来处理。

| 基础类型  | 包装类                  |
| --------- | ----------------------- |
| undefined | 无 (undefined 不是对象) |
| boolean   | Boolean                 |
| number    | Number                  |
| string    | String                  |
| symbol    | Symbol                  |
| object    |                         |
| function  |                         |

这样看来，基础类型数据通过包装类转换的结果就成了对象。

```js
var a = new Number(10); // [Number: 10]
console.log(typeof a); // object
```

`Object()` 类可以显示的将基础类型包装成对应的对象。

```
Object(10)  // object [Number: 10]
Object(Symbol('hi'))  // object [Symbol: Symbol(hi)]
```

基础类型只有在进行属性存取时，会触发隐式包装。而 `for...in/of`，`with`操作也相当于是在进行属性存取。

```js
var x = 100;

// 不能进行隐式包装
x instanceof Number; // false
"toString" in x; // 报错，不能对基础类型进行 in 操作

// 会进行隐式包装
x.constructor;
x["constructor"];

// 验证确实进行了隐式包装
Object.prototype.getSelf = function () {
  return this;
};
let me = x.getSelf();
console.log(typeof me, me); //object [Number: 10]
```

包装类是为了能在基础类型数据上直接调用属性或方法。它会在基础类型数据调用属性时创建一个临时对象，在调用结束后清理掉。

```js
var x = 100;
x.name = 10; // 会使用包装类 Number 创建临时对象，然后销毁
console.log(x.name); // undefined ，因为又会创建新的包装对象，此时并没有 x.name
```

## 对象转换为值

### null

- null 作为对象，它总会转成 `0`、`'null'`、`false`。
- 除了 null 外，其它的对象转 Boolean 总为 true

### 对象转数字或字符串

除 null 外，其它对象转数字或字符串的规则是：

- 如果一个表达式预期转字符串，会依次尝试调用该对象的 `toString()`、`valueOf()`方法。
- 如果预期转数字，会依次尝试调用该对象的 `valueOf()`、`toString()`方法。
- 如果预期不明显，则会先调用 `valueOf()` 后调用 `toString()`。

这两个方法如果都返回对象，则会报错。因为目的是想得到值，可是却得到了对象。

另外，如果定义了 `Symbol.toPrimitive` 属性，那么 `valueOf()`和`toString()` 在对象转值时会失效。如果 `Symbol.toPrimitive` 属性返回一个对象，也会报错。所以它相当于用来替代这个隐式转换规则。

上面的转换逻辑可以用下面代码表示：

```js
var typeHint; // 表示希望转成什么类型
var x = new String("123");
var methods = ["toString", "valueOf"];
if (typeHint === "number") methods = methods.reverse();

let result;
for (let method of methods) {
  if (method && method.call) {
    result = x[method]();
    if (result === null || result instanceof Object) {
      continue;
    }
    break; // 并且返回 result
  }
}
throw new TypeError("Cannot convert... to primitive value");
```

所谓“预期”，举例来说：

- `parseInt(str, radix)`定义是这个函数可解析一个字符串，并返回一个整数。所以 str 预期是一个字符串，会先调用 `toString()` 方法。
- `Math.abs(x)` 函数返回指定数字 x 的绝对值，所以预期是一个数字，会先调用 `valueOf()`。
- `a + b`，因为不知道是数字相加还是字符串拼接，所以预期不明显，会先调用 `valueOf()`。
- `+a`，预期是一个数字，会先调用 `valueOf()`

代码如下：

```js
x = {
  toString: () => 10,
  valueOf: () => 2,
};
parseInt(x); // 10
Math.abs(x); // 2
x + 3; // 5
x + "3"; // '23'
+x; // 2
```

如果运算中都是值，则不会受到包装类的影响，比如：

```
1 + '2'  // 12
1 + +'2' // 3， +'2' 会转为 2
1 + new String('2')  // 会调 toString 或 valueOf
```

**显示转换**

可以通过调用方法来进行显示转换。

- Object()
- Number()
- String()
- Boolean()

```
let a = new Boolean(false)
Boolean(a)  // true，是按照对象来转换
```

## 值类型互相转换

### undefined

### number

### string

### boolean

### symbol
