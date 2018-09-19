# Array

## 属性

- length
    - 长度是0到Math.pow(2, 32) - 1，如果不在该范围，`new Array(size)`时会报错`Invalid array length`
    - 通过设置length，可以截取长度；也可以扩展数组。
    - length不一定表示数组项的个数，比如`a = [], a[5] = 1`，a.length 是6，其它项都是undefined。
    
- Array[Symbol.species]：返回Array构造函数

- Array.prototype[@@unscopables] 返回es6新定义的方法，这样就可以通过Array.prototype[Symbol.unscopables]来调取对应的方法。因为es6新增了keys等，在with里是当做方法，而不是变量。

不要使用with，es5严格模式会报错，而且也会它会引起语义不明，性能低，因为它找属性是先从with参数对象里找，找完原型，再找外部。with能减少变量的长度，但是可以直接新建变量替换。编译器也很难找变量。

```
// 返回一个对象
{
  "copyWithin": true,
  "entries": true,
  "fill": true,
  "find": true,
  "findIndex": true,
  "includes": true,
  "keys": true
}


// 防止某些数组方法被添加到with中
var keys = []
with(Array.prototype){
    // keys是方法，而不是变量
    keys.push(1) // 报错，使用下面的替换
}
Object.keys(Array.prototype[Symbol.unscopables]).keys === Array.prototype.keys
```
    
## 静态方法

- Array.from():根据一个类数组或可迭代对象创建一个新的数组实例，语法`Array.from(arrayLike, mapFn, thisArg)`。
Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg)
```
var a = [1, 3, {}]
Array.from(a)  // 浅拷贝

Array.from('foo');
// ["f", "o", "o"]
```

- Array.isArray()：检查一个对象是否是数组，instanceof跨iframe时不行。
```
Array.isArray(Array.prototype);  //true, Array.prototype也是数组
Array.isArray(); // false
```
    
- Array.of():将参数生成一个新数组，不管类型，和Array()的区别如下

```
Array.of(7)  // [7]
Array(7)   // [,,,,,,]
```

## Array.prototype下的方法

- concat()：它将数组的元素或非数组的值(比如原始值或对象)合并为新数组，concat复制的是引用。
- copyWithin()：浅复制数组的一部分到同一数组的另一位置，并返回它，不修改其大小
- entries(): 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键值对。
```
// 值的形式
{
    done: false,
    value: [index, value]
}
```
- every()：检测是否每一个都符合条件，条件由函数返回true决定，一旦有一个为false，则退出。
- fill()：用一个固定值替换start到end内的全部元素。
- filter()
- find()：找到那个元素就返回并终止。返回的是元素值。找不到则返回undefined。
- findIndex()：找索引，找不到则返回-1。 `find`和`findIndex`主要用于找一个即返回。
- forEach()，没有返回值，用于为一些相同的元素，绑定事件处理器。无法跳出forEach循环。如果有元素被删，会动态改变
- `includes(searchElement, fromIndex)`，从fromIndex查找一个数组是否包含一个值，from可以是负数，那就是从倒数开始，默认是0。 includes() 是一个通用方法，字符串、类数组都可以使用。
- `indexOf(searchElement, fromIndex)`，返回索引，没有则是-1。和findIndex()的区别是：
    - indexOf() 参数是一个值，如果是字符串，不能是正则，数组中是原始值时很好用
    - findIndex()参数是一个函数，非原始值或可以自定义条件，功能更强大
 
- join()方法将一个数组或类数组的所有元素连接成字符串并返回这个字符串，默认逗号连接，如果数组为空，则返回空字符串。如果元素是undefined或null,则会转为空字符串
- keys()：返回一个Array iterator，包含数组中每个索引的键
- lastIndexOf() 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。
    使用indexOf和lastIndexOf查找所有元素
- map(),创建一个新数组，结果每项是函数返回的结果
```
let new_array = arr.map(function callback(currentValue, index, array) { 
    // Return element for new_array 
}[, thisArg])
```
- pop()方法从数组中删除最后一个元素，并返回该元素的值。当数组为空时返回undefined
- push() 方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。只支持类数组，不支持字符串。
- reduce() 方法对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
    - callback, 执行数组中每个值的函数，包含四个参数：
        - accumulator, 累加器累加回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（如下所示）。
        - currentValue, 数组中正在处理的元素。
        - currentIndex可选, 数组中正在处理的当前元素的索引。 如果提供了initialValue，则索引号为0，否则为索引为1。
        - array可选，调用reduce的数组
    - initialValue可选
      用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
- reverse() 方法将数组中元素的位置颠倒。
- shift() 方法从数组中删除第一个元素，并返回该元素的值。如果数组为空则返回undefined 。 
- slice(start, end) 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
- some() 方法测试数组中的某些元素是否通过由提供的函数实现的测试。some 遍历的元素的范围在第一次调用 callback. 时就已经确定了。在调用 some 后被添加到数组中的值不会被 callback 访问到。如果数组中存在且还未被访问到的元素被 callback 改变了，则其传递给 callback 的值是 some 访问到它那一刻的值。
- sort() 逐个对比字符，按照unicode码排序。返回排序后的数组，是对原数组进行排序。
    - 汉字的unicode比较
    - 函数返回值小于0，则a排前面；等于0则位置不变(非标准)，大于0，b排前面
- splice(start, deleteCount, item1, item2, ...) 删除现有元素或添加新元素，返回被删除元素组成的数组，如果没有删除，则返回空数组。
    - splice(start)，表示删除[start, end] 的元素
- toLocaleString() 返回数组元素组成的字符串，数组中的元素使用各自的toLocaleString()转字符串
- toSource() 非标准的
- toString()：覆盖Object.toString()， 先toString()再join()。
- unshift() 添加到开头，返回新数组的长度
- values() 未实现，返回Array Iterator对象，包含每个索引的值。
- [Symbol.iterator] 和values()一样。


~符号
[](https://www.zhihu.com/question/51585935)
原码、反码、补码






























    
    
- [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [this.length >>> 0表示什么？](https://www.zhihu.com/question/20693429)