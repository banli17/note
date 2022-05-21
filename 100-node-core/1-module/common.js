;(function (modules) {

    const cacheModule = {}

    function require(p) {
        const module = {
            exports: {}
        }

        cacheModule[p] = module.exports

        return module.exports
    }


    // 执行 入口 module
    modules['./index.js'](module, exports, require)
})({
    './index.js': function (module, exports, require) {
        console.log('index aaa')
    }
});
