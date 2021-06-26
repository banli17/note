# 修改脚本

需求：希望通过如下命令来打包发布 A B C 组件

```
npm run pub --params A B C
```

碰到的问题：

1. 参数只能传递给最后的命令，不能传递给中间的 build.js

```
{
  "build": "rollup && node build.js && rollup"
}
```

解决方法：

- shell 函数, 无法较好的将参数 --x a b c 传递给 rollup
  - rollup 一次只能传递一个，而且要 --config- 前缀才不警告
- 单独拆分脚本，在脚本里 childProcess 执行 rollup 命令
- npm 钩子 pre, post 拆分

2. rollup 参数警告

默认只能传 rollup 预先定义的参数，否则会报警告。
要自定义参数需要 --config-x a 这样的形式。
但是传入多个参数则不行 --config-x a b，可以换成 --config-x a --config-x b 然后解析

3. npm 的参数传递需要 --

```
npm run build -- --params A B
```
