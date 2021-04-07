# js 专题

## 1-2.防抖与节流

问题：有些事件频繁触发影响性能，如 resize、scroll、mousedown、mousemove、keyup、keydown、input 等。

为了解决这个问题，可以用防抖和节流：
- 防抖: 回调函数在事件触发 n 秒后执行，如果期间再次触发，则以最新事件时间为准。
- 节流: 回调函数在事件触发的 n 秒内只执行一次。

### 1. 防抖

**注意**

- 函数的 this 指向
- 函数的参数(如 event)
- immediate: 有 timeout 就不执行，没有才执行
- 函数的返回值(immediate 时才有效)
- 取消防抖

[代码demo](./1.防抖)

### 2. 节流

节流的2种实现：
- 时间差比较: 立马执行，事件结束后不执行
- setTimeout: 延迟执行，事件结束后还会执行一次

实现步骤:
1. 实现时间差比较版本
2. 实现 setTimeout 版本
3. 结合 1、2 实现立马能执行，事件结束后还会执行一次的版本
4. 增加参数 leading tailing，实现可控制立马执行或结束后还执行。
    - 注意 leading, tailing 不能同时为 false，否则回调不会被执行。

[代码demo](./2.节流)

## 3.数组去重

数组去重方法：

1. 暴力法(兼容性好): 新建一个空数组 res，遍历数组 arr，循环判断 res 中是否有相同的新元素，有则放入，没有则继续。
    - 注意内层循环新数组，如果新数组没有该值，则最后 j === res.length
    - indexOf 或 includes 可以简化内层循环
    - filter 简化外层循环
    - 排序后去重，只要相邻元素不等，即可放入新数组中，效率比 indexOf 高
    - 新需求，给 unique 增加迭代函数 iteratee，来判断值是否相等    
2. 经典算法: 只插入最右边的，不管前面重复的 
3. 使用 object 的 key
    - key 在 object 中只保存为字符串了，所以无法判断 1， '1'
    - 使用 typeof + key 做判断，但是无法判断对象类型
    - 最后使用 typeof + JSON.stringify 解决上面问题
4. 使用 Map，它的 key 可以是任意类型，且不能重复，但是对象类型对被当作不同的 key    
5. 使用 Set， `[...new Set(arr)]`，可以去重 NaN

```
JSON.stringify(NaN)  // null

// demo1
var arr = [1, 2, NaN];
arr.indexOf(NaN); // -1  indexOf 底层是 === 所以找不到NaN

// demo2
function unique(array) {
   return Array.from(new Set(array));
}
console.log(unique([NaN, NaN])) // [NaN]
```

[代码demo](./3.数组去重)

## 4.类型判断

判断什么:
- 数字、字符串、数组、对象
- 日期，正则、错误类型
- plainObject(纯对象 `{a:1}` 这样的)，空对象`{}`，window，arrayLike

判断方法：
- typeof: 能返回 number、string、boolean、symbol、bigint、function、object
    - 只能判断基本类型，对象类型全是 object，注意 null 也返回 object
    - 能判断函数，返回 function
- Object.prototype.toString: 能检查所有类型
    - 内部执行步骤如下
        1. 如果 this = undefined，则返回 `[object Undefined]`
        2. 如果 this = null，就返回`[object Null]`
        3. let O = ToObject(this)，并添加 `[[Class]]`属性等于类名
        4. 返回 `[object [[Class]]]`形式的字符串
    - IE6: null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
    - jQuery3.0 是使用 Array.isArray 判断数组。
- 判断纯对象：$.plainObject()，代码如下
- 判断空对象：$.isEmptyObject()，没有属性就是纯对象
- 判断 window，一句代码 `obj != null && obj === obj.window`;
    - 现在可以用 toString 了，返回`[object Window]`，虽然ie6/8 是`[object Object]`，safari4是`[object DOMWindow]`，chrome 5 是`[object global]`，但是已经 out 了。
- 判断类数组，如`arguments: {a: 1, length: 0}`，必须三个条件至少满足一个:
    - 是数组
    - length 为 0
    - length 为大于 0 的整数，且 `o[length-1]`存在
