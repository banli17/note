import {pushTarget, popTarget} from './dep'

let id = 0  // watcher 的id

class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.cb = cb
        this.options = options
        this.user = options.user  // 用户写的 watcher
        // 渲染 watcher
        this.isWatcher = options === true
        this.lazy = options.lazy
        this.dirty = this.lazy // 取值时是否执行用户

        this.id = id++
        this.deps = []
        this.depsId = new Set()

        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn
        } else {
            // 用户写的 watcher
            this.getter = function () {
                let path = exprOrFn.split('.')
                let obj = vm
                for (let i = 0; i < path.length; i++) {
                    obj = obj[path[i]]
                }
                // 获取观测对象的值
                return obj
            }
        }

        // 计算属性，默认不执行
        this.value = this.lazy ? void 0 : this.get()  // 只有实例化时，才有 getter
    }

    addDep(dep) {
        let id = dep.id
        if (!this.depsId.has(id)) {
            this.deps.push(dep)
            this.depsId.add(id)
            dep.addSub(this)
            // console.log(dep)
        }
    }

    get() {
        console.log('update')
        pushTarget(this)
        let result = this.getter.call(this.vm)
        popTarget()

        return result
    }

    run() {
        let newValue = this.get()
        let oldValue = this.value
        if (this.user) {
            this.cb.call(this.vm, newValue, oldValue)
        }
        // this.get()
    }

    update() {
        // 计算属性，只需要 dirty = true，不需要更新值，取值是会自动更新
        if (this.lazy) {
            this.dirty = true
            return
        }
        // this.get()  // 重新渲染
        queueWatcher(this)  // 暂存队列后异步更新
    }

    evaluate() {
        // get() 求值时，会记住计算属性的 watcher
        this.value = this.get()
        this.dirty = false  // 取过值了，不再重新取值
    }

    depend() {
        // 遍历 dep，将渲染 watcher 放进行
        // for (let i = 0; i < this.deps.length; i++) {
        //     this.deps[i].depend()
        // }
        let i = this.deps.length
        while(i--){
            this.deps[i].depend()
        }
    }
}

let queue = []
let has = {}
let pending = false

function flushSchedulerQueue() {
    queue.forEach(watcher => {
        watcher.run()
    })
    queue = []
    has = {}
    pending = false
}

function queueWatcher(watcher) {
    const id = watcher.id
    if (has[id] == null) {
        queue.push(watcher) // 组件只更新一次
        has[id] = true
        if (!pending) {
            watcher.vm.$nextTick(flushSchedulerQueue)
            // setTimeout(() => {
            //     queue.forEach(watcher => watcher.run())
            //     queue = []
            //     has = {}
            //     pending = false
            // }, 0)
            pending = true
        }
    }
}

export default Watcher
