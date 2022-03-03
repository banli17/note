# 异步编程

## Thunk 函数

求值策略问题：函数的参数何时求值。

```
var x = 1
function f(m){
  return m * 2
}
f(x + 5)
```

- 传值调用(call by value)：求完后传入，C 语言采用。
- 传名调用(call by name): 将表达式传入，用到时求值。

### Thunk 函数的含义

编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个用来替代参数表达式的临时函数就叫做 Thunk 函数。

```
function f(m){
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk){
  return thunk() * 2;
}
```

### JS 里的 Thunk 函数

JS 中，Thunk 函数替换的不是表达式，而是多个参数，将其替换为单参数，且单参数为回调函数的版本。

```js
var Thunk = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    return function (callback) {
      args.push(callback);
      return fn.apply(this, args);
    };
  };
};
```

### Thunkify 模块

Thunkify 模块和上面 Thunk 方法类似，只是限制了 callback 只能调用一次。

```js
function thunkify(fn) {
  return function () {
    // 1. 拷贝参数和this
    var args = Array.prototype.slice.call(arguments);
    var ctx = this;

    return function (done) {
      var called;

      args.push(function () {
        // 限制 done 只能调用一次
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args); // 执行函数
      } catch (err) {
        done(err); // 异常
      }
    };
  };
}
```

### Generator 函数的流程管理

```js
var fs = require("fs");
var thunkify = require("thunkify");
var readFile = thunkify(fs.readFile);

var gen = function* () {
  var r1 = yield readFile("/etc/fstab");
  console.log(r1.toString());
  var r2 = yield readFile("/etc/shells");
  console.log(r2.toString());
};
```

上面代码中，yield 命令用于将程序的执行权移出 Generator 函数，那么就需要一种方法，将执行权再交还给 Generator 函数。

这种方法就是 Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。

```js
var g = gen();

var r1 = g.next();
// 这里的 value 是一个 Thunk，接收 callback
// 它会触发 fs.readFile 的执行
// callback 会在 fs.readFile 后调用
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});
```

### Thunk 函数管理 Generator

```js
function run(fn) {
  var gen = fn();

  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next); // 这里的 result.value 是 Thunk
  }

  next();
}

run(gen);
```

## 参考

- [http://www.ruanyifeng.com/blog/2015/05/thunk.html](http://www.ruanyifeng.com/blog/2015/05/thunk.html)
