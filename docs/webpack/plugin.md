# plugin

插件向第三方开发者提供了 webpack 引擎中完整的能力。使用阶段式的构建回调，开发者可以引入它们自己的行为到 webpack 构建流程中。

## 为什么需要插件

- webpack 基础配置无法满足需求
- 插件几乎能够任意更改 webpack 编译结果
- webpack 内部也是通过大量内部插件实现的

就和 vue、react 等提供的钩子函数一样，我们可以在钩子里做自己的事情。

### 可以加载插件的对象

- Compiler
  - run
  - compiler
  - compilation
  - make
  - emit
  - done
- Compilation
  - buildModule
  - normalModuleLoader
  - successedModule
  - finishModule
  - seal
  - optimize
  - after-seal
- Module Factory
  - beforeResolver
  - afterResolver
  - module
  - parser
- Module
- Parser
  - program
  - statement
  - call
  - expression
- Template
  - hash
  - bootstrap
  - localVars
  - render

如何给编译结果添加一个文件
