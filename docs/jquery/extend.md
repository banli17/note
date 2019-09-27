---
title: "extend()"
---

# extend 源码分析

## 用法

jQuery 里的 extend 主要有下面几种用法：

1. 拷贝对象

```js
$.extend({}, { name: "zs" }, { age: 12 });
// {name:"zs", age:12}

$.extend([], [1, 2, 3], [4, 5, 6, 7]);
// [4, 5, 6, 7];
```

2. 第一个参数为 true，表示深拷贝

```js
$.extend(
  true,
  {},
  { name: "zs", child: { name: "lisi" } },
  { child: { age: 12 } }
);

// {name:'zs',child:{name:'lisi', age:'12'}}
```

3. 扩展静态方法

```js
$.extend({
  show() {}
});

$.show();
```

4. 扩展原型上的方法

```js
$.fn.extend({
  show() {}
});

$("div").show();
```

## 原理

看完上面的用法之后，再去看 extend 的源码就简单了。它最核心的技巧就是：`参数规格化`。也就是保证 extend 调用方式一致。

我们来看看上面几个使用方法，实际上 extend 源码将它们进行了统一处理。即都转成了下面的形式来调用:

```js
extend(deep, target, copy);
```

再看看下面示例，相信就明白了。

```js
// 1
$.extend({}, { name: "zs" }, { age: 12 });
// 转成了
$.extend(false, {}, { name: "zs" }, { age: 12 });

// 2
$.extend({
  show() {}
});
// 转成了
// 这里 this，就是 jQuery 对象
$.extend(false, this, {
  show() {}
});

// 3
$.fn.extend({
  show() {}
});
// 转成了
// 这里 this 就是 jQuery.prototype 对象
$.fn.extend(false, this, {
  show() {}
});
```

## 练习

- [extend 练习地址](https://github.com/banli17/practice/tree/master/jquery)
