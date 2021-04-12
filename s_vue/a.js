function freeze(obj) {
    for (let key in obj) {
        Object.defineProperty(obj, key, {
            writable: false,
            configurable: false
        })
    }
    // Object.seal(obj)  // 不能添加新属性和删除属性，可修改，不可配置
}

var a = { c: 1, b: { a: 2 } }

freeze(a)

delete a.c
console.log(a);

Object.defineProperty(a, 'c', { configurable: true })