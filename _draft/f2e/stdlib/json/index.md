---
title: Math 对象
date: 2019-03-28 22:10:01
tags:
toc: true
---

JSON 的格式要求：

1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
1. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
1. 字符串必须使用双引号表示，不能使用单引号。
1. 对象的键名必须放在双引号里面。
1. 数组或对象最后一个成员的后面，不能加逗号。

## JSON.stringify()

`JSON.stringify`方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被`JSON.parse`方法还原。

对于原始类型的字符串，转换结果会带双引号。将来还原的时候，内层双引号可以让 JavaScript 引擎知道，这是一个字符串，而不是其他类型的值。

如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤。

```js
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```

如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。

```
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

正则对象会被转成空对象。

```
JSON.stringify(/foo/) // "{}"
```

JSON.stringify方法会忽略对象的不可遍历的属性。

### 第二个参数

`JSON.stringify`方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。

```js
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

这个类似白名单的数组，只对对象的属性有效，对数组无效。

```js
JSON.stringify(['a', 'b'], ['0'])
// "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// "{"0":"a"}"
```

第二个参数还可以是一个函数，用来更改JSON.stringify的返回值。注意，这个处理函数是递归处理所有的键。

```js
function f(key, value) {
  console.log("["+ key +"]:" + value);
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

var o = { a: 1, b: { k: 2 } } 
JSON.stringify(o, f)
// []:[object Object]
// [a]:1
// [b]:[object Object]
// [k]:2
// "{"a":2,"b":{"k":4}}""
```

上面代码中，对象o一共会被f函数处理四次，最后那行是JSON.stringify的输出。第一次键名为空，键值是整个对象o；第二次键名为a，键值是1, 第三次键名为b,键值为{k: 2}；第四次键名为k，键值为2。

递归处理中，每一次处理的对象，都是前一次返回的值。

```js
var o = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(o, f)
// "{"b": 4}"
```

上面代码中，f函数修改了对象o，接着JSON.stringify方法就递归处理修改后的对象o。

如果处理函数返回undefined或没有返回值，则该属性会被忽略。

### 第三个参数

JSON.stringify还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性。如果是数字，表示每个属性前面添加的空格（最多不超过10个）；如果是字符串（不超过10个字符），则该字符串会添加在每行前面。

```js
JSON.stringify({ p1: 1, p2: 2 }, null, 2);
/*
"{
  "p1": 1,
  "p2": 2
}"
*/

JSON.stringify({ p1:1, p2:2 }, null, '|-');
/*
"{
|-"p1": 1,
|-"p2": 2
}"
*/
```

### toJSON()

如果参数对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

```js
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
```

Date对象就有一个自己的toJSON方法。

```js
var date = new Date('2015-01-01');
date.toJSON() // "2015-01-01T00:00:00.000Z"
JSON.stringify(date) // ""2015-01-01T00:00:00.000Z""
```

toJSON方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify默认不能转换正则对象，但是设置了toJSON方法以后，就可以转换正则对象了。

```js
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```



## JSON.parse()

`JSON.parse`方法用于将 JSON 字符串转换成对应的值。如果传入的字符串不是有效的 JSON 格式，JSON.parse方法将报错。

```js
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
```

上面代码中，单引号不符合 JSON 格式，所以报错。

`JSON.parse`方法可以接受一个处理函数，作为第二个参数。

```js
function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
```

