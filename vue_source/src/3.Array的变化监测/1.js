const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach((method) => {
    const original = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function mutator(...args) {
            console.log(`${method} called`, ...args);
            // notify
            const ob = this.__ob__

            let res = original.apply(this, args)
            ob.dep.notify()

            return res
        },
        enumerable: false,
        writable: true,
        configurable: true
    })
})

const window = {}

class Dep {
    constructor() {
        this.subs = []
    }

    addSub(sub) {
        this.subs.push(sub)
    }

    removeSub(sub) {
        remove(this.subs, sub)
    }

    depend() {
        if (window.target) {
            this.addSub(window.target)  // 这里是 watcher 
        }
    }

    notify() {
        const subs = this.subs.slice()
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update()
        }
    }
}

function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        value,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    })
}

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

function protoAugument(target, src, keys) {
    target.__proto__ = src
}

function copyAugment(target, src, keys) {
    for (let i = 0, l = src.length; i < l; i++) {
        const key = keys[i]
        def(target, key, src[key])
    }
}

// 将一个对象变为响应式
class Observer {
    constructor(value) {
        this.value = value
        this.dep = new Dep()
        def(value, '__ob__', this)

        if (Array.isArray(value)) {
            // value.__proto__ = arrayMethods
            const augment = hasProto ? protoAugument : copyAugment
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }

    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i])
        }
    }

    walk(obj) {
        // for (let k in obj) {
        //     defineReactive(obj, k, obj[k])
        // }
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }
}

function isObject(o) {
    return typeof o === 'object' && o !== null
}

function observe(value, asRootData) {
    if (!isObject(value)) {
        return
    }
    let ob
    // 已经是响应式
    if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__
    } else {
        ob = new Observer(value)
    }
    return ob
}

// 
function defineReactive(data, key, val) {

    let childOb = observe(val)  // 子对象
    let dep = new Dep()

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`读取了data 的 ${key} 属性：值为 ${val}`);
            dep.depend()

            if (childOb) {
                childOb.dep.depend()
            }
            return val
        },
        set: function (newVal) {
            console.log(`设置了data 的 ${key} 属性：值为 ${newVal}`);
            if (val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
    })
}




class Watcher {
    constructor(vm, expOrFn, cb) {
        this.vm = vm
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get() // 获取 vm[expOrFn] 的值，如 person['name.aliasName']
    }

    get() {
        console.log('get');
        window.target = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}

const bailRE = /[^\w.$]/
function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function (obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}



function main() {
    var person = {
        name: '张三',
        age: 20,
        gf: {
            name: '李四',
            age: 18
        },
        hobs: []
    }

    new Observer(person)

    // for (k in person) {
    //     defineReactive(person, k, person[k])
    // }

    new Watcher(person, 'hobs', function (oldValue, value) {
        console.log('watcher 触发了', oldValue, value);
    })

    person.hobs.push('books')
    person.hobs.push('tv')

    person.hobs.sort()
}

main()