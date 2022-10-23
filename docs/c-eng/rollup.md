# rollup

## js API

https://rollupjs.org/guide/en/#javascript-api

rollup 提供了两个方法 rollup 和 watch。

**rollup**

```js
const bundle = await rollup(inputConfig);
await bundle.generate(outputConfig); // 输出到内存
await bundle.write(outputConfig); // 输出到文件

bundle.close();
```

**watch**

watch(rollupConfig), 这个 rollupConfig 是 inputConfig 和 outputConfig 的合并。

```js
watcher.on("event", (event) => {
  if (event.result) {
    event.result.close();
  }
});
```
