// commonjs browserify 实现

(function () {
  function r(modules, cache, entry) {
    function require(id) {
      if (cache[id]) {
        return cache[id]
      }
      // 直接调用函数
      const module = cache[id] = {
        exports: {}
      }
      modules[id][0].call(module.exports, (key) => {
        const cid = modules[id][1][key]
        return require(cid || key)
      }, module, module.exports)
      return module.exports
    }

    for (let i = 0; i < entry.length; i++) {
      require(entry[i])
    }
    return require
  }
  return r
})()({
  0: [function (require, module, exports) {
    const b = require('./b.js')
    console.log('b', b)
    module.exports = {
      a: b.name
    }
  }, {
    './b.js': 1, // 依赖
  }],
  1: [function (require, module, exports) {
    module.exports = {
      name: 'zs'
    }
  }, {}]
}, {}, [0])
