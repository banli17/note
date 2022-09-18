const fs = require('fs')
const path = require('path')
const vm = require('vm')

const NativeModule = {
  canBeRequiredByUsers(require) {
    const nativeMap = {
      fs: true,
    }
    return nativeMap[require]
  },
}

function loadNativeModule() {}

let requireDepth = 0
const relativeResolveCache = Object.create(null)
class Module {
  constructor() {
    this.exports = {}
    this.paths = []
  }

  require(id) {
    // 1. validateString 校验是否为字符串

    if (id === '') {
      throw new Error('id', id, 'must be a non-empty string')
    }
    requireDepth++

    try {
      return Module._load(id, this, /* isMain */ false)
    } finally {
      requireDepth--
    }
  }
  static _cache = {}

  static _load(request, parent, isMain) {
    let relResolveCacheIdentifier

    if (parent) {
      relResolveCacheIdentifier = `${parent.path}\x00${request}`
      const filename = relativeResolveCache[relResolveCacheIdentifier]
      if (filename !== undefined) {
        const cachedModule = Module._cache[filename]
        if (cachedModule !== undefined) {
          return cacheModule.exports
        }
        // 如果没有缓存 module, 将 path 缓存也删除
        delete relativeResolveCache[relResolveCacheIdentifier]
      }
    }

    const filename = Module._resolveFilename(request, parent, isMain)

    // 如果是 `node:` 前缀的内置模块，会直接返回 module.exports

    const cachedModule = Module._cache[filename]
    if (cachedModule) {
      return cachedModule.exports
    }

    // 内置模块, 如 fs
    const mod = loadNativeModule(filename, request)
    if (mod && mod.canBeRequiredByUsers) return mod.exports

    // 创建 module
    const module = cachedModule || new Module(filename, parent)

    if (isMain) {
      process.mainModule = module
      module.id = '.'
    }

    Module._cache[filename] = module

    module.load(filename)

    return module.exports
  }

  load(filename) {
    // 找到最长扩展名， 如 json -> js
    const extension = findLongestRegisteredExtension(filename)

    this.filename = filename

    // 如果是 mjs 会报错，不能 require('a.mjs')
    Module._extensions[extension](this, filename)
    this.loaded = true

    // 可能有多个点,如 a.json.js
    function findLongestRegisteredExtension(filename) {
      const extname = path.extname(filename)
      // 这里会忽略 . 开头文件，如. gitinore
      if (Module._extensions[extname]) return extname

      return '.js' // 未知后缀，会当作 js 文件
    }
  }

  static _extensions = {
    ['.js'](module, filename) {
      // 如果有 module 的缓存会用缓存 cjsParseCache.get(module);
      let content = fs.readFileSync(filename, 'utf8')

      module._compile(content, filename)
    },
    ['.json'](module, filename) {
      let content = JSON.parse(fs.readFileSync(module.id, 'utf-8'))
      module.exports = content
    },
    ['.node'](module, filename) {
      return process.dlopen(module)
    },
  }

  static wrapper = [
    '(function(exports, require, module, __filename, __dirname){',
    '})',
  ]

  _compile(content, filename) {
    // const compiledWrapper = wrapSafe(filename, content, this)
    content = Module.wrapper[0] + content + Module.wrapper[1]
    console.log('content: ', content)

    // compiledWrapper.function
    let compileFn = vm.runInThisContext(content)
    console.log(compileFn) // [Function (anonymous)]

    let result
    const dirname = path.dirname(filename)
    const require = this.require // makeRequireFunction(this)
    const exports = this.exports
    const thisValue = exports
    const module = this
    // 使用内置的 ReflectApply
    result = compileFn.apply(thisValue, [
      exports,
      require,
      module,
      filename,
      dirname,
    ])
    return result
  }

  static _resolveFilename(request, parent, isMain, options) {
    // node 内置模块直接返回
    if (
      request.startsWith('node:') ||
      NativeModule.canBeRequiredByUsers(request)
    ) {
      return request
    }

    console.log('paths', parent)
    let paths = Module._resolveLookupPaths(request, parent)

    const filename = Module._findPath(request, paths, isMain, false)
    if (filename) return filename

    // 生成错误栈
    const requireStack = []
    for (let cursor = parent; cursor; cursor = cursor.parent) {
      ArrayPrototypePush(requireStack, cursor.filename || cursor.id)
    }
    let message = `Cannot find module '${request}'`
    const err = new Error(message)
    err.code = 'MODULE_NOT_FOUND'
    err.requireStack = requireStack
    throw err
  }

  // 得到解析的路径数组
  static _resolveLookupPaths(request, parent) {
    if (NativeModule.canBeRequiredByUsers(request)) {
      return null
    }

    // 如果不是 . 开头，且不是 .. ./，就当作第三方包，解析 node_modules
    if (
      request.charAt(0) !== '.' ||
      (request.length > 1 &&
        request.charAt(1) !== '.' &&
        request.charAt(1) !== '/')
    ) {
      // modulePaths 不是全局的 node_modules，不知道是什么
      const modulePaths = [
        '/Users/banli/.node_modules',
        '/Users/banli/.node_libraries',
        '/Users/banli/.nvm/versions/node/v14.18.1/lib/node',
      ]
      let paths = modulePaths
      if (parent?.paths?.length) {
        paths = parent.paths.concat(paths)
      }
      return paths
    }
    if (!parent || !parent.filename) {
      const mainPaths = ['.']
      return mainPaths
    }

    console.log('parent', parent)

    const parentDir = [path.dirname(parent.filename)]
    return parentDir
  }

  // 找到真实的文件路径
  static _findPath(request, paths, isMain) {
    // 会从缓存 Module._pathCache 中取
    // 遍历 paths，依次尝试 各个扩展名 .js .json .node ...
    // 如果是目录，尝试找 main 字段 或 文件 index
    // 文件路径添加进缓存 Module._pathCache
    // 内部会调用 fs.realpath 找到文件的真实路径，如果文件不存在会报错，并返回 false
    // 返回文件的绝对路径

    // 将 filename 转为绝对路径
    // /Users/banli/Desktop/my-blog/70-node-core/1-module/v
    let absPath = path.resolve(__dirname, request)
    console.log(absPath)
    // 判断文件或目录是否存在
    if (fs.existsSync(absPath)) {
      console.log('文件存在') // 如果是目录还要 测试 index
      return absPath
    } else {
      console.log('文件定位')
      // 文件定位
      let suffix = Object.keys(Module._extensions)
      console.log(suffix)

      for (let i = 0; i < suffix.length; i++) {
        let newPath = absPath + suffix[i]
        if (fs.existsSync(newPath)) {
          return newPath
        }
      }
    }
    throw new Error(`${request} is not exists`)
  }
}

function myRequire(filename) {
  return new Module().require(filename)
}

const res = myRequire('./v')
console.log(res)


// strip-bom node 对 json 文件处理时，都进行了删除 bom
// Unicode 标准允许使用 UTF-8 格式的 BOM，但不要求也不建议使用它。字节顺序在 UTF-8 中没有意义。
