---
title: node模块化机制
date: 2017-06-28 23:07:27
tags:
---

## 学习资料

- [node.js 动态执行脚本](http://www.cnblogs.com/rubylouvre/archive/2011/11/25/2262521.html)
- [深入浅出node.js 第二章]

## 简介

- 文件中的`this`是被修改了的，指的是`module.exports`。
- 在node环境(REPL: read evaluate print loop)中，this就是global。
- global是全局变量。
    - `process`: 进程，程序都是运行在进程里
    - `Buffer`: 操作文件，文件都是二进制(实际它是16进制，可以看作是内存)，可以和字符串转换
    - `clearImmediate`和`setImmediate`: 宏任务
    - `clearTimeout`和`setTimeout`:
    - `clearInterval`和`setInterval`:

## process

```javascript
console.log()
console.info()
process.stdout.write('hello')  // 1.标准输出

console.warn()
console.error()
process.stderr.write('hello')  // 2.错误输出

process.stdin.on('data', function(data){
    console.log(data.toString())  // 0表示标准输入
})
```

- `pid()`
- `exit()`
- `cwd()` 当前工作目录，可以在后续启动项目时，用户在哪个目录启动的
- `chdir()` 修改工作目录
- `nextTick()`: 微任务

```
// nextTick比then快
process.nextTick(()=>{
    console.log('nextTick')
})
```
- env 环境变量

```
// 可以先设置个环境变量NODE_ENV: win SET NODE_ENV="production"  mac export ..
// 然后判断时开发还是线上环境
if( process.env.NODE_ENV == 'development' ){
    url  = 'http://localhost:8081'
}else{
    url = 'http://xx.com'
}
```

- argv 参数，命令行可以传一些参数，返回一个数组，第一项时命令文件路径，第二项时运行的文件路径，第三个参数开始是传递的参数。

```
// yargs 把执行命令的时候传递的参数解析成对象，比如传递 -p 3000 -t xx
let args = process.argv.slice(2)
args = args.reduce((prev,next,currentIndex,arr)=>{
    if(next.includes('-')){
        prev[next.slice(1)] = arr[currentIndex + 1]
    }
    return prev
}, {})
```



## node事件环

每次队列清空后，或者达到执行的最大限制切换到下个队列时，执行微任务。


## 模块化

amd/cmd

commonjs模块化规范：
1. 一个文件就是一个模块
1. require()引用模块
2. module.exports导出模块

```
function clusor(exports, module){
    module.exports = 'xx'
}
```

require()是同步执行的 fs.readFileSync()

eval执行环境不干净。

让字符串代码执行的方式 eval(str) 和 new Function(...args, str) 

eval里代码执行会有上层的执行环境，不干净。new Function 会生成一个独立的环境

path常用的方法
- extname 获取扩展名
- dirname
- join()
- resolve()  有/会编程根目录，会解析成绝路路径

__dirname
__filename

## 模块编译



### js模块的编译

node 是先读取文件，然后包装成`(function(exports,module...){fn代码})`，然后用`vm.runInThisContext(fn)`执行函数，它是内置模块，环境是干净的。原理代码如下：

```
var Script = process.binding('evals').NodeScript;
var runInThisContext = Script.runInThisContext;
 
  NativeModule.wrap = function(script) {
    return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
  };
 
  NativeModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ];
 
  NativeModule.prototype.compile = function() {
    var source = NativeModule.getSource(this.id);
    source = NativeModule.wrap(source);
 
    var fn = runInThisContext(source, this.filename, true);
    fn(this.exports, NativeModule.require, this, this.filename);
 
    this.loaded = true;
  };
```

其中的Script对象和require('vm')返回的对象很相似，但是vm模块实际是Script对象的封装。



- `fs.accessSync()` 判断文件是否能访问到，没有文件就报错。
- `path.resolve()` 把相对路径转成绝对路径

```javascript
try{
    fs.accessSync('1.txt')
} catch(e){}

path.resolve(__dirname, '1.txt')
path.resolve('a', '/') // 注意：这个返回盘的根目录

// 拼接路径
path.join(__dirname, '1.txt')

// 取文件扩展名
path.extname('1.min.js')  // 'js'

// 取文件基础名，第二个参数标志哪个不是基础名
path.basename('1.min.js', '.min.js')
```

文件扩展名：`.js`、`.json`、`.node`。

## require()源码分析

下面粗略的利用单步来跟踪一下require的源码是怎么写的。

**1.require()的定义**

```javascript
function makeRequireFunction(mod) {
  const Module = mod.constructor;

  function require(path) {
    try {
      exports.requireDepth += 1;
      return mod.require(path);
    } finally {
      exports.requireDepth -= 1;
    }
  }

  function resolve(request, options) {
    return Module._resolveFilename(request, mod, false, options);
  }

  require.resolve = resolve;

  function paths(request) {
    return Module._resolveLookupPaths(request, mod, true);
  }

  resolve.paths = paths;

  require.main = process.mainModule;

  // Enable support to add extra extension types.
  require.extensions = Module._extensions;

  require.cache = Module._cache;

  return require;
}
```

上面的代码主要是定义了`require()`，返回了`mod.require(path)`。

**2.mod.require()**

```javascript
Module.prototype.require = function(path) {
  assert(path, 'missing path');
  assert(typeof path === 'string', 'path must be a string');
  return Module._load(path, this, /* isMain */ false);
};
```

这是Module类原型上的一个方法，主要是返回`Modal._load(path, this, false)`。path是路径，this是Module的实例，false表示是否是核心模块。

**3.Module._load()**

```javascript
Module._load = function(request, parent, isMain) {
  if (parent) {
    debug('Module._load REQUEST %s parent: %s', request, parent.id);
  }

  if (isMain && experimentalModules) {
    (async () => {
      // loader setup
      if (!ESMLoader) {
        ESMLoader = new Loader();
        const userLoader = process.binding('config').userLoader;
        if (userLoader) {
          const hooks = await ESMLoader.import(userLoader);
          ESMLoader = new Loader();
          ESMLoader.hook(hooks);
        }
      }
      Loader.registerImportDynamicallyCallback(ESMLoader);
      await ESMLoader.import(getURLFromFilePath(request).pathname);
    })()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
    return;
  }

  // 用来拼接文件的完整路径
  var filename = Module._resolveFilename(request, parent, isMain);

  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }

  if (NativeModule.nonInternalExists(filename)) {
    debug('load native module %s', request);
    return NativeModule.require(filename);
  }

  // Don't call updateChildren(), Module constructor already does.
  var module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = '.';
  }

  Module._cache[filename] = module;

  tryModuleLoad(module, filename);

  return module.exports;
};
```

上面的代码，首先获取了文件的路径，然后查看缓存`Module.cache`里是否有，如果有，则直接返回`cachedModule.exports`。如果没有则`new Module(filename, parent)`创建模块实例，添加到缓存中并且返回实例的exports属性。

**4.Module._resolveFilename()**

这个方法里面使用了`Module._findPath()`，用于匹配文件，比如`require('./2')`,它会依次去添加'.js'、'.json'、'.node'后缀尝试寻找文件，找到则返回。

**5.tryModuleLoad和Module.prototype.load**

```javascript
function tryModuleLoad(module, filename) {
  var threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete Module._cache[filename];
    }
  }
}

Module.prototype.load = function(filename) {
  debug('load %j for module %j', filename, this.id);

  assert(!this.loaded);
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  var extension = path.extname(filename) || '.js';
  if (!Module._extensions[extension]) extension = '.js';
  Module._extensions[extension](this, filename);
  this.loaded = true;

  if (ESMLoader) {
    const url = getURLFromFilePath(filename);
    const urlString = `${url}`;
    const exports = this.exports;
    if (ESMLoader.moduleMap.has(urlString) !== true) {
      ESMLoader.moduleMap.set(
        urlString,
        new ModuleJob(ESMLoader, url, async () => {
          const ctx = createDynamicModule(
            ['default'], url);
          ctx.reflect.exports.default.set(exports);
          return ctx;
        })
      );
    } else {
      const job = ESMLoader.moduleMap.get(urlString);
      if (job.reflect)
        job.reflect.exports.default.set(exports);
    }
  }
};
```

这里主要是加载模块，因为通过上面的拼接已经得到了文件的路径，这里根据文件的后缀名(.js,.json等)执行不同的方法，比如`.js`，去执行`Module._extensions[js](this,filename)`方法。

```javascript
Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(internalModule.stripBOM(content), filename);
};
```

首先读取js文件内容，然后调用`_compile()`方法。

```javascript
Module.prototype._compile = function(content, filename) {

  content = internalModule.stripShebang(content);

  // create wrapper function
  var wrapper = Module.wrap(content);

  var compiledWrapper = vm.runInThisContext(wrapper, {
    filename: filename,
    lineOffset: 0,
    displayErrors: true
  });

  var inspectorWrapper = null;
  if (process._breakFirstLine && process._eval == null) {
    if (!resolvedArgv) {
      // we enter the repl if we're not given a filename argument.
      if (process.argv[1]) {
        resolvedArgv = Module._resolveFilename(process.argv[1], null, false);
      } else {
        resolvedArgv = 'repl';
      }
    }

    // Set breakpoint on module start
    if (filename === resolvedArgv) {
      delete process._breakFirstLine;
      inspectorWrapper = process.binding('inspector').callAndPauseOnStart;
      if (!inspectorWrapper) {
        const Debug = vm.runInDebugContext('Debug');
        Debug.setBreakPoint(compiledWrapper, 0, 0);
      }
    }
  }
  var dirname = path.dirname(filename);
  var require = internalModule.makeRequireFunction(this);
  var depth = internalModule.requireDepth;
  if (depth === 0) stat.cache = new Map();
  var result;
  if (inspectorWrapper) {
    result = inspectorWrapper(compiledWrapper, this.exports, this.exports,
                              require, this, filename, dirname);
  } else {
    result = compiledWrapper.call(this.exports, this.exports, require, this,
                                  filename, dirname);
  }
  if (depth === 0) stat.cache = null;
  return result;
};
```

`_compile()`首先是将js内容包裹一层`(function(exports,require,module,__dirname,__filename){ js代码 })()`。然后通过`vm.runInThisContext`处理一下(类似eval，但是环境是干净的)并返回，最后执行并返回`compiledWrapper.call(this.exports, this.exports, require, this,filename, dirname)`。

## 手动实现require()原理

好吧，大致了解了node module的原理，接下来大致实现一下，代码比较差，肯定没有官方那么好。

```javascript
function require(path){
    return Module._load(path)
}

function Module(id){
    this.id = id
    this.exports = exports
}
Module._extensions = {
    '.js'(){},
    '.json'(){},
    '.node'(){}
}
Module._load = function(){
    var filename = Module._resolveFilename(request)
    var module = new Module(filename)
    tryModuleLoad(module, filename)
    return module.exports
}
Module._resolveFilename = function(request){
    // 尝试找文件
    if(!path.extname(request)){
        // 尝试加后缀
        let exts = Object.keys(Module._extensions)
        for(let i =0;i<exts.length;i++){
            let filename = __dirname + exts[i]
            try{
                if(fs.accessSync(filename)){
                    return filename
                }
            }catch(e){

            }
        }
        throw new Error('没有找到文件')
    }
    return path.resolve(__dirname, request)
}
```
