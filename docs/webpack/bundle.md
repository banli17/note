# webpack 打包文件分析

## 同步加载

webpack 自己实现了一套模块化方案，和 commonjs 比较像，类似代码如下。

```js
(() => {
  let modules = {
    "./src/util.js": (module, exports, require) => {
      module.exports = "hello util";
    },
  };

  let cache_modules = {};
  function require(moduleId) {
    // 有缓存就走缓存
    const cacheModule = cache_modules[moduleId];
    if (cacheModule) return cacheModule;

    // 没有缓存，执行模块代码，传入 module
    // commonjs 导出时 module.exports 存放的就是结果
    cache_modules[moduleId] = { exports: {} };
    let module = cache_modules;
    let exports = module.exports;
    modules[moduleId].call(module.exports, module, exports, require);
    return module.exports; // 返回导出结果
  }
  // 执行入口文件的代码
  (() => {
    let result = require("./src/util.js");
    console.log(result);
  })();
})();
```

1. modules 是一个对象，里面的 key 是以资源相对项目目录的相对路径，值是一个函数，将导出的结果放在了 module.exports 上。
2. require 方法，用来加载模块。

## 兼容性实现

考虑到我们写代码时可能用 esModule 或 commonjs 不同的模块化方案。webpack 将它们做兼容转换。

### commonjs 加载 commonjs

代码就和上面的同步加载一样， commonjs 模块不会被转换，还是用 `module.exports`。

### commonjs 加载 esModule

commonjs 加载 esModule 时， esModule 模块会用 r 方法处理。

因为 esModule 导出时, export default 和 export const a 是不一样的。webpack 将它们转换为挂载到一个对象上。

```js
export default 3;
export const b = 1;

// 转换为如下对象
{
  default: 3,
  b: 1
}
```

下面是实现原理。

```js
(() => {
  var modules = {
    "./src/title.js": (module, exports, require) => {
      require.r(exports);
      require.d(exports, {
        default: () => DEFAULT_EXPORT,
        age: () => age,
      });
      const DEFAULT_EXPORT = "title_name";
      const age = "title_age";
    },
  };
  var cache = {};
  function require(moduleId) {
    const cacheModule = cache_modules[moduleId];
    if (cacheModule) return cacheModule;

    cache_modules[moduleId] = { exports: {} };
    let module = cache_modules;
    let exports = module.exports;
    modules[moduleId].call(module.exports, module, exports, require);
    return module.exports;
  }
  require.d = (exports, definition) => {
    // 给 exports 添加属性 exports.default exports.age
    for (var key in definition) {
      if (require.o(definition, key) && !require.o(exports, key)) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        });
      }
    }
  };
  require.r = (exports) => {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    Object.defineProperty(exports, "__esModule", { value: true });
  };
  require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

  (() => {
    let result = require("./src/util.js");
    console.log(result);
  })();
})();
```

- require.d 将 esModule 里导出的数据挂载到 exports 上，比如 default、age。
- require.r 用来给 esModule 模块添加标识 `__esModule: true`。webpack 编译 esModule 时，会在模块代码里加上 `require.r(exports)`。

### esModule 加载 esModule

如果两个模块都是 esModule,它们就模块代码里都会包裹上`require.r(exports)`。

### esModule 加载 commonjs

如果使用 import 引入 commonjs 代码。

```
import a from './util.js'
```

这里的 a 是 default，所以会增加一个 n 方法，如果是 esModule 就让 default 的值是 module.exports 的整个对象：

```js
require.n = (module) => {
  var getter =
    module && module.__esModule ? () => module["default"] : () => module;
  return getter;
};
```

## 异步加载

异步加载代码执行原理：

1. 弄个 promise 队列执行，使得`installedChunks[chunkId] = [resolve, reject]`
2. 使用 jsonp 加载模块
3. 模块加载完成后，自动执行，里面会执行 chunkLoadingGlobal.push 方法，它会让 `resolve()`或者`reject()` 执行，并让 `installedChunks[chunkId] = 0` 表示模块安装完成。

```js
(() => {
  var modules = (require.m = {});

  var cacheModules = {};
  function require(moduleId) {
    var cacheModule = cacheModules[moduleId];
    if (cacheModule) return cacheModule;

    let module = (cacheModules[moduleId] = { exports: {} });
    // 模块里用了 this，才使用 call
    modules[moduleId](module, module.exports, require);
    return module.exports;
  }
  // 为什么 Promise.all ?
  require.e = function (chunkId) {
    let promises = [];
    require.f.j(chunkId, promises);
    return Promise.all(promises);
  };
  require.f = {};

  // unionFilename
  require.u = (chunkId) => "" + chunkId + ".js";
  // publicPath
  require.p = "/";
  var installedChunks = {
    // 0  已加载完成
    // undefined 还没加载
    // null preloaded prefetched
    // Promis 正在加载
    main: 0,
  };
  require.f.j = function (chunkId, promises) {
    var installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) {
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        var promise = new Promise((resolve, reject) => {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push((installedChunkData[2] = promise));
        // jsonp 加载资源
        var url = require.p + require.u(chunkId);
        require.load(url);
      }
    }
    // 加载完资源后，资源里的js会执行 push 方法
  };

  require.load = function (url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
  };

  var chunkLoadingGlobal = (window["webpack5"] = []);
  // moduleId 是个数组
  chunkLoadingGlobal.push = webpackJsonpCallback;
  function webpackJsonpCallback([chunkIds, moreModules]) {
    var resolves = [];
    chunkIds.forEach((chunkId) => {
      resolves.push(installedChunks[chunkId][0]);
      installedChunks[chunkId] = 0;
    });
    moreModules.forEach((key) => {
      require.m[key] = moreModules[key];
    });
    while (resolves.length) {
      resolves.shift()();
    }
  }

  require.e("src_hello_js").then((res) => {
    console.log(res);
  });
})();
```
