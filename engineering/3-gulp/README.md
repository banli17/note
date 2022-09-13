# gulp

## 入门

```sh
npm i gulp
```

最新 gulp v4 只能通过回调函数来结束任务。

gulp 中定义任务的方式是通过 `exports.` 直接导出方法，或者通过 `gulp.task(name, fn)`，后者不推荐。

gulp 和 grunt 一样，也是会默认执行 default 任务，通过传参 `gulp [taskname]` 来执行其它任务。

```js
exports.foo = (done) => {
  console.log("foo task working~");
  done();
};

// gulp foo
```

创建组合任务

任务结束的四种方式

1、调用 done 方法
2、返回一个 promise
3、通过 async 函数，无需 return
4、返回一个 stream，gulp 内部会监听 `stream.on('end', () => done())` 进行结束。

> 普通函数不调用 done，而是 return 是不会结束任务的。

通过调用 `done(new Error())` 或一个 promise.reject() ，可以让任务失败。

**文件 api 和 gulp 插件**
