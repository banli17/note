# v8 宏任务与微任务

宏任务：消息队列中等待被主线程执行的事件。
微任务：异步执行的函数，执行时机在主函数执行结束后，下个宏任务执行前，每个执行栈都有一个微任务队列。

因为宏任务无法胜任精度和实时性高的场景，所以有了微任务，可以异步和插队。

主线程
调用栈: 用来管理主线程上执行的函数的调用关系。
消息队列

v8 执行代码时：

-   将全局执行上下文压入调用栈
-   执行函数时，将函数的执行上下文压入栈，执行完后弹出
-   如果中间有微任务，会放入微任务队列(全局上下文中)
-   有宏任务，会放到消息队列中
-   主线程代码执行完成后，会将微任务队列清空(相当于 for 循环)，清空调用栈
-   然后会一个个取出宏任务执行，如取出一个宏任务执行，这里面宏任务里又可能产生微任务，这里的微任务会放到当前宏任务执行完后执行

```js
Promise.resolve()
    .then(function a0() {
        console.log(0);
        return Promise.resolve(4); // 微任务 b，相当于 x.then 这个比 console.log(2) 要慢，所以3放在前面
    })
    .then(function a4(res) {
        console.log(res);
    });
Promise.resolve()
    .then(function a1() {
        console.log(1);
    })
    .then(function a2() {
        console.log(2);
    })
    .then(function a3() {
        console.log(3);
    })
    .then(function a5() {
        console.log(5);
    })
    .then(function a6() {
        console.log(6);
    });
```

-   微任务队列[a0, a1]
-   执行栈 [a0, a1]，微任务队列 [b, a2]
-   执行栈 [b 异步的, a2]，微任务队列 [a3, a4]

```js
new Promise((resolve, reject) => {
    console.log("外部promise");
    resolve();
})
    .then(() => {
        console.log("外部第一个then");
        new Promise((resolve, reject) => {
            console.log("内部promise");
            resolve();
        })
            .then(() => {
                console.log("内部第一个then");
                return Promise.resolve();
            })
            .then(() => {
                console.log("内部第二个then");
            });
    })
    .then(() => {
        console.log("外部第二个then");
    })
    .then(() => {
        console.log("外部第三个then");
    })
    .then(() => {
        console.log("外部第四个then");
    });
```
