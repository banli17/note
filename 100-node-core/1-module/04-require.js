const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(id) {
  this.id = id
  this.exports = {}
}
Module._resolveFilename = function (filename) {
  // 将 filename 转为绝对路径
  // /Users/banli/Desktop/my-blog/70-node-core/1-module/v
  let absPath = path.resolve(__dirname, filename)
  console.log(absPath);
  // 判断文件或目录是否存在
  if (fs.existsSync(absPath)) {
    console.log('文件存在') // 如果是目录还要 测试 index
    return absPath
  } else {
    console.log('文件定位')
    // 文件定位
    let suffix = Object.keys(Module._extensions)
    console.log(suffix);

    for (let i = 0; i < suffix.length; i++) {
      let newPath = absPath + suffix[i]
      if (fs.existsSync(newPath)) {
        return newPath
      }
    }
  }
  throw new Error(`${filename} is not exists`)
}

Module._cache = {}

Module._extensions = {
  '.js'(module) {
    // 读取 js 文件
    let content = fs.readFileSync(module.id, 'utf-8')

    // 包装
    content = Module.wrapper[0] + content + Module.wrapper[1]
    console.log('content: ', content)

    // vm.runInThisContext(content)
    let compileFn = vm.runInThisContext(content)
    console.log(compileFn); // [Function (anonymous)]

    // 准备参数值
    let exports = module.exports
    let dirname = path.dirname(module.id)
    let filename = module.id
    compileFn.call(exports, exports, myRequire, module, filename, dirname)
  },
  '.json'(module) {
    let content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
    module.exports = content
  }
}

Module.wrapper = [
  "(function(exports, require, module, __filename, __dirname){",
  "})"
]

Module.prototype.load = function () {
  let extname = path.extname(this.id)
  console.log(extname);

  Module._extensions[extname](this)
}

function myRequire(filename) {
  // 1. 绝对路径
  let absPath = Module._resolveFilename(filename)
  console.log('absPath', absPath);

  // 2. 缓存优先
  let cacheModule = Module._cache[absPath]
  if (cacheModule) {
    return cacheModule.exports
  }

  // 3. 创建空对象，加载目标模块
  let module = new Module(absPath)

  // 4. 缓存已经加载的模块
  Module._cache[absPath] = module

  // 5. 执行加载
  module.load()

  // 6. 返回数据
  return module.exports
}

const res = myRequire('./v')
myRequire('./v')
console.log(res)
