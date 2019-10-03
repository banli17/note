---
title: 三、tapable 解析
---

# tapable 解析

## 官网文档总结

tapable 是一个类似 nodejs EventEmitter 的发布订阅模式库。它提供了一些 api：

```js
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");
```

1. Sync 开头的是同步钩子，Async 开头的是异步钩子。
2. 同步钩子只能用 tap 绑定事件，用`call()`触发，绑定事件时需要传入事件名和事件函数；异步钩子可以用 tap、tapAsync、tapPromise 绑定事件，但是它没有 call 方法，对应的需要用`callAsync()`、`promise()`触发。
3. 同步钩子只支持串行，即执行完一个再执行下一个。异步钩子分为串行和并行。并行相当于 Promise.all()。
4. `普通钩子 Hook` 与事件函数执行的返回值无关；`保险钩子 BailHook` 一旦事件函数返回 null，则后面的钩子不再执行；`瀑布流钩子 WaterfallHook` 上一个事件函数执行结果会作为参数传递给下一个事件函数，如果当前没有返回值，则上一个返回结果会穿透给下一个函数。`循环钩子 LoopHook` 是如果事件函数返回值不为 undefined，则重复执行，否则(`即return 或 return undefined`)会执行下一个。
5. 所有的钩子都接受一个可选参数，用来声明事件函数要接收的参数。如下：

```js
const { SyncHook } = require("tapable");
// 只声明了一个参数name，结果 call 时传入了多的参数，会被忽略掉
let queue = new SyncHook(["name"]);
queue.tap("1", function(name, age) {
  console.log(11, name, age); // 11, zhangsan, undefined
});
queue.call("zhangsan", 12);
```

6. 拦截器 intercept() 方法可以钩子运行期间做一些事情。

```js
myCar.hooks.calculateRoutes.intercept({
  call: (source, target, routesList) => {
    console.log("Starting to calculate routes");
  },
  register: tapInfo => {
    // tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
    console.log(`${tapInfo.name} is doing its job`);
    return tapInfo; // may return a new tapInfo object
  },
  loop: (...args) => {},
  tap: tap => {}
});
```

7. context 对象，可以通过这个对象传递自己需要的数据给后续插件或拦截器。

```js
myCar.hooks.accelerate.intercept({
  context: true,
  tap: (context, tapInfo) => {
    // tapInfo = { type: "sync", name: "NoisePlugin", fn: ... }
    console.log(`${tapInfo.name} is doing it's job`);

    // `context` starts as an empty object if at least one plugin uses `context: true`.
    // If no plugins use `context: true`, then `context` is undefined.
    if (context) {
      // Arbitrary properties can be added to `context`, which plugins can then access.
      context.hasMuffler = true;
    }
  }
});

