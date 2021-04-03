# Deferred 概念和源码解析

promise A+ 规范

## Deferred API

-   `jQuery.Deferred()` 返回一个对象用来注册多个回调，回调队列，调用回调队列，并转达任何同步或异步函数的成功或失败状态
-   `deferred.done()`
-   `deferred.fail()`
-   `deferred.progress()`
-   `jQuery.when(deferred)` 返回一个 promise 对象
-   `.promise()` 返回一个 Promise 对象来观察当某种类型的所有行动绑定到集合，排队与否还是已经完成。

## 使用

```js
var wait = function() {
    var deferred = $.Deferred();
    setTimeout(function() {
        deferred.resolve("hello");
    });
    return deferred;
};

$.when(wait())
    .done(function(value) {
        console.log("done: " + value);
    })
    .fail(function(value) {
        console.log("fail: " + value);
    });
```
