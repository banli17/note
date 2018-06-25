# js相等性判断


在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false );  而Object.is的行为方式与三等号相同，但是对于NaN和-0和+0进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 true。(通常使用双等号或三等号将NaN与NaN进行比较，结果为false。

## 严格相等 ===

全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。

```
// 特殊
+0 === -0  // true
```

## 非严格相等 == 

类型不一致的时候会进行隐式类型转换。规则如下：

- `Null` 和 `Undefined` 和其它类型比较都是`false`，注意有些特殊对象有时是`undefined`，比如`document.all`
- 基本类型会转成`Number`进行比较
- `Object`和原始值比较时，会首先调用`toString()`或`valueOf()`转成原始值。
- 如果类型一致，则直接比较，注意对象是比较的引用。

<img src="http://www.w3croad.com/images/20170906/8.jpg">

## 同值相等 Object.is()

`Object.is()`和`===`的区别如下是`Object.is()`对`NaN与NaN`和`+0与-0`的比较做了特殊处理。尽量不要使用，除非要处理`0`或`NaN`。

```
+0 === -0  // true

Object.is(NaN, 0/0) // true
Object.is(NaN, NaN) // true
Object.is(+0, -0) // false
```

<img src="http://www.w3croad.com/images/20170923/5.jpg">

## 参考

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness
- http://dorey.github.io/JavaScript-Equality-Table/