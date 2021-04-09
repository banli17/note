let oldArrayProtoMethods = Array.prototype

// 继承
export let arrayMethods = Object.create(oldArrayProtoMethods)

let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice',
]
methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        // console.log(method + '被调用了')
        const result = oldArrayProtoMethods[method].apply(this, args)
        const ob = this.__ob__
        let inserted  // 表示数组新增的数据，也要做拦截
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args
                break;
            case 'splice':
                inserted = args.slice(2)
                break;
        }

        if (inserted) ob.observeArray(inserted)  // 新增加的数据也要观测

        ob.dep.notify()
        return result
    }
})






