- 判断是 dom： `!!(obj && obj.nodeType === 1)`
> for in 对于 null、number、string、boolean、undefined 都可以

```js
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})
// 获取类型
function type(obj) {
    // 一箭双雕
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
// 判断是函数
function isFunction(obj) {
    return type(obj) === "function";
}

function isEmptyObject( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
}

function isWindow( obj ) {
    return obj != null && obj === obj.window;
}

// 判断是类数组
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// 判断是 DOM
isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
};
```

下面是 jQuery.isPlainObject 代码：

```js
var class2type = {};
var toString = class2type.toString;  // 相当于 Object.prototype.toString
var hasOwn = class2type.hasOwnProperty; // 相当于 Object.prototype.hasOwnProperty

function isPlainObject(obj) {
    var proto, Ctor;
    // 1. 类型不是 object 就排除
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    // obj.__proto__ === Object.prototype 
    proto = Object.getPrototypeOf(obj);
    // 2. 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
    if (!proto) {
        return true;
    }

    /**
     * 3. 判断通过 new Object 方式创建的对象，对象原型的构造函数是 Object
     */
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;

    // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
    // 搞不懂为什么要用 hasOwn？可能性能考虑，也可proto.constructor == new Object().constructor
    // console.log(hasOwn.toString.call(Ctor)); // function Object() { [native code] } 这里还有比较了函数 Object 的内部代码
    // console.log(Object.prototype.toString.call(Ctor)); // [object Function]
    return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);

}
```

## 5.深拷贝与浅拷贝

## 6.求数组的最大最小值

求数组的最大最小值方法如下：

- Math.max(v1, v2, v3)
    - `Math.max(...arr)` 或者 `Math.max.apply(null, arr)`(apply会将arr分解开)
    - 如果有一个参数不能转为数值，则返回 NaN，因为数字才能比较。
    - 如果没有参数，返回 -Infinity，相反 Math.min() 返回 Infinity。
- 遍历查找 
    - for 遍历
    - reduce 遍历
- 排序
- eval 将数组转为 `a,b,c` 形式

## 7.数组扁平化

将数组扁平化(flatten)的方法有：

- 递归将多层数组元素放入到新数组中
    - 普通递归
    - reduce 递归
- 先toString后，再split
    - toString 可以将多层数组弄成扁平的字符串
    - 注意，扁平后，无法区分数据类型，如`[1, '2', 'null']` 变成了 `1,2,null`
- es6 扩展运算符 ...，`[].concat(...arr)`
    - 只对一层有效，多层需要继续扁平
- es6 `.flat(Infinity)`
- underscore flatten 方法
    - 参数
        - input 要处理的数组
        - shallow 是否只扁平一层
        - strict 忽略非数组，只处理内层是数组的元素
        - output 方便递归
    - 基于 flatten 实现的方法有    
        - _.flatten(array, shallow)
        - _.union
        - _.difference

## 8.在数组中查找指定元素

- es6 findIndex/findLastIndex 的使用和实现，
- 使用 createIndexFinder 生成 findIndex 和 findLastIndex 函数(findIndex 和 findLastIndex 代码几乎相同)。
- 针对有序数组查找索引，采用二分查找
- indexOf(item, fromIndex): 从前往后找
    - fromIndex 默认为0，如果 < 0 时，会抵消索引值，如果抵消后还 < 0 ，则为 0。
- lastIndexOf: 从后往前找
    - fromIndex 默认为 len-1，如果 > len-1，则整个数组都会被查找，如果为负，则时末尾向前的便宜。
    
自己实现 indexOf 时要注意：

- 如果值是 NaN 时，indexOf 不能找 NaN 的下标
- 排序数组用二分查找(第三个参数如果不传 fromIndex，而是个布尔值，表示数组是有序的)

## 8.jQuery forEach 方法

## 10. 判断两个对象相等

## 学习资料

- [冴羽的博客](https://github.com/mqyqingfeng/Blog)

