// require的原理
// 1. 将模块放入独立作用域中
// 2. 执行模块内容
// 3. 将module.exports导出
var Module = {
    cache: {

    }
}

function mRequire(str) {
    var module = {
        exports: {}
    };
    if (Module.cache[str]) {
        console.log('xx')
        return Module.cache[str];
    } else {
        Module.cache[str] = module.exports;
    }
    (function (exports, require, module, __filename, __dirname) {
        // exports = 'hi' // exports实际是module.exports的引用
        if (str === 'a') {
            module.exports.a = 'aaa'
        } else {
            module.exports.b = 'bbb'
        }
        var c = mRequire(str == 'b' ? 'a' : 'b')
        console.log('xx', c)
    })(module.exports, mRequire, module);
    return module.exports
}

console.log(mRequire('a'))