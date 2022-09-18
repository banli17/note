# require 源码解析

## require 使用场景

加载模块类型

- 加载内置模块：`require('fs')`
- 加载 node_modules 模块：`require('ejs')`
- 加载本地模块：`require('.utils')`

支持文件类型

- 加载 js 文件
- 加载 json 文件
- 加载 mjs 文件
- 加载 node 文件
- 加载其它文件，统一当作 js 文件处理

## 问题

- 如何加载主模块?
- require 的实现逻辑?
- 如何处理不同类型的文件?

```js
// run_main_module.js
require('internal/modules/cjs/loader').Module.runMain(process.argv[1]);

// run_main.js
function executeUserEntryPoint(main = process.argv[1]) {
  const resolvedMain = resolveMainPath(main);
  const useESMLoader = shouldUseESMLoader(resolvedMain);
  if (useESMLoader) {
    runMainESM(resolvedMain || main);
  } else {
    // Module._load is the monkey-patchable CJS module loader.
    Module._load(main, null, true);
  }
}


```
