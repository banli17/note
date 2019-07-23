---
title: "jquery源码分析(1)：整体架构"
date: 2018-11-20 09:03:50
draft:  false
toc: true
---

## 学习资料

- [jQuery 2.0.3 源码分析core - 整体架构](http://www.cnblogs.com/aaronjs/p/3278578.html)

## 正文

```javascript
$().css()
$().hide().html()
```

从上面 jquery 的用法可以发现：

1. jq 对象的创建方式是通过函数调用:`$()`
2. jq 方法的链式调用

### jQuery的无new创建

实际上 jQuery 创建对象的 new 放在了内部。

```javascript
var jQuery = function(){
    return new jQuery.prototype.init()
}
```

所以当调用 jQuery() 时会返回一个对象，它的构造函数是`jQuery.prototype.init()`的返回值。下面看看`init()`函数。

```javascript
jQuery.prototype = {
    init: function(){
        return this
    },
    ...
}
```

如果像上面这样写，调用`new jQuery.prototype.init()`时内部的 this 是新创建的对象，而不是 jQuery 构造函数，所以它是像下面这样实现的。

```javascript
jQuery.prototype.init.prototype = jQuery.prototype
```

通过上面的转换，调用 `new jQuery.prototype.init()` 时，会创建一个对象，这个对象的原型是指向 jQuery.prototype 的，所以这个对象拥有 jQuery.prototype 的方法。

考虑到其它人可能要扩展 jQuery 和 jQuery.prototype，而 prototype 暴露在外面显示的不优雅。所以给 prototype 起了一个别名 fn。

```javascript
jQuery.fn = jQuery.prototype = {
    ...
}
```

### 链式调用

链式调用的好处是节省 js 代码、提高代码效率以及看起来更加优雅。

```javascript
$().show().remove()
```

显然，只需要在方法里返回 this 即可。

```javascript
jQuery.prototype = {
    show: function(){
        return this
    },
    remove: function(){
        return this
    }
}
```

可以看出调用 show 时，this 是 $() 对象，它的原型对象是 jQuery.prototype，所以可以继续调用 remove()。但是函数都返回对象没有返回值也不一定是好事。

### 插件接口

jQuery 提供了扩展的方法，就是将方法添加到 jQuery 和 jQuery.prototype 下， 它的实现方式如下。

```
jQuery.extend = jQuery.fn.extend = function(){}
```

上面是`jQuery.extend = jQuery.fn.extend`是连等，如何实现不同的功能呢？这就是 this 的作用了。

1. 调用 jQuery.extend，this 是 jQuery，所以是扩展 jQuery。
2. 调用 jQuery.fn.extend，this 是 jQuery.fn 也就是 jQuery.prototype，所以是扩展原型对象(对象方法)。

extend 的实现如下：

```javascript
jQuery.extend = jQuery.fn.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},    // 常见用法 jQuery.extend( obj1, obj2 )，此时，target为arguments[0]
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {    // 如果第一个参数为true，即 jQuery.extend( true, obj1, obj2 ); 的情况
        deep = target;  // 此时target是true
        target = arguments[1] || {};    // target改为 obj1
        // skip the boolean and the target
        i = 2;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction(target) ) {  // 处理奇怪的情况，比如 jQuery.extend( 'hello' , {nick: 'casper})~~
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    if ( length === i ) {   // 处理这种情况 jQuery.extend(obj)，或 jQuery.fn.extend( obj )
        target = this;  // jQuery.extend时，this指的是jQuery；jQuery.fn.extend时，this指的是jQuery.fn
        --i;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) != null ) { // 比如 jQuery.extend( obj1, obj2, obj3, ojb4 )，options则为 obj2、obj3...
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {    // 防止自引用，不赘述
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                // 如果是深拷贝，且被拷贝的属性值本身是个对象
                if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                    if ( copyIsArray ) {    // 被拷贝的属性值是个数组
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {    被拷贝的属性值是个plainObject，比如{ nick: 'casper' }
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );  // 递归~

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {  // 浅拷贝，且属性值不为undefined
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
```

extend 处理的事情有：

1. 常见的 $.extend(o1, o2) 和 $.extend(true, o1, o2)。
2. 异常 $.extend('hello', o1)。
3. 直接复制到 jQuery 上如$.extend(o1)。
4. 循环引用问题 $.extend(o1, o1, o2)。
