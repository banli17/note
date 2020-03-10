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

## 实现

接下来看看如何实现，需要处理那些情况：

1.

## 源码

```js
jQuery.extend = jQuery.fn.extend = function() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // 处理深拷贝
    if (typeof target === "boolean") {
        deep = target;

        target = arguments[i] || {};
        i++; // 从下一个开始循环
    }

    // 如果不是对象，即 extend(1,{name:'hi'}) 或者 extend(true, 1, {name:'hi'})时，保证 target 是对象
    if (typeof target !== "object" && !isFunction(target)) {
        target = {};
    }

    // 将 jQuery.fn 当作是 target，让对象拷贝到它身上
    // 即转成 extend(false, this, {css(){}})
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // 只处理非 null/undefined 值，即 extend(a,b,null) 里的 null 会跳过
        if ((options = arguments[i]) != null) {
            // 从 target 的下一个开始循环，extend(target, {name:1})
            // 循环数组或对象
            for (name in options) {
                copy = options[name]; // 拷贝的对象

                // 防止 Object.prototype 污染
                // target === copy 同一个对象，实际不需要拷贝
                if (name === "__proto__" || target === copy) {
                    continue;
                }

                // 递归处理对象和数组，深拷贝
                if (
                    deep &&
                    copy &&
                    (jQuery.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))
                ) {
                    src = target[name]; // 要输出的值

                    // 始终保持阵型 extend(deep, a, b)
                    // 如果 copy 是数组，src 不是数组 ， extend([])
                    if (copyIsArray && !Array.isArray(src)) {
                        clone = [];
                        // 如果 copy 不是数组，src 不是对象 extend([], {})
                    } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false; // copy不是数组

                    // extend 永远保持这种三个参数的形式执行，进行拷贝
                    target[name] = jQuery.extend(deep, clone, copy);

                    // 不拷贝 undefined 值，如[undefined] 变成 [empty]，而 {a:undefined} 不拷贝 a 属性
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // 返回修改后的 target 对象
    return target;
};
```

## 参考

-   [JavaScript 专题之从零实现 jQuery 的 extend #33](https://github.com/mqyqingfeng/Blog/issues/33)
