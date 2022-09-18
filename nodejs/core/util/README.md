# util

## util.inspect()

`util.inspect(object,[showHidden],[depth],[colors])` 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。

showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。

depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归 2 层，指定为 null 表示将不限递归层数完整遍历对象。 如果 colors 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。

> util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了 toString 方法也不会调用。

```js
const util = require("util");
function Person() {
  this.name = "byvoid";
  this.toString = function () {
    return this.name;
  };
}
const obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
```

运行结果是：

```sh
Person { name: 'byvoid', toString: [Function (anonymous)] }
Person {
  name: 'byvoid',
  toString: <ref *1> [Function (anonymous)] {
    [length]: 0,
    [name]: '',
    [arguments]: null,
    [caller]: null,
    [prototype]: { [constructor]: [Circular *1] }
  }
}
```