myCar.hooks.accelerate.tap(
  {
    name: "NoisePlugin",
    context: true
  },
  (context, newSpeed) => {
    if (context && context.hasMuffler) {
      console.log("Silence...");
    } else {
      console.log("Vroom!");
    }
  }
);
```

8. HookMap 是用来映射 key -> Hook 的一个帮助类。

```js
const keyedHook = new HookMap(key => new SyncHook(["arg"]));
keyedHook.tap("some-key", "MyPlugin", arg => {
  /* ... */
});
keyedHook.tapAsync("some-key", "MyPlugin", (arg, callback) => {
  /* ... */
});
keyedHook.tapPromise("some-key", "MyPlugin", arg => {
  /* ... */
});
const hook = keyedHook.get("some-key");
if (hook !== undefined) {
  hook.callAsync("arg", err => {
    /* ... */
  });
}
```

9. MultiHook 可以将多个 hook 合起来一起操作。

```js
const { MultiHook } = require("tapable");
this.hooks.allHooks = new MultiHook([this.hooks.hookA, this.hooks.hookB]);
```

### SyncHook

串行同步执行，当调用 `call()`方法时它会一个个执行 tap 绑定的函数，如下。

```js
const { SyncHook } = require("tapable");
let queue = new SyncHook(["name"]);
queue.tap("1", function(name) {
  console.log(11, name);
});
queue.tap("2", function(name) {
  console.log(22, name);
});
queue.tap("3", function(name) {
  console.log(33, name);
});
queue.call("hi");
```

下面简单实现一下，就是一个发布订阅模式，代码如下:

```js
class SyncHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach(task => task(...args));
  }
}
```

### SyncBailHook

同步保险钩子，如果有一个事件函数返回值为 null 则停止执行后面的事件函数。

```js
let { SyncBailHook } = require("tapable");
let h = new SyncBailHook(["name"]);
h.tap("1", function(name) {
  console.log("1", name);
});
h.tap("2", function(name) {
  console.log("2", name);
  return null;
});
h.tap("3", function(name) {
  console.log("3", name);
});
h.call("hi");
```

简单实现一下，代码如下：

```js
class SyncBailHook {
  constructor(name) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    let ret,
      i = 0,
      len = this.tasks.length;
    // do {
    //     ret = this.tasks[i++](...args)
    // } while (ret !== null && i < len)
    for (; i < len; i++) {
      ret = this.tasks[i](...args);
      if (ret === null) break;
    }
  }
}
```

### SyncWaterfallHook

同步瀑布流钩子，上一个事件函数的返回值会作为下一个事件函数的参数，如果当前没有返回值或返回 undefined 则上一个事件函数的返回值会穿透给下一个事件函数的参数。

```js
let { SyncWaterfallHook } = require("tapable");
let h = new SyncWaterfallHook(["name"]);
h.tap("1", function(name) {
  console.log(name, 1);
  return 11;
});
h.tap("2", function(data) {
  console.log(data, 2);
});
h.tap("3", function(data) {
  console.log(data, 3);
});
h.call("zs");

// zs 1
// 11 2
// 11 3
```

简单实现一下：

```js
class SyncWaterfallHook {
  constructor(name) {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    let ret = args;
    let result;
    this.tasks.forEach(task => {
      if (typeof result !== "undefined") {
        ret = [result];
      }
      result = task(...ret);
    });
  }
}
```

### SyncLoopHook

同步循环钩子，如果当前事件函数的返回值为 undefined，则继续执行下一个，否则一直循环执行。要注意的是返回值不会传递给下一个事件函数，只有瀑布流钩子与返回值有关。

```js
const { SyncLoopHook } = require("tapable");
let h = new SyncLoopHook(["name"]);
let count = 0;
h.tap("1", function(name) {
  console.log(count);
  count++;
  if (count === 3) {
    return;
  }
  return true;
});
h.tap("2", function(name) {
  console.log(name);
});
h.call("hi");
```

简单实现一下：

```js
class SyncLoopHook {
  constructor() {
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...args);
      } while (typeof ret !== "undefined");
    });
  }
}
```

### AsyncParallelHook

异步并行钩子，可以通过 tap、tapAsync、tapPromise 三种方式绑定事件，对应的需要用 callAsync()、callAsync()、promise() 方法触发，它们的最后一个参数是一个回调函数。

1. tap + callAsync() 搭配，和 SyncHook 效果一样。

```js
let { AsyncParallelHook } = require("tapable");
let h = new AsyncParallelHook(["name"]);
console.time("cost");
h.tap("1", function(name) {
  setTimeout(() => {
    console.log(1, name);
  }, 1000);
});
h.tap("2", function(name) {
  setTimeout(() => {
    console.log(2, name);
  }, 2000);
});
h.tap("3", function(name) {
  setTimeout(() => {
    console.log(3, name);
  }, 3000);
});
h.callAsync("hi", err => {
  console.log("err:", err);
  console.timeEnd("cost");
});

