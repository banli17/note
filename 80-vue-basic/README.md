Vue 的构建版本

runtime-only: 不支持 template，需要打包时提前编译。
完整版： 包含运行时和编译器，体积大 10k，会将模版转为 render 函数。

解决方法

1. vue.config.js

runtimeCompiler: false // 默认不带编译器

2. 使用 render(h) 函数
