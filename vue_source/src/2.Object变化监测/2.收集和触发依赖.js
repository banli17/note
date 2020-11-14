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

function defineReactive(data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            console.log(`读取了data 的 ${key} 属性：值为 ${val}`);
            dep.depend()
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
        }
    }

    for (k in person) {
        defineReactive(person, k, person[k])
    }

    defineReactive(person.gf, 'age', person.gf.age)

    new Watcher(person, 'age', function (oldValue, value) {
        console.log('watcher 触发了', oldValue, value);
    })
    new Watcher(person, 'gf.age', function (oldValue, value) {
        console.log('watcher 触发了', oldValue, value);
    })

    // person.name
    person.age = 21
    person.gf.age = 19
}

main()