// err:undefined
// cost: 10.181ms
// 1 hi
// 2 hi
// 3 hi
```

2. tapAsync + callAsync() 搭配，则需要使用事件回调函数的最后一个参数 callback，表示事件执行完成了，如果有一个事件回调函数没有调用 callback()，则不会触发 callAsync() 的回调。

```js
let { AsyncParallelHook } = require("tapable");
let h = new AsyncParallelHook(["name"]);
console.time("cost");
h.tapAsync("1", function(name, callback) {
  setTimeout(() => {
    console.log(1, name);
    callback();
  }, 1000);
});
h.tapAsync("2", function(name, callback) {
  setTimeout(() => {
    console.log(2, name);
    callback();
  }, 2000);
});
h.tapAsync("3", function(name, callback) {
  setTimeout(() => {
    console.log(3, name);
    callback();
  }, 3000);
});
h.callAsync("hi", err => {
  // 假设其中一个不使用callback()，则这里回调不会执行
  console.log("err:", err);
  console.timeEnd("cost");
});
// 1 hi
// 2 hi
// 3 hi
// err:undefined
// cost: 3008.706ms
```

下面来实现一个 tapAsync 和 callAsync()。

```js
class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  callAsync() {
    let args = Array.from(arguments);
    let callback = args.pop();
    let i = 0,
      length = this.tasks.length;
    function done(err) {
      if (++i == length) {
        callback(err);
      }
    }
    this.tasks.forEach(task => {
      task(...args, done);
    });
  }
}
```

3. tapPromis + promise() 搭配，事件处理函数需要返回一个 promise。

```js
let { AsyncParallelHook } = require("tapable");
let h = new AsyncParallelHook(["name"]);
console.time("cost");
h.tapPromise("1", function(name, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1, name);
      resolve("xx");
    }, 1000);
  });
});
h.tapPromise("2", function(name, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2, name);
      resolve("xx");
    }, 2000);
  });
});
h.tapPromise("3", function(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3, name);
      resolve("xx");
    }, 3000);
  });
});
h.promise("hi").then(data => {
  // 这里data 不会接收resolve(data)的返回值，除非用 waterfall 类型的钩子
  console.log(`data:${data}`);
  console.timeEnd("cost");
});

// 1 hi
// 2 hi
// 3 hi
// cost: 3008.312ms
```

下面简单实现一下：

```js
class AsyncParallelHook {
  constructor() {
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    let promises = this.tasks.map(task => task(...args));
    return Promise.all(promises).then(() => undefined);
  }
}
```

4. 不要用 tapAsync + promise() 搭配或其它搭配方式，有很多问题，而且从名字来看也是不合理的。

### AsyncParallelBailHook

异步并行保险钩子，一旦有事件函数返回值为真值(`if(data)`)，则终止。

1. tap + callAsync() 搭配。一旦有事件函数返回值为真，则执行 callAsync 回调不再执行其它事件函数。
2. tapAsync + callAsync() 搭配，一旦有事件函数的回调 callback(真值)，则执行 callAsync 回调，继续执行其它事件函数。
3. tapPromsie + promise() 搭配，一旦有 reject()，则执行 promise.then() 的 onRejected，只有全部都 resolve()，才执行 promise.then 的 onFullfilled。

### AsyncSeriesHook

异步串行钩子

### AsyncSeriesBailHook

异步串行保险钩子

### AsyncSeriesWaterfallHook

异步串行瀑布流钩子

## 参考资料

- [webpack 源码解析](https://github.com/lihongxun945/diving-into-webpack)
- [如何评价 Webpack 2 新引入的 Tree-shaking 代码优化技术？](https://www.zhihu.com/question/41922432?sort=created)
- [滴滴 webpack 系列](https://github.com/DDFE/DDFE-blog#webpack%E7%B3%BB%E5%88%97)
- [珠峰架构师成长计划](http://www.zhufengpeixun.cn/architecture/html/26.webpack-3.tapable.html)
- [webpack 原理](https://segmentfault.com/a/1190000015088834)
