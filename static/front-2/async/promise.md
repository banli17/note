# js异步编程


## Promise实现

jquery -> $.Deferred

```
// html代码
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
<script>
    var dtd = $.Deferred(); // 新建一个deferred对象
    setTimeout(() => {
        console.log(1)
    })

    var wait = function (dtd) {

        console.log(2)
        for (let i = 0; i < 10000; i++) {
            i == 9999 && dtd.resolve()
        }
        console.log(3)
        return dtd;

    };

    $.when(wait(dtd))
        .then(() => {
            console.log(4)
        })

    console.log(5)
</script>

// 结果：2 3 5 1 4
```

### Promise规范

`Promise/A+规范`定义了相关的规范。它规定：


## 参考资料

- [JavaScript 异步编程学习笔记](https://github.com/riskers/blog/issues/22)
- [Promises/A+规范](https://promisesaplus.com/)
- [Promise/A+规范中文版](https://segmentfault.com/a/1190000002452115)
- [史上最易读懂的 Promise/A+ 完全实现](https://zhuanlan.zhihu.com/p/21834559)
- [理解 js 事件循环二 (macrotask 和 microtask)](https://juejin.im/entry/58332d560ce46300610e4bad)
- [Promise then中回调为什么是异步执行？](https://www.zhihu.com/question/57071244)
2.异步发展过程：callback、promise、generator、co、async/await等异步流程控制(async和await的实现原理)
   3.promise设计模式原理及在es6中的应用，手写一个符合promise A+规范的promise实现
- [自己动手实现 ES6 Promise](https://github.com/whinc/blog/issues/2)