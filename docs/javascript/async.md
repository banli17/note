# 异步编程

## 异步方案

### callback

### Promise

### generator

### async/await

## 浏览器事件循环

JavaScript 中所有任务分为同步任务和异步任务。

- 同步任务是指：当前主线程将要消化执行的任务，这些任务一起形成执行栈（execution context stack）
- 异步任务是指：不进入主线程，而是进入任务队列（task queue），即不会马上进行的任务。

当同步任务全都被消化，主线程空闲时，即上面提到的执行栈 execution context stack 为空时，将会执行任务队列中的任务，即异步任务。

js 代码执行流程:

1. 初始化全局执行上下文，让其 this 指向 globa 对象(global 对象是默认存在的，即使没有执行 js 代码)
2. 执行栈清空后，事件队列里取出事件函数执行时，将创建一个新的全局执行上下文并将其推送到空的执行堆栈中(再将 this 指向 global)，然后再创建函数的执行上下文。

### setTimeout

mdn 上说 setTimeout 理论最小延迟为 4，也就是说延迟时间如果小于 4 会按照放入的先后顺序进行处理。

```
setTimeout(() => {
    console.log('here 2')
}, 2)
setTimeout(() => {
    console.log('here 1')
}, 1)
setTimeout(() => {
    console.log('here 0')
}, 0);
setTimeout(() => {
    console.log('here 3')
}, 3)
// here 1
// here 0
// here 2
// here 3
```

### 宏任务与微任务

任务队列中的异步任务分为宏任务（macrotask）与微任务（microtask）

一般地宏任务包括：

- setTimeout
- setInterval
- I/O
- 事件
- postMessage
- setImmediate (Node.js，浏览器端该 API 已经废弃, ie 里比 setTimeout 快)
- requestAnimationFrame
- UI 渲染

微任务包括：

- Promise.then
- MutationObserver
- process.nextTick (Node.js)

## 面试题

> 假设现在后端有一个服务，支持批量返回书籍信息，它接受一个数组作为请求数据，数组储存了需要获取书目信息的书目 id。
>
> - 必须只发送一个请求，也就是说调用了一次 fetchBooksInfo
> - 但是这个接口最多只支持 100 个 id 的查询
> - 要考虑服务端出错的情况，比如批量接口请求 [123, 446] 书目信息，但是服务端只返回了书目 123 的信息。
> - 对 id 重复进行处理

```js
// 题目给出的服务代码
const fetchBooksInfo = (bookIdList) => {
  const data = [{ id: 123 }, { id: 456 }, { id: 789 }, { id: 789 }];
  // 模拟查找数据逻辑 并返回promise对象
  let result = data.filter((item) => bookIdList.indexOf(item.id) > -1);
  return Promise.resolve(result);
};
let bookIdListToFetch = [];
let promiseMap = {};
const getUniqueArray = (array) => Array.from(new Set(array));
let timer;

const getBooksInfo = (bookId) =>
  new Promise((resolve, reject) => {
    promiseMap[bookId] = promiseMap[bookId] || [];
    promiseMap[bookId] = { resolve, reject };

    const clearTask = () => {
      bookIdListToFetch = [];
      promiseMap = {};
    };

    if (bookIdListToFetch.length === 0) {
      bookIdListToFetch.push(bookId);

      timer = setTimeout(() => {
        handleFetch(bookIdListToFetch, promiseMap);
        clearTask();
      }, 100);
    } else {
      bookIdListToFetch.push(bookId);

      bookIdListToFetch = getUniqueArray(bookIdListToFetch);

      if (bookIdListToFetch.length >= 100) {
        clearTimeout(timer);
        handleFetch(bookIdListToFetch, promiseMap);
        clearTask();
      }
    }
  });

const handleFetch = (list, map) => {
  fetchBooksInfo(list).then((resultArray) => {
    const resultIdArray = resultArray.map((item) => item.id);

    resultArray.forEach((data) => map[data.id].resolve(data));

    let rejectIdArray = [];
    list.forEach((id) => {
      if (!resultIdArray.includes(id)) {
        rejectIdArray.push(id);
      }
    });

    rejectIdArray.forEach((id) => map[id].reject(id));
  });
};

getBooksInfo(123).then((data) => {
  console.log(data.id); // 123
});
getBooksInfo(456).then((data) => {
  console.log(data.id); // 456
});
```

## 资料

- [全局执行上下文是否有可能弹出执行堆栈？](https://stackoverflow.com/questions/33869145/is-it-possible-for-global-execution-context-to-pop-off-the-execution-stack)
