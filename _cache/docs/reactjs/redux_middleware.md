# Redux 中间件

- 一个高阶函数 applyMiddleware() 返回新的 store
- 中间件包装 dispatch 方法

## 日志中间件

```js
function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducer, initState) {
      let store = createStore(reducer, initState);
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => store.dispatch(action),
      };
      let dispatch = middleware(middlewareAPI)(store.dispatch);
      return {
        ...store,
        dispatch, // 改写 dispatch
      };
    };
  };
}

// 要返回新的 dispatch 方法
function logger({ getState, dispatch }) {
  return function (next) {
    // 这里的 next 是原生的 store.dispatch
    return function (action) {
      console.log("-------dispatch 之前-------");
      next(action);
      console.log("-------dispatch 之后-------");
    };
  };
}

const store = applyMiddleware(logger)(createStore)(reducer, { count: 0 });
```

上面例子可以看到，applyMiddleware 接收一个中间件函数，它用了柯里化思想，一次传入一个参数，中间件内部最终要返回一个新的 dispatch 方法，而 applyMiddleware 内部最终会返回 store 和这个新的 dispatch。

## 级联中间件

级联中间件是指将多个中间件串联起来。

### compose

串联起来的方法就是 [compose](../javascript/topic.md)。

```js
function add1(str) {
  return "1" + str;
}
function add2(str) {
  return "2" + str;
}
function add3(str) {
  return "3" + str;
}

function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

let result = compose(add3, add2, add1)(" hello");
console.log(result); // "321 hello"
```

### applyMiddleware

applyMiddleware 做的事情：

- 将多个中间件利用 compose 方法串联起来
- 最终会返回带有新 dispatch 的 store
- compose 链式执行中间件时，每个中间件会返回一个新的 dispatch 方法，供下一个中间件使用(就是中间件里的 next 参数)。

```js
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer, initState) {
      let store = createStore(reducer, initState);
      let dispatch;
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };
      // 返回一个将参数注入后的中间件函数数组 function(next){}
      let chain = middlewares.map((middleware) => middleware(middlewareAPI));
      // asynclogger(logger(store.dispatch))
      // logger(store.dispatch) 创建一个新的 dispatch 给 asynclogger
      // asynclogger(newDispatch) 再创建一个新的 dispatch
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch, // 这里的 dispatch 是最终经过包装后的 dispatch
      };
    };
  };
}

// 这里的 dispatch 是最终的 dispatch
function logger({ getState, dispatch }) {
  return function (next) {
    // 这里的 next 是经过上一轮包装过的 dispatch
    return function (action) {
      console.log("-------logger 之前-------");
      next(action);
      console.log("-------logger 之后-------");
    };
  };
}

function asynclogger({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      setTimeout(() => {
        console.log("-------asynclogger 之前-------");
        next(action);
        console.log("-------asynclogger 之后-------");
      }, 2000);
    };
  };
}

const store = applyMiddleware(asynclogger, logger)(createStore)(reducer, {
  count: 0,
});
```

## redux-saga

- 默认情况下 reducers 里的操作是同步的，且是纯函数。
- redux-saga 是一个 redux 中间件，可以通过它进行一些副作用操作，如异步操作 ajax。
- redux-saga 内部分为三个 saga
  - worker saga 实际的工作，如异步请求，然后获取返回结果
  - watcher saga 监听被 dispatch 的 actions，当收到 actions 被触发时，调用 worker saga
  - root saga 启动 saga 的入口

### 使用

1. 安装依赖库

```
npm i react-redux redux-saga
```

### generator

![](./imgs/2021-04-28-15-16-07.png)

co 源码如下：

```js
function co(gen) {
  var ctx = this;

  // 0. 返回一个 Promise，后面可以 then
  return new Promise(function (resolve, reject) {
    // 1. 如果是函数就执行
    if (typeof gen === "function") gen = gen.call(ctx);
    // 不是函数就直接 resolve(gen)
    if (!gen || typeof gen.next !== "function") return resolve(gen);

    // 2. 开始启动第一次执行
    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    // 3. 重点 next，递归
    function next(ret) {
      // 如果执行完成，就 resolve() 最后一次的结果
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value); // 将值统一转为 promise
      // 继续执行 onFulFilled
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      // 如果失败，跑出 TypeError
      return onRejected(
        new TypeError(
          "You may only yield a function, promise, generator, array, or object, " +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      );
    }
  });
}
```
